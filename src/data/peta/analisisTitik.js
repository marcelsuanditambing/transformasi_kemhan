// ============================================================================
// analisisTitik.js — "titik ini masuk wilayah siapa?" untuk mode pin Simulasi.
//
// Masukan : koordinat (bujur, lintang) hasil klik di peta.
// Keluaran: jenis titik (darat/laut), zona laut, kab/kota penanggung jawab,
//           jarak ke pesisir terdekat, dan koordinat terformat.
//
// Aturan (disepakati):
//   • Titik di daratan Indonesia  -> kab/kota yang memuat titik (batas BIG).
//   • Titik di laut Indonesia     -> kab/kota PESISIR TERDEKAT. Dokumen terbuka
//     TNI membagi wilayah tanggung jawab per provinsi/kabupaten; batas sektor
//     laut resmi tidak dipublikasikan, jadi hasilnya berlabel "perkiraan".
//   • Titik di luar yurisdiksi Indonesia (daratan/ZEE negara lain, klaim
//     tumpang tindih, laut lepas) -> TIDAK ada rantai komando. Jarak ke wilayah
//     Indonesia terdekat tetap dihitung sebagai informasi.
//
// Semua data yang dipakai di sini data umum (src/data/peta). Rantai komando
// tetap diambil dari API terkunci oleh useJadc2 setelah kab/kota diketahui.
// ============================================================================
import { feature } from 'topojson-client';
import { geoArea, geoBounds, geoCentroid, geoContains, geoDistance } from 'd3-geo';
import { muatPetaKab, muatPetaProvinsi } from './usePeta.js';
import { formatJarak, formatKoordinat } from './formatTitik.js';

export { formatJarak, formatKoordinat };

const R_BUMI_KM = 6371.0088;
/** Sedekat ini dengan pantai, daratan dicek ulang dengan batas kab/kota yang rinci. */
const DEKAT_PANTAI_KM = 3;
const SEL = 0.25; // ukuran sel indeks pantai (derajat)

export const ZONA = {
  darat: { kode: 'darat', label: 'Daratan Indonesia', ket: '' },
  perairanDarat: { kode: 'perairan-darat', label: 'Perairan darat Indonesia', ket: 'danau / sungai' },
  kepulauan: { kode: 'kepulauan', label: 'Perairan kepulauan Indonesia', ket: 'di dalam garis pangkal kepulauan' },
  teritorial: { kode: 'teritorial', label: 'Laut teritorial Indonesia', ket: 'hingga 12 mil laut dari garis pangkal' },
  zee: { kode: 'zee', label: 'Zona Ekonomi Eksklusif (ZEE) Indonesia', ket: 'hingga 200 mil laut dari garis pangkal' },
  lepas: { kode: 'laut-lepas', label: 'Laut lepas', ket: 'di luar yurisdiksi negara mana pun' },
};

// ---- utilitas geometri -------------------------------------------------------
function dalamKotak(b, [x, y]) {
  return x >= b[0][0] - 1e-9 && x <= b[1][0] + 1e-9 && y >= b[0][1] - 1e-9 && y <= b[1][1] + 1e-9;
}

function denganKotak(fitur) {
  return fitur.map((f) => ({ f, b: geoBounds(f) }));
}

function cari(daftar, titik) {
  for (const { f, b } of daftar) {
    if (dalamKotak(b, titik) && geoContains(f, titik)) return f;
  }
  return null;
}

const _kotakData = new WeakMap(); // data usePeta -> kotak batas tiap fitur
function cariDiData(data, titik) {
  let kotak = _kotakData.get(data);
  if (!kotak) {
    kotak = data.fitur.map((f) => geoBounds(f.geo));
    _kotakData.set(data, kotak);
  }
  for (let i = 0; i < data.fitur.length; i++) {
    if (dalamKotak(kotak[i], titik) && geoContains(data.fitur[i].geo, titik)) return data.fitur[i];
  }
  return null;
}

async function cariKab(kodeProv, titik) {
  return cariDiData(await muatPetaKab(kodeProv), titik);
}

function objekPertama(topo) {
  const nama = Object.keys(topo.objects)[0];
  return feature(topo, topo.objects[nama]).features;
}

// ---- data laut (zona + negara tetangga) -------------------------------------
let _laut = null;

/** laut.json: negara tetangga, zona yurisdiksi, ZEE asing, laut teritorial, perairan kepulauan. */
export function muatLaut() {
  if (!_laut) {
    _laut = import('./laut.json')
      .then((m) => {
        const d = m.default;
        const negara = objekPertama(d.negara);
        return {
          negara: denganKotak(negara),
          zona: denganKotak(objekPertama(d.zona)),
          asing: denganKotak(objekPertama(d.asing)),
          teritorial: denganKotak(objekPertama(d.teritorial)),
          kepulauan: denganKotak(objekPertama(d.kepulauan)),
          // untuk digambar di peta
          fiturNegara: negara,
          garisZee: objekPertama(d.garis),
        };
      })
      .catch((e) => {
        _laut = null;
        throw e;
      });
  }
  return _laut;
}

// ---- indeks pantai (pesisir terdekat) ---------------------------------------
let _pantai = null;

/** pantai.json -> segmen garis pantai + indeks grid untuk pencarian cepat. */
export function muatPantai() {
  if (!_pantai) {
    _pantai = import('./pantai.json')
      .then((m) => bangunIndeks(m.default))
      .catch((e) => {
        _pantai = null;
        throw e;
      });
  }
  return _pantai;
}

function bangunIndeks(d) {
  const q = d.q;
  // baris: [indeks kab, jenis (0 pantai / 1 batas darat negara), x0, y0, dx1, dy1, ...]
  let n = 0;
  for (const g of d.garis) n += (g.length - 4) / 2;
  const ax = new Float64Array(n);
  const ay = new Float64Array(n);
  const bx = new Float64Array(n);
  const by = new Float64Array(n);
  const kab = new Uint16Array(n);
  const batas = new Uint8Array(n);
  let i = 0;
  let minX = Infinity; let minY = Infinity; let maxX = -Infinity; let maxY = -Infinity;
  for (const g of d.garis) {
    let x = g[2];
    let y = g[3];
    for (let j = 4; j < g.length; j += 2) {
      const x2 = x + g[j];
      const y2 = y + g[j + 1];
      ax[i] = x / q; ay[i] = y / q; bx[i] = x2 / q; by[i] = y2 / q; kab[i] = g[0]; batas[i] = g[1];
      minX = Math.min(minX, ax[i], bx[i]); maxX = Math.max(maxX, ax[i], bx[i]);
      minY = Math.min(minY, ay[i], by[i]); maxY = Math.max(maxY, ay[i], by[i]);
      i++;
      x = x2; y = y2;
    }
  }
  const nx = Math.floor((maxX - minX) / SEL) + 1;
  const ny = Math.floor((maxY - minY) / SEL) + 1;
  const sel = new Map();
  for (let s = 0; s < n; s++) {
    const cx0 = Math.floor((Math.min(ax[s], bx[s]) - minX) / SEL);
    const cx1 = Math.floor((Math.max(ax[s], bx[s]) - minX) / SEL);
    const cy0 = Math.floor((Math.min(ay[s], by[s]) - minY) / SEL);
    const cy1 = Math.floor((Math.max(ay[s], by[s]) - minY) / SEL);
    for (let cy = cy0; cy <= cy1; cy++) {
      for (let cx = cx0; cx <= cx1; cx++) {
        const k = cy * nx + cx;
        const isi = sel.get(k);
        if (isi) isi.push(s); else sel.set(k, [s]);
      }
    }
  }
  return { ax, ay, bx, by, kab, batas, n, minX, minY, nx, ny, sel, daftarKab: d.kab, prov: d.prov };
}

function infoKab(pantai, kode, namaCadangan) {
  const provKode = String(kode).split('.')[0];
  const baris = pantai.daftarKab.find((k) => k[0] === kode);
  return {
    kode,
    nama: baris ? baris[1] : namaCadangan || kode,
    provKode,
    provNama: pantai.prov[provKode] || provKode,
  };
}

/**
 * Garis pantai Indonesia terdekat dari (lon, lat).
 * termasukBatasDarat: ikut cocokkan batas darat dengan negara tetangga
 * (untuk titik di daratan negara lain: "wilayah Indonesia terdekat").
 * @returns {{ kab, jarakKm, titik:[lon,lat] } | null}
 */
export function pesisirTerdekat(idx, lon, lat, termasukBatasDarat = false) {
  if (!idx || !idx.n) return null;
  const kx = Math.cos((lat * Math.PI) / 180); // bujur -> satuan "derajat lintang"
  const cx = Math.floor((lon - idx.minX) / SEL);
  const cy = Math.floor((lat - idx.minY) / SEL);
  const langkah = SEL * Math.min(kx, 1);
  const rMaks = Math.max(Math.abs(cx), Math.abs(cy), Math.abs(cx - idx.nx), Math.abs(cy - idx.ny)) + 1;

  let terbaik2 = Infinity;
  let sTerbaik = -1;
  let tTerbaik = 0;

  const uji = (s) => {
    if (idx.batas[s] && !termasukBatasDarat) return;
    const x1 = (idx.ax[s] - lon) * kx;
    const y1 = idx.ay[s] - lat;
    const dx = (idx.bx[s] - idx.ax[s]) * kx;
    const dy = idx.by[s] - idx.ay[s];
    const p2 = dx * dx + dy * dy;
    let t = p2 > 0 ? -(x1 * dx + y1 * dy) / p2 : 0;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const ex = x1 + t * dx;
    const ey = y1 + t * dy;
    const d2 = ex * ex + ey * ey;
    if (d2 < terbaik2) { terbaik2 = d2; sTerbaik = s; tTerbaik = t; }
  };
  const bukaSel = (gx, gy) => {
    if (gx < 0 || gy < 0 || gx >= idx.nx || gy >= idx.ny) return;
    const isi = idx.sel.get(gy * idx.nx + gx);
    if (isi) for (const s of isi) uji(s);
  };

  for (let r = 0; r <= rMaks; r++) {
    // semua sel di cincin r berjarak minimal (r-1)·langkah dari titik
    if (sTerbaik >= 0 && Math.sqrt(terbaik2) <= (r - 1) * langkah) break;
    if (r === 0) { bukaSel(cx, cy); continue; }
    for (let gx = cx - r; gx <= cx + r; gx++) { bukaSel(gx, cy - r); bukaSel(gx, cy + r); }
    for (let gy = cy - r + 1; gy <= cy + r - 1; gy++) { bukaSel(cx - r, gy); bukaSel(cx + r, gy); }
  }
  if (sTerbaik < 0) return null;

  const s = sTerbaik;
  const titik = [
    idx.ax[s] + tTerbaik * (idx.bx[s] - idx.ax[s]),
    idx.ay[s] + tTerbaik * (idx.by[s] - idx.ay[s]),
  ];
  const kode = idx.daftarKab[idx.kab[s]][0];
  return {
    kab: infoKab(idx, kode),
    jarakKm: geoDistance([lon, lat], titik) * R_BUMI_KM,
    titik,
  };
}

// ---- titik wakil ------------------------------------------------------------
/** Titik di dalam sebuah wilayah (untuk memilih kab/kota lewat keyboard). */
export function titikWakil(fitur) {
  const c = geoCentroid(fitur);
  if (geoContains(fitur, c)) return c;
  const g = fitur.geometry || fitur;
  const bagian = g.type === 'MultiPolygon'
    ? g.coordinates.map((coordinates) => ({ type: 'Polygon', coordinates }))
    : [g];
  let besar = bagian[0];
  let luas = -1;
  for (const p of bagian) {
    const a = geoArea(p);
    if (a > luas) { luas = a; besar = p; }
  }
  const pc = geoCentroid(besar);
  if (geoContains(besar, pc)) return pc;
  const [[x0, y0], [x1, y1]] = geoBounds(besar);
  let terbaik = null;
  let jarak = Infinity;
  for (let i = 1; i < 24; i++) {
    for (let j = 1; j < 24; j++) {
      const t = [x0 + ((x1 - x0) * i) / 24, y0 + ((y1 - y0) * j) / 24];
      if (!geoContains(besar, t)) continue;
      const d = (t[0] - pc[0]) ** 2 + (t[1] - pc[1]) ** 2;
      if (d < jarak) { jarak = d; terbaik = t; }
    }
  }
  return terbaik || besar.coordinates[0][0];
}

// ---- analisis utama ---------------------------------------------------------
/**
 * @returns {Promise<{
 *   lon:number, lat:number, koordinat:object,
 *   jenis:'darat'|'laut'|'darat-asing',
 *   zona:{kode,label,ket}, yurisdiksi:boolean,
 *   kab:{kode,nama,provKode,provNama}|null,
 *   jarakKm:number|null, titikPesisir:[number,number]|null,
 *   dasar:'wilayah'|'pesisir'|'luar', adaRantai:boolean
 * }>}
 * Titik di luar yurisdiksi: adaRantai = false; kab & jarakKm = wilayah Indonesia
 * terdekat (informasi saja).
 */
export async function analisisTitik(lon, lat) {
  const titik = [lon, lat];
  const [prov, laut, pantai] = await Promise.all([muatPetaProvinsi(), muatLaut(), muatPantai()]);
  const dekat = pesisirTerdekat(pantai, lon, lat);
  const umum = { lon, lat, koordinat: formatKoordinat(lon, lat) };
  const menurutPesisir = (sisa) => ({
    ...umum,
    kab: dekat ? dekat.kab : null,
    jarakKm: dekat ? dekat.jarakKm : null,
    titikPesisir: dekat ? dekat.titik : null,
    ...sisa,
  });

  // 1. Daratan Indonesia (batas kab/kota BIG yang rinci)
  const p = cariDiData(prov, titik);
  let k = p ? await cariKab(p.kode, titik) : null;
  if (!k && dekat && dekat.jarakKm <= DEKAT_PANTAI_KM && (!p || dekat.kab.provKode !== p.kode)) {
    // pulau kecil yang tidak tampil di peta nasional, atau garis pantai nasional yang kasar
    k = await cariKab(dekat.kab.provKode, titik);
  }
  if (k) {
    return {
      ...umum, jenis: 'darat', zona: ZONA.darat, yurisdiksi: true,
      kab: infoKab(pantai, k.kode, k.nama), jarakKm: null, titikPesisir: null,
      dasar: 'wilayah', adaRantai: true,
    };
  }
  if (p && dekat && dekat.jarakKm > DEKAT_PANTAI_KM) {
    // di dalam provinsi tetapi di luar semua kab/kota: danau/sungai besar
    return menurutPesisir({ jenis: 'darat', zona: ZONA.perairanDarat, yurisdiksi: true, dasar: 'pesisir', adaRantai: true });
  }

  // 2. Daratan negara lain -> tanpa rantai; jarak ke wilayah Indonesia terdekat
  //    (pantai atau batas darat) sebagai informasi
  const n = cari(laut.negara, titik);
  if (n) {
    const terdekat = pesisirTerdekat(pantai, lon, lat, true) || dekat;
    return {
      ...umum,
      jenis: 'darat-asing',
      zona: { kode: 'darat-asing', label: `Daratan ${n.properties.nama}`, ket: 'di luar wilayah NKRI' },
      yurisdiksi: false,
      kab: terdekat ? terdekat.kab : null,
      jarakKm: terdekat ? terdekat.jarakKm : null,
      titikPesisir: terdekat ? terdekat.titik : null,
      dasar: 'luar',
      adaRantai: false,
    };
  }

  // 3. Laut yurisdiksi Indonesia
  if (cari(laut.zona, titik)) {
    let zona = ZONA.zee;
    if (cari(laut.teritorial, titik)) zona = ZONA.teritorial;
    else if (cari(laut.kepulauan, titik)) zona = ZONA.kepulauan;
    return menurutPesisir({ jenis: 'laut', zona, yurisdiksi: true, dasar: 'pesisir', adaRantai: Boolean(dekat) });
  }

  // 4. Laut negara lain / laut lepas -> tanpa rantai
  const a = cari(laut.asing, titik);
  const zona = a
    ? { kode: 'laut-asing', label: a.properties.nama, ket: 'di luar yurisdiksi Indonesia' }
    : ZONA.lepas;
  return menurutPesisir({ jenis: 'laut', zona, yurisdiksi: false, dasar: 'luar', adaRantai: false });
}

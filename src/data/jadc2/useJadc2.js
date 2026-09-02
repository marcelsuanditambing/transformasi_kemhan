// ============================================================================
// useJadc2.js — Composable data JADC2 (Vue 3)
// Letak: src/data/jadc2/useJadc2.js  (satu folder dengan index.js)
//
// Tanggung jawab (LANGKAH 2 = logika, tanpa UI):
//   - Memuat data secara lazy: satuan-nasional (sekali) + provinsi saat dibutuhkan.
//   - resolveChain(kodeWilayah): merakit rantai komando AD/AL/AU untuk satu wilayah,
//     mewarisi baris kabupaten/provinsi bila yang dipilih adalah kecamatan.
//   - Pencarian nama (cariWilayah) + helper dropdown bertingkat.
//
// Catatan desain:
//   - Cache & Map disimpan di level modul → dibagikan antar semua pemanggil composable
//     (tidak dibangun ulang tiap komponen mount).
//   - Rantai tiap leaf sudah lengkap sampai Korem di file provinsi; Kodam ke atas
//     ada di satuan-nasional.json (selalu dimuat).
// ============================================================================

import { ref, shallowRef } from 'vue';
import { satuanNasional, loadProvinsi, PROVINSI } from './index.js';

// ---- singleton level-modul ----------------------------------------------
const _satuanNasional = new Map(satuanNasional.map((s) => [s.id, s]));
const _provCache = new Map();     // kodeProv -> objek provinsi terparse (+ Map bantu)
const _provPromise = new Map();   // kodeProv -> promise in-flight (dedupe permintaan)
let _indexPromise = null;         // promise pemuatan wilayah-index.json
let _wilayahIndex = null;         // [{ kode, nama }]
let _namaByKode = null;           // Map kode -> nama (breadcrumb & pencarian)

const MATRA = ['AD', 'AL', 'AU'];

// ---- util kode wilayah ----------------------------------------------------
const provOf = (kode) => String(kode).split('.')[0];
function kabOf(kode) {
  const p = String(kode).split('.');
  return p.length >= 2 ? `${p[0]}.${p[1]}` : null;
}
function levelOf(kode) {
  const n = String(kode).split('.').length;
  return n === 3 ? 'kec' : n === 2 ? 'kab' : 'prov';
}

// ---- pemuatan provinsi (lazy + cache + dedupe) ----------------------------
function ensureProvinsi(kodeProv) {
  if (_provCache.has(kodeProv)) return Promise.resolve(_provCache.get(kodeProv));
  if (!_provPromise.has(kodeProv)) {
    const pr = loadProvinsi(kodeProv)
      .then((data) => {
        const satuanMap = new Map(_satuanNasional);
        for (const s of data.satuan) satuanMap.set(s.id, s); // leaf lokal menimpa/menambah
        const wilayahMap = new Map(data.wilayah.map((w) => [w.kode_bps, w]));
        const pemByKode = new Map();
        for (const p of data.pemetaan) {
          if (!pemByKode.has(p.kode_wilayah)) pemByKode.set(p.kode_wilayah, []);
          pemByKode.get(p.kode_wilayah).push(p);
        }
        const parsed = { ...data, satuanMap, wilayahMap, pemByKode };
        _provCache.set(kodeProv, parsed);
        _provPromise.delete(kodeProv);
        return parsed;
      })
      .catch((e) => {
        _provPromise.delete(kodeProv);
        throw e;
      });
    _provPromise.set(kodeProv, pr);
  }
  return _provPromise.get(kodeProv);
}

// ---- penelusuran rantai induk_id ------------------------------------------
function buildRantai(satuanMap, satuanId) {
  const rantai = [];
  const seen = new Set();
  let cur = satuanId;
  while (cur && satuanMap.has(cur) && !seen.has(cur)) {
    seen.add(cur);
    const s = satuanMap.get(cur);
    rantai.push({ id: s.id, nama: s.nama, tingkat: s.tingkat, markas: s.markas });
    cur = s.induk_id;
  }
  // cur masih ada tapi tak ada di Map => induk hilang (rantai terputus)
  const terputus = Boolean(cur) && !satuanMap.has(cur);
  return { rantai, terputus };
}

// menentukan matra sebuah baris pemetaan
function matraDari(row, satuanMap) {
  if (row.satuan_id && satuanMap.has(row.satuan_id)) {
    return satuanMap.get(row.satuan_id).matra;
  }
  // baris N/A (peran '-', tanpa satuan_id): pada data ini selalu matra laut
  // (kabupaten pedalaman tanpa satuan AL).
  if (row.peran === '-') return 'AL';
  const t = `${row.aturan_pemetaan || ''} ${row.catatan || ''}`.toUpperCase();
  if (/\bAL\b|LAUT|LANAL|KODAERAL|LANTAMAL/.test(t)) return 'AL';
  if (/\bAU\b|UDARA|LANUD|KOOPSUD/.test(t)) return 'AU';
  return 'AD';
}

// ============================================================================
// resolveChain — jawaban inti: "wilayah ini di bawah pengawasan siapa?"
//   kodeWilayah: kode provinsi / kabupaten / kecamatan (mis. "72.06.10").
//   return: { kode, level, breadcrumb, matra:{AD,AL,AU}, adaKuning, perluTinjau }
// ============================================================================
async function resolveChain(kodeWilayah) {
  const kode = String(kodeWilayah).trim();
  const kodeProv = provOf(kode);
  const prov = await ensureProvinsi(kodeProv);
  const { satuanMap, wilayahMap, pemByKode } = prov;

  const kodeKab = kabOf(kode);
  const breadcrumb = [kodeProv, kodeKab, levelOf(kode) === 'kec' ? kode : null]
    .filter(Boolean)
    .map((k) => ({ kode: k, nama: (wilayahMap.get(k) || {}).nama || k }));

  // lineage: dari paling spesifik -> umum
  const lineage = [kode];
  if (kodeKab && kodeKab !== kode) lineage.push(kodeKab);
  if (kodeProv !== kode && kodeProv !== kodeKab) lineage.push(kodeProv);

  const hasil = { AD: [], AL: [], AU: [] };
  for (const m of MATRA) {
    // ambil baris matra ini dari level PALING spesifik yang punya data
    for (const lvlKode of lineage) {
      const rows = (pemByKode.get(lvlKode) || []).filter((r) => matraDari(r, satuanMap) === m);
      if (!rows.length) continue;
      hasil[m] = rows.map((r) => {
        if (r.peran === '-' || !r.satuan_id) {
          return {
            na: true, peran: 'tidak ada',
            tingkat_keyakinan: r.tingkat_keyakinan, aturan: r.aturan_pemetaan,
            catatan: r.catatan, sumber: r.sumber, level: lvlKode, rantai: [],
          };
        }
        const { rantai, terputus } = buildRantai(satuanMap, r.satuan_id);
        return {
          na: false, peran: r.peran,
          tingkat_keyakinan: r.tingkat_keyakinan, aturan: r.aturan_pemetaan,
          catatan: r.catatan, sumber: r.sumber, level: lvlKode,
          diwarisiDari: lvlKode === kode ? null : lvlKode, // null = tepat di wilayah ini
          rantaiTerputus: terputus,
          rantai: rantai.slice().reverse(), // urut ATAS -> bawah (Kodam ... Koramil)
        };
      });
      break;
    }
  }

  // ringkasan status kuning
  const perluTinjau = [];
  for (const m of MATRA) {
    for (const e of hasil[m]) {
      if (e.tingkat_keyakinan === 'sedang' || e.tingkat_keyakinan === 'rendah') {
        perluTinjau.push({ matra: m, keyakinan: e.tingkat_keyakinan, catatan: e.catatan });
      }
    }
  }

  return {
    kode,
    level: levelOf(kode),
    wilayah: wilayahMap.get(kode) || null,
    breadcrumb,
    matra: hasil,
    adaKuning: perluTinjau.length > 0,
    perluTinjau,
  };
}

// ---- pencarian nama (butuh wilayah-index.json) ----------------------------
function ensureIndex() {
  if (_wilayahIndex) return Promise.resolve(_wilayahIndex);
  if (!_indexPromise) {
    _indexPromise = import('./wilayah-index.json').then((m) => {
      _wilayahIndex = m.default.map(([kode, nama]) => ({ kode, nama }));
      _namaByKode = new Map(_wilayahIndex.map((w) => [w.kode, w.nama]));
      return _wilayahIndex;
    });
  }
  return _indexPromise;
}
function jalurNama(kode) {
  const p = String(kode).split('.');
  const out = [];
  if (p.length >= 1) out.push(_namaByKode.get(p[0]) || p[0]);
  if (p.length >= 2) out.push(_namaByKode.get(`${p[0]}.${p[1]}`) || '');
  return out.filter(Boolean); // [provinsi, kabupaten]
}
async function cariWilayah(query, opts = {}) {
  const { level = null, limit = 20 } = opts;
  const q = String(query || '').trim().toLowerCase();
  if (q.length < 2) return [];
  await ensureIndex();
  const out = [];
  for (const w of _wilayahIndex) {
    if (level && levelOf(w.kode) !== level) continue;
    if (w.nama.toLowerCase().includes(q)) {
      out.push({ kode: w.kode, nama: w.nama, level: levelOf(w.kode), jalur: jalurNama(w.kode) });
      if (out.length >= limit) break;
    }
  }
  return out;
}

// ---- helper dropdown bertingkat -------------------------------------------
function daftarProvinsi() {
  return PROVINSI; // sudah termuat via index.js
}
async function daftarKabupaten(kodeProv) {
  const prov = await ensureProvinsi(kodeProv);
  return prov.wilayah.filter((w) => w.level === 'kab');
}
async function daftarKecamatan(kodeKab) {
  const prov = await ensureProvinsi(provOf(kodeKab));
  return prov.wilayah.filter((w) => w.level === 'kec' && w.induk_kode === kodeKab);
}

// ============================================================================
// Composable: state reaktif + semua fungsi.
// ============================================================================
export function useJadc2() {
  const loading = ref(false);
  const error = ref(null);
  const hasil = shallowRef(null); // hasil resolveChain terakhir

  async function pilih(kodeWilayah) {
    loading.value = true;
    error.value = null;
    try {
      hasil.value = await resolveChain(kodeWilayah);
      return hasil.value;
    } catch (e) {
      error.value = e;
      hasil.value = null;
      throw e;
    } finally {
      loading.value = false;
    }
  }

  return {
    // state reaktif
    loading, error, hasil,
    // aksi utama
    pilih, resolveChain,
    // pencarian & navigasi
    cariWilayah, daftarProvinsi, daftarKabupaten, daftarKecamatan,
    PROVINSI,
  };
}

// ekspor fungsi murni juga (mis. untuk unit test / pemakaian non-komponen)
export { resolveChain, cariWilayah, daftarProvinsi, daftarKabupaten, daftarKecamatan };

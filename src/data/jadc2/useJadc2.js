// ============================================================================
// useJadc2.js — Composable data JADC2 (Vue 3)
//
// Perubahan RBAC: seluruh data kini diambil lewat API ber-gate (lihat index.js),
// bukan lagi di-bundle. Satuan nasional & indeks wilayah dimuat lazy sekali,
// detail provinsi dimuat saat dibutuhkan. Cache disimpan di level modul.
// ============================================================================

import { ref, shallowRef } from 'vue';
import { loadProvinsi, fetchSatuanNasional, fetchWilayahIndex, fetchProvinsiIndex } from './index.js';

// ---- singleton level-modul ----------------------------------------------
let _satuanNasional = null;       // Map id -> satuan (nasional), lazy
let _satuanPromise = null;
const _provCache = new Map();     // kodeProv -> objek provinsi terparse (+ Map bantu)
const _provPromise = new Map();   // kodeProv -> promise in-flight (dedupe permintaan)
let _indexPromise = null;         // promise pemuatan wilayah-index
let _wilayahIndex = null;         // [{ kode, nama }]
let _namaByKode = null;           // Map kode -> nama (breadcrumb & pencarian)
let _provinsiIndex = null;        // daftar provinsi (metadata), lazy
let _provinsiIndexPromise = null;

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

// ---- pemuatan satuan nasional (lazy, sekali) ------------------------------
function ensureSatuanNasional() {
  if (_satuanNasional) return Promise.resolve(_satuanNasional);
  if (!_satuanPromise) {
    _satuanPromise = fetchSatuanNasional()
      .then((arr) => {
        _satuanNasional = new Map(arr.map((s) => [s.id, s]));
        return _satuanNasional;
      })
      .catch((e) => { _satuanPromise = null; throw e; });
  }
  return _satuanPromise;
}

// ---- pemuatan provinsi (lazy + cache + dedupe) ----------------------------
function ensureProvinsi(kodeProv) {
  if (_provCache.has(kodeProv)) return Promise.resolve(_provCache.get(kodeProv));
  if (!_provPromise.has(kodeProv)) {
    const pr = Promise.all([ensureSatuanNasional(), loadProvinsi(kodeProv)])
      .then(([nas, data]) => {
        const satuanMap = new Map(nas);
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
  const terputus = Boolean(cur) && !satuanMap.has(cur);
  return { rantai, terputus };
}

function matraDari(row, satuanMap) {
  if (row.satuan_id && satuanMap.has(row.satuan_id)) {
    return satuanMap.get(row.satuan_id).matra;
  }
  if (row.peran === '-') return 'AL';
  const t = `${row.aturan_pemetaan || ''} ${row.catatan || ''}`.toUpperCase();
  if (/\bAL\b|LAUT|LANAL|KODAERAL|LANTAMAL/.test(t)) return 'AL';
  if (/\bAU\b|UDARA|LANUD|KOOPSUD/.test(t)) return 'AU';
  return 'AD';
}

// ============================================================================
// resolveChain — "wilayah ini di bawah pengawasan siapa?"
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

  const lineage = [kode];
  if (kodeKab && kodeKab !== kode) lineage.push(kodeKab);
  if (kodeProv !== kode && kodeProv !== kodeKab) lineage.push(kodeProv);

  const hasil = { AD: [], AL: [], AU: [] };
  for (const m of MATRA) {
    for (const lvlKode of lineage) {
      const rows = (pemByKode.get(lvlKode) || []).filter((r) => matraDari(r, satuanMap) === m);
      if (!rows.length) continue;
      hasil[m] = rows.map((r) => {
        if (r.peran === '-') {
          // memang tidak ada satuan matra ini (mis. AL di wilayah pedalaman)
          return {
            na: true, peran: 'tidak ada',
            tingkat_keyakinan: r.tingkat_keyakinan, aturan: r.aturan_pemetaan,
            catatan: r.catatan, sumber: r.sumber, level: lvlKode, rantai: [],
          };
        }
        if (!r.satuan_id) {
          // ada pemetaan, tetapi satuan pengampunya belum ditetapkan di data
          return {
            na: false, belumDitentukan: true, peran: r.peran,
            tingkat_keyakinan: r.tingkat_keyakinan, aturan: r.aturan_pemetaan,
            catatan: r.catatan, sumber: r.sumber, level: lvlKode,
            diwarisiDari: lvlKode === kode ? null : lvlKode,
            rantai: [],
          };
        }
        const { rantai, terputus } = buildRantai(satuanMap, r.satuan_id);
        return {
          na: false, peran: r.peran,
          tingkat_keyakinan: r.tingkat_keyakinan, aturan: r.aturan_pemetaan,
          catatan: r.catatan, sumber: r.sumber, level: lvlKode,
          diwarisiDari: lvlKode === kode ? null : lvlKode,
          rantaiTerputus: terputus,
          rantai: rantai.slice().reverse(),
        };
      });
      break;
    }
  }

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

// ---- pencarian nama (butuh wilayah-index) ---------------------------------
function ensureIndex() {
  if (_wilayahIndex) return Promise.resolve(_wilayahIndex);
  if (!_indexPromise) {
    _indexPromise = fetchWilayahIndex()
      .then((arr) => {
        _wilayahIndex = arr.map(([kode, nama]) => ({ kode, nama }));
        _namaByKode = new Map(_wilayahIndex.map((w) => [w.kode, w.nama]));
        return _wilayahIndex;
      })
      .catch((e) => { _indexPromise = null; throw e; });
  }
  return _indexPromise;
}
function jalurNama(kode) {
  const p = String(kode).split('.');
  const out = [];
  if (p.length >= 1) out.push(_namaByKode.get(p[0]) || p[0]);
  if (p.length >= 2) out.push(_namaByKode.get(`${p[0]}.${p[1]}`) || '');
  return out.filter(Boolean);
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
async function daftarProvinsi() {
  if (_provinsiIndex) return _provinsiIndex;
  if (!_provinsiIndexPromise) {
    _provinsiIndexPromise = fetchProvinsiIndex()
      .then((arr) => { _provinsiIndex = arr; return arr; })
      .catch((e) => { _provinsiIndexPromise = null; throw e; });
  }
  return _provinsiIndexPromise;
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
// Composable
// ============================================================================
export function useJadc2() {
  const loading = ref(false);
  const error = ref(null);
  const hasil = shallowRef(null);
  let urutan = 0; // hanya jawaban permintaan terakhir yang ditampilkan

  async function pilih(kodeWilayah) {
    const ini = ++urutan;
    loading.value = true;
    error.value = null;
    try {
      const r = await resolveChain(kodeWilayah);
      if (ini !== urutan) return r; // sudah ada pilihan yang lebih baru
      hasil.value = r;
      return r;
    } catch (e) {
      if (ini !== urutan) return null;
      error.value = e;
      hasil.value = null;
      throw e;
    } finally {
      if (ini === urutan) loading.value = false;
    }
  }

  /** Kosongkan hasil (mis. titik simulasi terlalu jauh dari wilayah Indonesia). */
  function kosongkan() {
    urutan++; // abaikan jawaban yang masih ditunggu
    loading.value = false;
    error.value = null;
    hasil.value = null;
  }

  return {
    loading, error, hasil, pilih, kosongkan,
    resolveChain, cariWilayah,
    daftarProvinsi, daftarKabupaten, daftarKecamatan,
  };
}

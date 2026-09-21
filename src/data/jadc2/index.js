// ============================================================================
// index.js — loader data JADC2 dari API ber-gate (tidak lagi di-bundle).
// Semua data (satuan nasional, indeks wilayah, daftar & detail provinsi)
// hanya bisa diambil bila pengguna sudah login (backend membalas 401 jika tidak).
// ============================================================================

async function getJson(url) {
  const r = await fetch(url, { credentials: 'same-origin' });
  if (!r.ok) throw new Error('Gagal memuat: ' + url + ' (' + r.status + ')');
  return r.json();
}

export function fetchProvinsiIndex() {
  return getJson('/api/jadc2/provinsi-index');
}
export function fetchSatuanNasional() {
  return getJson('/api/jadc2/satuan-nasional');
}
export function fetchWilayahIndex() {
  return getJson('/api/jadc2/wilayah-index');
}
export function loadProvinsi(kode) {
  return getJson('/api/jadc2/provinsi/' + kode).catch(() => {
    throw new Error('Provinsi tidak ditemukan: ' + kode);
  });
}

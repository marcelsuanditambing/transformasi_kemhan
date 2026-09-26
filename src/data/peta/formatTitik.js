// ============================================================================
// formatTitik.js — format koordinat & jarak untuk titik simulasi.
// Sengaja tanpa dependensi (tidak memuat d3/topojson), supaya kartu hasil di
// halaman JADC2 bisa memakainya tanpa ikut mengunduh modul peta.
// ============================================================================

const KM_PER_MIL_LAUT = 1.852;

function keDMS(nilai, positif, negatif) {
  const arah = nilai < 0 ? negatif : positif;
  let detik = Math.round(Math.abs(nilai) * 3600);
  const d = Math.floor(detik / 3600);
  detik -= d * 3600;
  const m = Math.floor(detik / 60);
  const s = detik - m * 60;
  return `${d}°${String(m).padStart(2, '0')}'${String(s).padStart(2, '0')}" ${arah}`;
}

/** { lintang, bujur, dms, desimal } — DMS gaya navigasi, desimal "lat, lon". */
export function formatKoordinat(lon, lat) {
  const lintang = keDMS(lat, 'LU', 'LS');
  const bujur = keDMS(lon, 'BT', 'BB');
  return { lintang, bujur, dms: `${lintang}  ${bujur}`, desimal: `${lat.toFixed(5)}, ${lon.toFixed(5)}` };
}

function angka(v) {
  return v < 10 ? v.toFixed(1).replace('.', ',') : String(Math.round(v));
}

/** "48 km (26 mil laut)" */
export function formatJarak(km) {
  if (km == null || !Number.isFinite(km)) return '';
  const mil = km / KM_PER_MIL_LAUT;
  const fk = km < 1 ? '< 1 km' : `${angka(km)} km`;
  const fm = mil < 1 ? '< 1 mil laut' : `${angka(mil)} mil laut`;
  return `${fk} (${fm})`;
}

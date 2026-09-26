# Data peta Simulasi

Berkas data di folder ini **dihasilkan** oleh `scripts/buat-peta.py` dari data di
`data-sumber/`. Jangan diedit manual; olah ulang dengan skrip tersebut.

- `provinsi.json`: 38 provinsi (TopoJSON), dimuat saat tab Simulasi dibuka.
- `kab/{kode}.json`: kab/kota per provinsi (TopoJSON), dimuat saat dibutuhkan.
- `laut.json`: negara tetangga, zona laut (ZEE, laut teritorial, perairan
  kepulauan), dan garis batas ZEE. Dimuat bersama peta nasional.
- `pantai.json`: garis pantai per kab/kota untuk mencari pesisir terdekat.
  Dimuat di latar belakang setelah peta tampil.
- `meta.json`: sumber data, edisi, lisensi, dan parameter olah.

Kode (ditulis tangan):

- `usePeta.js`: pemuat + cache TopoJSON provinsi dan kab/kota.
- `analisisTitik.js`: "titik ini masuk wilayah siapa?" — darat → kab/kota yang
  memuatnya; laut → kab/kota pesisir terdekat; di luar yurisdiksi Indonesia →
  tanpa rantai komando (hanya jarak ke wilayah Indonesia terdekat).
- `formatTitik.js`: format koordinat (DMS & desimal) dan jarak (km & mil laut),
  tanpa dependensi supaya bisa dipakai di luar modul peta.

Isinya data umum: bentuk wilayah, kode Kemendagri, nama, dan batas laut. Folder
`src/` ikut terbundel dan dapat diunduh tanpa login, jadi **jangan menambahkan
informasi militer apa pun ke sini**. Rantai komando tetap diambil dari API yang
terkunci.

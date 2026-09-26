# Data peta Simulasi

Berkas di folder ini **dihasilkan** oleh `scripts/buat-peta.py` dari data BIG di
`data-sumber/`. Jangan diedit manual; olah ulang dengan skrip tersebut.

- `provinsi.json`: 38 provinsi (TopoJSON), dimuat saat tab Simulasi dibuka.
- `kab/{kode}.json`: kab/kota per provinsi (TopoJSON), dimuat saat provinsi diklik.
- `meta.json`: sumber data, edisi, dan parameter olah.
- `usePeta.js`: pemuat + cache.

Isinya data umum: bentuk wilayah, kode Kemendagri, dan nama. Folder `src/` ikut
terbundel dan dapat diunduh tanpa login, jadi **jangan menambahkan informasi
militer apa pun ke sini**. Rantai komando tetap diambil dari API yang terkunci.

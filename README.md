# Transformasi Digital Kemhan

Aplikasi web (Vue 3 + Vite) untuk Transformasi Digital Pertahanan.

## Struktur folder

```
transformasi_kemhan/
├── index.html              # Entry HTML, memuat src/main.js
├── vite.config.js          # Konfigurasi Vite (termasuk alias @ -> src)
├── package.json
├── Dockerfile / docker-compose.yml
├── public/                 # File statis, disajikan apa adanya dari root situs
└── src/
    ├── main.js             # Titik masuk aplikasi Vue
    ├── App.vue             # Kerangka global (Navbar, konten, footer)
    ├── assets/             # Aset yang di-import & diproses Vite
    │   ├── images/         # Gambar (di-import di komponen)
    │   └── styles/         # CSS global (main.css)
    ├── components/         # Komponen yang dipakai ulang (Navbar, dll)
    ├── router/             # Definisi route (Vue Router)
    └── views/              # Halaman per route (satu file = satu halaman)
        ├── Landing.vue     # "/"          -> TOGAF Pertahanan Indonesia
        ├── Arsitektur.vue  # "/arsitektur"
        ├── Roadmap.vue     # "/roadmap"
        └── JADC2.vue       # "/jadc2"
```

## Alias @

`@` menunjuk ke folder `src`. Contoh: `@/assets/images/foo.png` = `src/assets/images/foo.png`.

## Menaruh gambar

- Gambar yang dipakai di dalam komponen -> `src/assets/images/`, lalu `import` di komponen.
- File statis yang butuh path tetap (favicon, robots.txt) -> `public/`.

## Menjalankan

```bash
npm install
npm run dev      # mode pengembangan
npm run build    # build produksi (hasil di folder dist/)
```

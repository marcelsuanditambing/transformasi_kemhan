# Data JADC2 (hasil konversi Excel tervalidasi)

Letakkan folder ini di: `src/data/jadc2/`

## Struktur
- `index.js` — peta 38 provinsi (PROVINSI) + `loadProvinsi(kode)` (lazy) + `satuanNasional`.
- `satuan-nasional.json` — 88 node lintas-provinsi (Kodam/Korem/Koarmada/Kodaeral/Lantamal/Koopsud).
- `provinsi/{kode}.json` — per provinsi: `wilayah`, `satuan` (leaf lokal: Kodim/Koramil/Posal/Lanal/Lanud), `pemetaan`.

## Cara pakai (langkah 2 — composable)
```js
import { satuanNasional, loadProvinsi, PROVINSI } from '@/data/jadc2';
const data = await loadProvinsi('72');           // muat Sulteng saat dipilih
const semuaSatuan = [...satuanNasional, ...data.satuan];
// bangun Map by id, lalu telusuri induk_id untuk merakit rantai komando.
```

## Catatan
- `tingkat_keyakinan`: `tinggi` = terverifikasi (PP 68/2014 + Perpres 84/2025); `sedang`/`rendah` = perlu ditinjau (tampilkan badge + `sumber`).
- Rantai tiap leaf sudah lengkap sampai Korem di file provinsi; Kodam ke atas di `satuan-nasional.json` (selalu dimuat).

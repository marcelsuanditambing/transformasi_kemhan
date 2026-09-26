# Data sumber peta

Folder ini berisi data mentah yang **tidak** dipakai langsung oleh situs. Isinya
diolah oleh `scripts/buat-peta.py` menjadi berkas ringan di `src/data/peta/`, yang
dipakai tab **Simulasi** di halaman JADC2.

Folder ini dikecualikan dari build Docker lewat `.dockerignore`, jadi ukurannya
tidak membebani image.

| Folder / berkas | Isi | Dipakai untuk |
|---|---|---|
| `RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb` | Batas kab/kota BIG | Peta provinsi & kab/kota, garis pantai |
| `marineregions/` | ZEE dan laut teritorial 12 mil laut (sudah dipotong ke sekitar Indonesia) | Zona laut titik simulasi, garis batas ZEE |
| `naturalearth/` | Daratan semua negara | Negara tetangga di peta |

## RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb

| | |
|---|---|
| Penerbit | Badan Informasi Geospasial (BIG) |
| Dataset | Batas Wilayah Administrasi Kabupaten/Kota, Rupabumi Indonesia (RBI) skala 1:50.000 |
| Edisi | 7 September 2023 |
| Diunduh dari | Ina-Geoportal, https://tanahair.indonesia.go.id (dataset "Batas Wilayah Kabupaten") |
| Format | Esri File Geodatabase. Layer `ADMINISTRASI_AR_KABKOTA` (poligon, dipakai) dan `ADMINISTRASI_LN_KABKOTA` (garis batas, tidak dipakai) |
| Sistem koordinat | WGS 84 (EPSG:4326) |
| Kode wilayah | `KDPKAB` = kode Kemendagri kab/kota (mis. `21.03`), `KDPPUM` = kode provinsi |
| Ketentuan | Ikuti Syarat & Ketentuan penggunaan data di portal BIG dan cantumkan BIG sebagai sumber. Peta di situs menampilkan keterangan sumber ini. |

## marineregions/

| | |
|---|---|
| Penerbit | Flanders Marine Institute (VLIZ), Maritime Boundaries Geodatabase |
| Dataset | World EEZ v12 (ZEE 200 mil laut) dan World 12 Nautical Miles Zone v4 (laut teritorial), rilis 2023-10-25 |
| Diunduh dari | https://www.marineregions.org → Downloads → Maritime Boundaries (latest version), format Shapefile |
| Lisensi | CC BY 4.0 — wajib mencantumkan sumber (sudah tampil di bawah peta) |
| Berkas | `eez_v12_sekitar_indonesia.gpkg`, `12nm_v4_sekitar_indonesia.gpkg`, `SUMBER.txt` |

Data aslinya berlaku untuk seluruh dunia (EEZ ±181 MB, lebih besar dari batas
GitHub 100 MB). Yang disimpan di sini hanya potongan di kotak 88°–148° BT,
18° LS–14° LU, dibuat dengan:

```
python scripts/potong-laut.py --eez "<folder World_EEZ_v12_…>" --tl "<folder World_12NM_v4_…>"
```

Folder data dunia sebaiknya tetap di luar repo.

## naturalearth/

| | |
|---|---|
| Penerbit | Natural Earth |
| Dataset | Admin 0 – Countries, skala 1:10m, versi 5.1.1 |
| Diunduh dari | https://www.naturalearthdata.com → Downloads → Cultural 1:10m → Admin 0 – Countries |
| Lisensi | Domain publik |

Hanya bentuk daratan negara tetangga yang dipakai; wilayah Indonesia tetap
memakai data BIG.

## Apa yang dilakukan skrip

1. Mengambil daftar kode dan nama resmi kab/kota dari
   `server/protected-data/jadc2/wilayah-index.json` (514 kab/kota, 38 provinsi).
2. Membaca poligon BIG, menggabungkan bagian-bagian per kode kab/kota, dan
   membuang pulau yang sangat kecil (di bawah 0,5 km²; untuk gugus pulau kecil
   seperti Kepulauan Seribu ambangnya menyesuaikan).
3. Fitur BIG tanpa kode kab/kota (pulau kewenangan provinsi, area tak
   terdefinisi, segmen sengketa `71.05/71.10`) dilewati. Luasnya kecil sekali.
4. Menyederhanakan batas dengan menjaga topologi (batas bersama tetap rapat):
   kab/kota ±250 m (lebih halus untuk kota kecil), peta nasional ±1 km.
5. Menulis TopoJSON `provinsi.json` (38 provinsi) dan `kab/{kode}.json` (satu
   berkas per provinsi).
6. **Mode pin** (klik di mana saja pada peta):
   - `pantai.json`: garis pantai Indonesia per kab/kota (±800 m), untuk mencari
     kab/kota pesisir terdekat dari titik di laut. Batas darat dengan Malaysia,
     PNG, dan Timor Leste ditandai terpisah.
   - `laut.json`: daratan negara tetangga, zona yurisdiksi Indonesia (ZEE),
     ZEE/klaim negara lain, laut teritorial 12 mil laut, perairan kepulauan, dan
     garis batas ZEE untuk digambar. **Perairan kepulauan** (di dalam garis
     pangkal: Laut Jawa, Selat Makassar, Laut Banda, …) tidak tersedia langsung
     di Marine Regions, jadi diturunkan dari area yang dikelilingi pita 12 mil
     laut dan daratan — hasilnya perkiraan.
7. Memvalidasi: jumlah dan kode wilayah persis sama dengan data JADC2, 11 titik uji
   zona laut (Laut Jawa, Natuna Utara, Selat Malaka, Sarawak, dll.) sesuai, dan
   hanya Papua Pegunungan yang tidak punya garis pantai.

Berkas hasil hanya berisi bentuk wilayah, kode, dan nama. Jangan menambahkan
informasi militer ke sana: folder `src/` ikut terbundel dan bisa diunduh tanpa
login. Data komando tetap diambil dari API yang terkunci.

## Mengolah ulang

Diperlukan bila BIG merilis edisi baru, bila ada pemekaran wilayah, bila data
batas laut diperbarui, atau bila parameter peta ingin diubah.

1. Pasang kebutuhan (sekali saja): Python 3.9+ dan Node.js, lalu

   ```
   pip install -r scripts/requirements-peta.txt
   ```

   Skrip memanggil mapshaper lewat `npx`, yang diunduh dari registry npm saat
   pertama kali dijalankan. Jadi olah ulang dilakukan di komputer yang punya
   akses internet (atau akses ke mirror npm); hasilnya cukup di-commit.

2. Jalankan dari akar repo (±2 menit):

   ```
   python scripts/buat-peta.py
   ```

   Untuk edisi baru, taruh GDB-nya di folder ini lalu:

   ```
   python scripts/buat-peta.py --gdb data-sumber/<nama-berkas-baru>.gdb
   ```

3. Skrip akan berhenti dengan pesan `[GAGAL]` bila ada kab/kota yang tidak
   cocok atau titik uji laut tidak sesuai. Jika berhasil, commit isi
   `src/data/peta/` lalu build ulang seperti biasa.

Catatan: bila jumlah kab/kota berubah (pemekaran), perbarui data JADC2
(`server/protected-data/jadc2/`) lebih dulu, karena skrip memakai daftarnya
sebagai rujukan.

# Data sumber peta

Folder ini berisi data mentah yang **tidak** dipakai langsung oleh situs. Isinya
diolah oleh `scripts/buat-peta.py` menjadi berkas ringan di `src/data/peta/`, yang
dipakai tab **Simulasi** di halaman JAD.

Folder ini dikecualikan dari build Docker lewat `.dockerignore`, jadi ukurannya
tidak membebani image.

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
5. Menulis TopoJSON: `provinsi.json` (38 provinsi) dan `kab/{kode}.json`
   (satu berkas per provinsi), lalu memvalidasi bahwa jumlah dan kodenya persis
   sama dengan data JAD.

Berkas hasil hanya berisi bentuk wilayah, kode, dan nama. Jangan menambahkan
informasi militer ke sana: folder `src/` ikut terbundel dan bisa diunduh tanpa
login. Data komando tetap diambil dari API yang terkunci.

## Mengolah ulang

Diperlukan bila BIG merilis edisi baru, bila ada pemekaran wilayah, atau bila
parameter peta ingin diubah.

1. Pasang kebutuhan (sekali saja): Python 3.9+ dan Node.js, lalu

   ```
   pip install -r scripts/requirements-peta.txt
   ```

   Skrip memanggil mapshaper lewat `npx`, yang diunduh dari registry npm saat
   pertama kali dijalankan. Jadi olah ulang dilakukan di komputer yang punya
   akses internet (atau akses ke mirror npm); hasilnya cukup di-commit.

2. Jalankan dari akar repo:

   ```
   python scripts/buat-peta.py
   ```

   Untuk edisi baru, taruh GDB-nya di folder ini lalu:

   ```
   python scripts/buat-peta.py --gdb data-sumber/<nama-berkas-baru>.gdb
   ```

3. Skrip akan berhenti dengan pesan `[GAGAL]` bila ada kab/kota yang tidak
   cocok. Jika berhasil, commit isi `src/data/peta/` lalu build ulang seperti
   biasa.

Catatan: bila jumlah kab/kota berubah (pemekaran), perbarui data JAD
(`server/protected-data/jadc2/`) lebih dulu, karena skrip memakai daftarnya
sebagai rujukan.

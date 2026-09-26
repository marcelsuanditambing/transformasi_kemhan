# Login / RBAC — Setup & Deploy

Situs kini punya login. Halaman **TOGAF** tetap publik; **Arsitektur**, **Roadmap**,
dan **JADC2** hanya bisa diakses setelah login. Data & gambar dari ketiga halaman
terkunci itu **tidak lagi ikut ke dalam bundel publik** — semuanya dilayani oleh
backend hanya jika sesi sah (tanpa login → HTTP 401).

Arsitektur singkat: satu container Node/Express menyajikan SPA **dan** API.
Sesi = JWT di cookie **HttpOnly**. Kredensial disimpan sebagai **hash bcrypt** di
`server/.env` (tidak pernah di-commit).

---

## 1) Setup satu kali (di server)

Buat file `server/.env` (file ini di-*gitignore*, jadi tidak akan ter-commit):

```bash
cd ~/transformasi_kemhan/server

# a. Hash password (ganti "SmartX" bila mau password lain)
npm install            # sekali saja, agar bisa memakai skrip hash
npm run hash -- "SmartX"
#   -> salin output-nya (diawali $2a$12$...)

# b. Secret acak untuk menandatangani sesi
openssl rand -hex 32
#   -> salin output-nya
```

Lalu buat `server/.env` (bisa `cp .env.example .env` lalu edit):

```ini
APP_USERNAME=smartdefense
APP_PASSWORD_HASH=<tempel hash dari langkah a>
SESSION_SECRET=<tempel hasil openssl dari langkah b>
NODE_ENV=production
PORT=8080
```

> `APP_PASSWORD_HASH` dan `SESSION_SECRET` **wajib** ada — server menolak start bila kosong.

---

## 2) Deploy (alur biasa, tak berubah)

```bash
cd ~/transformasi_kemhan
git pull origin main
docker compose up -d --build
```

Port eksternal tetap **5173** (dipetakan ke port 8080 di container), jadi konfigurasi
Cloudflare Tunnel tidak perlu diubah. `server/.env` dibaca lewat `env_file` di compose.

---

## 3) Mengganti username / password

- **Password:** `cd server && npm run hash -- "PasswordBaru"`, tempel ke `APP_PASSWORD_HASH`
  di `server/.env`, lalu `docker compose up -d --build`.
- **Username:** ubah `APP_USERNAME` di `server/.env`, rebuild.

Tidak perlu menyentuh kode.

---

## 4) Pengembangan lokal (opsional)

Dua terminal:

```bash
# terminal 1 — backend
cd server && npm install && npm start      # butuh server/.env

# terminal 2 — frontend (Vite proxy /api -> localhost:8080)
npm install && npm run dev
```

---

## 5) Berkas lama yang bisa dihapus (opsional, biar rapi)

File-file ini sudah **pindah ke `server/`** dan tak lagi dipakai frontend. Kalau
dibiarkan pun tidak ikut ke bundel (tak ada yang meng-import-nya), tapi boleh
dibersihkan:

```bash
git rm src/data/arsitekturFase.js
git rm src/data/jadc2/satuan-nasional.json src/data/jadc2/wilayah-index.json
git rm -r src/data/jadc2/provinsi
git rm "src/assets/images/preliminary-ruang-lingkup.drawio.svg" \
       "src/assets/images/solusi-arsitektur-target.drawio.svg" \
       "src/assets/images/value-stream-kemhan.drawio.svg" \
       "src/assets/images/business-capability-map-kemhan.drawio.svg" \
       "src/assets/images/business-capability-map-kemhan-to-be.drawio.svg" \
       "src/assets/images/roadmap-implementasi-fase-business-architecture.drawio.svg" \
       "src/assets/images/arsitektur-teknologi-baseline.drawio.svg" \
       "src/assets/images/arsitektur-teknologi-target.drawio.svg" \
       "src/assets/images/roadmap-implementasi-fase-information-system-architecture.drawio.svg" \
       "src/assets/images/roadmap-implementasi-fase-technology-architecture.drawio.svg" \
       "src/assets/images/arsitektur-satelit.drawio.svg" \
       "src/assets/images/struktur-organisasi-kemhan-permenhan-30-2025-dan-13-2026.drawio.svg" \
       "src/assets/images/struktur-organisasi-kemhan-permenhan-30-2025-dan-13-2026-to-be.drawio.svg" \
       "src/assets/images/baseline-integrasi-antar-aplikasi-(silo).drawio.svg" \
       "src/assets/images/model-integrasi-target-denga-rasionalisasi-aplikasi.drawio.svg"
```

---

## Catatan keamanan

- `server/.env` berisi rahasia dan **sudah di-gitignore** — jangan pernah di-commit.
- Password `SmartX` cukup pendek (6 karakter). Bila repo bersifat publik dan hash
  sampai bocor, password sependek itu relatif mudah ditebak secara offline.
  Karena mengganti password hanya butuh satu perintah `npm run hash`, sangat
  disarankan memakai frasa yang lebih panjang saat sempat.
- Ini login bersama (satu akun) sesuai rencana. Bila nanti butuh banyak akun /
  peran berbeda, strukturnya sudah siap dikembangkan ke arah itu.

// ============================================================================
// Smart Defense — server Express
//   - Menyajikan SPA (dist) untuk semua orang (halaman TOGAF bersifat publik).
//   - /api/login, /api/logout, /api/me  : autentikasi (1 login bersama).
//   - /api/arsitektur, /api/jadc2/*, /api/assets/* : KONTEN TERKUNCI,
//     hanya dilayani bila cookie sesi sah (kalau tidak: 401).
// Sesi = JWT di cookie HttpOnly. Kredensial disimpan sebagai hash bcrypt di .env.
// ============================================================================
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // di belakang Cloudflare Tunnel

app.use(express.json({ limit: '64kb' }));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;
const USERNAME = process.env.APP_USERNAME || 'smartdefense';
const PASSWORD_HASH = process.env.APP_PASSWORD_HASH || '';
const SECRET = process.env.SESSION_SECRET || '';
const PROD = process.env.NODE_ENV === 'production';

const COOKIE = 'sd_session';
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 hari

if (!PASSWORD_HASH || !SECRET) {
  console.error('[FATAL] APP_PASSWORD_HASH dan SESSION_SECRET wajib diisi di .env');
  process.exit(1);
}

const DATA = path.join(__dirname, 'protected-data');
const ASSETS = path.join(__dirname, 'protected-assets');
const DIST = path.join(__dirname, 'dist'); // hasil "vite build" disalin ke sini saat docker build

// ---- helper sesi ----------------------------------------------------------
function issueSession(res) {
  const token = jwt.sign({ sub: USERNAME }, SECRET, { expiresIn: '7d' });
  res.cookie(COOKIE, token, {
    httpOnly: true,
    secure: PROD,       // wajib HTTPS di produksi (Cloudflare)
    sameSite: 'lax',
    maxAge: MAX_AGE_MS,
    path: '/',
  });
}
function isAuthed(req) {
  const t = req.cookies[COOKIE];
  if (!t) return false;
  try { jwt.verify(t, SECRET); return true; } catch { return false; }
}
function requireAuth(req, res, next) {
  if (isAuthed(req)) return next();
  return res.status(401).json({ error: 'unauthorized' });
}

// ---- rate limit khusus login ---------------------------------------------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Terlalu banyak percobaan login. Coba lagi beberapa saat.' },
});

// ---- rute autentikasi -----------------------------------------------------
app.post('/api/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ error: 'bad request' });
  }
  const okUser = username === USERNAME;
  const okPass = await bcrypt.compare(password, PASSWORD_HASH).catch(() => false);
  if (okUser && okPass) {
    issueSession(res);
    return res.json({ authenticated: true, user: USERNAME });
  }
  return res.status(401).json({ authenticated: false, error: 'Username atau password salah.' });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie(COOKIE, { path: '/' });
  res.json({ authenticated: false });
});

app.get('/api/me', (req, res) => {
  const ok = isAuthed(req);
  res.json({ authenticated: ok, user: ok ? USERNAME : null });
});

// ---- data terkunci --------------------------------------------------------
const sendJson = (file) => (req, res) => res.sendFile(path.join(DATA, file));

app.get('/api/arsitektur', requireAuth, sendJson('arsitektur.json'));
app.get('/api/jadc2/satuan-nasional', requireAuth, sendJson(path.join('jadc2', 'satuan-nasional.json')));
app.get('/api/jadc2/wilayah-index', requireAuth, sendJson(path.join('jadc2', 'wilayah-index.json')));
app.get('/api/jadc2/provinsi-index', requireAuth, sendJson(path.join('jadc2', 'provinsi-index.json')));
app.get('/api/jadc2/provinsi/:kode', requireAuth, (req, res) => {
  const kode = String(req.params.kode);
  if (!/^\d{2}$/.test(kode)) return res.status(400).json({ error: 'bad kode' });
  const f = path.join(DATA, 'jadc2', 'provinsi', kode + '.json');
  if (!fs.existsSync(f)) return res.status(404).json({ error: 'not found' });
  res.sendFile(f);
});

// ---- gambar terkunci ------------------------------------------------------
app.get('/api/assets/:name', requireAuth, (req, res) => {
  const name = path.basename(req.params.name); // cegah path traversal
  const f = path.join(ASSETS, name);
  if (!f.startsWith(ASSETS + path.sep) || !fs.existsSync(f)) return res.status(404).end();
  res.type('image/svg+xml');
  res.setHeader('Cache-Control', 'private, max-age=3600');
  res.sendFile(f);
});

// ---- SPA statis + fallback -------------------------------------------------
app.use(express.static(DIST));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' });
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, () => console.log(`[Smart Defense] server berjalan di :${PORT} (prod=${PROD})`));

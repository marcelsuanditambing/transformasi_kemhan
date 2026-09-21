// ============================================================================
// useAuth.js — status login bersama (satu sumber kebenaran untuk seluruh app).
// Sesi disimpan di cookie HttpOnly oleh backend; di sini kita hanya menanyakan
// status ke /api/me dan menyediakan login()/logout().
// ============================================================================
import { ref } from 'vue';

const authenticated = ref(false);
const user = ref(null);
const ready = ref(false); // sudah pernah cek /api/me?
let checkPromise = null;

async function refresh() {
  try {
    const r = await fetch('/api/me', { credentials: 'same-origin' });
    const d = await r.json();
    authenticated.value = !!d.authenticated;
    user.value = d.user || null;
  } catch {
    authenticated.value = false;
    user.value = null;
  } finally {
    ready.value = true;
  }
  return authenticated.value;
}

// Dipanggil sekali (di-cache); dipakai router guard & Navbar saat app dibuka.
function ensureChecked() {
  if (!checkPromise) checkPromise = refresh();
  return checkPromise;
}

async function login(username, password) {
  let d = {};
  try {
    const r = await fetch('/api/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    d = await r.json().catch(() => ({}));
    if (r.ok && d.authenticated) {
      authenticated.value = true;
      user.value = d.user || username;
      return { ok: true };
    }
    return { ok: false, error: d.error || 'Login gagal.' };
  } catch {
    return { ok: false, error: 'Tidak dapat terhubung ke server.' };
  }
}

async function logout() {
  try { await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' }); } catch {}
  authenticated.value = false;
  user.value = null;
}

export function useAuth() {
  return { authenticated, user, ready, ensureChecked, refresh, login, logout };
}

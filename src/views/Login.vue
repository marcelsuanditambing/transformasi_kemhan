<template>
  <section class="login">
    <div class="card">
      <h1 class="title">Masuk</h1>
      <p class="sub">Konten Arsitektur, Roadmap, dan JADC2 hanya untuk pengguna terautentikasi.</p>

      <form class="form" @submit.prevent="submit">
        <label class="field">
          <span>Username</span>
          <input
            v-model="username"
            type="text"
            autocomplete="username"
            autocapitalize="none"
            spellcheck="false"
            required
          />
        </label>

        <label class="field">
          <span>Password</span>
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>

        <p v-if="error" class="err" aria-live="polite">{{ error }}</p>

        <button class="btn" type="submit" :disabled="loading">
          {{ loading ? 'Memproses…' : 'Masuk' }}
        </button>
      </form>

      <router-link class="back" to="/">← Kembali ke TOGAF Pertahanan Indonesia</router-link>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/data/auth/useAuth.js';

const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const username = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function submit() {
  error.value = '';
  loading.value = true;
  const res = await login(username.value, password.value);
  loading.value = false;
  if (res.ok) {
    const dest = typeof route.query.redirect === 'string' ? route.query.redirect : '/arsitektur';
    router.replace(dest);
  } else {
    error.value = res.error;
    password.value = '';
  }
}
</script>

<style scoped>
.login {
  min-height: 60vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  color: #17213a;
}
.card {
  width: 100%;
  max-width: 380px;
  background: #ffffff;
  border: 1px solid #e2e5ea;
  border-radius: 16px;
  padding: 2rem 1.75rem;
  box-shadow: 0 10px 40px rgba(23, 33, 58, 0.08);
}
.title { margin: 0 0 0.35rem; font-size: 1.6rem; letter-spacing: -0.01em; }
.sub { margin: 0 0 1.5rem; color: #6b7488; font-size: 0.92rem; line-height: 1.5; }
.form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; font-weight: 600; color: #454f6b; }
.field input {
  font: inherit;
  padding: 0.65rem 0.8rem;
  border: 1px solid #d5dbe1;
  border-radius: 9px;
  color: #17213a;
  background: #fff;
}
.field input:focus { outline: none; border-color: #fa6800; box-shadow: 0 0 0 3px rgba(250, 104, 0, 0.15); }
.err { margin: 0; color: #b23b3b; font-size: 0.85rem; }
.btn {
  margin-top: 0.25rem;
  font: inherit;
  font-weight: 700;
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 9px;
  background: #fa6800;
  color: #fff;
  cursor: pointer;
  transition: filter 0.15s ease;
}
.btn:hover:not(:disabled) { filter: brightness(1.05); }
.btn:disabled { opacity: 0.6; cursor: default; }
.back { display: inline-block; margin-top: 1.25rem; font-size: 0.85rem; color: #6b7488; text-decoration: none; }
.back:hover { color: #fa6800; }
</style>

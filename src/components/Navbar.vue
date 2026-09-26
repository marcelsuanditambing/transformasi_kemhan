<template>
  <nav class="navbar">
    <ul>
      <li>
        <router-link to="/" exact-active-class="active">TOGAF Pertahanan Indonesia</router-link>
      </li>
      <template v-if="authenticated">
        <li>
          <router-link to="/arsitektur" active-class="active">Arsitektur Transformasi Digital Kemhan</router-link>
        </li>
        <li>
          <router-link to="/roadmap" active-class="active">Roadmap Transformasi Digital</router-link>
        </li>
        <li>
          <router-link to="/jadc2" active-class="active">JADC2 (Joint All-Domain Command and Control)</router-link>
        </li>
      </template>
    </ul>

    <div class="auth">
      <button v-if="authenticated" type="button" class="auth-btn" @click="doLogout">Logout</button>
      <router-link v-else to="/login" class="auth-btn" active-class="active">Login</router-link>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/data/auth/useAuth.js';

const router = useRouter();
const { authenticated, ensureChecked, logout } = useAuth();

onMounted(ensureChecked);

async function doLogout() {
  await logout();
  router.push('/');
}
</script>

<style scoped>
.navbar {
  background-color: #1e272e;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}
.navbar a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}
.navbar a:hover { color: #4b7bec; }
.navbar .active { border-bottom: 2px solid #4b7bec; }

.auth { flex: none; }
.auth-btn {
  font: inherit;
  font-weight: 600;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 8px;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s;
}
.auth-btn:hover { background: rgba(75, 123, 236, 0.25); border-color: #4b7bec; color: #fff; }

@media (max-width: 700px) {
  .navbar { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .navbar ul { flex-direction: column; gap: 1rem; }
}
</style>

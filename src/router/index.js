import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import Arsitektur from '../views/Arsitektur.vue';
import Roadmap from '../views/Roadmap.vue';
import JADC2 from '../views/JADC2.vue';
import Login from '../views/Login.vue';
import { useAuth } from '@/data/auth/useAuth.js';

const routes = [
  { path: '/', name: 'Landing', component: Landing }, // publik
  { path: '/login', name: 'Login', component: Login },
  { path: '/arsitektur', name: 'Arsitektur', component: Arsitektur, meta: { requiresAuth: true } },
  { path: '/roadmap', name: 'Roadmap', component: Roadmap, meta: { requiresAuth: true } },
  { path: '/jadc2', name: 'JADC2', component: JADC2, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Penjaga rute: halaman terkunci butuh sesi sah. Ini lapisan UX;
// pengamanan sebenarnya ada di API backend (401 tanpa sesi).
router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true;
  const { authenticated, ensureChecked } = useAuth();
  await ensureChecked();
  if (authenticated.value) return true;
  return { path: '/login', query: { redirect: to.fullPath } };
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import Arsitektur from '../views/Arsitektur.vue';
import Roadmap from '../views/Roadmap.vue';
import JADC2 from '../views/JADC2.vue';

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/arsitektur', name: 'Arsitektur', component: Arsitektur },
  { path: '/roadmap', name: 'Roadmap', component: Roadmap },
  { path: '/jadc2', name: 'JADC2', component: JADC2 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

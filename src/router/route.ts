import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/presentation/views/app-home.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

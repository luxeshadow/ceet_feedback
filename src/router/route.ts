import { createRouter, createWebHistory } from 'vue-router';
import { dashboardMiddleware } from '@/router/middleware';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/presentation/views/app-home.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/auth-component/app-register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/auth-component/app-login.vue'),
  },
  {
    path: '/list-feedback',
    name: 'ListFeedback',
    component: () => import('@/components/feedback-component/list-feedback.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/presentation/views/app-dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Stats',
        component: () => import('@/components/admin-component/stats-component/app-stats.vue'),
      },
      {
        path: 'createdepartement',
        name: 'DashboardCreateDep',
        component: () => import('@/components/admin-component/departement-component/create-departement.vue'),
      },
      {
        path: 'createmodule',
        name: 'DashboardCreateModule',
        component: () => import('@/components/admin-component/module-component/create-module.vue'),
      },
      {
        path: 'createphase',
        name: 'DashboardCreatePhase',
        component: () => import('@/components/admin-component/phase-component/create-phase.vue'),
      },
      {
        path: 'createtypefeedback',
        name: 'DashboardCreateTypefeedback',
        component: () => import('@/components/admin-component/type-feedback-component/create-type-feedback.vue'),
      },
      {
        path: 'assignationmodulefeedback',
        name: 'DashboardAssignationModulePhase',
        component: () => import('@/components/admin-component/assignation-module-phase-component/assignation-module-phase.vue'),
      },
      {
        path: 'listfeedback',
        name: 'DashboardListFeedback',
        component: () => import('@/components/admin-component/feedback-component/list-feedback.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  dashboardMiddleware(to, from, next);
});

export default router;

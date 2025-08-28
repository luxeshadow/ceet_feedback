import { useUserStore } from '@/presentation/stores/userStore';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export async function dashboardMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const userStore = useUserStore();
  await userStore.loadUser();

  const user = userStore.user;
  const role = userStore.role; 

  if (to.path.startsWith('/dashboard')) {
    if (!user) {
      next({ name: 'Login' });
    } else if (role !== 'admin' && role !== 'super_admin') {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
}

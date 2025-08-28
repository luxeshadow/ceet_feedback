// src/composables/useLogoutUser.ts
import { useUserStore } from '@/presentation/stores/userStore';
import { userApi } from '@/infrastructure/api/userApi';
import { showToast } from '@/shared/utils/toast';

export function useLogoutUser() {
  const userStore = useUserStore();

  const logout = async () => {
    try {
      await userApi.logout();
      userStore.logout();  
      showToast('Déconnexion réussie', { type: 'success' });
    } catch (err: any) {
      showToast('Erreur lors de la déconnexion', { type: 'error' });
      console.error(err);
    }
  };

  return { logout };
}

import { ref } from 'vue';
import { useUserStore } from '@/presentation/stores/userStore';
import { createUser } from '@/application/usescase/createUser';
import { User } from '@/domain/models/User';
import { showToast } from '@/shared/utils/toast';

export function useRegisterUser() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const userStore = useUserStore();

  const register = async (userData: Partial<User>) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await createUser(userData);
      userStore.setUser({
        user: response.user,
        token: response.token,
        role: response.role,
      });

      showToast("Compte créé avec succès !", { type: "success" });
      return true; // Indique le succès pour la logique dans la vue
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 422) {
          const errors = err.response.data.errors;
          error.value = Object.values(errors).flat().join("\n");
        } else if (err.response.data.message) {
          error.value = err.response.data.message;
        } else {
          error.value = "Une erreur est survenue";
        }
      } else {
        error.value = err.message || "Une erreur est survenue";
      }
      showToast(error.value || "Une erreur est survenue", { type: "error" });
      return false; // Indique l'échec pour la logique dans la vue
    } finally {
      loading.value = false;
    }
  };

  return {
    register,
    loading,
    error,
  };
}
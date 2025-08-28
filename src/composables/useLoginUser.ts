import { ref } from "vue";
import { loginUser } from "@/application/usescase/loginUser";
import { showToast } from "@/shared/utils/toast";
import type { LoginResponse } from "@/domain/models/User";
import { useUserStore } from "@/presentation/stores/userStore";

export function useLoginUser() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const response: LoginResponse = await loginUser(credentials);

      const { user, token, role } = response;

      const store = useUserStore();
      store.setUser({ user, token, role });

      showToast("Connexion réussie !", { type: "success" });

      return { user, role };
    } catch (err: any) {
      if (err.response?.data?.message) {
        error.value = err.response.data.message;
      } else {
        error.value = "Identifiants invalides";
      }
      showToast(error.value ?? "Erreur inconnue", { type: "error" }); 
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    login,
    loading,
    error,
  };
}


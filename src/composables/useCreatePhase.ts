import { ref } from 'vue';
import { createPhase } from '@/application/usescase/createPhase';
import { Phase, CreatePhaseResponse } from '@/domain/models/Phase';
import { showToast } from '@/shared/utils/toast';

export function useCreatePhase() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const create = async (phaseData: Partial<Phase>) => {
    loading.value = true;
    error.value = null;

    try {
      const response: CreatePhaseResponse = await createPhase(phaseData);
      showToast("Phase créée avec succès !", { type: "success" });
      return response;
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
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    create,
    loading,
    error,
  };
}

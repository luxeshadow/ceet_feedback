// composables/useCreateTypeFeedback.ts
import { ref } from 'vue';
import { createTypeFeedback } from '@/application/usescase/createTypeFeedback';
import { TypeFeedback, CreateTypeFeedbackResponse } from '@/domain/models/TypeFeedback';
import { showToast } from '@/shared/utils/toast';

export function useCreateTypeFeedback() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const create = async (typeFeedbackData: Partial<TypeFeedback>) => {
    loading.value = true;
    error.value = null;

    try {
      const response: CreateTypeFeedbackResponse = await createTypeFeedback(typeFeedbackData);
      showToast("TypeFeedback créé avec succès !", { type: "success" });
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

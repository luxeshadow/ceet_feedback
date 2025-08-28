// composables/useUpdateTypeFeedback.ts
import { ref } from 'vue';
import { typeFeedbackService } from '@/domain/services/typeFeedbackService';
import { TypeFeedback, CreateTypeFeedbackResponse } from '@/domain/models/TypeFeedback';
import { showToast } from '@/shared/utils/toast';

export function useUpdateTypeFeedback() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const update = async (id: number, typeFeedbackData: Partial<TypeFeedback>): Promise<TypeFeedback | null> => {
    loading.value = true;
    error.value = null;

    try {
      const response: CreateTypeFeedbackResponse = await typeFeedbackService.updateTypeFeedback(id, typeFeedbackData);
      showToast('TypeFeedback mis à jour avec succès !', { type: 'success' });

      // Retourne directement le TypeFeedback si ton backend renvoie { data: TypeFeedback }
      return response.data;
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 422) {
          const errors = err.response.data.errors;
          error.value = Object.values(errors).flat().join('\n');
        } else if (err.response.data.message) {
          error.value = err.response.data.message;
        } else {
          error.value = 'Une erreur est survenue';
        }
      } else {
        error.value = err.message || 'Une erreur est survenue';
      }
      showToast(error.value || '', { type: 'error' });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { update, loading, error };
}

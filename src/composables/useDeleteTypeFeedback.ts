// composables/useDeleteTypeFeedback.ts
import { ref, type Ref } from 'vue';
import { typeFeedbackService } from '@/domain/services/typeFeedbackService';
import { showToast } from '@/shared/utils/toast';
import type { TypeFeedback } from '@/domain/models/TypeFeedback';

export function useDeleteTypeFeedback(
  typeFeedbacks: Ref<TypeFeedback[]>,
  currentPage: Ref<number>,
  perPage: Ref<number>,
  total: Ref<number>,
  lastPage: Ref<number>
) {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const confirmingIds = ref(new Set<number>());
  const deletingIds = ref(new Set<number>());

  const remove = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      await typeFeedbackService.deleteTypeFeedback(id);
      showToast('TypeFeedback supprimé avec succès !', { type: 'success' });
      return true;
    } catch (err: any) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors;
        error.value = Object.values(errors).flat().join('\n');
      } else if (err.response?.data?.message) {
        error.value = err.response.data.message;
      } else {
        error.value = err.message || 'Une erreur est survenue';
      }
      showToast(error.value || '', { type: 'error' });
      return false;
    } finally {
      loading.value = false;
    }
  };

  const handleDelete = async (id: number, fetchTypeFeedbacks: (page: number) => Promise<void>) => {
    if (confirmingIds.value.has(id)) {
      deletingIds.value.add(id);
      const success = await remove(id);
      if (success) {
        typeFeedbacks.value = typeFeedbacks.value.filter((tf: TypeFeedback) => tf.id !== id);
        total.value -= 1;
        lastPage.value = Math.ceil(total.value / perPage.value);
        if (typeFeedbacks.value.length === 0 && currentPage.value > 1) {
          await fetchTypeFeedbacks(currentPage.value - 1);
        }
      }
      deletingIds.value.delete(id);
      confirmingIds.value.delete(id);
    } else {
      confirmingIds.value.clear();
      confirmingIds.value.add(id);
    }
  };

  return {
    remove,
    handleDelete,
    loading,
    error,
    confirmingIds,
    deletingIds
  };
}

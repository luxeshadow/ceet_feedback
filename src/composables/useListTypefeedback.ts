// composables/useListTypeFeedbacks.ts
import { ref } from 'vue';
import { typeFeedbackService } from '@/domain/services/typeFeedbackService';
import { TypeFeedback } from '@/domain/models/TypeFeedback';
import { showToast } from '@/shared/utils/toast';

export function useListTypeFeedbacks() {
  const typeFeedbacks = ref<TypeFeedback[]>([]);
  const allTypeFeedbacks = ref<TypeFeedback[]>([]);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(5);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Pagination
  const fetchTypeFeedbacks = async (page: number = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await typeFeedbackService.listTypeFeedbacks(page);
      typeFeedbacks.value = response.data;
      currentPage.value = response.current_page;
      lastPage.value = response.last_page;
      perPage.value = response.per_page;
      total.value = response.total;
    } catch (err: any) {
      error.value = String(err?.message || 'Une erreur est survenue lors du chargement des types de feedback');
      showToast(error.value, { type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  // Sans pagination
  const fetchAllTypeFeedbacks = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await typeFeedbackService.listAllTypeFeedbacks();
      allTypeFeedbacks.value = response;
    } catch (err: any) {
      error.value = String(err?.message || 'Une erreur est survenue lors du chargement des types de feedback');
      showToast(error.value, { type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  const refreshCurrentPage = async () => {
    await fetchTypeFeedbacks(currentPage.value);
  };

  return {
    typeFeedbacks,
    allTypeFeedbacks,
    currentPage,
    lastPage,
    perPage,
    total,
    loading,
    error,
    fetchTypeFeedbacks,
    fetchAllTypeFeedbacks,
    refreshCurrentPage,
  };
}

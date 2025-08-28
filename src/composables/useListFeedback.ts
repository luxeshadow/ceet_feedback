// src/composables/useListFeedback.ts
import { ref } from 'vue';
import { feedbackService } from '@/domain/services/feedbackService';
import { Feedback } from '@/domain/models/Feedback';
import { showToast } from '@/shared/utils/toast';

export function useListFeedback() {
  const feedbacks = ref<Feedback[]>([]);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(10);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Récupérer les feedbacks de l'utilisateur (paginés)
  const fetchMyFeedbacks = async (page: number = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await feedbackService.listMyFeedbacks(page, perPage.value);

      feedbacks.value = data.data.map(fb => ({
        ...fb,
        moduleName: fb.module?.name ?? '',
        typeFeedbackName: fb.typeFeedback?.name ?? '',
        departementName: fb.departement?.name ?? '',
        phaseName: fb.phase?.name ?? '',
        comments: fb.comments?.map(c => ({
          ...c,
          userName: c.user?.name ?? ''
        })) ?? []
      }));

      currentPage.value = data.current_page || page;
      lastPage.value = data.last_page || 1;
      perPage.value = data.per_page || perPage.value;
      total.value = data.total || data.data.length;
    } catch (err: any) {
      error.value = String(err?.message || 'Erreur lors de la récupération des feedbacks');
      showToast(error.value, { type: 'error' });
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  // Récupérer les feedbacks par groupId (non paginé)
  const fetchByGroupId = async (groupId: string) => {
    loading.value = true;
    error.value = null;

    try {
      const data = await feedbackService.getByGroupId(groupId);

      feedbacks.value = data.data.map(fb => ({
        ...fb,
        moduleName: fb.module?.name ?? '',
        typeFeedbackName: fb.typeFeedback?.name ?? '',
        departementName: fb.departement?.name ?? '',
        phaseName: fb.phase?.name ?? '',
        comments: fb.comments?.map(c => ({
          ...c,
          userName: c.user?.name ?? ''
        })) ?? []
      }));

      // pas de pagination ici, car c'est un seul groupe
      currentPage.value = 1;
      lastPage.value = 1;
      total.value = data.data.length;
    } catch (err: any) {
      error.value = String(err?.message || 'Erreur lors de la récupération par groupId');
      showToast(error.value, { type: 'error' });
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const refreshCurrentPage = async () => {
    await fetchMyFeedbacks(currentPage.value);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= lastPage.value) {
      currentPage.value = page;
      fetchMyFeedbacks(page);
    }
  };

  return {
    feedbacks,
    loading,
    currentPage,
    perPage,
    lastPage,
    total,
    error,
    fetchMyFeedbacks,
    fetchByGroupId, 
    refreshCurrentPage,
    goToPage,
  };
}

// composables/useListDepartements.ts
import { ref } from 'vue';
import { departementService } from '@/domain/services/departementService';
import { Departement } from '@/domain/models/Departement';
import { showToast } from '@/shared/utils/toast';

export function useListDepartements() {
  const departements = ref<Departement[]>([]);
  const allDepartements = ref<Departement[]>([]);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(5);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Pagination
  const fetchDepartements = async (page: number = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await departementService.listDepartements(page);
      departements.value = response.data;
      currentPage.value = response.current_page;
      lastPage.value = response.last_page;
      perPage.value = response.per_page;
      total.value = response.total;
    } catch (err: any) {
      error.value = String(err?.message || 'Une erreur est survenue lors du chargement des départements');
      showToast(error.value, { type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  // Sans pagination
  const fetchAllDepartements = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await departementService.listAllDepartements();
      allDepartements.value = response;
    } catch (err: any) {
      error.value = String(err?.message || 'Une erreur est survenue lors du chargement des départements');
      showToast(error.value, { type: 'error' });
    } finally {
      loading.value = false;
    }
  };
  const refreshCurrentPage = async () => {
    await fetchDepartements(currentPage.value);
  };

  return {
    departements,
    allDepartements,
    currentPage,
    lastPage,
    perPage,
    total,
    loading,
    error,
    fetchDepartements,
    fetchAllDepartements,
    refreshCurrentPage,
  };
}

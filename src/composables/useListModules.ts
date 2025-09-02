// composables/useListModules.ts
import { ref } from 'vue';
import { moduleService } from '@/domain/services/moduleService';
import { Module } from '@/domain/models/Module';
import { showToast } from '@/shared/utils/toast';

export function useListModules() {
  const modules = ref<Module[]>([]);
  const allModules = ref<Module[]>([]);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(5);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Pagination
  const fetchModules = async (page: number = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await moduleService.listModules(page);
      modules.value = response.data;
      currentPage.value = response.current_page;
      lastPage.value = response.last_page;
      perPage.value = response.per_page;
      total.value = response.total;
    } catch (err: any) {
      error.value = String(err?.message || 'Une erreur est survenue lors du chargement des modules');
      showToast(error.value, { type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  // Sans pagination
  const fetchAllModules = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await moduleService.listAllModules(); 
      allModules.value = response; 
    } catch (err: any) {
      error.value = String(err?.message || 'Une erreur est survenue lors du chargement des modules');
      showToast(error.value, { type: 'error' });
    } finally {
      loading.value = false;
    }
  };

const fetchModulesByDepartement = async (departementId: number) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await moduleService.getModulesByDepartement(departementId);
    modules.value = response?.data ?? [];
    total.value = response?.count ?? 0;
    return response; // ← ajouter ça
  } catch (err: any) {
    error.value = String(err?.message || 'Erreur lors de la récupération des modules pour ce département');
    showToast(error.value, { type: 'error' });
    return null;
  } finally {
    loading.value = false;
  }
};



  const refreshCurrentPage = async () => {
    await fetchModules(currentPage.value);
  };

  return {
    modules,
    allModules,
    currentPage,
    lastPage,
    perPage,
    total,
    loading,
    error,
    fetchModules,
    fetchAllModules,
    fetchModulesByDepartement,
    refreshCurrentPage,
  };
}

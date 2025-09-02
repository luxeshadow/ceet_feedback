// composables/useListPhases.ts
import { ref } from 'vue';
import { phaseService } from '@/domain/services/phaseService';
import { moduleService } from '@/domain/services/moduleService';
import { Phase } from '@/domain/models/Phase';
import { showToast } from '@/shared/utils/toast';

export function useListPhases() {
  const phases = ref<Phase[]>([]);
  const modulePhases = ref<Phase[]>([]);
  const modulePhasesCount = ref(0);

  const currentPage = ref(1);
  const lastPage = ref(1);
  const perPage = ref(5);
  const total = ref(0);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // ==============================
  // Phases globales (avec pagination)
  // ==============================
  const fetchPhases = async (page: number = 1) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await phaseService.listPhases(page);
      phases.value = response.data;
      currentPage.value = response.current_page;
      lastPage.value = response.last_page;
      perPage.value = response.per_page;
      total.value = response.total;
    } catch (err: any) {
      error.value = String(err?.message || 'Erreur lors du chargement des phases');
      showToast(error.value, { type: 'error' });
    } finally {
      loading.value = false;
    }
  };

  const refreshCurrentPage = async () => {
    await fetchPhases(currentPage.value);
  };

  // ==============================
  // Phases d'un module spécifique
  // ==============================
 const fetchModulePhases = async (moduleId: number) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await moduleService.getPhases(moduleId);

    // Phases assignées uniquement
    modulePhases.value = response.assigned.phases;
    modulePhasesCount.value = response.assigned.count;

  } catch (err: any) {
    error.value = String(err?.message || 'Erreur lors du chargement des phases du module');
    showToast(error.value, { type: 'error' });
  } finally {
    loading.value = false;
  }
};


  return {
    // phases globales
    phases,
    currentPage,
    lastPage,
    perPage,
    total,

    // phases d'un module
    modulePhases,
    modulePhasesCount,

    // états
    loading,
    error,

    // méthodes
    fetchPhases,
    refreshCurrentPage,
    fetchModulePhases,
  };
}

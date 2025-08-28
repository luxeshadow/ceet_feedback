// composables/useDeleteDepartement.ts
import { ref, type Ref } from 'vue';
import { departementService } from '@/domain/services/departementService';
import { showToast } from '@/shared/utils/toast';
import type { Departement } from '@/domain/models/Departement';

export function useDeleteDepartement(
  departements: Ref<Departement[]>,
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
      await departementService.deleteDepartement(id);
      showToast('Département supprimé avec succès !', { type: 'success' });
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

  const handleDelete = async (id: number, fetchDepartements: (page: number) => Promise<void>) => {
    if (confirmingIds.value.has(id)) {
      deletingIds.value.add(id);
      const success = await remove(id);
      if (success) {
        departements.value = departements.value.filter((dep: Departement) => dep.id !== id);
        total.value -= 1;
        lastPage.value = Math.ceil(total.value / perPage.value);
        if (departements.value.length === 0 && currentPage.value > 1) {
          await fetchDepartements(currentPage.value - 1);
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

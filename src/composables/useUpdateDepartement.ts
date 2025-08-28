import { ref } from 'vue';
import { departementService } from '@/domain/services/departementService';
import { Departement, CreateDepartementResponse } from '@/domain/models/Departement';
import { showToast } from '@/shared/utils/toast';

export function useUpdateDepartement() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const update = async (id: number, departementData: Partial<Departement>): Promise<Departement | null> => {
    loading.value = true;
    error.value = null;

    try {
      const response: CreateDepartementResponse = await departementService.updateDepartement(id, departementData);
      showToast('Département mis à jour avec succès !', { type: 'success' });
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

import { ref } from 'vue';
import { moduleService } from '@/domain/services/moduleService';
import { Module, CreateModuleResponse } from '@/domain/models/Module';
import { showToast } from '@/shared/utils/toast';

export function useUpdateModule() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const update = async (id: number, moduleData: Partial<Module>): Promise<Module | null> => {
    loading.value = true;
    error.value = null;

    try {
      const response: CreateModuleResponse = await moduleService.updateModule(id, moduleData);
      showToast('Module mis à jour avec succès !', { type: 'success' });

      // Si ton backend renvoie { data: Module }
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

import { ref } from 'vue';
import { phaseService } from '@/domain/services/phaseService';
import { Phase, CreatePhaseResponse } from '@/domain/models/Phase';
import { showToast } from '@/shared/utils/toast';

export function useUpdatePhase() {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const update = async (id: number, phaseData: Partial<Phase>): Promise<Phase | null> => {
    loading.value = true;
    error.value = null;

    try {
      const response: CreatePhaseResponse = await phaseService.updatePhase(id, phaseData);
      showToast('Phase mise à jour avec succès !', { type: 'success' });

      // Retourne directement le phase si ton backend renvoie { data: Phase }
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

// application/services/phaseService.ts
import { phaseApi, PaginatedResponse } from '@/infrastructure/api/phaseApi';
import { Phase, CreatePhaseResponse } from '@/domain/models/Phase';

export const phaseService = {
  createPhase(phase: Partial<Phase>): Promise<CreatePhaseResponse> {
    return phaseApi.create(phase);
  },

  listPhases(page: number): Promise<PaginatedResponse> {
    return phaseApi.list(page);
  },

  updatePhase(id: number, phase: Partial<Phase>): Promise<CreatePhaseResponse> {
    return phaseApi.update(id, phase);
  },

  deletePhase(id: number): Promise<void> {
    return phaseApi.delete(id);
  },
};

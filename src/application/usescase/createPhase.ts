import { Phase, CreatePhaseResponse } from '@/domain/models/Phase';
import { phaseService } from '@/domain/services/phaseService';
import { validatePhase } from '@/domain/validations/phaseValidation';

export async function createPhase(phaseData: Partial<Phase>): Promise<CreatePhaseResponse> {
  validatePhase(phaseData);
  return await phaseService.createPhase(phaseData);
}

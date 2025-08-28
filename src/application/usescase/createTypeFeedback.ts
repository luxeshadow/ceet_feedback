import { TypeFeedback, CreateTypeFeedbackResponse } from '@/domain/models/TypeFeedback';
import { phaseService } from '@/domain/services/phaseService';
import { validatePhase } from '@/domain/validations/phaseValidation';

export async function createTypeFeedback(phaseData: Partial<TypeFeedback>): Promise<CreateTypeFeedbackResponse> {
  validatePhase(phaseData);
  return await phaseService.createPhase(phaseData);
}

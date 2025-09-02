import { TypeFeedback, CreateTypeFeedbackResponse } from '@/domain/models/TypeFeedback';
import { typeFeedbackService } from '@/domain/services/typeFeedbackService';
import { validateTypeFeedback } from '@/domain/validations/typeFeedbackValidation';

export async function createTypeFeedback(typeFeedbackData: Partial<TypeFeedback>): Promise<CreateTypeFeedbackResponse> {
  validateTypeFeedback(typeFeedbackData);
  return await typeFeedbackService.createTypeFeedback(typeFeedbackData);
}

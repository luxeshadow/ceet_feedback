import { FeedbackCreatePayload, CreateFeedbackResponse } from '@/domain/models/Feedback';
import { feedbackService } from '@/domain/services/feedbackService';
import { validateFeedback } from '@/domain/validations/feedbackValidation';

export async function createFeedback(feedbackData: {
  description?: string;
  selectedPhases?: number[];
  selectedDepartment?: { id: number; name: string } | null;
  selectedTypeFeedback?: { id: number; name: string } | null;
  selectedModule?: { id: number; name: string } | null;
  file?: File | null;
}): Promise<CreateFeedbackResponse> {
  validateFeedback(feedbackData);


  const payload: FeedbackCreatePayload = {
    description: feedbackData.description!, 
    departement_id: feedbackData.selectedDepartment?.id,
    module_id: feedbackData.selectedModule?.id,
    type_feedback_id: feedbackData.selectedTypeFeedback?.id,
    phases: feedbackData.selectedPhases || [],
    file: feedbackData.file,
  };

  return await feedbackService.createFeedback(payload);
}

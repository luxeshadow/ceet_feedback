//application/usecases 
import { FeedbackCreatePayload, CreateFeedbackResponse } from '@/domain/models/Feedback';
import { feedbackService } from '@/domain/services/feedbackService';
import { validateFeedback } from '@/domain/validations/feedbackValidation';

export async function createFeedback(feedbackData: {
  description?: string;
  selectedPhases?: number[];
  selectedDepartment?: { id: number; name: string } | null;
  selectedTypeFeedback?: { id: number; name: string } | null;
  selectedModule?: { id: number; name: string } | null;
  files?: File[];
  departmentId?: number;
}): Promise<CreateFeedbackResponse> {
  // Validation des données
  validateFeedback(feedbackData);

  // Création du payload
  const payload: FeedbackCreatePayload = {
    description: feedbackData.description!,
    departement_id: feedbackData.departmentId ?? feedbackData.selectedDepartment?.id, // Utilise departmentId si disponible, sinon selectedDepartment?.id
    module_id: feedbackData.selectedModule?.id,
    type_feedback_id: feedbackData.selectedTypeFeedback?.id,
    phases: feedbackData.selectedPhases || [],
    files: feedbackData.files || [],
  };

  // Appel au service pour créer le feedback
  return await feedbackService.createFeedback(payload);
}
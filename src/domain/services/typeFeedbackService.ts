// application/services/typeFeedbackService.ts
import { typeFeedbackApi, PaginatedResponse } from '@/infrastructure/api/typeFeedbackApi';
import { TypeFeedback, CreateTypeFeedbackResponse } from '@/domain/models/TypeFeedback';

export const typeFeedbackService = {
  createTypeFeedback(typeFeedback: Partial<TypeFeedback>): Promise<CreateTypeFeedbackResponse> {
    return typeFeedbackApi.create(typeFeedback);
  },

  listTypeFeedbacks(page: number): Promise<PaginatedResponse> {
    return typeFeedbackApi.list(page);
  },
  listAllTypeFeedbacks(): Promise<TypeFeedback[]> {
    return typeFeedbackApi.listAll();
  },
  updateTypeFeedback(id: number, typeFeedback: Partial<TypeFeedback>): Promise<CreateTypeFeedbackResponse> {
    return typeFeedbackApi.update(id, typeFeedback);
  },

  deleteTypeFeedback(id: number): Promise<void> {
    return typeFeedbackApi.delete(id);
  },
};

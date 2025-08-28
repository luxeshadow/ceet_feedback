// infrastructure/api/feedbackApi.ts
import apiClient from '@/infrastructure/apiClient';
import { Feedback, CreateFeedbackResponse, FeedbackListResponse } from '@/domain/models/Feedback';

export const feedbackApi = {
 
  async create(feedback: Partial<Feedback>): Promise<CreateFeedbackResponse> {
    console.log("Body envoyé au backend :", feedback);

    const formData = new FormData();
    Object.entries(feedback).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
    
          value.forEach(v => formData.append(`${key}[]`, v as any));
        } else {
          formData.append(key, value as any);
        }
      }
    });

    const { data } = await apiClient.post('/feedbacks', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log("Réponse du backend :", data);
    return data;
  },

  async getMyFeedbacks(): Promise<FeedbackListResponse> {
    const { data } = await apiClient.get('/feedbacks');
    return data;
  },

  async getByGroupId(groupId: string): Promise<FeedbackListResponse> {
    const { data } = await apiClient.get(`/feedbacks/group/${groupId}`);
    return data;
  },
};

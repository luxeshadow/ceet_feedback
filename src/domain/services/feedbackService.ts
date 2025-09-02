// src/domain/services/feedbackService.ts
import apiClient from '@/infrastructure/apiClient';
import { FeedbackCreatePayload, CreateFeedbackResponse, FeedbackListResponse } from '@/domain/models/Feedback';

export const feedbackService = {

  async createFeedback(payload: FeedbackCreatePayload): Promise<CreateFeedbackResponse> {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Si c'est un tableau de fichiers
        if (key === 'files' && Array.isArray(value)) {
          value.forEach((file, index) => {
            formData.append('files[]', file as File); // FormData accepte File
          });
        }
        // Si c'est un tableau simple (ex: phases)
        else if (Array.isArray(value)) {
          value.forEach(v => formData.append(`${key}[]`, v as any));
        }
        // Valeurs simples
        else {
          formData.append(key, value as any);
        }
      }
    });

    const { data } = await apiClient.post('/feedbacks', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
  },

  listMyFeedbacks(page: number = 1, perPage: number = 10): Promise<FeedbackListResponse> {
    return apiClient
      .get(`/feedbacks?per_page=${perPage}&page=${page}`)
      .then(({ data }) => data);
  },

  getByGroupId(groupId: string): Promise<FeedbackListResponse> {
    return apiClient.get(`/feedbacks/group/${groupId}`).then(({ data }) => data);
  },
};

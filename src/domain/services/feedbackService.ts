// src/domain/services/feedbackService.ts
import apiClient from '@/infrastructure/apiClient';
import { FeedbackCreatePayload, CreateFeedbackResponse, FeedbackListResponse } from '@/domain/models/Feedback';

export const feedbackService = {

  async createFeedback(payload: FeedbackCreatePayload): Promise<CreateFeedbackResponse> {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
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

    return data;
  },

  // Liste paginée des feedbacks de l'utilisateur
  listMyFeedbacks(page: number = 1, perPage: number = 10): Promise<FeedbackListResponse> {
    return apiClient
      .get(`/feedbacks?per_page=${perPage}&page=${page}`)
      .then(({ data }) => data);
  },

  // Récupérer tous les feedbacks d'un groupe
  getByGroupId(groupId: string): Promise<FeedbackListResponse> {
    return apiClient.get(`/feedbacks/group/${groupId}`).then(({ data }) => data);
  },
};

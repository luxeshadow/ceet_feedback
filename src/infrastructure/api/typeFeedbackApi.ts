// infrastructure/api/typeFeedbackApi.ts
import apiClient from '@/infrastructure/apiClient';
import { TypeFeedback, CreateTypeFeedbackResponse } from '@/domain/models/TypeFeedback';

export interface PaginatedResponse {
  data: TypeFeedback[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export const typeFeedbackApi = {
  // Créer un type de feedback
  async create(typeFeedback: Partial<TypeFeedback>): Promise<CreateTypeFeedbackResponse> {
    console.log("Body envoyé au backend :", typeFeedback);
    const { data } = await apiClient.post('/type-feedbacks', typeFeedback);
    console.log("Réponse du backend :", data);
    return data;
  },

  // Lister les types de feedback avec pagination
  async list(page: number = 1): Promise<PaginatedResponse> {
    const { data } = await apiClient.get(`/type-feedbacks?page=${page}`);
    return data;
  },
  // Lister tous les types de feedback  sans pagination
  async listAll(): Promise<TypeFeedback[]> {
    const { data } = await apiClient.get('/type-feedbacks/all');
    return data;
  },

  // Mettre à jour un type de feedback
  async update(id: number, typeFeedback: Partial<TypeFeedback>): Promise<CreateTypeFeedbackResponse> {
    const { data } = await apiClient.put(`/type-feedbacks/${id}`, typeFeedback);
    return data;
  },

  // Supprimer un type de feedback
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/type-feedbacks/${id}`);
  },
};

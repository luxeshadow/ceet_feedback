// infrastructure/api/phaseApi.ts
import apiClient from '@/infrastructure/apiClient';
import { Phase, CreatePhaseResponse } from '@/domain/models/Phase';

export interface PaginatedResponse {
  data: Phase[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export const phaseApi = {
  // Créer une phase
  async create(phase: Partial<Phase>): Promise<CreatePhaseResponse> {
    console.log("Body envoyé au backend :", phase);
    const { data } = await apiClient.post('/phases', phase);
    console.log("Réponse du backend :", data);
    return data;
  },

  // Lister les phases avec pagination
  async list(page: number = 1): Promise<PaginatedResponse> {
    const { data } = await apiClient.get(`/phases?page=${page}`);
    return data;
  },

  // Mettre à jour une phase
  async update(id: number, phase: Partial<Phase>): Promise<CreatePhaseResponse> {
    const { data } = await apiClient.put(`/phases/${id}`, phase);
    return data;
  },

  // Supprimer une phase
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/phases/${id}`);
  },
};

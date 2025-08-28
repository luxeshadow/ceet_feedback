// infrastructure/api/departementApi.ts
import apiClient from '@/infrastructure/apiClient';
import { Departement, CreateDepartementResponse } from '@/domain/models/Departement';

export interface PaginatedResponse {
  data: Departement[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export const departementApi = {
  // Créer un département
  async create(departement: Partial<Departement>): Promise<CreateDepartementResponse> {
    const { data } = await apiClient.post('/departements', departement);
    return data;
  },

  // Lister les départements avec pagination
  async list(page: number = 1): Promise<PaginatedResponse> {
    const { data } = await apiClient.get(`/departements?page=${page}`);
    return data;
  },

  // Lister tous les départements sans pagination
  async listAll(): Promise<Departement[]> {
    const { data } = await apiClient.get('/departements/all');
    return data;
  },

  // Mettre à jour un département
  async update(id: number, departement: Partial<Departement>): Promise<CreateDepartementResponse> {
    const { data } = await apiClient.put(`/departements/${id}`, departement);
    return data;
  },

  // Supprimer un département
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/departements/${id}`);
  },
};

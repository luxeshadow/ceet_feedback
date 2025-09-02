// infrastructure/api/moduleApi.ts
import apiClient from '@/infrastructure/apiClient';
import { Module, CreateModuleResponse } from '@/domain/models/Module';

export interface PaginatedResponse {
  data: Module[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

export const moduleApi = {
  // Créer un module
  async create(module: Partial<Module>): Promise<CreateModuleResponse> {
    console.log("Body envoyé au backend :", module); // <- ton module ici
    const { data } = await apiClient.post('/modules', module);
    console.log("Réponse du backend :", data);
    return data;
  },

  // Lister les modules avec pagination
  async list(page: number = 1): Promise<PaginatedResponse> {
    const { data } = await apiClient.get(`/modules?page=${page}`);
    return data;
  },
  // Lister tous les Modules sans pagination
  async listAll(): Promise<Module[]> {
    const { data } = await apiClient.get('/modules/all');
    return data;
  },

  // Mettre à jour un module
  async update(id: number, module: Partial<Module>): Promise<CreateModuleResponse> {
    const { data } = await apiClient.put(`/modules/${id}`, module);
    return data;
  },

  // Supprimer un module
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/modules/${id}`);
  },

  // Récupérer les modules par département
  async getByDepartement(departementId: number): Promise<{ data: Module[]; count: number; departement_id: number }> {
  const { data } = await apiClient.get(`/modules/departement/${departementId}`);
  return data;
  },


  // =============================
  // Gestion des phases d'un module
  // =============================

  // Récupérer les phases d’un module
  async getPhases(moduleId: number) {
    const { data } = await apiClient.get(`/modules/${moduleId}/phases`);
    return data;
  },

  // Attacher une phase à un module
  async attachPhase(moduleId: number, phaseId: number) {
    const { data } = await apiClient.post(`/modules/${moduleId}/phases`, {
      phase_id: phaseId,
    });
    return data;
  },

  // Détacher une phase d’un module
  async detachPhase(moduleId: number, phaseId: number) {
    const { data } = await apiClient.delete(`/modules/${moduleId}/phases`, {
      data: { phase_id: phaseId }, // <= important: DELETE avec body
    });
    return data;
  },
};

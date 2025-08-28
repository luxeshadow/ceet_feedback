// domain/services/departementService.ts
import { departementApi, PaginatedResponse } from '@/infrastructure/api/departementApi';
import { Departement, CreateDepartementResponse } from '@/domain/models/Departement';

export const departementService = {
  createDepartement(departement: Partial<Departement>): Promise<CreateDepartementResponse> {
    return departementApi.create(departement);
  },

  listDepartements(page: number): Promise<PaginatedResponse> {
    return departementApi.list(page);
  },

  
  listAllDepartements(): Promise<Departement[]> {
    return departementApi.listAll();
  },

  updateDepartement(id: number, departement: Partial<Departement>): Promise<CreateDepartementResponse> {
    return departementApi.update(id, departement);
  },

  deleteDepartement(id: number): Promise<void> {
    return departementApi.delete(id);
  },
};

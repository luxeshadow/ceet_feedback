import { moduleApi, PaginatedResponse } from '@/infrastructure/api/moduleApi';
import { Module, CreateModuleResponse, ModulesByDepartementResponse } from '@/domain/models/Module';

export const moduleService = {
  createModule(module: Partial<Module>): Promise<CreateModuleResponse> {
    return moduleApi.create(module);
  },

  listAllModules(): Promise<Module[]> {
    return moduleApi.listAll();
  },

  listModules(page: number): Promise<PaginatedResponse> {
    return moduleApi.list(page);
  },

  updateModule(id: number, module: Partial<Module>): Promise<CreateModuleResponse> {
    return moduleApi.update(id, module);
  },

  deleteModule(id: number): Promise<void> {
    return moduleApi.delete(id);
  },

  // =============================
  // Gestion des phases d'un module
  // =============================

  getPhases(moduleId: number) {
    return moduleApi.getPhases(moduleId);
  },

  attachPhase(moduleId: number, phaseId: number) {
    return moduleApi.attachPhase(moduleId, phaseId);
  },

  detachPhase(moduleId: number, phaseId: number) {
    return moduleApi.detachPhase(moduleId, phaseId);
  },

  // =============================
  // Modules par département
  // =============================

  getModulesByDepartement(departementId: number): Promise<ModulesByDepartementResponse> {
    return moduleApi.getByDepartement(departementId);
  },
};

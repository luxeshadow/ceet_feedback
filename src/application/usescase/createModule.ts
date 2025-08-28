import { Module, CreateModuleResponse } from '@/domain/models/Module';
import { moduleService } from '@/domain/services/moduleService';
import { validateModule } from '@/domain/validations/moduleValidation';

export async function createModule(moduleData: Partial<Module>): Promise<CreateModuleResponse> {
  validateModule(moduleData);
  return await moduleService.createModule(moduleData);
}

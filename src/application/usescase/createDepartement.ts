import { Departement, CreateDepartementResponse } from '@/domain/models/Departement';
import { departementService } from '@/domain/services/departementService';
import { validateDepartement } from '@/domain/validations/departementValidation';

export async function createDepartement(departementData: Partial<Departement>): Promise<CreateDepartementResponse> {
  validateDepartement(departementData);
  return await departementService.createDepartement(departementData);
}

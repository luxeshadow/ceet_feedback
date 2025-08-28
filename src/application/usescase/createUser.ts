import { User, CreateUserResponse } from '@/domain/models/User';
import { userService } from '@/domain/services/userService';
import { validateRegister } from '@/domain/validations/userValidation';

export async function createUser(userData: Partial<User>): Promise<CreateUserResponse> {
  validateRegister(userData);
  return await userService.createUser(userData);
}
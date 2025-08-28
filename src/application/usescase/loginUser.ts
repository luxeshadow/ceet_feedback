import { LoginResponse } from '@/domain/models/User';
import { userService } from '@/domain/services/userService';
import { validateLogin } from '@/domain/validations/userValidation';

export async function loginUser(credentials: { email: string; password: string }): Promise<LoginResponse> {
  validateLogin(credentials);
  return await userService.loginUser(credentials);
}

import { userApi } from '@/infrastructure/api/userApi';
import { User, CreateUserResponse, LoginResponse } from '@/domain/models/User';

export const userService = {
  createUser(user: Partial<User>): Promise<CreateUserResponse> {
    return userApi.create(user);
  },

  loginUser(credentials: { email: string; password: string }): Promise<LoginResponse> {
    return userApi.login(credentials);
  },
};

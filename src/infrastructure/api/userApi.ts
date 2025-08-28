import apiClient from '@/infrastructure/apiClient';
import { User, CreateUserResponse, LoginResponse } from '@/domain/models/User';

export const userApi = {
  async create(user: Partial<User>): Promise<CreateUserResponse> {
    const { data } = await apiClient.post('/register', user);
    return data;
  },
  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const { data } = await apiClient.post('/login', credentials);
    return data; 
  },

  async logout(): Promise<void> {
    await apiClient.post('/logout');
  },
};

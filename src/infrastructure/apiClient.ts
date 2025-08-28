// src/infrastructure/apiClient.ts
import axios from 'axios';
import { API_BASE_URL } from '../shared/constants';
import { useUserStore } from '@/presentation/stores/userStore';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers = config.headers || {};
      // Utiliser la méthode `set` d'AxiosHeaders
      config.headers.set('Authorization', `Bearer ${userStore.token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const userStore = useUserStore();
      userStore.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

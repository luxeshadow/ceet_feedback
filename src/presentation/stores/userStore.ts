import { defineStore } from 'pinia';
import { User } from '@/domain/models/User';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    role: null as string | null,
  }),
  actions: {
    setUser(payload: { user: User; token?: string; role?: string }) {
      this.user = payload.user;
      this.token = payload.token || null;
      this.role = payload.role || null;
      localStorage.setItem('user', JSON.stringify(payload.user));
      if (payload.token) localStorage.setItem('token', payload.token);
      if (payload.role) localStorage.setItem('role', payload.role);
    },
    loadUser() {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (user) {
        this.user = JSON.parse(user);
        this.token = token;
        this.role = role;
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.role = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
  },
});
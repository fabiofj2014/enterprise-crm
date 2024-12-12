import { create } from 'zustand';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '11999887766',
    role: 'admin',
    avatar: null,
    preferences: {
      language: 'pt-BR',
      theme: 'light',
      notifications: {
        email: true,
        system: true,
        desktop: true
      }
    }
  },
  isAuthenticated: true,
  error: null,

  login: (user) => set({ user, isAuthenticated: true, error: null }),
  
  logout: () => set({ user: null, isAuthenticated: false, error: null }),
  
  updateUser: async (updates) => {
    try {
      set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
        error: null
      }));
    } catch (error) {
      set({ error: 'Erro ao atualizar usuário' });
      throw error;
    }
  }
}));
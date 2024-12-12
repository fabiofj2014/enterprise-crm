import { create } from 'zustand';
import type { Integration } from '../types/integration';

interface IntegrationState {
  integrations: Integration[];
  isLoading: boolean;
  error: string | null;
  addIntegration: (integration: Omit<Integration, 'id'>) => void;
  updateIntegration: (id: string, integration: Partial<Integration>) => void;
  deleteIntegration: (id: string) => void;
  syncIntegration: (id: string) => Promise<void>;
}

export const useIntegrationStore = create<IntegrationState>((set) => ({
  integrations: [],
  isLoading: false,
  error: null,

  addIntegration: (newIntegration) =>
    set((state) => ({
      integrations: [
        ...state.integrations,
        {
          ...newIntegration,
          id: Math.random().toString(36).substr(2, 9)
        }
      ]
    })),

  updateIntegration: (id, updatedIntegration) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === id
          ? { ...integration, ...updatedIntegration }
          : integration
      )
    })),

  deleteIntegration: (id) =>
    set((state) => ({
      integrations: state.integrations.filter(
        (integration) => integration.id !== id
      )
    })),

  syncIntegration: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Implementar sincronização com o provedor
      set((state) => ({
        integrations: state.integrations.map((integration) =>
          integration.id === id
            ? { ...integration, lastSync: new Date() }
            : integration
        )
      }));
    } catch (error) {
      set({ error: 'Erro ao sincronizar integração' });
    } finally {
      set({ isLoading: false });
    }
  }
}));
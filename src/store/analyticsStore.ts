import { create } from 'zustand';

interface AnalyticsMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageDealSize: number;
  totalRevenue: number;
  salesForecast: number;
}

interface AnalyticsState {
  metrics: AnalyticsMetrics;
  isLoading: boolean;
  error: string | null;
  timeRange: string;
  setTimeRange: (range: string) => void;
  fetchMetrics: () => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  metrics: {
    totalLeads: 2651,
    qualifiedLeads: 892,
    conversionRate: 24.8,
    averageDealSize: 45000,
    totalRevenue: 1250000,
    salesForecast: 2100000
  },
  isLoading: false,
  error: null,
  timeRange: 'last30days',
  
  setTimeRange: (range) => set({ timeRange: range }),
  
  fetchMetrics: async () => {
    set({ isLoading: true });
    try {
      // Simulação de chamada API
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ isLoading: false });
    } catch (error) {
      set({ error: 'Erro ao carregar métricas', isLoading: false });
    }
  }
}));
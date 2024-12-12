import { useQuery } from '@tanstack/react-query';
import { addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { predictSales } from '../utils/salesPrediction';
import { 
  calculateSalesMetrics, 
  analyzeSalesPerformance,
  comparePeriods,
  analyzeLossReasons 
} from '../utils/salesAnalysis';
import type { SalesAnalyticsData, SalesData } from '../types/analytics';

// Historical sales data with comprehensive coverage
const MOCK_HISTORICAL_DATA: SalesData[] = [
  {
    id: '1',
    date: '2024-01-15',
    value: 50000,
    status: 'won',
    salesPersonId: '1',
    createDate: '2024-01-01',
    closeDate: '2024-01-15',
    average: 45000
  },
  {
    id: '2',
    date: '2024-01-20',
    value: 75000,
    status: 'won',
    salesPersonId: '2',
    createDate: '2024-01-05',
    closeDate: '2024-01-20',
    average: 65000
  },
  {
    id: '3',
    date: '2024-02-10',
    value: 35000,
    status: 'won',
    salesPersonId: '1',
    createDate: '2024-01-25',
    closeDate: '2024-02-10',
    average: 40000
  }
];

interface AnalyticsParams {
  startDate?: Date;
  endDate?: Date;
  salespeople?: string[];
  products?: string[];
  regions?: string[];
}

export function useSalesAnalytics(params: AnalyticsParams = {}) {
  return useQuery<SalesAnalyticsData>({
    queryKey: ['salesAnalytics', params],
    queryFn: async () => {
      const currentDate = new Date();
      const startDate = params.startDate || startOfMonth(subMonths(currentDate, 1));
      const endDate = params.endDate || endOfMonth(currentDate);

      // Generate sales predictions
      const predictions = predictSales(MOCK_HISTORICAL_DATA);

      // Calculate current period metrics
      const currentMetrics = calculateSalesMetrics(
        MOCK_HISTORICAL_DATA,
        startDate,
        endDate
      );

      // Calculate previous period metrics
      const previousStartDate = subMonths(startDate, 1);
      const previousEndDate = subMonths(endDate, 1);
      const previousMetrics = calculateSalesMetrics(
        MOCK_HISTORICAL_DATA,
        previousStartDate,
        previousEndDate
      );

      // Calculate growth rates
      const revenueGrowth = ((currentMetrics.totalValue - previousMetrics.totalValue) / previousMetrics.totalValue) * 100;
      const conversionGrowth = currentMetrics.conversionRate - previousMetrics.conversionRate;

      // Performance analysis
      const performanceData = analyzeSalesPerformance(MOCK_HISTORICAL_DATA, [
        { id: '1', name: 'João Silva', team: 'SP', region: 'Sudeste' },
        { id: '2', name: 'Maria Santos', team: 'RJ', region: 'Sudeste' }
      ]);

      // Loss analysis
      const lossAnalysis = analyzeLossReasons(MOCK_HISTORICAL_DATA);

      return {
        predictedRevenue: predictions[0].value,
        revenueGrowth,
        conversionRate: currentMetrics.conversionRate,
        conversionGrowth,
        newCustomers: currentMetrics.totalDeals,
        customerGrowth: ((currentMetrics.totalDeals - previousMetrics.totalDeals) / previousMetrics.totalDeals) * 100,
        averageTicket: currentMetrics.averageDealSize,
        ticketGrowth: ((currentMetrics.averageDealSize - previousMetrics.averageDealSize) / previousMetrics.averageDealSize) * 100,
        
        forecast: {
          predictions: predictions.map(p => ({
            month: p.month,
            value: p.value,
            variation: p.confidence,
            trend: p.trend
          })),
          factors: predictions[0].factors.map(f => ({
            description: f.factor,
            impact: f.impact
          }))
        },

        performance: {
          salespeople: performanceData.map(p => ({
            id: p.salesperson.id,
            name: p.salesperson.name,
            region: p.salesperson.region,
            sales: p.metrics.totalValue,
            deals: p.metrics.totalDeals,
            progress: (p.metrics.totalValue / currentMetrics.totalValue) * 100
          })),
          highlights: {
            bestConversion: Math.max(...performanceData.map(p => p.metrics.conversionRate)),
            highestTicket: Math.max(...performanceData.map(p => p.metrics.averageDealSize))
          }
        },

        currentPeriod: {
          revenue: currentMetrics.totalValue,
          deals: currentMetrics.totalDeals,
          averageTicket: currentMetrics.averageDealSize,
          conversionRate: currentMetrics.conversionRate
        },

        previousPeriod: {
          revenue: previousMetrics.totalValue,
          deals: previousMetrics.totalDeals,
          averageTicket: previousMetrics.averageDealSize,
          conversionRate: previousMetrics.conversionRate
        },

        goals: {
          revenue: currentMetrics.totalValue * 1.2,
          deals: Math.ceil(currentMetrics.totalDeals * 1.15),
          averageTicket: currentMetrics.averageDealSize * 1.1,
          conversionRate: Math.min(currentMetrics.conversionRate * 1.1, 100)
        }
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false
  });
}
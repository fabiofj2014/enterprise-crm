export interface SalesData {
  id: string;
  date: string;
  value: number;
  status: 'won' | 'lost' | 'pending';
  salesPersonId: string;
  createDate: string;
  closeDate: string;
  lossReason?: string;
  average: number;
}

export interface SalesPerson {
  id: string;
  name: string;
  team: string;
  region: string;
}

export interface SalesMetrics {
  totalValue: number;
  totalDeals: number;
  wonDeals: number;
  averageDealSize: number;
  conversionRate: number;
  averageCycleTime: number;
}

export interface SalesComparison {
  current: SalesMetrics;
  previous: SalesMetrics;
  changes: {
    totalValue: number;
    totalDeals: number;
    averageDealSize: number;
    conversionRate: number;
    cycleTime: number;
  };
}

export interface PredictionResult {
  month: string;
  value: number;
  confidence: number;
  trend: 'up' | 'down';
  factors: Array<{
    factor: string;
    impact: 'positive' | 'negative';
    weight: number;
  }>;
}

export interface SalesAnalyticsData {
  predictedRevenue: number;
  revenueGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  newCustomers: number;
  customerGrowth: number;
  averageTicket: number;
  ticketGrowth: number;
  forecast: SalesForecastData;
  performance: SalesPerformanceData;
  currentPeriod: SalesPeriodData;
  previousPeriod: SalesPeriodData;
  goals: SalesPeriodData;
}

export interface SalesForecastData {
  predictions: Array<{
    month: string;
    value: number;
    variation: number;
    trend: 'up' | 'down';
  }>;
  factors: Array<{
    description: string;
    impact: 'positive' | 'negative';
  }>;
}

export interface SalesPerformanceData {
  salespeople: Array<{
    id: string;
    name: string;
    region: string;
    sales: number;
    deals: number;
    progress: number;
  }>;
  highlights: {
    bestConversion: number;
    highestTicket: number;
  };
}

export interface SalesPeriodData {
  revenue: number;
  deals: number;
  averageTicket: number;
  conversionRate: number;
}
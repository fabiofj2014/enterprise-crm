import { subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import type { 
  SalesData, 
  SalesMetrics, 
  SalesPerson,
  SalesComparison 
} from '../types/analytics';

export function calculateSalesMetrics(
  data: SalesData[],
  startDate: Date,
  endDate: Date
): SalesMetrics {
  const periodData = data.filter(d => 
    isWithinInterval(new Date(d.date), { start: startDate, end: endDate })
  );

  const totalValue = periodData.reduce((sum, d) => sum + d.value, 0);
  const totalDeals = periodData.length;
  const wonDeals = periodData.filter(d => d.status === 'won').length;
  const averageDealSize = totalValue / totalDeals;
  const conversionRate = (wonDeals / totalDeals) * 100;

  const cycleTimeSum = periodData.reduce((sum, d) => {
    return sum + (new Date(d.closeDate).getTime() - new Date(d.createDate).getTime());
  }, 0);
  const averageCycleTime = cycleTimeSum / (totalDeals * 24 * 60 * 60 * 1000); // Convert to days

  return {
    totalValue,
    totalDeals,
    wonDeals,
    averageDealSize,
    conversionRate,
    averageCycleTime
  };
}

export function analyzeSalesPerformance(
  data: SalesData[],
  salespeople: SalesPerson[]
): Array<{
  salesperson: SalesPerson;
  metrics: SalesMetrics;
  ranking: number;
  trend: 'up' | 'down' | 'stable';
}> {
  return salespeople.map(person => {
    const personData = data.filter(d => d.salesPersonId === person.id);
    const currentMonth = new Date();
    const lastMonth = subMonths(currentMonth, 1);

    const currentMetrics = calculateSalesMetrics(
      personData,
      startOfMonth(currentMonth),
      endOfMonth(currentMonth)
    );

    const previousMetrics = calculateSalesMetrics(
      personData,
      startOfMonth(lastMonth),
      endOfMonth(lastMonth)
    );

    const trend = determineTrend(currentMetrics.totalValue, previousMetrics.totalValue);

    return {
      salesperson: person,
      metrics: currentMetrics,
      ranking: 0, // Will be set after sorting
      trend
    };
  }).sort((a, b) => b.metrics.totalValue - a.metrics.totalValue)
    .map((result, index) => ({ ...result, ranking: index + 1 }));
}

export function comparePeriods(
  data: SalesData[],
  currentStart: Date,
  currentEnd: Date,
  previousStart: Date,
  previousEnd: Date
): SalesComparison {
  const currentMetrics = calculateSalesMetrics(data, currentStart, currentEnd);
  const previousMetrics = calculateSalesMetrics(data, previousStart, previousEnd);

  return {
    current: currentMetrics,
    previous: previousMetrics,
    changes: {
      totalValue: calculateChange(currentMetrics.totalValue, previousMetrics.totalValue),
      totalDeals: calculateChange(currentMetrics.totalDeals, previousMetrics.totalDeals),
      averageDealSize: calculateChange(currentMetrics.averageDealSize, previousMetrics.averageDealSize),
      conversionRate: calculateChange(currentMetrics.conversionRate, previousMetrics.conversionRate),
      cycleTime: calculateChange(currentMetrics.averageCycleTime, previousMetrics.averageCycleTime)
    }
  };
}

function calculateChange(current: number, previous: number): number {
  return previous === 0 ? 0 : ((current - previous) / previous) * 100;
}

function determineTrend(current: number, previous: number): 'up' | 'down' | 'stable' {
  const change = calculateChange(current, previous);
  if (Math.abs(change) < 5) return 'stable';
  return change > 0 ? 'up' : 'down';
}

export function analyzeLossReasons(data: SalesData[]): Array<{
  reason: string;
  count: number;
  value: number;
  percentage: number;
}> {
  const lostDeals = data.filter(d => d.status === 'lost');
  const totalLost = lostDeals.length;
  const reasonsMap = new Map<string, { count: number; value: number; }>();

  lostDeals.forEach(deal => {
    const current = reasonsMap.get(deal.lossReason) || { count: 0, value: 0 };
    reasonsMap.set(deal.lossReason, {
      count: current.count + 1,
      value: current.value + deal.value
    });
  });

  return Array.from(reasonsMap.entries())
    .map(([reason, stats]) => ({
      reason,
      count: stats.count,
      value: stats.value,
      percentage: (stats.count / totalLost) * 100
    }))
    .sort((a, b) => b.count - a.count);
}
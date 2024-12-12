import { addMonths, subMonths, format } from 'date-fns';
import type { SalesData, PredictionResult } from '../types/analytics';

export function calculateSeasonality(historicalData: SalesData[]): number[] {
  const monthlyFactors = Array(12).fill(0);
  const monthCounts = Array(12).fill(0);

  historicalData.forEach(data => {
    const month = new Date(data.date).getMonth();
    monthlyFactors[month] += data.value / data.average;
    monthCounts[month]++;
  });

  return monthlyFactors.map((sum, i) => sum / (monthCounts[i] || 1));
}

export function predictSales(
  historicalData: SalesData[],
  months: number = 3
): PredictionResult[] {
  const seasonalityFactors = calculateSeasonality(historicalData);
  const trend = calculateTrend(historicalData);
  const lastMonth = new Date(historicalData[historicalData.length - 1].date);

  return Array.from({ length: months }, (_, i) => {
    const targetMonth = addMonths(lastMonth, i + 1);
    const baseValue = calculateBaseValue(historicalData);
    const seasonalFactor = seasonalityFactors[targetMonth.getMonth()];
    const trendFactor = 1 + (trend * (i + 1));

    const predictedValue = baseValue * seasonalFactor * trendFactor;
    const confidence = calculateConfidence(historicalData, predictedValue);

    return {
      month: format(targetMonth, 'MMMM yyyy'),
      value: Math.round(predictedValue),
      confidence,
      trend: trend > 0 ? 'up' : 'down',
      factors: analyzeFactors(historicalData, targetMonth)
    };
  });
}

function calculateTrend(data: SalesData[]): number {
  const periods = data.length;
  const xMean = (periods - 1) / 2;
  const yMean = data.reduce((sum, d) => sum + d.value, 0) / periods;

  const slope = data.reduce((sum, d, i) => {
    return sum + (d.value - yMean) * (i - xMean);
  }, 0) / data.reduce((sum, _, i) => sum + Math.pow(i - xMean, 2), 0);

  return slope / yMean;
}

function calculateBaseValue(data: SalesData[]): number {
  const recentMonths = data.slice(-3);
  return recentMonths.reduce((sum, d) => sum + d.value, 0) / recentMonths.length;
}

function calculateConfidence(data: SalesData[], predicted: number): number {
  const variance = calculateVariance(data);
  const standardDeviation = Math.sqrt(variance);
  const meanValue = data.reduce((sum, d) => sum + d.value, 0) / data.length;
  
  const zScore = Math.abs(predicted - meanValue) / standardDeviation;
  return Math.max(0, Math.min(100, 100 * (1 - zScore / 3)));
}

function calculateVariance(data: SalesData[]): number {
  const mean = data.reduce((sum, d) => sum + d.value, 0) / data.length;
  return data.reduce((sum, d) => sum + Math.pow(d.value - mean, 2), 0) / data.length;
}

function analyzeFactors(data: SalesData[], targetMonth: Date): Array<{
  factor: string;
  impact: 'positive' | 'negative';
  weight: number;
}> {
  const factors = [];
  const previousYear = data.filter(d => {
    const date = new Date(d.date);
    return date.getMonth() === targetMonth.getMonth() &&
           date.getFullYear() === targetMonth.getFullYear() - 1;
  });

  if (previousYear.length > 0) {
    const yearOverYearGrowth = calculateYearOverYearGrowth(data);
    factors.push({
      factor: 'Crescimento anual',
      impact: yearOverYearGrowth > 0 ? 'positive' : 'negative',
      weight: Math.abs(yearOverYearGrowth)
    });
  }

  const seasonality = calculateSeasonality(data)[targetMonth.getMonth()];
  factors.push({
    factor: 'Sazonalidade',
    impact: seasonality > 1 ? 'positive' : 'negative',
    weight: Math.abs(seasonality - 1)
  });

  return factors.sort((a, b) => b.weight - a.weight);
}

function calculateYearOverYearGrowth(data: SalesData[]): number {
  const thisYear = data.slice(-12);
  const lastYear = data.slice(-24, -12);
  
  const thisYearSum = thisYear.reduce((sum, d) => sum + d.value, 0);
  const lastYearSum = lastYear.reduce((sum, d) => sum + d.value, 0);
  
  return (thisYearSum - lastYearSum) / lastYearSum;
}
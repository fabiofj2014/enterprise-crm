import { addMonths, subMonths, format } from 'date-fns';
import type { Product, ProductAnalytics } from '../types/product';

export function calculateProductMetrics(
  product: Product,
  salesData: Array<{ date: Date; volume: number; revenue: number }>
): Partial<ProductAnalytics['sales']> {
  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.revenue, 0);
  const totalVolume = salesData.reduce((sum, sale) => sum + sale.volume, 0);
  const margin = (product.price - product.cost) / product.price * 100;

  return {
    volume: totalVolume,
    revenue: totalRevenue,
    margin,
    revenueShare: 0, // Calculated later when we have total company revenue
    growth: 0, // Calculated by comparing periods
    seasonalityIndex: 1 // Default, updated with seasonal analysis
  };
}

export function analyzeSeasonality(
  salesData: Array<{ date: Date; volume: number }>
): number[] {
  const monthlyVolumes = Array(12).fill(0);
  const monthCounts = Array(12).fill(0);

  salesData.forEach(sale => {
    const month = sale.date.getMonth();
    monthlyVolumes[month] += sale.volume;
    monthCounts[month]++;
  });

  const averageVolume = monthlyVolumes.reduce((sum, vol) => sum + vol, 0) / 
    monthCounts.reduce((sum, count) => sum + count, 0);

  return monthlyVolumes.map((volume, i) => 
    monthCounts[i] ? volume / (monthCounts[i] * averageVolume) : 1
  );
}

export function generateRecommendations(
  metrics: Partial<ProductAnalytics>
): ProductAnalytics['recommendations'] {
  const sales = metrics.sales!;
  const costs = metrics.costs!;

  if (sales.margin < 20 || sales.growth < -10) {
    return {
      action: 'optimize',
      pricingStrategy: 'Revisar estrutura de custos e considerar aumento de preços',
      operationalImprovements: [
        'Otimizar processo produtivo',
        'Renegociar com fornecedores',
        'Reduzir custos indiretos'
      ],
      marketingActions: [
        'Focar em segmentos mais rentáveis',
        'Desenvolver proposta de valor diferenciada'
      ]
    };
  }

  return {
    action: 'grow',
    pricingStrategy: 'Manter preços competitivos com foco em valor agregado',
    operationalImprovements: [
      'Expandir capacidade produtiva',
      'Otimizar logística de entrega'
    ],
    marketingActions: [
      'Aumentar investimento em marketing digital',
      'Desenvolver programa de fidelidade'
    ]
  };
}
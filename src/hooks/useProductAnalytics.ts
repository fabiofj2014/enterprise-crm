import { useQuery } from '@tanstack/react-query';
import { addMonths, subMonths, format } from 'date-fns';
import type { Product, ProductAnalytics } from '../types/product';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Software Enterprise',
    category: 'Licenças',
    price: 50000,
    cost: 15000,
    launchDate: new Date('2023-01-01')
  },
  {
    id: '2',
    name: 'Consultoria Estratégica',
    category: 'Serviços',
    price: 25000,
    cost: 18000,
    launchDate: new Date('2023-03-15')
  }
];

export function useProductAnalytics(period: string = 'last12months') {
  return useQuery({
    queryKey: ['productAnalytics', period],
    queryFn: async (): Promise<ProductAnalytics[]> => {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      return MOCK_PRODUCTS.map(product => ({
        id: `${product.id}-${period}`,
        productId: product.id,
        period,
        sales: {
          volume: Math.floor(Math.random() * 100),
          revenue: Math.random() * 1000000,
          margin: (product.price - product.cost) / product.price * 100,
          revenueShare: Math.random() * 100,
          growth: Math.random() * 40 - 20,
          seasonalityIndex: 1 + (Math.random() * 0.5 - 0.25)
        },
        customers: {
          top: Array.from({ length: 3 }, (_, i) => ({
            id: `c${i + 1}`,
            name: `Cliente ${i + 1}`,
            volume: Math.floor(Math.random() * 50),
            revenue: Math.random() * 500000
          })),
          satisfaction: 85 + Math.random() * 10
        },
        costs: {
          direct: product.cost * (Math.random() * 100),
          indirect: product.cost * (Math.random() * 30),
          total: product.cost * (Math.random() * 130)
        },
        delivery: {
          averageTime: Math.floor(Math.random() * 30),
          onTimeRate: 85 + Math.random() * 10
        },
        competition: Array.from({ length: 3 }, (_, i) => ({
          name: `Concorrente ${i + 1}`,
          price: product.price * (0.8 + Math.random() * 0.4),
          marketShare: Math.random() * 30
        })),
        recommendations: {
          action: Math.random() > 0.7 ? 'optimize' : 'grow',
          pricingStrategy: 'Manter preços competitivos com foco em valor agregado',
          operationalImprovements: [
            'Otimizar processo de entrega',
            'Reduzir custos indiretos'
          ],
          marketingActions: [
            'Aumentar presença digital',
            'Desenvolver programa de fidelidade'
          ]
        }
      }));
    },
    staleTime: 5 * 60 * 1000,
    retry: 2
  });
}
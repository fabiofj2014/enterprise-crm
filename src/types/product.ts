export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  launchDate: Date;
}

export interface ProductAnalytics {
  id: string;
  productId: string;
  period: string;
  sales: {
    volume: number;
    revenue: number;
    margin: number;
    revenueShare: number;
    growth: number;
    seasonalityIndex: number;
  };
  customers: {
    top: Array<{
      id: string;
      name: string;
      volume: number;
      revenue: number;
    }>;
    satisfaction: number;
  };
  costs: {
    direct: number;
    indirect: number;
    total: number;
  };
  delivery: {
    averageTime: number;
    onTimeRate: number;
  };
  competition: Array<{
    name: string;
    price: number;
    marketShare: number;
  }>;
  recommendations: {
    action: 'grow' | 'maintain' | 'optimize' | 'discontinue';
    pricingStrategy: string;
    operationalImprovements: string[];
    marketingActions: string[];
  };
}
import React, { useState } from 'react';
import { BarChart, LineChart, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import Card from '../common/Card';
import SalesForecast from './SalesForecast';
import SalesPerformance from './SalesPerformance';
import SalesComparison from './SalesComparison';
import AnalyticsFilters from './AnalyticsFilters';
import { useSalesAnalytics } from '../../hooks/useSalesAnalytics';
import { filterAnalyticsData } from '../../utils/analytics';

export default function SalesAnalytics() {
  const [filters, setFilters] = useState({
    dateRange: {
      start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      end: new Date()
    },
    salespeople: [] as string[],
    products: [] as string[],
    regions: [] as string[]
  });

  const { data: metrics, isLoading, error } = useSalesAnalytics({
    startDate: filters.dateRange.start,
    endDate: filters.dateRange.end,
    salespeople: filters.salespeople,
    products: filters.products,
    regions: filters.regions
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Erro ao carregar dados de análise</div>
      </div>
    );
  }

  if (isLoading || !metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">{ptBR.common.loading}</div>
      </div>
    );
  }

  const filteredData = filterAnalyticsData(metrics, filters);

  const stats = [
    { 
      name: 'Receita Prevista', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filteredData.predictedRevenue),
      change: `${filteredData.revenueGrowth >= 0 ? '+' : ''}${filteredData.revenueGrowth.toFixed(1)}%`,
      icon: DollarSign 
    },
    { 
      name: 'Taxa de Conversão', 
      value: `${filteredData.conversionRate.toFixed(1)}%`,
      change: `${filteredData.conversionGrowth >= 0 ? '+' : ''}${filteredData.conversionGrowth.toFixed(1)}%`,
      icon: Target 
    },
    { 
      name: 'Novos Clientes', 
      value: filteredData.newCustomers,
      change: `${filteredData.customerGrowth >= 0 ? '+' : ''}${filteredData.customerGrowth.toFixed(1)}%`,
      icon: Users 
    },
    { 
      name: 'Ticket Médio', 
      value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(filteredData.averageTicket),
      change: `${filteredData.ticketGrowth >= 0 ? '+' : ''}${filteredData.ticketGrowth.toFixed(1)}%`,
      icon: BarChart 
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{ptBR.analytics.title}</h1>
      </div>

      <AnalyticsFilters 
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={() => setFilters({
          dateRange: {
            start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            end: new Date()
          },
          salespeople: [],
          products: [],
          regions: []
        })}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesForecast data={filteredData.forecast} />
        <SalesPerformance data={filteredData.performance} />
      </div>

      <SalesComparison
        currentPeriod={filteredData.currentPeriod}
        previousPeriod={filteredData.previousPeriod}
        goals={filteredData.goals}
      />
    </div>
  );
}
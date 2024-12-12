import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../common/Card';
import { SalesPeriodData } from '../../types/analytics';

interface SalesComparisonProps {
  currentPeriod: SalesPeriodData;
  previousPeriod: SalesPeriodData;
  goals: SalesPeriodData;
}

export default function SalesComparison({ 
  currentPeriod, 
  previousPeriod, 
  goals 
}: SalesComparisonProps) {
  const metrics = [
    { 
      name: 'Receita Total',
      current: currentPeriod.revenue,
      previous: previousPeriod.revenue,
      goal: goals.revenue,
      format: 'currency'
    },
    {
      name: 'Número de Vendas',
      current: currentPeriod.deals,
      previous: previousPeriod.deals,
      goal: goals.deals,
      format: 'number'
    },
    {
      name: 'Ticket Médio',
      current: currentPeriod.averageTicket,
      previous: previousPeriod.averageTicket,
      goal: goals.averageTicket,
      format: 'currency'
    },
    {
      name: 'Taxa de Conversão',
      current: currentPeriod.conversionRate,
      previous: previousPeriod.conversionRate,
      goal: goals.conversionRate,
      format: 'percentage'
    }
  ];

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(value);
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString('pt-BR');
    }
  };

  const calculateVariation = (current: number, previous: number) => {
    const variation = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(variation).toFixed(1),
      trend: variation >= 0 ? 'up' : 'down'
    };
  };

  const calculateGoalProgress = (current: number, goal: number) => {
    return (current / goal) * 100;
  };

  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">Análise Comparativa</h3>
        <p className="text-sm text-gray-500">Período atual vs. anterior e metas</p>
      </div>

      <div className="space-y-6">
        {metrics.map((metric) => {
          const variation = calculateVariation(metric.current, metric.previous);
          const progress = calculateGoalProgress(metric.current, metric.goal);

          return (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    {formatValue(metric.current, metric.format)}
                  </span>
                  <div className={`flex items-center text-sm ${
                    variation.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {variation.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span>{variation.value}%</span>
                  </div>
                </div>
              </div>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {progress.toFixed(1)}% da meta
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      Meta: {formatValue(metric.goal, metric.format)}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div
                    style={{ width: `${Math.min(progress, 100)}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
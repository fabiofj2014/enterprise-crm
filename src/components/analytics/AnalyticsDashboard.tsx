import React from 'react';
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  Download
} from 'lucide-react';
import { ptBR } from '../../config/i18n';
import { useAnalyticsStore } from '../../store/analyticsStore';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import TimeRangeSelector from './TimeRangeSelector';
import Button from '../common/Button';

export default function AnalyticsDashboard() {
  const { metrics, isLoading } = useAnalyticsStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">{ptBR.common.loading}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {ptBR.analytics.title}
        </h1>
        <div className="flex items-center space-x-4">
          <TimeRangeSelector />
          <Button variant="outline" icon={Download}>
            {ptBR.analytics.exportReport}
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title={ptBR.analytics.metrics.totalLeads}
          value={metrics.totalLeads.toLocaleString('pt-BR')}
          change="+12,5%"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title={ptBR.analytics.metrics.qualifiedLeads}
          value={metrics.qualifiedLeads.toLocaleString('pt-BR')}
          change="+8,2%"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title={ptBR.analytics.metrics.totalRevenue}
          value={formatCurrency(metrics.totalRevenue)}
          change="+15,3%"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title={ptBR.analytics.metrics.conversionRate}
          value={formatPercent(metrics.conversionRate)}
          change="+2,3%"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard 
          title={ptBR.analytics.sections.salesOverview}
          icon={BarChartIcon}
        >
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded">
            <div className="text-center">
              <BarChartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                {ptBR.analytics.sections.charts.salesChart}
              </p>
            </div>
          </div>
        </ChartCard>

        <ChartCard 
          title={ptBR.analytics.sections.leadSources}
          icon={PieChartIcon}
        >
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded">
            <div className="text-center">
              <PieChartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                {ptBR.analytics.sections.charts.leadSourcesChart}
              </p>
            </div>
          </div>
        </ChartCard>

        <ChartCard 
          title={ptBR.analytics.sections.conversionRates}
          icon={LineChartIcon}
        >
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded">
            <div className="text-center">
              <LineChartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                {ptBR.analytics.sections.charts.conversionChart}
              </p>
            </div>
          </div>
        </ChartCard>

        <ChartCard 
          title={ptBR.analytics.sections.teamPerformance}
          icon={BarChartIcon}
        >
          <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded">
            <div className="text-center">
              <BarChartIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                {ptBR.analytics.sections.charts.performanceChart}
              </p>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
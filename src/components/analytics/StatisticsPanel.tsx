import React from 'react';
import { DollarSign, Users, Target, TrendingUp } from 'lucide-react';
import Card from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  loading?: boolean;
}

function StatCard({ title, value, change, icon: Icon, loading }: StatCardProps) {
  const isPositive = change.startsWith('+');

  if (loading) {
    return (
      <Card>
        <div className="p-5 animate-pulse">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gray-200 h-6 w-6 rounded" />
            <div className="ml-5 w-full">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="mt-2 h-6 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="p-5 transition-all duration-200 hover:bg-gray-50">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  {value}
                </div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function StatisticsPanel() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: 'Receita Total',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(125200),
      change: '+15.3%',
      icon: DollarSign
    },
    {
      title: 'Novos Leads',
      value: '2,651',
      change: '+12.5%',
      icon: Users
    },
    {
      title: 'Taxa de Conversão',
      value: '24.8%',
      change: '+2.3%',
      icon: Target
    },
    {
      title: 'Ticket Médio',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(47228),
      change: '+5.2%',
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          loading={loading}
        />
      ))}
    </div>
  );
}
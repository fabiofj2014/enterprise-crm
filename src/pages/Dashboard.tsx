import React from 'react';
import { Users, Target, DollarSign, TrendingUp, Activity, CheckSquare } from 'lucide-react';
import Card from '../components/common/Card';

const stats = [
  {
    id: 'total-leads',
    name: 'Total de Leads',
    value: '2.651',
    change: '+12,5%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600'
  },
  {
    id: 'open-deals',
    name: 'Negócios Abertos',
    value: '485',
    change: '+5,2%',
    trend: 'up',
    icon: Target,
    color: 'text-purple-600'
  },
  {
    id: 'revenue',
    name: 'Receita',
    value: 'R$ 125.200',
    change: '+15,3%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600'
  },
  {
    id: 'conversion',
    name: 'Taxa de Conversão',
    value: '24,8%',
    change: '+2,3%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-indigo-600'
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-2 ${stat.color} bg-opacity-10`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {stat.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <span className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Atividades e Tarefas */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Atividades Recentes
              </h3>
              <Activity className="h-5 w-5 text-gray-500" />
            </div>
            <div className="text-sm text-gray-600 text-center py-8">
              Nenhuma atividade recente para exibir.
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Tarefas Pendentes
              </h3>
              <CheckSquare className="h-5 w-5 text-gray-500" />
            </div>
            <div className="text-sm text-gray-600 text-center py-8">
              Nenhuma tarefa pendente para exibir.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
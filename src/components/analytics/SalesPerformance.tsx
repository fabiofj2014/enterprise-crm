import React from 'react';
import { BarChart } from 'lucide-react';
import Card from '../common/Card';
import { SalesPerformanceData } from '../../types/analytics';

interface SalesPerformanceProps {
  data: SalesPerformanceData;
}

export default function SalesPerformance({ data }: SalesPerformanceProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Performance de Vendas</h3>
          <p className="text-sm text-gray-500">Por vendedor</p>
        </div>
        <BarChart className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {data.salespeople.map((person) => (
          <div key={person.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{person.name}</p>
                <p className="text-xs text-gray-500">{person.region}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(person.sales)}
                </p>
                <p className="text-xs text-gray-500">
                  {person.deals} negócios
                </p>
              </div>
            </div>

            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {person.progress}% da meta
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                <div
                  style={{ width: `${person.progress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Destaques</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-900">Melhor Conversão</p>
            <p className="text-lg font-semibold text-green-600">{data.highlights.bestConversion}%</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-900">Maior Ticket</p>
            <p className="text-lg font-semibold text-blue-600">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(data.highlights.highestTicket)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
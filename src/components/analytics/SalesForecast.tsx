import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import { SalesForecastData } from '../../types/analytics';

interface SalesForecastProps {
  data: SalesForecastData;
}

export default function SalesForecast({ data }: SalesForecastProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Previsão de Vendas</h3>
          <p className="text-sm text-gray-500">Próximos 3 meses</p>
        </div>
        <TrendingUp className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {data.predictions.map((prediction) => (
          <div key={prediction.month} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{prediction.month}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  prediction.trend === 'up' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                {prediction.trend === 'up' ? 'Tendência de alta' : 'Tendência de queda'}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(prediction.value)}
              </p>
              <p className={`text-sm ${
                prediction.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {prediction.trend === 'up' ? '+' : ''}{prediction.variation}%
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Fatores de Influência</h4>
        <div className="space-y-2">
          {data.factors.map((factor, index) => (
            <div key={index} className="flex items-center text-sm">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                factor.impact === 'positive' ? 'bg-green-400' : 'bg-red-400'
              }`} />
              <span className="text-gray-600">{factor.description}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
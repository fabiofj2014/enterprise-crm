import React from 'react';
import { BarChart, TrendingUp, Users, Clock } from 'lucide-react';
import { useProductAnalytics } from '../../hooks/useProductAnalytics';
import Card from '../common/Card';
import type { ProductAnalytics } from '../../types/product';

export default function ProductAnalytics() {
  const { data: products, isLoading, error } = useProductAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Carregando análise de produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Erro ao carregar análise de produtos</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {products?.map((product) => (
        <Card key={product.id} className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {MOCK_PRODUCTS.find(p => p.id === product.productId)?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {MOCK_PRODUCTS.find(p => p.id === product.productId)?.category}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  product.recommendations.action === 'grow' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.recommendations.action === 'grow' ? 'Crescimento' : 'Otimização'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center space-x-4">
                <BarChart className="h-10 w-10 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Volume de Vendas</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {product.sales.volume}
                  </p>
                  <p className={`text-sm ${
                    product.sales.growth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.sales.growth >= 0 ? '+' : ''}{product.sales.growth.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <TrendingUp className="h-10 w-10 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Margem</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {product.sales.margin.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Users className="h-10 w-10 text-purple-500" />
                <div>
                  <p className="text-sm text-gray-500">Satisfação</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {product.customers.satisfaction.toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Clock className="h-10 w-10 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Tempo Médio Entrega</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {product.delivery.averageTime} dias
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Principais Clientes
                </h4>
                <div className="space-y-4">
                  {product.customers.top.map((customer) => (
                    <div key={customer.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {customer.volume} unidades
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(customer.revenue)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Concorrência
                </h4>
                <div className="space-y-4">
                  {product.competition.map((competitor, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {competitor.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {competitor.marketShare.toFixed(1)}% market share
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(competitor.price)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Recomendações
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Pricing</p>
                  <p className="text-sm text-gray-500">
                    {product.recommendations.pricingStrategy}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Operacional</p>
                  <ul className="list-disc list-inside text-sm text-gray-500">
                    {product.recommendations.operationalImprovements.map((improvement, i) => (
                      <li key={i}>{improvement}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Marketing</p>
                  <ul className="list-disc list-inside text-sm text-gray-500">
                    {product.recommendations.marketingActions.map((action, i) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
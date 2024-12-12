import React from 'react';
import { BarChart, Clock, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import { useLeadStore } from '../../store/leadStore';

export default function LeadConversionMetrics() {
  const { leads } = useLeadStore();
  
  const calculateMetrics = () => {
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(l => l.qualification === 'hot').length;
    const convertedLeads = leads.filter(l => l.status === 'won').length;
    
    const conversionRate = (convertedLeads / totalLeads) * 100;
    
    const avgConversionTime = leads
      .filter(l => l.status === 'won')
      .reduce((sum, lead) => {
        const days = Math.floor((new Date(lead.updatedAt).getTime() - new Date(lead.createdAt).getTime()) 
          / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0) / convertedLeads;
    
    return {
      conversionRate,
      avgConversionTime,
      qualificationRate: (qualifiedLeads / totalLeads) * 100
    };
  };
  
  const metrics = calculateMetrics();
  
  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Métricas de Conversão</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center space-x-4">
            <TrendingUp className="h-10 w-10 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Taxa de Conversão</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.conversionRate.toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Clock className="h-10 w-10 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Tempo Médio de Conversão</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.avgConversionTime.toFixed(0)} dias
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <BarChart className="h-10 w-10 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Taxa de Qualificação</p>
              <p className="text-2xl font-semibold text-gray-900">
                {metrics.qualificationRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
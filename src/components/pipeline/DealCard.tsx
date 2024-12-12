import React from 'react';
import { DollarSign, Calendar, User, BarChart } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from '../../config/i18n';
import type { Deal } from '../../types';

interface DealCardProps {
  deal: Deal;
  onClick?: () => void;
}

export default function DealCard({ deal, onClick }: DealCardProps) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(deal.value);

  const probabilityColor = 
    deal.probability >= 70 ? 'text-green-600' :
    deal.probability >= 40 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <div className="text-sm font-medium text-gray-900 mb-1">
        {deal.title}
      </div>
      <div className="text-sm text-gray-500 mb-2">
        {deal.company}
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-green-600 font-medium">
          <DollarSign className="h-4 w-4 mr-1" />
          {formattedValue}
        </div>
        <div className="flex items-center text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {format(new Date(deal.expectedCloseDate), 'dd/MM/yyyy')}
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-sm">
          <User className="h-4 w-4 mr-1" />
          {deal.assignedTo}
        </div>
        <div className={`flex items-center text-sm font-medium ${probabilityColor}`}>
          <BarChart className="h-4 w-4 mr-1" />
          {deal.probability}%
        </div>
      </div>
    </div>
  );
}
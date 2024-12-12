import React from 'react';
import { MoreVertical } from 'lucide-react';
import type { PipelineStage } from '../../types';

interface StageHeaderProps {
  stage: PipelineStage;
  onEditStage?: () => void;
}

export default function StageHeader({ stage, onEditStage }: StageHeaderProps) {
  const totalValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalValue);

  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-sm font-medium text-gray-900">{stage.name}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {stage.deals.length} {stage.deals.length === 1 ? 'negócio' : 'negócios'} · {formattedValue}
        </p>
      </div>
      {onEditStage && (
        <button
          onClick={onEditStage}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  );
}
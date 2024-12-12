import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { ptBR } from '../config/i18n';
import { usePipelineStore } from '../store/pipelineStore';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import DealCard from '../components/pipeline/DealCard';
import DealForm from '../components/pipeline/DealForm';
import StageHeader from '../components/pipeline/StageHeader';
import type { Deal } from '../types';

export default function Pipeline() {
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const { stages, addDeal, moveDeal } = usePipelineStore();

  const handleDragStart = (e: React.DragEvent, dealId: string, stageId: string) => {
    e.dataTransfer.setData('dealId', dealId);
    e.dataTransfer.setData('fromStageId', stageId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-100');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-gray-100');
  };

  const handleDrop = (e: React.DragEvent, toStageId: string) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-100');
    
    const dealId = e.dataTransfer.getData('dealId');
    const fromStageId = e.dataTransfer.getData('fromStageId');
    
    if (fromStageId !== toStageId) {
      moveDeal(dealId, fromStageId, toStageId);
    }
  };

  const handleAddDeal = (data: Partial<Deal>) => {
    if (selectedStageId) {
      addDeal(selectedStageId, data as Deal);
      setShowAddDeal(false);
      setSelectedStageId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{ptBR.pipeline.title}</h1>
        <Button icon={DollarSign} onClick={() => {
          setSelectedStageId(stages[0].id);
          setShowAddDeal(true);
        }}>
          {ptBR.pipeline.addDeal}
        </Button>
      </div>

      {showAddDeal ? (
        <Card>
          <DealForm
            onSubmit={handleAddDeal}
            onCancel={() => {
              setShowAddDeal(false);
              setSelectedStageId(null);
            }}
          />
        </Card>
      ) : (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4 transition-colors duration-200"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <StageHeader stage={stage} />
              <div className="space-y-3">
                {stage.deals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deal.id, stage.id)}
                  >
                    <DealCard deal={deal} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
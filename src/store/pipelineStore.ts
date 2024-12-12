import { create } from 'zustand';
import type { PipelineStage, Deal } from '../types';

interface PipelineState {
  stages: PipelineStage[];
  isLoading: boolean;
  error: string | null;
  addStage: (stage: Omit<PipelineStage, 'id' | 'deals'>) => void;
  updateStage: (id: string, stage: Partial<PipelineStage>) => void;
  deleteStage: (id: string) => void;
  addDeal: (stageId: string, deal: Omit<Deal, 'id'>) => void;
  updateDeal: (stageId: string, dealId: string, deal: Partial<Deal>) => void;
  moveDeal: (dealId: string, fromStageId: string, toStageId: string) => void;
  deleteDeal: (stageId: string, dealId: string) => void;
}

export const usePipelineStore = create<PipelineState>((set) => ({
  stages: [
    {
      id: '1',
      name: 'Novos Leads',
      order: 1,
      color: 'blue',
      deals: []
    },
    {
      id: '2',
      name: 'Primeiro Contato',
      order: 2,
      color: 'yellow',
      deals: []
    },
    {
      id: '3',
      name: 'Proposta',
      order: 3,
      color: 'orange',
      deals: [
        {
          id: '1',
          leadId: '1',
          title: 'Licença de Software Enterprise',
          value: 50000,
          stage: '3',
          probability: 60,
          expectedCloseDate: new Date('2024-04-15'),
          assignedTo: '1',
          products: [
            {
              id: '1',
              name: 'Licença Enterprise',
              quantity: 1,
              price: 50000
            }
          ],
          activities: [],
          customFields: {}
        }
      ]
    },
    {
      id: '4',
      name: 'Negociação',
      order: 4,
      color: 'purple',
      deals: [
        {
          id: '2',
          leadId: '2',
          title: 'Serviços de Consultoria',
          value: 25000,
          stage: '4',
          probability: 80,
          expectedCloseDate: new Date('2024-03-30'),
          assignedTo: '1',
          products: [
            {
              id: '1',
              name: 'Consultoria Estratégica',
              quantity: 50,
              price: 500
            }
          ],
          activities: [],
          customFields: {}
        }
      ]
    },
    {
      id: '5',
      name: 'Ganhos',
      order: 5,
      color: 'green',
      deals: []
    }
  ],
  isLoading: false,
  error: null,

  addStage: (newStage) =>
    set((state) => ({
      stages: [
        ...state.stages,
        {
          ...newStage,
          id: Math.random().toString(36).substr(2, 9),
          deals: []
        }
      ].sort((a, b) => a.order - b.order)
    })),

  updateStage: (id, updatedStage) =>
    set((state) => ({
      stages: state.stages.map((stage) =>
        stage.id === id ? { ...stage, ...updatedStage } : stage
      )
    })),

  deleteStage: (id) =>
    set((state) => ({
      stages: state.stages.filter((stage) => stage.id !== id)
    })),

  addDeal: (stageId, deal) =>
    set((state) => ({
      stages: state.stages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              deals: [
                ...stage.deals,
                { ...deal, id: Math.random().toString(36).substr(2, 9) }
              ]
            }
          : stage
      )
    })),

  updateDeal: (stageId, dealId, updatedDeal) =>
    set((state) => ({
      stages: state.stages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              deals: stage.deals.map((deal) =>
                deal.id === dealId ? { ...deal, ...updatedDeal } : deal
              )
            }
          : stage
      )
    })),

  moveDeal: (dealId, fromStageId, toStageId) =>
    set((state) => {
      const fromStage = state.stages.find((s) => s.id === fromStageId);
      const deal = fromStage?.deals.find((d) => d.id === dealId);
      
      if (!fromStage || !deal) return state;

      return {
        stages: state.stages.map((stage) => {
          if (stage.id === fromStageId) {
            return {
              ...stage,
              deals: stage.deals.filter((d) => d.id !== dealId)
            };
          }
          if (stage.id === toStageId) {
            return {
              ...stage,
              deals: [...stage.deals, { ...deal, stage: toStageId }]
            };
          }
          return stage;
        })
      };
    }),

  deleteDeal: (stageId, dealId) =>
    set((state) => ({
      stages: state.stages.map((stage) =>
        stage.id === stageId
          ? {
              ...stage,
              deals: stage.deals.filter((deal) => deal.id !== dealId)
            }
          : stage
      )
    }))
}));
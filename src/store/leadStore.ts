import { create } from 'zustand';
import type { Lead, LeadActivity, CustomField } from '../types';

interface LeadState {
  leads: Lead[];
  customFields: CustomField[];
  isLoading: boolean;
  error: string | null;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, lead: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addActivity: (leadId: string, activity: Omit<LeadActivity, 'id' | 'createdAt'>) => void;
  addCustomField: (field: Omit<CustomField, 'id'>) => void;
}

export const useLeadStore = create<LeadState>((set) => ({
  leads: [
    {
      id: '1',
      name: 'João Silva',
      company: 'Tech Brasil',
      email: 'joao@techbrasil.com.br',
      phone: '11999887766',
      status: 'qualified',
      score: {
        engagement: 25,
        interactions: 20,
        demographics: 15,
        behavior: 15,
        budget: 10
      },
      totalScore: 85,
      qualification: 'hot',
      source: 'Website',
      assignedTo: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      customFields: {},
      activities: [],
      tags: ['tech', 'software']
    },
    {
      id: '2',
      name: 'Maria Santos',
      company: 'Inovação Labs',
      email: 'maria@inovacaolabs.com.br',
      phone: '11998765432',
      status: 'new',
      score: {
        engagement: 15,
        interactions: 10,
        demographics: 10,
        behavior: 5,
        budget: 5
      },
      totalScore: 45,
      qualification: 'warm',
      source: 'LinkedIn',
      assignedTo: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      customFields: {},
      activities: [],
      tags: ['startup']
    }
  ],
  customFields: [],
  isLoading: false,
  error: null,

  addLead: (newLead) =>
    set((state) => ({
      leads: [...state.leads, newLead]
    })),

  updateLead: (id, updatedLead) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === id
          ? { ...lead, ...updatedLead, updatedAt: new Date() }
          : lead
      )
    })),

  deleteLead: (id) =>
    set((state) => ({
      leads: state.leads.filter((lead) => lead.id !== id)
    })),

  addActivity: (leadId, activity) =>
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              activities: [
                {
                  ...activity,
                  id: Math.random().toString(36).substr(2, 9),
                  createdAt: new Date()
                },
                ...lead.activities
              ]
            }
          : lead
      )
    })),

  addCustomField: (field) =>
    set((state) => ({
      customFields: [
        ...state.customFields,
        { ...field, id: Math.random().toString(36).substr(2, 9) }
      ]
    }))
}));
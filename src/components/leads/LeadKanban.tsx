import React from 'react';
import { Plus } from 'lucide-react';
import Card from '../common/Card';
import LeadStatusBadge from './LeadStatusBadge';
import LeadQualificationBadge from './LeadQualificationBadge';
import type { Lead } from '../../types';

interface LeadKanbanProps {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  onStatusChange: (leadId: string, newStatus: Lead['status']) => void;
}

export default function LeadKanban({ leads, onLeadClick, onStatusChange }: LeadKanbanProps) {
  const columns: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
  
  const getColumnTitle = (status: Lead['status']) => {
    const titles: Record<Lead['status'], string> = {
      new: 'Novos',
      contacted: 'Contatados',
      qualified: 'Qualificados',
      proposal: 'Proposta',
      negotiation: 'Negociação',
      won: 'Ganhos',
      lost: 'Perdidos'
    };
    return titles[status];
  };

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    e.dataTransfer.setData('leadId', lead.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Lead['status']) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    onStatusChange(leadId, status);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto pb-4">
      {columns.map(status => {
        const columnLeads = leads.filter(lead => lead.status === status);
        
        return (
          <div
            key={status}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">
                  {getColumnTitle(status)}
                </h3>
                <span className="text-sm text-gray-500">
                  {columnLeads.length}
                </span>
              </div>

              <div className="space-y-3">
                {columnLeads.map(lead => (
                  <Card
                    key={lead.id}
                    className="cursor-pointer"
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    onClick={() => onLeadClick(lead)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{lead.name}</h4>
                        <LeadQualificationBadge qualification={lead.qualification} />
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{lead.company}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">
                          Score: {lead.totalScore}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(lead.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}

                {columnLeads.length === 0 && (
                  <div className="text-center py-8">
                    <Plus className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">
                      Arraste leads para esta coluna
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
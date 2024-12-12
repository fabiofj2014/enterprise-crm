import React, { useState } from 'react';
import { LayoutList, LayoutKanban } from 'lucide-react';
import LeadList from '../components/leads/LeadList';
import LeadKanban from '../components/leads/LeadKanban';
import Button from '../components/common/Button';
import { useLeadStore } from '../store/leadStore';
import type { Lead } from '../types';

type ViewMode = 'list' | 'kanban';

export default function Leads() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const { leads, updateLead } = useLeadStore();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      updateLead(leadId, { ...lead, status: newStatus });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          icon={LayoutList}
          onClick={() => setViewMode('list')}
        >
          Lista
        </Button>
        <Button
          variant={viewMode === 'kanban' ? 'default' : 'outline'}
          icon={LayoutKanban}
          onClick={() => setViewMode('kanban')}
        >
          Kanban
        </Button>
      </div>

      {viewMode === 'list' ? (
        <LeadList
          onLeadSelect={setSelectedLead}
        />
      ) : (
        <LeadKanban
          leads={leads}
          onLeadClick={setSelectedLead}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
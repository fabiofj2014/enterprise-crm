import React, { useState } from 'react';
import { Users, Search, Filter, Plus, TrendingUp } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import Table from '../common/Table';
import Button from '../common/Button';
import Input from '../common/Input';
import Card from '../common/Card';
import LeadStatusBadge from './LeadStatusBadge';
import LeadQualificationBadge from './LeadQualificationBadge';
import LeadForm from './LeadForm';
import LeadConversionMetrics from './LeadConversionMetrics';
import { useLeadStore } from '../../store/leadStore';
import type { Lead } from '../../types';

const columns = [
  {
    key: 'name',
    title: ptBR.leads.name,
    render: (value: string) => (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <Users className="h-5 w-5 text-gray-500" />
          </div>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{value}</div>
        </div>
      </div>
    )
  },
  { 
    key: 'company',
    title: ptBR.leads.company
  },
  { 
    key: 'service',
    title: ptBR.leads.service
  },
  { 
    key: 'email',
    title: ptBR.leads.email
  },
  { 
    key: 'phone',
    title: ptBR.leads.phone
  },
  {
    key: 'status',
    title: ptBR.common.status,
    render: (value: Lead['status']) => <LeadStatusBadge status={value} />
  },
  {
    key: 'qualification',
    title: 'Qualificação',
    render: (value: Lead['qualification']) => <LeadQualificationBadge qualification={value} />
  },
  {
    key: 'totalScore',
    title: ptBR.leads.score,
    render: (value: number, lead: Lead) => (
      <div className="flex items-center space-x-2">
        <span className={`font-medium ${
          lead.qualification === 'hot' ? 'text-green-600' : 
          lead.qualification === 'warm' ? 'text-yellow-600' : 
          'text-blue-600'
        }`}>
          {value}
        </span>
        <TrendingUp className={`h-4 w-4 ${
          value >= 75 ? 'text-green-500' :
          value >= 40 ? 'text-yellow-500' :
          'text-blue-500'
        }`} />
      </div>
    )
  }
];

interface LeadListProps {
  onLeadSelect?: (lead: Lead) => void;
}

export default function LeadList({ onLeadSelect }: LeadListProps) {
  const [showAddLead, setShowAddLead] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { leads, customFields, addLead } = useLeadStore();

  const filteredLeads = leads.filter(lead => {
    const searchLower = searchTerm.toLowerCase();
    return (
      lead.name.toLowerCase().includes(searchLower) ||
      lead.company.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower)
    );
  });

  const handleAddLead = (data: Partial<Lead>) => {
    const newLead: Lead = {
      ...data as Lead,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      activities: [],
      score: {
        engagement: 0,
        interactions: 0,
        demographics: 0,
        behavior: 0,
        budget: 0
      },
      totalScore: 0,
      qualification: 'cold',
      customFields: {},
      tags: []
    };

    addLead(newLead);
    setShowAddLead(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{ptBR.leads.title}</h1>
        <Button icon={Plus} onClick={() => setShowAddLead(true)}>
          {ptBR.leads.addLead}
        </Button>
      </div>

      <LeadConversionMetrics />

      {showAddLead ? (
        <Card>
          <LeadForm
            customFields={customFields}
            onSubmit={handleAddLead}
            onCancel={() => setShowAddLead(false)}
          />
        </Card>
      ) : (
        <Card>
          <div className="mb-6 flex items-center space-x-4">
            <div className="flex-1">
              <Input
                icon={Search}
                placeholder={`${ptBR.common.search} ${ptBR.leads.title.toLowerCase()}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" icon={Filter}>
              {ptBR.common.filters}
            </Button>
          </div>

          <Table
            columns={columns}
            data={filteredLeads}
            onRowClick={onLeadSelect}
          />
        </Card>
      )}
    </div>
  );
}
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from '../../config/i18n';
import type { Lead, LeadActivity } from '../../types';
import LeadStatusBadge from './LeadStatusBadge';
import Card from '../common/Card';

interface LeadDetailsProps {
  lead: Lead;
}

function ActivityItem({ activity }: { activity: LeadActivity }) {
  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm text-gray-500">{activity.type[0].toUpperCase()}</span>
        </div>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{activity.type}</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(activity.createdAt), 'dd/MM/yyyy HH:mm')}
          </p>
        </div>
        <p className="text-sm text-gray-500">{activity.description}</p>
      </div>
    </div>
  );
}

export default function LeadDetails({ lead }: LeadDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="px-6 py-5">
          <h3 className="text-lg font-medium text-gray-900">{ptBR.leads.title}</h3>
        </div>
        
        <div className="px-6 py-5">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">{ptBR.leads.name}</dt>
              <dd className="mt-1 text-sm text-gray-900">{lead.name}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">{ptBR.leads.company}</dt>
              <dd className="mt-1 text-sm text-gray-900">{lead.company}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">{ptBR.leads.email}</dt>
              <dd className="mt-1 text-sm text-gray-900">{lead.email}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">{ptBR.leads.phone}</dt>
              <dd className="mt-1 text-sm text-gray-900">{lead.phone}</dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1">
                <LeadStatusBadge status={lead.status} />
              </dd>
            </div>
            
            <div>
              <dt className="text-sm font-medium text-gray-500">{ptBR.leads.score}</dt>
              <dd className="mt-1 text-sm text-gray-900">{lead.score}</dd>
            </div>

            {Object.entries(lead.customFields).map(([key, value]) => (
              <div key={key}>
                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                <dd className="mt-1 text-sm text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Card title="Histórico de Atividades">
        <div className="space-y-4">
          {lead.activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </Card>
    </div>
  );
}
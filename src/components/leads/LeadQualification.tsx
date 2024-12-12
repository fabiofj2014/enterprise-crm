import React from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';
import { useLeadScoring } from '../../hooks/useLeadScoring';
import type { Lead } from '../../types/lead';
import Card from '../common/Card';

interface LeadQualificationProps {
  lead: Lead;
}

export default function LeadQualification({ lead }: LeadQualificationProps) {
  const { scoreLead, isScoring } = useLeadScoring();
  
  const qualificationColors = {
    hot: 'bg-red-100 text-red-800',
    warm: 'bg-yellow-100 text-yellow-800',
    cold: 'bg-blue-100 text-blue-800'
  };
  
  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Qualificação do Lead</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            qualificationColors[lead.qualification]
          }`}>
            {lead.qualification.toUpperCase()}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Score Total</span>
            <span className="text-lg font-medium text-gray-900">{lead.totalScore}/100</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Engajamento</span>
              <span className="text-gray-900">{lead.score.engagement}/30</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Interações</span>
              <span className="text-gray-900">{lead.score.interactions}/25</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Demografia</span>
              <span className="text-gray-900">{lead.score.demographics}/20</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Comportamento</span>
              <span className="text-gray-900">{lead.score.behavior}/15</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Orçamento</span>
              <span className="text-gray-900">{lead.score.budget}/10</span>
            </div>
          </div>
          
          {lead.qualification === 'hot' && (
            <div className="flex items-center text-green-600 text-sm mt-4">
              <TrendingUp className="h-4 w-4 mr-1" />
              Lead altamente qualificado! Priorize o contato.
            </div>
          )}
          
          {lead.qualification === 'cold' && (
            <div className="flex items-center text-yellow-600 text-sm mt-4">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Lead precisa de mais nutrição antes do contato comercial.
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
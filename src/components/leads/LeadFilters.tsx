import React from 'react';
import { X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import type { Lead } from '../../types';

interface LeadFiltersProps {
  filters: {
    status?: Lead['status'][];
    qualification?: Lead['qualification'][];
    scoreRange?: [number, number];
    dateRange?: [Date, Date];
    tags?: string[];
  };
  onFilterChange: (filters: LeadFiltersProps['filters']) => void;
  onClose: () => void;
}

export default function LeadFilters({ filters, onFilterChange, onClose }: LeadFiltersProps) {
  const statusOptions: Lead['status'][] = ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
  const qualificationOptions: Lead['qualification'][] = ['hot', 'warm', 'cold'];

  const handleStatusChange = (status: Lead['status']) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    
    onFilterChange({ ...filters, status: newStatuses });
  };

  const handleQualificationChange = (qualification: Lead['qualification']) => {
    const currentQuals = filters.qualification || [];
    const newQuals = currentQuals.includes(qualification)
      ? currentQuals.filter(q => q !== qualification)
      : [...currentQuals, qualification];
    
    onFilterChange({ ...filters, qualification: newQuals });
  };

  const handleScoreChange = (min: number, max: number) => {
    onFilterChange({ ...filters, scoreRange: [min, max] });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Filtros Avançados</h3>
        <Button variant="outline" icon={X} onClick={onClose}>
          Fechar
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.status?.includes(status)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Qualificação</h4>
          <div className="flex flex-wrap gap-2">
            {qualificationOptions.map(qual => (
              <button
                key={qual}
                onClick={() => handleQualificationChange(qual)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.qualification?.includes(qual)
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {qual}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Score</h4>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.scoreRange?.[0] || ''}
              onChange={(e) => handleScoreChange(Number(e.target.value), filters.scoreRange?.[1] || 100)}
              className="w-24"
            />
            <span>até</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.scoreRange?.[1] || ''}
              onChange={(e) => handleScoreChange(filters.scoreRange?.[0] || 0, Number(e.target.value))}
              className="w-24"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onFilterChange({})}
          >
            Limpar Filtros
          </Button>
          <Button onClick={onClose}>
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
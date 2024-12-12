import React from 'react';
import { Filter, X } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import Button from '../common/Button';
import FilterSelect from './FilterSelect';
import DateRangeFilter from './DateRangeFilter';
import { TaskFilters as TaskFiltersType } from '../../types/filters';

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFilterChange: (filters: TaskFiltersType) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function TaskFilters({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  hasActiveFilters 
}: TaskFiltersProps) {
  const handleClearFilters = () => {
    onClearFilters();
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="h-4 w-4 text-gray-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Filtros</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={X}
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className={`text-xs transition-colors ${
            hasActiveFilters 
              ? 'hover:bg-gray-100 text-gray-700' 
              : 'text-gray-400 cursor-not-allowed'
          }`}
        >
          Limpar Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        <FilterSelect
          label="Status"
          value={filters.status || []}
          options={Object.entries(ptBR.tasks.status).map(([value, label]) => ({
            value,
            label: label as string
          }))}
          onChange={(values) => onFilterChange({ ...filters, status: values })}
        />

        <FilterSelect
          label="Prioridade"
          value={filters.priority || []}
          options={Object.entries(ptBR.tasks.priority).map(([value, label]) => ({
            value,
            label: label as string
          }))}
          onChange={(values) => onFilterChange({ ...filters, priority: values })}
        />

        <FilterSelect
          label="Categoria"
          value={filters.category || []}
          options={Object.entries(ptBR.tasks.categories).map(([value, label]) => ({
            value,
            label: label as string
          }))}
          onChange={(values) => onFilterChange({ ...filters, category: values })}
        />

        <DateRangeFilter
          startDate={filters.dateRange?.start}
          endDate={filters.dateRange?.end}
          onChange={(start, end) => 
            onFilterChange({
              ...filters,
              dateRange: { start, end }
            })
          }
        />
      </div>
    </div>
  );
}
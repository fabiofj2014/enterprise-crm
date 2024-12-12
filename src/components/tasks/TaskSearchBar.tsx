import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import Button from '../common/Button';

interface TaskSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilterClick: () => void;
}

export default function TaskSearchBar({ value, onChange, onFilterClick }: TaskSearchBarProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={`${ptBR.common.search} ${ptBR.tasks.title.toLowerCase()}...`}
          />
        </div>
      </div>
      <Button variant="outline" icon={Filter} onClick={onFilterClick}>
        {ptBR.common.filters}
      </Button>
    </div>
  );
}
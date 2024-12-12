import React from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

interface AnalyticsFiltersProps {
  filters: {
    dateRange: {
      start: Date;
      end: Date;
    };
    salespeople: string[];
    products: string[];
    regions: string[];
  };
  onFilterChange: (filters: AnalyticsFiltersProps['filters']) => void;
  onClearFilters: () => void;
}

export default function AnalyticsFilters({
  filters,
  onFilterChange,
  onClearFilters
}: AnalyticsFiltersProps) {
  const handleDateChange = (field: 'start' | 'end', value: string) => {
    if (!value) return;
    
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: new Date(value)
      }
    });
  };

  const handleMultiSelectChange = (field: 'salespeople' | 'products' | 'regions', values: string[]) => {
    onFilterChange({
      ...filters,
      [field]: values
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      {/* Rest of the component remains the same */}
    </div>
  );
}
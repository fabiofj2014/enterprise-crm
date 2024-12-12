import { useState, useCallback } from 'react';
import { TaskFilters, DEFAULT_FILTERS } from '../types/filters';

export function useTaskFilters() {
  const [filters, setFilters] = useState<TaskFilters>(DEFAULT_FILTERS);

  const updateFilters = useCallback((newFilters: Partial<TaskFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasActiveFilters = useCallback(() => {
    return (
      (filters.status?.length ?? 0) > 0 ||
      (filters.priority?.length ?? 0) > 0 ||
      (filters.category?.length ?? 0) > 0 ||
      !!filters.dateRange?.start ||
      !!filters.dateRange?.end
    );
  }, [filters]);

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters: hasActiveFilters()
  };
}
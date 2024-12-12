import React from 'react';
import { Calendar } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import { useAnalyticsStore } from '../../store/analyticsStore';

export default function TimeRangeSelector() {
  const { timeRange, setTimeRange } = useAnalyticsStore();

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-5 w-5 text-gray-400" />
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        {Object.entries(ptBR.analytics.timeRanges).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
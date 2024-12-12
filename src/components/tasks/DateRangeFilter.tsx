import React from 'react';

interface DateRangeFilterProps {
  startDate?: string;
  endDate?: string;
  onChange: (start: string, end: string) => void;
}

export default function DateRangeFilter({ startDate, endDate, onChange }: DateRangeFilterProps) {
  return (
    <div className="flex flex-col">
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        Período
      </label>
      <div className="flex flex-col space-y-2">
        <input
          type="date"
          placeholder="Data inicial"
          className="block w-full rounded-md border-gray-300 text-sm shadow-sm 
            focus:border-indigo-500 focus:ring-indigo-500 bg-white"
          value={startDate || ''}
          onChange={(e) => onChange(e.target.value, endDate || '')}
        />
        <input
          type="date"
          placeholder="Data final"
          className="block w-full rounded-md border-gray-300 text-sm shadow-sm 
            focus:border-indigo-500 focus:ring-indigo-500 bg-white"
          value={endDate || ''}
          onChange={(e) => onChange(startDate || '', e.target.value)}
        />
      </div>
    </div>
  );
}
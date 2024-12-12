import React from 'react';

interface FilterSelectProps {
  label: string;
  value: string[];
  options: Array<{ value: string; label: string }>;
  onChange: (values: string[]) => void;
}

export default function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <div className="flex flex-col">
      <label className="block text-xs font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <select
        multiple
        className="min-h-[120px] w-full rounded-md border-gray-300 text-sm shadow-sm 
          focus:border-indigo-500 focus:ring-indigo-500 bg-white
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        value={value}
        onChange={(e) => {
          const values = Array.from(e.target.selectedOptions, option => option.value);
          onChange(values);
        }}
      >
        {options.map(({ value, label }) => (
          <option 
            key={value} 
            value={value}
            className="py-1 px-2 hover:bg-indigo-50"
          >
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
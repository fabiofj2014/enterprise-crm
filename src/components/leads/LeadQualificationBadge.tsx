import React from 'react';
import type { Lead } from '../../types';

interface LeadQualificationBadgeProps {
  qualification: Lead['qualification'];
}

export default function LeadQualificationBadge({ qualification }: LeadQualificationBadgeProps) {
  const colors = {
    hot: 'bg-green-100 text-green-800',
    warm: 'bg-yellow-100 text-yellow-800',
    cold: 'bg-blue-100 text-blue-800'
  };

  const labels = {
    hot: 'Quente',
    warm: 'Morno',
    cold: 'Frio'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[qualification]}`}>
      {labels[qualification]}
    </span>
  );
}
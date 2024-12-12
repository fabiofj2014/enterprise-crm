import React from 'react';
import Badge from '../common/Badge';
import { ptBR } from '../../config/i18n';

type StatusType = keyof typeof ptBR.leads.status;

const statusColors = {
  new: 'info',
  contacted: 'warning',
  qualified: 'info',
  proposal: 'warning',
  negotiation: 'warning',
  won: 'success',
  lost: 'error'
} as const;

interface LeadStatusBadgeProps {
  status: StatusType;
}

export default function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return (
    <Badge variant={statusColors[status]}>
      {ptBR.leads.status[status]}
    </Badge>
  );
}
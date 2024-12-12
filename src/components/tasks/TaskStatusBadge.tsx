import React from 'react';
import Badge from '../common/Badge';
import { ptBR } from '../../config/i18n';
import type { Task } from '../../types';

const statusColors = {
  pending: 'warning',
  in_progress: 'info',
  completed: 'success'
} as const;

interface TaskStatusBadgeProps {
  status: Task['status'];
}

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <Badge variant={statusColors[status]}>
      {ptBR.tasks.status[status]}
    </Badge>
  );
}
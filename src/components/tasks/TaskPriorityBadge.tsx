import React from 'react';
import Badge from '../common/Badge';
import { ptBR } from '../../config/i18n';
import type { Task } from '../../types';

const priorityColors = {
  low: 'info',
  medium: 'warning',
  high: 'error'
} as const;

interface TaskPriorityBadgeProps {
  priority: Task['priority'];
}

export default function TaskPriorityBadge({ priority }: TaskPriorityBadgeProps) {
  return (
    <Badge variant={priorityColors[priority]}>
      {ptBR.tasks.priority[priority]}
    </Badge>
  );
}
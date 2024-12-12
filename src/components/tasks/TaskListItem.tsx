import React from 'react';
import { CheckCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '../../types';
import TaskPriorityBadge from './TaskPriorityBadge';
import TaskStatusBadge from './TaskStatusBadge';

interface TaskListItemProps {
  task: Task;
  onComplete: (id: string) => void;
}

export default function TaskListItem({ task, onComplete }: TaskListItemProps) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex-shrink-0">
        <button
          onClick={() => onComplete(task.id)}
          className={`h-6 w-6 ${
            task.status === 'completed'
              ? 'text-green-500'
              : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <CheckCircle className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">
            {task.title}
          </p>
          <TaskPriorityBadge priority={task.priority} />
        </div>
        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <CalendarIcon className="h-4 w-4 mr-1" />
            {format(new Date(task.dueDate), 'dd/MM/yyyy')}
          </div>
          <TaskStatusBadge status={task.status} />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function TaskEmptyState() {
  return (
    <div className="text-center py-8">
      <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        Nenhuma tarefa encontrada
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Comece criando uma nova tarefa.
      </p>
    </div>
  );
}
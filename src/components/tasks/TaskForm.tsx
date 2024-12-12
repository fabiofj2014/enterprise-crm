import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import Input from '../common/Input';
import Button from '../common/Button';
import { ptBR } from '../../config/i18n';
import type { Task } from '../../types';

interface TaskFormProps {
  task?: Partial<Task>;
  initialDate?: Date | null;
  onSubmit: (data: Partial<Task>) => void;
  onCancel: () => void;
}

export default function TaskForm({ task, initialDate, onSubmit, onCancel }: TaskFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      dueDate: task?.dueDate 
        ? format(new Date(task.dueDate), 'yyyy-MM-dd')
        : initialDate
        ? format(initialDate, 'yyyy-MM-dd')
        : '',
      priority: task?.priority || 'medium',
      status: task?.status || 'pending',
      assignedTo: task?.assignedTo || ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.tasks.fields.title}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.tasks.fields.description}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Controller
            name="dueDate"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Input
                type="date"
                label={ptBR.tasks.fields.dueDate}
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="priority"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {ptBR.tasks.fields.priority}
                </label>
                <select
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {Object.entries(ptBR.tasks.priority).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <Controller
          name="assignedTo"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.tasks.fields.assignedTo}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="secondary" onClick={onCancel}>
          {ptBR.common.cancel}
        </Button>
        <Button type="submit">
          {ptBR.common.save}
        </Button>
      </div>
    </form>
  );
}
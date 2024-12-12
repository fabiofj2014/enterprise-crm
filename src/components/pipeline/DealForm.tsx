import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/Button';
import { ptBR } from '../../config/i18n';
import type { Deal } from '../../types';

interface DealFormProps {
  deal?: Partial<Deal>;
  onSubmit: (data: Partial<Deal>) => void;
  onCancel: () => void;
}

export default function DealForm({ deal, onSubmit, onCancel }: DealFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: deal?.title || '',
      value: deal?.value || 0,
      probability: deal?.probability || 50,
      expectedCloseDate: deal?.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'yyyy-MM-dd') : '',
      assignedTo: deal?.assignedTo || '',
      products: deal?.products || []
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.pipeline.deal.title}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="value"
          control={control}
          rules={{ required: true, min: 0 }}
          render={({ field, fieldState }) => (
            <Input
              type="number"
              label={ptBR.pipeline.deal.value}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="probability"
          control={control}
          rules={{ required: true, min: 0, max: 100 }}
          render={({ field, fieldState }) => (
            <Input
              type="number"
              label={ptBR.pipeline.deal.probability}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="expectedCloseDate"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              type="date"
              label={ptBR.pipeline.deal.expectedCloseDate}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="assignedTo"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.pipeline.deal.assignedTo}
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
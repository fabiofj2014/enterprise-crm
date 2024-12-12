import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/Button';
import { ptBR } from '../../config/i18n';
import type { Lead, CustomField } from '../../types';

interface LeadFormProps {
  lead?: Partial<Lead>;
  customFields: CustomField[];
  onSubmit: (data: Partial<Lead>) => void;
  onCancel: () => void;
}

export default function LeadForm({ lead, customFields, onSubmit, onCancel }: LeadFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: lead?.name || '',
      company: lead?.company || '',
      email: lead?.email || '',
      phone: lead?.phone || '',
      service: lead?.service || '',
      source: lead?.source || '',
      customFields: lead?.customFields || {},
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.leads.name}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="company"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.leads.company}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true, pattern: /^\S+@\S+$/i }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.leads.email}
              type="email"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label={ptBR.leads.phone}
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <div className="sm:col-span-2">
          <Controller
            name="service"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <Input
                label={ptBR.leads.service}
                placeholder={ptBR.leads.servicePlaceholder}
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        {customFields.map((customField) => (
          <Controller
            key={customField.id}
            name={`customFields.${customField.id}`}
            control={control}
            rules={{ required: customField.required }}
            render={({ field, fieldState }) => (
              <Input
                label={customField.name}
                type={customField.type === 'number' ? 'number' : 'text'}
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        ))}
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
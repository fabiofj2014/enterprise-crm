import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { X } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import type { Integration } from '../../types/integration';

interface IntegrationFormProps {
  integration?: Integration;
  onSubmit: (data: Partial<Integration>) => void;
  onCancel: () => void;
}

export default function IntegrationForm({
  integration,
  onSubmit,
  onCancel
}: IntegrationFormProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: integration?.name || '',
      provider: integration?.provider || 'custom',
      config: {
        apiKey: integration?.config.apiKey || '',
        apiSecret: integration?.config.apiSecret || '',
        webhooks: integration?.config.webhooks || []
      }
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <Input
              label="Nome da Integração"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="provider"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Provedor
              </label>
              <select
                {...field}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="n8n">n8n</option>
                <option value="facebook">Facebook Ads</option>
                <option value="google">Google Ads</option>
                <option value="tiktok">TikTok Ads</option>
                <option value="custom">Personalizado</option>
              </select>
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-600">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="config.apiKey"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="API Key"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="config.apiSecret"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="API Secret"
              type="password"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="config.webhooks"
          control={control}
          render={({ field: { value, onChange }, fieldState }) => (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Webhooks
              </label>
              <div className="mt-1 space-y-2">
                {value?.map((webhook, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={webhook.url}
                      onChange={(e) => {
                        const newWebhooks = [...value];
                        newWebhooks[index] = {
                          ...webhook,
                          url: e.target.value
                        };
                        onChange(newWebhooks);
                      }}
                      placeholder="URL do Webhook"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      icon={X}
                      onClick={() => {
                        onChange(value.filter((_, i) => i !== index));
                      }}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onChange([
                      ...(value || []),
                      {
                        url: '',
                        method: 'POST',
                        events: [],
                        active: true
                      }
                    ]);
                  }}
                >
                  Adicionar Webhook
                </Button>
              </div>
            </div>
          )}
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {integration ? 'Atualizar' : 'Criar'} Integração
        </Button>
      </div>
    </form>
  );
}
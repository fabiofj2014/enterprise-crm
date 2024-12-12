import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Card from '../common/Card';
import Button from '../common/Button';
import { useAuthStore } from '../../store/authStore';

interface LocalizationFormData {
  language: string;
  timezone: string;
  dateFormat: string;
  numberFormat: string;
}

export default function LocalizationSettings() {
  const { user, updateUser } = useAuthStore();
  const { control, handleSubmit } = useForm<LocalizationFormData>({
    defaultValues: {
      language: user?.preferences?.language || 'pt-BR',
      timezone: 'America/Sao_Paulo',
      dateFormat: 'DD/MM/YYYY',
      numberFormat: 'pt-BR'
    }
  });

  const onSubmit = async (data: LocalizationFormData) => {
    if (user) {
      await updateUser({
        ...user,
        preferences: {
          ...user.preferences,
          language: data.language
        }
      });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <h3 className="text-lg font-medium text-gray-900">Localização</h3>

        <div className="space-y-6">
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Idioma
                </label>
                <select
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
            )}
          />

          <Controller
            name="timezone"
            control={control}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fuso Horário
                </label>
                <select
                  {...field}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
                  <option value="America/New_York">New York (GMT-4)</option>
                  <option value="Europe/London">London (GMT+1)</option>
                </select>
              </div>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Card>
  );
}
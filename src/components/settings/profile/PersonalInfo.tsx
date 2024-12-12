import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Input from '../../common/Input';
import { ProfileFormData } from '../../../types/profile';

interface PersonalInfoProps {
  control: Control<ProfileFormData>;
}

export default function PersonalInfo({ control }: PersonalInfoProps) {
  return (
    <div className="space-y-6">
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Nome é obrigatório' }}
        render={({ field, fieldState }) => (
          <Input
            label="Nome Completo"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{ 
          required: 'Email é obrigatório',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Email inválido'
          }
        }}
        render={({ field, fieldState }) => (
          <Input
            label="Email"
            type="email"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            label="Telefone"
            error={fieldState.error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="language"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
    </div>
  );
}
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import Input from '../../common/Input';
import { ProfileFormData } from '../../../types/profile';

interface PasswordChangeProps {
  control: Control<ProfileFormData>;
}

export default function PasswordChange({ control }: PasswordChangeProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Alterar Senha</h3>
      <div className="grid grid-cols-1 gap-6">
        <Controller
          name="currentPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Senha Atual"
              type="password"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label="Nova Senha"
              type="password"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
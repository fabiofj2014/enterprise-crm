import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactorEnabled: boolean;
}

export default function SecuritySettings() {
  const { control, handleSubmit, watch } = useForm<SecurityFormData>();

  const onSubmit = async (data: SecurityFormData) => {
    console.log('Security settings updated:', data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Segurança da Conta</h3>
        
        <div className="space-y-6">
          <Controller
            name="currentPassword"
            control={control}
            rules={{ required: 'Senha atual é obrigatória' }}
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
            rules={{ required: 'Nova senha é obrigatória' }}
            render={({ field, fieldState }) => (
              <Input
                label="Nova Senha"
                type="password"
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirmação de senha é obrigatória',
              validate: (value) => value === watch('newPassword') || 'As senhas não conferem'
            }}
            render={({ field, fieldState }) => (
              <Input
                label="Confirmar Nova Senha"
                type="password"
                error={fieldState.error?.message}
                {...field}
              />
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
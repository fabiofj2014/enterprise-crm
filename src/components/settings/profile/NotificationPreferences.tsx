import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ProfileFormData } from '../../../types/profile';

interface NotificationPreferencesProps {
  control: Control<ProfileFormData>;
}

export default function NotificationPreferences({ control }: NotificationPreferencesProps) {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Notificações</h3>
      <div className="space-y-4">
        <Controller
          name="notifications.email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Receber notificações por email
              </label>
            </div>
          )}
        />

        <Controller
          name="notifications.system"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Notificações do sistema
              </label>
            </div>
          )}
        />

        <Controller
          name="notifications.desktop"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Notificações desktop
              </label>
            </div>
          )}
        />
      </div>
    </div>
  );
}
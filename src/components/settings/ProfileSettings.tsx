import React from 'react';
import { useForm } from 'react-hook-form';
import { Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../common/Button';
import Card from '../common/Card';
import AvatarUpload from './profile/AvatarUpload';
import PersonalInfo from './profile/PersonalInfo';
import PasswordChange from './profile/PasswordChange';
import NotificationSettings from './profile/NotificationSettings';
import type { ProfileFormData } from '../../types/profile';

export default function ProfileSettings() {
  const { user, updateUser } = useAuthStore();
  const [avatar, setAvatar] = React.useState<string | null>(user?.avatar || null);
  const [saving, setSaving] = React.useState(false);

  const { control, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      language: user?.preferences?.language || 'pt-BR',
      notifications: user?.preferences?.notifications || {
        email: true,
        system: true,
        desktop: true
      }
    }
  });

  const handleAvatarChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true);
    try {
      if (user) {
        await updateUser({
          ...user,
          name: data.name,
          email: data.email,
          phone: data.phone,
          avatar,
          preferences: {
            language: data.language,
            theme: user.preferences.theme,
            notifications: data.notifications
          }
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-6">
        <AvatarUpload
          avatar={avatar}
          userName={user?.name || ''}
          onAvatarChange={handleAvatarChange}
        />
        
        <PersonalInfo control={control} />
        <PasswordChange control={control} />
        <NotificationSettings control={control} />

        <div className="flex justify-end">
          <Button type="submit" icon={Save} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
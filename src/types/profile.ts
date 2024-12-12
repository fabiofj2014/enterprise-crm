export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  language: string;
  notifications: {
    email: boolean;
    system: boolean;
    desktop: boolean;
  };
}
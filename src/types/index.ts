export * from './lead';
export * from './pipeline';
export * from './task';
export * from './analytics';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'sales';
  avatar?: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    notifications: {
      email: boolean;
      system: boolean;
      desktop: boolean;
    };
  };
}
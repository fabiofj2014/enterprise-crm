import { create } from 'zustand';

interface ThemeState {
  theme: string;
}

export const useThemeStore = create<ThemeState>(() => ({
  theme: 'light'
}));
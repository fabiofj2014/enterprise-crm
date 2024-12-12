/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-bg-primary))',
        secondary: 'rgb(var(--color-bg-secondary))',
        tertiary: 'rgb(var(--color-bg-tertiary))',
        accent: 'rgb(var(--color-accent))',
        'accent-hover': 'rgb(var(--color-accent-hover))',
        'accent-light': 'rgb(var(--color-accent-light))',
      },
      textColor: {
        primary: 'rgb(var(--color-text-primary))',
        secondary: 'rgb(var(--color-text-secondary))',
        tertiary: 'rgb(var(--color-text-tertiary))',
      },
      borderColor: {
        DEFAULT: 'rgb(var(--color-border))',
        hover: 'rgb(var(--color-border-hover))',
      },
      backgroundColor: {
        primary: 'rgb(var(--color-bg-primary))',
        secondary: 'rgb(var(--color-bg-secondary))',
        tertiary: 'rgb(var(--color-bg-tertiary))',
      },
      ringColor: {
        DEFAULT: 'rgb(var(--color-accent))',
        hover: 'rgb(var(--color-accent-hover))',
      }
    },
  },
  plugins: [],
};
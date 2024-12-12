import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import { useThemeStore } from '../../store/themeStore';
import toast from 'react-hot-toast';

export default function AppearanceSettings() {
  const { 
    theme, 
    fontSize, 
    colorScheme, 
    density,
    setTheme,
    setFontSize,
    setColorScheme,
    setDensity
  } = useThemeStore();

  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Apply theme changes
      document.documentElement.classList.remove('light', 'dark');
      if (theme !== 'system') {
        document.documentElement.classList.add(theme);
      } else {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        document.documentElement.classList.add(systemTheme);
      }

      // Apply font size
      document.documentElement.style.fontSize = {
        small: '14px',
        medium: '16px',
        large: '18px'
      }[fontSize];

      toast.success('Aparência atualizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar aparência');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Aparência</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Tema
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  theme === 'light' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Sun className="h-6 w-6 mb-2" />
                <span className="text-sm">Claro</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  theme === 'dark' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Moon className="h-6 w-6 mb-2" />
                <span className="text-sm">Escuro</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  theme === 'system' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Monitor className="h-6 w-6 mb-2" />
                <span className="text-sm">Sistema</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamanho da Fonte
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="small">Pequena</option>
              <option value="medium">Média</option>
              <option value="large">Grande</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Esquema de Cores
            </label>
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="default">Padrão</option>
              <option value="blue">Azul</option>
              <option value="purple">Roxo</option>
              <option value="green">Verde</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Densidade do Layout
            </label>
            <select
              value={density}
              onChange={(e) => setDensity(e.target.value as any)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="comfortable">Confortável</option>
              <option value="compact">Compacto</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            loading={loading}
          >
            Salvar Alterações
          </Button>
        </div>
      </div>
    </Card>
  );
}
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface UseSettingsProps {
  onSave: () => Promise<void>;
}

export function useSettings({ onSave }: UseSettingsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave();
      toast.success('Configurações salvas com sucesso!');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao salvar configurações';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSave
  };
}
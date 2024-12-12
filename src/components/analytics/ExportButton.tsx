import React, { useState } from 'react';
import { Download } from 'lucide-react';
import Button from '../common/Button';
import { exportAnalytics } from '../../utils/analytics';
import { SalesAnalyticsData } from '../../types/analytics';

interface ExportButtonProps {
  data: SalesAnalyticsData;
}

export default function ExportButton({ data }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (format: 'pdf' | 'excel') => {
    setIsExporting(true);
    try {
      const blob = await exportAnalytics(data, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `relatorio-vendas.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="outline"
        icon={Download}
        disabled={isExporting}
        onClick={() => handleExport('pdf')}
      >
        {isExporting ? 'Exportando...' : 'Exportar'}
      </Button>
      
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
        <div className="py-1">
          <button
            onClick={() => handleExport('pdf')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Exportar como PDF
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Exportar como Excel
          </button>
        </div>
      </div>
    </div>
  );
}
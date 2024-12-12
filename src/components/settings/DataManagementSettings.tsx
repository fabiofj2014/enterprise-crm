import React from 'react';
import { Download, Upload, Database, Archive } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

export default function DataManagementSettings() {
  const handleExportData = () => {
    // Implement data export functionality
    console.log('Exporting data...');
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Implement data import functionality
      console.log('Importing data from:', file.name);
    }
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Gerenciamento de Dados</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Download className="h-6 w-6 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Exportar Dados</h4>
                <p className="text-sm text-gray-500">
                  Baixe todos os seus dados em formato CSV ou JSON
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              Exportar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Upload className="h-6 w-6 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Importar Dados</h4>
                <p className="text-sm text-gray-500">
                  Importe dados de outras fontes
                </p>
              </div>
            </div>
            <div>
              <input
                type="file"
                id="import-data"
                className="hidden"
                accept=".csv,.json"
                onChange={handleImportData}
              />
              <label htmlFor="import-data">
                <Button variant="outline" as="span">
                  Importar
                </Button>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Database className="h-6 w-6 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Backup Automático</h4>
                <p className="text-sm text-gray-500">
                  Configure backups automáticos dos seus dados
                </p>
              </div>
            </div>
            <Button variant="outline">
              Configurar
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Archive className="h-6 w-6 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium text-gray-900">Arquivamento</h4>
                <p className="text-sm text-gray-500">
                  Gerencie dados arquivados e políticas de retenção
                </p>
              </div>
            </div>
            <Button variant="outline">
              Gerenciar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
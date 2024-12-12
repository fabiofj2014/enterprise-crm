import React, { useState } from 'react';
import { Settings, Plus, RefreshCw, Trash2 } from 'lucide-react';
import { useIntegrationStore } from '../../store/integrationStore';
import Button from '../common/Button';
import Card from '../common/Card';
import IntegrationForm from './IntegrationForm';

export default function IntegrationsSettings() {
  const { integrations, addIntegration, updateIntegration, deleteIntegration, syncIntegration } = useIntegrationStore();
  const [showForm, setShowForm] = useState(false);
  const [editingIntegration, setEditingIntegration] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingIntegration) {
      await updateIntegration(editingIntegration, data);
    } else {
      await addIntegration({
        ...data,
        status: 'active',
        lastSync: new Date()
      });
    }
    setShowForm(false);
    setEditingIntegration(null);
  };

  const handleEdit = (id: string) => {
    setEditingIntegration(id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja remover esta integração?')) {
      await deleteIntegration(id);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Integrações</h2>
        <Button icon={Plus} onClick={() => setShowForm(true)}>
          Nova Integração
        </Button>
      </div>

      {showForm && (
        <Card>
          <div className="p-6">
            <IntegrationForm
              integration={editingIntegration ? integrations.find(i => i.id === editingIntegration) : undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingIntegration(null);
              }}
            />
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Settings className="h-6 w-6 text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {integration.provider}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    integration.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : integration.status === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.status}
                  </span>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-200 pt-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  {integration.config.webhooks?.map((webhook, index) => (
                    <div key={index}>
                      <dt className="text-sm font-medium text-gray-500">
                        Webhook URL
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 break-all">
                        {webhook.url}
                      </dd>
                      <dd className="mt-1 text-xs text-gray-500">
                        Eventos: {webhook.events.join(', ')}
                      </dd>
                    </div>
                  ))}
                  {integration.lastSync && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Última Sincronização
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(integration.lastSync).toLocaleString()}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(integration.id)}
                >
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={RefreshCw}
                  onClick={() => syncIntegration(integration.id)}
                >
                  Sincronizar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  onClick={() => handleDelete(integration.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
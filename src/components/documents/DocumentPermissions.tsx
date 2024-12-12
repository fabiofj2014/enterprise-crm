import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';
import Button from '../common/Button';
import Input from '../common/Input';
import type { Document, DocumentPermission } from '../../types/document';

interface DocumentPermissionsProps {
  document: Document;
  onClose: () => void;
}

export default function DocumentPermissions({ document, onClose }: DocumentPermissionsProps) {
  const [newPermission, setNewPermission] = useState({
    userId: '',
    role: 'viewer' as DocumentPermission['role']
  });

  const { updatePermissions } = useDocumentStore();

  const handleAddPermission = () => {
    if (!newPermission.userId) return;

    const updatedPermissions = [
      ...document.permissions,
      {
        id: Math.random().toString(36).substr(2, 9),
        documentId: document.id,
        ...newPermission
      }
    ];

    updatePermissions(document.id, updatedPermissions);
    setNewPermission({ userId: '', role: 'viewer' });
  };

  const handleRemovePermission = (permissionId: string) => {
    const updatedPermissions = document.permissions.filter(
      (p) => p.id !== permissionId
    );
    updatePermissions(document.id, updatedPermissions);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Permissões do Documento
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                label="Usuário"
                value={newPermission.userId}
                onChange={(e) =>
                  setNewPermission({ ...newPermission, userId: e.target.value })
                }
                placeholder="Digite o ID ou email do usuário"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Permissão
              </label>
              <select
                value={newPermission.role}
                onChange={(e) =>
                  setNewPermission({
                    ...newPermission,
                    role: e.target.value as DocumentPermission['role']
                  })
                }
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="viewer">Visualizador</option>
                <option value="editor">Editor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                icon={Plus}
                onClick={handleAddPermission}
                disabled={!newPermission.userId}
              >
                Adicionar
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {document.permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {permission.userId}
                  </div>
                  <div className="text-sm text-gray-500">
                    {permission.role === 'viewer'
                      ? 'Visualizador'
                      : permission.role === 'editor'
                      ? 'Editor'
                      : 'Administrador'}
                  </div>
                </div>
                <button
                  onClick={() => handleRemovePermission(permission.id)}
                  className="text-red-600 hover:text-red-500 text-sm font-medium"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
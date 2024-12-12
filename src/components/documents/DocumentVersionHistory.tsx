import React from 'react';
import { X } from 'lucide-react';
import { format } from 'date-fns';
import type { Document } from '../../types/document';

interface DocumentVersionHistoryProps {
  document: Document;
  onClose: () => void;
}

export default function DocumentVersionHistory({ document, onClose }: DocumentVersionHistoryProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Histórico de Versões
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {document.versions.map((version) => (
            <div
              key={version.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="text-sm font-medium text-gray-900">
                  Versão {version.version}
                </div>
                <div className="text-sm text-gray-500">
                  {format(new Date(version.createdAt), 'dd/MM/yyyy HH:mm')}
                </div>
                {version.comment && (
                  <div className="mt-1 text-sm text-gray-600">
                    {version.comment}
                  </div>
                )}
              </div>
              <button className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                Baixar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
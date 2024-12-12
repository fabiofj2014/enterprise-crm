import React from 'react';
import { X, HardDrive, Cloud } from 'lucide-react';
import Button from '../common/Button';

interface SourceSelectorProps {
  onClose: () => void;
  onSelect: (files: File[]) => void;
}

export default function SourceSelector({ onClose, onSelect }: SourceSelectorProps) {
  const handleGoogleDriveSelect = async () => {
    // Implementar integração com Google Drive
    onClose();
  };

  const handleDropboxSelect = async () => {
    // Implementar integração com Dropbox
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Selecionar fonte
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleDriveSelect}
            className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50"
          >
            <Cloud className="h-6 w-6 text-blue-500" />
            <span className="ml-3 text-gray-900">Google Drive</span>
          </button>

          <button
            onClick={handleDropboxSelect}
            className="w-full flex items-center p-4 border rounded-lg hover:bg-gray-50"
          >
            <HardDrive className="h-6 w-6 text-blue-500" />
            <span className="ml-3 text-gray-900">Dropbox</span>
          </button>
        </div>
      </div>
    </div>
  );
}
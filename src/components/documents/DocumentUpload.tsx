import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useDocumentStore } from '../../store/documentStore';
import Button from '../common/Button';
import FileUploadZone from './FileUploadZone';
import DocumentPreview from './DocumentPreview';
import { validateFile } from '../../utils/document';

interface DocumentUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function DocumentUpload({ onClose, onSuccess }: DocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addDocument, categories } = useDocumentStore();

  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
    const validationError = validateFile(file);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !category) return;

    setUploading(true);
    try {
      // Simular upload do arquivo
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Adicionar documento ao store
      addDocument({
        id: Math.random().toString(36).substr(2, 9),
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        path: URL.createObjectURL(selectedFile),
        createdBy: '1', // ID do usuário atual
        lastModifiedBy: '1',
        permissions: [],
        metadata: {
          customFields: {}
        },
        status: 'draft',
        version: 1,
        versions: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });

      onSuccess();
    } catch (error) {
      setError('Erro ao fazer upload do arquivo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload de Documento
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FileUploadZone
            onFileSelect={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={10 * 1024 * 1024} // 10MB
          />

          {error && (
            <div className="text-sm text-red-600">
              {error}
            </div>
          )}

          {selectedFile && (
            <DocumentPreview
              file={selectedFile}
              onRemove={() => setSelectedFile(null)}
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags (separadas por vírgula)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ex: contrato, cliente, importante"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile || !category || uploading}
              icon={Upload}
            >
              {uploading ? 'Enviando...' : 'Fazer Upload'}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Formatos aceitos: PDF, JPEG, PNG (máx. 10MB)
          </p>
        </form>
      </div>
    </div>
  );
}
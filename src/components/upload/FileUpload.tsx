import React, { useState, useCallback } from 'react';
import { Upload, X, Camera, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { validateFile, compressImage } from '../../utils/document';
import Button from '../common/Button';
import FilePreview from './FilePreview';
import UploadProgress from './UploadProgress';
import SourceSelector from './SourceSelector';

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png']
};

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showSourceSelector, setShowSourceSelector] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    
    for (const file of acceptedFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      const processedFile = file.type.startsWith('image/') 
        ? await compressImage(file)
        : file;

      setFiles(prev => [...prev, processedFile]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    try {
      // Simular upload com progresso
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }
      
      // Aqui você implementaria a lógica real de upload
      
      setFiles([]);
      setProgress(0);
    } catch (err) {
      setError('Erro ao fazer upload dos arquivos');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-500 bg-red-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Clique para fazer upload
              </span>
              {' '}ou arraste e solte
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, PNG, JPEG (max. 10MB)
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              icon={FileText}
              onClick={(e) => {
                e.stopPropagation();
                setShowSourceSelector(true);
              }}
            >
              Selecionar fonte
            </Button>
            {navigator.mediaDevices && (
              <Button
                variant="outline"
                size="sm"
                icon={Camera}
                onClick={(e) => {
                  e.stopPropagation();
                  // Implementar captura de câmera
                }}
              >
                Usar câmera
              </Button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 flex items-center">
          <X className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file, index) => (
            <FilePreview
              key={index}
              file={file}
              onRemove={() => removeFile(index)}
            />
          ))}
          
          <div className="flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Enviando...' : 'Fazer upload'}
            </Button>
          </div>
        </div>
      )}

      {uploading && <UploadProgress progress={progress} />}

      {showSourceSelector && (
        <SourceSelector
          onClose={() => setShowSourceSelector(false)}
          onSelect={(files) => {
            onDrop(files);
            setShowSourceSelector(false);
          }}
        />
      )}
    </div>
  );
}
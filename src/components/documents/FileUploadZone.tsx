import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadZoneProps {
  onFileSelect: (files: File[]) => void;
  accept?: string;
  maxSize?: number;
}

export default function FileUploadZone({ 
  onFileSelect, 
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 10 * 1024 * 1024 // 10MB default
}: FileUploadZoneProps) {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onFileSelect(files);
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer"
    >
      <input
        type="file"
        className="hidden"
        id="file-upload"
        accept={accept}
        onChange={e => e.target.files && onFileSelect(Array.from(e.target.files))}
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4 text-sm text-gray-500">
          <span className="font-medium text-indigo-600 hover:text-indigo-500">
            Clique para fazer upload
          </span>
          {' '}ou arraste e solte
        </div>
      </label>
    </div>
  );
}
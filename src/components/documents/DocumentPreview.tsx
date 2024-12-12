import React from 'react';
import { FileText, Image, File, X } from 'lucide-react';
import { formatFileSize } from '../../utils/formatters';

interface DocumentPreviewProps {
  file: File;
  onRemove: () => void;
}

export default function DocumentPreview({ file, onRemove }: DocumentPreviewProps) {
  const isImage = file.type.startsWith('image/');
  const isPDF = file.type === 'application/pdf';

  return (
    <div className="relative flex items-center p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center">
        {isImage ? (
          <Image className="h-6 w-6 text-gray-400" />
        ) : isPDF ? (
          <FileText className="h-6 w-6 text-gray-400" />
        ) : (
          <File className="h-6 w-6 text-gray-400" />
        )}
      </div>
      
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <button
            onClick={onRemove}
            className="ml-4 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500">
          {formatFileSize(file.size)}
        </p>
      </div>

      {isImage && (
        <div className="ml-4 flex-shrink-0 w-20 h-20">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
    </div>
  );
}
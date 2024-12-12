import React from 'react';
import { FileText, Download, Share2, Trash2 } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import Table from '../common/Table';
import { Document } from '../../types/document';
import { formatFileSize, formatDate } from '../../utils/formatters';

interface DocumentTableProps {
  documents: Document[];
  onDownload: (document: Document) => void;
  onShare: (document: Document) => void;
  onDelete: (id: string) => void;
}

export default function DocumentTable({ 
  documents, 
  onDownload, 
  onShare, 
  onDelete 
}: DocumentTableProps) {
  const columns = [
    {
      key: 'name',
      title: ptBR.documents.columns.name,
      render: (value: string, document: Document) => (
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{document.category}</div>
          </div>
        </div>
      )
    },
    {
      key: 'size',
      title: ptBR.documents.columns.size,
      render: (value: number) => (
        <span className="text-sm text-gray-500">
          {formatFileSize(value)}
        </span>
      )
    },
    {
      key: 'updatedAt',
      title: ptBR.documents.columns.lastModified,
      render: (value: Date) => (
        <span className="text-sm text-gray-500">
          {formatDate(value)}
        </span>
      )
    },
    {
      key: 'actions',
      title: ptBR.documents.columns.actions,
      render: (_: any, document: Document) => (
        <div className="flex justify-end space-x-3">
          <button 
            onClick={() => onDownload(document)}
            className="text-gray-400 hover:text-gray-500"
            title="Download"
          >
            <Download className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onShare(document)}
            className="text-gray-400 hover:text-gray-500"
            title="Compartilhar"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button 
            onClick={() => onDelete(document.id)}
            className="text-gray-400 hover:text-red-500"
            title="Excluir"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ];

  return <Table columns={columns} data={documents} />;
}
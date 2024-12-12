import React, { useState } from 'react';
import { FileText, Download, Share2, Trash2, Search, Filter, Upload } from 'lucide-react';
import { ptBR } from '../config/i18n';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import DocumentUpload from '../components/documents/DocumentUpload';

const documents = [
  {
    id: 1,
    name: 'Proposta Comercial - Tech Corp.pdf',
    size: '2,4 MB',
    type: 'PDF',
    lastModified: '10/03/2024',
  },
  {
    id: 2,
    name: 'Modelo de Contrato.docx',
    size: '1,8 MB',
    type: 'DOCX',
    lastModified: '08/03/2024',
  },
];

export default function Documents() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">{ptBR.documents.title}</h1>
        <Button 
          icon={Upload}
          onClick={() => setShowUpload(true)}
        >
          {ptBR.documents.upload}
        </Button>
      </div>

      <Card>
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={ptBR.documents.search}
              />
            </div>
          </div>
          <Button variant="outline" icon={Filter}>
            {ptBR.common.filters}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {ptBR.documents.columns.name}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {ptBR.documents.columns.size}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {ptBR.documents.columns.lastModified}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {ptBR.documents.columns.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">
                        {doc.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{doc.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{doc.lastModified}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button className="text-gray-400 hover:text-gray-500">
                        <Download className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-500">
                        <Share2 className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {showUpload && (
        <DocumentUpload
          onClose={() => setShowUpload(false)}
          onSuccess={() => setShowUpload(false)}
        />
      )}
    </div>
  );
}
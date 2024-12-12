import React, { useState } from 'react';
import { FileText, Search, Filter, Plus } from 'lucide-react';
import { ptBR } from '../../config/i18n';
import { useDocumentStore } from '../../store/documentStore';
import { useDocumentQuery } from '../../hooks/useDocumentQuery';
import { useDocumentMutation } from '../../hooks/useDocumentMutation';
import Button from '../common/Button';
import Card from '../common/Card';
import DocumentUpload from './DocumentUpload';
import DocumentTable from './DocumentTable';
import DocumentFilters from './DocumentFilters';
import DocumentPagination from './DocumentPagination';

export default function DocumentList() {
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useDocumentQuery({
    search: searchTerm,
    category: selectedCategory,
    tags: selectedTags,
    page: currentPage
  });

  const { deleteMutation } = useDocumentMutation();

  const handleDownload = async (document: Document) => {
    const response = await fetch(document.path);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = document.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = (document: Document) => {
    // Implementar compartilhamento
    console.log('Compartilhar:', document);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este documento?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleFilterChange = (filters: { category?: string; tags?: string[] }) => {
    setSelectedCategory(filters.category);
    setSelectedTags(filters.tags || []);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil((data?.total || 0) / (data?.pageSize || 20));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {ptBR.documents.title}
        </h1>
        <Button 
          icon={Plus} 
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder={ptBR.documents.search}
              />
            </div>
          </div>
          <Button variant="outline" icon={Filter}>
            {ptBR.common.filters}
          </Button>
        </div>

        <DocumentFilters
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          onFilterChange={handleFilterChange}
        />

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-500">{ptBR.common.loading}</div>
          </div>
        ) : data?.documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum documento encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Comece fazendo upload de um novo documento.
            </p>
          </div>
        ) : (
          <>
            <DocumentTable
              documents={data?.documents || []}
              onDownload={handleDownload}
              onShare={handleShare}
              onDelete={handleDelete}
            />
            <DocumentPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
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
import React from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import { useDocumentStore } from '../../store/documentStore';

interface DocumentFiltersProps {
  onFilterChange: (filters: {
    category?: string;
    tags?: string[];
  }) => void;
  selectedCategory?: string;
  selectedTags?: string[];
}

export default function DocumentFilters({
  onFilterChange,
  selectedCategory,
  selectedTags = []
}: DocumentFiltersProps) {
  const { categories } = useDocumentStore();

  const handleClearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-900">Filtros</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={X}
          onClick={handleClearFilters}
        >
          Limpar Filtros
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoria
          </label>
          <select
            value={selectedCategory || ''}
            onChange={(e) => onFilterChange({ 
              category: e.target.value || undefined,
              tags: selectedTags 
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <Input
            placeholder="Digite tags e pressione Enter"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                const newTag = input.value.trim();
                if (newTag && !selectedTags.includes(newTag)) {
                  onFilterChange({
                    category: selectedCategory,
                    tags: [...selectedTags, newTag]
                  });
                  input.value = '';
                }
              }
            }}
          />
          {selectedTags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-indigo-500 hover:text-indigo-600"
                    onClick={() => onFilterChange({
                      category: selectedCategory,
                      tags: selectedTags.filter(t => t !== tag)
                    })}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import { useQuery } from '@tanstack/react-query';
import { Document } from '../types/document';
import { useDocumentStore } from '../store/documentStore';

const PAGE_SIZE = 20;

export function useDocumentQuery(filters: {
  search?: string;
  category?: string;
  tags?: string[];
  page: number;
}) {
  const { documents } = useDocumentStore();

  return useQuery({
    queryKey: ['documents', filters],
    queryFn: async () => {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 300));

      let filtered = [...documents];

      // Aplicar filtros
      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(doc =>
          doc.name.toLowerCase().includes(search) ||
          doc.category.toLowerCase().includes(search) ||
          doc.tags.some(tag => tag.toLowerCase().includes(search))
        );
      }

      if (filters.category) {
        filtered = filtered.filter(doc => doc.category === filters.category);
      }

      if (filters.tags?.length) {
        filtered = filtered.filter(doc =>
          filters.tags!.some(tag => doc.tags.includes(tag))
        );
      }

      // Calcular paginação
      const start = (filters.page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const paginatedDocs = filtered.slice(start, end);

      return {
        documents: paginatedDocs,
        total: filtered.length,
        pageSize: PAGE_SIZE,
        currentPage: filters.page
      };
    },
    staleTime: 5000, // Cache por 5 segundos
    keepPreviousData: true // Manter dados anteriores durante loading
  });
}
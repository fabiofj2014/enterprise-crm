import { useQuery } from '@tanstack/react-query';
import { Task, TaskFilter } from '../types';
import { useTaskStore } from '../store/taskStore';

const PAGE_SIZE = 20;

export function useTaskQuery(filters: TaskFilter & { page: number }) {
  const { tasks } = useTaskStore();

  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: async () => {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 300));

      let filtered = [...tasks];

      // Aplicar filtros
      if (filters.status?.length) {
        filtered = filtered.filter(task => filters.status!.includes(task.status));
      }

      if (filters.priority?.length) {
        filtered = filtered.filter(task => filters.priority!.includes(task.priority));
      }

      if (filters.category?.length) {
        filtered = filtered.filter(task => filters.category!.includes(task.category));
      }

      if (filters.assignedTo?.length) {
        filtered = filtered.filter(task => filters.assignedTo!.includes(task.assignedTo));
      }

      if (filters.dateRange?.start) {
        filtered = filtered.filter(task => 
          new Date(task.dueDate) >= new Date(filters.dateRange!.start)
        );
      }

      if (filters.dateRange?.end) {
        filtered = filtered.filter(task => 
          new Date(task.dueDate) <= new Date(filters.dateRange!.end)
        );
      }

      if (filters.search) {
        const search = filters.search.toLowerCase();
        filtered = filtered.filter(task =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        );
      }

      // Ordenar por data de vencimento
      filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

      // Calcular paginação
      const start = (filters.page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const paginatedTasks = filtered.slice(start, end);

      return {
        tasks: paginatedTasks,
        total: filtered.length,
        pageSize: PAGE_SIZE,
        currentPage: filters.page
      };
    },
    staleTime: 5000,
    keepPreviousData: true
  });
}
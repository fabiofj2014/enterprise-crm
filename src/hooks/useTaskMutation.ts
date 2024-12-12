import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTaskStore } from '../store/taskStore';
import { Task } from '../types';

export function useTaskMutation() {
  const queryClient = useQueryClient();
  const { addTask, updateTask, deleteTask, completeTask } = useTaskStore();

  const createMutation = useMutation({
    mutationFn: async (task: Omit<Task, 'id'>) => {
      return addTask({
        ...task,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Task> }) => {
      return updateTask(id, {
        ...data,
        updatedAt: new Date()
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return deleteTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const completeMutation = useMutation({
    mutationFn: async (id: string) => {
      return completeTask(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    completeMutation
  };
}
import { create } from 'zustand';
import type { Task } from '../types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: '1',
      title: 'Fazer follow-up com cliente Tech Brasil',
      description: 'Verificar feedback sobre a proposta enviada',
      dueDate: new Date('2024-03-15'),
      priority: 'high',
      status: 'pending',
      assignedTo: '1',
      relatedTo: {
        type: 'lead',
        id: '1'
      }
    },
    {
      id: '2',
      title: 'Preparar apresentação para Inovação Labs',
      description: 'Criar slides para demonstração do produto',
      dueDate: new Date('2024-03-20'),
      priority: 'medium',
      status: 'in_progress',
      assignedTo: '1'
    }
  ],
  isLoading: false,
  error: null,

  addTask: (newTask) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        { ...newTask, id: Math.random().toString(36).substr(2, 9) }
      ]
    })),

  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    })),

  completeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: 'completed' } : task
      )
    }))
}));
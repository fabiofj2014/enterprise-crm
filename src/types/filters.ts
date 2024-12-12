import { Task } from './task';

export interface TaskFilters {
  status?: Task['status'][];
  priority?: Task['priority'][];
  category?: Task['category'][];
  dateRange?: {
    start: string;
    end: string;
  };
}

export const DEFAULT_FILTERS: TaskFilters = {
  status: [],
  priority: [],
  category: [],
  dateRange: {
    start: '',
    end: ''
  }
};
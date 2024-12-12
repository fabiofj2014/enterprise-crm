export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  category: 'follow_up' | 'meeting' | 'proposal' | 'document' | 'other';
  relatedTo?: {
    type: 'lead' | 'deal';
    id: string;
    title: string;
  };
  notifications: {
    type: 'email' | 'system';
    schedule: 'on_date' | '1_day_before' | '1_hour_before';
    sent: boolean;
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface TaskFilter {
  status?: Task['status'][];
  priority?: Task['priority'][];
  category?: Task['category'][];
  assignedTo?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  tags?: string[];
  search?: string;
}
export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  color: string;
  deals: Deal[];
}

export interface Deal {
  id: string;
  leadId: string;
  title: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: Date;
  assignedTo: string;
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  activities: DealActivity[];
  customFields: Record<string, any>;
}

export interface DealActivity {
  id: string;
  type: 'note' | 'email' | 'call' | 'meeting' | 'task';
  description: string;
  createdAt: Date;
  createdBy: string;
  metadata?: Record<string, any>;
}
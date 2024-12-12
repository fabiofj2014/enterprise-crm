import { z } from 'zod';

export const LeadScoreSchema = z.object({
  engagement: z.number().min(0).max(30),
  interactions: z.number().min(0).max(25),
  demographics: z.number().min(0).max(20),
  behavior: z.number().min(0).max(15),
  budget: z.number().min(0).max(10)
});

export type LeadScore = z.infer<typeof LeadScoreSchema>;

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  score: LeadScore;
  totalScore: number;
  qualification: 'hot' | 'warm' | 'cold';
  source: string;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  lastInteraction?: Date;
  nextFollowUp?: Date;
  customFields: Record<string, any>;
  activities: LeadActivity[];
  tags: string[];
}

export interface LeadActivity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'website' | 'form';
  description: string;
  createdAt: Date;
  createdBy: string;
  metadata?: {
    duration?: number;
    url?: string;
    emailOpened?: boolean;
    emailClicked?: boolean;
    formCompleted?: boolean;
  };
}
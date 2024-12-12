import { z } from 'zod';

export const EmailConfigSchema = z.object({
  host: z.string(),
  port: z.number(),
  secure: z.boolean(),
  auth: z.object({
    user: z.string().email(),
    pass: z.string()
  })
});

export type EmailConfig = z.infer<typeof EmailConfigSchema>;

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
  category: 'follow-up' | 'proposal' | 'welcome' | 'notification';
}

export interface EmailActivity {
  id: string;
  templateId?: string;
  recipientEmail: string;
  subject: string;
  content: string;
  status: 'queued' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed';
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  error?: string;
  metadata: {
    ipAddress?: string;
    userAgent?: string;
    location?: string;
    links?: Array<{
      url: string;
      clickedAt: Date;
    }>;
  };
}

export interface CommunicationMetrics {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  failed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}
import { z } from 'zod';

export const WebhookConfigSchema = z.object({
  url: z.string().url(),
  method: z.enum(['POST', 'PUT', 'PATCH']),
  headers: z.record(z.string()).optional(),
  events: z.array(z.enum([
    'lead.created',
    'lead.updated',
    'lead.qualified',
    'deal.created',
    'deal.updated',
    'deal.won',
    'deal.lost'
  ])),
  active: z.boolean()
});

export type WebhookConfig = z.infer<typeof WebhookConfigSchema>;

export interface Integration {
  id: string;
  name: string;
  provider: 'n8n' | 'facebook' | 'google' | 'tiktok' | 'custom';
  config: {
    apiKey?: string;
    apiSecret?: string;
    accessToken?: string;
    refreshToken?: string;
    webhooks?: WebhookConfig[];
    customFields?: Record<string, string>;
  };
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
  error?: string;
}

export interface IntegrationEvent<T = any> {
  id: string;
  type: string;
  data: T;
  timestamp: Date;
  status: 'pending' | 'sent' | 'failed';
  retries: number;
}
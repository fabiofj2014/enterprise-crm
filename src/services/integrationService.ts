import type { Integration, WebhookConfig, IntegrationEvent } from '../types/integration';

class IntegrationService {
  private static instance: IntegrationService;
  private eventQueue: IntegrationEvent[] = [];
  private processing = false;

  private constructor() {}

  static getInstance(): IntegrationService {
    if (!IntegrationService.instance) {
      IntegrationService.instance = new IntegrationService();
    }
    return IntegrationService.instance;
  }

  async sendWebhook(webhook: WebhookConfig, event: IntegrationEvent) {
    try {
      const response = await fetch(webhook.url, {
        method: webhook.method,
        headers: {
          'Content-Type': 'application/json',
          ...webhook.headers
        },
        body: JSON.stringify({
          event_type: event.type,
          data: event.data,
          timestamp: event.timestamp
        })
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Webhook error:', error);
      return false;
    }
  }

  async processEventQueue() {
    if (this.processing || this.eventQueue.length === 0) return;

    this.processing = true;
    const event = this.eventQueue.shift();

    if (event) {
      try {
        // Enviar evento para todos os webhooks ativos
        const integrations = await this.getActiveIntegrations();
        
        for (const integration of integrations) {
          const webhooks = integration.config.webhooks || [];
          
          for (const webhook of webhooks) {
            if (webhook.active && webhook.events.includes(event.type as any)) {
              await this.sendWebhook(webhook, event);
            }
          }
        }
      } catch (error) {
        console.error('Event processing error:', error);
        if (event.retries < 3) {
          event.retries++;
          this.eventQueue.push(event);
        }
      }
    }

    this.processing = false;
    if (this.eventQueue.length > 0) {
      setTimeout(() => this.processEventQueue(), 1000);
    }
  }

  async getActiveIntegrations(): Promise<Integration[]> {
    // Implementar busca de integrações ativas
    return [];
  }

  queueEvent(event: Omit<IntegrationEvent, 'id' | 'timestamp' | 'status' | 'retries'>) {
    const newEvent: IntegrationEvent = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      status: 'pending',
      retries: 0,
      ...event
    };

    this.eventQueue.push(newEvent);
    this.processEventQueue();
  }
}

export const integrationService = IntegrationService.getInstance();
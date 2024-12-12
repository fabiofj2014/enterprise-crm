import { create } from 'zustand';
import type { EmailTemplate, EmailActivity, CommunicationMetrics } from '../types/communication';

interface CommunicationState {
  templates: EmailTemplate[];
  activities: EmailActivity[];
  isLoading: boolean;
  error: string | null;
  addTemplate: (template: Omit<EmailTemplate, 'id' | 'version' | 'createdAt' | 'updatedAt'>) => void;
  updateTemplate: (id: string, template: Partial<EmailTemplate>) => void;
  deleteTemplate: (id: string) => void;
  addActivity: (activity: Omit<EmailActivity, 'id'>) => void;
  updateActivity: (id: string, activity: Partial<EmailActivity>) => void;
  getMetrics: (startDate: Date, endDate: Date) => CommunicationMetrics;
}

export const useCommunicationStore = create<CommunicationState>((set, get) => ({
  templates: [],
  activities: [],
  isLoading: false,
  error: null,

  addTemplate: (newTemplate) =>
    set((state) => ({
      templates: [
        ...state.templates,
        {
          ...newTemplate,
          id: Math.random().toString(36).substr(2, 9),
          version: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    })),

  updateTemplate: (id, updatedTemplate) =>
    set((state) => ({
      templates: state.templates.map((template) =>
        template.id === id
          ? {
              ...template,
              ...updatedTemplate,
              version: template.version + 1,
              updatedAt: new Date()
            }
          : template
      )
    })),

  deleteTemplate: (id) =>
    set((state) => ({
      templates: state.templates.filter((template) => template.id !== id)
    })),

  addActivity: (newActivity) =>
    set((state) => ({
      activities: [
        {
          id: Math.random().toString(36).substr(2, 9),
          ...newActivity
        },
        ...state.activities
      ]
    })),

  updateActivity: (id, updatedActivity) =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id
          ? { ...activity, ...updatedActivity }
          : activity
      )
    })),

  getMetrics: (startDate, endDate) => {
    const activities = get().activities.filter(
      (activity) =>
        activity.sentAt &&
        activity.sentAt >= startDate &&
        activity.sentAt <= endDate
    );

    const sent = activities.length;
    const delivered = activities.filter((a) => a.status === 'delivered').length;
    const opened = activities.filter((a) => a.status === 'opened').length;
    const clicked = activities.filter((a) => a.status === 'clicked').length;
    const failed = activities.filter((a) => a.status === 'failed').length;

    return {
      sent,
      delivered,
      opened,
      clicked,
      failed,
      deliveryRate: (delivered / sent) * 100,
      openRate: (opened / delivered) * 100,
      clickRate: (clicked / opened) * 100,
      bounceRate: (failed / sent) * 100
    };
  }
}));
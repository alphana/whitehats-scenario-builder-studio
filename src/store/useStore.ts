import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EmailTemplate, WebsiteTemplate } from '../types';

interface AppState {
  emailTemplates: EmailTemplate[];
  websiteTemplates: WebsiteTemplate[];
  currentTemplate: EmailTemplate | WebsiteTemplate | null;
  setCurrentTemplate: (template: EmailTemplate | WebsiteTemplate | null) => void;
  addEmailTemplate: (template: EmailTemplate) => void;
  addWebsiteTemplate: (template: WebsiteTemplate) => void;
  updateWebsiteTemplate: (templateId: string, updates: Partial<WebsiteTemplate>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      emailTemplates: [],
      websiteTemplates: [],
      currentTemplate: null,
      setCurrentTemplate: (template) => set({ currentTemplate: template }),
      addEmailTemplate: (template) =>
        set((state) => ({
          emailTemplates: [...state.emailTemplates, template],
        })),
      addWebsiteTemplate: (template) =>
        set((state) => ({
          websiteTemplates: state.websiteTemplates.map(t => 
            t.id === template.id ? template : t
          ).concat(state.websiteTemplates.every(t => t.id !== template.id) ? [template] : []),
        })),
      updateWebsiteTemplate: (templateId, updates) =>
        set((state) => ({
          websiteTemplates: state.websiteTemplates.map(template =>
            template.id === templateId
              ? { ...template, ...updates }
              : template
          ),
        })),
    }),
    {
      name: 'website-builder-storage',
    }
  )
);
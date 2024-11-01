export interface Template {
  id: string;
  name: string;
  content: string;
  type: 'email' | 'website';
  thumbnail: string;
  lastModified?: string;
}

export interface EmailTemplate extends Template {
  subject: string;
  previewText: string;
}

export interface WebsiteTemplate extends Template {
  pages: WebsitePage[];
}

export interface WebsitePage {
  id: string;
  name: string;
  path: string;
  content: string;
  components?: DraggableComponent[];
}

export interface DraggableComponent {
  id: string;
  type: string;
  content: string;
  props?: Record<string, any>;
}

export interface ComponentEditorState {
  isOpen: boolean;
  component: DraggableComponent | null;
}
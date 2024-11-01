import React from 'react';
import { Layout, Columns, Grid } from 'lucide-react';
import { WebsiteTemplate } from '../../types';

interface TemplateSelectorProps {
  onSelect: (template: WebsiteTemplate) => void;
}

const defaultTemplates: WebsiteTemplate[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    type: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=300&q=80',
    content: '',
    pages: [
      { id: 'home', name: 'Home', path: '/', content: '' },
      { id: 'projects', name: 'Projects', path: '/projects', content: '' },
      { id: 'contact', name: 'Contact', path: '/contact', content: '' }
    ]
  },
  {
    id: 'landing',
    name: 'Landing Page',
    type: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&q=80',
    content: '',
    pages: [
      { id: 'home', name: 'Home', path: '/', content: '' }
    ]
  },
  {
    id: 'business',
    name: 'Business Site',
    type: 'website',
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80',
    content: '',
    pages: [
      { id: 'home', name: 'Home', path: '/', content: '' },
      { id: 'services', name: 'Services', path: '/services', content: '' },
      { id: 'about', name: 'About', path: '/about', content: '' },
      { id: 'contact', name: 'Contact', path: '/contact', content: '' }
    ]
  }
];

function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {defaultTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelect(template)}
          >
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {template.name}
              </h3>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Layout className="w-4 h-4" />
                  <span>{template.pages.length} pages</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Grid className="w-4 h-4" />
                  <span>Responsive</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;
import React from 'react';
import { useStore } from '../../store/useStore';
import { Edit, Trash2 } from 'lucide-react';

interface TemplateListProps {
  onSelect: () => void;
}

const defaultTemplates = [
  {
    id: 'welcome-template',
    name: 'Welcome Email',
    thumbnail: 'https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?w=300&q=80',
    description: 'A warm welcome email for new subscribers'
  },
  {
    id: 'newsletter-template',
    name: 'Newsletter',
    thumbnail: 'https://images.unsplash.com/photo-1581307707614-aeae6819c542?w=300&q=80',
    description: 'Monthly newsletter template with sections for news and updates'
  },
  {
    id: 'promotion-template',
    name: 'Promotion',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&q=80',
    description: 'Announce sales and special offers'
  }
];

function TemplateList({ onSelect }: TemplateListProps) {
  const emailTemplates = useStore((state) => state.emailTemplates);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {defaultTemplates.map((template) => (
        <div
          key={template.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
            <p className="text-gray-600 mb-4">{template.description}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={onSelect}
                className="flex items-center space-x-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TemplateList;
import React from 'react';
import { WebsitePage } from '../../types';
import { X } from 'lucide-react';
import ComponentRenderer from './ComponentRenderer';

interface PreviewProps {
  pages: WebsitePage[];
  currentPage: WebsitePage;
  onClose: () => void;
}

function Preview({ pages, currentPage, onClose }: PreviewProps) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full h-full max-w-6xl mx-auto rounded-lg shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Preview: {currentPage.name}
            </h3>
            <div className="flex space-x-2">
              {pages.map(page => (
                <span
                  key={page.id}
                  className={`px-3 py-1 rounded-md text-sm ${
                    currentPage.id === page.id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600'
                  }`}
                >
                  {page.name}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            {currentPage.components?.map((component, index) => (
              <div key={`${component.id}-${index}`} className="mb-4">
                <ComponentRenderer
                  component={component}
                  isEditing={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
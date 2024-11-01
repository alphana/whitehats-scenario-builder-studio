import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { WebsitePage } from '../../types';

interface PageManagerProps {
  pages: WebsitePage[];
  onClose: () => void;
  onAddPage: (name: string, path: string) => void;
  onDeletePage: (pageId: string) => void;
}

function PageManager({ pages, onClose, onAddPage, onDeletePage }: PageManagerProps) {
  const [newPageName, setNewPageName] = useState('');
  const [newPagePath, setNewPagePath] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPageName && newPagePath) {
      onAddPage(newPageName, newPagePath);
      setNewPageName('');
      setNewPagePath('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Manage Pages</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="pageName" className="block text-sm font-medium text-gray-700">
                Page Name
              </label>
              <input
                type="text"
                id="pageName"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="About Us"
              />
            </div>
            <div>
              <label htmlFor="pagePath" className="block text-sm font-medium text-gray-700">
                Page Path
              </label>
              <input
                type="text"
                id="pagePath"
                value={newPagePath}
                onChange={(e) => setNewPagePath(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="/about"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Page
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {pages.map(page => (
            <div
              key={page.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
            >
              <div>
                <h4 className="font-medium text-gray-900">{page.name}</h4>
                <p className="text-sm text-gray-500">{page.path}</p>
              </div>
              <button
                onClick={() => onDeletePage(page.id)}
                className="text-gray-400 hover:text-red-500"
                disabled={pages.length <= 1}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PageManager;
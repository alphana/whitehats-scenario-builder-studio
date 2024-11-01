import React, { useState } from 'react';
import { WebsiteTemplate, WebsitePage } from '../../types';
import ComponentPanel from './ComponentPanel';
import Canvas from './Canvas';
import PageManager from './PageManager';
import Preview from './Preview';
import { useStore } from '../../store/useStore';
import { ArrowLeft, Save, Eye, Plus } from 'lucide-react';

interface WebsiteEditorProps {
  template: WebsiteTemplate;
  onBack: () => void;
}

function WebsiteEditor({ template, onBack }: WebsiteEditorProps) {
  const [pages, setPages] = useState(template.pages);
  const [currentPage, setCurrentPage] = useState(template.pages[0]);
  const [showPageManager, setShowPageManager] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const addWebsiteTemplate = useStore((state) => state.addWebsiteTemplate);

  const handleAddPage = (pageName: string, path: string) => {
    const newPage = {
      id: `page-${Date.now()}`,
      name: pageName,
      path: path,
      content: ''
    };
    setPages([...pages, newPage]);
    setCurrentPage(newPage);
    setShowPageManager(false);
  };

  const handleDeletePage = (pageId: string) => {
    if (pages.length <= 1) return;
    const newPages = pages.filter(page => page.id !== pageId);
    setPages(newPages);
    if (currentPage.id === pageId) {
      setCurrentPage(newPages[0]);
    }
  };

  const handleSave = () => {
    const updatedTemplate: WebsiteTemplate = {
      ...template,
      pages: pages,
      lastModified: new Date().toISOString()
    };
    addWebsiteTemplate(updatedTemplate);
    // Show success message
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = 'Website template saved successfully!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            Editing {template.name}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowPageManager(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 border border-gray-200"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Pages</span>
          </button>
          <button 
            onClick={() => setShowPreview(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-4">
        {pages.map(page => (
          <button
            key={page.id}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentPage.id === page.id
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page.name}
          </button>
        ))}
      </div>

      <div className="flex h-full bg-gray-100 rounded-lg overflow-hidden">
        <ComponentPanel />
        <Canvas currentPage={currentPage} />
      </div>

      {showPageManager && (
        <PageManager
          pages={pages}
          onClose={() => setShowPageManager(false)}
          onAddPage={handleAddPage}
          onDeletePage={handleDeletePage}
        />
      )}

      {showPreview && (
        <Preview
          pages={pages}
          currentPage={currentPage}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default WebsiteEditor;
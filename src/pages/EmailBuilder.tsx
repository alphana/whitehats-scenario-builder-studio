import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import TemplateList from '../components/email/TemplateList';
import Editor from '../components/email/Editor';
import { Plus, Save } from 'lucide-react';

function EmailBuilder() {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Email Builder</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsCreatingNew(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {isCreatingNew ? (
        <Editor onClose={() => setIsCreatingNew(false)} />
      ) : (
        <TemplateList onSelect={() => setIsCreatingNew(true)} />
      )}
    </div>
  );
}

export default EmailBuilder;
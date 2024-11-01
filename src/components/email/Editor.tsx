import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Save, X } from 'lucide-react';

interface EditorProps {
  onClose: () => void;
}

function Editor({ onClose }: EditorProps) {
  const [subject, setSubject] = useState('');
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start writing your email content...</p>',
  });

  const handleSave = () => {
    // Save logic will be implemented later
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Email Editor</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject Line
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter email subject..."
        />
      </div>

      <div className="prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default Editor;
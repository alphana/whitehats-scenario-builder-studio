import React, { useState } from 'react';
import TemplateSelector from '../components/website/TemplateSelector';
import WebsiteEditor from '../components/website/WebsiteEditor';
import { WebsiteTemplate } from '../types';

function WebsiteBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Website Builder</h1>
      
      {selectedTemplate ? (
        <WebsiteEditor 
          template={selectedTemplate} 
          onBack={() => setSelectedTemplate(null)}
        />
      ) : (
        <TemplateSelector onSelect={setSelectedTemplate} />
      )}
    </div>
  );
}

export default WebsiteBuilder;
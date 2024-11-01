import React, { useState, useRef } from 'react';
import { DraggableComponent, WebsitePage } from '../../types';
import ComponentRenderer from './ComponentRenderer';
import { useStore } from '../../store/useStore';
import { Move } from 'lucide-react';

interface CanvasProps {
  currentPage: WebsitePage;
}

function Canvas({ currentPage }: CanvasProps) {
  const [components, setComponents] = useState<DraggableComponent[]>(
    currentPage.components || []
  );
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const dragRef = useRef<number | null>(null);
  const updateWebsiteTemplate = useStore((state) => state.updateWebsiteTemplate);

  // Update the page components whenever they change
  React.useEffect(() => {
    const template = useStore.getState().currentTemplate;
    if (template && template.type === 'website') {
      updateWebsiteTemplate(template.id, {
        pages: template.pages.map(page =>
          page.id === currentPage.id
            ? { ...page, components }
            : page
        ),
      });
    }
  }, [components, currentPage.id, updateWebsiteTemplate]);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const componentData = event.dataTransfer.getData('application/json');
    if (componentData) {
      const component = JSON.parse(componentData) as DraggableComponent;
      const dropY = event.clientY;
      let insertIndex = components.length;

      components.forEach((_, index) => {
        const element = document.getElementById(`component-${index}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (dropY < rect.top + rect.height / 2) {
            insertIndex = index;
            return false;
          }
        }
      });

      const newComponents = [...components];
      newComponents.splice(insertIndex, 0, {
        ...component,
        id: `${component.type}-${Date.now()}`
      });
      setComponents(newComponents);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleComponentDragStart = (index: number) => (event: React.DragEvent) => {
    dragRef.current = index;
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.classList.add('opacity-50');
  };

  const handleComponentDragEnd = (event: React.DragEvent) => {
    event.currentTarget.classList.remove('opacity-50');
    dragRef.current = null;
  };

  const handleComponentDragOver = (index: number) => (event: React.DragEvent) => {
    event.preventDefault();
    if (dragRef.current === null || dragRef.current === index) return;

    const newComponents = [...components];
    const draggedComponent = newComponents[dragRef.current];
    newComponents.splice(dragRef.current, 1);
    newComponents.splice(index, 0, draggedComponent);
    
    setComponents(newComponents);
    dragRef.current = index;
  };

  const handleComponentClick = (id: string) => {
    setActiveComponent(id === activeComponent ? null : id);
  };

  const handleComponentDelete = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
    setActiveComponent(null);
  };

  const handleComponentUpdate = (id: string, updates: Partial<DraggableComponent>) => {
    setComponents(components.map(c => 
      c.id === id ? { ...c, ...updates } : c
    ));
  };

  return (
    <div 
      className="flex-1 p-8 overflow-auto bg-gray-50"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="max-w-4xl mx-auto bg-white min-h-[calc(100vh-16rem)] rounded-lg shadow-sm p-8">
        <h2 className="text-sm font-medium text-gray-500 mb-4">
          Editing: {currentPage.name}
        </h2>
        
        {components.map((component, index) => (
          <div
            key={component.id}
            id={`component-${index}`}
            className={`relative group mb-4 ${
              activeComponent === component.id ? 'ring-2 ring-indigo-500' : ''
            }`}
            draggable
            onDragStart={handleComponentDragStart(index)}
            onDragEnd={handleComponentDragEnd}
            onDragOver={handleComponentDragOver(index)}
            onClick={() => handleComponentClick(component.id)}
          >
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="p-1 bg-gray-100 rounded cursor-move">
                <Move className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <ComponentRenderer
              component={component}
              onUpdate={activeComponent === component.id ? 
                (updates) => handleComponentUpdate(component.id, updates) : 
                undefined}
              onDelete={activeComponent === component.id ?
                () => handleComponentDelete(component.id) :
                undefined}
              isEditing={activeComponent === component.id}
            />
          </div>
        ))}
        
        {components.length === 0 && (
          <div className="text-center text-gray-400 py-12 border-2 border-dashed border-gray-200 rounded-lg">
            Drag and drop components here to start building
          </div>
        )}
      </div>
    </div>
  );
}

export default Canvas;
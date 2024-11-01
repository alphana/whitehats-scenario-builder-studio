import React, { useState } from 'react';
import { DraggableComponent } from '../../types';
import { Settings } from 'lucide-react';

interface ComponentEditorProps {
  component: DraggableComponent;
  onUpdate: (updates: Partial<DraggableComponent>) => void;
}

function ComponentEditor({ component, onUpdate }: ComponentEditorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const renderEditor = () => {
    switch (component.type) {
      case 'heading':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text
              </label>
              <input
                type="text"
                value={component.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                value={component.props?.level || 1}
                onChange={(e) => onUpdate({ props: { ...component.props, level: Number(e.target.value) }})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
              </select>
            </div>
          </>
        );

      case 'text':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={component.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        );

      case 'image':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={component.props?.src || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, src: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={component.props?.alt || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, alt: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </>
        );

      case 'button':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text
              </label>
              <input
                type="text"
                value={component.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Variant
              </label>
              <select
                value={component.props?.variant || 'primary'}
                onChange={(e) => onUpdate({ props: { ...component.props, variant: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </>
        );

      case 'container':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={component.content}
                onChange={(e) => onUpdate({ content: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Padding
              </label>
              <select
                value={component.props?.padding || 'medium'}
                onChange={(e) => onUpdate({ props: { ...component.props, padding: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background
              </label>
              <select
                value={component.props?.background || 'white'}
                onChange={(e) => onUpdate({ props: { ...component.props, background: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="white">White</option>
                <option value="gray-50">Light Gray</option>
                <option value="gray-100">Gray</option>
              </select>
            </div>
          </>
        );

      case 'hero':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={component.props?.title || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, title: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={component.props?.subtitle || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, subtitle: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Background
              </label>
              <select
                value={component.props?.background || 'dark'}
                onChange={(e) => onUpdate({ props: { ...component.props, background: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={component.props?.hasButton || false}
                  onChange={(e) => onUpdate({ props: { ...component.props, hasButton: e.target.checked }})}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Show Button</span>
              </label>
            </div>
            {component.props?.hasButton && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={component.props?.buttonText || ''}
                  onChange={(e) => onUpdate({ props: { ...component.props, buttonText: e.target.value }})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            )}
          </>
        );

      case 'features':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Columns
              </label>
              <select
                value={component.props?.columns || 3}
                onChange={(e) => onUpdate({ props: { ...component.props, columns: Number(e.target.value) }})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value={2}>2 Columns</option>
                <option value={3}>3 Columns</option>
                <option value={4}>4 Columns</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Features
              </label>
              {(component.props?.items || []).map((item, index) => (
                <div key={index} className="mb-4 p-3 bg-gray-50 rounded-md">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const newItems = [...(component.props?.items || [])];
                      newItems[index] = { ...item, title: e.target.value };
                      onUpdate({ props: { ...component.props, items: newItems }});
                    }}
                    className="w-full px-3 py-2 border rounded-md mb-2"
                    placeholder={`Feature ${index + 1} Title`}
                  />
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...(component.props?.items || [])];
                      newItems[index] = { ...item, description: e.target.value };
                      onUpdate({ props: { ...component.props, items: newItems }});
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Feature Description"
                  />
                </div>
              ))}
            </div>
          </>
        );

      case 'testimonial':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quote
              </label>
              <textarea
                value={component.props?.quote || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, quote: e.target.value }})}
                rows={3}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <input
                type="text"
                value={component.props?.author || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, author: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={component.props?.role || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, role: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={component.props?.image || ''}
                onChange={(e) => onUpdate({ props: { ...component.props, image: e.target.value }})}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <div className="mb-4">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={component.props?.email || false}
                  onChange={(e) => onUpdate({ props: { ...component.props, email: e.target.checked }})}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Show Email</span>
              </label>
              {component.props?.email && (
                <input
                  type="text"
                  value={component.props?.emailText || ''}
                  onChange={(e) => onUpdate({ props: { ...component.props, emailText: e.target.value }})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="email@example.com"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={component.props?.phone || false}
                  onChange={(e) => onUpdate({ props: { ...component.props, phone: e.target.checked }})}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Show Phone</span>
              </label>
              {component.props?.phone && (
                <input
                  type="text"
                  value={component.props?.phoneText || ''}
                  onChange={(e) => onUpdate({ props: { ...component.props, phoneText: e.target.value }})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="+1 234 567 890"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={component.props?.address || false}
                  onChange={(e) => onUpdate({ props: { ...component.props, address: e.target.checked }})}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Show Address</span>
              </label>
              {component.props?.address && (
                <input
                  type="text"
                  value={component.props?.addressText || ''}
                  onChange={(e) => onUpdate({ props: { ...component.props, addressText: e.target.value }})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="123 Street, City"
                />
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200"
      >
        <Settings className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-10 w-80 bg-white rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Edit {component.type}
          </h3>
          {renderEditor()}
        </div>
      )}
    </>
  );
}

export default ComponentEditor;
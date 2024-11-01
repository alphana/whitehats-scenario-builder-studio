import React from 'react';
import { DraggableComponent } from '../../types';
import { Trash2, Settings } from 'lucide-react';
import ComponentEditor from './ComponentEditor';

interface ComponentRendererProps {
  component: DraggableComponent;
  onUpdate?: (updates: Partial<DraggableComponent>) => void;
  onDelete?: () => void;
  isEditing: boolean;
}

function ComponentRenderer({ 
  component, 
  onUpdate, 
  onDelete,
  isEditing 
}: ComponentRendererProps) {
  const renderComponent = () => {
    switch (component.type) {
      case 'heading':
        return (
          <h1 
            className={`text-${component.props?.level === 1 ? '4xl' : component.props?.level === 2 ? '3xl' : '2xl'} font-bold text-gray-900`}
          >
            {component.content || 'Add heading text'}
          </h1>
        );
      
      case 'text':
        return (
          <p className="text-gray-600 leading-relaxed">
            {component.content || 'Add paragraph text'}
          </p>
        );
      
      case 'image':
        return component.props?.src ? (
          <img 
            src={component.props.src} 
            alt={component.props.alt || ''} 
            className="w-full rounded-lg"
          />
        ) : (
          <div className="bg-gray-100 p-12 text-center rounded-lg">
            Add an image URL
          </div>
        );
      
      case 'button':
        return (
          <button 
            className={`px-6 py-3 rounded-md ${
              component.props?.variant === 'primary' 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            {component.content || 'Button text'}
          </button>
        );
      
      case 'container':
        return (
          <div className={`p-${component.props?.padding || 6} bg-${component.props?.background || 'white'} rounded-lg border border-gray-200`}>
            {component.content || 'Container content'}
          </div>
        );

      case 'columns':
        return (
          <div className={`grid grid-cols-${component.props?.columns || 2} gap-${component.props?.gap || 6}`}>
            {Array.from({ length: component.props?.columns || 2 }).map((_, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                Column {i + 1}
              </div>
            ))}
          </div>
        );
      
      case 'hero':
        return (
          <div className={`relative py-24 px-8 ${
            component.props?.background === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
          } rounded-lg`}>
            <h1 className="text-4xl font-bold mb-4">
              {component.props?.title || 'Hero Title'}
            </h1>
            <p className="text-xl mb-8">
              {component.props?.subtitle || 'Hero subtitle text'}
            </p>
            {component.props?.hasButton && (
              <button className={`px-6 py-3 ${
                component.props?.background === 'dark' 
                  ? 'bg-white text-gray-900' 
                  : 'bg-indigo-600 text-white'
              } rounded-md hover:opacity-90`}>
                {component.props?.buttonText || 'Get Started'}
              </button>
            )}
          </div>
        );
      
      case 'features':
        return (
          <div className={`grid grid-cols-${component.props?.columns || 3} gap-6`}>
            {(component.props?.items || []).map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        );

      case 'testimonial':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 mb-4">
              {component.props?.image ? (
                <img 
                  src={component.props.image} 
                  alt={component.props.author} 
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
              )}
              <div>
                <h3 className="font-semibold">{component.props?.author || 'Author Name'}</h3>
                <p className="text-gray-600">{component.props?.role || 'Role'}</p>
              </div>
            </div>
            <blockquote className="text-gray-700 italic">
              "{component.props?.quote || 'Add a testimonial quote'}"
            </blockquote>
          </div>
        );

      case 'contact':
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              {component.props?.email && (
                <p className="flex items-center space-x-2">
                  <span className="text-gray-600">Email:</span>
                  <span>{component.props.emailText || 'email@example.com'}</span>
                </p>
              )}
              {component.props?.phone && (
                <p className="flex items-center space-x-2">
                  <span className="text-gray-600">Phone:</span>
                  <span>{component.props.phoneText || '+1 234 567 890'}</span>
                </p>
              )}
              {component.props?.address && (
                <p className="flex items-center space-x-2">
                  <span className="text-gray-600">Address:</span>
                  <span>{component.props.addressText || '123 Street, City'}</span>
                </p>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {isEditing && onUpdate && onDelete && (
        <div className="absolute right-2 top-2 flex space-x-2 z-10">
          <ComponentEditor 
            component={component}
            onUpdate={onUpdate}
          />
          <button
            onClick={onDelete}
            className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
      {renderComponent()}
    </div>
  );
}

export default ComponentRenderer;
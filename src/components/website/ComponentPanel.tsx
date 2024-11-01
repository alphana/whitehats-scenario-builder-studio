import React from 'react';
import { DraggableComponent } from '../../types';
import { 
  Type, 
  Image, 
  Box, 
  Columns, 
  List,
  Link, 
  Map,
  Video,
  Table2,
  Share2,
  MessageSquare,
  Layout,
  Square
} from 'lucide-react';

const components: DraggableComponent[] = [
  {
    id: 'heading',
    type: 'heading',
    content: 'Heading',
    props: { level: 1 }
  },
  {
    id: 'text',
    type: 'text',
    content: 'Text block'
  },
  {
    id: 'image',
    type: 'image',
    content: '',
    props: { src: '', alt: '' }
  },
  {
    id: 'button',
    type: 'button',
    content: 'Click me',
    props: { variant: 'primary' }
  },
  {
    id: 'container',
    type: 'container',
    content: '',
    props: { padding: 'medium', background: 'white' }
  },
  {
    id: 'columns',
    type: 'columns',
    content: '',
    props: { columns: 2, gap: 'medium' }
  },
  {
    id: 'hero',
    type: 'hero',
    content: '',
    props: { 
      title: 'Welcome',
      subtitle: 'Start your journey',
      hasButton: true,
      buttonText: 'Get Started',
      background: 'dark'
    }
  },
  {
    id: 'features',
    type: 'features',
    content: '',
    props: { 
      columns: 3,
      items: [
        { title: 'Feature 1', description: 'Feature description' },
        { title: 'Feature 2', description: 'Feature description' },
        { title: 'Feature 3', description: 'Feature description' }
      ]
    }
  },
  {
    id: 'testimonial',
    type: 'testimonial',
    content: '',
    props: { 
      quote: 'Great service!',
      author: 'John Doe',
      role: 'CEO',
      image: ''
    }
  },
  {
    id: 'contact',
    type: 'contact',
    content: '',
    props: { 
      email: true,
      phone: true,
      address: true,
      emailText: 'contact@example.com',
      phoneText: '+1 234 567 890',
      addressText: '123 Street, City'
    }
  }
];

const componentIcons: Record<string, React.ReactNode> = {
  heading: <Type className="w-4 h-4" />,
  text: <Type className="w-4 h-4" />,
  image: <Image className="w-4 h-4" />,
  button: <Square className="w-4 h-4" />,
  container: <Box className="w-4 h-4" />,
  columns: <Columns className="w-4 h-4" />,
  hero: <Layout className="w-4 h-4" />,
  features: <List className="w-4 h-4" />,
  testimonial: <MessageSquare className="w-4 h-4" />,
  contact: <Link className="w-4 h-4" />
};

function ComponentPanel() {
  const handleDragStart = (component: DraggableComponent) => (event: React.DragEvent) => {
    event.dataTransfer.setData('application/json', JSON.stringify(component));
    event.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Components</h3>
      <div className="space-y-2">
        {components.map((component) => (
          <div
            key={component.id}
            draggable
            onDragStart={handleDragStart(component)}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md cursor-move hover:bg-gray-100"
          >
            {componentIcons[component.type]}
            <span className="text-sm text-gray-700 capitalize">
              {component.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComponentPanel;
import React, { useState } from 'react';
import { ComponentType } from './types';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ChevronDown, 
  Search, 
  MousePointer, 
  Square, 
  Type, 
  ToggleLeft, 
  AlertCircle, 
  Layout, 
  Navigation,
  Check,
  Circle,
  Sliders,
  Play,
  X
} from 'lucide-react';

interface ComponentOption {
  value: ComponentType;
  label: string;
  description: string;
  category: 'input' | 'display' | 'feedback' | 'navigation' | 'layout';
  icon: React.ReactNode;
  preview: React.ReactNode;
  tags: string[];
}

interface ComponentTypeSelectorProps {
  value: ComponentType;
  onValueChange: (value: ComponentType) => void;
}

export const ComponentTypeSelector: React.FC<ComponentTypeSelectorProps> = ({
  value,
  onValueChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const componentOptions: ComponentOption[] = [
    // Input Components
    {
      value: 'button',
      label: 'Button',
      description: 'Clickable element that triggers actions',
      category: 'input',
      icon: <MousePointer className="w-4 h-4" />,
      preview: (
        <div className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded text-xs">
          Click me
        </div>
      ),
      tags: ['click', 'action', 'submit', 'interactive']
    },
    {
      value: 'input',
      label: 'Input',
      description: 'Single-line text entry field',
      category: 'input',
      icon: <Type className="w-4 h-4" />,
      preview: (
        <div className="border rounded px-2 py-1 text-xs bg-white min-w-[100px]">
          Enter text...
        </div>
      ),
      tags: ['text', 'form', 'field', 'typing']
    },
    {
      value: 'textarea',
      label: 'Textarea',
      description: 'Multi-line text input for longer content',
      category: 'input',
      icon: <Square className="w-4 h-4" />,
      preview: (
        <div className="border rounded px-2 py-1 text-xs bg-white min-w-[100px] h-8 resize-none">
          Type message...
        </div>
      ),
      tags: ['text', 'multiline', 'message', 'paragraph']
    },
    {
      value: 'select',
      label: 'Select',
      description: 'Dropdown menu for choosing from options',
      category: 'input',
      icon: <ChevronDown className="w-4 h-4" />,
      preview: (
        <div className="border rounded px-2 py-1 text-xs bg-white min-w-[100px] flex justify-between items-center">
          Choose option...
          <ChevronDown className="w-3 h-3" />
        </div>
      ),
      tags: ['dropdown', 'options', 'choose', 'menu']
    },
    {
      value: 'checkbox',
      label: 'Checkbox',
      description: 'Square toggle for multiple selections',
      category: 'input',
      icon: <Check className="w-4 h-4" />,
      preview: (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border rounded flex items-center justify-center bg-blue-500">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs">Option</span>
        </div>
      ),
      tags: ['toggle', 'multiple', 'selection', 'form']
    },
    {
      value: 'radio',
      label: 'Radio',
      description: 'Circular button for single selection from group',
      category: 'input',
      icon: <Circle className="w-4 h-4" />,
      preview: (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border rounded-full flex items-center justify-center bg-blue-500">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <span className="text-xs">Choice</span>
        </div>
      ),
      tags: ['single', 'selection', 'group', 'choice']
    },
    {
      value: 'switch',
      label: 'Switch',
      description: 'Toggle control for on/off states',
      category: 'input',
      icon: <ToggleLeft className="w-4 h-4" />,
      preview: (
        <div className="w-8 h-4 bg-blue-500 rounded-full relative">
          <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5" />
        </div>
      ),
      tags: ['toggle', 'on', 'off', 'boolean']
    },
    {
      value: 'slider',
      label: 'Slider',
      description: 'Range input for selecting values',
      category: 'input',
      icon: <Sliders className="w-4 h-4" />,
      preview: (
        <div className="w-16 h-2 bg-gray-200 rounded relative">
          <div className="w-8 h-2 bg-blue-500 rounded" />
          <div className="w-3 h-3 bg-blue-500 rounded-full absolute top-[-2px] left-7" />
        </div>
      ),
      tags: ['range', 'value', 'adjust', 'control']
    },
    {
      value: 'toggle',
      label: 'Toggle',
      description: 'Button that switches between active/inactive',
      category: 'input',
      icon: <Play className="w-4 h-4" />,
      preview: (
        <div className="inline-flex items-center px-3 py-1.5 bg-blue-500 text-white rounded text-xs">
          Active
        </div>
      ),
      tags: ['button', 'state', 'active', 'inactive']
    },

    // Display Components
    {
      value: 'card',
      label: 'Card',
      description: 'Container for grouping related content',
      category: 'display',
      icon: <Layout className="w-4 h-4" />,
      preview: (
        <div className="border rounded p-2 bg-white shadow-sm min-w-[80px]">
          <div className="h-2 bg-gray-300 rounded mb-1" />
          <div className="h-1.5 bg-gray-200 rounded" />
        </div>
      ),
      tags: ['container', 'content', 'group', 'box']
    },
    {
      value: 'chip',
      label: 'Chip',
      description: 'Small element for tags, filters, or selections',
      category: 'display',
      icon: <X className="w-4 h-4" />,
      preview: (
        <div className="inline-flex items-center px-2 py-1 bg-gray-200 rounded-full text-xs gap-1">
          Tag
          <X className="w-2 h-2" />
        </div>
      ),
      tags: ['tag', 'filter', 'label', 'small']
    },
    {
      value: 'badge',
      label: 'Badge',
      description: 'Small status indicator or notification count',
      category: 'display',
      icon: <AlertCircle className="w-4 h-4" />,
      preview: (
        <div className="inline-flex items-center px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
          3
        </div>
      ),
      tags: ['notification', 'count', 'status', 'indicator']
    },
    {
      value: 'avatar',
      label: 'Avatar',
      description: 'User profile picture or initials display',
      category: 'display',
      icon: <Circle className="w-4 h-4" />,
      preview: (
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
          JD
        </div>
      ),
      tags: ['user', 'profile', 'picture', 'initials']
    },
    {
      value: 'progress',
      label: 'Progress',
      description: 'Visual indicator of task completion',
      category: 'display',
      icon: <Sliders className="w-4 h-4" />,
      preview: (
        <div className="w-16 h-2 bg-gray-200 rounded overflow-hidden">
          <div className="w-10 h-2 bg-blue-500" />
        </div>
      ),
      tags: ['loading', 'completion', 'status', 'bar']
    },

    // Feedback Components
    {
      value: 'alert',
      label: 'Alert',
      description: 'Important messages and notifications',
      category: 'feedback',
      icon: <AlertCircle className="w-4 h-4" />,
      preview: (
        <div className="flex items-center gap-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs">
          <AlertCircle className="w-3 h-3 text-yellow-600" />
          <span>Alert message</span>
        </div>
      ),
      tags: ['message', 'warning', 'info', 'notification']
    },
    {
      value: 'tooltip',
      label: 'Tooltip',
      description: 'Contextual information on hover',
      category: 'feedback',
      icon: <AlertCircle className="w-4 h-4" />,
      preview: (
        <div className="relative">
          <div className="px-2 py-1 bg-black text-white rounded text-xs">
            Tooltip
          </div>
        </div>
      ),
      tags: ['hover', 'help', 'info', 'context']
    },
    {
      value: 'popover',
      label: 'Popover',
      description: 'Floating content panel triggered by click',
      category: 'feedback',
      icon: <Square className="w-4 h-4" />,
      preview: (
        <div className="relative">
          <div className="p-2 bg-white border shadow-lg rounded text-xs min-w-[60px]">
            Content
          </div>
        </div>
      ),
      tags: ['click', 'floating', 'panel', 'overlay']
    },
    {
      value: 'modal',
      label: 'Modal',
      description: 'Overlay dialog that requires user interaction',
      category: 'feedback',
      icon: <Square className="w-4 h-4" />,
      preview: (
        <div className="p-2 bg-white border shadow-xl rounded text-xs min-w-[80px]">
          <div className="flex justify-between items-center mb-1">
            <div className="h-2 bg-gray-400 rounded w-8" />
            <X className="w-2 h-2" />
          </div>
          <div className="h-1.5 bg-gray-200 rounded" />
        </div>
      ),
      tags: ['dialog', 'overlay', 'popup', 'modal']
    },

    // Navigation Components
    {
      value: 'tab',
      label: 'Tab',
      description: 'Horizontal navigation between sections',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4" />,
      preview: (
        <div className="flex border-b">
          <div className="px-3 py-1 border-b-2 border-blue-500 text-xs">Active</div>
          <div className="px-3 py-1 text-xs text-gray-400">Tab</div>
        </div>
      ),
      tags: ['navigation', 'sections', 'horizontal', 'switch']
    },
    {
      value: 'breadcrumb',
      label: 'Breadcrumb',
      description: 'Navigation trail showing current location',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4" />,
      preview: (
        <div className="flex items-center gap-1 text-xs">
          <span>Home</span>
          <span>/</span>
          <span className="text-blue-500">Page</span>
        </div>
      ),
      tags: ['navigation', 'trail', 'path', 'location']
    },
    {
      value: 'accordion',
      label: 'Accordion',
      description: 'Collapsible content sections',
      category: 'navigation',
      icon: <ChevronDown className="w-4 h-4" />,
      preview: (
        <div className="border rounded">
          <div className="flex justify-between items-center p-2 text-xs">
            Section
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      ),
      tags: ['collapsible', 'expand', 'sections', 'organize']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Components', icon: <Layout className="w-4 h-4" /> },
    { id: 'input', label: 'Input & Forms', icon: <Type className="w-4 h-4" /> },
    { id: 'display', label: 'Display & Data', icon: <Square className="w-4 h-4" /> },
    { id: 'feedback', label: 'Feedback & Overlay', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'navigation', label: 'Navigation', icon: <Navigation className="w-4 h-4" /> }
  ];

  const selectedOption = componentOptions.find(option => option.value === value);

  const filteredOptions = componentOptions.filter(option => {
    const matchesSearch = searchQuery === '' || 
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || option.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const groupedOptions = categories.reduce((acc, category) => {
    if (category.id === 'all') return acc;
    acc[category.id] = filteredOptions.filter(option => option.category === category.id);
    return acc;
  }, {} as Record<string, ComponentOption[]>);

  const handleSelect = (option: ComponentOption) => {
    onValueChange(option.value);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between h-auto p-3"
      >
        <div className="flex items-center gap-3">
          {selectedOption?.icon}
          <div className="flex flex-col items-start">
            <span className="font-medium">{selectedOption?.label}</span>
            <span className="text-xs text-muted-foreground">{selectedOption?.description}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2">
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <div className="border-b">
                  <TabsList className="grid w-full grid-cols-5 h-auto p-1">
                    {categories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="flex flex-col gap-1 py-2 px-1"
                      >
                        {category.icon}
                        <span className="text-xs">{category.label.split(' ')[0]}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <ScrollArea className="h-80">
                  <TabsContent value="all" className="p-4 space-y-4 mt-0">
                    {Object.entries(groupedOptions).map(([categoryId, options]) => {
                      if (options.length === 0) return null;
                      const category = categories.find(c => c.id === categoryId);
                      return (
                        <div key={categoryId}>
                          <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                            {category?.icon}
                            {category?.label}
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {options.map(option => (
                              <div
                                key={option.value}
                                className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                                  option.value === value ? 'border-primary bg-primary/5' : ''
                                }`}
                                onClick={() => handleSelect(option)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    {option.icon}
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-sm">{option.label}</div>
                                      <div className="text-xs text-muted-foreground">{option.description}</div>
                                    </div>
                                  </div>
                                  <div className="flex-shrink-0">
                                    {option.preview}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </TabsContent>

                  {categories.slice(1).map(category => (
                    <TabsContent key={category.id} value={category.id} className="p-4 mt-0">
                      <div className="grid grid-cols-1 gap-2">
                        {(groupedOptions[category.id] || []).map(option => (
                          <div
                            key={option.value}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                              option.value === value ? 'border-primary bg-primary/5' : ''
                            }`}
                            onClick={() => handleSelect(option)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                {option.icon}
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm">{option.label}</div>
                                  <div className="text-xs text-muted-foreground">{option.description}</div>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {option.tags.slice(0, 3).map(tag => (
                                      <Badge key={tag} variant="secondary" className="text-xs px-1 py-0">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                {option.preview}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </ScrollArea>
              </Tabs>

              {filteredOptions.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No components found</div>
                  <div className="text-xs">Try different search terms</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
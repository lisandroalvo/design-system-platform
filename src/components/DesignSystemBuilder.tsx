import React, { useState, useCallback } from 'react';
import { 
  DesignSystemComponent, 
  ComponentType, 
  ComponentVariant, 
  ComponentStyles,
  FigmaExportOptions 
} from './design-system/types';
import { defaultComponentStyles, createDefaultVariants } from './design-system/defaults';
import { ComponentStyleEditor } from './design-system/ComponentStyleEditor';
import { ComponentPreview } from './design-system/ComponentPreview';
import { VariationManager } from './design-system/VariationManager';
import { FigmaExporter } from './design-system/FigmaExporter';

import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

import { 
  Plus, 
  Palette, 
  Eye, 
  Settings, 
  Download, 
  Moon, 
  Sun, 
  Trash2,
  Edit3,
  Layers,
  Figma
} from 'lucide-react';

interface DesignSystemBuilderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export const DesignSystemBuilder: React.FC<DesignSystemBuilderProps> = ({
  isDark,
  onThemeToggle
}) => {
  const [components, setComponents] = useState<DesignSystemComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedStateId, setSelectedStateId] = useState<string>('');
  const [newComponentType, setNewComponentType] = useState<ComponentType>('button');
  const [newComponentName, setNewComponentName] = useState('');

  const selectedComponent = selectedComponentId 
    ? components.find(c => c.id === selectedComponentId) 
    : null;
  
  const selectedVariant = selectedComponent 
    ? selectedComponent.variants.find(v => v.id === selectedVariantId)
    : null;

  const selectedState = selectedVariant 
    ? selectedVariant.states.find(s => s.id === selectedStateId)
    : null;

  const componentTypes: { value: ComponentType; label: string }[] = [
    { value: 'button', label: 'Button' },
    { value: 'input', label: 'Input' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'select', label: 'Select' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'radio', label: 'Radio' },
    { value: 'switch', label: 'Switch' },
    { value: 'slider', label: 'Slider' },
    { value: 'card', label: 'Card' },
    { value: 'chip', label: 'Chip' },
    { value: 'badge', label: 'Badge' },
    { value: 'avatar', label: 'Avatar' },
    { value: 'toggle', label: 'Toggle' },
    { value: 'accordion', label: 'Accordion' },
    { value: 'tab', label: 'Tab' },
    { value: 'modal', label: 'Modal' },
    { value: 'tooltip', label: 'Tooltip' },
    { value: 'popover', label: 'Popover' },
    { value: 'progress', label: 'Progress' },
    { value: 'alert', label: 'Alert' },
    { value: 'breadcrumb', label: 'Breadcrumb' }
  ];

  const createComponent = () => {
    if (!newComponentName.trim()) return;

    const componentId = `${newComponentType}-${Date.now()}`;
    const variants = createDefaultVariants(newComponentType);
    
    const newComponent: DesignSystemComponent = {
      id: componentId,
      type: newComponentType,
      name: newComponentName,
      description: `A ${newComponentType} component`,
      category: 'General',
      variants,
      baseStyles: { ...defaultComponentStyles },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(componentId);
    setSelectedVariantId(variants[0].id);
    setSelectedStateId(variants[0].states[0].id);
    setNewComponentName('');
  };

  const deleteComponent = (componentId: string) => {
    setComponents(prev => prev.filter(c => c.id !== componentId));
    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
      setSelectedVariantId('');
      setSelectedStateId('');
    }
  };

  const updateComponentStyles = useCallback((styles: ComponentStyles) => {
    if (!selectedComponent || !selectedVariant || !selectedState) return;

    setComponents(prev => prev.map(comp => {
      if (comp.id !== selectedComponentId) return comp;
      
      return {
        ...comp,
        variants: comp.variants.map(variant => {
          if (variant.id !== selectedVariantId) return variant;
          
          return {
            ...variant,
            states: variant.states.map(state => {
              if (state.id !== selectedStateId) return state;
              
              // For default state, update variant base styles
              if (state.name === 'default') {
                return {
                  ...state,
                  styles: {}
                };
              }
              
              // For other states, store only the differences
              const differences: Partial<ComponentStyles> = {};
              Object.keys(styles).forEach(key => {
                const styleKey = key as keyof ComponentStyles;
                if (JSON.stringify(styles[styleKey]) !== JSON.stringify(variant.styles[styleKey])) {
                  (differences as any)[styleKey] = styles[styleKey];
                }
              });
              
              return {
                ...state,
                styles: differences
              };
            }),
            // Update variant base styles if we're editing the default state
            styles: selectedState.name === 'default' ? styles : variant.styles
          };
        }),
        updatedAt: new Date()
      };
    }));
  }, [selectedComponent, selectedVariant, selectedState, selectedComponentId, selectedVariantId, selectedStateId]);

  const updateComponentVariants = useCallback((variants: ComponentVariant[]) => {
    if (!selectedComponent) return;

    setComponents(prev => prev.map(comp => 
      comp.id === selectedComponentId 
        ? { ...comp, variants, updatedAt: new Date() }
        : comp
    ));
  }, [selectedComponent, selectedComponentId]);

  const handleExport = async (options: FigmaExportOptions): Promise<void> => {
    // Simulate API call to Figma
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Exporting to Figma with options:', options);
        console.log('Components to export:', components);
        resolve();
      }, 2000);
    });
  };

  const getCurrentStyles = (): ComponentStyles => {
    if (!selectedVariant || !selectedState) return defaultComponentStyles;
    
    // Merge variant styles with state styles
    return { ...selectedVariant.styles, ...selectedState.styles };
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">ComponentLab</h1>
            <Badge variant="secondary" className="text-xs">Design System Builder</Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onThemeToggle}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          {components.length > 0 && (
            <FigmaExporter 
              components={components}
              onExport={handleExport}
            />
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Create Component</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select value={newComponentType} onValueChange={(value: ComponentType) => setNewComponentType(value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {componentTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="Component name"
                  value={newComponentName}
                  onChange={(e) => setNewComponentName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && createComponent()}
                  className="h-8"
                />
              </div>
              
              <Button onClick={createComponent} size="sm" className="w-full h-8">
                <Plus className="w-3 h-3 mr-1" />
                Create Component
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Components ({components.length})</Label>
              </div>
              
              {components.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No components yet</div>
                  <div className="text-xs">Create your first component above</div>
                </div>
              ) : (
                <div className="space-y-2">
                  {components.map((component) => (
                    <Card 
                      key={component.id}
                      className={`cursor-pointer transition-colors ${
                        component.id === selectedComponentId 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedComponentId(component.id);
                        setSelectedVariantId(component.variants[0].id);
                        setSelectedStateId(component.variants[0].states[0].id);
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{component.name}</div>
                            <div className="text-xs text-muted-foreground capitalize">
                              {component.type} • {component.variants.length} variant{component.variants.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteComponent(component.id);
                            }}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {selectedComponent ? (
            <>
              {/* Preview & Variations */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4">
                  <ComponentPreview
                    componentType={selectedComponent.type}
                    variants={selectedComponent.variants}
                    selectedVariantId={selectedVariantId}
                    selectedStateId={selectedStateId}
                    onVariantChange={setSelectedVariantId}
                    onStateChange={setSelectedStateId}
                  />
                </div>
                
                <div className="h-80 border-t p-4">
                  <VariationManager
                    componentType={selectedComponent.type}
                    variants={selectedComponent.variants}
                    onVariantsChange={updateComponentVariants}
                    selectedVariantId={selectedVariantId}
                    selectedStateId={selectedStateId}
                    onVariantSelect={setSelectedVariantId}
                    onStateSelect={setSelectedStateId}
                  />
                </div>
              </div>

              {/* Style Editor */}
              <div className="w-80 border-l">
                <div className="h-full p-4">
                  <ComponentStyleEditor
                    styles={getCurrentStyles()}
                    onChange={updateComponentStyles}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <Palette className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Welcome to ComponentLab</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Create and customize components with full control over styling, variants, and states.
                  </p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 justify-center">
                    <Edit3 className="w-4 h-4" />
                    Full style customization
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Layers className="w-4 h-4" />
                    Multiple variants & states
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <Figma className="w-4 h-4" />
                    Export to Figma
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
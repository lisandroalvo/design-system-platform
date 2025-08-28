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
import { ComponentGallery } from './design-system/ComponentGallery';
import { AnimatedIcon, AnimatedButton, StaggeredIconContainer } from './ui/animated-icon';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

import { 
  Plus, 
  Palette, 
  Eye, 
  Moon, 
  Sun, 
  Trash2,
  Edit3,
  Layers,
  Figma,
  Sparkles,
  Home,
  Settings,
  History,
  Download,
  ChevronRight,
  Zap,
  Stars,
  Cpu,
  Workflow,
  TrendingUp,
  BarChart3,
  Users,
  Clock,
  MousePointer,
  Sliders,
  FileText
} from 'lucide-react';

interface DesignSystemBuilderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

type NavigationView = 'dashboard' | 'create-component' | 'my-components' | 'settings';

export const DesignSystemBuilder: React.FC<DesignSystemBuilderProps> = ({
  isDark,
  onThemeToggle
}) => {
  const [components, setComponents] = useState<DesignSystemComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedStateId, setSelectedStateId] = useState<string>('');
  const [currentView, setCurrentView] = useState<NavigationView>('dashboard');

  const selectedComponent = selectedComponentId 
    ? components.find(c => c.id === selectedComponentId) 
    : null;
  
  const selectedVariant = selectedComponent 
    ? selectedComponent.variants.find(v => v.id === selectedVariantId)
    : null;

  const selectedState = selectedVariant 
    ? selectedVariant.states.find(s => s.id === selectedStateId)
    : null;

  const navigationItems = [
    {
      id: 'dashboard' as NavigationView,
      label: 'Dashboard',
      icon: <Home className="w-4 h-4" />,
      description: 'Overview and analytics'
    },
    {
      id: 'create-component' as NavigationView,
      label: 'Create Component',
      icon: <Plus className="w-4 h-4" />,
      description: 'Build new components'
    },
    {
      id: 'my-components' as NavigationView,
      label: 'My Components',
      icon: <Layers className="w-4 h-4" />,
      description: `${components.length} component${components.length !== 1 ? 's' : ''}`,
      badge: components.length > 0 ? components.length.toString() : undefined
    }
  ];

  const createComponent = (type: ComponentType, name: string) => {
    const componentId = `${type}-${Date.now()}`;
    const variants = createDefaultVariants(type);
    
    const newComponent: DesignSystemComponent = {
      id: componentId,
      type: type,
      name: name,
      description: `A ${type} component`,
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
    setCurrentView('my-components');
    
    toast.success(`✨ ${newComponent.name} component created successfully!`);
  };

  const deleteComponent = (componentId: string) => {
    const component = components.find(c => c.id === componentId);
    setComponents(prev => prev.filter(c => c.id !== componentId));
    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
      setSelectedVariantId('');
      setSelectedStateId('');
    }
    
    if (component) {
      toast.success(`🗑️ ${component.name} component deleted`);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Exporting to Figma with options:', options);
        console.log('Components to export:', components);
        toast.success('🎨 Design system exported to Figma successfully!');
        resolve();
      }, 2000);
    });
  };

  const getCurrentStyles = (): ComponentStyles => {
    if (!selectedVariant || !selectedState) return defaultComponentStyles;
    return { ...selectedVariant.styles, ...selectedState.styles };
  };

  const renderDashboard = () => (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Simple Header */}
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Design System Studio
              </h1>
              <p className="text-gray-600 text-sm">
                Build, customize, and scale your component ecosystem
              </p>
            </div>
          </motion.div>

          {/* Simple Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Layers className="w-5 h-5 text-blue-600" />,
                value: components.length,
                label: 'Components'
              },
              {
                icon: <Eye className="w-5 h-5 text-blue-600" />,
                value: components.reduce((sum, comp) => sum + comp.variants.length, 0),
                label: 'Variants'
              },
              {
                icon: <Zap className="w-5 h-5 text-blue-600" />,
                value: components.reduce((sum, comp) => 
                  sum + comp.variants.reduce((vSum, variant) => vSum + variant.states.length, 0), 0
                ),
                label: 'States'
              },
              {
                icon: <Stars className="w-5 h-5 text-blue-600" />,
                value: 2025,
                label: 'UI Trends'
              }
            ].map((stat, index) => (
              <Card key={stat.label} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300" 
              onClick={() => setCurrentView('create-component')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600 rounded-xl">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Create New Component</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Choose from 25+ modern component types
                    </p>
                    <div className="flex items-center gap-2 text-blue-600">
                      <span className="text-sm font-medium">Get Started</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300" 
              onClick={() => setCurrentView('my-components')}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-600 rounded-xl">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Manage Components</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Edit and organize your component library
                    </p>
                    <div className="flex items-center gap-2 text-blue-600">
                      <span className="text-sm font-medium">View Library</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Components */}
          {components.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Components</h2>
                <Button 
                  variant="outline"
                  onClick={() => setCurrentView('my-components')}
                  className="h-8 px-4 text-sm"
                >
                  View All
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {components.slice(0, 6).map(component => (
                  <Card 
                    key={component.id}
                    className="cursor-pointer border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-300"
                    onClick={() => {
                      setSelectedComponentId(component.id);
                      setSelectedVariantId(component.variants[0].id);
                      setSelectedStateId(component.variants[0].states[0].id);
                      setCurrentView('my-components');
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {component.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs capitalize">
                          {component.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          <span>{component.variants.length} variant{component.variants.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Workflow className="w-3 h-3" />
                          <span>{component.variants.reduce((sum, v) => sum + v.states.length, 0)} states</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {components.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Building Your Design System</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Create your first component with cutting-edge 2025 design patterns and styling capabilities.
              </p>
              <Button 
                onClick={() => setCurrentView('create-component')} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create First Component
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMyComponents = () => (
    <div className="h-full flex">
      {/* Narrower Component List Sidebar */}
      <div className="w-64 border-r border-gray-200 flex flex-col bg-gray-50">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">My Components</h2>
            <Button 
              size="sm" 
              onClick={() => setCurrentView('create-component')}
              className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-2 text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              New
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {components.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Layers className="w-6 h-6 mx-auto mb-2 opacity-50" />
                <div className="text-xs font-medium">No components yet</div>
                <div className="text-xs">Create your first component</div>
              </div>
            ) : (
              components.map((component) => (
                <Card 
                  key={component.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    component.id === selectedComponentId 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    setSelectedComponentId(component.id);
                    setSelectedVariantId(component.variants[0].id);
                    setSelectedStateId(component.variants[0].states[0].id);
                  }}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate text-gray-900">{component.name}</div>
                        <div className="text-xs text-gray-500 capitalize">
                          {component.type} • {component.variants.length}v
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-5 w-5 p-0 flex-shrink-0 hover:bg-red-100 hover:text-red-600 text-gray-400"
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
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Component Editor */}
      {selectedComponent ? (
        <>
          {/* Larger Central Preview Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex-1 p-4">
              <ComponentPreview
                componentType={selectedComponent.type}
                componentName={selectedComponent.name}
                variants={selectedComponent.variants}
                selectedVariantId={selectedVariantId}
                selectedStateId={selectedStateId}
                onVariantChange={setSelectedVariantId}
                onStateChange={setSelectedStateId}
              />
            </div>
          </div>

          {/* Right Panel with Tabs */}
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
            <Tabs defaultValue="variations" className="h-full flex flex-col">
              <div className="border-b border-gray-200 px-4 py-3">
                <h2 className="font-semibold text-gray-900 text-sm mb-3">Component Editor</h2>
                <TabsList className="grid w-full grid-cols-2 h-8">
                  <TabsTrigger value="variations" className="text-xs flex items-center gap-1">
                    <Layers className="w-3 h-3" />
                    Variations
                  </TabsTrigger>
                  <TabsTrigger value="styles" className="text-xs flex items-center gap-1">
                    <Palette className="w-3 h-3" />
                    Styles
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <TabsContent value="variations" className="h-full m-0 p-4">
                  <VariationManager
                    componentType={selectedComponent.type}
                    variants={selectedComponent.variants}
                    onVariantsChange={updateComponentVariants}
                    selectedVariantId={selectedVariantId}
                    selectedStateId={selectedStateId}
                    onVariantSelect={setSelectedVariantId}
                    onStateSelect={setSelectedStateId}
                  />
                </TabsContent>
                
                <TabsContent value="styles" className="h-full m-0 p-4">
                  <ComponentStyleEditor
                    styles={getCurrentStyles()}
                    onChange={updateComponentStyles}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center bg-gray-50">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-2xl flex items-center justify-center">
              <Layers className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">Select a Component</h3>
              <p className="text-gray-600 text-sm">
                Choose a component from the sidebar to start editing
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return renderDashboard();
      case 'create-component':
        return (
          <ComponentGallery
            onComponentSelect={createComponent}
            onCancel={() => setCurrentView('dashboard')}
          />
        );
      case 'my-components':
        return renderMyComponents();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* FIXED HEIGHT HEADER - Consistent across ALL states */}
      <div className="h-16 min-h-16 max-h-16 border-b border-gray-200 px-4 bg-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <Palette className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 text-sm">ComponentLab</h1>
            <div className="text-xs text-gray-600">Design System Builder</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onThemeToggle}
            className="h-8 w-8 p-0"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          {/* Compact Export Button - No layout shifts */}
          {components.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 px-3 text-xs"
              onClick={() => handleExport({
                includeVariants: true,
                includeStates: true,
                organizationMethod: 'component',
                frameSpacing: 100,
                includeDarkMode: false,
                includeDocumentation: true,
                includeIcons: true,
                exportFormat: 'components',
                include2025Effects: true,
                spatialOrganization: true
              })}
            >
              <FileText className="w-3 h-3 mr-1" />
              Export to Figma
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation - Only show on non-create-component views */}
        {currentView !== 'create-component' && (
          <div className="w-48 border-r border-gray-200 bg-gray-50">
            <ScrollArea className="h-full p-3">
              <nav className="space-y-1">
                {navigationItems.map(item => (
                  <Button
                    key={item.id}
                    variant={currentView === item.id ? 'default' : 'ghost'}
                    className={`w-full justify-start h-9 px-3 ${
                      currentView === item.id 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setCurrentView(item.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      {item.icon}
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className={`text-xs ${
                          currentView === item.id 
                            ? 'text-blue-100' 
                            : 'text-gray-500'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            currentView === item.id 
                              ? 'bg-blue-500 text-white border-blue-400' 
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </nav>

              {components.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-700 px-2 mb-2">
                      Quick Actions
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-8 text-xs text-gray-600 hover:bg-gray-100"
                      onClick={() => handleExport({
                        includeVariants: true,
                        includeStates: true,
                        organizationMethod: 'component',
                        frameSpacing: 100,
                        includeDarkMode: false,
                        includeDocumentation: true,
                        includeIcons: true,
                        exportFormat: 'components',
                        include2025Effects: true,
                        spatialOrganization: true
                      })}
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Export to Figma
                    </Button>
                  </div>
                </>
              )}
            </ScrollArea>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 bg-white">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};
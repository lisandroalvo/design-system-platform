import React from 'react';
import { ComponentType, ComponentVariant } from './types';
import { renderComponent, renderInteractiveComponent } from './component-data';
import { ComponentMockupPreview } from './ComponentMockupPreview';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'motion/react';
import { 
  Eye, 
  Palette, 
  MousePointer, 
  Monitor, 
  Smartphone, 
  Tablet,
  RotateCcw,
  Layers,
  Play,
  Info,
  Target,
  Zap,
  Grid3X3,
  Gamepad2,
  Maximize2,
  Minimize2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ComponentPreviewProps {
  componentType: ComponentType;
  componentName: string;
  variants: ComponentVariant[];
  selectedVariantId: string;
  selectedStateId: string;
  onVariantChange: (variantId: string) => void;
  onStateChange: (stateId: string) => void;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  componentType,
  componentName,
  variants,
  selectedVariantId,
  selectedStateId,
  onVariantChange,
  onStateChange
}) => {
  const [viewportSize, setViewportSize] = React.useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showAllStates, setShowAllStates] = React.useState(false);
  const [isInteractive, setIsInteractive] = React.useState(true);
  const [showMockup, setShowMockup] = React.useState(true);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const selectedState = selectedVariant?.states.find(s => s.id === selectedStateId);

  const getViewportDimensions = () => {
    switch (viewportSize) {
      case 'mobile': return { width: '375px', height: 'auto' };
      case 'tablet': return { width: '768px', height: 'auto' };
      default: return { width: '100%', height: 'auto' };
    }
  };

  const getInteractionIcon = (stateName: string) => {
    const icons = {
      default: <Target className="w-3 h-3" />,
      hover: <MousePointer className="w-3 h-3" />,
      focus: <Zap className="w-3 h-3" />,
      active: <Play className="w-3 h-3" />,
      disabled: <Eye className="w-3 h-3" />,
      loading: <RotateCcw className="w-3 h-3" />,
      error: <Info className="w-3 h-3" />
    };
    return icons[stateName as keyof typeof icons] || <MousePointer className="w-3 h-3" />;
  };

  const getInteractionDescription = (stateName: string) => {
    const descriptions = {
      default: 'How the component normally appears',
      hover: 'When user hovers their mouse over it',
      focus: 'When user clicks or tabs to focus on it',
      active: 'When user is actively pressing/clicking it',
      disabled: 'When the component is not interactive',
      loading: 'When the component is processing or loading',
      error: 'When there\'s an error or validation issue'
    };
    return descriptions[stateName as keyof typeof descriptions] || 'Custom interaction state';
  };

  if (!selectedVariant || !selectedState) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">
          <Eye className="w-8 h-8 mx-auto mb-3" />
          <p className="text-sm">Select a component style to preview</p>
        </div>
      </div>
    );
  }

  // Show high-fidelity mockup if enabled
  if (showMockup) {
    return (
      <div className="h-full flex flex-col">
        {/* Quick toggle header */}
        <div className="bg-white border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">High-Fidelity Mockup</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMockup(false)}
              className="h-7 px-3 text-xs"
            >
              <Minimize2 className="w-3 h-3 mr-1" />
              Simple View
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <ComponentMockupPreview
            componentType={componentType}
            componentName={componentName}
            variants={variants}
            selectedVariantId={selectedVariantId}
            selectedStateId={selectedStateId}
            onVariantChange={onVariantChange}
            onStateChange={onStateChange}
          />
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-3 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-lg ${isInteractive ? 'bg-green-600' : 'bg-blue-600'}`}>
                {isInteractive ? <Gamepad2 className="w-4 h-4 text-white" /> : <Eye className="w-4 h-4 text-white" />}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">
                  {isInteractive ? 'Interactive Preview' : 'Static Preview'}
                </h2>
                <p className="text-xs text-gray-600">
                  {selectedVariant.name} • {selectedState.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Mockup Toggle */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowMockup(true)}
                    className="h-7 px-3"
                  >
                    <Maximize2 className="w-3 h-3 mr-1" />
                    <span className="text-xs">Mockup</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to high-fidelity mockup view</p>
                </TooltipContent>
              </Tooltip>

              {/* Interactive Toggle */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={isInteractive ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setIsInteractive(!isInteractive)}
                    className="h-7 w-7 p-0"
                  >
                    <Gamepad2 className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isInteractive ? 'Switch to static preview' : 'Switch to interactive preview'}</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Viewport Controls */}
              {[
                { id: 'desktop', icon: <Monitor className="w-3 h-3" /> },
                { id: 'tablet', icon: <Tablet className="w-3 h-3" /> },
                { id: 'mobile', icon: <Smartphone className="w-3 h-3" /> }
              ].map((viewport) => (
                <Button
                  key={viewport.id}
                  variant={viewportSize === viewport.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewportSize(viewport.id as any)}
                  className="h-7 w-7 p-0"
                >
                  {viewport.icon}
                </Button>
              ))}
              
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={showAllStates ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setShowAllStates(!showAllStates)}
                    className="h-7 w-7 p-0"
                  >
                    <Grid3X3 className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{showAllStates ? 'Show single preview' : 'Show all states'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Interactive Mode Notice */}
        {isInteractive && (
          <div className="border-b border-green-200 bg-green-50 px-3 py-2">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-3 h-3 text-green-600" />
              <span className="text-xs text-green-700 font-medium">
                Interactive mode: Click, hover, and interact with components naturally!
              </span>
            </div>
          </div>
        )}

        {/* Style & Interaction Selectors */}
        <div className="border-b border-gray-200 p-3 bg-white space-y-3">
          {/* Style Selector */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette className="w-3 h-3 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Style:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {variants.map((variant) => (
                <Button
                  key={variant.id}
                  variant={selectedVariantId === variant.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    onVariantChange(variant.id);
                    onStateChange(variant.states[0].id);
                  }}
                  className={`h-7 px-3 text-xs ${
                    selectedVariantId === variant.id 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {variant.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Interaction Selector - hidden in interactive mode for some components */}
          {(!isInteractive || !['accordion', 'switch', 'checkbox', 'radio', 'button', 'tabs', 'file-upload'].includes(componentType)) && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MousePointer className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">Interaction:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedVariant.states.map((state) => (
                  <Tooltip key={state.id}>
                    <TooltipTrigger>
                      <Button
                        variant={selectedStateId === state.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStateChange(state.id)}
                        className={`h-7 px-3 text-xs capitalize ${
                          selectedStateId === state.id 
                            ? 'bg-gray-600 text-white hover:bg-gray-700' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          {getInteractionIcon(state.name)}
                          <span>{state.name}</span>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getInteractionDescription(state.name)}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview Area */}
        <div className="flex-1 p-4 bg-gray-50">
          {showAllStates ? (
            <div className="h-full">
              <h3 className="font-medium text-gray-900 mb-3 text-sm">
                All Interactions for "{selectedVariant.name}"
              </h3>
              <ScrollArea className="h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedVariant.states.map((state) => (
                    <Card key={state.id} className="border border-gray-200 shadow-sm">
                      <CardHeader className="pb-2 bg-gray-50">
                        <div className="flex items-center gap-2">
                          {getInteractionIcon(state.name)}
                          <CardTitle className="text-xs capitalize">{state.name}</CardTitle>
                          {state.name === 'default' && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5">
                              Base
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 bg-white flex items-center justify-center min-h-[80px]">
                        <div className="scale-75 origin-center">
                          {isInteractive ? 
                            renderInteractiveComponent(componentType, selectedVariant, state) :
                            renderComponent(componentType, selectedVariant, state)
                          }
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div
                className="w-full max-w-xl mx-auto"
                style={getViewportDimensions()}
              >
                <Card className="border border-gray-200 shadow-sm bg-white">
                  <CardHeader className="pb-3 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getInteractionIcon(selectedState.name)}
                        <CardTitle className="capitalize text-sm">
                          {isInteractive && ['accordion', 'switch', 'checkbox', 'radio', 'button', 'tabs', 'file-upload'].includes(componentType) 
                            ? 'Interactive Component' 
                            : `${selectedState.name} State`
                          }
                        </CardTitle>
                        {selectedState.name === 'default' && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                            Base
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {selectedVariant.name}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white flex items-center justify-center min-h-[150px]">
                    <div className="transform scale-110">
                      {isInteractive ? 
                        renderInteractiveComponent(componentType, selectedVariant, selectedState) :
                        renderComponent(componentType, selectedVariant, selectedState)
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  {isInteractive && ['accordion', 'switch', 'checkbox', 'radio', 'button', 'tabs', 'file-upload'].includes(componentType) ? (
                    <span><strong>Interactive mode</strong> • Click and interact naturally • <span className="capitalize">{viewportSize}</span> viewport</span>
                  ) : (
                    <span><strong className="capitalize">{selectedState.name}</strong> interaction state • <span className="capitalize">{viewportSize}</span> viewport</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};
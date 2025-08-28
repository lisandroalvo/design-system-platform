import React, { useState } from 'react';
import { ComponentType, ComponentVariant, ComponentState } from './types';
import { createDefaultState, getDefaultStateForVariant } from './defaults';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  Edit3, 
  Eye, 
  Palette,
  MousePointer,
  Layers,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Target,
  Zap,
  Settings,
  Info
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface VariationManagerProps {
  componentType: ComponentType;
  variants: ComponentVariant[];
  onVariantsChange: (variants: ComponentVariant[]) => void;
  selectedVariantId: string;
  selectedStateId: string;
  onVariantSelect: (variantId: string) => void;
  onStateSelect: (stateId: string) => void;
}

export const VariationManager: React.FC<VariationManagerProps> = ({
  componentType,
  variants,
  onVariantsChange,
  selectedVariantId,
  selectedStateId,
  onVariantSelect,
  onStateSelect
}) => {
  const [newVariantName, setNewVariantName] = useState('');
  const [newStateName, setNewStateName] = useState('');
  const [showTips, setShowTips] = useState(true);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  // Educational content based on component type
  const getComponentExamples = () => {
    const examples = {
      button: {
        styles: ['Primary', 'Secondary', 'Outline', 'Ghost'],
        interactions: ['Default', 'Hover', 'Pressed', 'Disabled'],
        description: 'Different button styles (Primary, Secondary) and how they look when users interact with them (Hover, Pressed)'
      },
      input: {
        styles: ['Default', 'Search', 'Password', 'Number'],
        interactions: ['Default', 'Focus', 'Error', 'Disabled'],
        description: 'Different input types (Search, Password) and their states when users interact (Focus, Error)'
      },
      card: {
        styles: ['Basic', 'Elevated', 'Outlined', 'Interactive'],
        interactions: ['Default', 'Hover', 'Selected', 'Loading'],
        description: 'Different card appearances (Elevated, Outlined) and how they respond to user interaction'
      }
    };
    
    return examples[componentType as keyof typeof examples] || {
      styles: ['Style 1', 'Style 2', 'Style 3'],
      interactions: ['Default', 'Hover', 'Active', 'Disabled'],
      description: 'Different visual styles and how the component responds to user interactions'
    };
  };

  const examples = getComponentExamples();

  const addVariant = () => {
    if (!newVariantName.trim()) {
      toast.error('Please enter a style name');
      return;
    }

    const newVariant: ComponentVariant = {
      id: `variant-${Date.now()}`,
      name: newVariantName.trim(),
      description: `${newVariantName} style variation`,
      styles: {},
      states: [getDefaultStateForVariant()]
    };

    onVariantsChange([...variants, newVariant]);
    setNewVariantName('');
    toast.success(`✨ "${newVariantName}" style created!`);
  };

  const removeVariant = (variantId: string) => {
    if (variants.length <= 1) {
      toast.error('You need at least one style');
      return;
    }

    const variant = variants.find(v => v.id === variantId);
    onVariantsChange(variants.filter(v => v.id !== variantId));
    
    if (selectedVariantId === variantId) {
      onVariantSelect(variants[0].id);
      onStateSelect(variants[0].states[0].id);
    }
    
    if (variant) {
      toast.success(`🗑️ "${variant.name}" style removed`);
    }
  };

  const duplicateVariant = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId);
    if (!variant) return;

    const newVariant: ComponentVariant = {
      ...variant,
      id: `variant-${Date.now()}`,
      name: `${variant.name} Copy`,
      description: `Copy of ${variant.name}`
    };

    onVariantsChange([...variants, newVariant]);
    toast.success(`📋 "${variant.name}" style duplicated!`);
  };

  const addState = () => {
    if (!selectedVariant || !newStateName.trim()) {
      toast.error('Please enter an interaction name');
      return;
    }

    const newState: ComponentState = {
      id: `state-${Date.now()}`,
      name: newStateName.trim().toLowerCase(),
      description: `${newStateName} interaction state`,
      styles: {}
    };

    const updatedVariants = variants.map(v => 
      v.id === selectedVariantId 
        ? { ...v, states: [...v.states, newState] }
        : v
    );

    onVariantsChange(updatedVariants);
    setNewStateName('');
    toast.success(`⚡ "${newStateName}" interaction added!`);
  };

  const removeState = (stateId: string) => {
    if (!selectedVariant || selectedVariant.states.length <= 1) {
      toast.error('You need at least one interaction state');
      return;
    }

    const state = selectedVariant.states.find(s => s.id === stateId);
    const updatedVariants = variants.map(v => 
      v.id === selectedVariantId 
        ? { ...v, states: v.states.filter(s => s.id !== stateId) }
        : v
    );

    onVariantsChange(updatedVariants);
    
    if (selectedStateId === stateId) {
      onStateSelect(selectedVariant.states[0].id);
    }
    
    if (state) {
      toast.success(`🗑️ "${state.name}" interaction removed`);
    }
  };

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col space-y-4">
        {/* Educational Header */}
        {showTips && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <div className="p-1 bg-blue-500 rounded-lg flex-shrink-0 mt-0.5">
                <Lightbulb className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-blue-900">💡 Understanding Variations</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTips(false)}
                    className="h-4 w-4 p-0 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </Button>
                </div>
                <p className="text-xs text-blue-800 mb-2">
                  {examples.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-blue-900">🎨 Styles:</span>
                    <span className="text-blue-700 ml-1">{examples.styles.slice(0, 2).join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-medium text-blue-900">⚡ Interactions:</span>
                    <span className="text-blue-700 ml-1">{examples.interactions.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Component Styles Section */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-500 rounded-lg">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm">Component Styles</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Different visual appearances
                  </p>
                </div>
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-3 h-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Styles are different visual versions of the same component.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            {/* Add New Style */}
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Primary, Secondary..."
                value={newVariantName}
                onChange={(e) => setNewVariantName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addVariant()}
                className="h-8 text-sm"
              />
              <Button 
                onClick={addVariant}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-3"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </Button>
            </div>

            {/* Styles List */}
            <ScrollArea className="max-h-32">
              <div className="space-y-1">
                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      selectedVariantId === variant.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50 cursor-pointer'
                    }`}
                  >
                    <div 
                      className="flex-1 min-w-0"
                      onClick={() => {
                        onVariantSelect(variant.id);
                        onStateSelect(variant.states[0].id);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium truncate">{variant.name}</div>
                        <Badge variant="outline" className="text-xs">
                          {variant.states.length}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => duplicateVariant(variant.id)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Duplicate style</p>
                        </TooltipContent>
                      </Tooltip>

                      {variants.length > 1 && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeVariant(variant.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete style</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* User Interactions Section */}
        {selectedVariant && (
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-green-500 rounded-lg">
                    <MousePointer className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">User Interactions</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      How "{selectedVariant.name}" responds to users
                    </p>
                  </div>
                </div>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Interactions show how the component changes when users hover, click, etc.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Add New Interaction */}
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Hover, Focus, Loading..."
                  value={newStateName}
                  onChange={(e) => setNewStateName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addState()}
                  className="h-8 text-sm"
                />
                <Button 
                  onClick={addState}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white h-8 px-3"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>

              {/* Interactions List */}
              <ScrollArea className="max-h-32">
                <div className="space-y-1">
                  {selectedVariant.states.map((state) => (
                    <div
                      key={state.id}
                      className={`flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer ${
                        selectedStateId === state.id 
                          ? 'bg-green-50 border border-green-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div 
                        className="flex-1 min-w-0"
                        onClick={() => onStateSelect(state.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium capitalize truncate">
                            {state.name}
                          </div>
                          {state.name === 'default' && (
                            <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                              <Target className="w-2 h-2 mr-1" />
                              Base
                            </Badge>
                          )}
                        </div>
                      </div>

                      {state.name !== 'default' && selectedVariant.states.length > 1 && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeState(state.id)}
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete interaction</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        {/* Quick Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-yellow-500 rounded-lg flex-shrink-0">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-900 mb-1">💡 Pro Tips</h4>
              <ul className="text-xs text-yellow-800 space-y-0.5">
                <li>• Start with common styles: Primary, Secondary</li>
                <li>• Add interactions: Default, Hover, Focus, Disabled</li>
                <li>• Use "Default" as your base design</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
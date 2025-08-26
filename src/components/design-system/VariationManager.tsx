import React, { useState } from 'react';
import { ComponentVariant, ComponentState, ComponentType } from './types';
import { createDefaultStates } from './defaults';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Plus, Edit2, Trash2, Copy, Star, Layers, Palette } from 'lucide-react';

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
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [isAddingState, setIsAddingState] = useState(false);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  const addVariant = () => {
    if (!newVariantName.trim()) return;

    const baseVariant = variants.find(v => v.isDefault) || variants[0];
    const newVariant: ComponentVariant = {
      id: newVariantName.toLowerCase().replace(/\s+/g, '-'),
      name: newVariantName.toLowerCase().replace(/\s+/g, '-'),
      label: newVariantName,
      styles: { ...baseVariant.styles },
      states: createDefaultStates(componentType, newVariantName.toLowerCase().replace(/\s+/g, '-'))
    };

    onVariantsChange([...variants, newVariant]);
    setNewVariantName('');
    setIsAddingVariant(false);
    onVariantSelect(newVariant.id);
  };

  const duplicateVariant = (variantId: string) => {
    const variant = variants.find(v => v.id === variantId);
    if (!variant) return;

    const newVariant: ComponentVariant = {
      ...variant,
      id: `${variant.id}-copy`,
      name: `${variant.name}-copy`,
      label: `${variant.label} Copy`,
      isDefault: false
    };

    onVariantsChange([...variants, newVariant]);
    onVariantSelect(newVariant.id);
  };

  const deleteVariant = (variantId: string) => {
    if (variants.length <= 1) return;
    
    const updatedVariants = variants.filter(v => v.id !== variantId);
    onVariantsChange(updatedVariants);
    
    if (selectedVariantId === variantId) {
      onVariantSelect(updatedVariants[0].id);
    }
  };

  const setDefaultVariant = (variantId: string) => {
    const updatedVariants = variants.map(v => ({
      ...v,
      isDefault: v.id === variantId
    }));
    onVariantsChange(updatedVariants);
  };

  const addState = () => {
    if (!newStateName.trim() || !selectedVariant) return;

    const newState: ComponentState = {
      id: newStateName.toLowerCase().replace(/\s+/g, '-'),
      name: newStateName.toLowerCase().replace(/\s+/g, '-'),
      label: newStateName,
      styles: {}
    };

    const updatedVariants = variants.map(v => 
      v.id === selectedVariantId 
        ? { ...v, states: [...v.states, newState] }
        : v
    );

    onVariantsChange(updatedVariants);
    setNewStateName('');
    setIsAddingState(false);
    onStateSelect(newState.id);
  };

  const duplicateState = (stateId: string) => {
    if (!selectedVariant) return;
    
    const state = selectedVariant.states.find(s => s.id === stateId);
    if (!state) return;

    const newState: ComponentState = {
      ...state,
      id: `${state.id}-copy`,
      name: `${state.name}-copy`,
      label: `${state.label} Copy`,
      isDefault: false
    };

    const updatedVariants = variants.map(v => 
      v.id === selectedVariantId 
        ? { ...v, states: [...v.states, newState] }
        : v
    );

    onVariantsChange(updatedVariants);
    onStateSelect(newState.id);
  };

  const deleteState = (stateId: string) => {
    if (!selectedVariant || selectedVariant.states.length <= 1) return;
    
    const updatedStates = selectedVariant.states.filter(s => s.id !== stateId);
    const updatedVariants = variants.map(v => 
      v.id === selectedVariantId 
        ? { ...v, states: updatedStates }
        : v
    );

    onVariantsChange(updatedVariants);
    
    if (selectedStateId === stateId) {
      onStateSelect(updatedStates[0].id);
    }
  };

  const setDefaultState = (stateId: string) => {
    if (!selectedVariant) return;
    
    const updatedStates = selectedVariant.states.map(s => ({
      ...s,
      isDefault: s.id === stateId
    }));
    
    const updatedVariants = variants.map(v => 
      v.id === selectedVariantId 
        ? { ...v, states: updatedStates }
        : v
    );

    onVariantsChange(updatedVariants);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Layers className="w-4 h-4" />
          Variations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="variants" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="states">States</TabsTrigger>
          </TabsList>
          
          <TabsContent value="variants" className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Component Variants</Label>
              <Dialog open={isAddingVariant} onOpenChange={setIsAddingVariant}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Variant</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="variant-name">Variant Name</Label>
                      <Input
                        id="variant-name"
                        value={newVariantName}
                        onChange={(e) => setNewVariantName(e.target.value)}
                        placeholder="e.g., Secondary, Outline, Ghost"
                        onKeyDown={(e) => e.key === 'Enter' && addVariant()}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addVariant} className="flex-1">
                        Add Variant
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingVariant(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    variant.id === selectedVariantId 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => onVariantSelect(variant.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{variant.label}</span>
                      {variant.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          <Star className="w-2 h-2 mr-1" />
                          Default
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDefaultVariant(variant.id);
                        }}
                        title="Set as default"
                      >
                        <Star className={`w-3 h-3 ${variant.isDefault ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateVariant(variant.id);
                        }}
                        title="Duplicate variant"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      
                      {variants.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteVariant(variant.id);
                          }}
                          title="Delete variant"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    {variant.states.length} state{variant.states.length !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="states" className="space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">
                States for {selectedVariant?.label}
              </Label>
              <Dialog open={isAddingState} onOpenChange={setIsAddingState}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="h-6 text-xs">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New State</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="state-name">State Name</Label>
                      <Input
                        id="state-name"
                        value={newStateName}
                        onChange={(e) => setNewStateName(e.target.value)}
                        placeholder="e.g., Hover, Focus, Active, Disabled"
                        onKeyDown={(e) => e.key === 'Enter' && addState()}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addState} className="flex-1">
                        Add State
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingState(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            {selectedVariant && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedVariant.states.map((state) => (
                  <div
                    key={state.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      state.id === selectedStateId 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => onStateSelect(state.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{state.label}</span>
                        {state.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-2 h-2 mr-1" />
                            Default
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDefaultState(state.id);
                          }}
                          title="Set as default"
                        >
                          <Star className={`w-3 h-3 ${state.isDefault ? 'fill-current' : ''}`} />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateState(state.id);
                          }}
                          title="Duplicate state"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        
                        {selectedVariant.states.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteState(state.id);
                            }}
                            title="Delete state"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-1">
                      {Object.keys(state.styles).length} override{Object.keys(state.styles).length !== 1 ? 's' : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
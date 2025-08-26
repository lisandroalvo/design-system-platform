import React from 'react';
import { ComponentStyles, ComponentVariant, ComponentState, ComponentType } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Play, Eye, Code2 } from 'lucide-react';

interface ComponentPreviewProps {
  componentType: ComponentType;
  variants: ComponentVariant[];
  selectedVariantId: string;
  selectedStateId: string;
  onVariantChange: (variantId: string) => void;
  onStateChange: (stateId: string) => void;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  componentType,
  variants,
  selectedVariantId,
  selectedStateId,
  onVariantChange,
  onStateChange
}) => {
  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const selectedState = selectedVariant?.states.find(s => s.id === selectedStateId);
  
  if (!selectedVariant || !selectedState) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Select a variant and state to preview</div>
        </CardContent>
      </Card>
    );
  }

  // Merge variant styles with state styles
  const finalStyles = { ...selectedVariant.styles, ...selectedState.styles };

  const renderComponent = () => {
    const baseStyle: React.CSSProperties = {
      padding: `${finalStyles.padding.top}px ${finalStyles.padding.right}px ${finalStyles.padding.bottom}px ${finalStyles.padding.left}px`,
      margin: `${finalStyles.margin.top}px ${finalStyles.margin.right}px ${finalStyles.margin.bottom}px ${finalStyles.margin.left}px`,
      fontSize: `${finalStyles.fontSize}px`,
      fontWeight: finalStyles.fontWeight === 'light' ? 300 : 
                  finalStyles.fontWeight === 'normal' ? 400 :
                  finalStyles.fontWeight === 'medium' ? 500 :
                  finalStyles.fontWeight === 'semibold' ? 600 : 700,
      lineHeight: finalStyles.lineHeight,
      letterSpacing: `${finalStyles.letterSpacing}em`,
      textAlign: finalStyles.textAlign,
      textTransform: finalStyles.textTransform,
      backgroundColor: finalStyles.backgroundColor,
      color: finalStyles.textColor,
      border: finalStyles.borderWidth > 0 ? `${finalStyles.borderWidth}px ${finalStyles.borderStyle} ${finalStyles.borderColor}` : 'none',
      borderRadius: `${finalStyles.borderRadius.topLeft}px ${finalStyles.borderRadius.topRight}px ${finalStyles.borderRadius.bottomRight}px ${finalStyles.borderRadius.bottomLeft}px`,
      boxShadow: finalStyles.boxShadow,
      opacity: finalStyles.opacity,
      transition: finalStyles.transition,
      transform: finalStyles.transform || 'none',
      width: typeof finalStyles.width === 'number' ? `${finalStyles.width}px` : finalStyles.width,
      height: typeof finalStyles.height === 'number' ? `${finalStyles.height}px` : finalStyles.height,
      minWidth: finalStyles.minWidth ? `${finalStyles.minWidth}px` : undefined,
      maxWidth: finalStyles.maxWidth ? `${finalStyles.maxWidth}px` : undefined,
      minHeight: finalStyles.minHeight ? `${finalStyles.minHeight}px` : undefined,
      maxHeight: finalStyles.maxHeight ? `${finalStyles.maxHeight}px` : undefined,
    };

    const getComponentContent = () => {
      switch (componentType) {
        case 'button':
          return (
            <div style={baseStyle} className="inline-flex items-center justify-center cursor-pointer select-none">
              {finalStyles.iconPosition === 'left' && (
                <Play className={`w-${Math.floor((finalStyles.iconSize || 16) / 4)} h-${Math.floor((finalStyles.iconSize || 16) / 4)}`} style={{ marginRight: `${finalStyles.iconSpacing || 8}px` }} />
              )}
              Button
              {finalStyles.iconPosition === 'right' && (
                <Play className={`w-${Math.floor((finalStyles.iconSize || 16) / 4)} h-${Math.floor((finalStyles.iconSize || 16) / 4)}`} style={{ marginLeft: `${finalStyles.iconSpacing || 8}px` }} />
              )}
            </div>
          );
        
        case 'chip':
          return (
            <div style={baseStyle} className="inline-flex items-center cursor-pointer select-none">
              {finalStyles.iconPosition === 'left' && (
                <div 
                  className="rounded-full bg-current opacity-60"
                  style={{ 
                    width: `${(finalStyles.iconSize || 16) * 0.75}px`, 
                    height: `${(finalStyles.iconSize || 16) * 0.75}px`,
                    marginRight: `${finalStyles.iconSpacing || 8}px`
                  }} 
                />
              )}
              Chip
              {finalStyles.iconPosition === 'right' && (
                <div 
                  className="rounded-full bg-current opacity-60"
                  style={{ 
                    width: `${(finalStyles.iconSize || 16) * 0.75}px`, 
                    height: `${(finalStyles.iconSize || 16) * 0.75}px`,
                    marginLeft: `${finalStyles.iconSpacing || 8}px`
                  }} 
                />
              )}
            </div>
          );
        
        case 'card':
          return (
            <div style={baseStyle} className="block">
              <div className="space-y-2">
                <div className="h-4 bg-current opacity-80 rounded" style={{ width: '60%' }}></div>
                <div className="h-3 bg-current opacity-60 rounded" style={{ width: '80%' }}></div>
                <div className="h-3 bg-current opacity-60 rounded" style={{ width: '70%' }}></div>
              </div>
            </div>
          );
        
        case 'input':
          return (
            <div style={baseStyle} className="block w-full">
              <span className="opacity-60">Placeholder text...</span>
            </div>
          );
        
        case 'textarea':
          return (
            <div style={{...baseStyle, minHeight: '80px'}} className="block w-full">
              <span className="opacity-60">Enter your message...</span>
            </div>
          );
        
        case 'badge':
          return (
            <div style={baseStyle} className="inline-flex items-center">
              Badge
            </div>
          );
        
        case 'toggle':
          return (
            <div style={baseStyle} className="inline-flex items-center justify-center cursor-pointer select-none">
              Toggle
            </div>
          );
        
        default:
          return (
            <div style={baseStyle} className="inline-flex items-center justify-center">
              Component
            </div>
          );
      }
    };

    return getComponentContent();
  };

  const generateCSS = () => {
    const css = `
.${componentType}-${selectedVariant.name}-${selectedState.name} {
  padding: ${finalStyles.padding.top}px ${finalStyles.padding.right}px ${finalStyles.padding.bottom}px ${finalStyles.padding.left}px;
  margin: ${finalStyles.margin.top}px ${finalStyles.margin.right}px ${finalStyles.margin.bottom}px ${finalStyles.margin.left}px;
  font-size: ${finalStyles.fontSize}px;
  font-weight: ${finalStyles.fontWeight === 'light' ? 300 : 
                 finalStyles.fontWeight === 'normal' ? 400 :
                 finalStyles.fontWeight === 'medium' ? 500 :
                 finalStyles.fontWeight === 'semibold' ? 600 : 700};
  line-height: ${finalStyles.lineHeight};
  letter-spacing: ${finalStyles.letterSpacing}em;
  text-align: ${finalStyles.textAlign};
  text-transform: ${finalStyles.textTransform};
  background-color: ${finalStyles.backgroundColor};
  color: ${finalStyles.textColor};
  ${finalStyles.borderWidth > 0 ? `border: ${finalStyles.borderWidth}px ${finalStyles.borderStyle} ${finalStyles.borderColor};` : 'border: none;'}
  border-radius: ${finalStyles.borderRadius.topLeft}px ${finalStyles.borderRadius.topRight}px ${finalStyles.borderRadius.bottomRight}px ${finalStyles.borderRadius.bottomLeft}px;
  box-shadow: ${finalStyles.boxShadow};
  opacity: ${finalStyles.opacity};
  transition: ${finalStyles.transition};
  ${finalStyles.transform && finalStyles.transform !== 'none' ? `transform: ${finalStyles.transform};` : ''}
  ${typeof finalStyles.width === 'number' ? `width: ${finalStyles.width}px;` : finalStyles.width ? `width: ${finalStyles.width};` : ''}
  ${typeof finalStyles.height === 'number' ? `height: ${finalStyles.height}px;` : finalStyles.height && finalStyles.height !== 'auto' ? `height: ${finalStyles.height};` : ''}
}`.trim();
    
    return css;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Preview</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {selectedVariant.label}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {selectedState.label}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <Tabs defaultValue="preview" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview" className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              CSS
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="flex-1 mt-4">
            <div className="border rounded-lg p-8 bg-background flex items-center justify-center min-h-[200px]">
              <div className="flex flex-wrap gap-4 items-center justify-center">
                {renderComponent()}
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Variants</label>
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={variant.id === selectedVariantId ? "default" : "outline"}
                      size="sm"
                      onClick={() => onVariantChange(variant.id)}
                      className="text-xs h-7"
                    >
                      {variant.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {selectedVariant && (
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">States</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedVariant.states.map((state) => (
                      <Button
                        key={state.id}
                        variant={state.id === selectedStateId ? "default" : "outline"}
                        size="sm"
                        onClick={() => onStateChange(state.id)}
                        className="text-xs h-7"
                      >
                        {state.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="flex-1 mt-4">
            <div className="border rounded-lg p-4 bg-muted/50 h-full">
              <pre className="text-xs overflow-auto h-full">
                <code>{generateCSS()}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
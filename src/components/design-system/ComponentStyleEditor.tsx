import React from 'react';
import { ComponentStyles } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Palette, Move, Type, Layers, Sparkles } from 'lucide-react';

interface ComponentStyleEditorProps {
  styles: ComponentStyles;
  onChange: (styles: ComponentStyles) => void;
}

export const ComponentStyleEditor: React.FC<ComponentStyleEditorProps> = ({
  styles,
  onChange
}) => {
  const updateStyle = (key: keyof ComponentStyles, value: any) => {
    onChange({ ...styles, [key]: value });
  };

  const updateSpacing = (type: 'padding' | 'margin', side: 'top' | 'right' | 'bottom' | 'left', value: number) => {
    updateStyle(type, { ...styles[type], [side]: value });
  };

  const updateBorderRadius = (corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight', value: number) => {
    updateStyle('borderRadius', { ...styles.borderRadius, [corner]: value });
  };

  const ColorPicker: React.FC<{ label: string; value: string; onChange: (value: string) => void }> = ({ label, value, onChange }) => (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      <div className="flex gap-2">
        <div 
          className="w-8 h-8 rounded border cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'color';
            input.value = value;
            input.onchange = (e) => onChange((e.target as HTMLInputElement).value);
            input.click();
          }}
        />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-xs"
        />
      </div>
    </div>
  );

  const SpacingControl: React.FC<{ 
    label: string; 
    type: 'padding' | 'margin';
    values: { top: number; right: number; bottom: number; left: number };
  }> = ({ label, type, values }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs text-muted-foreground">Top</Label>
          <Input
            type="number"
            value={values.top}
            onChange={(e) => updateSpacing(type, 'top', Number(e.target.value))}
            className="h-8"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Right</Label>
          <Input
            type="number"
            value={values.right}
            onChange={(e) => updateSpacing(type, 'right', Number(e.target.value))}
            className="h-8"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Bottom</Label>
          <Input
            type="number"
            value={values.bottom}
            onChange={(e) => updateSpacing(type, 'bottom', Number(e.target.value))}
            className="h-8"
          />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Left</Label>
          <Input
            type="number"
            value={values.left}
            onChange={(e) => updateSpacing(type, 'left', Number(e.target.value))}
            className="h-8"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto">
      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="layout" className="flex items-center gap-1">
            <Move className="w-3 h-3" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-1">
            <Type className="w-3 h-3" />
            Type
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-1">
            <Palette className="w-3 h-3" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="effects" className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Effects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="layout" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Spacing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SpacingControl
                label="Padding"
                type="padding"
                values={styles.padding}
              />
              <Separator />
              <SpacingControl
                label="Margin"
                type="margin"
                values={styles.margin}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Dimensions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Width</Label>
                  <Select 
                    value={String(styles.width)} 
                    onValueChange={(value) => updateStyle('width', value === 'auto' || value === '100%' ? value : Number(value))}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="100%">100%</SelectItem>
                      <SelectItem value="200">200px</SelectItem>
                      <SelectItem value="300">300px</SelectItem>
                      <SelectItem value="400">400px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Height</Label>
                  <Select 
                    value={String(styles.height)} 
                    onValueChange={(value) => updateStyle('height', value === 'auto' ? value : Number(value))}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="32">32px</SelectItem>
                      <SelectItem value="40">40px</SelectItem>
                      <SelectItem value="48">48px</SelectItem>
                      <SelectItem value="56">56px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Border Radius</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Top Left</Label>
                  <Input
                    type="number"
                    value={styles.borderRadius.topLeft}
                    onChange={(e) => updateBorderRadius('topLeft', Number(e.target.value))}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Top Right</Label>
                  <Input
                    type="number"
                    value={styles.borderRadius.topRight}
                    onChange={(e) => updateBorderRadius('topRight', Number(e.target.value))}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Bottom Left</Label>
                  <Input
                    type="number"
                    value={styles.borderRadius.bottomLeft}
                    onChange={(e) => updateBorderRadius('bottomLeft', Number(e.target.value))}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Bottom Right</Label>
                  <Input
                    type="number"
                    value={styles.borderRadius.bottomRight}
                    onChange={(e) => updateBorderRadius('bottomRight', Number(e.target.value))}
                    className="h-8"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Typography</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Font Size</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[styles.fontSize]}
                      onValueChange={([value]) => updateStyle('fontSize', value)}
                      min={8}
                      max={72}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-center text-muted-foreground">{styles.fontSize}px</div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Font Weight</Label>
                  <Select 
                    value={styles.fontWeight} 
                    onValueChange={(value: any) => updateStyle('fontWeight', value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="semibold">Semibold</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Line Height</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[styles.lineHeight]}
                      onValueChange={([value]) => updateStyle('lineHeight', value)}
                      min={1}
                      max={3}
                      step={0.125}
                      className="w-full"
                    />
                    <div className="text-xs text-center text-muted-foreground">{styles.lineHeight}</div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Letter Spacing</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[styles.letterSpacing]}
                      onValueChange={([value]) => updateStyle('letterSpacing', value)}
                      min={-0.1}
                      max={0.2}
                      step={0.025}
                      className="w-full"
                    />
                    <div className="text-xs text-center text-muted-foreground">{styles.letterSpacing}em</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Text Align</Label>
                  <Select 
                    value={styles.textAlign} 
                    onValueChange={(value: any) => updateStyle('textAlign', value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Text Transform</Label>
                  <Select 
                    value={styles.textTransform} 
                    onValueChange={(value: any) => updateStyle('textTransform', value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="uppercase">Uppercase</SelectItem>
                      <SelectItem value="lowercase">Lowercase</SelectItem>
                      <SelectItem value="capitalize">Capitalize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ColorPicker
                label="Background Color"
                value={styles.backgroundColor}
                onChange={(value) => updateStyle('backgroundColor', value)}
              />
              <ColorPicker
                label="Text Color"
                value={styles.textColor}
                onChange={(value) => updateStyle('textColor', value)}
              />
              <ColorPicker
                label="Border Color"
                value={styles.borderColor}
                onChange={(value) => updateStyle('borderColor', value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Border</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Border Width</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[styles.borderWidth]}
                      onValueChange={([value]) => updateStyle('borderWidth', value)}
                      min={0}
                      max={8}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-center text-muted-foreground">{styles.borderWidth}px</div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Border Style</Label>
                  <Select 
                    value={styles.borderStyle} 
                    onValueChange={(value: any) => updateStyle('borderStyle', value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solid">Solid</SelectItem>
                      <SelectItem value="dashed">Dashed</SelectItem>
                      <SelectItem value="dotted">Dotted</SelectItem>
                      <SelectItem value="double">Double</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="effects" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Effects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Opacity</Label>
                <div className="space-y-2">
                  <Slider
                    value={[styles.opacity]}
                    onValueChange={([value]) => updateStyle('opacity', value)}
                    min={0}
                    max={1}
                    step={0.05}
                    className="w-full"
                  />
                  <div className="text-xs text-center text-muted-foreground">{Math.round(styles.opacity * 100)}%</div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Box Shadow</Label>
                <Select 
                  value={styles.boxShadow} 
                  onValueChange={(value) => updateStyle('boxShadow', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="0 1px 2px 0 rgb(0 0 0 / 0.05)">Small</SelectItem>
                    <SelectItem value="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)">Medium</SelectItem>
                    <SelectItem value="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)">Large</SelectItem>
                    <SelectItem value="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Transition</Label>
                <Select 
                  value={styles.transition} 
                  onValueChange={(value) => updateStyle('transition', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="all 0.15s ease">Fast</SelectItem>
                    <SelectItem value="all 0.2s ease">Normal</SelectItem>
                    <SelectItem value="all 0.3s ease">Slow</SelectItem>
                    <SelectItem value="all 0.5s ease">Very Slow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {(styles.iconPosition && styles.iconPosition !== 'none') && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Icon Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Icon Size</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[styles.iconSize || 16]}
                        onValueChange={([value]) => updateStyle('iconSize', value)}
                        min={8}
                        max={32}
                        step={2}
                        className="w-full"
                      />
                      <div className="text-xs text-center text-muted-foreground">{styles.iconSize || 16}px</div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Icon Spacing</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[styles.iconSpacing || 8]}
                        onValueChange={([value]) => updateStyle('iconSpacing', value)}
                        min={0}
                        max={24}
                        step={2}
                        className="w-full"
                      />
                      <div className="text-xs text-center text-muted-foreground">{styles.iconSpacing || 8}px</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Icon Position</Label>
                  <Select 
                    value={styles.iconPosition || 'left'} 
                    onValueChange={(value: any) => updateStyle('iconPosition', value)}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
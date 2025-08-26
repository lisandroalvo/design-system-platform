import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import {
  Plus,
  Code,
  Eye,
  Settings,
  Palette,
  Type,
  Box,
  Move,
  RotateCcw,
  Save,
  Play,
  Layers,
  MousePointer,
  Grid,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Trash2,
  Edit,
  ChevronDown,
  ChevronRight,
  MousePointer2,
  Square,
  Circle,
  Image,
  FileText,
  Zap,
} from "lucide-react";

interface ComponentElement {
  id: string;
  type: string;
  label: string;
  props: Record<string, any>;
  children?: ComponentElement[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export function ComponentBuilder() {
  const [componentName, setComponentName] = useState("New Component");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [canvasElements, setCanvasElements] = useState<ComponentElement[]>([]);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const elementLibrary = [
    {
      category: "Basic",
      elements: [
        { id: "button", label: "Button", icon: MousePointer2, color: "bg-blue-500" },
        { id: "input", label: "Input", icon: Type, color: "bg-green-500" },
        { id: "textarea", label: "Textarea", icon: FileText, color: "bg-purple-500" },
        { id: "label", label: "Label", icon: Type, color: "bg-orange-500" },
      ]
    },
    {
      category: "Layout",
      elements: [
        { id: "container", label: "Container", icon: Square, color: "bg-gray-500" },
        { id: "card", label: "Card", icon: Box, color: "bg-indigo-500" },
        { id: "flex", label: "Flex Container", icon: Grid, color: "bg-teal-500" },
        { id: "grid", label: "Grid", icon: Grid, color: "bg-cyan-500" },
      ]
    },
    {
      category: "Media",
      elements: [
        { id: "image", label: "Image", icon: Image, color: "bg-pink-500" },
        { id: "icon", label: "Icon", icon: Circle, color: "bg-yellow-500" },
      ]
    },
    {
      category: "Advanced",
      elements: [
        { id: "modal", label: "Modal", icon: Layers, color: "bg-red-500" },
        { id: "dropdown", label: "Dropdown", icon: ChevronDown, color: "bg-violet-500" },
        { id: "tooltip", label: "Tooltip", icon: MousePointer, color: "bg-emerald-500" },
      ]
    }
  ];

  const defaultProps = {
    button: {
      text: "Click me",
      variant: "primary",
      size: "medium",
      disabled: false,
      fullWidth: false,
      borderRadius: 8,
      padding: { x: 16, y: 8 },
    },
    input: {
      placeholder: "Enter text...",
      type: "text",
      disabled: false,
      required: false,
      borderRadius: 8,
      padding: { x: 12, y: 8 },
    },
    textarea: {
      placeholder: "Enter text...",
      rows: 3,
      disabled: false,
      required: false,
      borderRadius: 8,
      padding: { x: 12, y: 8 },
    },
    label: {
      text: "Label",
      required: false,
      size: "medium",
    },
    container: {
      padding: { x: 16, y: 16 },
      margin: { x: 0, y: 0 },
      backgroundColor: "transparent",
      borderRadius: 0,
      border: false,
    },
    card: {
      padding: { x: 24, y: 24 },
      shadow: "medium",
      borderRadius: 12,
      backgroundColor: "white",
    },
    image: {
      src: "https://via.placeholder.com/200x150",
      alt: "Placeholder image",
      width: 200,
      height: 150,
      borderRadius: 8,
    },
  };

  const handleDragStart = (elementType: string) => {
    setDraggedElement(elementType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newElement: ComponentElement = {
      id: `${draggedElement}_${Date.now()}`,
      type: draggedElement,
      label: draggedElement.charAt(0).toUpperCase() + draggedElement.slice(1),
      props: defaultProps[draggedElement as keyof typeof defaultProps] || {},
      x,
      y,
      width: draggedElement === 'button' ? 120 : 200,
      height: draggedElement === 'button' ? 40 : draggedElement === 'input' ? 40 : 80,
    };

    setCanvasElements(prev => [...prev, newElement]);
    setDraggedElement(null);
  };

  const handleElementClick = (elementId: string) => {
    setSelectedElement(elementId);
  };

  const updateElementProps = (elementId: string, newProps: Record<string, any>) => {
    setCanvasElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, props: { ...el.props, ...newProps } } : el
      )
    );
  };

  const deleteElement = (elementId: string) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
  };

  const duplicateElement = (elementId: string) => {
    const element = canvasElements.find(el => el.id === elementId);
    if (!element) return;

    const newElement: ComponentElement = {
      ...element,
      id: `${element.type}_${Date.now()}`,
      x: (element.x || 0) + 20,
      y: (element.y || 0) + 20,
    };

    setCanvasElements(prev => [...prev, newElement]);
  };

  const renderCanvasElement = (element: ComponentElement) => {
    const isSelected = selectedElement === element.id;
    
    let renderedElement;
    
    switch (element.type) {
      case 'button':
        renderedElement = (
          <button
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${element.props.variant === 'primary' ? 'bg-primary text-primary-foreground' : ''}
              ${element.props.variant === 'secondary' ? 'bg-secondary text-secondary-foreground' : ''}
              ${element.props.variant === 'outline' ? 'border-2 border-primary text-primary bg-transparent' : ''}
              ${element.props.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
              ${element.props.fullWidth ? 'w-full' : ''}
            `}
            style={{
              borderRadius: `${element.props.borderRadius}px`,
              padding: `${element.props.padding?.y || 8}px ${element.props.padding?.x || 16}px`,
            }}
            disabled={element.props.disabled}
          >
            {element.props.text}
          </button>
        );
        break;
      
      case 'input':
        renderedElement = (
          <input
            type={element.props.type}
            placeholder={element.props.placeholder}
            disabled={element.props.disabled}
            required={element.props.required}
            className="border border-border rounded-lg bg-input-background px-3 py-2 text-sm"
            style={{
              borderRadius: `${element.props.borderRadius}px`,
              padding: `${element.props.padding?.y || 8}px ${element.props.padding?.x || 12}px`,
            }}
          />
        );
        break;

      case 'textarea':
        renderedElement = (
          <textarea
            placeholder={element.props.placeholder}
            rows={element.props.rows}
            disabled={element.props.disabled}
            required={element.props.required}
            className="border border-border rounded-lg bg-input-background px-3 py-2 text-sm resize-none"
            style={{
              borderRadius: `${element.props.borderRadius}px`,
              padding: `${element.props.padding?.y || 8}px ${element.props.padding?.x || 12}px`,
            }}
          />
        );
        break;

      case 'label':
        renderedElement = (
          <label className={`
            font-medium 
            ${element.props.size === 'small' ? 'text-sm' : ''}
            ${element.props.size === 'large' ? 'text-lg' : ''}
          `}>
            {element.props.text}
            {element.props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        );
        break;

      case 'card':
        renderedElement = (
          <div
            className={`
              bg-card border border-border rounded-lg
              ${element.props.shadow === 'small' ? 'shadow-sm' : ''}
              ${element.props.shadow === 'medium' ? 'shadow-md' : ''}
              ${element.props.shadow === 'large' ? 'shadow-lg' : ''}
            `}
            style={{
              padding: `${element.props.padding?.y || 24}px ${element.props.padding?.x || 24}px`,
              borderRadius: `${element.props.borderRadius}px`,
              backgroundColor: element.props.backgroundColor,
            }}
          >
            <div className="text-sm text-muted-foreground">Card Content</div>
          </div>
        );
        break;

      case 'container':
        renderedElement = (
          <div
            className={`
              ${element.props.border ? 'border border-dashed border-muted-foreground' : ''}
            `}
            style={{
              padding: `${element.props.padding?.y || 16}px ${element.props.padding?.x || 16}px`,
              margin: `${element.props.margin?.y || 0}px ${element.props.margin?.x || 0}px`,
              borderRadius: `${element.props.borderRadius}px`,
              backgroundColor: element.props.backgroundColor,
              minHeight: '60px',
            }}
          >
            <div className="text-xs text-muted-foreground opacity-50">Container</div>
          </div>
        );
        break;

      case 'image':
        renderedElement = (
          <img
            src={element.props.src}
            alt={element.props.alt}
            className="object-cover"
            style={{
              width: `${element.props.width}px`,
              height: `${element.props.height}px`,
              borderRadius: `${element.props.borderRadius}px`,
            }}
          />
        );
        break;

      default:
        renderedElement = (
          <div className="p-4 bg-muted border border-dashed border-muted-foreground rounded-lg">
            <span className="text-sm text-muted-foreground">{element.type}</span>
          </div>
        );
    }

    return (
      <div
        key={element.id}
        className={`
          absolute cursor-pointer group
          ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
        `}
        style={{
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleElementClick(element.id);
        }}
      >
        {renderedElement}
        
        {/* Element controls */}
        <div className="absolute -top-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 bg-background border border-border rounded-md p-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                duplicateElement(element.id);
              }}
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(element.id);
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const selectedElementData = canvasElements.find(el => el.id === selectedElement);

  const PropertyPanel = () => {
    if (!selectedElementData) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Select an element to edit its properties
            </p>
          </CardContent>
        </Card>
      );
    }

    const renderPropertyControls = () => {
      switch (selectedElementData.type) {
        case 'button':
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text</Label>
                <Input
                  value={selectedElementData.props.text || ''}
                  onChange={(e) => updateElementProps(selectedElementData.id, { text: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Variant</Label>
                <Select
                  value={selectedElementData.props.variant}
                  onValueChange={(value) => updateElementProps(selectedElementData.id, { variant: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={selectedElementData.props.size}
                  onValueChange={(value) => updateElementProps(selectedElementData.id, { size: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between">
                  Border Radius
                  <span className="text-sm text-muted-foreground">{selectedElementData.props.borderRadius}px</span>
                </Label>
                <Slider
                  value={[selectedElementData.props.borderRadius]}
                  onValueChange={([value]) => updateElementProps(selectedElementData.id, { borderRadius: value })}
                  min={0}
                  max={24}
                  step={1}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Disabled</Label>
                  <Switch
                    checked={selectedElementData.props.disabled}
                    onCheckedChange={(checked) => updateElementProps(selectedElementData.id, { disabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Full Width</Label>
                  <Switch
                    checked={selectedElementData.props.fullWidth}
                    onCheckedChange={(checked) => updateElementProps(selectedElementData.id, { fullWidth: checked })}
                  />
                </div>
              </div>
            </div>
          );

        case 'input':
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Placeholder</Label>
                <Input
                  value={selectedElementData.props.placeholder || ''}
                  onChange={(e) => updateElementProps(selectedElementData.id, { placeholder: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={selectedElementData.props.type}
                  onValueChange={(value) => updateElementProps(selectedElementData.id, { type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="tel">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between">
                  Border Radius
                  <span className="text-sm text-muted-foreground">{selectedElementData.props.borderRadius}px</span>
                </Label>
                <Slider
                  value={[selectedElementData.props.borderRadius]}
                  onValueChange={([value]) => updateElementProps(selectedElementData.id, { borderRadius: value })}
                  min={0}
                  max={24}
                  step={1}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Required</Label>
                  <Switch
                    checked={selectedElementData.props.required}
                    onCheckedChange={(checked) => updateElementProps(selectedElementData.id, { required: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Disabled</Label>
                  <Switch
                    checked={selectedElementData.props.disabled}
                    onCheckedChange={(checked) => updateElementProps(selectedElementData.id, { disabled: checked })}
                  />
                </div>
              </div>
            </div>
          );

        case 'label':
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text</Label>
                <Input
                  value={selectedElementData.props.text || ''}
                  onChange={(e) => updateElementProps(selectedElementData.id, { text: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Size</Label>
                <Select
                  value={selectedElementData.props.size}
                  onValueChange={(value) => updateElementProps(selectedElementData.id, { size: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label>Required Indicator</Label>
                <Switch
                  checked={selectedElementData.props.required}
                  onCheckedChange={(checked) => updateElementProps(selectedElementData.id, { required: checked })}
                />
              </div>
            </div>
          );

        case 'card':
          return (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Shadow</Label>
                <Select
                  value={selectedElementData.props.shadow}
                  onValueChange={(value) => updateElementProps(selectedElementData.id, { shadow: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between">
                  Border Radius
                  <span className="text-sm text-muted-foreground">{selectedElementData.props.borderRadius}px</span>
                </Label>
                <Slider
                  value={[selectedElementData.props.borderRadius]}
                  onValueChange={([value]) => updateElementProps(selectedElementData.id, { borderRadius: value })}
                  min={0}
                  max={24}
                  step={1}
                />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between">
                  Padding X
                  <span className="text-sm text-muted-foreground">{selectedElementData.props.padding?.x}px</span>
                </Label>
                <Slider
                  value={[selectedElementData.props.padding?.x || 24]}
                  onValueChange={([value]) => updateElementProps(selectedElementData.id, { 
                    padding: { ...selectedElementData.props.padding, x: value }
                  })}
                  min={0}
                  max={48}
                  step={2}
                />
              </div>

              <div className="space-y-3">
                <Label className="flex justify-between">
                  Padding Y
                  <span className="text-sm text-muted-foreground">{selectedElementData.props.padding?.y}px</span>
                </Label>
                <Slider
                  value={[selectedElementData.props.padding?.y || 24]}
                  onValueChange={([value]) => updateElementProps(selectedElementData.id, { 
                    padding: { ...selectedElementData.props.padding, y: value }
                  })}
                  min={0}
                  max={48}
                  step={2}
                />
              </div>
            </div>
          );

        default:
          return (
            <div className="text-sm text-muted-foreground">
              No properties available for this element type.
            </div>
          );
      }
    };

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {selectedElementData.label} Properties
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderPropertyControls()}
        </CardContent>
      </Card>
    );
  };

  const generateCode = () => {
    if (canvasElements.length === 0) return "// Add elements to generate code";

    const generateElementCode = (element: ComponentElement): string => {
      switch (element.type) {
        case 'button':
          return `<Button
  variant="${element.props.variant}"
  size="${element.props.size}"
  ${element.props.disabled ? 'disabled' : ''}
  ${element.props.fullWidth ? 'className="w-full"' : ''}
  style={{ borderRadius: '${element.props.borderRadius}px' }}
>
  ${element.props.text}
</Button>`;

        case 'input':
          return `<Input
  type="${element.props.type}"
  placeholder="${element.props.placeholder}"
  ${element.props.required ? 'required' : ''}
  ${element.props.disabled ? 'disabled' : ''}
  style={{ borderRadius: '${element.props.borderRadius}px' }}
/>`;

        case 'label':
          return `<Label>
  ${element.props.text}${element.props.required ? ' <span className="text-red-500">*</span>' : ''}
</Label>`;

        case 'card':
          return `<Card style={{ borderRadius: '${element.props.borderRadius}px' }}>
  <CardContent style={{ padding: '${element.props.padding?.y}px ${element.props.padding?.x}px' }}>
    {/* Card content here */}
  </CardContent>
</Card>`;

        default:
          return `<div>{/* ${element.type} */}</div>`;
      }
    };

    return canvasElements.map(generateElementCode).join('\n\n');
  };

  return (
    <div className="flex h-full bg-background">
      {/* Element Library Sidebar */}
      <div className="w-64 border-r border-border bg-muted/30">
        <div className="p-4">
          <h2 className="font-semibold mb-4">Elements</h2>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {elementLibrary.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    {category.category}
                  </h3>
                  <div className="space-y-1">
                    {category.elements.map((element, elementIndex) => (
                      <div
                        key={elementIndex}
                        draggable
                        onDragStart={() => handleDragStart(element.id)}
                        className="flex items-center gap-2 p-2 rounded-lg cursor-grab hover:bg-accent/50 transition-colors"
                      >
                        <div className={`${element.color} p-1.5 rounded-md`}>
                          <element.icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm">{element.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <Input
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={previewMode === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === "tablet" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={previewMode === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex">
          <div className="flex-1 p-6 overflow-auto">
            <div className={`
              mx-auto bg-background border border-dashed border-muted-foreground rounded-lg relative transition-all duration-300
              ${previewMode === "mobile" ? "w-80 h-[600px]" : ""}
              ${previewMode === "tablet" ? "w-[768px] h-[600px]" : ""}
              ${previewMode === "desktop" ? "w-full h-[600px]" : ""}
            `}>
              <div
                ref={canvasRef}
                className="w-full h-full relative"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => setSelectedElement(null)}
              >
                {canvasElements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Box className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Drag elements from the sidebar to start building
                      </p>
                    </div>
                  </div>
                )}
                {canvasElements.map(renderCanvasElement)}
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-80 border-l border-border bg-muted/30 p-4">
            <div className="space-y-6">
              <PropertyPanel />

              {/* Code Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Generated Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-64">
                    <pre className="text-xs font-mono bg-muted p-3 rounded-lg overflow-x-auto">
                      {generateCode()}
                    </pre>
                  </ScrollArea>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
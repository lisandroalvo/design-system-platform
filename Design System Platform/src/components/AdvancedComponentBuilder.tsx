import { useState, useRef, useCallback } from "react";
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
  History,
  Undo,
  Redo,
  Lock,
  Unlock,
  EyeOff,
  Download,
  Upload,
  Maximize,
  Minimize,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

interface ComponentElement {
  id: string;
  type: string;
  label: string;
  props: Record<string, any>;
  style: Record<string, any>;
  children?: ComponentElement[];
  x: number;
  y: number;
  width: number;
  height: number;
  locked?: boolean;
  visible?: boolean;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
}

interface HistoryState {
  elements: ComponentElement[];
  timestamp: number;
}

export function AdvancedComponentBuilder() {
  const [componentName, setComponentName] = useState("Advanced Component");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [canvasElements, setCanvasElements] = useState<ComponentElement[]>([]);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const elementLibrary = [
    {
      category: "Basic",
      elements: [
        { id: "button", label: "Button", icon: MousePointer2, color: "bg-blue-500" },
        { id: "input", label: "Input", icon: Type, color: "bg-green-500" },
        { id: "textarea", label: "Textarea", icon: FileText, color: "bg-purple-500" },
        { id: "label", label: "Label", icon: Type, color: "bg-orange-500" },
        { id: "checkbox", label: "Checkbox", icon: Square, color: "bg-teal-500" },
        { id: "radio", label: "Radio", icon: Circle, color: "bg-pink-500" },
      ]
    },
    {
      category: "Layout",
      elements: [
        { id: "container", label: "Container", icon: Square, color: "bg-gray-500" },
        { id: "card", label: "Card", icon: Box, color: "bg-indigo-500" },
        { id: "flex", label: "Flex Container", icon: Grid, color: "bg-teal-500" },
        { id: "grid", label: "Grid", icon: Grid, color: "bg-cyan-500" },
        { id: "divider", label: "Divider", icon: Minimize, color: "bg-slate-500" },
      ]
    },
    {
      category: "Media",
      elements: [
        { id: "image", label: "Image", icon: Image, color: "bg-pink-500" },
        { id: "icon", label: "Icon", icon: Circle, color: "bg-yellow-500" },
        { id: "avatar", label: "Avatar", icon: Circle, color: "bg-rose-500" },
      ]
    },
    {
      category: "Advanced",
      elements: [
        { id: "modal", label: "Modal", icon: Layers, color: "bg-red-500" },
        { id: "dropdown", label: "Dropdown", icon: ChevronDown, color: "bg-violet-500" },
        { id: "tooltip", label: "Tooltip", icon: MousePointer, color: "bg-emerald-500" },
        { id: "tabs", label: "Tabs", icon: Layers, color: "bg-blue-600" },
        { id: "accordion", label: "Accordion", icon: ChevronRight, color: "bg-purple-600" },
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
    },
    input: {
      placeholder: "Enter text...",
      type: "text",
      disabled: false,
      required: false,
    },
    textarea: {
      placeholder: "Enter text...",
      rows: 3,
      disabled: false,
      required: false,
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
      border: false,
    },
    card: {
      padding: { x: 24, y: 24 },
      shadow: "medium",
      backgroundColor: "white",
    },
    image: {
      src: "https://via.placeholder.com/200x150",
      alt: "Placeholder image",
      objectFit: "cover",
    },
  };

  const defaultStyle = {
    borderRadius: 8,
    opacity: 1,
    zIndex: 1,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "#000000",
    borderStyle: "solid",
  };

  // History management
  const saveToHistory = useCallback(() => {
    const newState: HistoryState = {
      elements: JSON.parse(JSON.stringify(canvasElements)),
      timestamp: Date.now(),
    };
    
    const newHistory = [...history.slice(0, historyIndex + 1), newState];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [canvasElements, history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasElements(history[historyIndex - 1].elements);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasElements(history[historyIndex + 1].elements);
    }
  };

  const snapToGridValue = (value: number, gridSize: number = 10) => {
    return snapToGrid ? Math.round(value / gridSize) * gridSize : value;
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
    const x = snapToGridValue(e.clientX - rect.left);
    const y = snapToGridValue(e.clientY - rect.top);

    const newElement: ComponentElement = {
      id: `${draggedElement}_${Date.now()}`,
      type: draggedElement,
      label: draggedElement.charAt(0).toUpperCase() + draggedElement.slice(1),
      props: defaultProps[draggedElement as keyof typeof defaultProps] || {},
      style: { ...defaultStyle },
      x,
      y,
      width: draggedElement === 'button' ? 120 : 200,
      height: draggedElement === 'button' ? 40 : draggedElement === 'input' ? 40 : 80,
      visible: true,
      rotation: 0,
      opacity: 1,
      zIndex: canvasElements.length + 1,
    };

    setCanvasElements(prev => [...prev, newElement]);
    setDraggedElement(null);
    saveToHistory();
  };

  const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    const element = canvasElements.find(el => el.id === elementId);
    if (!element || element.locked) return;

    setSelectedElement(elementId);
    setIsDragging(true);
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = snapToGridValue(e.clientX - rect.left - dragOffset.x);
    const y = snapToGridValue(e.clientY - rect.top - dragOffset.y);

    updateElementPosition(selectedElement, x, y);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory();
    }
  };

  const updateElementPosition = (elementId: string, x: number, y: number) => {
    setCanvasElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, x, y } : el
      )
    );
  };

  const updateElementProps = (elementId: string, newProps: Record<string, any>) => {
    setCanvasElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, props: { ...el.props, ...newProps } } : el
      )
    );
  };

  const updateElementStyle = (elementId: string, newStyle: Record<string, any>) => {
    setCanvasElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, style: { ...el.style, ...newStyle } } : el
      )
    );
  };

  const updateElementSize = (elementId: string, width: number, height: number) => {
    setCanvasElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, width, height } : el
      )
    );
  };

  const deleteElement = (elementId: string) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
    saveToHistory();
  };

  const duplicateElement = (elementId: string) => {
    const element = canvasElements.find(el => el.id === elementId);
    if (!element) return;

    const newElement: ComponentElement = {
      ...element,
      id: `${element.type}_${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20,
      zIndex: (element.zIndex || 1) + 1,
    };

    setCanvasElements(prev => [...prev, newElement]);
    saveToHistory();
  };

  const toggleElementLock = (elementId: string) => {
    setCanvasElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, locked: !el.locked } : el
      )
    );
  };

  const toggleElementVisibility = (elementId: string) => {
    setCanvasElements(prev =>
      prev.map(el =>
        el.id === elementId ? { ...el, visible: !el.visible } : el
      )
    );
  };

  const bringToFront = (elementId: string) => {
    const maxZIndex = Math.max(...canvasElements.map(el => el.zIndex || 1));
    updateElementStyle(elementId, { zIndex: maxZIndex + 1 });
  };

  const sendToBack = (elementId: string) => {
    const minZIndex = Math.min(...canvasElements.map(el => el.zIndex || 1));
    updateElementStyle(elementId, { zIndex: Math.max(minZIndex - 1, 1) });
  };

  const renderCanvasElement = (element: ComponentElement) => {
    if (!element.visible) return null;
    
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
              ...element.style,
              borderRadius: `${element.style.borderRadius}px`,
              opacity: element.opacity,
              transform: `rotate(${element.rotation || 0}deg)`,
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
            className="border border-border rounded-lg bg-input-background px-3 py-2 text-sm w-full"
            style={{
              ...element.style,
              borderRadius: `${element.style.borderRadius}px`,
              opacity: element.opacity,
              transform: `rotate(${element.rotation || 0}deg)`,
            }}
          />
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
              ...element.style,
              padding: `${element.props.padding?.y || 24}px ${element.props.padding?.x || 24}px`,
              borderRadius: `${element.style.borderRadius}px`,
              opacity: element.opacity,
              transform: `rotate(${element.rotation || 0}deg)`,
            }}
          >
            <div className="text-sm text-muted-foreground">Card Content</div>
          </div>
        );
        break;

      default:
        renderedElement = (
          <div 
            className="p-4 bg-muted border border-dashed border-muted-foreground rounded-lg"
            style={{
              ...element.style,
              opacity: element.opacity,
              transform: `rotate(${element.rotation || 0}deg)`,
            }}
          >
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
          ${element.locked ? 'cursor-not-allowed' : ''}
        `}
        style={{
          left: element.x,
          top: element.y,
          width: element.width,
          height: element.height,
          zIndex: element.zIndex || 1,
        }}
        onMouseDown={(e) => handleElementMouseDown(e, element.id)}
      >
        {renderedElement}
        
        {/* Selection handles */}
        {isSelected && !element.locked && (
          <>
            {/* Resize handles */}
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-nw-resize" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-ne-resize" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-sw-resize" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-se-resize" />
            
            {/* Rotation handle */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 border border-white rounded-full cursor-crosshair" />
          </>
        )}
        
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
                toggleElementLock(element.id);
              }}
            >
              {element.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
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

  const LayersPanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Layers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-1">
            {canvasElements
              .sort((a, b) => (b.zIndex || 1) - (a.zIndex || 1))
              .map((element) => (
                <div
                  key={element.id}
                  className={`
                    flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors
                    ${selectedElement === element.id ? 'bg-accent' : ''}
                  `}
                  onClick={() => setSelectedElement(element.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleElementVisibility(element.id);
                        }}
                      >
                        {element.visible ? (
                          <Eye className="h-3 w-3" />
                        ) : (
                          <EyeOff className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-4 w-4 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleElementLock(element.id);
                        }}
                      >
                        {element.locked ? (
                          <Lock className="h-3 w-3" />
                        ) : (
                          <Unlock className="h-3 w-3 opacity-50" />
                        )}
                      </Button>
                    </div>
                    <span className="text-sm truncate">{element.label}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {element.type}
                  </Badge>
                </div>
              ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-full bg-background">
      {/* Element Library Sidebar */}
      <div className="w-64 border-r border-border bg-muted/30">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Elements</h2>
            <Badge variant="secondary" className="text-xs">
              {canvasElements.length}
            </Badge>
          </div>
          <ScrollArea className="h-[calc(100vh-300px)]">
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
                        className="flex items-center gap-2 p-2 rounded-lg cursor-grab hover:bg-accent/50 transition-colors active:cursor-grabbing"
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
          
          {/* Quick Tools */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Grid</Label>
                <Switch
                  checked={showGrid}
                  onCheckedChange={setShowGrid}
                  size="sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs">Snap</Label>
                <Switch
                  checked={snapToGrid}
                  onCheckedChange={setSnapToGrid}
                  size="sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Zoom: {zoom}%</Label>
                <Slider
                  value={[zoom]}
                  onValueChange={([value]) => setZoom(value)}
                  min={25}
                  max={200}
                  step={25}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-4">
            <Input
              value={componentName}
              onChange={(e) => setComponentName(e.target.value)}
              className="w-48"
            />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={undo}
                disabled={historyIndex <= 0}
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-6 overflow-auto">
            <div className={`
              mx-auto bg-background border border-dashed border-muted-foreground rounded-lg relative transition-all duration-300
              ${previewMode === "mobile" ? "w-80 h-[600px]" : ""}
              ${previewMode === "tablet" ? "w-[768px] h-[600px]" : ""}
              ${previewMode === "desktop" ? "w-full h-[600px]" : ""}
            `} style={{ transform: `scale(${zoom / 100})` }}>
              <div
                ref={canvasRef}
                className="w-full h-full relative overflow-hidden"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={() => setSelectedElement(null)}
                style={{
                  backgroundImage: showGrid 
                    ? 'radial-gradient(circle, #ccc 1px, transparent 1px)' 
                    : 'none',
                  backgroundSize: showGrid ? '20px 20px' : 'auto',
                }}
              >
                {canvasElements.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground font-medium">
                        Advanced Component Builder
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
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
          <div className="w-80 border-l border-border bg-muted/30 p-4 overflow-auto">
            <div className="space-y-6">
              <LayersPanel />
              
              {selectedElementData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      {selectedElementData.label} Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Tabs defaultValue="properties">
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="properties">Props</TabsTrigger>
                        <TabsTrigger value="style">Style</TabsTrigger>
                        <TabsTrigger value="layout">Layout</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="properties" className="space-y-4">
                        {selectedElementData.type === 'button' && (
                          <>
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
                          </>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="style" className="space-y-4">
                        <div className="space-y-3">
                          <Label className="flex justify-between">
                            Border Radius
                            <span className="text-sm text-muted-foreground">{selectedElementData.style.borderRadius}px</span>
                          </Label>
                          <Slider
                            value={[selectedElementData.style.borderRadius]}
                            onValueChange={([value]) => updateElementStyle(selectedElementData.id, { borderRadius: value })}
                            min={0}
                            max={50}
                            step={1}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label className="flex justify-between">
                            Opacity
                            <span className="text-sm text-muted-foreground">{Math.round((selectedElementData.opacity || 1) * 100)}%</span>
                          </Label>
                          <Slider
                            value={[(selectedElementData.opacity || 1) * 100]}
                            onValueChange={([value]) => {
                              setCanvasElements(prev =>
                                prev.map(el =>
                                  el.id === selectedElementData.id ? { ...el, opacity: value / 100 } : el
                                )
                              );
                            }}
                            min={0}
                            max={100}
                            step={5}
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label className="flex justify-between">
                            Rotation
                            <span className="text-sm text-muted-foreground">{selectedElementData.rotation || 0}°</span>
                          </Label>
                          <Slider
                            value={[selectedElementData.rotation || 0]}
                            onValueChange={([value]) => {
                              setCanvasElements(prev =>
                                prev.map(el =>
                                  el.id === selectedElementData.id ? { ...el, rotation: value } : el
                                )
                              );
                            }}
                            min={-180}
                            max={180}
                            step={5}
                          />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="layout" className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label>X Position</Label>
                            <Input
                              type="number"
                              value={selectedElementData.x}
                              onChange={(e) => updateElementPosition(selectedElementData.id, parseInt(e.target.value) || 0, selectedElementData.y)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Y Position</Label>
                            <Input
                              type="number"
                              value={selectedElementData.y}
                              onChange={(e) => updateElementPosition(selectedElementData.id, selectedElementData.x, parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <Label>Width</Label>
                            <Input
                              type="number"
                              value={selectedElementData.width}
                              onChange={(e) => updateElementSize(selectedElementData.id, parseInt(e.target.value) || 0, selectedElementData.height)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Height</Label>
                            <Input
                              type="number"
                              value={selectedElementData.height}
                              onChange={(e) => updateElementSize(selectedElementData.id, selectedElementData.width, parseInt(e.target.value) || 0)}
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => bringToFront(selectedElementData.id)}
                            className="flex-1"
                          >
                            <Maximize className="h-3 w-3 mr-1" />
                            Front
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => sendToBack(selectedElementData.id)}
                            className="flex-1"
                          >
                            <Minimize className="h-3 w-3 mr-1" />
                            Back
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {/* Code Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Generated Code
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <pre className="text-xs font-mono bg-muted p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                      {canvasElements.length > 0 
                        ? `// ${componentName}\n\nfunction ${componentName.replace(/\s/g, '')}() {\n  return (\n    <div className="relative">\n${canvasElements.map(el => `      <${el.type.charAt(0).toUpperCase() + el.type.slice(1)} />`).join('\n')}\n    </div>\n  );\n}`
                        : "// Add elements to generate code"
                      }
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
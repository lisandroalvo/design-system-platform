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
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Sun,
  Moon,
  Search,
  Filter,
  Smartphone,
  Tablet,
  Monitor,
  Undo,
  Redo,
  Save,
  Download,
  Upload,
  Settings,
  Eye,
  Copy,
  Trash2,
  Lock,
  Unlock,
  EyeOff,
  RotateCcw,
  Code,
  Zap,
  Grid,
  Ruler,
  MousePointer,
  Hand,
  ZoomIn,
  Layers,
  Maximize,
  Minimize,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  DistributeHorizontal,
  DistributeVertical,
} from "lucide-react";

import { elementLibrary } from "./builder/elementLibrary";
import { defaultProps, defaultStyle } from "./builder/defaultProps";
import { 
  ComponentElement, 
  HistoryState, 
  UltraComponentBuilderProps,
  Animation 
} from "./builder/types";
import { 
  snapToGridValue, 
  generateElementId, 
  createHistoryState,
  alignElements,
  distributeElements,
  generateComponentCode 
} from "./builder/utils";

export function UltraComponentBuilder({ isDark, onThemeToggle }: UltraComponentBuilderProps) {
  const [componentName, setComponentName] = useState("Ultra Component");
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
  const [gridSize, setGridSize] = useState(20);
  const [showRulers, setShowRulers] = useState(true);
  const [tool, setTool] = useState<'select' | 'pan' | 'zoom'>('select');
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [customCSS, setCustomCSS] = useState("");
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // History management
  const saveToHistory = useCallback((description: string = "Change") => {
    const newState = createHistoryState(canvasElements, description);
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

  // Element management
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
    const x = snapToGridValue(e.clientX - rect.left, gridSize, snapToGrid);
    const y = snapToGridValue(e.clientY - rect.top, gridSize, snapToGrid);

    const newElement: ComponentElement = {
      id: generateElementId(draggedElement),
      type: draggedElement,
      label: draggedElement.charAt(0).toUpperCase() + draggedElement.slice(1),
      props: defaultProps[draggedElement] || {},
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
    saveToHistory(`Added ${draggedElement}`);
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
    const x = snapToGridValue(e.clientX - rect.left - dragOffset.x, gridSize, snapToGrid);
    const y = snapToGridValue(e.clientY - rect.top - dragOffset.y, gridSize, snapToGrid);

    updateElementPosition(selectedElement, x, y);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory("Moved element");
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

  const deleteElement = (elementId: string) => {
    setCanvasElements(prev => prev.filter(el => el.id !== elementId));
    if (selectedElement === elementId) {
      setSelectedElement(null);
    }
    saveToHistory("Deleted element");
  };

  const duplicateElement = (elementId: string) => {
    const element = canvasElements.find(el => el.id === elementId);
    if (!element) return;

    const newElement: ComponentElement = {
      ...element,
      id: generateElementId(element.type),
      x: element.x + 20,
      y: element.y + 20,
      zIndex: (element.zIndex || 1) + 1,
    };

    setCanvasElements(prev => [...prev, newElement]);
    saveToHistory("Duplicated element");
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

  // Render element on canvas
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
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-nw-resize" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-ne-resize" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-sw-resize" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary border border-white rounded-sm cursor-se-resize" />
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

  const filteredElements = elementLibrary.filter(category => 
    filterCategory === "all" || category.category.toLowerCase().includes(filterCategory.toLowerCase())
  ).map(category => ({
    ...category,
    elements: category.elements.filter(element =>
      element.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      element.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.elements.length > 0);

  return (
    <TooltipProvider>
      <div className="flex h-full bg-background">
        {/* Element Library Sidebar */}
        <div className="w-80 border-r border-border bg-muted/30 flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Zap className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-medium">ComponentLab Pro</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onThemeToggle}
                className="h-8 w-8 p-0"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search elements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {elementLibrary.map((category) => (
                    <SelectItem key={category.category} value={category.category.toLowerCase()}>
                      {category.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {filteredElements.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center gap-2 mb-3">
                    <category.icon className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium text-sm">{category.category}</h3>
                    <Badge variant="outline" className="text-xs">
                      {category.elements.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {category.elements.map((element, elementIndex) => (
                      <Tooltip key={elementIndex}>
                        <TooltipTrigger asChild>
                          <div
                            draggable
                            onDragStart={() => handleDragStart(element.id)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-grab hover:bg-accent/50 transition-colors active:cursor-grabbing border border-transparent hover:border-border"
                          >
                            <div className={`${element.color} p-2 rounded-md`}>
                              <element.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-xs font-medium text-center leading-tight">
                              {element.label}
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p className="font-medium">{element.label}</p>
                          <p className="text-xs text-muted-foreground">{element.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Enhanced Toolbar */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-4">
              <Input
                value={componentName}
                onChange={(e) => setComponentName(e.target.value)}
                className="w-48 font-medium"
              />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={tool === 'select' ? 'default' : 'outline'}
                      onClick={() => setTool('select')}
                    >
                      <MousePointer className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Select Tool</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={tool === 'pan' ? 'default' : 'outline'}
                      onClick={() => setTool('pan')}
                    >
                      <Hand className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Pan Tool</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant={tool === 'zoom' ? 'default' : 'outline'}
                      onClick={() => setTool('zoom')}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom Tool</TooltipContent>
                </Tooltip>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={undo}
                      disabled={historyIndex <= 0}
                    >
                      <Undo className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={redo}
                      disabled={historyIndex >= history.length - 1}
                    >
                      <Redo className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo</TooltipContent>
                </Tooltip>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mobile View</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={previewMode === "tablet" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("tablet")}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Tablet View</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Desktop View</TooltipContent>
                </Tooltip>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Import Component</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Export Component</TooltipContent>
                </Tooltip>
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
                      ? `radial-gradient(circle, ${isDark ? '#333' : '#ccc'} 1px, transparent 1px)` 
                      : 'none',
                    backgroundSize: showGrid ? `${gridSize}px ${gridSize}px` : 'auto',
                  }}
                >
                  {canvasElements.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Zap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground font-medium">
                          Ultra Component Builder
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
                {/* Layers Panel */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      Layers
                      <Badge variant="secondary" className="text-xs ml-auto">
                        {canvasElements.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
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

                {/* Properties Panel */}
                {selectedElementData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        {selectedElementData.label} Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="properties">
                        <TabsList className="grid grid-cols-3 w-full">
                          <TabsTrigger value="properties">Props</TabsTrigger>
                          <TabsTrigger value="style">Style</TabsTrigger>
                          <TabsTrigger value="layout">Layout</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="properties" className="space-y-4 mt-4">
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
                              <div className="flex items-center justify-between">
                                <Label>Disabled</Label>
                                <Switch
                                  checked={selectedElementData.props.disabled}
                                  onCheckedChange={(checked) => updateElementProps(selectedElementData.id, { disabled: checked })}
                                />
                              </div>
                            </>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="style" className="space-y-4 mt-4">
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
                        </TabsContent>
                        
                        <TabsContent value="layout" className="space-y-4 mt-4">
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
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Tools */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Quick Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Grid</Label>
                      <Switch
                        checked={showGrid}
                        onCheckedChange={setShowGrid}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Snap to Grid</Label>
                      <Switch
                        checked={snapToGrid}
                        onCheckedChange={setSnapToGrid}
                        size="sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm flex justify-between">
                        Zoom: {zoom}%
                      </Label>
                      <Slider
                        value={[zoom]}
                        onValueChange={([value]) => setZoom(value)}
                        min={25}
                        max={200}
                        step={25}
                      />
                    </div>
                  </CardContent>
                </Card>

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
                        {generateComponentCode(canvasElements)}
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
    </TooltipProvider>
  );
}
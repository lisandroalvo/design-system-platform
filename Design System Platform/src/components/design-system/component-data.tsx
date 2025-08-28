import React, { useState } from 'react';
import { ComponentType } from './types';
import { 
  MousePointer, Square, Type, ToggleLeft, AlertCircle, Layout, Navigation,
  Check, Circle, Sliders, Play, X, ChevronDown, ChevronRight, Sparkles,
  Calendar, Upload, Palette, Star, MessageCircle, Zap, Search, Hash,
  BarChart3, CreditCard, Users, Image, Clock, List, Grid3X3, Plus,
  Bell, CheckCircle, AlertTriangle, Menu, Home, Settings, ArrowUp,
  Loader, ChevronLeft, Terminal, TreePine, Folder, Code, Table,
  Maximize, Filter, MoreHorizontal, Copy, Cut, Paste, Edit, Trash2,
  Share, Download, FileText, Bold, Italic, Underline, AlignLeft,
  AlignCenter, ChevronUp, Layers, Heart, Shield, Columns
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner@2.0.3';

export interface ComponentOption {
  value: ComponentType;
  label: string;
  description: string;
  category: 'input' | 'display' | 'feedback' | 'navigation' | 'layout' | 'interactive' | 'modern';
  icon: React.ReactNode;
  preview: React.ReactNode;
  tags: string[];
  isPopular?: boolean;
  isNew?: boolean;
  complexity?: 'simple' | 'moderate' | 'advanced';
}

// Interactive component implementations
const InteractiveAccordion: React.FC<{ variant: any }> = ({ variant }) => {
  const [openItem, setOpenItem] = useState<string | undefined>("item-1");

  return (
    <div className="space-y-2 min-w-[200px]">
      <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
        <AccordionItem value="item-1" className="border rounded-2xl shadow-sm">
          <AccordionTrigger className="p-4 hover:bg-blue-50 transition-colors rounded-t-2xl">
            <span className="text-sm font-medium">Section 1</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 text-sm text-gray-600 border-t bg-gray-50 rounded-b-2xl">
            This section is fully interactive! Click to expand and collapse.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2" className="border rounded-2xl shadow-sm">
          <AccordionTrigger className="p-4 hover:bg-gray-50 transition-colors rounded-2xl">
            <span className="text-sm font-medium">Section 2</span>
          </AccordionTrigger>
          <AccordionContent className="p-4 text-sm text-gray-600 border-t bg-gray-50 rounded-b-2xl">
            Another expandable section with interactive functionality.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const InteractiveSwitch: React.FC<{ variant: any; state: any }> = ({ variant, state }) => {
  const [checked, setChecked] = useState(state.name === 'checked' || false);
  const isDisabled = state.name === 'disabled';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Switch 
          checked={checked} 
          onCheckedChange={setChecked}
          disabled={isDisabled}
          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-400 data-[state=checked]:to-blue-500"
        />
        <Label className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : ''}`}>
          {isDisabled ? 'Disabled' : checked ? 'Enabled' : 'Disabled'}
        </Label>
      </div>
    </div>
  );
};

const InteractiveCheckbox: React.FC<{ variant: any; state: any }> = ({ variant, state }) => {
  const [checked, setChecked] = useState(state.name === 'checked' || false);
  const isDisabled = state.name === 'disabled';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={checked} 
          onCheckedChange={setChecked}
          disabled={isDisabled}
        />
        <Label className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : ''}`}>
          {isDisabled ? 'Disabled option' : 'Interactive checkbox'}
        </Label>
      </div>
    </div>
  );
};

const InteractiveRadio: React.FC<{ variant: any; state: any }> = ({ variant, state }) => {
  const [selected, setSelected] = useState(state.name === 'checked' ? 'option1' : '');
  const isDisabled = state.name === 'disabled';

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div 
          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer ${
            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
            selected === 'option1' 
              ? 'border-blue-500 bg-white ring-2 ring-blue-100/50 transform scale-110' 
              : 'border-gray-300 bg-white hover:border-gray-400'
          }`}
          onClick={() => !isDisabled && setSelected(selected === 'option1' ? '' : 'option1')}
        >
          {selected === 'option1' && !isDisabled && (
            <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-sm" />
          )}
        </div>
        <Label className={`text-sm font-medium cursor-pointer ${isDisabled ? 'text-gray-400' : ''}`}
               onClick={() => !isDisabled && setSelected(selected === 'option1' ? '' : 'option1')}>
          {isDisabled ? 'Disabled choice' : 'Interactive choice'}
        </Label>
      </div>
    </div>
  );
};

const InteractiveButton: React.FC<{ variant: any; state: any }> = ({ variant, state }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(state.name === 'loading');
  const isDisabled = state.name === 'disabled';

  const handleClick = () => {
    if (isDisabled) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (!isLoading) {
      setIsLoading(true);
      toast("Button clicked!", { description: "This is fully interactive!" });
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const getButtonStyles = () => {
    if (variant.name === 'Secondary' || variant.name === 'secondary') {
      return `inline-flex items-center px-4 py-2 border-2 text-sm font-medium rounded-xl transition-all duration-300 ${
        isDisabled ? 'opacity-50 cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400' :
        isPressed ? 'transform scale-95 border-blue-600 bg-blue-100 text-blue-700' :
        'border-blue-500/30 bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-blue-50'
      }`;
    } else if (variant.name === 'Destructive' || variant.name === 'destructive') {
      return `inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-sm font-medium shadow-lg transition-all duration-300 ${
        isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-400 from-gray-400 to-gray-500' :
        isPressed ? 'transform scale-95 from-red-600 to-pink-700' :
        'hover:shadow-xl hover:scale-105'
      }`;
    }
    // Primary button
    return `inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg transition-all duration-300 ${
      isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-400 from-gray-400 to-gray-500' :
      isLoading ? 'opacity-80 cursor-wait' :
      isPressed ? 'transform scale-95 from-blue-600 to-purple-700' :
      'hover:shadow-xl hover:scale-105'
    }`;
  };

  return (
    <button 
      className={getButtonStyles()}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        variant.name === 'Destructive' || variant.name === 'destructive' ? 'Delete' :
        variant.name === 'Secondary' || variant.name === 'secondary' ? 'Secondary' :
        'Primary'
      )}
    </button>
  );
};

const InteractiveTabs: React.FC<{ variant: any; state: any }> = ({ variant, state }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const isDisabled = state.name === 'disabled';

  return (
    <div className="min-w-[200px]">
      <Tabs value={activeTab} onValueChange={setActiveTab} className={isDisabled ? 'opacity-50' : ''}>
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-2xl p-1">
          <TabsTrigger 
            value="overview" 
            disabled={isDisabled}
            className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="details" 
            disabled={isDisabled}
            className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            Details
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            disabled={isDisabled}
            className="text-xs font-medium data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4 p-4 rounded-2xl bg-gray-50">
          <div className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
            {isDisabled ? 'Content disabled' : 'Overview content - click other tabs to navigate!'}
          </div>
        </TabsContent>
        <TabsContent value="details" className="mt-4 p-4 rounded-2xl bg-gray-50">
          <div className="text-xs text-gray-600">
            Details content - this tab is fully interactive!
          </div>
        </TabsContent>
        <TabsContent value="settings" className="mt-4 p-4 rounded-2xl bg-gray-50">
          <div className="text-xs text-gray-600">
            Settings content - you can switch between all tabs!
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const InteractiveFileUpload: React.FC<{ variant: any; state: any }> = ({ variant, state }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const isDisabled = state.name === 'disabled';

  const handleDragOver = (e: React.DragEvent) => {
    if (isDisabled) return;
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isDisabled) return;
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).map(f => f.name);
    setUploadedFiles(files);
    toast("Files uploaded!", { description: `${files.length} file(s) uploaded successfully` });
  };

  const handleClick = () => {
    if (isDisabled) return;
    // Simulate file selection
    const mockFiles = ['document.pdf', 'image.jpg'];
    setUploadedFiles(mockFiles);
    toast("Files selected!", { description: `${mockFiles.length} file(s) selected` });
  };

  return (
    <div className="min-w-[180px]">
      <div 
        className={`border-2 border-dashed rounded-3xl p-6 text-center transition-all duration-300 cursor-pointer group ${
          isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
          isDragOver ? 'border-blue-400 bg-blue-50/70 scale-105' :
          'border-blue-300/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm hover:border-blue-400 hover:bg-blue-50/70'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className={`w-8 h-8 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg transition-transform duration-200 ${
          isDisabled ? 'bg-gray-300 group-hover:scale-100' :
          isDragOver ? 'bg-gradient-to-br from-blue-500 to-purple-600 scale-110' :
          'bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110'
        }`}>
          <Upload className={`w-4 h-4 ${isDisabled ? 'text-gray-500' : 'text-white'}`} />
        </div>
        <div className={`text-xs font-medium mb-1 ${isDisabled ? 'text-gray-400' : 'text-blue-700'}`}>
          {isDisabled ? 'Upload disabled' : isDragOver ? 'Drop files now!' : 'Drop files here'}
        </div>
        <div className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-blue-500'}`}>
          {isDisabled ? 'Feature unavailable' : 'or click to browse'}
        </div>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="mt-3 p-2 bg-green-50 rounded-xl border border-green-200">
          <div className="text-xs text-green-700 font-medium mb-1">Uploaded files:</div>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="text-xs text-green-600">• {file}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// Interactive component render function - FULLY FUNCTIONAL COMPONENTS
export const renderInteractiveComponent = (
  componentType: ComponentType, 
  variant: any, 
  state: any
): React.ReactNode => {
  switch (componentType) {
    case 'accordion':
      return <InteractiveAccordion variant={variant} />;
    case 'switch':
      return <InteractiveSwitch variant={variant} state={state} />;
    case 'checkbox':
      return <InteractiveCheckbox variant={variant} state={state} />;
    case 'radio':
      return <InteractiveRadio variant={variant} state={state} />;
    case 'button':
      return <InteractiveButton variant={variant} state={state} />;
    case 'tabs':
      return <InteractiveTabs variant={variant} state={state} />;
    case 'file-upload':
      return <InteractiveFileUpload variant={variant} state={state} />;
    default:
      // Fallback to static component
      return renderComponent(componentType, variant, state);
  }
};

// Render component function for preview - MATCHES GALLERY PREVIEWS EXACTLY WITH PROPER STATES
export const renderComponent = (
  componentType: ComponentType, 
  variant: any, 
  state: any
): React.ReactNode => {
  const isHover = state.name === 'hover';
  const isFocus = state.name === 'focus';
  const isActive = state.name === 'active';
  const isDisabled = state.name === 'disabled';
  const isChecked = state.name === 'checked' || state.name === 'selected';
  const isError = state.name === 'error';
  const isLoading = state.name === 'loading';
  const isExpanded = state.name === 'expanded';
  const isDragover = state.name === 'dragover';
  
  // Component rendering that matches the gallery previews exactly
  switch (componentType) {
    case 'button':
      if (variant.name === 'Primary' || variant.name === 'primary' || !variant.name) {
        return (
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg transition-all duration-300 ${
            isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-400 from-gray-400 to-gray-500' :
            isLoading ? 'opacity-80 cursor-wait' :
            isActive ? 'transform scale-95 from-blue-600 to-purple-700' :
            isHover ? 'shadow-xl transform scale-105' : 'hover:shadow-xl hover:scale-105'
          }`}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </div>
            ) : (
              'Primary'
            )}
          </div>
        );
      } else if (variant.name === 'Secondary' || variant.name === 'secondary') {
        return (
          <div className={`inline-flex items-center px-4 py-2 border-2 text-sm font-medium rounded-xl transition-all duration-300 ${
            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400' :
            isActive ? 'transform scale-95 border-blue-600 bg-blue-100 text-blue-700' :
            isHover ? 'bg-blue-50 border-blue-500/50 text-blue-600' : 'border-blue-500/30 bg-white/80 backdrop-blur-sm text-blue-600 hover:bg-blue-50'
          }`}>
            Secondary
          </div>
        );
      } else if (variant.name === 'Destructive' || variant.name === 'destructive') {
        return (
          <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-sm font-medium shadow-lg transition-all duration-300 ${
            isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-400 from-gray-400 to-gray-500' :
            isActive ? 'transform scale-95 from-red-600 to-pink-700' :
            isHover ? 'shadow-xl transform scale-105' : 'hover:shadow-xl hover:scale-105'
          }`}>
            Delete
          </div>
        );
      }
      return (
        <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium shadow-lg transition-all duration-300 ${
          isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-400 from-gray-400 to-gray-500' :
          isHover ? 'shadow-xl transform scale-105' : 'hover:shadow-xl hover:scale-105'
        }`}>
          {variant.name || 'Button'}
        </div>
      );
    
    case 'input':
      return (
        <div className="space-y-3 w-full">
          <div className={`border-2 rounded-2xl px-4 py-3 text-sm min-w-[200px] transition-all duration-200 ${
            isDisabled ? 'opacity-60 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400' :
            isError ? 'border-red-400 ring-4 ring-red-100/50 bg-white' : 
            isFocus || isActive ? 'border-blue-400 ring-4 ring-blue-100/50 bg-white shadow-lg' :
            'border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-gray-300'
          }`}>
            {isDisabled ? 'Input disabled' :
             isError ? 'Invalid email' : 
             isFocus || isActive ? 'john@example.com' : 'Enter your email...'}
          </div>
        </div>
      );
    
    case 'search':
      return (
        <div className="relative w-full min-w-[200px]">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
            isDisabled ? 'text-gray-300' : 'text-gray-400'
          }`} />
          <div className={`border-2 rounded-2xl pl-12 pr-4 py-3 text-sm backdrop-blur-md shadow-lg transition-all duration-200 ${
            isDisabled ? 'opacity-60 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400' :
            isFocus ? 'border-purple-400 ring-4 ring-purple-100/50 bg-white' : 'border-gray-200/50 bg-white/90'
          }`}>
            {isDisabled ? 'Search disabled' : 
             isFocus ? 'searching...' : 'Search products...'}
          </div>
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDisabled ? 'opacity-50' : ''}`}>
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      );
    
    case 'radio-cards':
      return (
        <div className="grid grid-cols-2 gap-3 w-full">
          <div className={`relative border-2 rounded-2xl p-3 shadow-lg transition-all duration-200 ${
            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
            'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 ring-4 ring-blue-100/50 transform scale-105'
          }`}>
            <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ring-2 ring-white shadow-sm ${
              isDisabled ? 'bg-gray-300' : 'bg-blue-500'
            }`}>
              {!isDisabled && <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5" />}
            </div>
            <div className={`text-xs font-medium mb-1 ${isDisabled ? 'text-gray-400' : 'text-blue-800'}`}>Premium</div>
            <div className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-blue-600'}`}>$29/mo</div>
          </div>
          <div className={`border-2 rounded-2xl p-3 transition-all duration-200 ${
            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
            'border-gray-200/50 bg-white/80 backdrop-blur-sm hover:border-gray-300 hover:shadow-md'
          }`}>
            <div className={`absolute top-2 right-2 w-3 h-3 border-2 rounded-full ${
              isDisabled ? 'border-gray-300' : 'border-gray-300'
            }`} />
            <div className={`text-xs font-medium mb-1 ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>Basic</div>
            <div className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-gray-500'}`}>$9/mo</div>
          </div>
        </div>
      );
    
    case 'switch':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-6 rounded-full relative shadow-lg transition-all duration-300 ${
              isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-200' :
              isChecked ? 'bg-gradient-to-r from-green-400 to-blue-500 ring-2 ring-green-100/50' : 'bg-gray-200 hover:bg-gray-300'
            }`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-md transition-transform duration-300 ${
                isChecked ? 'right-0.5' : 'left-0.5'
              }`} />
            </div>
            <span className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : ''}`}>
              {isDisabled ? 'Disabled' : isChecked ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      );
    
    case 'checkbox':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 border-2 rounded-lg flex items-center justify-center shadow-lg transition-all duration-200 ${
              isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
              isChecked 
                ? 'border-blue-500 bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-blue-100/50 transform scale-110' 
                : 'border-gray-300 bg-white hover:border-blue-400'
            }`}>
              {isChecked && !isDisabled && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : ''}`}>
              {isDisabled ? 'Disabled option' : 'Option'}
            </span>
          </div>
        </div>
      );
    
    case 'radio':
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
              isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
              isChecked 
                ? 'border-blue-500 bg-white ring-2 ring-blue-100/50 transform scale-110' 
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}>
              {isChecked && !isDisabled && <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-sm" />}
            </div>
            <span className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : ''}`}>
              {isDisabled ? 'Disabled choice' : 'Choice A'}
            </span>
          </div>
        </div>
      );
    
    case 'card':
      return (
        <div className={`border rounded-3xl p-4 min-w-[180px] transition-all duration-300 ${
          isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
          isHover ? 'border-gray-200/50 bg-white/80 backdrop-blur-md shadow-2xl transform scale-105' :
          'border-gray-200/50 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl hover:scale-105'
        }`}>
          <div className={`h-4 rounded-xl mb-3 w-2/3 ${
            isDisabled ? 'bg-gray-300' : 'bg-gradient-to-r from-gray-700 to-gray-900'
          }`} />
          <div className="space-y-2">
            <div className={`h-2 rounded-lg w-full ${isDisabled ? 'bg-gray-200' : 'bg-gray-200'}`} />
            <div className={`h-2 rounded-lg w-4/5 ${isDisabled ? 'bg-gray-200' : 'bg-gray-200'}`} />
          </div>
          <div className="flex gap-2 mt-4">
            <div className={`h-6 rounded-lg px-2 flex items-center shadow-md ${
              isDisabled ? 'bg-gray-200' : 'bg-gradient-to-r from-blue-400 to-purple-500'
            }`}>
              <div className={`h-1 rounded w-8 ${isDisabled ? 'bg-gray-400' : 'bg-white/80'}`} />
            </div>
            <div className="h-6 bg-gray-100 rounded-lg px-2 flex items-center">
              <div className="h-1 bg-gray-400 rounded w-6" />
            </div>
          </div>
        </div>
      );
    
    case 'stat-card':
      return (
        <div className={`border rounded-3xl p-4 min-w-[160px] transition-all duration-300 ${
          isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
          'border-gray-200/50 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-md shadow-xl hover:shadow-2xl'
        }`}>
          <div className="flex justify-between items-start mb-3">
            <div className={`text-xs font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-500'}`}>Revenue</div>
            <div className={`w-6 h-6 rounded-xl flex items-center justify-center shadow-lg ${
              isDisabled ? 'bg-gray-300' : 'bg-gradient-to-br from-green-400 to-emerald-500'
            }`}>
              <ChevronRight className={`w-3 h-3 rotate-[-45deg] ${isDisabled ? 'text-gray-500' : 'text-white'}`} />
            </div>
          </div>
          <div className={`text-lg font-bold ${
            isDisabled ? 'text-gray-400' : 'bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
          }`}>
            {isDisabled ? '$--,---' : '$12,345'}
          </div>
          <div className={`text-xs font-medium ${isDisabled ? 'text-gray-400' : 'text-green-600'}`}>
            {isDisabled ? '---%' : '+12.5%'}
          </div>
        </div>
      );
    
    case 'file-upload':
      return (
        <div className={`border-2 border-dashed rounded-3xl p-6 text-center min-w-[180px] transition-all duration-300 group ${
          isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
          isDragover ? 'border-blue-400 bg-blue-50/70' :
          isHover ? 'border-blue-400 bg-blue-50/70' :
          'border-blue-300/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm hover:border-blue-400 hover:bg-blue-50/70'
        }`}>
          <div className={`w-8 h-8 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg transition-transform duration-200 ${
            isDisabled ? 'bg-gray-300 group-hover:scale-100' :
            isHover ? 'bg-gradient-to-br from-blue-500 to-purple-600 scale-110' :
            'bg-gradient-to-br from-blue-500 to-purple-600 group-hover:scale-110'
          }`}>
            <Upload className={`w-4 h-4 ${isDisabled ? 'text-gray-500' : 'text-white'}`} />
          </div>
          <div className={`text-xs font-medium mb-1 ${isDisabled ? 'text-gray-400' : 'text-blue-700'}`}>
            {isDisabled ? 'Upload disabled' : 'Drop files here'}
          </div>
          <div className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-blue-500'}`}>
            {isDisabled ? 'Feature unavailable' : 'or click to browse'}
          </div>
        </div>
      );
    
    case 'alert':
      return (
        <div className={`p-4 rounded-2xl border shadow-lg transition-all duration-200 min-w-[200px] ${
          isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400' :
          variant.name === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          variant.name === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
          variant.name === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-1 rounded-lg ${
              isDisabled ? 'bg-gray-300' :
              variant.name === 'error' ? 'bg-red-500' :
              variant.name === 'warning' ? 'bg-yellow-500' :
              variant.name === 'success' ? 'bg-green-500' :
              'bg-blue-500'
            }`}>
              <AlertCircle className={`w-4 h-4 ${isDisabled ? 'text-gray-500' : 'text-white'}`} />
            </div>
            <div>
              <div className="font-medium text-sm mb-1">
                {isDisabled ? 'Alert disabled' :
                 variant.name === 'error' ? 'Error: Please try again' :
                 variant.name === 'warning' ? 'Warning: Check your input' :
                 variant.name === 'success' ? 'Success: Changes saved' :
                 'Info: Update available'}
              </div>
              <div className="text-xs opacity-80">
                {isDisabled ? 'Notifications are currently disabled' : 'Additional context and information for the user'}
              </div>
            </div>
          </div>
        </div>
      );
    
    case 'accordion':
      return (
        <div className="space-y-2 min-w-[200px]">
          <div className={`border rounded-2xl shadow-sm transition-all duration-200 ${
            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
            'border-gray-200 bg-white'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between transition-colors ${
              isDisabled ? 'border-gray-100 bg-gray-50 cursor-not-allowed' :
              isExpanded ? 'border-gray-100 bg-blue-50' : 'border-gray-100 bg-white hover:bg-gray-50'
            }`}>
              <span className={`text-sm font-medium ${
                isDisabled ? 'text-gray-400' :
                isExpanded ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {isDisabled ? 'Section 1 (Disabled)' : isExpanded ? 'Section 1 (Expanded)' : 'Section 1'}
              </span>
              <ChevronUp className={`w-4 h-4 ${
                isDisabled ? 'text-gray-300' :
                isExpanded ? 'text-blue-600' : 'text-gray-400'
              } ${isExpanded ? '' : 'rotate-180'}`} />
            </div>
            {(isExpanded && !isDisabled) && (
              <div className="p-4 text-sm text-gray-600">
                This section is currently expanded and shows the content
              </div>
            )}
          </div>
          <div className={`border rounded-2xl shadow-sm ${
            isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
            'border-gray-200 bg-white'
          }`}>
            <div className={`p-4 flex items-center justify-between transition-colors ${
              isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-50'
            }`}>
              <span className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>Section 2</span>
              <ChevronDown className={`w-4 h-4 ${isDisabled ? 'text-gray-300' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>
      );
    
    case 'tabs':
      return (
        <div className="min-w-[200px]">
          <div className={`flex space-x-1 p-1 rounded-2xl mb-4 ${
            isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-gray-100'
          }`}>
            <div className={`flex-1 text-center py-2 px-4 text-xs rounded-xl shadow-sm font-medium transition-colors ${
              isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-white text-blue-600'
            }`}>
              Overview
            </div>
            <div className={`flex-1 text-center py-2 px-4 text-xs font-medium transition-colors ${
              isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-gray-800'
            }`}>
              Details
            </div>
            <div className={`flex-1 text-center py-2 px-4 text-xs font-medium transition-colors ${
              isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-gray-800'
            }`}>
              Settings
            </div>
          </div>
          <div className={`p-4 rounded-2xl ${isDisabled ? 'bg-gray-100' : 'bg-gray-50'}`}>
            <div className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
              {isDisabled ? 'Content disabled' : 'Overview content would appear here'}
            </div>
          </div>
        </div>
      );

    case 'ai-chat-interface':
      return (
        <div className={`min-w-[200px] rounded-3xl shadow-xl border p-4 transition-all duration-200 ${
          isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' :
          'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ${
              isDisabled ? 'bg-gray-300' : 'bg-gradient-to-br from-purple-500 to-pink-500'
            }`}>
              <Sparkles className={`w-4 h-4 ${isDisabled ? 'text-gray-500' : 'text-white'}`} />
            </div>
            <div>
              <div className={`text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'}`}>AI Assistant</div>
              <div className={`text-xs font-medium flex items-center gap-1 ${
                isDisabled ? 'text-gray-400' : 'text-red-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isDisabled ? 'bg-gray-400' : 'bg-red-500'}`} />
                {isDisabled ? 'Offline' : 'Offline'}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className={`rounded-2xl p-3 mr-8 ${
              isDisabled ? 'bg-gray-100' : 'bg-gray-100'
            }`}>
              <div className={`text-xs ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>
                {isDisabled ? 'AI assistant is currently unavailable. Please try again later.' : 
                 'I\'ll suggest focusing on content and spacing. Here are some tips...'}
              </div>
            </div>
            <div className={`rounded-2xl p-3 ml-8 ${
              isDisabled ? 'bg-gray-200 text-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
            }`}>
              <div className="text-xs">
                {isDisabled ? 'Message cannot be sent' : 'How can I improve my design?'}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className={`flex-1 rounded-2xl px-4 py-2 text-xs ${
              isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-500'
            }`}>
              {isDisabled ? 'Chat disabled...' : 'Type your message...'}
            </div>
            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center ${
              isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <ArrowUp className={`w-4 h-4 ${isDisabled ? 'text-gray-500' : 'text-white'}`} />
            </div>
          </div>
        </div>
      );
    
    default:
      // Generic component fallback that matches gallery style
      return (
        <div className={`px-4 py-2 rounded-2xl border transition-all duration-200 ${
          isDisabled ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400' :
          'border-gray-200 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl text-gray-900'
        }`}>
          <span className="text-sm font-medium">
            {isDisabled ? `${variant.name || componentType} (Disabled)` : (variant.name || componentType)}
          </span>
        </div>
      );
  }
};

export const componentOptions: ComponentOption[] = [
  // ========== INPUT & FORMS ==========
  {
    value: 'button',
    label: 'Button',
    description: 'Clickable element that triggers actions and user interactions',
    category: 'input',
    icon: <MousePointer className="w-5 h-5" />,
    preview: (
      <div className="flex gap-2">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
          Primary
        </div>
        <div className="inline-flex items-center px-4 py-2 border-2 border-blue-500/30 bg-white/80 backdrop-blur-sm text-blue-600 rounded-xl text-xs font-medium hover:bg-blue-50 transition-all duration-200">
          Secondary
        </div>
      </div>
    ),
    tags: ['click', 'action', 'submit', 'interactive', 'cta'],
    isPopular: true,
    complexity: 'simple'
  },
  {
    value: 'input',
    label: 'Input Field',
    description: 'Single-line text entry for forms and data collection',
    category: 'input',
    icon: <Type className="w-5 h-5" />,
    preview: (
      <div className="space-y-3 w-full">
        <div className="relative">
          <div className="border-2 border-gray-200/50 rounded-2xl px-4 py-3 text-xs bg-white/80 backdrop-blur-sm min-w-[140px] focus-within:border-blue-400 focus-within:bg-white transition-all duration-200">
            Enter your email...
          </div>
        </div>
        <div className="relative">
          <div className="border-2 border-blue-400 rounded-2xl px-4 py-3 text-xs bg-white shadow-lg min-w-[140px] ring-4 ring-blue-100/50">
            john@example.com
          </div>
        </div>
      </div>
    ),
    tags: ['text', 'form', 'field', 'typing', 'data entry'],
    isPopular: true,
    complexity: 'simple'
  },
  {
    value: 'radio-cards',
    label: 'Radio Cards',
    description: 'Card-based radio selection with visual previews and enhanced UX',
    category: 'input',
    icon: <Columns className="w-5 h-5" />,
    preview: (
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="relative border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-3 shadow-lg ring-4 ring-blue-100/50 transform scale-105 transition-all duration-200">
          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full ring-2 ring-white shadow-sm">
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5" />
          </div>
          <div className="text-xs font-medium text-blue-800 mb-1">Premium</div>
          <div className="text-xs text-blue-600">$29/mo</div>
        </div>
        <div className="border-2 border-gray-200/50 bg-white/80 backdrop-blur-sm rounded-2xl p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200">
          <div className="absolute top-2 right-2 w-3 h-3 border-2 border-gray-300 rounded-full" />
          <div className="text-xs font-medium text-gray-700 mb-1">Basic</div>
          <div className="text-xs text-gray-500">$9/mo</div>
        </div>
      </div>
    ),
    tags: ['radio', 'cards', 'selection', 'visual', 'pricing', 'options'],
    isNew: true,
    isPopular: true,
    complexity: 'moderate'
  },
  {
    value: 'search',
    label: 'Search Input',
    description: 'Specialized input field with search functionality and suggestions',
    category: 'input',
    icon: <Search className="w-5 h-5" />,
    preview: (
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <div className="border-2 border-gray-200/50 rounded-2xl pl-12 pr-4 py-3 text-xs bg-white/90 backdrop-blur-md min-w-[140px] shadow-lg focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-100/50 transition-all duration-200">
          Search products...
        </div>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    ),
    tags: ['search', 'filter', 'find', 'query', 'autocomplete'],
    isPopular: true,
    complexity: 'moderate'
  },
  {
    value: 'textarea',
    label: 'Text Area',
    description: 'Multi-line text input for longer content and messages',
    category: 'input',
    icon: <Square className="w-5 h-5" />,
    preview: (
      <div className="border-2 border-gray-200/50 rounded-2xl px-4 py-3 text-xs bg-white/90 backdrop-blur-sm min-w-[140px] h-20 resize-none focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100/50 transition-all duration-200">
        <div className="text-gray-400">Type your message here...</div>
        <div className="mt-2 text-gray-600">AI-powered writing assistance available</div>
      </div>
    ),
    tags: ['text', 'multiline', 'message', 'paragraph', 'content'],
    complexity: 'simple'
  },
  {
    value: 'select',
    label: 'Select Dropdown',
    description: 'Dropdown menu for choosing from multiple options',
    category: 'input',
    icon: <ChevronDown className="w-5 h-5" />,
    preview: (
      <div className="space-y-2 w-full">
        <div className="border-2 border-gray-200/50 rounded-2xl px-4 py-3 text-xs bg-white/90 backdrop-blur-sm min-w-[140px] flex justify-between items-center shadow-lg hover:shadow-xl transition-all duration-200">
          Choose option...
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    ),
    tags: ['dropdown', 'options', 'choose', 'menu', 'selection'],
    complexity: 'simple'
  },
  {
    value: 'combobox',
    label: 'Combobox',
    description: 'Searchable dropdown with autocomplete functionality',
    category: 'input',
    icon: <Search className="w-5 h-5" />,
    preview: (
      <div className="border-2 border-gray-200/50 rounded-2xl px-4 py-3 text-xs bg-white/90 backdrop-blur-sm min-w-[140px] flex justify-between items-center shadow-lg focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100/50 transition-all duration-200">
        Search and select...
        <div className="flex items-center gap-2">
          <Search className="w-3 h-3 text-gray-400" />
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    ),
    tags: ['combo', 'autocomplete', 'search', 'dropdown', 'filter'],
    isNew: true,
    complexity: 'moderate'
  },
  {
    value: 'checkbox',
    label: 'Checkbox',
    description: 'Square toggle for multiple selections in forms',
    category: 'input',
    icon: <Check className="w-5 h-5" />,
    preview: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white shadow-sm hover:border-blue-400 transition-all duration-200">
            <Check className="w-3 h-3 text-blue-500" />
          </div>
          <span className="text-xs font-medium">Option 1</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-2 ring-blue-100/50 transform scale-110 transition-all duration-200">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium">Option 2</span>
        </div>
      </div>
    ),
    tags: ['toggle', 'multiple', 'selection', 'form', 'check'],
    complexity: 'simple'
  },
  {
    value: 'radio',
    label: 'Radio Button',
    description: 'Circular button for single selection from a group',
    category: 'input',
    icon: <Circle className="w-5 h-5" />,
    preview: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center bg-white shadow-lg ring-2 ring-blue-100/50 transform scale-110 transition-all duration-200">
            <div className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-sm" />
          </div>
          <span className="text-xs font-medium">Choice A</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full bg-white shadow-sm hover:border-gray-400 transition-all duration-200" />
          <span className="text-xs font-medium text-gray-600">Choice B</span>
        </div>
      </div>
    ),
    tags: ['single', 'selection', 'group', 'choice', 'exclusive'],
    complexity: 'simple'
  },
  {
    value: 'switch',
    label: 'Toggle Switch',
    description: 'Modern toggle control for on/off binary states',
    category: 'input',
    icon: <ToggleLeft className="w-5 h-5" />,
    preview: (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full relative shadow-lg ring-2 ring-green-100/50 transition-all duration-300">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-md transform transition-transform duration-300" />
          </div>
          <span className="text-xs font-medium">Enabled</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-6 bg-gray-200 rounded-full relative shadow-sm hover:bg-gray-300 transition-all duration-300">
            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-md transition-transform duration-300" />
          </div>
          <span className="text-xs font-medium text-gray-600">Disabled</span>
        </div>
      </div>
    ),
    tags: ['toggle', 'on', 'off', 'boolean', 'switch'],
    isPopular: true,
    complexity: 'simple'
  },
  {
    value: 'slider',
    label: 'Range Slider',
    description: 'Interactive control for selecting values from a range',
    category: 'input',
    icon: <Sliders className="w-5 h-5" />,
    preview: (
      <div className="space-y-6 w-full">
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full shadow-inner">
            <div className="w-1/3 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
          </div>
          <div className="w-5 h-5 bg-white border-3 border-blue-500 rounded-full absolute top-[-6px] left-1/3 shadow-lg ring-2 ring-blue-100/50 transform transition-transform hover:scale-110" />
        </div>
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full shadow-inner">
            <div className="w-2/3 h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full" />
          </div>
          <div className="w-5 h-5 bg-white border-3 border-green-500 rounded-full absolute top-[-6px] left-2/3 shadow-lg ring-2 ring-green-100/50 transform transition-transform hover:scale-110" />
        </div>
      </div>
    ),
    tags: ['range', 'value', 'adjust', 'control', 'numeric'],
    complexity: 'moderate'
  },
  {
    value: 'file-upload',
    label: 'File Upload',
    description: 'Drag and drop file upload with progress indication',
    category: 'input',
    icon: <Upload className="w-5 h-5" />,
    preview: (
      <div className="border-2 border-dashed border-blue-300/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm rounded-3xl p-6 text-center min-w-[140px] hover:border-blue-400 hover:bg-blue-50/70 transition-all duration-300 group">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
          <Upload className="w-4 h-4 text-white" />
        </div>
        <div className="text-xs font-medium text-blue-700 mb-1">Drop files here</div>
        <div className="text-xs text-blue-500">or click to browse</div>
      </div>
    ),
    tags: ['upload', 'file', 'drag', 'drop', 'attachment'],
    isPopular: true,
    complexity: 'advanced'
  },
  {
    value: 'date-picker',
    label: 'Date Picker',
    description: 'Calendar-based date selection with range support',
    category: 'input',
    icon: <Calendar className="w-5 h-5" />,
    preview: (
      <div className="border-2 border-gray-200/50 rounded-2xl px-4 py-3 text-xs bg-white/90 backdrop-blur-sm min-w-[140px] flex justify-between items-center shadow-lg hover:shadow-xl focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100/50 transition-all duration-200">
        <span className="text-gray-600">Select date...</span>
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Calendar className="w-3 h-3 text-white" />
        </div>
      </div>
    ),
    tags: ['date', 'calendar', 'time', 'picker', 'schedule'],
    complexity: 'moderate'
  },
  {
    value: 'color-picker',
    label: 'Color Picker',
    description: 'Color selection tool with palette and custom input',
    category: 'input',
    icon: <Palette className="w-5 h-5" />,
    preview: (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-red-400 via-purple-500 to-blue-600 rounded-2xl border-3 border-white shadow-lg ring-2 ring-gray-200/50 hover:scale-110 transition-transform duration-200" />
        <div className="text-xs font-mono bg-gray-100 px-3 py-1 rounded-lg">#FF6B6B</div>
      </div>
    ),
    tags: ['color', 'picker', 'palette', 'design', 'theme'],
    complexity: 'moderate'
  },
  {
    value: 'rating',
    label: 'Rating',
    description: 'Star-based rating system for reviews and feedback',
    category: 'input',
    icon: <Star className="w-5 h-5" />,
    preview: (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <Star 
              key={i} 
              className={`w-5 h-5 transition-all duration-200 ${
                i <= 3 
                  ? 'fill-yellow-400 text-yellow-400 transform scale-110 drop-shadow-sm' 
                  : 'text-gray-300 hover:text-yellow-300'
              }`} 
            />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-700 ml-2">3.0</span>
      </div>
    ),
    tags: ['rating', 'stars', 'review', 'feedback', 'score'],
    complexity: 'moderate'
  },
  {
    value: 'otp-input',
    label: 'OTP Input',
    description: 'One-time password input with auto-focus and validation',
    category: 'input',
    icon: <Hash className="w-5 h-5" />,
    preview: (
      <div className="flex gap-3">
        {[1, 2, 3, 4].map(i => (
          <div 
            key={i} 
            className={`w-10 h-10 border-2 rounded-2xl text-center flex items-center justify-center text-sm font-mono shadow-lg transition-all duration-200 ${
              i <= 2 
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100/50 transform scale-105' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {i <= 2 ? '●' : ''}
          </div>
        ))}
      </div>
    ),
    tags: ['otp', 'verification', 'security', 'code', 'auth'],
    isNew: true,
    complexity: 'moderate'
  },

  // ========== DISPLAY & DATA ==========
  {
    value: 'card',
    label: 'Card',
    description: 'Versatile container for grouping related content and actions',
    category: 'display',
    icon: <Layout className="w-5 h-5" />,
    preview: (
      <div className="border border-gray-200/50 rounded-3xl p-4 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl min-w-[140px] transition-all duration-300 transform hover:scale-105">
        <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl mb-3 w-2/3" />
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-lg w-full" />
          <div className="h-2 bg-gray-200 rounded-lg w-4/5" />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg px-2 flex items-center shadow-md">
            <div className="h-1 bg-white/80 rounded w-8" />
          </div>
          <div className="h-6 bg-gray-100 rounded-lg px-2 flex items-center">
            <div className="h-1 bg-gray-400 rounded w-6" />
          </div>
        </div>
      </div>
    ),
    tags: ['container', 'content', 'group', 'box', 'layout'],
    isPopular: true,
    complexity: 'simple'
  },
  {
    value: 'stat-card',
    label: 'Stat Card',
    description: 'Statistical display card with metrics and trend indicators',
    category: 'display',
    icon: <BarChart3 className="w-5 h-5" />,
    preview: (
      <div className="border border-gray-200/50 rounded-3xl p-4 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-md shadow-xl min-w-[140px] hover:shadow-2xl transition-all duration-300">
        <div className="flex justify-between items-start mb-3">
          <div className="text-xs font-medium text-gray-500">Revenue</div>
          <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
            <ChevronRight className="w-3 h-3 text-white rotate-[-45deg]" />
          </div>
        </div>
        <div className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">$12,345</div>
        <div className="text-xs text-green-600 font-medium">+12.5%</div>
      </div>
    ),
    tags: ['statistics', 'metrics', 'data', 'analytics', 'dashboard'],
    isPopular: true,
    complexity: 'moderate'
  },
  {
    value: 'chip',
    label: 'Chip',
    description: 'Compact element for tags, filters, and removable selections',
    category: 'display',
    icon: <X className="w-5 h-5" />,
    preview: (
      <div className="flex flex-wrap gap-2">
        <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-2xl text-xs gap-2 shadow-md hover:shadow-lg transition-all duration-200 border border-blue-200/50">
          React
          <div className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors duration-200">
            <X className="w-2 h-2 text-blue-600" />
          </div>
        </div>
        <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-100 to-teal-100 text-green-800 rounded-2xl text-xs gap-2 shadow-md hover:shadow-lg transition-all duration-200 border border-green-200/50">
          TypeScript
          <div className="w-4 h-4 bg-green-500/20 rounded-full flex items-center justify-center hover:bg-green-500/30 transition-colors duration-200">
            <X className="w-2 h-2 text-green-600" />
          </div>
        </div>
        <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-2xl text-xs shadow-md border border-purple-200/50">
          Design
        </div>
      </div>
    ),
    tags: ['tag', 'filter', 'label', 'small', 'removable'],
    complexity: 'simple'
  },
  {
    value: 'badge',
    label: 'Badge',
    description: 'Small status indicator for notifications and counts',
    category: 'display',
    icon: <AlertCircle className="w-5 h-5" />,
    preview: (
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 bg-gray-100 rounded-2xl shadow-sm" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg ring-2 ring-white animate-pulse">
            3
          </div>
        </div>
        <div className="flex gap-2">
          <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-xs font-medium shadow-lg">
            New
          </div>
          <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-xs font-medium shadow-lg">
            Pro
          </div>
        </div>
      </div>
    ),
    tags: ['notification', 'count', 'status', 'indicator', 'label'],
    complexity: 'simple'
  },
  {
    value: 'avatar',
    label: 'Avatar',
    description: 'User profile representation with images or initials',
    category: 'display',
    icon: <Circle className="w-5 h-5" />,
    preview: (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-xs font-bold shadow-lg ring-3 ring-blue-100/50 transform hover:scale-110 transition-all duration-200">
          JD
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-lg ring-3 ring-green-100/50 transform hover:scale-110 transition-all duration-200" />
        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl shadow-lg ring-3 ring-pink-100/50 transform hover:scale-110 transition-all duration-200" />
      </div>
    ),
    tags: ['user', 'profile', 'picture', 'initials', 'person'],
    complexity: 'simple'
  },
  {
    value: 'progress',
    label: 'Progress Bar',
    description: 'Visual indicator showing task completion or loading states',
    category: 'display',
    icon: <Sliders className="w-5 h-5" />,
    preview: (
      <div className="space-y-4 w-full">
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium">Progress</span>
            <span>75%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-sm animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-2">
            <span className="font-medium text-green-600">Complete</span>
            <span>100%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="w-full h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm" />
          </div>
        </div>
      </div>
    ),
    tags: ['progress', 'loading', 'completion', 'status', 'bar'],
    complexity: 'simple'
  },
  {
    value: 'skeleton',
    label: 'Skeleton Loader',
    description: 'Placeholder content while loading actual data',
    category: 'display',
    icon: <Loader className="w-5 h-5" />,
    preview: (
      <div className="space-y-4 w-full animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-2xl" />
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-gray-300 rounded-lg w-1/3" />
            <div className="h-2 bg-gray-200 rounded-lg w-2/3" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-300 rounded-lg w-full" />
          <div className="h-2 bg-gray-300 rounded-lg w-4/5" />
          <div className="h-2 bg-gray-200 rounded-lg w-3/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-300 rounded-xl w-20" />
          <div className="h-8 bg-gray-200 rounded-xl w-16" />
        </div>
      </div>
    ),
    tags: ['loading', 'placeholder', 'skeleton', 'shimmer'],
    complexity: 'simple'
  },
  {
    value: 'data-table',
    label: 'Data Table',
    description: 'Structured table with sorting, filtering, and pagination',
    category: 'display',
    icon: <Table className="w-5 h-5" />,
    preview: (
      <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-lg min-w-[200px]">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <div className="text-xs font-medium text-gray-700">Users</div>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="w-4 h-4 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {[1, 2, 3].map(i => (
            <div key={i} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg" />
              <div className="flex-1">
                <div className="h-2 bg-gray-800 rounded w-16 mb-1" />
                <div className="h-1.5 bg-gray-400 rounded w-20" />
              </div>
              <div className="w-12 h-4 bg-green-100 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    ),
    tags: ['table', 'data', 'grid', 'sorting', 'pagination'],
    complexity: 'advanced'
  },
  {
    value: 'image-gallery',
    label: 'Image Gallery',
    description: 'Responsive grid layout for displaying images',
    category: 'display',
    icon: <Image className="w-5 h-5" />,
    preview: (
      <div className="grid grid-cols-3 gap-2 w-full">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={`bg-gradient-to-br rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${
            i === 1 ? 'from-red-400 to-pink-500 col-span-2 h-20' :
            i === 2 ? 'from-blue-400 to-purple-500 h-20' :
            i === 3 ? 'from-green-400 to-teal-500 h-16' :
            i === 4 ? 'from-yellow-400 to-orange-500 h-16' :
            i === 5 ? 'from-purple-400 to-indigo-500 col-span-2 h-16' :
            'from-indigo-400 to-blue-500 h-16'
          }`} />
        ))}
      </div>
    ),
    tags: ['images', 'gallery', 'grid', 'photos', 'media'],
    complexity: 'moderate'
  },
  {
    value: 'timeline',
    label: 'Timeline',
    description: 'Chronological display of events and milestones',
    category: 'display',
    icon: <Clock className="w-5 h-5" />,
    preview: (
      <div className="space-y-4 min-w-[180px]">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full shadow-lg ring-2 ring-white ${
                i === 1 ? 'bg-gradient-to-br from-blue-500 to-purple-600' :
                i === 2 ? 'bg-gradient-to-br from-green-500 to-teal-600' :
                'bg-gray-300'
              }`} />
              {i < 3 && <div className="w-0.5 h-8 bg-gray-200 mt-2" />}
            </div>
            <div className="pb-8">
              <div className="text-xs font-medium mb-1">
                {i === 1 ? 'Project Started' : i === 2 ? 'First Release' : 'Future Update'}
              </div>
              <div className="text-xs text-gray-500 mb-2">
                {i === 1 ? '2 hours ago' : i === 2 ? '1 day ago' : 'Coming soon'}
              </div>
              <div className="text-xs text-gray-600">
                {i === 1 ? 'Initial setup and configuration' : 
                 i === 2 ? 'Beta version deployed to staging' :
                 'Planning phase for next iteration'}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    tags: ['timeline', 'events', 'chronological', 'history', 'steps'],
    complexity: 'moderate'
  },

  // ========== FEEDBACK & ALERTS ==========
  {
    value: 'alert',
    label: 'Alert',
    description: 'Important messages and contextual notifications for users',
    category: 'feedback',
    icon: <AlertCircle className="w-5 h-5" />,
    preview: (
      <div className="space-y-3 w-full">
        <div className="p-3 rounded-2xl border bg-blue-50 border-blue-200 text-blue-800 shadow-md">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-blue-500 rounded-lg">
              <AlertCircle className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium mb-1">Info: Update available</div>
              <div className="text-xs opacity-80">A new version is now available for download</div>
            </div>
          </div>
        </div>
        <div className="p-3 rounded-2xl border bg-red-50 border-red-200 text-red-800 shadow-md">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-red-500 rounded-lg">
              <X className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-xs font-medium">Error: Please try again</div>
            </div>
          </div>
        </div>
      </div>
    ),
    tags: ['message', 'warning', '+3'],
    isPopular: true,
    complexity: 'simple'
  },
  {
    value: 'toast',
    label: 'Toast Notification',
    description: 'Temporary popup messages for user feedback',
    category: 'feedback',
    icon: <Bell className="w-5 h-5" />,
    preview: (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xl min-w-[180px] transform animate-bounce-soft">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 mb-1">Success!</div>
            <div className="text-xs text-gray-600">Your changes have been saved</div>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
    tags: ['notification', 'popup', 'temporary', 'feedback', 'message'],
    isPopular: true,
    complexity: 'moderate'
  },
  {
    value: 'modal',
    label: 'Modal Dialog',
    description: 'Overlay window for focused interactions and confirmations',
    category: 'feedback',
    icon: <Square className="w-5 h-5" />,
    preview: (
      <div className="relative">
        <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 min-w-[160px]">
          <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-200 transform scale-95 hover:scale-100 transition-transform duration-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-2">Confirm Delete</div>
              <div className="text-xs text-gray-600 mb-4">This action cannot be undone</div>
              <div className="flex gap-2">
                <div className="flex-1 py-2 px-3 bg-gray-100 rounded-xl text-xs">Cancel</div>
                <div className="flex-1 py-2 px-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl text-xs">Delete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    tags: ['dialog', 'overlay', 'popup', 'modal', 'confirmation'],
    complexity: 'moderate'
  },
  {
    value: 'tooltip',
    label: 'Tooltip',
    description: 'Contextual information on hover or focus',
    category: 'feedback',
    icon: <MessageCircle className="w-5 h-5" />,
    preview: (
      <div className="relative flex items-center justify-center min-w-[120px] min-h-[60px]">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-lg animate-fade-in">
          Helpful tooltip text
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </div>
    ),
    tags: ['help', 'context', 'hover', 'information', 'hint'],
    complexity: 'simple'
  },
  {
    value: 'loading-spinner',
    label: 'Loading Spinner',
    description: 'Animated indicator for loading states and processes',
    category: 'feedback',
    icon: <Loader className="w-5 h-5" />,
    preview: (
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className="w-2 h-6 bg-gradient-to-t from-blue-400 to-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <div className="w-6 h-6 relative">
          <div className="absolute inset-0 border-2 border-purple-200 rounded-full animate-ping" />
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full animate-bounce" />
        </div>
      </div>
    ),
    tags: ['loading', 'spinner', 'animation', 'waiting', 'progress'],
    complexity: 'simple'
  },
  {
    value: 'banner',
    label: 'Banner',
    description: 'Prominent message bar for announcements and updates',
    category: 'feedback',
    icon: <AlertCircle className="w-5 h-5" />,
    preview: (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-4 shadow-lg min-w-[180px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium">New Feature!</div>
              <div className="text-xs opacity-90">Check out our latest update</div>
            </div>
          </div>
          <button className="text-white/80 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    ),
    tags: ['announcement', 'banner', 'message', 'prominent', 'notification'],
    complexity: 'simple'
  },
  {
    value: 'empty-state',
    label: 'Empty State',
    description: 'Placeholder for when no content or data is available',
    category: 'feedback',
    icon: <Circle className="w-5 h-5" />,
    preview: (
      <div className="text-center py-8 min-w-[160px]">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Folder className="w-8 h-8 text-gray-400" />
        </div>
        <div className="text-sm font-medium text-gray-700 mb-2">No items found</div>
        <div className="text-xs text-gray-500 mb-4">Get started by creating your first item</div>
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-xs font-medium shadow-lg">
          <Plus className="w-3 h-3 mr-1" />
          Add Item
        </div>
      </div>
    ),
    tags: ['empty', 'placeholder', 'no-content', 'getting-started'],
    complexity: 'simple'
  },

  // ========== NAVIGATION ==========
  {
    value: 'breadcrumb',
    label: 'Breadcrumb',
    description: 'Navigation path showing user location in site hierarchy',
    category: 'navigation',
    icon: <ChevronRight className="w-5 h-5" />,
    preview: (
      <div className="flex items-center gap-2 text-xs">
        <div className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">Home</div>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <div className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">Products</div>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <div className="text-gray-600 font-medium">Current Page</div>
      </div>
    ),
    tags: ['navigation', 'path', 'hierarchy', 'location', 'breadcrumb'],
    complexity: 'simple'
  },
  {
    value: 'tabs',
    label: 'Tabs',
    description: 'Horizontal navigation between related content sections',
    category: 'navigation',
    icon: <Navigation className="w-5 h-5" />,
    preview: (
      <div className="min-w-[180px]">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-2xl mb-4">
          <div className="flex-1 text-center py-2 px-4 bg-white text-blue-600 font-medium text-xs rounded-xl shadow-sm">
            Overview
          </div>
          <div className="flex-1 text-center py-2 px-4 text-gray-600 font-medium text-xs hover:text-gray-800 transition-colors">
            Details
          </div>
          <div className="flex-1 text-center py-2 px-4 text-gray-600 font-medium text-xs hover:text-gray-800 transition-colors">
            Settings
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-2xl">
          <div className="text-xs text-gray-600">Overview content would appear here</div>
        </div>
      </div>
    ),
    tags: ['navigation', 'sections', '+4'],
    isPopular: true,
    complexity: 'moderate'
  },
  {
    value: 'pagination',
    label: 'Pagination',
    description: 'Navigate through multiple pages of content',
    category: 'navigation',
    icon: <ChevronRight className="w-5 h-5" />,
    preview: (
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div className="flex gap-1">
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-medium shadow-lg">1</div>
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors cursor-pointer">2</div>
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors cursor-pointer">3</div>
          <div className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 text-xs">...</div>
          <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium transition-colors cursor-pointer">10</div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    ),
    tags: ['pages', 'navigation', 'paging', 'numbers', 'browse'],
    complexity: 'moderate'
  },
  {
    value: 'nav-menu',
    label: 'Navigation Menu',
    description: 'Primary navigation with links and sections',
    category: 'navigation',
    icon: <Menu className="w-5 h-5" />,
    preview: (
      <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-lg min-w-[160px]">
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-xl">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
            <Users className="w-4 h-4" />
            <span className="text-sm">Users</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </div>
          <div className="border-t border-gray-100 my-2" />
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
            <Code className="w-4 h-4" />
            <span className="text-sm">API</span>
          </div>
        </div>
      </div>
    ),
    tags: ['menu', 'navigation', 'links', 'sections', 'primary'],
    complexity: 'moderate'
  },
  {
    value: 'sidebar',
    label: 'Sidebar Navigation',
    description: 'Vertical navigation panel with collapsible sections',
    category: 'navigation',
    icon: <Layers className="w-5 h-5" />,
    preview: (
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-2xl p-4 min-w-[140px] shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Code className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm font-bold">App</div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-xl border border-blue-500/30">
            <Home className="w-4 h-4" />
            <span className="text-xs font-medium">Home</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-all">
            <BarChart3 className="w-4 h-4" />
            <span className="text-xs">Analytics</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl cursor-pointer transition-all">
            <Users className="w-4 h-4" />
            <span className="text-xs">Team</span>
          </div>
        </div>
      </div>
    ),
    tags: ['sidebar', 'vertical', 'navigation', 'collapsible', 'panel'],
    complexity: 'advanced'
  },
  {
    value: 'stepper',
    label: 'Step Indicator',
    description: 'Progress indicator for multi-step processes',
    category: 'navigation',
    icon: <ArrowUp className="w-5 h-5" />,
    preview: (
      <div className="flex items-center justify-center min-w-[180px]">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-green-100">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="h-0.5 w-8 bg-green-500" />
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-blue-100">
              2
            </div>
            <div className="h-0.5 w-8 bg-gray-300" />
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
            3
          </div>
        </div>
      </div>
    ),
    tags: ['steps', 'progress', 'wizard', 'process', 'indicator'],
    complexity: 'moderate'
  },
  {
    value: 'dropdown',
    label: 'Dropdown Menu',
    description: 'Context menu with actions and options',
    category: 'navigation',
    icon: <ChevronDown className="w-5 h-5" />,
    preview: (
      <div className="relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
          Actions
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl min-w-[140px] overflow-hidden z-50">
          <div className="p-2 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <Edit className="w-4 h-4" />
              <span className="text-sm">Edit</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </div>
            <div className="border-t border-gray-100 my-1" />
            <div className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-colors">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Delete</span>
            </div>
          </div>
        </div>
      </div>
    ),
    tags: ['menu', 'context', 'actions', 'options', 'dropdown'],
    complexity: 'moderate'
  },

  // ========== LAYOUT ==========
  {
    value: 'grid',
    label: 'Grid Layout',
    description: 'Responsive grid system for organizing content',
    category: 'layout',
    icon: <Grid3X3 className="w-5 h-5" />,
    preview: (
      <div className="grid grid-cols-3 gap-2 w-full">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={`rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 ${
            i === 1 ? 'bg-gradient-to-br from-blue-400 to-purple-500 col-span-2 h-12' :
            i === 2 ? 'bg-gradient-to-br from-green-400 to-teal-500 h-12' :
            i === 3 ? 'bg-gradient-to-br from-red-400 to-pink-500 h-10' :
            i === 4 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 h-10' :
            i === 5 ? 'bg-gradient-to-br from-purple-400 to-indigo-500 h-10' :
            'bg-gradient-to-br from-indigo-400 to-blue-500 h-10'
          }`} />
        ))}
      </div>
    ),
    tags: ['grid', 'layout', 'responsive', 'columns', 'rows'],
    complexity: 'simple'
  },
  {
    value: 'container',
    label: 'Container',
    description: 'Flexible wrapper with padding and max-width constraints',
    category: 'layout',
    icon: <Square className="w-5 h-5" />,
    preview: (
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 min-w-[160px]">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-600 mb-2">Container</div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-400 rounded w-3/4 mx-auto" />
            <div className="h-2 bg-gray-400 rounded w-1/2 mx-auto" />
            <div className="h-2 bg-gray-400 rounded w-2/3 mx-auto" />
          </div>
        </div>
      </div>
    ),
    tags: ['container', 'wrapper', 'padding', 'max-width', 'centered'],
    complexity: 'simple'
  },
  {
    value: 'flex-layout',
    label: 'Flex Layout',
    description: 'Flexible box layout for dynamic content arrangement',
    category: 'layout',
    icon: <Maximize className="w-5 h-5" />,
    preview: (
      <div className="space-y-3 w-full">
        <div className="flex gap-2">
          <div className="flex-1 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl shadow-lg" />
          <div className="w-16 h-8 bg-gradient-to-r from-green-400 to-teal-500 rounded-xl shadow-lg" />
        </div>
        <div className="flex gap-2">
          <div className="w-12 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl shadow-lg" />
          <div className="flex-1 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg" />
          <div className="w-20 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-xl shadow-lg" />
        </div>
      </div>
    ),
    tags: ['flex', 'flexible', 'responsive', 'alignment', 'distribution'],
    complexity: 'simple'
  },
  {
    value: 'header',
    label: 'Header',
    description: 'Top navigation bar with branding and primary actions',
    category: 'layout',
    icon: <ArrowUp className="w-5 h-5" />,
    preview: (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg min-w-[180px] overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg" />
            <div className="text-sm font-bold text-gray-900">Brand</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded-lg" />
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-teal-500 rounded-full" />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50">
          <div className="h-2 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    ),
    tags: ['header', 'navigation', 'branding', 'top-bar', 'primary'],
    complexity: 'moderate'
  },
  {
    value: 'footer',
    label: 'Footer',
    description: 'Bottom section with links, copyright, and secondary info',
    category: 'layout',
    icon: <ArrowUp className="w-5 h-5 rotate-180" />,
    preview: (
      <div className="bg-gray-900 text-white rounded-2xl p-4 min-w-[180px] shadow-2xl">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="h-2 bg-white/80 rounded w-2/3 mb-2" />
            <div className="space-y-1">
              <div className="h-1 bg-white/40 rounded w-3/4" />
              <div className="h-1 bg-white/40 rounded w-1/2" />
              <div className="h-1 bg-white/40 rounded w-2/3" />
            </div>
          </div>
          <div>
            <div className="h-2 bg-white/80 rounded w-1/2 mb-2" />
            <div className="space-y-1">
              <div className="h-1 bg-white/40 rounded w-3/4" />
              <div className="h-1 bg-white/40 rounded w-5/6" />
            </div>
          </div>
          <div>
            <div className="h-2 bg-white/80 rounded w-3/4 mb-2" />
            <div className="space-y-1">
              <div className="h-1 bg-white/40 rounded w-1/2" />
              <div className="h-1 bg-white/40 rounded w-2/3" />
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-3">
          <div className="h-1 bg-white/30 rounded w-1/3" />
        </div>
      </div>
    ),
    tags: ['footer', 'bottom', 'links', 'copyright', 'secondary'],
    complexity: 'moderate'
  },
  {
    value: 'section',
    label: 'Section',
    description: 'Content section with proper spacing and typography',
    category: 'layout',
    icon: <Square className="w-5 h-5" />,
    preview: (
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg min-w-[160px]">
        <div className="mb-4">
          <div className="h-3 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg w-1/2 mb-2" />
          <div className="h-1 bg-gray-300 rounded w-3/4" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-1 bg-gray-400 rounded w-full" />
          <div className="h-1 bg-gray-400 rounded w-5/6" />
          <div className="h-1 bg-gray-400 rounded w-4/5" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl w-16 shadow-md" />
          <div className="h-6 bg-gray-200 rounded-xl w-12" />
        </div>
      </div>
    ),
    tags: ['section', 'content', 'spacing', 'typography', 'block'],
    complexity: 'simple'
  },
  {
    value: 'divider',
    label: 'Divider',
    description: 'Visual separator between content sections',
    category: 'layout',
    icon: <X className="w-5 h-5 rotate-45" />,
    preview: (
      <div className="space-y-4 w-full">
        <div className="h-2 bg-gray-300 rounded-lg w-2/3" />
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="h-2 bg-gray-300 rounded-lg w-3/4" />
        <div className="flex items-center gap-4">
          <div className="h-px bg-gray-300 flex-1" />
          <div className="text-xs text-gray-500 bg-white px-2">OR</div>
          <div className="h-px bg-gray-300 flex-1" />
        </div>
        <div className="h-2 bg-gray-300 rounded-lg w-1/2" />
      </div>
    ),
    tags: ['divider', 'separator', 'line', 'break', 'section'],
    complexity: 'simple'
  },

  // ========== INTERACTIVE & MODERN ==========
  {
    value: 'accordion',
    label: 'Accordion',
    description: 'Collapsible content sections for organized information',
    category: 'interactive',
    icon: <ChevronDown className="w-5 h-5" />,
    preview: (
      <div className="space-y-2 min-w-[180px]">
        <div className="border border-gray-200 rounded-2xl bg-white shadow-sm">
          <div className="p-4 border-b border-gray-100 bg-blue-50 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Section 1 (Expanded)</span>
            <ChevronUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="p-4 text-xs text-gray-600">
            This section is currently expanded and shows the content
          </div>
        </div>
        <div className="border border-gray-200 rounded-2xl bg-white shadow-sm">
          <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium">Section 2</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    ),
    tags: ['collapsible', 'content', 'sections', 'organized', 'information'],
    isPopular: true,
    complexity: 'moderate'
  },
  {
    value: 'carousel',
    label: 'Carousel',
    description: 'Scrollable content slider with navigation controls',
    category: 'interactive',
    icon: <ChevronRight className="w-5 h-5" />,
    preview: (
      <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg min-w-[160px]">
        <div className="flex">
          <div className="w-full bg-gradient-to-br from-blue-500 to-purple-600 h-24 flex items-center justify-center text-white text-xs font-medium shadow-lg">
            Slide 1
          </div>
        </div>
        <div className="absolute inset-y-0 left-2 flex items-center">
          <button className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
            <ChevronLeft className="w-3 h-3 text-gray-600" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button className="w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors">
            <ChevronRight className="w-3 h-3 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
          <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
          <div className="w-2 h-2 bg-white/50 rounded-full" />
          <div className="w-2 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    ),
    tags: ['slider', 'carousel', 'navigation', 'content', 'scrollable'],
    complexity: 'advanced'
  },
  {
    value: 'collapsible',
    label: 'Collapsible',
    description: 'Expandable content area with toggle functionality',
    category: 'interactive',
    icon: <ChevronDown className="w-5 h-5" />,
    preview: (
      <div className="space-y-3 min-w-[160px]">
        <div className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 flex items-center justify-between cursor-pointer hover:from-purple-100 hover:to-pink-100 transition-colors">
            <span className="text-sm font-medium text-purple-900">Show Details</span>
            <ChevronUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="p-4 bg-white">
            <div className="text-xs text-gray-600 mb-2">Additional information:</div>
            <div className="space-y-1">
              <div className="h-1 bg-gray-200 rounded w-full" />
              <div className="h-1 bg-gray-200 rounded w-3/4" />
              <div className="h-1 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-2xl bg-white shadow-sm">
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
            <span className="text-sm font-medium">More Options</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    ),
    tags: ['collapsible', 'expandable', 'toggle', 'content', 'space-saving'],
    complexity: 'moderate'
  },
  {
    value: 'command-palette',
    label: 'Command Palette',
    description: 'Quick action search interface with keyboard shortcuts',
    category: 'modern',
    icon: <Terminal className="w-5 h-5" />,
    preview: (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl min-w-[180px] overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-gray-400" />
            <div className="text-sm text-gray-600">Type a command...</div>
          </div>
        </div>
        <div className="max-h-48 overflow-hidden">
          <div className="p-2 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-xl">
              <Plus className="w-4 h-4" />
              <span className="text-sm flex-1">Create New</span>
              <div className="text-xs bg-blue-100 px-2 py-1 rounded font-mono">⌘N</div>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-sm flex-1">Search Files</span>
              <div className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">⌘F</div>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm flex-1">Open Settings</span>
              <div className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">⌘,</div>
            </div>
          </div>
        </div>
      </div>
    ),
    tags: ['command', 'search', 'shortcuts', 'quick-actions', 'keyboard'],
    isNew: true,
    complexity: 'advanced'
  },
  {
    value: 'ai-chat-interface',
    label: 'AI Chat Interface',
    description: 'Modern AI chat interface with typing indicators and smart suggestions',
    category: 'modern',
    icon: <MessageCircle className="w-5 h-5" />,
    preview: (
      <div className="min-w-[180px] bg-white rounded-3xl shadow-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-medium">AI Assistant</div>
            <div className="text-xs text-green-600">● Online</div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="bg-gray-100 rounded-2xl p-3 mr-8">
            <div className="text-xs text-gray-600">I'll suggest focusing on content and spacing. Here are some tips...</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-3 ml-8">
            <div className="text-xs">How can I improve my design?</div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 text-xs text-gray-500">Type your message...</div>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <ArrowUp className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    ),
    tags: ['ai', 'chat', 'conversation', 'modern', 'typing'],
    isNew: true,
    isPopular: true,
    complexity: 'advanced'
  },
  {
    value: 'floating-action-button',
    label: 'Floating Action Button',
    description: 'Prominent circular button for primary actions',
    category: 'interactive',
    icon: <Plus className="w-5 h-5" />,
    preview: (
      <div className="relative min-w-[120px] min-h-[80px] flex items-end justify-end">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:shadow-3xl hover:scale-110 transition-all duration-300 animate-float">
          <Plus className="w-6 h-6 text-white" />
        </div>
        <div className="absolute bottom-16 right-2 bg-gray-900 text-white px-3 py-2 rounded-xl text-xs whitespace-nowrap shadow-lg opacity-0 hover:opacity-100 transition-opacity">
          Add new item
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      </div>
    ),
    tags: ['floating', 'action', 'primary', 'circular', 'prominent'],
    complexity: 'simple'
  },
  {
    value: 'context-menu',
    label: 'Context Menu',
    description: 'Right-click menu with contextual actions',
    category: 'interactive',
    icon: <MoreHorizontal className="w-5 h-5" />,
    preview: (
      <div className="relative">
        <div className="w-24 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="text-xs text-gray-600">Right Click</div>
        </div>
        <div className="absolute top-2 left-28 bg-white border border-gray-200 rounded-2xl shadow-2xl min-w-[120px] overflow-hidden z-50">
          <div className="p-2 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl cursor-pointer transition-colors">
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl cursor-pointer transition-colors">
              <Edit className="w-4 h-4" />
              <span className="text-sm">Edit</span>
            </div>
            <div className="border-t border-gray-100 my-1" />
            <div className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl cursor-pointer transition-colors">
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Delete</span>
            </div>
          </div>
        </div>
      </div>
    ),
    tags: ['context', 'right-click', 'menu', 'actions', 'contextual'],
    complexity: 'moderate'
  },
  {
    value: 'drag-drop',
    label: 'Drag & Drop',
    description: 'Interactive drag and drop interface for file uploads',
    category: 'interactive',
    icon: <Upload className="w-5 h-5" />,
    preview: (
      <div className="space-y-3 w-full">
        <div className="border-2 border-dashed border-blue-300 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-100/50 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div className="text-sm font-medium text-blue-700 mb-1">Drop files here</div>
          <div className="text-xs text-blue-500">or click to browse</div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">document.pdf</div>
            <div className="text-xs text-gray-500">2.4 MB</div>
          </div>
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        </div>
      </div>
    ),
    tags: ['drag', 'drop', 'upload', 'files', 'interactive'],
    complexity: 'advanced'
  }
];
import React, { useState } from 'react';
import { DesignSystemComponent, FigmaExportOptions } from './types';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { 
  Figma, 
  Download, 
  Settings, 
  Layers, 
  Eye, 
  Palette, 
  FileText,
  Sparkles,
  Zap,
  Check,
  AlertCircle,
  ArrowRight,
  Clock,
  Users,
  Globe,
  Moon
} from 'lucide-react';

interface FigmaExporterProps {
  components: DesignSystemComponent[];
  onExport: (options: FigmaExportOptions) => Promise<void>;
}

export const FigmaExporter: React.FC<FigmaExporterProps> = ({
  components,
  onExport
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  const [options, setOptions] = useState<FigmaExportOptions>({
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
  });

  const handleExport = async () => {
    if (components.length === 0) {
      toast.error('No components to export');
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      await onExport(options);
      setExportProgress(100);
      
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        setIsOpen(false);
      }, 1000);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please try again.');
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const totalVariants = components.reduce((sum, comp) => sum + comp.variants.length, 0);
  const totalStates = components.reduce((sum, comp) => 
    sum + comp.variants.reduce((vSum, variant) => vSum + variant.states.length, 0), 0
  );

  if (components.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="h-8 px-3 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
        >
          <Figma className="w-3 h-3 mr-1" />
          Export to Figma
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Figma className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Export to Figma
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Configure your design system export settings
              </p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 pb-6">
            {/* Export Summary */}
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Export Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">{components.length}</div>
                    <div className="text-xs text-gray-600">Components</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">{totalVariants}</div>
                    <div className="text-xs text-gray-600">Variants</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900">{totalStates}</div>
                    <div className="text-xs text-gray-600">States</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* Export Options */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Export Options
              </h3>

              <div className="space-y-4">
                {/* Include Options */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Include in Export</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Variants</span>
                      </div>
                      <Switch
                        checked={options.includeVariants}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeVariants: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">States</span>
                      </div>
                      <Switch
                        checked={options.includeStates}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeStates: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Dark Mode</span>
                      </div>
                      <Switch
                        checked={options.includeDarkMode}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeDarkMode: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">Documentation</span>
                      </div>
                      <Switch
                        checked={options.includeDocumentation}
                        onCheckedChange={(checked) => setOptions(prev => ({ ...prev, includeDocumentation: checked }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Method */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Organization Method</label>
                  <Select 
                    value={options.organizationMethod} 
                    onValueChange={(value: 'component' | 'category' | 'alphabetical') => 
                      setOptions(prev => ({ ...prev, organizationMethod: value }))
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="component">By Component Type</SelectItem>
                      <SelectItem value="category">By Category</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Export Format */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Export Format</label>
                  <Select 
                    value={options.exportFormat} 
                    onValueChange={(value: 'components' | 'frames' | 'pages') => 
                      setOptions(prev => ({ ...prev, exportFormat: value }))
                    }
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="components">As Components</SelectItem>
                      <SelectItem value="frames">As Frames</SelectItem>
                      <SelectItem value="pages">Separate Pages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* 2025 Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                2025 Features
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Modern Effects & Shadows</span>
                  </div>
                  <Switch
                    checked={options.include2025Effects}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, include2025Effects: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 border border-purple-200 rounded-lg bg-purple-50">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Spatial Organization</span>
                  </div>
                  <Switch
                    checked={options.spatialOrganization}
                    onCheckedChange={(checked) => setOptions(prev => ({ ...prev, spatialOrganization: checked }))}
                  />
                </div>
              </div>
            </div>

            {/* Export Progress */}
            {isExporting && (
              <Card className="border border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-900">Exporting Design System</span>
                      <span className="text-sm text-blue-700">{Math.round(exportProgress)}%</span>
                    </div>
                    <Progress value={exportProgress} className="h-2" />
                    <div className="flex items-center gap-2 text-xs text-blue-700">
                      <Clock className="w-3 h-3" />
                      <span>
                        {exportProgress < 30 && "Preparing components..."}
                        {exportProgress >= 30 && exportProgress < 60 && "Generating variants..."}
                        {exportProgress >= 60 && exportProgress < 90 && "Creating documentation..."}
                        {exportProgress >= 90 && "Finalizing export..."}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Export will create {components.length} component{components.length !== 1 ? 's' : ''} in Figma
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                disabled={isExporting}
                className="h-9 px-4"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleExport}
                disabled={isExporting}
                className="h-9 px-6 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isExporting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Exporting...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Export to Figma
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
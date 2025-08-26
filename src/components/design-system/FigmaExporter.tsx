import React, { useState } from 'react';
import { DesignSystemComponent, FigmaExportOptions } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Figma, Download, Settings, CheckCircle, AlertCircle } from 'lucide-react';

interface FigmaExporterProps {
  components: DesignSystemComponent[];
  onExport: (options: FigmaExportOptions) => Promise<void>;
}

export const FigmaExporter: React.FC<FigmaExporterProps> = ({
  components,
  onExport
}) => {
  const [exportOptions, setExportOptions] = useState<FigmaExportOptions>({
    includeVariants: true,
    includeStates: true,
    organizationMethod: 'component',
    frameSpacing: 100,
    includeDarkMode: false,
    includeDocumentation: true
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<'idle' | 'exporting' | 'success' | 'error'>('idle');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const updateOption = <K extends keyof FigmaExportOptions>(
    key: K, 
    value: FigmaExportOptions[K]
  ) => {
    setExportOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportStatus('exporting');
    setExportProgress(0);

    try {
      // Simulate export progress
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await onExport(exportOptions);
      
      clearInterval(progressInterval);
      setExportProgress(100);
      setExportStatus('success');
      
      // Reset after a delay
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus('idle');
        setExportProgress(0);
        setIsExportDialogOpen(false);
      }, 2000);
    } catch (error) {
      setExportStatus('error');
      setIsExporting(false);
      console.error('Export failed:', error);
    }
  };

  const getExportSummary = () => {
    const totalVariants = components.reduce((sum, comp) => sum + comp.variants.length, 0);
    const totalStates = components.reduce((sum, comp) => 
      sum + comp.variants.reduce((variantSum, variant) => variantSum + variant.states.length, 0), 0
    );

    let itemCount = components.length;
    if (exportOptions.includeVariants) {
      itemCount = totalVariants;
      if (exportOptions.includeStates) {
        itemCount = totalStates;
      }
    }

    return {
      components: components.length,
      variants: totalVariants,
      states: totalStates,
      itemsToExport: itemCount
    };
  };

  const summary = getExportSummary();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Figma className="w-4 h-4" />
            Export to Figma
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{summary.components}</div>
              <div className="text-xs text-muted-foreground">Components</div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="text-2xl font-bold text-primary">{summary.itemsToExport}</div>
              <div className="text-xs text-muted-foreground">Items to Export</div>
            </div>
          </div>

          <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" disabled={components.length === 0}>
                <Settings className="w-4 h-4 mr-2" />
                Configure Export
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Export Configuration</DialogTitle>
              </DialogHeader>
              
              {exportStatus === 'exporting' ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <Figma className="w-12 h-12 mx-auto text-primary animate-pulse" />
                    <div className="mt-2 font-medium">Exporting to Figma...</div>
                    <div className="text-sm text-muted-foreground">
                      Generating {summary.itemsToExport} items
                    </div>
                  </div>
                  <Progress value={exportProgress} className="w-full" />
                  <div className="text-xs text-center text-muted-foreground">
                    {exportProgress}% complete
                  </div>
                </div>
              ) : exportStatus === 'success' ? (
                <div className="text-center space-y-4">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
                  <div>
                    <div className="font-medium text-green-700">Export Successful!</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Your design system has been exported to Figma
                    </div>
                  </div>
                </div>
              ) : exportStatus === 'error' ? (
                <div className="text-center space-y-4">
                  <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
                  <div>
                    <div className="font-medium text-red-700">Export Failed</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      There was an error exporting your design system
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setExportStatus('idle')}>
                    Try Again
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Content Options</Label>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Include Variants</Label>
                          <div className="text-xs text-muted-foreground">
                            Export all component variants
                          </div>
                        </div>
                        <Switch
                          checked={exportOptions.includeVariants}
                          onCheckedChange={(checked) => updateOption('includeVariants', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Include States</Label>
                          <div className="text-xs text-muted-foreground">
                            Export all interaction states
                          </div>
                        </div>
                        <Switch
                          checked={exportOptions.includeStates}
                          onCheckedChange={(checked) => updateOption('includeStates', checked)}
                          disabled={!exportOptions.includeVariants}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Include Documentation</Label>
                          <div className="text-xs text-muted-foreground">
                            Add usage notes and descriptions
                          </div>
                        </div>
                        <Switch
                          checked={exportOptions.includeDocumentation}
                          onCheckedChange={(checked) => updateOption('includeDocumentation', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-sm">Include Dark Mode</Label>
                          <div className="text-xs text-muted-foreground">
                            Export dark theme variations
                          </div>
                        </div>
                        <Switch
                          checked={exportOptions.includeDarkMode}
                          onCheckedChange={(checked) => updateOption('includeDarkMode', checked)}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Organization</Label>
                      
                      <div>
                        <Label className="text-xs text-muted-foreground">Organization Method</Label>
                        <Select 
                          value={exportOptions.organizationMethod} 
                          onValueChange={(value: any) => updateOption('organizationMethod', value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="component">By Component</SelectItem>
                            <SelectItem value="variant">By Variant</SelectItem>
                            <SelectItem value="state">By State</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs text-muted-foreground">Frame Spacing</Label>
                        <div className="mt-2 space-y-2">
                          <Slider
                            value={[exportOptions.frameSpacing]}
                            onValueChange={([value]) => updateOption('frameSpacing', value)}
                            min={50}
                            max={300}
                            step={25}
                            className="w-full"
                          />
                          <div className="text-xs text-center text-muted-foreground">
                            {exportOptions.frameSpacing}px spacing
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Export Summary</Label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span>Components:</span>
                        <Badge variant="secondary">{summary.components}</Badge>
                      </div>
                      <div className="flex justify-between p-2 bg-muted rounded">
                        <span>Items:</span>
                        <Badge variant="secondary">{summary.itemsToExport}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleExport} className="flex-1" disabled={isExporting}>
                      <Download className="w-4 h-4 mr-2" />
                      Export to Figma
                    </Button>
                    <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};
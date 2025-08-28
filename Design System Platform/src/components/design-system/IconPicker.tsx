import React, { useState, useMemo } from 'react';
import { ComponentIcon } from './types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { 
  Search, X, Star, Heart, Home, User, Settings, Mail, Phone, Camera, Image, Video, Music, Play,
  Pause, Stop, SkipForward, SkipBack, Volume2, VolumeX, Download, Upload, Save, Edit, Trash2,
  Copy, Eye, EyeOff, Lock, Unlock, Shield, AlertCircle, CheckCircle, Info, HelpCircle, XCircle,
  Plus, Minus, Calendar, Clock, Bell, BellOff, Bookmark, FileText, File, Folder, Archive,
  Database, Server, Cloud, CloudDownload, CloudUpload, Wifi, WifiOff, Bluetooth, Battery,
  BatteryLow, Power, PowerOff, Zap, Sun, Moon, CloudRain, Thermometer, Wind, Compass, Map,
  MapPin, Navigation, Plane, Car, Train, Bus, Bike, Truck, Ship, Rocket, Globe, Target, Award,
  Trophy, Gift, ShoppingCart, ShoppingBag, CreditCard, Wallet, DollarSign, TrendingUp, TrendingDown,
  BarChart3, PieChart, Activity, Laptop, Monitor, Smartphone, Tablet, Watch, Headphones, Speaker,
  Mic, MicOff, Radio, Tv, Gamepad2, Paintbrush, Palette, Scissors, Ruler, Triangle, Square,
  Circle, Hexagon, Smile, ThumbsUp, ThumbsDown, MousePointer, Type, AlignLeft, AlignCenter,
  AlignRight, Bold, Italic, Underline, List, Hash, AtSign, ChevronUp, ChevronDown, ChevronLeft,
  ChevronRight, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Link, Move, RotateCw,
  FlipHorizontal, Maximize, ZoomIn, Layers, Layout, Grid3X3, ToggleLeft, MoreHorizontal, Menu
} from 'lucide-react';

interface IconPickerProps {
  selectedIcon?: ComponentIcon;
  onIconSelect: (icon: ComponentIcon | undefined) => void;
  onClose: () => void;
}

// Icon library organized by category
const iconLibrary = {
  popular: {
    name: 'Popular',
    icons: ['Star', 'Heart', 'Home', 'User', 'Settings', 'Search', 'Plus', 'X', 'CheckCircle', 'ArrowRight', 'Mail', 'Phone', 'Download', 'Upload', 'Play', 'Calendar', 'Clock', 'Bell', 'Shield', 'Eye']
  },
  interface: {
    name: 'Interface',
    icons: ['Menu', 'X', 'Plus', 'Minus', 'Settings', 'Search', 'Grid3X3', 'List', 'Layout', 'MoreHorizontal', 'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ExternalLink', 'Link']
  },
  actions: {
    name: 'Actions',
    icons: ['Play', 'Pause', 'Stop', 'SkipForward', 'SkipBack', 'Download', 'Upload', 'Save', 'Edit', 'Trash2', 'Copy', 'Eye', 'EyeOff', 'Lock', 'Unlock', 'RotateCw']
  },
  communication: {
    name: 'Communication',
    icons: ['Mail', 'Phone', 'User', 'Heart', 'ThumbsUp', 'ThumbsDown', 'AtSign', 'Hash']
  },
  media: {
    name: 'Media',
    icons: ['Image', 'Video', 'Camera', 'Music', 'Headphones', 'Speaker', 'Mic', 'MicOff', 'Volume2', 'VolumeX']
  },
  files: {
    name: 'Files',
    icons: ['File', 'FileText', 'Folder', 'Archive', 'Database', 'Server', 'Cloud', 'CloudDownload', 'CloudUpload', 'Bookmark']
  },
  status: {
    name: 'Status',
    icons: ['CheckCircle', 'XCircle', 'AlertCircle', 'Info', 'HelpCircle', 'Bell', 'BellOff', 'Zap', 'Shield', 'Activity']
  },
  technology: {
    name: 'Technology',
    icons: ['Smartphone', 'Laptop', 'Monitor', 'Tablet', 'Watch', 'Wifi', 'WifiOff', 'Bluetooth', 'Battery', 'BatteryLow', 'Power', 'PowerOff']
  }
};

// Icon component mapping
const iconComponents: Record<string, React.ComponentType<any>> = {
  Star, Heart, Home, User, Settings, Search, Plus, X, CheckCircle, ArrowRight: ArrowRight,
  Mail, Phone, Download, Upload, Play, Calendar, Clock, Bell, Shield, Eye,
  Menu, Minus, Grid3X3, List, Layout, MoreHorizontal, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  ExternalLink, Link, Pause, Stop, SkipForward, SkipBack, Save, Edit, Trash2,
  Copy, EyeOff, Lock, Unlock, RotateCw, Image, Video, Camera, Music,
  Headphones, Speaker, Mic, MicOff, Volume2, VolumeX, File, FileText, Folder,
  Archive, Database, Server, Cloud, CloudDownload, CloudUpload, Bookmark,
  XCircle, AlertCircle, Info, HelpCircle, BellOff, Zap, Activity,
  Smartphone, Laptop, Monitor, Tablet, Watch, Wifi, WifiOff, Bluetooth,
  Battery, BatteryLow, Power, PowerOff, ThumbsUp, ThumbsDown, AtSign, Hash
};

export const IconPicker: React.FC<IconPickerProps> = ({
  selectedIcon,
  onIconSelect,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [iconSettings, setIconSettings] = useState<ComponentIcon>({
    name: selectedIcon?.name || '',
    size: selectedIcon?.size || 16,
    position: selectedIcon?.position || 'left',
    color: selectedIcon?.color || ''
  });

  const filteredIcons = useMemo(() => {
    const categoryIcons = iconLibrary[selectedCategory as keyof typeof iconLibrary]?.icons || [];
    
    if (!searchQuery) return categoryIcons;
    
    return categoryIcons.filter(icon =>
      icon.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedCategory]);

  const handleIconClick = (iconName: string) => {
    const newIcon: ComponentIcon = {
      ...iconSettings,
      name: iconName
    };
    setIconSettings(newIcon);
  };

  const handleApply = () => {
    if (iconSettings.name) {
      onIconSelect(iconSettings);
    } else {
      onIconSelect(undefined);
    }
    onClose();
  };

  const handleRemoveIcon = () => {
    onIconSelect(undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-4xl max-h-[90vh] mx-4">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Icon Library
          </CardTitle>
          <div className="flex items-center gap-2">
            {selectedIcon && (
              <Button variant="outline" size="sm" onClick={handleRemoveIcon}>
                Remove Icon
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="flex h-[600px]">
            {/* Icon Browser */}
            <div className="flex-1 flex flex-col border-r">
              {/* Search & Categories */}
              <div className="p-4 border-b space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search icons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid grid-cols-4 w-full h-auto p-1">
                    {Object.entries(iconLibrary).slice(0, 4).map(([key, category]) => (
                      <TabsTrigger key={key} value={key} className="text-xs p-2">
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <div className="mt-2">
                    <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                      <TabsList className="grid grid-cols-4 w-full h-auto p-1">
                        {Object.entries(iconLibrary).slice(4).map(([key, category]) => (
                          <TabsTrigger key={key} value={key} className="text-xs p-2">
                            {category.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </Tabs>
              </div>

              {/* Icon Grid */}
              <ScrollArea className="flex-1 p-4">
                <div className="grid grid-cols-8 gap-2">
                  {filteredIcons.map((iconName) => {
                    const IconComponent = iconComponents[iconName];
                    if (!IconComponent) return null;
                    
                    return (
                      <Button
                        key={iconName}
                        variant={iconSettings.name === iconName ? "default" : "ghost"}
                        size="sm"
                        className="h-12 w-12 p-0 flex flex-col gap-1"
                        onClick={() => handleIconClick(iconName)}
                        title={iconName}
                      >
                        <IconComponent className="w-5 h-5" />
                      </Button>
                    );
                  })}
                </div>
                
                {filteredIcons.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <div className="text-sm">No icons found</div>
                    <div className="text-xs">Try different search terms</div>
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Icon Settings */}
            <div className="w-80 p-4 space-y-6">
              <div>
                <h3 className="font-medium mb-4">Icon Settings</h3>
                
                {/* Preview */}
                {iconSettings.name && (
                  <div className="mb-6 p-4 border rounded-lg bg-muted/20">
                    <Label className="text-xs text-muted-foreground mb-2 block">Preview</Label>
                    <div className="flex items-center justify-center h-16">
                      {(() => {
                        const IconComponent = iconComponents[iconSettings.name];
                        return IconComponent ? (
                          <IconComponent 
                            className={`text-primary`}
                            style={{ 
                              fontSize: `${iconSettings.size}px`,
                              color: iconSettings.color || undefined
                            }}
                          />
                        ) : null;
                      })()}
                    </div>
                    <div className="text-center text-xs text-muted-foreground mt-2">
                      {iconSettings.name}
                    </div>
                  </div>
                )}
                
                {/* Size */}
                <div className="space-y-2">
                  <Label className="text-sm">Size: {iconSettings.size}px</Label>
                  <Slider
                    value={[iconSettings.size]}
                    onValueChange={([value]) => setIconSettings(prev => ({ ...prev, size: value }))}
                    min={12}
                    max={48}
                    step={2}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>12px</span>
                    <span>48px</span>
                  </div>
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <Label className="text-sm">Position</Label>
                  <Select value={iconSettings.position} onValueChange={(value: any) => setIconSettings(prev => ({ ...prev, position: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Color */}
                <div className="space-y-2">
                  <Label className="text-sm">Color (optional)</Label>
                  <Input
                    type="color"
                    value={iconSettings.color}
                    onChange={(e) => setIconSettings(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-10"
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIconSettings(prev => ({ ...prev, color: '' }))}
                    className="w-full"
                  >
                    Use Default Color
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4 border-t">
                <Button 
                  onClick={handleApply} 
                  className="w-full"
                  disabled={!iconSettings.name}
                >
                  Apply Icon
                </Button>
                <Button variant="outline" onClick={onClose} className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
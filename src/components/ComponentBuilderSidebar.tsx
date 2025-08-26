import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Palette,
  Type,
  Box,
  Grid3x3,
  FileText,
  Settings,
  Download,
  Plus,
  Home,
  Layers,
  Code,
  Share2,
  Moon,
  Sun,
  Puzzle,
  Paintbrush,
  Eye,
  TestTube,
  Zap,
  Package,
  Wand,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function ComponentBuilderSidebar({
  activeSection,
  onSectionChange,
  isDark,
  onThemeToggle,
}: SidebarProps) {
  const navigationItems = [
    { id: "builder", label: "Component Builder", icon: Wand, featured: true, primary: true },
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "library", label: "My Components", icon: Box },
    { id: "tokens", label: "Design Tokens", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "styles", label: "Style Editor", icon: Paintbrush },
    { id: "preview", label: "Live Preview", icon: Eye },
    { id: "testing", label: "Component Testing", icon: TestTube },
  ];

  const bottomItems = [
    { id: "export", label: "Export & Package", icon: Package },
    { id: "share", label: "Share & Publish", icon: Share2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-medium text-sidebar-foreground">ComponentLab</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onThemeToggle}
          className="h-8 w-8 p-0"
        >
          {isDark ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Featured MVP Button */}
      <div className="p-4">
        <Button 
          className="w-full justify-start gap-2 bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg"
          size="sm"
          onClick={() => onSectionChange('builder')}
        >
          <Wand className="h-4 w-4" />
          <span>Build Component</span>
          <Badge variant="secondary" className="ml-auto text-xs bg-white/20 text-white border-0">
            MVP
          </Badge>
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            if (item.id === 'builder') return null; // Skip since it's featured above
            
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-9 relative ${
                  item.primary ? 'font-medium' : ''
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <item.icon className="h-4 w-4" />
                <span className="truncate">{item.label}</span>
                {item.featured && !item.primary && (
                  <Badge variant="secondary" className="ml-auto text-xs bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    New
                  </Badge>
                )}
                {item.id === "library" && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    12
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <Separator className="my-4 bg-sidebar-border" />

        <div className="space-y-1">
          {bottomItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 h-9"
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="h-4 w-4" />
              <span className="truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="space-y-2 mb-4">
          <div className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wide">
            Quick Actions
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-2 flex flex-col items-center gap-1"
              onClick={() => onSectionChange('builder')}
            >
              <Plus className="h-3 w-3" />
              <span className="text-xs">New</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 p-2 flex flex-col items-center gap-1"
              onClick={() => onSectionChange('export')}
            >
              <Download className="h-3 w-3" />
              <span className="text-xs">Export</span>
            </Button>
          </div>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-xs font-medium text-primary-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              John Designer
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              Pro Creator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
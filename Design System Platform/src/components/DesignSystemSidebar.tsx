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
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
}

export function DesignSystemSidebar({
  activeSection,
  onSectionChange,
  isDark,
  onThemeToggle,
}: SidebarProps) {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "tokens", label: "Design Tokens", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "components", label: "Components", icon: Box },
    { id: "layout", label: "Layout & Grid", icon: Grid3x3 },
    { id: "icons", label: "Icons", icon: Layers },
    { id: "documentation", label: "Documentation", icon: FileText },
  ];

  const bottomItems = [
    { id: "export", label: "Export", icon: Download },
    { id: "share", label: "Share", icon: Share2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Code className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-medium text-sidebar-foreground">DesignCraft</span>
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

      {/* New Design System Button */}
      <div className="p-4">
        <Button className="w-full justify-start gap-2" size="sm">
          <Plus className="h-4 w-4" />
          New Design System
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 h-9"
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="h-4 w-4" />
              <span className="truncate">{item.label}</span>
              {item.id === "components" && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  24
                </Badge>
              )}
            </Button>
          ))}
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

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              John Designer
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              Premium Plan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
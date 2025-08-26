import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import {
  Plus,
  Copy,
  Edit,
  Trash2,
  Search,
  Palette,
  Move,
  CircleDot,
} from "lucide-react";

export function DesignTokens() {
  const [searchTerm, setSearchTerm] = useState("");

  const colorTokens = [
    { name: "primary", value: "#030213", hex: "#030213", usage: "45" },
    { name: "secondary", value: "#f3f3f5", hex: "#f3f3f5", usage: "32" },
    { name: "accent", value: "#e9ebef", hex: "#e9ebef", usage: "28" },
    { name: "destructive", value: "#d4183d", hex: "#d4183d", usage: "12" },
    { name: "success", value: "#22c55e", hex: "#22c55e", usage: "18" },
    { name: "warning", value: "#f59e0b", hex: "#f59e0b", usage: "8" },
    { name: "info", value: "#3b82f6", hex: "#3b82f6", usage: "15" },
    { name: "muted", value: "#ececf0", hex: "#ececf0", usage: "67" },
  ];

  const spacingTokens = [
    { name: "xs", value: "4px", usage: "23" },
    { name: "sm", value: "8px", usage: "45" },
    { name: "md", value: "16px", usage: "67" },
    { name: "lg", value: "24px", usage: "34" },
    { name: "xl", value: "32px", usage: "28" },
    { name: "2xl", value: "48px", usage: "15" },
    { name: "3xl", value: "64px", usage: "8" },
    { name: "4xl", value: "96px", usage: "4" },
  ];

  const borderRadiusTokens = [
    { name: "none", value: "0px", usage: "12" },
    { name: "sm", value: "6px", usage: "34" },
    { name: "md", value: "10px", usage: "45" },
    { name: "lg", value: "16px", usage: "28" },
    { name: "full", value: "9999px", usage: "15" },
  ];

  const handleCopyToken = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const ColorTokenCard = ({ token }: { token: any }) => (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg border border-border"
              style={{ backgroundColor: token.hex }}
            />
            <div>
              <p className="font-medium">{token.name}</p>
              <p className="text-sm text-muted-foreground">{token.hex}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {token.usage} uses
          </Badge>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCopyToken(token.hex)}
            className="h-8 px-2"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Edit className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const SpacingTokenCard = ({ token }: { token: any }) => (
    <Card className="group hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center bg-muted">
              <div
                className="bg-primary rounded"
                style={{
                  width: Math.min(parseInt(token.value) / 2, 24),
                  height: Math.min(parseInt(token.value) / 2, 24),
                }}
              />
            </div>
            <div>
              <p className="font-medium">{token.name}</p>
              <p className="text-sm text-muted-foreground">{token.value}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {token.usage} uses
          </Badge>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCopyToken(token.value)}
            className="h-8 px-2"
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Edit className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Design Tokens</h1>
          <p className="text-muted-foreground">
            Manage your design system's foundational values
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Token
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tokens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-96">
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="spacing" className="flex items-center gap-2">
            <Move className="h-4 w-4" />
            Spacing
          </TabsTrigger>
          <TabsTrigger value="radius" className="flex items-center gap-2">
            <CircleDot className="h-4 w-4" />
            Radius
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {colorTokens
              .filter((token) =>
                token.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((token, index) => (
                <ColorTokenCard key={index} token={token} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="spacing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {spacingTokens
              .filter((token) =>
                token.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((token, index) => (
                <SpacingTokenCard key={index} token={token} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="radius" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {borderRadiusTokens
              .filter((token) =>
                token.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((token, index) => (
                <SpacingTokenCard key={index} token={token} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import {
  Plus,
  Search,
  Copy,
  Edit,
  Eye,
  Code,
  Box,
  Type,
  Layout,
  Navigation,
  MousePointer,
} from "lucide-react";

export function ComponentsLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const components = {
    basic: [
      {
        name: "Button",
        description: "Primary action component with multiple variants",
        status: "Ready",
        variants: 5,
        usage: 89,
        lastUpdated: "2 days ago",
      },
      {
        name: "Input",
        description: "Text input field with validation states",
        status: "Ready", 
        variants: 3,
        usage: 67,
        lastUpdated: "1 week ago",
      },
      {
        name: "Card",
        description: "Container component for grouping content",
        status: "Ready",
        variants: 4,
        usage: 54,
        lastUpdated: "3 days ago",
      },
      {
        name: "Badge",
        description: "Small status indicator component",
        status: "In Progress",
        variants: 3,
        usage: 32,
        lastUpdated: "1 day ago",
      },
    ],
    navigation: [
      {
        name: "Navbar",
        description: "Main navigation component",
        status: "Ready",
        variants: 2,
        usage: 12,
        lastUpdated: "1 week ago",
      },
      {
        name: "Sidebar",
        description: "Side navigation panel",
        status: "Ready",
        variants: 3,
        usage: 8,
        lastUpdated: "2 weeks ago",
      },
      {
        name: "Breadcrumb",
        description: "Navigation breadcrumb trail",
        status: "Review",
        variants: 2,
        usage: 15,
        lastUpdated: "4 days ago",
      },
    ],
    layout: [
      {
        name: "Grid",
        description: "Responsive grid system",
        status: "Ready",
        variants: 1,
        usage: 45,
        lastUpdated: "1 month ago",
      },
      {
        name: "Container",
        description: "Content wrapper with max width",
        status: "Ready",
        variants: 3,
        usage: 78,
        lastUpdated: "2 weeks ago",
      },
    ],
    feedback: [
      {
        name: "Toast",
        description: "Notification message component",
        status: "Ready",
        variants: 4,
        usage: 23,
        lastUpdated: "1 week ago",
      },
      {
        name: "Modal",
        description: "Overlay dialog component", 
        status: "In Progress",
        variants: 2,
        usage: 18,
        lastUpdated: "3 days ago",
      },
      {
        name: "Alert",
        description: "Important message display",
        status: "Ready",
        variants: 4,
        usage: 29,
        lastUpdated: "5 days ago",
      },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const ComponentCard = ({ component }: { component: any }) => (
    <Card className="group hover:shadow-md transition-all cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{component.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {component.description}
            </p>
          </div>
          <Badge className={getStatusColor(component.status)}>
            {component.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{component.variants} variants</span>
          <span>{component.usage} uses</span>
          <span>{component.lastUpdated}</span>
        </div>
        
        {/* Component Preview */}
        <div className="bg-muted rounded-lg p-4 mb-4 min-h-[80px] flex items-center justify-center">
          <div className="text-xs text-muted-foreground">Component Preview</div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Eye className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Code className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Copy className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 px-2">
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const filterComponents = (componentList: any[]) => {
    return componentList.filter((component) =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Component Library</h1>
          <p className="text-muted-foreground">
            Browse and manage your design system components
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Component
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          All Status
        </Button>
        <Button variant="outline" size="sm">
          Sort by Usage
        </Button>
      </div>

      {/* Component Categories */}
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            Basic
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            Navigation
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <MousePointer className="h-4 w-4" />
            Feedback
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterComponents(components.basic).map((component, index) => (
              <ComponentCard key={index} component={component} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterComponents(components.navigation).map((component, index) => (
              <ComponentCard key={index} component={component} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterComponents(components.layout).map((component, index) => (
              <ComponentCard key={index} component={component} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterComponents(components.feedback).map((component, index) => (
              <ComponentCard key={index} component={component} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Box,
  Zap,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Play,
  Download,
  Users,
  Eye,
  Heart,
  Code,
  Palette,
  TestTube,
} from "lucide-react";

export function CreatorDashboard() {
  const stats = [
    {
      title: "Components Created",
      value: "24",
      change: "+8 this week",
      icon: Box,
      color: "text-blue-500",
    },
    {
      title: "Total Downloads",
      value: "1.2k",
      change: "+156 this month",
      icon: Download,
      color: "text-green-500",
    },
    {
      title: "Community Likes",
      value: "89",
      change: "+23 this week",
      icon: Heart,
      color: "text-pink-500",
    },
    {
      title: "Active Projects",
      value: "5",
      change: "3 in progress",
      icon: Zap,
      color: "text-orange-500",
    },
  ];

  const recentComponents = [
    {
      name: "Animated Button",
      type: "Button",
      status: "Published",
      downloads: 156,
      likes: 23,
      lastModified: "2 hours ago",
    },
    {
      name: "Modern Card",
      type: "Card",
      status: "Draft",
      downloads: 0,
      likes: 0,
      lastModified: "1 day ago",
    },
    {
      name: "Floating Input",
      type: "Input",
      status: "Testing",
      downloads: 89,
      likes: 12,
      lastModified: "3 days ago",
    },
    {
      name: "Dynamic Modal",
      type: "Modal",
      status: "Published",
      downloads: 234,
      likes: 45,
      lastModified: "1 week ago",
    },
  ];

  const quickActions = [
    { label: "Create Button", icon: Box, color: "bg-blue-500" },
    { label: "Build Form", icon: Code, color: "bg-green-500" },
    { label: "Design Card", icon: Palette, color: "bg-purple-500" },
    { label: "Test Component", icon: TestTube, color: "bg-orange-500" },
  ];

  const popularTemplates = [
    { name: "Modern Button Set", downloads: 1200, rating: 4.8 },
    { name: "Form Components", downloads: 890, rating: 4.9 },
    { name: "Card Collection", downloads: 756, rating: 4.7 },
    { name: "Navigation Kit", downloads: 654, rating: 4.6 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Testing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Creator Dashboard</h1>
          <p className="text-muted-foreground">
            Build, test, and share amazing components with the community
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            Activity
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
            <Zap className="h-4 w-4 mr-2" />
            Create Component
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} opacity-20`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${stat.color.replace('text-', 'bg-')}`} />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Create
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-3 h-12 hover:bg-accent/50"
              >
                <div className={`${action.color} p-2 rounded-lg`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Creation Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              This Week's Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Components Created</span>
                <span className="font-medium">8/10</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Community Engagement</span>
                <span className="font-medium">23/30</span>
              </div>
              <Progress value={77} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Quality Score</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Analytics
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Trending Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularTemplates.map((template, index) => (
              <div key={index} className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg cursor-pointer">
                <div className="flex-1">
                  <p className="text-sm font-medium">{template.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{template.downloads} downloads</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {template.rating}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Play className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Components */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Components</CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComponents.map((component, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{component.name}</p>
                    <p className="text-sm text-muted-foreground">{component.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <Badge className={getStatusColor(component.status)}>
                    {component.status}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    {component.downloads}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {component.likes}
                  </div>
                  <span>{component.lastModified}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import {
  Palette,
  Type,
  Box,
  Users,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      title: "Design Tokens",
      value: "142",
      change: "+12%",
      icon: Palette,
      color: "text-blue-500",
    },
    {
      title: "Components",
      value: "24",
      change: "+3",
      icon: Box,
      color: "text-green-500",
    },
    {
      title: "Typography Scales",
      value: "8",
      change: "No change",
      icon: Type,
      color: "text-purple-500",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2",
      icon: Users,
      color: "text-orange-500",
    },
  ];

  const recentActivity = [
    {
      action: "Updated Button component",
      user: "Sarah Johnson",
      time: "2 hours ago",
      type: "component",
    },
    {
      action: "Added new color tokens",
      user: "Mike Chen",
      time: "4 hours ago",
      type: "token",
    },
    {
      action: "Created Card component",
      user: "Alex Rivera",
      time: "1 day ago",
      type: "component",
    },
    {
      action: "Updated typography scale",
      user: "Emma Wilson",
      time: "2 days ago",
      type: "typography",
    },
  ];

  const quickActions = [
    { label: "Create Component", icon: Box },
    { label: "Add Color Token", icon: Palette },
    { label: "Define Typography", icon: Type },
    { label: "Export System", icon: TrendingUp },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Design System Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your design system.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button size="sm">
            <Star className="h-4 w-4 mr-2" />
            Upgrade Plan
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
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
        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Token Coverage</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Component Documentation</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Accessibility Compliance</span>
                <span className="font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="pt-4">
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Report
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start gap-3 h-10"
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import {
  TestTube,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Monitor,
  Smartphone,
  Tablet,
  Accessibility,
  Zap,
  Clock,
  Eye,
  MousePointer,
} from "lucide-react";

export function ComponentTesting() {
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const testSuites = [
    {
      name: "Visual Tests",
      icon: Eye,
      tests: [
        { name: "Responsive Design", status: "passed", duration: "1.2s" },
        { name: "Dark Mode Compatibility", status: "passed", duration: "0.8s" },
        { name: "Color Contrast", status: "warning", duration: "1.5s" },
        { name: "Typography Scaling", status: "passed", duration: "0.9s" },
      ]
    },
    {
      name: "Interaction Tests",
      icon: MousePointer,
      tests: [
        { name: "Click Events", status: "passed", duration: "0.5s" },
        { name: "Hover States", status: "passed", duration: "0.7s" },
        { name: "Focus Management", status: "failed", duration: "1.1s" },
        { name: "Keyboard Navigation", status: "passed", duration: "1.3s" },
      ]
    },
    {
      name: "Accessibility Tests",
      icon: Accessibility,
      tests: [
        { name: "Screen Reader Support", status: "passed", duration: "2.1s" },
        { name: "ARIA Labels", status: "warning", duration: "1.8s" },
        { name: "Keyboard Accessibility", status: "passed", duration: "1.4s" },
        { name: "Color Accessibility", status: "passed", duration: "0.6s" },
      ]
    },
    {
      name: "Performance Tests",
      icon: Zap,
      tests: [
        { name: "Render Time", status: "passed", duration: "0.3s" },
        { name: "Memory Usage", status: "passed", duration: "1.7s" },
        { name: "Bundle Size", status: "warning", duration: "2.2s" },
        { name: "Animation Performance", status: "passed", duration: "1.0s" },
      ]
    }
  ];

  const deviceTests = [
    { device: "Desktop", icon: Monitor, status: "passed", tests: 16, passed: 14, warnings: 2, failed: 0 },
    { device: "Tablet", icon: Tablet, status: "warning", tests: 16, passed: 13, warnings: 2, failed: 1 },
    { device: "Mobile", icon: Smartphone, status: "warning", tests: 16, passed: 12, warnings: 3, failed: 1 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const runTests = () => {
    setIsRunningTests(true);
    setTestProgress(0);
    
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningTests(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Component Testing</h1>
          <p className="text-muted-foreground">
            Comprehensive testing suite for your components
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" disabled={isRunningTests}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Tests
          </Button>
          <Button 
            size="sm" 
            onClick={runTests}
            disabled={isRunningTests}
            className="bg-gradient-to-r from-primary to-accent"
          >
            {isRunningTests ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run All Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Test Progress */}
      {isRunningTests && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Running Tests...</span>
                <span className="text-sm text-muted-foreground">{testProgress}%</span>
              </div>
              <Progress value={testProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Device Test Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {deviceTests.map((device, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <device.icon className="h-6 w-6" />
                  <span className="font-medium">{device.device}</span>
                </div>
                <Badge className={getStatusColor(device.status)}>
                  {device.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Tests</span>
                  <span className="font-medium">{device.tests}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Passed</span>
                  <span className="font-medium">{device.passed}</span>
                </div>
                {device.warnings > 0 && (
                  <div className="flex justify-between text-yellow-600">
                    <span>Warnings</span>
                    <span className="font-medium">{device.warnings}</span>
                  </div>
                )}
                {device.failed > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Failed</span>
                    <span className="font-medium">{device.failed}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Suites */}
      <Tabs defaultValue="visual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="interaction" className="flex items-center gap-2">
            <MousePointer className="h-4 w-4" />
            Interaction
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            A11y
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Performance
          </TabsTrigger>
        </TabsList>

        {testSuites.map((suite, suiteIndex) => (
          <TabsContent key={suiteIndex} value={suite.name.toLowerCase().split(' ')[0]}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <suite.icon className="h-5 w-5" />
                  {suite.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {suite.tests.map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(test.status)}
                        <span className="font-medium">{test.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(test.status)}>
                          {test.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{test.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Test Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Focus Management Issue:</strong> The component doesn't properly handle focus when disabled. Consider implementing proper focus management for better accessibility.
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Bundle Size Warning:</strong> Component bundle size is 12KB, which is above the recommended 10KB limit. Consider code splitting or optimization.
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>ARIA Labels:</strong> Some interactive elements are missing descriptive ARIA labels. Add aria-label attributes for better screen reader support.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
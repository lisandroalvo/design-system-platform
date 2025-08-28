import React, { useState, useEffect } from 'react';
import { ComponentType, ComponentVariant } from './types';
import { renderComponent, renderInteractiveComponent } from './component-data';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { motion } from 'motion/react';
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  Gamepad2,
  Eye,
  Layers,
  RotateCcw,
  Target,
  Palette,
  MousePointer,
  Maximize,
  Settings,
  Code,
  Wifi,
  Battery,
  Signal,
  Chrome,
  Figma,
  X,
  Minus,
  Plus,
  Home,
  Search,
  Bell,
  User,
  Heart,
  Star,
  MessageCircle,
  Share,
  TrendingUp,
  ShoppingCart,
  Calendar,
  Mail,
  Upload,
  Download,
  Grid3X3,
  ChevronDown
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ComponentMockupPreviewProps {
  componentType: ComponentType;
  componentName: string;
  variants: ComponentVariant[];
  selectedVariantId: string;
  selectedStateId: string;
  onVariantChange: (variantId: string) => void;
  onStateChange: (stateId: string) => void;
}

// Enhanced mockup contexts for different component types
const getMockupContext = (componentType: ComponentType, device: 'desktop' | 'tablet' | 'mobile') => {
  const contexts = {
    button: {
      desktop: 'dashboard',
      tablet: 'form',
      mobile: 'app'
    },
    input: {
      desktop: 'form',
      tablet: 'form', 
      mobile: 'form'
    },
    search: {
      desktop: 'workspace',
      tablet: 'app',
      mobile: 'app'
    },
    card: {
      desktop: 'dashboard',
      tablet: 'gallery',
      mobile: 'feed'
    },
    'stat-card': {
      desktop: 'analytics',
      tablet: 'dashboard',
      mobile: 'dashboard'
    },
    'file-upload': {
      desktop: 'workspace',
      tablet: 'drive',
      mobile: 'upload'
    },
    checkbox: {
      desktop: 'settings',
      tablet: 'form',
      mobile: 'settings'
    },
    radio: {
      desktop: 'form',
      tablet: 'form',
      mobile: 'form'
    },
    'radio-cards': {
      desktop: 'form',
      tablet: 'form',
      mobile: 'form'
    },
    switch: {
      desktop: 'settings',
      tablet: 'preferences',
      mobile: 'settings'
    },
    accordion: {
      desktop: 'help',
      tablet: 'help',
      mobile: 'faq'
    },
    tabs: {
      desktop: 'workspace',
      tablet: 'navigation',
      mobile: 'navigation'
    }
  };

  return contexts[componentType]?.[device] || 'app';
};

// Device frames with realistic proportions
const DeviceFrame: React.FC<{
  device: 'desktop' | 'tablet' | 'mobile';
  children: React.ReactNode;
  context: string;
}> = ({ device, children, context }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (device === 'desktop') {
    return (
      <div className="flex flex-col bg-gray-100 rounded-3xl p-6 shadow-2xl max-w-6xl mx-auto">
        {/* MacBook-style frame */}
        <div className="bg-gray-800 rounded-t-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 mx-6">
              <div className="bg-gray-700 rounded-lg px-4 py-1 text-gray-300 text-xs flex items-center gap-2">
                <div className="w-3 h-3 text-green-400">🔒</div>
                <span>componentlab.com/{context}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Browser content */}
        <div className="bg-white rounded-b-2xl min-h-[600px] relative overflow-hidden">
          <DesktopMockupContent context={context}>
            {children}
          </DesktopMockupContent>
        </div>
      </div>
    );
  }

  if (device === 'tablet') {
    return (
      <div className="bg-gray-900 rounded-[3rem] p-6 shadow-2xl max-w-2xl mx-auto">
        {/* iPad-style frame */}
        <div className="bg-white rounded-[2rem] relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
          {/* Status bar */}
          <div className="bg-white p-3 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
            </div>
            <div className="flex items-center gap-1">
              <Wifi className="w-4 h-4 text-gray-700" />
              <Signal className="w-4 h-4 text-gray-700" />
              <Battery className="w-6 h-3 text-gray-700" />
            </div>
          </div>
          
          <TabletMockupContent context={context}>
            {children}
          </TabletMockupContent>
        </div>
      </div>
    );
  }

  // Mobile frame
  return (
    <div className="bg-gray-900 rounded-[2.5rem] p-4 shadow-2xl max-w-sm mx-auto">
      {/* iPhone-style frame */}
      <div className="bg-white rounded-[2rem] relative overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
        
        {/* Status bar */}
        <div className="bg-white pt-8 px-6 pb-2 flex justify-between items-center">
          <div className="text-sm font-medium">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
          <div className="flex items-center gap-1">
            <Signal className="w-3 h-3 text-gray-700" />
            <Wifi className="w-3 h-3 text-gray-700" />
            <Battery className="w-5 h-3 text-gray-700" />
          </div>
        </div>
        
        <MobileMockupContent context={context}>
          {children}
        </MobileMockupContent>
      </div>
    </div>
  );
};

// Desktop mockup contexts
const DesktopMockupContent: React.FC<{ context: string; children: React.ReactNode }> = ({ context, children }) => {
  switch (context) {
    case 'dashboard':
      return (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your overview</p>
              </div>
              <div className="flex items-center gap-4">
                <Bell className="w-6 h-6 text-gray-400" />
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 bg-gray-50 p-6">
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-gray-500 text-sm mb-2">Total Users</div>
                <div className="text-2xl font-bold text-gray-900">24,567</div>
                <div className="text-green-600 text-sm">+12.5%</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-gray-500 text-sm mb-2">Revenue</div>
                <div className="text-2xl font-bold text-gray-900">$84,230</div>
                <div className="text-green-600 text-sm">+8.2%</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="text-gray-500 text-sm mb-2">Conversion</div>
                <div className="text-2xl font-bold text-gray-900">3.4%</div>
                <div className="text-red-600 text-sm">-2.1%</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center justify-center">
                <div className="scale-150">
                  {children}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New user registered</span>
                  <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Payment processed</span>
                  <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'form':
      return (
        <div className="h-full flex items-center justify-center bg-gray-50">
          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join thousands of users today</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="scale-110">
                  {children}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" placeholder="••••••••" className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 text-sm" />
              </div>
              
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl py-3 font-medium">
                Create Account
              </button>
            </div>
          </div>
        </div>
      );

    case 'workspace':
      return (
        <div className="h-full flex">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white p-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"></div>
              <span className="font-semibold">Workspace</span>
            </div>
            
            <nav className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-600 text-white">
                <Home className="w-4 h-4" />
                <span className="text-sm">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Files</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800">
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </div>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="flex-1 bg-gray-50">
            <div className="p-6 border-b border-gray-200 bg-white">
              <h1 className="text-xl font-semibold">File Management</h1>
            </div>
            
            <div className="p-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="scale-125 mb-4">
                  {children}
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg mb-2 mx-auto"></div>
                    <div className="text-xs text-gray-600">Documents</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="w-8 h-8 bg-green-100 rounded-lg mb-2 mx-auto"></div>
                    <div className="text-xs text-gray-600">Images</div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg mb-2 mx-auto"></div>
                    <div className="text-xs text-gray-600">Videos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'settings':
      return (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your account preferences</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                Save Changes
              </Button>
            </div>
          </div>
          
          {/* Settings content */}
          <div className="flex-1 bg-gray-50 p-6">
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-gray-600">Receive updates via email</div>
                    </div>
                    <div className="scale-125">
                      {children}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-gray-600">Get notified on your device</div>
                    </div>
                    <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                    <div>
                      <div className="font-medium">Marketing Updates</div>
                      <div className="text-sm text-gray-600">Receive product news and updates</div>
                    </div>
                    <div className="w-12 h-6 bg-green-400 rounded-full relative">
                      <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="text-sm font-medium text-blue-900">Profile Visibility</div>
                    <div className="text-xs text-blue-700">Your profile is currently public</div>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="text-sm font-medium">Data Collection</div>
                    <div className="text-xs text-gray-600">Help us improve by sharing usage data</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'help':
      return (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
                <p className="text-gray-600">Find answers to common questions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Contact Support</Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  Submit Ticket
                </Button>
              </div>
            </div>
          </div>
          
          {/* Help content */}
          <div className="flex-1 bg-gray-50 p-6">
            <div className="max-w-3xl">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search for help..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl bg-white"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="scale-110 p-4">
                    {children}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-xl mb-3 flex items-center justify-center">
                      <Settings className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="font-medium text-sm mb-1">Getting Started</div>
                    <div className="text-xs text-gray-600">Learn the basics</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="w-8 h-8 bg-green-100 rounded-xl mb-3 flex items-center justify-center">
                      <Code className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="font-medium text-sm mb-1">API Reference</div>
                    <div className="text-xs text-gray-600">Technical documentation</div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="w-8 h-8 bg-purple-100 rounded-xl mb-3 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="font-medium text-sm mb-1">Community</div>
                    <div className="text-xs text-gray-600">Join discussions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
                <p className="text-gray-600">Frequently asked questions</p>
              </div>
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
          
          {/* FAQ content */}
          <div className="flex-1 bg-gray-50 p-6">
            <div className="max-w-2xl">
              <div className="space-y-4">
                <div className="scale-105">
                  {children}
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between p-3">
                    <span className="font-medium">How do I reset my password?</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between p-3">
                    <span className="font-medium">What payment methods do you accept?</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-full flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="scale-150 mb-8">
              {children}
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-xl mb-3 mx-auto"></div>
                <div className="text-sm font-medium">Feature 1</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-xl mb-3 mx-auto"></div>
                <div className="text-sm font-medium">Feature 2</div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

// Tablet mockup contexts
const TabletMockupContent: React.FC<{ context: string; children: React.ReactNode }> = ({ context, children }) => {
  return (
    <div className="h-full bg-gray-50 overflow-auto">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-900">{context.charAt(0).toUpperCase() + context.slice(1)}</h1>
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <Settings className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="scale-125">
            {children}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="w-full h-24 bg-gray-100 rounded-xl mb-3"></div>
            <div className="text-sm font-medium">Item 1</div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="w-full h-24 bg-gray-100 rounded-xl mb-3"></div>
            <div className="text-sm font-medium">Item 2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile mockup contexts
const MobileMockupContent: React.FC<{ context: string; children: React.ReactNode }> = ({ context, children }) => {
  switch (context) {
    case 'settings':
      return (
        <div className="h-full bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-900">Settings</h1>
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Settings content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Notifications</span>
                  <div className="scale-125">
                    {children}
                  </div>
                </div>
                <div className="text-xs text-gray-600">Manage your notification preferences</div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Privacy</span>
                  <div className="w-10 h-5 bg-gray-200 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-600">Control your privacy settings</div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Dark Mode</span>
                  <div className="w-10 h-5 bg-blue-500 rounded-full relative">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600">Enable dark theme</div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex justify-around">
              <Home className="w-6 h-6 text-gray-400" />
              <Search className="w-6 h-6 text-gray-400" />
              <Bell className="w-6 h-6 text-gray-400" />
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      );

    case 'form':
      return (
        <div className="h-full bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-900">Sign Up</h1>
              <X className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* Form content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-3"></div>
                <h2 className="text-lg font-semibold">Create Account</h2>
                <p className="text-sm text-gray-600">Join thousands of users</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="scale-105">
                    {children}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm" />
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 font-medium mt-6">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'faq':
      return (
        <div className="h-full bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-900">FAQ</h1>
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          {/* FAQ content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="space-y-3">
              <div className="scale-105">
                {children}
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">How to reset password?</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment methods</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Contact support</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex justify-around">
              <Home className="w-6 h-6 text-gray-400" />
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <Bell className="w-6 h-6 text-gray-400" />
              <User className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="h-full bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-900">{context.charAt(0).toUpperCase() + context.slice(1)}</h1>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 overflow-auto">
            <div className="bg-white rounded-2xl p-4 shadow-sm text-center mb-4">
              <div className="scale-110">
                {children}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="w-full h-16 bg-gray-100 rounded-xl mb-2"></div>
                <div className="text-sm font-medium">Mobile Item</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="w-full h-16 bg-gray-100 rounded-xl mb-2"></div>
                <div className="text-sm font-medium">Another Item</div>
              </div>
            </div>
          </div>
          
          {/* Bottom navigation */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex justify-around">
              <Home className="w-6 h-6 text-blue-600" />
              <Search className="w-6 h-6 text-gray-400" />
              <Heart className="w-6 h-6 text-gray-400" />
              <User className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      );
  }
};

export const ComponentMockupPreview: React.FC<ComponentMockupPreviewProps> = ({
  componentType,
  componentName,
  variants,
  selectedVariantId,
  selectedStateId,
  onVariantChange,
  onStateChange
}) => {
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isInteractive, setIsInteractive] = useState(true);

  const selectedVariant = variants.find(v => v.id === selectedVariantId);
  const selectedState = selectedVariant?.states.find(s => s.id === selectedStateId);
  const mockupContext = getMockupContext(componentType, viewportSize);

  const getInteractionIcon = (stateName: string) => {
    const icons = {
      default: <Target className="w-3 h-3" />,
      hover: <MousePointer className="w-3 h-3" />,
      focus: <Eye className="w-3 h-3" />,
      active: <RotateCcw className="w-3 h-3" />,
      disabled: <X className="w-3 h-3" />,
      loading: <RotateCcw className="w-3 h-3 animate-spin" />,
      error: <X className="w-3 h-3" />,
      checked: <Target className="w-3 h-3" />,
      selected: <Target className="w-3 h-3" />
    };
    return icons[stateName as keyof typeof icons] || <MousePointer className="w-3 h-3" />;
  };

  if (!selectedVariant || !selectedState) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 rounded-2xl">
        <div className="text-center text-gray-500">
          <Layers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-sm">Select a component style to preview</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Enhanced Header */}
        <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${isInteractive ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} shadow-lg`}>
                {isInteractive ? <Gamepad2 className="w-5 h-5 text-white" /> : <Eye className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">
                  High-Fidelity Mockup
                </h2>
                <p className="text-sm text-gray-600">
                  {selectedVariant.name} • {selectedState.name} • {mockupContext}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Interactive Toggle */}
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={isInteractive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIsInteractive(!isInteractive)}
                    className="h-8 px-3 shadow-sm"
                  >
                    <Gamepad2 className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isInteractive ? 'Switch to static preview' : 'Enable full interactivity'}</p>
                </TooltipContent>
              </Tooltip>
              
              {/* Viewport Controls */}
              {[
                { id: 'desktop', icon: <Monitor className="w-4 h-4" />, label: 'Desktop' },
                { id: 'tablet', icon: <Tablet className="w-4 h-4" />, label: 'Tablet' },
                { id: 'mobile', icon: <Smartphone className="w-4 h-4" />, label: 'Mobile' }
              ].map((viewport) => (
                <Tooltip key={viewport.id}>
                  <TooltipTrigger>
                    <Button
                      variant={viewportSize === viewport.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewportSize(viewport.id as any)}
                      className="h-8 px-3 shadow-sm"
                    >
                      {viewport.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{viewport.label} Preview</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Mode Notice */}
        {isInteractive && (
          <div className="border-b border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-3">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-800 font-medium">
                ✨ Full Interactive Mode: Experience real component behavior in context!
              </span>
            </div>
          </div>
        )}

        {/* Style & State Controls */}
        <div className="border-b border-gray-200 p-4 space-y-4 bg-white">
          {/* Style Selector */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Component Style</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {variants.map((variant) => (
                <Button
                  key={variant.id}
                  variant={selectedVariantId === variant.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    onVariantChange(variant.id);
                    onStateChange(variant.states[0].id);
                  }}
                  className={`h-8 px-4 text-sm font-medium shadow-sm ${
                    selectedVariantId === variant.id 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                      : 'hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  {variant.name}
                </Button>
              ))}
            </div>
          </div>

          {/* State Selector */}
          {(!isInteractive || !['accordion', 'switch', 'checkbox', 'radio', 'button', 'tabs', 'file-upload'].includes(componentType)) && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MousePointer className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Interaction State</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedVariant.states.map((state) => (
                  <Tooltip key={state.id}>
                    <TooltipTrigger>
                      <Button
                        variant={selectedStateId === state.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => onStateChange(state.id)}
                        className={`h-8 px-4 text-sm capitalize shadow-sm ${
                          selectedStateId === state.id 
                            ? 'bg-gray-800 text-white hover:bg-gray-900' 
                            : 'hover:bg-gray-50 border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {getInteractionIcon(state.name)}
                          <span>{state.name}</span>
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="capitalize">{state.name} state preview</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* High-Fidelity Device Mockup */}
        <div className="flex-1 bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 p-8 overflow-auto">
          <motion.div
            key={`${viewportSize}-${mockupContext}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full flex items-center justify-center"
          >
            <DeviceFrame device={viewportSize} context={mockupContext}>
              {isInteractive ? 
                renderInteractiveComponent(componentType, selectedVariant, selectedState) :
                renderComponent(componentType, selectedVariant, selectedState)
              }
            </DeviceFrame>
          </motion.div>
        </div>

        {/* Context Info */}
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-white shadow-sm">
                {viewportSize.charAt(0).toUpperCase() + viewportSize.slice(1)}
              </Badge>
              <Badge variant="outline" className="bg-white shadow-sm">
                {mockupContext.charAt(0).toUpperCase() + mockupContext.slice(1)} Context
              </Badge>
              {isInteractive && (
                <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                  Fully Interactive
                </Badge>
              )}
            </div>
            <div className="text-gray-500">
              <span className="font-medium">{selectedVariant.name}</span> • <span className="capitalize">{selectedState.name}</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
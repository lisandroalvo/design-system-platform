import React from 'react';
import { Grid3X3, Sparkles, Type, Layout, AlertCircle, Navigation, Layers, Zap } from 'lucide-react';

export interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  count: number;
}

export const createCategories = (componentOptions: any[]): Category[] => [
  { 
    id: 'all', 
    label: 'All Components', 
    icon: <Grid3X3 className="w-4 h-4" />,
    count: componentOptions.length 
  },
  { 
    id: 'popular', 
    label: 'Popular', 
    icon: <Sparkles className="w-4 h-4" />,
    count: componentOptions.filter(c => c.isPopular).length 
  },
  { 
    id: 'input', 
    label: 'Input & Forms', 
    icon: <Type className="w-4 h-4" />,
    count: componentOptions.filter(c => c.category === 'input').length 
  },
  { 
    id: 'display', 
    label: 'Display & Data', 
    icon: <Layout className="w-4 h-4" />,
    count: componentOptions.filter(c => c.category === 'display').length 
  },
  { 
    id: 'feedback', 
    label: 'Feedback & Overlay', 
    icon: <AlertCircle className="w-4 h-4" />,
    count: componentOptions.filter(c => c.category === 'feedback').length 
  },
  { 
    id: 'navigation', 
    label: 'Navigation', 
    icon: <Navigation className="w-4 h-4" />,
    count: componentOptions.filter(c => c.category === 'navigation').length 
  },
  { 
    id: 'layout', 
    label: 'Layout & Structure', 
    icon: <Layers className="w-4 h-4" />,
    count: componentOptions.filter(c => c.category === 'layout').length 
  },
  { 
    id: 'interactive', 
    label: 'Interactive & Advanced', 
    icon: <Grid3X3 className="w-4 h-4" />,
    count: componentOptions.filter(c => c.category === 'interactive').length 
  },
  { 
    id: 'modern', 
    label: '2025 Modern Components', 
    icon: <Zap className="w-4 h-4" />,
    count: componentOptions.filter(c => c.category === 'modern').length 
  }
];
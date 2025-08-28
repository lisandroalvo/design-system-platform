import React, { useState } from 'react';
import { ComponentStyles } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { AnimatedIcon, StaggeredIconContainer } from '../ui/animated-icon';
import { motion } from 'motion/react';
import {
  Palette,
  Type,
  Layout,
  Spacing,
  CornerDownRight,
  Eye,
  Layers,
  Settings,
  Paintbrush,
  Ruler,
  Square,
  Circle,
  HelpCircle,
  Lightbulb,
  Target,
  Zap,
  Info
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

interface ComponentStyleEditorProps {
  styles: ComponentStyles;
  onChange: (styles: ComponentStyles) => void;
}

export const ComponentStyleEditor: React.FC<ComponentStyleEditorProps> = ({
  styles,
  onChange
}) => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['colors', 'layout']));
  const [showTips, setShowTips] = useState(true);

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const updateStyle = (key: keyof ComponentStyles, value: string) => {
    onChange({
      ...styles,
      [key]: value
    });
  };

  const styleCategories = [
    {
      id: 'colors',
      title: 'Colors & Appearance',
      icon: <Palette className="w-4 h-4" />,
      description: 'Control the visual colors and background',
      gradient: 'from-pink-500 to-rose-500',
      properties: [
        {
          key: 'backgroundColor' as keyof ComponentStyles,
          label: 'Background Color',
          type: 'color',
          placeholder: '#ffffff or transparent',
          tip: 'The main background color of the component',
          examples: ['#ffffff', '#f3f4f6', 'transparent', 'linear-gradient(...)']
        },
        {
          key: 'textColor' as keyof ComponentStyles,
          label: 'Text Color',
          type: 'color',
          placeholder: '#000000',
          tip: 'Color of the text inside the component',
          examples: ['#000000', '#374151', '#6b7280', '#ef4444']
        },
        {
          key: 'borderColor' as keyof ComponentStyles,
          label: 'Border Color',
          type: 'color',
          placeholder: '#e5e7eb',
          tip: 'Color of the component border',
          examples: ['#e5e7eb', '#d1d5db', '#3b82f6', 'transparent']
        }
      ]
    },
    {
      id: 'layout',
      title: 'Size & Spacing',
      icon: <Layout className="w-4 h-4" />,
      description: 'Control dimensions, padding, and margins',
      gradient: 'from-blue-500 to-cyan-500',
      properties: [
        {
          key: 'width' as keyof ComponentStyles,
          label: 'Width',
          type: 'text',
          placeholder: 'auto, 100px, 100%, fit-content',
          tip: 'How wide the component should be',
          examples: ['auto', '100px', '100%', 'fit-content', '20rem']
        },
        {
          key: 'height' as keyof ComponentStyles,
          label: 'Height',
          type: 'text',
          placeholder: 'auto, 40px, 100%',
          tip: 'How tall the component should be',
          examples: ['auto', '40px', '2.5rem', '100%', 'fit-content']
        },
        {
          key: 'padding' as keyof ComponentStyles,
          label: 'Inner Spacing (Padding)',
          type: 'text',
          placeholder: '12px, 1rem, 8px 16px',
          tip: 'Space inside the component around its content',
          examples: ['12px', '1rem', '8px 16px', '0.5rem 1rem']
        },
        {
          key: 'margin' as keyof ComponentStyles,
          label: 'Outer Spacing (Margin)',
          type: 'text',
          placeholder: '0, 8px, 0 auto',
          tip: 'Space outside the component',
          examples: ['0', '8px', '1rem', '0 auto', '8px 0']
        }
      ]
    },
    {
      id: 'borders',
      title: 'Borders & Corners',
      icon: <Square className="w-4 h-4" />,
      description: 'Control borders, corners, and outlines',
      gradient: 'from-green-500 to-emerald-500',
      properties: [
        {
          key: 'borderWidth' as keyof ComponentStyles,
          label: 'Border Thickness',
          type: 'text',
          placeholder: '1px, 2px, 0',
          tip: 'How thick the border should be',
          examples: ['0', '1px', '2px', '3px']
        },
        {
          key: 'borderRadius' as keyof ComponentStyles,
          label: 'Corner Roundness',
          type: 'text',
          placeholder: '8px, 0.5rem, 50%',
          tip: 'How rounded the corners should be',
          examples: ['0', '4px', '8px', '0.5rem', '50%', '999px']
        },
        {
          key: 'borderStyle' as keyof ComponentStyles,
          label: 'Border Style',
          type: 'select',
          placeholder: 'solid, dashed, dotted',
          tip: 'The style of the border line',
          examples: ['solid', 'dashed', 'dotted', 'none']
        }
      ]
    },
    {
      id: 'typography',
      title: 'Text Styling',
      icon: <Type className="w-4 h-4" />,
      description: 'Control font size, weight, and alignment',
      gradient: 'from-purple-500 to-violet-500',
      properties: [
        {
          key: 'fontSize' as keyof ComponentStyles,
          label: 'Font Size',
          type: 'text',
          placeholder: '14px, 1rem, 1.25rem',
          tip: 'Size of the text',
          examples: ['12px', '14px', '16px', '1rem', '1.25rem']
        },
        {
          key: 'fontWeight' as keyof ComponentStyles,
          label: 'Font Weight',
          type: 'select',
          placeholder: 'normal, bold, 500',
          tip: 'How thick/bold the text should be',
          examples: ['normal', 'bold', '400', '500', '600', '700']
        },
        {
          key: 'textAlign' as keyof ComponentStyles,
          label: 'Text Alignment',
          type: 'select',
          placeholder: 'left, center, right',
          tip: 'How the text should be aligned',
          examples: ['left', 'center', 'right', 'justify']
        }
      ]
    },
    {
      id: 'effects',
      title: 'Visual Effects',
      icon: <Zap className="w-4 h-4" />,
      description: 'Add shadows, opacity, and transforms',
      gradient: 'from-orange-500 to-yellow-500',
      properties: [
        {
          key: 'boxShadow' as keyof ComponentStyles,
          label: 'Shadow',
          type: 'text',
          placeholder: '0 2px 4px rgba(0,0,0,0.1)',
          tip: 'Drop shadow effect around the component',
          examples: ['none', '0 1px 3px rgba(0,0,0,0.1)', '0 4px 12px rgba(0,0,0,0.15)']
        },
        {
          key: 'opacity' as keyof ComponentStyles,
          label: 'Transparency',
          type: 'text',
          placeholder: '1, 0.8, 0.5',
          tip: 'How transparent the component is (1 = solid, 0 = invisible)',
          examples: ['1', '0.9', '0.8', '0.5', '0.3']
        },
        {
          key: 'transform' as keyof ComponentStyles,
          label: 'Transform',
          type: 'text',
          placeholder: 'scale(1.05), rotate(5deg)',
          tip: 'Transform effects like scaling, rotation, or movement',
          examples: ['none', 'scale(1.05)', 'rotate(5deg)', 'translateY(-2px)']
        }
      ]
    }
  ];

  return (
    <TooltipProvider>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200/50 p-4 bg-white/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AnimatedIcon variant="rotate" className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <Paintbrush className="w-5 h-5 text-white" />
              </AnimatedIcon>
              <div>
                <h2 className="font-bold text-lg">Style Editor</h2>
                <p className="text-sm text-muted-foreground">Customize your component's appearance</p>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger>
                <AnimatedIcon variant="pulse">
                  <HelpCircle className="w-5 h-5 text-muted-foreground" />
                </AnimatedIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change any property to see live updates in the preview.<br/>
                Start with colors and layout for best results!</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Quick Tips */}
        {showTips && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="m-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-2xl"
          >
            <div className="flex items-start gap-3">
              <AnimatedIcon variant="bounce" className="p-1.5 bg-blue-500 rounded-lg flex-shrink-0 mt-0.5">
                <Lightbulb className="w-3 h-3 text-white" />
              </AnimatedIcon>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-blue-900">💡 Styling Tips</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTips(false)}
                    className="h-5 w-5 p-0 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </Button>
                </div>
                <p className="text-xs text-blue-800">
                  Changes are applied instantly! Start with <strong>Colors</strong> and <strong>Size</strong> for quick visual changes.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Style Sections */}
        <ScrollArea className="flex-1 p-4">
          <StaggeredIconContainer staggerDelay={0.1}>
            <div className="space-y-4">
              {styleCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Collapsible
                    open={openSections.has(category.id)}
                    onOpenChange={() => toggleSection(category.id)}
                  >
                    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl overflow-hidden">
                      <CollapsibleTrigger asChild>
                        <CardHeader className={`pb-3 cursor-pointer transition-all duration-200 hover:bg-gray-50/50 bg-gradient-to-r ${category.gradient}/10`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <AnimatedIcon variant="hover" className={`p-2 bg-gradient-to-r ${category.gradient} rounded-xl shadow-lg`}>
                                <div className="text-white">
                                  {category.icon}
                                </div>
                              </AnimatedIcon>
                              <div>
                                <CardTitle className="text-base">{category.title}</CardTitle>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {category.description}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {category.properties.length} properties
                              </Badge>
                              <AnimatedIcon variant="rotate">
                                <CornerDownRight className={`w-4 h-4 transition-transform duration-200 ${
                                  openSections.has(category.id) ? 'rotate-90' : ''
                                }`} />
                              </AnimatedIcon>
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="pt-0 space-y-4">
                          <StaggeredIconContainer staggerDelay={0.05}>
                            {category.properties.map((property, propIndex) => (
                              <motion.div
                                key={property.key}
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 }
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                className="space-y-2"
                              >
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={property.key} className="text-sm font-medium">
                                    {property.label}
                                  </Label>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <AnimatedIcon variant="hover">
                                        <Info className="w-3 h-3 text-muted-foreground" />
                                      </AnimatedIcon>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="max-w-xs">
                                        <p className="font-medium mb-1">{property.tip}</p>
                                        <p className="text-xs text-muted-foreground">
                                          Examples: {property.examples.join(', ')}
                                        </p>
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>

                                {property.type === 'select' ? (
                                  <select
                                    value={styles[property.key] || ''}
                                    onChange={(e) => updateStyle(property.key, e.target.value)}
                                    className="w-full h-9 px-3 rounded-xl border-2 border-gray-200/50 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all duration-200 text-sm"
                                  >
                                    <option value="">Choose...</option>
                                    {property.examples.map((example) => (
                                      <option key={example} value={example}>
                                        {example}
                                      </option>
                                    ))}
                                  </select>
                                ) : (
                                  <div className="relative">
                                    <Input
                                      id={property.key}
                                      type={property.type}
                                      value={styles[property.key] || ''}
                                      onChange={(e) => updateStyle(property.key, e.target.value)}
                                      placeholder={property.placeholder}
                                      className="rounded-xl border-2 border-gray-200/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all duration-200"
                                    />
                                    {property.type === 'color' && styles[property.key] && (
                                      <div 
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded border border-gray-300"
                                        style={{ backgroundColor: styles[property.key] }}
                                      />
                                    )}
                                  </div>
                                )}

                                {/* Quick Examples */}
                                <div className="flex flex-wrap gap-1">
                                  {property.examples.slice(0, 3).map((example) => (
                                    <AnimatedIcon key={example} variant="tap">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => updateStyle(property.key, example)}
                                        className="h-6 px-2 text-xs rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                      >
                                        {example}
                                      </Button>
                                    </AnimatedIcon>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </StaggeredIconContainer>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </motion.div>
              ))}
            </div>
          </StaggeredIconContainer>

          {/* Reset Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.5 }}
            className="mt-6 pt-4 border-t border-gray-200/50"
          >
            <AnimatedIcon variant="tap">
              <Button
                variant="outline"
                onClick={() => onChange({})}
                className="w-full h-10 rounded-xl border-2 border-gray-200/50 hover:border-red-300 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
              >
                <Target className="w-4 h-4 mr-2" />
                Reset All Styles
              </Button>
            </AnimatedIcon>
          </motion.div>
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
};
import { ComponentStyles, DesignTokens, ComponentVariant, ComponentState } from './types';

export const defaultDesignTokens: DesignTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554'
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617'
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a'
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16'
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a'
    },
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49'
    }
  },
  typography: {
    fontFamilies: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
    fontSizes: [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72],
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: [1, 1.125, 1.25, 1.375, 1.5, 1.625, 1.75, 2],
    letterSpacings: [-0.05, -0.025, 0, 0.025, 0.05, 0.1]
  },
  spacing: [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96],
  borderRadius: [0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32],
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  ],
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
};

export const defaultComponentStyles: ComponentStyles = {
  padding: { top: 8, right: 16, bottom: 8, left: 16 },
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  width: 'auto',
  height: 'auto',
  fontSize: 14,
  fontWeight: 'medium',
  lineHeight: 1.5,
  letterSpacing: 0,
  textAlign: 'center',
  textTransform: 'none',
  backgroundColor: '#3b82f6',
  textColor: '#ffffff',
  borderColor: '#3b82f6',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 6, bottomRight: 6 },
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  opacity: 1,
  iconSize: 16,
  iconPosition: 'left',
  iconSpacing: 8,
  transition: 'all 0.2s ease',
  transform: 'none'
};

export const createDefaultVariants = (componentType: string): ComponentVariant[] => {
  const baseStyles = { ...defaultComponentStyles };
  
  switch (componentType) {
    case 'button':
      return [
        {
          id: 'primary',
          name: 'primary',
          label: 'Primary',
          isDefault: true,
          styles: {
            ...baseStyles,
            backgroundColor: '#3b82f6',
            textColor: '#ffffff',
            borderColor: '#3b82f6'
          },
          states: createDefaultStates('button', 'primary')
        },
        {
          id: 'secondary',
          name: 'secondary',
          label: 'Secondary',
          styles: {
            ...baseStyles,
            backgroundColor: 'transparent',
            textColor: '#3b82f6',
            borderColor: '#3b82f6'
          },
          states: createDefaultStates('button', 'secondary')
        },
        {
          id: 'ghost',
          name: 'ghost',
          label: 'Ghost',
          styles: {
            ...baseStyles,
            backgroundColor: 'transparent',
            textColor: '#64748b',
            borderColor: 'transparent',
            borderWidth: 0
          },
          states: createDefaultStates('button', 'ghost')
        }
      ];
    
    case 'chip':
      return [
        {
          id: 'filled',
          name: 'filled',
          label: 'Filled',
          isDefault: true,
          styles: {
            ...baseStyles,
            padding: { top: 4, right: 12, bottom: 4, left: 12 },
            fontSize: 12,
            borderRadius: { topLeft: 16, topRight: 16, bottomLeft: 16, bottomRight: 16 },
            backgroundColor: '#e2e8f0',
            textColor: '#334155',
            borderColor: 'transparent',
            borderWidth: 0
          },
          states: createDefaultStates('chip', 'filled')
        },
        {
          id: 'outlined',
          name: 'outlined',
          label: 'Outlined',
          styles: {
            ...baseStyles,
            padding: { top: 4, right: 12, bottom: 4, left: 12 },
            fontSize: 12,
            borderRadius: { topLeft: 16, topRight: 16, bottomLeft: 16, bottomRight: 16 },
            backgroundColor: 'transparent',
            textColor: '#64748b',
            borderColor: '#cbd5e1'
          },
          states: createDefaultStates('chip', 'outlined')
        }
      ];
    
    case 'card':
      return [
        {
          id: 'default',
          name: 'default',
          label: 'Default',
          isDefault: true,
          styles: {
            ...baseStyles,
            padding: { top: 24, right: 24, bottom: 24, left: 24 },
            backgroundColor: '#ffffff',
            textColor: '#0f172a',
            borderColor: '#e2e8f0',
            borderRadius: { topLeft: 8, topRight: 8, bottomLeft: 8, bottomRight: 8 },
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
          },
          states: createDefaultStates('card', 'default')
        },
        {
          id: 'elevated',
          name: 'elevated',
          label: 'Elevated',
          styles: {
            ...baseStyles,
            padding: { top: 24, right: 24, bottom: 24, left: 24 },
            backgroundColor: '#ffffff',
            textColor: '#0f172a',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 },
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
          },
          states: createDefaultStates('card', 'elevated')
        }
      ];
    
    default:
      return [
        {
          id: 'default',
          name: 'default',
          label: 'Default',
          isDefault: true,
          styles: baseStyles,
          states: createDefaultStates(componentType, 'default')
        }
      ];
  }
};

export const createDefaultStates = (componentType: string, variantName: string): ComponentState[] => {
  const states: ComponentState[] = [
    {
      id: 'default',
      name: 'default',
      label: 'Default',
      isDefault: true,
      styles: {}
    }
  ];

  // Add component-specific states
  if (componentType === 'button') {
    states.push(
      {
        id: 'hover',
        name: 'hover',
        label: 'Hover',
        styles: {
          opacity: 0.9,
          transform: 'translateY(-1px)'
        }
      },
      {
        id: 'active',
        name: 'active',
        label: 'Active',
        styles: {
          transform: 'translateY(0px)',
          opacity: 0.8
        }
      },
      {
        id: 'disabled',
        name: 'disabled',
        label: 'Disabled',
        styles: {
          opacity: 0.5,
          backgroundColor: '#e2e8f0',
          textColor: '#94a3b8',
          borderColor: '#e2e8f0'
        }
      }
    );
  }

  if (componentType === 'input') {
    states.push(
      {
        id: 'focus',
        name: 'focus',
        label: 'Focus',
        styles: {
          borderColor: '#3b82f6',
          boxShadow: '0 0 0 3px rgb(59 130 246 / 0.1)'
        }
      },
      {
        id: 'error',
        name: 'error',
        label: 'Error',
        styles: {
          borderColor: '#ef4444',
          boxShadow: '0 0 0 3px rgb(239 68 68 / 0.1)'
        }
      }
    );
  }

  if (componentType === 'card') {
    states.push(
      {
        id: 'hover',
        name: 'hover',
        label: 'Hover',
        styles: {
          transform: 'translateY(-2px)',
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
        }
      }
    );
  }

  return states;
};
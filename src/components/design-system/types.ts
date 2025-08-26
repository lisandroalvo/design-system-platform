export interface ComponentVariant {
  id: string;
  name: string;
  label: string;
  isDefault?: boolean;
  styles: ComponentStyles;
  states: ComponentState[];
}

export interface ComponentState {
  id: string;
  name: string;
  label: string;
  styles: Partial<ComponentStyles>;
  isDefault?: boolean;
}

export interface ComponentStyles {
  // Layout & Spacing
  padding: { top: number; right: number; bottom: number; left: number };
  margin: { top: number; right: number; bottom: number; left: number };
  width?: number | 'auto' | '100%';
  height?: number | 'auto';
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  
  // Typography
  fontSize: number;
  fontWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  
  // Colors
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  
  // Border & Shape
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  borderRadius: { topLeft: number; topRight: number; bottomLeft: number; bottomRight: number };
  
  // Effects
  boxShadow: string;
  opacity: number;
  
  // Icon
  iconSize?: number;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom' | 'none';
  iconSpacing?: number;
  
  // Animation
  transition: string;
  transform?: string;
}

export interface DesignSystemComponent {
  id: string;
  type: ComponentType;
  name: string;
  description: string;
  category: string;
  variants: ComponentVariant[];
  baseStyles: ComponentStyles;
  createdAt: Date;
  updatedAt: Date;
}

export type ComponentType = 
  | 'button' 
  | 'input' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'radio' 
  | 'switch' 
  | 'slider' 
  | 'card' 
  | 'chip' 
  | 'badge' 
  | 'avatar' 
  | 'toggle' 
  | 'accordion' 
  | 'tab' 
  | 'modal' 
  | 'tooltip' 
  | 'popover' 
  | 'progress' 
  | 'alert' 
  | 'breadcrumb';

export interface DesignSystem {
  id: string;
  name: string;
  description: string;
  components: DesignSystemComponent[];
  tokens: DesignTokens;
  createdAt: Date;
  updatedAt: Date;
}

export interface DesignTokens {
  colors: {
    primary: ColorScale;
    secondary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    error: ColorScale;
    info: ColorScale;
  };
  typography: {
    fontFamilies: string[];
    fontSizes: number[];
    fontWeights: Record<string, number>;
    lineHeights: number[];
    letterSpacings: number[];
  };
  spacing: number[];
  borderRadius: number[];
  shadows: string[];
  breakpoints: Record<string, number>;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface FigmaExportOptions {
  includeVariants: boolean;
  includeStates: boolean;
  organizationMethod: 'component' | 'variant' | 'state';
  frameSpacing: number;
  includeDarkMode: boolean;
  includeDocumentation: boolean;
}
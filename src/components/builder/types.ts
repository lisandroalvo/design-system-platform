export interface ComponentElement {
  id: string;
  type: string;
  label: string;
  props: Record<string, any>;
  style: Record<string, any>;
  children?: ComponentElement[];
  x: number;
  y: number;
  width: number;
  height: number;
  locked?: boolean;
  visible?: boolean;
  rotation?: number;
  opacity?: number;
  zIndex?: number;
  animations?: Animation[];
  states?: Record<string, any>;
  responsive?: ResponsiveStyles;
}

export interface Animation {
  id: string;
  name: string;
  type: 'hover' | 'click' | 'focus' | 'scroll' | 'load' | 'custom';
  properties: Record<string, any>;
  duration: number;
  easing: string;
  delay: number;
  iterations: number | 'infinite';
}

export interface ResponsiveStyles {
  mobile: Record<string, any>;
  tablet: Record<string, any>;
  desktop: Record<string, any>;
}

export interface HistoryState {
  elements: ComponentElement[];
  timestamp: number;
  description: string;
}

export interface UltraComponentBuilderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export interface ElementLibraryItem {
  id: string;
  label: string;
  icon: any;
  color: string;
  description: string;
}

export interface ElementCategory {
  category: string;
  icon: any;
  elements: ElementLibraryItem[];
}
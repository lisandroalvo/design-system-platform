// Core component types
export type ComponentType = 
  // Input & Forms
  | 'button' | 'input' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'radio-cards' | 'switch' 
  | 'slider' | 'toggle' | 'file-upload' | 'date-picker' | 'color-picker'
  | 'rating' | 'otp-input' | 'search' | 'combobox'
  
  // Display & Data
  | 'card' | 'chip' | 'badge' | 'avatar' | 'progress' | 'skeleton' | 'divider'
  | 'table' | 'list' | 'timeline' | 'stat-card' | 'pricing-card' | 'feature-card'
  | 'testimonial' | 'gallery' | 'carousel'
  
  // Feedback & Overlay
  | 'alert' | 'tooltip' | 'popover' | 'modal' | 'drawer' | 'bottom-sheet'
  | 'notification' | 'toast' | 'loading' | 'empty-state' | 'error-boundary'
  | 'confirmation' | 'lightbox'
  
  // Navigation
  | 'tab' | 'breadcrumb' | 'accordion' | 'menu' | 'sidebar' | 'navbar'
  | 'pagination' | 'stepper' | 'timeline-nav' | 'mega-menu' | 'command-palette'
  
  // Layout & Structure
  | 'container' | 'grid' | 'stack' | 'spacer' | 'section' | 'hero'
  | 'footer' | 'header' | 'layout' | 'masonry'
  
  // Interactive & Advanced
  | 'fab' | 'speed-dial' | 'context-menu' | 'toolbar' | 'dock' | 'kanban-card'
  | 'chat-bubble' | 'code-block' | 'syntax-highlighter' | 'diff-viewer'
  | 'calendar' | 'data-table' | 'tree-view' | 'file-explorer'
  
  // Modern 2025 Components
  | 'ai-chat' | 'voice-input' | 'gesture-button' | 'smart-badge' | 'live-activity'
  | 'contextual-menu' | 'adaptive-card' | 'micro-interaction' | 'glassmorphism-card'
  | 'neumorphic-button' | 'holographic-display' | 'biometric-auth';

// Icon definition
export interface ComponentIcon {
  name: string;
  size: number;
  position: 'left' | 'right' | 'top' | 'bottom' | 'center';
  color?: string;
}

// Enhanced component styles with icon support and 2025 features
export interface ComponentStyles {
  // Layout & Spacing
  width: string;
  height: string;
  padding: string;
  margin: string;
  display: string;
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap: string;
  
  // Background & Visual
  backgroundColor: string;
  backgroundImage: string;
  backgroundGradient: string;
  opacity: number;
  backdropBlur: string;
  
  // Border & Shape
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  
  // Typography
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  lineHeight: string;
  letterSpacing: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textColor: string;
  textDecoration: 'none' | 'underline' | 'line-through';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  
  // Effects & Shadows
  boxShadow: string;
  textShadow: string;
  filter: string;
  transform: string;
  
  // Interactions
  cursor: string;
  userSelect: 'none' | 'text' | 'all' | 'auto';
  pointerEvents: 'auto' | 'none';
  
  // Transitions & Animations
  transition: string;
  animation: string;
  
  // Icon Support
  icon?: ComponentIcon;
  
  // Modern Effects (2025)
  glassmorphism: boolean;
  neumorphism: boolean;
  holographic: boolean;
  neonGlow: boolean;
  particleEffect: boolean;
  morphing: boolean;
  spatialDepth: boolean;
  dynamicGradient: boolean;
  
  // Accessibility
  ariaLabel: string;
  ariaDescription: string;
  focusRing: boolean;
  highContrast: boolean;
  motionSafe: boolean;
}

// Component state definition
export interface ComponentState {
  id: string;
  name: string;
  styles: Partial<ComponentStyles>;
  isActive?: boolean;
  isInteractive?: boolean;
}

// Component variant definition
export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  styles: ComponentStyles;
  states: ComponentState[];
  isPrimary?: boolean;
}

// Main component definition
export interface DesignSystemComponent {
  id: string;
  name: string;
  description: string;
  type: ComponentType;
  category: string;
  variants: ComponentVariant[];
  baseStyles: ComponentStyles;
  tags?: string[];
  isCustom?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Figma export options
export interface FigmaExportOptions {
  includeVariants: boolean;
  includeStates: boolean;
  organizationMethod: 'component' | 'variant' | 'flat';
  frameSpacing: number;
  includeDarkMode: boolean;
  includeDocumentation: boolean;
  includeIcons: boolean;
  exportFormat: 'frames' | 'components' | 'library';
  include2025Effects: boolean;
  spatialOrganization: boolean;
}

// Icon library definition
export interface IconCategory {
  id: string;
  name: string;
  icons: string[];
}

// Search and filter options
export interface ComponentFilter {
  category?: string;
  type?: ComponentType;
  tags?: string[];
  searchQuery?: string;
  hasIcons?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  complexity?: 'simple' | 'moderate' | 'advanced';
}

// Component usage analytics
export interface ComponentUsage {
  componentId: string;
  usageCount: number;
  lastUsed: Date;
  popularVariants: string[];
  commonStates: string[];
}

// Design system metadata
export interface DesignSystemMetadata {
  name: string;
  version: string;
  description: string;
  author: string;
  tags: string[];
  components: DesignSystemComponent[];
  usage: ComponentUsage[];
  lastExported?: Date;
  figmaFileId?: string;
}
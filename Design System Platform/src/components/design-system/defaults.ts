import { ComponentStyles, ComponentVariant, ComponentState, ComponentType } from './types';

export const defaultComponentStyles: ComponentStyles = {
  // Layout & Spacing
  width: 'auto',
  height: 'auto',
  minWidth: undefined,
  minHeight: undefined,
  maxWidth: undefined,
  maxHeight: undefined,
  padding: '12px 16px',
  margin: '0px',
  
  // Colors
  backgroundColor: '#ffffff',
  textColor: '#374151',
  borderColor: '#d1d5db',
  
  // Border & Radius
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: '12px',
  
  // Shadow & Effects
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  opacity: 1,
  
  // Typography
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '1.5',
  textAlign: 'left',
  
  // Transform & Animation
  transform: 'none',
  transition: 'all 0.2s ease',
  cursor: 'default'
};

// Helper function to create default state
export const createDefaultState = (): ComponentState => ({
  id: `state-${Date.now()}`,
  name: 'default',
  description: 'Default appearance',
  styles: {}
});

// Get default state specifically for variants
export const getDefaultStateForVariant = (): ComponentState => ({
  id: `state-default-${Date.now()}`,
  name: 'default',
  description: 'How the component normally appears',
  styles: {}
});

// Comprehensive variant creation function
export const createDefaultVariants = (componentType: ComponentType): ComponentVariant[] => {
  const baseId = Date.now();
  
  switch (componentType) {
    case 'button':
      return [
        {
          id: `variant-primary-${baseId}`,
          name: 'Primary',
          description: 'Main call-to-action button',
          styles: {
            backgroundColor: '#3b82f6',
            textColor: '#ffffff',
            borderColor: '#3b82f6',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-1`,
              name: 'hover',
              description: 'When user hovers over the button',
              styles: {
                backgroundColor: '#2563eb',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)'
              }
            },
            {
              id: `state-active-${baseId}-1`,
              name: 'active',
              description: 'When button is being pressed',
              styles: {
                backgroundColor: '#1d4ed8',
                transform: 'translateY(0px)',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.35)'
              }
            },
            {
              id: `state-disabled-${baseId}-1`,
              name: 'disabled',
              description: 'When button cannot be interacted with',
              styles: {
                backgroundColor: '#9ca3af',
                borderColor: '#9ca3af',
                cursor: 'not-allowed',
                opacity: 0.6,
                transform: 'none',
                boxShadow: 'none'
              }
            },
            {
              id: `state-loading-${baseId}-1`,
              name: 'loading',
              description: 'When button is processing an action',
              styles: {
                backgroundColor: '#3b82f6',
                cursor: 'wait',
                opacity: 0.8
              }
            }
          ]
        },
        {
          id: `variant-secondary-${baseId}`,
          name: 'Secondary',
          description: 'Secondary action button',
          styles: {
            backgroundColor: '#f8fafc',
            textColor: '#475569',
            borderColor: '#cbd5e1',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-2`,
              name: 'hover',
              description: 'When user hovers over the button',
              styles: {
                backgroundColor: '#f1f5f9',
                borderColor: '#94a3b8',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }
            },
            {
              id: `state-active-${baseId}-2`,
              name: 'active',
              description: 'When button is being pressed',
              styles: {
                backgroundColor: '#e2e8f0',
                borderColor: '#64748b',
                transform: 'translateY(0px)'
              }
            },
            {
              id: `state-disabled-${baseId}-2`,
              name: 'disabled',
              description: 'When button cannot be interacted with',
              styles: {
                backgroundColor: '#f1f5f9',
                textColor: '#94a3b8',
                borderColor: '#e2e8f0',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        },
        {
          id: `variant-outline-${baseId}`,
          name: 'Outline',
          description: 'Outlined button style',
          styles: {
            backgroundColor: 'transparent',
            textColor: '#3b82f6',
            borderColor: '#3b82f6',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: 'none',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-3`,
              name: 'hover',
              description: 'When user hovers over the button',
              styles: {
                backgroundColor: '#3b82f6',
                textColor: '#ffffff',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)'
              }
            },
            {
              id: `state-active-${baseId}-3`,
              name: 'active',
              description: 'When button is being pressed',
              styles: {
                backgroundColor: '#2563eb',
                textColor: '#ffffff'
              }
            },
            {
              id: `state-disabled-${baseId}-3`,
              name: 'disabled',
              description: 'When button cannot be interacted with',
              styles: {
                textColor: '#9ca3af',
                borderColor: '#9ca3af',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        },
        {
          id: `variant-ghost-${baseId}`,
          name: 'Ghost',
          description: 'Minimal button without borders',
          styles: {
            backgroundColor: 'transparent',
            textColor: '#475569',
            borderColor: 'transparent',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: 'none',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-4`,
              name: 'hover',
              description: 'When user hovers over the button',
              styles: {
                backgroundColor: '#f1f5f9',
                textColor: '#334155'
              }
            },
            {
              id: `state-active-${baseId}-4`,
              name: 'active',
              description: 'When button is being pressed',
              styles: {
                backgroundColor: '#e2e8f0',
                textColor: '#1e293b'
              }
            },
            {
              id: `state-disabled-${baseId}-4`,
              name: 'disabled',
              description: 'When button cannot be interacted with',
              styles: {
                textColor: '#9ca3af',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        },
        {
          id: `variant-destructive-${baseId}`,
          name: 'Destructive',
          description: 'Dangerous or destructive actions',
          styles: {
            backgroundColor: '#ef4444',
            textColor: '#ffffff',
            borderColor: '#ef4444',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-5`,
              name: 'hover',
              description: 'When user hovers over the button',
              styles: {
                backgroundColor: '#dc2626',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(239, 68, 68, 0.35)'
              }
            },
            {
              id: `state-active-${baseId}-5`,
              name: 'active',
              description: 'When button is being pressed',
              styles: {
                backgroundColor: '#b91c1c',
                transform: 'translateY(0px)'
              }
            },
            {
              id: `state-disabled-${baseId}-5`,
              name: 'disabled',
              description: 'When button cannot be interacted with',
              styles: {
                backgroundColor: '#9ca3af',
                borderColor: '#9ca3af',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        }
      ];

    case 'input':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard text input field',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#d1d5db',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '400',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            cursor: 'text',
            width: '100%'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-focus-${baseId}-1`,
              name: 'focus',
              description: 'When input is focused',
              styles: {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            },
            {
              id: `state-error-${baseId}-1`,
              name: 'error',
              description: 'When input has validation errors',
              styles: {
                borderColor: '#ef4444',
                boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            },
            {
              id: `state-success-${baseId}-1`,
              name: 'success',
              description: 'When input validation passes',
              styles: {
                borderColor: '#10b981',
                boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            },
            {
              id: `state-disabled-${baseId}-1`,
              name: 'disabled',
              description: 'When input cannot be edited',
              styles: {
                backgroundColor: '#f9fafb',
                textColor: '#9ca3af',
                borderColor: '#e5e7eb',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        },
        {
          id: `variant-search-${baseId}`,
          name: 'Search',
          description: 'Search input with icon',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#d1d5db',
            borderWidth: '2px',
            borderRadius: '24px',
            padding: '12px 16px 12px 48px',
            fontSize: '14px',
            fontWeight: '400',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            cursor: 'text',
            width: '100%'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-focus-${baseId}-2`,
              name: 'focus',
              description: 'When search input is focused',
              styles: {
                borderColor: '#8b5cf6',
                boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            },
            {
              id: `state-disabled-${baseId}-2`,
              name: 'disabled',
              description: 'When search input is disabled',
              styles: {
                backgroundColor: '#f9fafb',
                textColor: '#9ca3af',
                borderColor: '#e5e7eb',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        },
        {
          id: `variant-password-${baseId}`,
          name: 'Password',
          description: 'Password input with toggle visibility',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#d1d5db',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '12px 48px 12px 16px',
            fontSize: '14px',
            fontWeight: '400',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            cursor: 'text',
            width: '100%'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-focus-${baseId}-3`,
              name: 'focus',
              description: 'When password input is focused',
              styles: {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            },
            {
              id: `state-error-${baseId}-3`,
              name: 'error',
              description: 'When password validation fails',
              styles: {
                borderColor: '#ef4444',
                boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            }
          ]
        }
      ];

    case 'card':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard card with subtle shadow',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#e5e7eb',
            borderWidth: '1px',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            cursor: 'default'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-1`,
              name: 'hover',
              description: 'When card is hovered',
              styles: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              }
            }
          ]
        },
        {
          id: `variant-elevated-${baseId}`,
          name: 'Elevated',
          description: 'Card with prominent elevation',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            cursor: 'default'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-2`,
              name: 'hover',
              description: 'When elevated card is hovered',
              styles: {
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.18)',
                transform: 'translateY(-4px)'
              }
            }
          ]
        },
        {
          id: `variant-outlined-${baseId}`,
          name: 'Outlined',
          description: 'Card with prominent border',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#d1d5db',
            borderWidth: '2px',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: 'none',
            cursor: 'default'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-3`,
              name: 'hover',
              description: 'When outlined card is hovered',
              styles: {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
              }
            }
          ]
        },
        {
          id: `variant-interactive-${baseId}`,
          name: 'Interactive',
          description: 'Clickable card with hover effects',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#e5e7eb',
            borderWidth: '1px',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}-4`,
              name: 'hover',
              description: 'When interactive card is hovered',
              styles: {
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-3px) scale(1.02)',
                borderColor: '#3b82f6'
              }
            },
            {
              id: `state-active-${baseId}-4`,
              name: 'active',
              description: 'When interactive card is clicked',
              styles: {
                transform: 'translateY(-1px) scale(1.01)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }
            }
          ]
        }
      ];

    case 'switch':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard toggle switch',
          styles: {
            backgroundColor: '#d1d5db',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '24px',
            width: '48px',
            height: '24px',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-checked-${baseId}-1`,
              name: 'checked',
              description: 'When switch is turned on',
              styles: {
                backgroundColor: '#3b82f6'
              }
            },
            {
              id: `state-hover-${baseId}-1`,
              name: 'hover',
              description: 'When switch is hovered',
              styles: {
                backgroundColor: '#9ca3af'
              }
            },
            {
              id: `state-disabled-${baseId}-1`,
              name: 'disabled',
              description: 'When switch cannot be toggled',
              styles: {
                backgroundColor: '#f3f4f6',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        },
        {
          id: `variant-small-${baseId}`,
          name: 'Small',
          description: 'Compact toggle switch',
          styles: {
            backgroundColor: '#d1d5db',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '20px',
            width: '40px',
            height: '20px',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-checked-${baseId}-2`,
              name: 'checked',
              description: 'When small switch is turned on',
              styles: {
                backgroundColor: '#3b82f6'
              }
            },
            {
              id: `state-disabled-${baseId}-2`,
              name: 'disabled',
              description: 'When small switch is disabled',
              styles: {
                backgroundColor: '#f3f4f6',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        },
        {
          id: `variant-large-${baseId}`,
          name: 'Large',
          description: 'Prominent toggle switch',
          styles: {
            backgroundColor: '#d1d5db',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '28px',
            width: '56px',
            height: '28px',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-checked-${baseId}-3`,
              name: 'checked',
              description: 'When large switch is turned on',
              styles: {
                backgroundColor: '#3b82f6'
              }
            },
            {
              id: `state-disabled-${baseId}-3`,
              name: 'disabled',
              description: 'When large switch is disabled',
              styles: {
                backgroundColor: '#f3f4f6',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        }
      ];

    case 'checkbox':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard checkbox',
          styles: {
            backgroundColor: '#ffffff',
            borderColor: '#d1d5db',
            borderWidth: '2px',
            borderRadius: '6px',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-checked-${baseId}-1`,
              name: 'checked',
              description: 'When checkbox is selected',
              styles: {
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6'
              }
            },
            {
              id: `state-hover-${baseId}-1`,
              name: 'hover',
              description: 'When checkbox is hovered',
              styles: {
                borderColor: '#3b82f6'
              }
            },
            {
              id: `state-disabled-${baseId}-1`,
              name: 'disabled',
              description: 'When checkbox cannot be selected',
              styles: {
                backgroundColor: '#f9fafb',
                borderColor: '#e5e7eb',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            },
            {
              id: `state-indeterminate-${baseId}-1`,
              name: 'indeterminate',
              description: 'When checkbox is partially selected',
              styles: {
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6'
              }
            }
          ]
        },
        {
          id: `variant-rounded-${baseId}`,
          name: 'Rounded',
          description: 'Checkbox with rounded corners',
          styles: {
            backgroundColor: '#ffffff',
            borderColor: '#d1d5db',
            borderWidth: '2px',
            borderRadius: '12px',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-checked-${baseId}-2`,
              name: 'checked',
              description: 'When rounded checkbox is selected',
              styles: {
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6'
              }
            },
            {
              id: `state-disabled-${baseId}-2`,
              name: 'disabled',
              description: 'When rounded checkbox is disabled',
              styles: {
                backgroundColor: '#f9fafb',
                borderColor: '#e5e7eb',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        }
      ];

    case 'radio':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard radio button',
          styles: {
            backgroundColor: '#ffffff',
            borderColor: '#d1d5db',
            borderWidth: '2px',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            cursor: 'pointer'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-selected-${baseId}-1`,
              name: 'selected',
              description: 'When radio button is selected',
              styles: {
                borderColor: '#3b82f6'
              }
            },
            {
              id: `state-hover-${baseId}-1`,
              name: 'hover',
              description: 'When radio button is hovered',
              styles: {
                borderColor: '#3b82f6'
              }
            },
            {
              id: `state-disabled-${baseId}-1`,
              name: 'disabled',
              description: 'When radio button cannot be selected',
              styles: {
                backgroundColor: '#f9fafb',
                borderColor: '#e5e7eb',
                cursor: 'not-allowed',
                opacity: 0.6
              }
            }
          ]
        }
      ];

    case 'alert':
      return [
        {
          id: `variant-info-${baseId}`,
          name: 'Info',
          description: 'Informational alert',
          styles: {
            backgroundColor: '#dbeafe',
            textColor: '#1e40af',
            borderColor: '#93c5fd',
            borderWidth: '1px',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: 'none'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-warning-${baseId}`,
          name: 'Warning',
          description: 'Warning alert',
          styles: {
            backgroundColor: '#fef3c7',
            textColor: '#92400e',
            borderColor: '#fcd34d',
            borderWidth: '1px',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: 'none'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-error-${baseId}`,
          name: 'Error',
          description: 'Error alert',
          styles: {
            backgroundColor: '#fee2e2',
            textColor: '#991b1b',
            borderColor: '#fca5a5',
            borderWidth: '1px',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: 'none'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-success-${baseId}`,
          name: 'Success',
          description: 'Success alert',
          styles: {
            backgroundColor: '#d1fae5',
            textColor: '#065f46',
            borderColor: '#86efac',
            borderWidth: '1px',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: 'none'
          },
          states: [getDefaultStateForVariant()]
        }
      ];

    case 'badge':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard badge',
          styles: {
            backgroundColor: '#f3f4f6',
            textColor: '#374151',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '12px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: '500'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-secondary-${baseId}`,
          name: 'Secondary',
          description: 'Secondary colored badge',
          styles: {
            backgroundColor: '#e0e7ff',
            textColor: '#3730a3',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '12px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: '500'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-outline-${baseId}`,
          name: 'Outline',
          description: 'Outlined badge',
          styles: {
            backgroundColor: 'transparent',
            textColor: '#374151',
            borderColor: '#d1d5db',
            borderWidth: '1px',
            borderRadius: '12px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: '500'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-destructive-${baseId}`,
          name: 'Destructive',
          description: 'Error or warning badge',
          styles: {
            backgroundColor: '#fee2e2',
            textColor: '#991b1b',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '12px',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: '500'
          },
          states: [getDefaultStateForVariant()]
        }
      ];

    case 'avatar':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard avatar',
          styles: {
            backgroundColor: '#e5e7eb',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '50%',
            width: '40px',
            height: '40px'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-small-${baseId}`,
          name: 'Small',
          description: 'Compact avatar',
          styles: {
            backgroundColor: '#e5e7eb',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '50%',
            width: '32px',
            height: '32px'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-large-${baseId}`,
          name: 'Large',
          description: 'Prominent avatar',
          styles: {
            backgroundColor: '#e5e7eb',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '50%',
            width: '64px',
            height: '64px'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-squared-${baseId}`,
          name: 'Squared',
          description: 'Square avatar with rounded corners',
          styles: {
            backgroundColor: '#e5e7eb',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '12px',
            width: '40px',
            height: '40px'
          },
          states: [getDefaultStateForVariant()]
        }
      ];

    case 'progress':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard progress bar',
          styles: {
            backgroundColor: '#f3f4f6',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '8px',
            height: '8px',
            width: '100%'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-success-${baseId}`,
          name: 'Success',
          description: 'Success progress bar',
          styles: {
            backgroundColor: '#f3f4f6',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '8px',
            height: '8px',
            width: '100%'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-warning-${baseId}`,
          name: 'Warning',
          description: 'Warning progress bar',
          styles: {
            backgroundColor: '#f3f4f6',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '8px',
            height: '8px',
            width: '100%'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-error-${baseId}`,
          name: 'Error',
          description: 'Error progress bar',
          styles: {
            backgroundColor: '#f3f4f6',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '8px',
            height: '8px',
            width: '100%'
          },
          states: [getDefaultStateForVariant()]
        }
      ];

    case 'accordion':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard accordion',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#e5e7eb',
            borderWidth: '1px',
            borderRadius: '12px',
            padding: '0px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-expanded-${baseId}-1`,
              name: 'expanded',
              description: 'When accordion section is open',
              styles: {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.2)'
              }
            }
          ]
        },
        {
          id: `variant-minimal-${baseId}`,
          name: 'Minimal',
          description: 'Clean accordion without borders',
          styles: {
            backgroundColor: 'transparent',
            textColor: '#374151',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '8px',
            padding: '0px',
            boxShadow: 'none'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-expanded-${baseId}-2`,
              name: 'expanded',
              description: 'When minimal accordion is open',
              styles: {
                backgroundColor: '#f9fafb'
              }
            }
          ]
        }
      ];

    case 'tabs':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard tab navigation',
          styles: {
            backgroundColor: '#f9fafb',
            textColor: '#374151',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '12px',
            padding: '4px'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-active-${baseId}-1`,
              name: 'active',
              description: 'Currently selected tab',
              styles: {
                backgroundColor: '#ffffff',
                textColor: '#3b82f6',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }
            }
          ]
        },
        {
          id: `variant-underlined-${baseId}`,
          name: 'Underlined',
          description: 'Tab navigation with underline',
          styles: {
            backgroundColor: 'transparent',
            textColor: '#6b7280',
            borderColor: 'transparent',
            borderWidth: '0px',
            borderRadius: '0px',
            padding: '12px 16px'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-active-${baseId}-2`,
              name: 'active',
              description: 'Currently selected underlined tab',
              styles: {
                textColor: '#3b82f6',
                borderColor: '#3b82f6',
                borderWidth: '0px 0px 2px 0px'
              }
            }
          ]
        }
      ];

    // Add more component types...
    case 'stat-card':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard metric card',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#e5e7eb',
            borderWidth: '1px',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          },
          states: [getDefaultStateForVariant()]
        },
        {
          id: `variant-colored-${baseId}`,
          name: 'Colored',
          description: 'Metric card with color accent',
          styles: {
            backgroundColor: '#ffffff',
            textColor: '#374151',
            borderColor: '#3b82f6',
            borderWidth: '2px',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.1)'
          },
          states: [getDefaultStateForVariant()]
        }
      ];

    case 'file-upload':
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard file upload area',
          styles: {
            backgroundColor: '#f8fafc',
            textColor: '#475569',
            borderColor: '#cbd5e1',
            borderWidth: '2px',
            borderRadius: '16px',
            padding: '48px 24px',
            boxShadow: 'none'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-dragover-${baseId}-1`,
              name: 'dragover',
              description: 'When files are dragged over the area',
              styles: {
                backgroundColor: '#dbeafe',
                borderColor: '#3b82f6',
                textColor: '#1e40af'
              }
            }
          ]
        },
        {
          id: `variant-compact-${baseId}`,
          name: 'Compact',
          description: 'Smaller file upload area',
          styles: {
            backgroundColor: '#f8fafc',
            textColor: '#475569',
            borderColor: '#cbd5e1',
            borderWidth: '2px',
            borderRadius: '12px',
            padding: '24px 16px',
            boxShadow: 'none'
          },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-dragover-${baseId}-2`,
              name: 'dragover',
              description: 'When files are dragged over compact area',
              styles: {
                backgroundColor: '#dbeafe',
                borderColor: '#3b82f6'
              }
            }
          ]
        }
      ];

    default:
      // Fallback for any component type not explicitly handled
      return [
        {
          id: `variant-default-${baseId}`,
          name: 'Default',
          description: 'Standard component appearance',
          styles: { ...defaultComponentStyles },
          states: [
            getDefaultStateForVariant(),
            {
              id: `state-hover-${baseId}`,
              name: 'hover',
              description: 'When component is hovered',
              styles: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)'
              }
            },
            {
              id: `state-disabled-${baseId}`,
              name: 'disabled',
              description: 'When component is disabled',
              styles: {
                opacity: 0.6,
                cursor: 'not-allowed'
              }
            }
          ]
        }
      ];
  }
};
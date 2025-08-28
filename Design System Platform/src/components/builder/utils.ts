import { ComponentElement, HistoryState } from "./types";

export const snapToGridValue = (value: number, gridSize: number = 10, snapEnabled: boolean = true) => {
  return snapEnabled ? Math.round(value / gridSize) * gridSize : value;
};

export const generateElementId = (type: string): string => {
  return `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createHistoryState = (elements: ComponentElement[], description: string): HistoryState => {
  return {
    elements: JSON.parse(JSON.stringify(elements)),
    timestamp: Date.now(),
    description,
  };
};

export const getElementBounds = (element: ComponentElement) => {
  return {
    left: element.x,
    top: element.y,
    right: element.x + element.width,
    bottom: element.y + element.height,
  };
};

export const isElementIntersecting = (element1: ComponentElement, element2: ComponentElement): boolean => {
  const bounds1 = getElementBounds(element1);
  const bounds2 = getElementBounds(element2);
  
  return !(
    bounds1.right < bounds2.left ||
    bounds1.left > bounds2.right ||
    bounds1.bottom < bounds2.top ||
    bounds1.top > bounds2.bottom
  );
};

export const getElementCenter = (element: ComponentElement) => {
  return {
    x: element.x + element.width / 2,
    y: element.y + element.height / 2,
  };
};

export const alignElements = (elements: ComponentElement[], alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom'): ComponentElement[] => {
  if (elements.length < 2) return elements;
  
  const bounds = elements.map(getElementBounds);
  
  switch (alignment) {
    case 'left':
      const minLeft = Math.min(...bounds.map(b => b.left));
      return elements.map(el => ({ ...el, x: minLeft }));
    case 'right':
      const maxRight = Math.max(...bounds.map(b => b.right));
      return elements.map(el => ({ ...el, x: maxRight - el.width }));
    case 'center':
      const avgCenterX = bounds.reduce((sum, b) => sum + (b.left + b.right) / 2, 0) / bounds.length;
      return elements.map(el => ({ ...el, x: avgCenterX - el.width / 2 }));
    case 'top':
      const minTop = Math.min(...bounds.map(b => b.top));
      return elements.map(el => ({ ...el, y: minTop }));
    case 'bottom':
      const maxBottom = Math.max(...bounds.map(b => b.bottom));
      return elements.map(el => ({ ...el, y: maxBottom - el.height }));
    case 'middle':
      const avgCenterY = bounds.reduce((sum, b) => sum + (b.top + b.bottom) / 2, 0) / bounds.length;
      return elements.map(el => ({ ...el, y: avgCenterY - el.height / 2 }));
    default:
      return elements;
  }
};

export const distributeElements = (elements: ComponentElement[], direction: 'horizontal' | 'vertical'): ComponentElement[] => {
  if (elements.length < 3) return elements;
  
  const sorted = [...elements].sort((a, b) => 
    direction === 'horizontal' ? a.x - b.x : a.y - b.y
  );
  
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  
  if (direction === 'horizontal') {
    const totalWidth = (last.x + last.width) - first.x;
    const availableSpace = totalWidth - sorted.reduce((sum, el) => sum + el.width, 0);
    const spacing = availableSpace / (sorted.length - 1);
    
    let currentX = first.x;
    return sorted.map(el => {
      const newEl = { ...el, x: currentX };
      currentX += el.width + spacing;
      return newEl;
    });
  } else {
    const totalHeight = (last.y + last.height) - first.y;
    const availableSpace = totalHeight - sorted.reduce((sum, el) => sum + el.height, 0);
    const spacing = availableSpace / (sorted.length - 1);
    
    let currentY = first.y;
    return sorted.map(el => {
      const newEl = { ...el, y: currentY };
      currentY += el.height + spacing;
      return newEl;
    });
  }
};

export const generateComponentCode = (elements: ComponentElement[], language: 'react' | 'vue' | 'angular' = 'react'): string => {
  if (elements.length === 0) return "// Add elements to generate code";

  const generateElementCode = (element: ComponentElement): string => {
    switch (element.type) {
      case 'button':
        return `<Button
  variant="${element.props.variant}"
  size="${element.props.size}"
  ${element.props.disabled ? 'disabled' : ''}
  ${element.props.fullWidth ? 'className="w-full"' : ''}
  style={{ borderRadius: '${element.style.borderRadius}px' }}
>
  ${element.props.text}
</Button>`;

      case 'input':
        return `<Input
  type="${element.props.type}"
  placeholder="${element.props.placeholder}"
  ${element.props.required ? 'required' : ''}
  ${element.props.disabled ? 'disabled' : ''}
  style={{ borderRadius: '${element.style.borderRadius}px' }}
/>`;

      case 'label':
        return `<Label>
  ${element.props.text}${element.props.required ? ' <span className="text-red-500">*</span>' : ''}
</Label>`;

      case 'card':
        return `<Card style={{ borderRadius: '${element.style.borderRadius}px' }}>
  <CardContent style={{ padding: '${element.props.padding?.y}px ${element.props.padding?.x}px' }}>
    {/* Card content here */}
  </CardContent>
</Card>`;

      default:
        return `<div>{/* ${element.type} */}</div>`;
    }
  };

  return elements.map(generateElementCode).join('\n\n');
};
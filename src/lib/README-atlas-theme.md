# Atlas Theme System

This document describes the Atlas dynamic theming system for BiotIA's medical specialties.

## Overview

The Atlas theme system provides distinct color palettes for each medical specialty, ensuring visual coherence and accessibility compliance. Each theme includes carefully selected colors that maintain WCAG 2.1 AA accessibility standards.

## Available Themes

### Medical Specialties

- **General** (`general`) - Default BiotIA green/teal palette
- **Hematología** (`hematologia`) - Red palette for blood analysis
- **Parasitología** (`parasitologia`) - Brown/earth tones for parasitology
- **Micología** (`micologia`) - Blue palette for mycology
- **Bacteriología** (`bacteriologia`) - Violet palette for bacteriology
- **Citología e Histología** (`citologia-histologia`) - Pink/rose palette
- **Uroanálisis** (`uroanalisis`) - Yellow palette for urine analysis
- **Coproanálisis** (`coproanalisis`) - Light brown palette for stool analysis

## Usage

### Basic Theme Access

```typescript
import { ATLAS_THEMES, getThemeByCategory } from '@/lib/atlas-theme';

// Get a specific theme
const hematologyTheme = ATLAS_THEMES.hematologia;

// Get theme with fallback
const theme = getThemeByCategory('hematologia');
```

### Color Manipulation

```typescript
import { 
  lightenColor, 
  darkenColor, 
  saturateColor, 
  desaturateColor 
} from '@/lib/atlas-theme';

// Lighten a color by 10%
const lighterRed = lightenColor('hsl(0, 70%, 45%)', 10);

// Darken a color by 15%
const darkerBlue = darkenColor('hsl(210, 70%, 45%)', 15);

// Increase saturation
const moreSaturated = saturateColor('hsl(173, 67%, 35%)', 20);
```

### Accessibility Validation

```typescript
import { 
  validateContrast, 
  validateThemeAccessibility, 
  getAccessibleTheme 
} from '@/lib/atlas-theme';

// Check contrast between two colors
const contrastResult = validateContrast(
  'hsl(0, 0%, 10%)', // foreground
  'hsl(0, 0%, 95%)'  // background
);

console.log(contrastResult.isValid); // true
console.log(contrastResult.ratio);   // 18.5
console.log(contrastResult.level);   // 'AAA'

// Validate entire theme
const validation = validateThemeAccessibility(ATLAS_THEMES.hematologia);
if (!validation.isValid) {
  console.log('Issues:', validation.issues);
}

// Get automatically adjusted theme if needed
const accessibleTheme = getAccessibleTheme('hematologia');
```

## Theme Structure

Each theme contains the following color properties:

```typescript
interface AtlasTheme {
  category: CategoryKey;
  name: string;
  colors: {
    background: string;           // Very pale background color
    backgroundSecondary: string;  // Slightly darker background
    primary: string;              // Main intense color
    primaryForeground: string;    // Text color for primary
    accent: string;               // Secondary accent color
    accentForeground: string;     // Text color for accent
    muted: string;                // Muted background color
    mutedForeground: string;      // Muted text color
  };
}
```

## CSS Integration

The theme system automatically updates CSS custom properties:

```css
:root {
  --atlas-bg-primary: /* background color */;
  --atlas-bg-secondary: /* backgroundSecondary color */;
  --atlas-color-primary: /* primary color */;
  --atlas-color-primary-fg: /* primaryForeground color */;
  --atlas-color-accent: /* accent color */;
  --atlas-color-accent-fg: /* accentForeground color */;
  --atlas-color-muted: /* muted color */;
  --atlas-color-muted-fg: /* mutedForeground color */;
}
```

Use these variables in your CSS:

```css
.atlas-themed-element {
  background-color: var(--atlas-bg-primary);
  color: var(--atlas-color-primary);
  border: 1px solid var(--atlas-color-accent);
}
```

## Accessibility Features

- All themes meet WCAG 2.1 AA contrast standards (4.5:1 minimum)
- Automatic color adjustment functions available
- Built-in contrast validation utilities
- Support for high contrast modes

## Error Handling

The theme system includes robust error handling:

- Invalid theme categories fallback to 'general'
- Color manipulation functions return original colors on error
- Contrast calculations handle malformed color strings gracefully
- CSS property updates are safely wrapped for SSR compatibility

## Testing

Run the theme system tests:

```bash
npm run test:run -- atlas-theme.test.ts
```

The test suite validates:
- Theme completeness and structure
- Color manipulation utilities
- Accessibility compliance
- Error handling scenarios
- Medical specialty color requirements
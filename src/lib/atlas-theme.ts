// Atlas Theme Configuration and Types
export type CategoryKey = 
  | 'general'
  | 'hematologia'
  | 'parasitologia'
  | 'micologia'
  | 'bacteriologia'
  | 'citologia-histologia'
  | 'uroanalisis'
  | 'coproanalisis';

export interface AtlasTheme {
  category: CategoryKey;
  name: string;
  colors: {
    background: string;           // Fondo principal (pálido)
    backgroundSecondary: string;  // Fondo secundario
    primary: string;              // Color principal (intenso)
    primaryForeground: string;    // Texto sobre primary
    accent: string;               // Color de acento
    accentForeground: string;     // Texto sobre accent
    muted: string;                // Color apagado
    mutedForeground: string;      // Texto apagado
  };
}

// Color contrast validation interface
export interface ContrastValidationResult {
  isValid: boolean;
  ratio: number;
  level: 'AA' | 'AAA' | 'FAIL';
  recommendation?: string;
}

// Color manipulation utilities interface
export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

// Complete theme configuration for all medical specialties
// Each palette is carefully designed for accessibility and visual coherence
export const ATLAS_THEMES: Record<CategoryKey, AtlasTheme> = {
  general: {
    category: 'general',
    name: 'Atlas General',
    colors: {
      background: 'hsl(173, 35%, 96%)',        // Verde muy pálido - optimizado para contraste
      backgroundSecondary: 'hsl(173, 30%, 92%)',
      primary: 'hsl(173, 67%, 30%)',           // Verde BiotIA - más oscuro para contraste 4.5+
      primaryForeground: 'hsl(0, 0%, 98%)',
      accent: 'hsl(195, 53%, 38%)',            // Azul complementario - más oscuro para contraste 4.5+
      accentForeground: 'hsl(0, 0%, 100%)',
      muted: 'hsl(173, 25%, 88%)',
      mutedForeground: 'hsl(173, 30%, 35%)',   // Mejorado para contraste AA
    }
  },
  hematologia: {
    category: 'hematologia',
    name: 'Atlas de Hematología',
    colors: {
      background: 'hsl(0, 45%, 96%)',          // Rojo muy pálido - optimizado
      backgroundSecondary: 'hsl(0, 40%, 92%)',
      primary: 'hsl(0, 75%, 38%)',             // Rojo intenso - oscurecido para mejor contraste
      primaryForeground: 'hsl(0, 0%, 98%)',
      accent: 'hsl(0, 65%, 45%)',              // Rojo medio - oscurecido para contraste
      accentForeground: 'hsl(0, 0%, 100%)',
      muted: 'hsl(0, 25%, 88%)',
      mutedForeground: 'hsl(0, 35%, 32%)',     // Contraste mejorado
    }
  },
  parasitologia: {
    category: 'parasitologia',
    name: 'Atlas de Parasitología',
    colors: {
      background: 'hsl(30, 35%, 96%)',         // Marrón muy pálido - optimizado
      backgroundSecondary: 'hsl(30, 30%, 92%)',
      primary: 'hsl(30, 65%, 35%)',            // Marrón intenso - oscurecido para mejor contraste
      primaryForeground: 'hsl(0, 0%, 98%)',
      accent: 'hsl(30, 55%, 40%)',             // Marrón medio - más oscuro para contraste 4.5+
      accentForeground: 'hsl(0, 0%, 100%)',
      muted: 'hsl(30, 25%, 88%)',
      mutedForeground: 'hsl(30, 40%, 32%)',    // Contraste mejorado
    }
  },
  micologia: {
    category: 'micologia',
    name: 'Atlas de Micología',
    colors: {
      background: 'hsl(210, 40%, 96%)',        // Azul muy pálido - optimizado
      backgroundSecondary: 'hsl(210, 35%, 92%)',
      primary: 'hsl(210, 75%, 38%)',           // Azul intenso - oscurecido para mejor contraste
      primaryForeground: 'hsl(0, 0%, 98%)',
      accent: 'hsl(210, 65%, 45%)',            // Azul medio - oscurecido para contraste
      accentForeground: 'hsl(0, 0%, 100%)',
      muted: 'hsl(210, 25%, 88%)',
      mutedForeground: 'hsl(210, 35%, 35%)',   // Contraste mejorado
    }
  },
  bacteriologia: {
    category: 'bacteriologia',
    name: 'Atlas de Bacteriología',
    colors: {
      background: 'hsl(270, 40%, 96%)',        // Violeta muy pálido - optimizado
      backgroundSecondary: 'hsl(270, 35%, 92%)',
      primary: 'hsl(270, 65%, 38%)',           // Violeta intenso - oscurecido para mejor contraste
      primaryForeground: 'hsl(0, 0%, 98%)',
      accent: 'hsl(270, 55%, 45%)',            // Violeta medio - oscurecido para contraste
      accentForeground: 'hsl(0, 0%, 100%)',
      muted: 'hsl(270, 25%, 88%)',
      mutedForeground: 'hsl(270, 35%, 35%)',   // Contraste mejorado
    }
  },
  'citologia-histologia': {
    category: 'citologia-histologia',
    name: 'Atlas de Citología e Histología',
    colors: {
      background: 'hsl(330, 40%, 96%)',        // Rosa muy pálido - optimizado
      backgroundSecondary: 'hsl(330, 35%, 92%)',
      primary: 'hsl(330, 65%, 38%)',           // Rosa intenso - oscurecido para mejor contraste
      primaryForeground: 'hsl(0, 0%, 98%)',
      accent: 'hsl(330, 55%, 45%)',            // Rosa medio - oscurecido para contraste
      accentForeground: 'hsl(0, 0%, 100%)',
      muted: 'hsl(330, 25%, 88%)',
      mutedForeground: 'hsl(330, 35%, 35%)',   // Contraste mejorado
    }
  },
  uroanalisis: {
    category: 'uroanalisis',
    name: 'Atlas de Uroanálisis',
    colors: {
      background: 'hsl(50, 50%, 96%)',         // Amarillo muy pálido - optimizado
      backgroundSecondary: 'hsl(50, 45%, 92%)',
      primary: 'hsl(50, 85%, 32%)',            // Amarillo intenso - oscurecido para mejor contraste
      primaryForeground: 'hsl(0, 0%, 8%)',     // Texto muy oscuro para amarillo
      accent: 'hsl(50, 75%, 38%)',             // Amarillo medio - oscurecido para contraste
      accentForeground: 'hsl(0, 0%, 8%)',      // Texto muy oscuro
      muted: 'hsl(50, 30%, 88%)',
      mutedForeground: 'hsl(50, 35%, 25%)',    // Contraste muy mejorado para amarillo
    }
  },
  coproanalisis: {
    category: 'coproanalisis',
    name: 'Atlas de Coproanálisis',
    colors: {
      background: 'hsl(25, 35%, 96%)',         // Marrón claro muy pálido - optimizado
      backgroundSecondary: 'hsl(25, 30%, 92%)',
      primary: 'hsl(25, 65%, 35%)',            // Marrón claro intenso - oscurecido para mejor contraste
      primaryForeground: 'hsl(0, 0%, 98%)',
      accent: 'hsl(25, 55%, 42%)',             // Marrón claro medio - oscurecido para contraste
      accentForeground: 'hsl(0, 0%, 100%)',
      muted: 'hsl(25, 25%, 88%)',
      mutedForeground: 'hsl(25, 40%, 32%)',    // Contraste mejorado
    }
  },
};

// Utility function to get theme by category with fallback
export function getThemeByCategory(category: string): AtlasTheme {
  const normalizedCategory = category.toLowerCase() as CategoryKey;
  return ATLAS_THEMES[normalizedCategory] || ATLAS_THEMES.general;
}

// Performance-optimized CSS custom property updates
let updateScheduled = false;
let pendingTheme: AtlasTheme | null = null;

// Utility function to update CSS custom properties with performance optimizations
export function updateCSSProperties(theme: AtlasTheme): void {
  if (typeof document === 'undefined') return; // SSR safety
  
  // Store the pending theme update
  pendingTheme = theme;
  
  // Use requestAnimationFrame to batch CSS updates and prevent layout thrashing
  if (!updateScheduled) {
    updateScheduled = true;
    requestAnimationFrame(() => {
      if (pendingTheme) {
        performCSSUpdate(pendingTheme);
        pendingTheme = null;
      }
      updateScheduled = false;
    });
  }
}

// Internal function to perform the actual CSS update
function performCSSUpdate(theme: AtlasTheme): void {
  const root = document.documentElement;
  
  // Batch all CSS custom property updates to minimize reflows
  const cssUpdates = [
    ['--atlas-bg-primary', theme.colors.background],
    ['--atlas-bg-secondary', theme.colors.backgroundSecondary],
    ['--atlas-color-primary', theme.colors.primary],
    ['--atlas-color-primary-fg', theme.colors.primaryForeground],
    ['--atlas-color-accent', theme.colors.accent],
    ['--atlas-color-accent-fg', theme.colors.accentForeground],
    ['--atlas-color-muted', theme.colors.muted],
    ['--atlas-color-muted-fg', theme.colors.mutedForeground],
    // Extended theme properties for better visual consistency
    ['--atlas-border', lightenColor(theme.colors.muted, 5)],
    ['--atlas-border-hover', darkenColor(theme.colors.muted, 10)],
    ['--atlas-shadow', `${theme.colors.primary}1a`], // 10% opacity
    ['--atlas-shadow-hover', `${theme.colors.primary}33`], // 20% opacity
    ['--atlas-overlay', `${theme.colors.primary}80`], // 50% opacity
  ];
  
  // Apply all updates in a single batch to minimize layout recalculations
  cssUpdates.forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Update gradient properties
  root.style.setProperty('--atlas-gradient-primary', 
    `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`);
  root.style.setProperty('--atlas-gradient-background', 
    `linear-gradient(180deg, ${theme.colors.background}, ${theme.colors.backgroundSecondary})`);
}

// Utility function to extract category from URL hash with enhanced error handling
export function getCategoryFromHash(): CategoryKey {
  if (typeof window === 'undefined') return 'general'; // SSR safety
  
  try {
    const hash = window.location.hash.replace('#', '').toLowerCase().trim();
    
    // Handle empty hash
    if (!hash) {
      return 'general';
    }
    
    // Validate category exists in themes
    const category = hash as CategoryKey;
    if (ATLAS_THEMES[category]) {
      return category;
    }
    
    // Log warning for invalid category but don't break functionality
    console.warn(`Invalid Atlas theme category in URL hash: "${hash}". Falling back to general theme.`);
    return 'general';
    
  } catch (error) {
    console.error('Error parsing URL hash for theme category:', error);
    return 'general';
  }
}

// Utility function to update URL hash without triggering navigation
export function updateUrlHash(category: CategoryKey, replace: boolean = true): void {
  if (typeof window === 'undefined') return; // SSR safety
  
  try {
    const newHash = `#${category}`;
    const currentHash = window.location.hash;
    
    // Only update if hash is different
    if (currentHash !== newHash) {
      if (replace) {
        // Use replaceState to avoid adding to browser history
        window.history.replaceState(null, '', newHash);
      } else {
        // Use pushState to add to browser history
        window.history.pushState(null, '', newHash);
      }
    }
  } catch (error) {
    console.error('Error updating URL hash:', error);
  }
}

// Utility function to validate if a category is valid
export function isValidCategory(category: string): category is CategoryKey {
  return typeof category === 'string' && category in ATLAS_THEMES;
}

// Utility function to get all available categories
export function getAvailableCategories(): CategoryKey[] {
  return Object.keys(ATLAS_THEMES) as CategoryKey[];
}

// Session storage key for theme persistence
const THEME_STORAGE_KEY = 'atlas-theme-category';

// Theme preloading cache
const themePreloadCache = new Map<CategoryKey, AtlasTheme>();
let preloadInitialized = false;

// Preload all theme configurations for instant switching
export function preloadThemeConfigurations(): void {
  if (preloadInitialized || typeof window === 'undefined') return;
  
  try {
    // Cache all theme configurations
    Object.entries(ATLAS_THEMES).forEach(([category, theme]) => {
      themePreloadCache.set(category as CategoryKey, theme);
    });
    
    // Pre-calculate derived colors for better performance
    Object.values(ATLAS_THEMES).forEach(theme => {
      // Pre-calculate border colors
      lightenColor(theme.colors.muted, 5);
      darkenColor(theme.colors.muted, 10);
      
      // Pre-calculate shadow colors with opacity
      `${theme.colors.primary}1a`;
      `${theme.colors.primary}33`;
      `${theme.colors.primary}80`;
    });
    
    preloadInitialized = true;
    console.debug('Atlas theme configurations preloaded successfully');
  } catch (error) {
    console.warn('Failed to preload theme configurations:', error);
  }
}

// Get preloaded theme (faster than direct access)
export function getPreloadedTheme(category: CategoryKey): AtlasTheme {
  if (!preloadInitialized) {
    preloadThemeConfigurations();
  }
  
  return themePreloadCache.get(category) || ATLAS_THEMES[category] || ATLAS_THEMES.general;
}

// Utility function to persist theme to session storage
export function persistThemeToSession(category: CategoryKey): void {
  if (typeof window === 'undefined') return; // SSR safety
  
  try {
    sessionStorage.setItem(THEME_STORAGE_KEY, category);
  } catch (error) {
    console.warn('Failed to persist theme to session storage:', error);
  }
}

// Utility function to get persisted theme from session storage
export function getPersistedTheme(): CategoryKey | null {
  if (typeof window === 'undefined') return null; // SSR safety
  
  try {
    const stored = sessionStorage.getItem(THEME_STORAGE_KEY);
    if (stored && isValidCategory(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to retrieve theme from session storage:', error);
  }
  
  return null;
}

// Utility function to clear persisted theme
export function clearPersistedTheme(): void {
  if (typeof window === 'undefined') return; // SSR safety
  
  try {
    sessionStorage.removeItem(THEME_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear persisted theme:', error);
  }
}

// Utility function to get theme with fallback priority:
// 1. URL hash (if present and not empty)
// 2. Session storage
// 3. Default (general)
export function getThemeWithFallback(): CategoryKey {
  if (typeof window === 'undefined') return 'general'; // SSR safety
  
  // First priority: URL hash (if explicitly set)
  const hash = window.location.hash.replace('#', '').toLowerCase().trim();
  if (hash && isValidCategory(hash)) {
    return hash as CategoryKey;
  }
  
  // Second priority: Session storage (only if no hash is present)
  if (!hash) {
    const persistedCategory = getPersistedTheme();
    if (persistedCategory) {
      return persistedCategory;
    }
  }
  
  // Final fallback: general
  return 'general';
}

// ============================================================================
// COLOR MANIPULATION UTILITIES
// ============================================================================

/**
 * Parse HSL color string to HSL object
 */
export function parseHSL(hslString: string): HSLColor {
  const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) {
    throw new Error(`Invalid HSL color format: ${hslString}`);
  }
  
  return {
    h: parseInt(match[1], 10),
    s: parseInt(match[2], 10),
    l: parseInt(match[3], 10),
  };
}

/**
 * Convert HSL object to HSL string
 */
export function hslToString(hsl: HSLColor): string {
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

/**
 * Convert HSL to RGB for contrast calculations
 */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number): number => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Calculate relative luminance of a color (for contrast calculations)
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  try {
    const hsl1 = parseHSL(color1);
    const hsl2 = parseHSL(color2);
    
    const [r1, g1, b1] = hslToRgb(hsl1.h, hsl1.s, hsl1.l);
    const [r2, g2, b2] = hslToRgb(hsl2.h, hsl2.s, hsl2.l);
    
    const lum1 = getRelativeLuminance(r1, g1, b1);
    const lum2 = getRelativeLuminance(r2, g2, b2);
    
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  } catch (error) {
    console.warn('Error calculating contrast ratio:', error);
    return 1; // Fallback to worst case
  }
}

/**
 * Validate color contrast for accessibility compliance
 */
export function validateContrast(
  foreground: string, 
  background: string, 
  isLargeText: boolean = false
): ContrastValidationResult {
  const ratio = getContrastRatio(foreground, background);
  const minRatio = isLargeText ? 3.0 : 4.5; // WCAG 2.1 AA standards
  const aaaRatio = isLargeText ? 4.5 : 7.0; // WCAG 2.1 AAA standards
  
  let level: 'AA' | 'AAA' | 'FAIL';
  let recommendation: string | undefined;
  
  if (ratio >= aaaRatio) {
    level = 'AAA';
  } else if (ratio >= minRatio) {
    level = 'AA';
  } else {
    level = 'FAIL';
    recommendation = `Contrast ratio ${ratio.toFixed(2)} is below WCAG AA standard (${minRatio}). Consider darkening foreground or lightening background.`;
  }
  
  return {
    isValid: ratio >= minRatio,
    ratio: Math.round(ratio * 100) / 100,
    level,
    recommendation
  };
}

/**
 * Adjust color lightness to improve contrast
 */
export function adjustColorForContrast(
  color: string, 
  targetBackground: string, 
  targetRatio: number = 4.5
): string {
  try {
    const hsl = parseHSL(color);
    let adjustedHsl = { ...hsl };
    
    // Try darkening first (more common need)
    for (let l = hsl.l; l >= 10; l -= 5) {
      adjustedHsl.l = l;
      const testColor = hslToString(adjustedHsl);
      const ratio = getContrastRatio(testColor, targetBackground);
      
      if (ratio >= targetRatio) {
        return testColor;
      }
    }
    
    // If darkening didn't work, try lightening
    adjustedHsl = { ...hsl };
    for (let l = hsl.l; l <= 90; l += 5) {
      adjustedHsl.l = l;
      const testColor = hslToString(adjustedHsl);
      const ratio = getContrastRatio(testColor, targetBackground);
      
      if (ratio >= targetRatio) {
        return testColor;
      }
    }
    
    // If neither worked, return original color
    return color;
  } catch (error) {
    console.warn('Error adjusting color for contrast:', error);
    return color;
  }
}

/**
 * Generate a lighter variant of a color
 */
export function lightenColor(color: string, amount: number = 10): string {
  try {
    const hsl = parseHSL(color);
    const newLightness = Math.min(100, hsl.l + amount);
    return hslToString({ ...hsl, l: newLightness });
  } catch (error) {
    console.warn('Error lightening color:', error);
    return color;
  }
}

/**
 * Generate a darker variant of a color
 */
export function darkenColor(color: string, amount: number = 10): string {
  try {
    const hsl = parseHSL(color);
    const newLightness = Math.max(0, hsl.l - amount);
    return hslToString({ ...hsl, l: newLightness });
  } catch (error) {
    console.warn('Error darkening color:', error);
    return color;
  }
}

/**
 * Generate a more saturated variant of a color
 */
export function saturateColor(color: string, amount: number = 10): string {
  try {
    const hsl = parseHSL(color);
    const newSaturation = Math.min(100, hsl.s + amount);
    return hslToString({ ...hsl, s: newSaturation });
  } catch (error) {
    console.warn('Error saturating color:', error);
    return color;
  }
}

/**
 * Generate a less saturated variant of a color
 */
export function desaturateColor(color: string, amount: number = 10): string {
  try {
    const hsl = parseHSL(color);
    const newSaturation = Math.max(0, hsl.s - amount);
    return hslToString({ ...hsl, s: newSaturation });
  } catch (error) {
    console.warn('Error desaturating color:', error);
    return color;
  }
}

// ============================================================================
// THEME VALIDATION UTILITIES
// ============================================================================

/**
 * Validate all color combinations in a theme for accessibility
 */
export function validateThemeAccessibility(theme: AtlasTheme): {
  isValid: boolean;
  issues: string[];
  warnings: string[];
} {
  const issues: string[] = [];
  const warnings: string[] = [];
  
  // Check primary color combinations
  const primaryContrast = validateContrast(theme.colors.primaryForeground, theme.colors.primary);
  if (!primaryContrast.isValid) {
    issues.push(`Primary color contrast: ${primaryContrast.recommendation}`);
  } else if (primaryContrast.level === 'AA') {
    warnings.push(`Primary color contrast is AA level (${primaryContrast.ratio}), consider improving to AAA`);
  }
  
  // Check accent color combinations
  const accentContrast = validateContrast(theme.colors.accentForeground, theme.colors.accent);
  if (!accentContrast.isValid) {
    issues.push(`Accent color contrast: ${accentContrast.recommendation}`);
  } else if (accentContrast.level === 'AA') {
    warnings.push(`Accent color contrast is AA level (${accentContrast.ratio}), consider improving to AAA`);
  }
  
  // Check muted text on background
  const mutedContrast = validateContrast(theme.colors.mutedForeground, theme.colors.background);
  if (!mutedContrast.isValid) {
    issues.push(`Muted text contrast: ${mutedContrast.recommendation}`);
  }
  
  // Check muted text on secondary background
  const mutedSecondaryContrast = validateContrast(theme.colors.mutedForeground, theme.colors.backgroundSecondary);
  if (!mutedSecondaryContrast.isValid) {
    issues.push(`Muted text on secondary background contrast: ${mutedSecondaryContrast.recommendation}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    warnings
  };
}

/**
 * Validate all themes in the configuration
 */
export function validateAllThemes(): Record<CategoryKey, ReturnType<typeof validateThemeAccessibility>> {
  const results: Record<CategoryKey, ReturnType<typeof validateThemeAccessibility>> = {} as any;
  
  Object.entries(ATLAS_THEMES).forEach(([category, theme]) => {
    results[category as CategoryKey] = validateThemeAccessibility(theme);
  });
  
  return results;
}

/**
 * Get theme with automatic contrast adjustments if needed
 */
export function getAccessibleTheme(category: CategoryKey): AtlasTheme {
  const originalTheme = ATLAS_THEMES[category] || ATLAS_THEMES.general;
  const validation = validateThemeAccessibility(originalTheme);
  
  if (validation.isValid) {
    return originalTheme;
  }
  
  // Create adjusted theme
  const adjustedTheme: AtlasTheme = {
    ...originalTheme,
    colors: { ...originalTheme.colors }
  };
  
  // Adjust colors that failed validation
  const primaryContrast = validateContrast(originalTheme.colors.primaryForeground, originalTheme.colors.primary);
  if (!primaryContrast.isValid) {
    adjustedTheme.colors.primaryForeground = adjustColorForContrast(
      originalTheme.colors.primaryForeground,
      originalTheme.colors.primary
    );
  }
  
  const accentContrast = validateContrast(originalTheme.colors.accentForeground, originalTheme.colors.accent);
  if (!accentContrast.isValid) {
    adjustedTheme.colors.accentForeground = adjustColorForContrast(
      originalTheme.colors.accentForeground,
      originalTheme.colors.accent
    );
  }
  
  const mutedContrast = validateContrast(originalTheme.colors.mutedForeground, originalTheme.colors.background);
  if (!mutedContrast.isValid) {
    adjustedTheme.colors.mutedForeground = adjustColorForContrast(
      originalTheme.colors.mutedForeground,
      originalTheme.colors.background
    );
  }
  
  console.warn(`Theme ${category} had accessibility issues and was automatically adjusted:`, validation.issues);
  
  return adjustedTheme;
}

// ============================================================================
// PERFORMANCE MONITORING AND OPTIMIZATION UTILITIES
// ============================================================================

interface ThemePerformanceMetrics {
  transitionStartTime: number;
  transitionEndTime: number;
  duration: number;
  category: CategoryKey;
  fromCategory: CategoryKey;
}

let performanceMetrics: ThemePerformanceMetrics[] = [];
let currentTransitionStart: number | null = null;

/**
 * Start performance monitoring for theme transition
 */
export function startThemeTransitionPerformanceMonitoring(fromCategory: CategoryKey, toCategory: CategoryKey): void {
  if (typeof performance === 'undefined') return;
  
  currentTransitionStart = performance.now();
  
  // Log transition start for debugging
  console.debug(`Atlas theme transition started: ${fromCategory} → ${toCategory}`);
}

/**
 * End performance monitoring for theme transition
 */
export function endThemeTransitionPerformanceMonitoring(category: CategoryKey, fromCategory: CategoryKey): void {
  if (typeof performance === 'undefined' || currentTransitionStart === null) return;
  
  const endTime = performance.now();
  const duration = endTime - currentTransitionStart;
  
  const metrics: ThemePerformanceMetrics = {
    transitionStartTime: currentTransitionStart,
    transitionEndTime: endTime,
    duration,
    category,
    fromCategory
  };
  
  performanceMetrics.push(metrics);
  
  // Keep only last 10 measurements to prevent memory leaks
  if (performanceMetrics.length > 10) {
    performanceMetrics = performanceMetrics.slice(-10);
  }
  
  // Log performance metrics
  console.debug(`Atlas theme transition completed: ${fromCategory} → ${category} in ${duration.toFixed(2)}ms`);
  
  // Warn if transition is slow
  if (duration > 100) {
    console.warn(`Slow theme transition detected: ${duration.toFixed(2)}ms (target: <100ms)`);
  }
  
  currentTransitionStart = null;
}

/**
 * Get average theme transition performance
 */
export function getThemeTransitionPerformanceStats(): {
  averageDuration: number;
  minDuration: number;
  maxDuration: number;
  totalTransitions: number;
} {
  if (performanceMetrics.length === 0) {
    return {
      averageDuration: 0,
      minDuration: 0,
      maxDuration: 0,
      totalTransitions: 0
    };
  }
  
  const durations = performanceMetrics.map(m => m.duration);
  
  return {
    averageDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length,
    minDuration: Math.min(...durations),
    maxDuration: Math.max(...durations),
    totalTransitions: performanceMetrics.length
  };
}

/**
 * Clear performance metrics (useful for testing)
 */
export function clearThemePerformanceMetrics(): void {
  performanceMetrics = [];
  currentTransitionStart = null;
}

/**
 * Optimize theme transition by preloading next likely themes
 */
export function preloadLikelyThemes(currentCategory: CategoryKey): void {
  if (typeof window === 'undefined') return;
  
  // Get themes that are commonly accessed after the current one
  const likelyNextThemes = getLikelyNextThemes(currentCategory);
  
  // Preload these themes by accessing them (triggers caching)
  likelyNextThemes.forEach(category => {
    getPreloadedTheme(category);
  });
  
  console.debug(`Preloaded likely next themes for ${currentCategory}:`, likelyNextThemes);
}

/**
 * Get themes that are commonly accessed after the current theme
 */
function getLikelyNextThemes(currentCategory: CategoryKey): CategoryKey[] {
  // Simple heuristic: return 2-3 most common themes plus general
  const commonThemes: CategoryKey[] = ['general', 'hematologia', 'parasitologia'];
  
  // Remove current category and return others
  return commonThemes.filter(theme => theme !== currentCategory).slice(0, 2);
}

/**
 * Debounce theme changes to prevent rapid switching performance issues
 */
let themeChangeTimeout: NodeJS.Timeout | null = null;

export function debouncedThemeChange(
  category: CategoryKey, 
  callback: (category: CategoryKey) => void, 
  delay: number = 50
): void {
  if (themeChangeTimeout) {
    clearTimeout(themeChangeTimeout);
  }
  
  themeChangeTimeout = setTimeout(() => {
    callback(category);
    themeChangeTimeout = null;
  }, delay);
}

/**
 * Optimize CSS custom property updates by batching them
 */
const cssUpdateQueue: Array<[string, string]> = [];
let cssUpdateScheduled = false;

export function queueCSSPropertyUpdate(property: string, value: string): void {
  cssUpdateQueue.push([property, value]);
  
  if (!cssUpdateScheduled) {
    cssUpdateScheduled = true;
    requestAnimationFrame(flushCSSUpdates);
  }
}

function flushCSSUpdates(): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply all queued updates in a single batch
  cssUpdateQueue.forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Clear the queue
  cssUpdateQueue.length = 0;
  cssUpdateScheduled = false;
}
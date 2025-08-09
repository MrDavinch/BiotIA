import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  ATLAS_THEMES,
  validateThemeAccessibility,
  validateAllThemes,
  getContrastRatio,
  validateContrast,
  parseHSL,
  hslToString,
  lightenColor,
  darkenColor,
  saturateColor,
  desaturateColor,
  adjustColorForContrast,
  getAccessibleTheme,
  getCategoryFromHash,
  updateUrlHash,
  isValidCategory,
  getAvailableCategories,
  persistThemeToSession,
  getPersistedTheme,
  clearPersistedTheme,
  getThemeWithFallback,
  type CategoryKey
} from '../atlas-theme';

describe('Atlas Theme Configuration', () => {
  describe('Theme Completeness', () => {
    it('should have all required medical specialties', () => {
      const expectedCategories: CategoryKey[] = [
        'general',
        'hematologia',
        'parasitologia',
        'micologia',
        'bacteriologia',
        'citologia-histologia',
        'uroanalisis',
        'coproanalisis'
      ];

      expectedCategories.forEach(category => {
        expect(ATLAS_THEMES[category]).toBeDefined();
        expect(ATLAS_THEMES[category].name).toBeTruthy();
        expect(ATLAS_THEMES[category].category).toBe(category);
      });
    });

    it('should have complete color palettes for each theme', () => {
      Object.values(ATLAS_THEMES).forEach(theme => {
        expect(theme.colors.background).toBeTruthy();
        expect(theme.colors.backgroundSecondary).toBeTruthy();
        expect(theme.colors.primary).toBeTruthy();
        expect(theme.colors.primaryForeground).toBeTruthy();
        expect(theme.colors.accent).toBeTruthy();
        expect(theme.colors.accentForeground).toBeTruthy();
        expect(theme.colors.muted).toBeTruthy();
        expect(theme.colors.mutedForeground).toBeTruthy();
      });
    });
  });

  describe('Color Manipulation Utilities', () => {
    it('should parse HSL colors correctly', () => {
      const hsl = parseHSL('hsl(173, 67%, 38%)');
      expect(hsl.h).toBe(173);
      expect(hsl.s).toBe(67);
      expect(hsl.l).toBe(38);
    });

    it('should convert HSL object back to string', () => {
      const hsl = { h: 173, s: 67, l: 38 };
      const hslString = hslToString(hsl);
      expect(hslString).toBe('hsl(173, 67%, 38%)');
    });

    it('should lighten colors correctly', () => {
      const original = 'hsl(173, 67%, 38%)';
      const lightened = lightenColor(original, 10);
      const lightenedHsl = parseHSL(lightened);
      expect(lightenedHsl.l).toBe(48);
    });

    it('should darken colors correctly', () => {
      const original = 'hsl(173, 67%, 38%)';
      const darkened = darkenColor(original, 10);
      const darkenedHsl = parseHSL(darkened);
      expect(darkenedHsl.l).toBe(28);
    });

    it('should saturate colors correctly', () => {
      const original = 'hsl(173, 67%, 38%)';
      const saturated = saturateColor(original, 10);
      const saturatedHsl = parseHSL(saturated);
      expect(saturatedHsl.s).toBe(77);
    });

    it('should desaturate colors correctly', () => {
      const original = 'hsl(173, 67%, 38%)';
      const desaturated = desaturateColor(original, 10);
      const desaturatedHsl = parseHSL(desaturated);
      expect(desaturatedHsl.s).toBe(57);
    });
  });

  describe('Contrast Validation', () => {
    it('should calculate contrast ratios correctly', () => {
      // Test with known good contrast (black on white)
      const blackOnWhite = getContrastRatio('hsl(0, 0%, 0%)', 'hsl(0, 0%, 100%)');
      expect(blackOnWhite).toBeCloseTo(21, 0);

      // Test with same colors (should be 1)
      const sameColor = getContrastRatio('hsl(173, 67%, 38%)', 'hsl(173, 67%, 38%)');
      expect(sameColor).toBeCloseTo(1, 1);
    });

    it('should validate contrast correctly', () => {
      // Good contrast
      const goodContrast = validateContrast('hsl(0, 0%, 10%)', 'hsl(0, 0%, 95%)');
      expect(goodContrast.isValid).toBe(true);
      expect(goodContrast.level).toBe('AAA');

      // Poor contrast
      const poorContrast = validateContrast('hsl(0, 0%, 60%)', 'hsl(0, 0%, 70%)');
      expect(poorContrast.isValid).toBe(false);
      expect(poorContrast.level).toBe('FAIL');
      expect(poorContrast.recommendation).toBeTruthy();
    });

    it('should adjust colors for better contrast', () => {
      const poorForeground = 'hsl(0, 0%, 60%)';
      const background = 'hsl(0, 0%, 70%)';
      
      const adjusted = adjustColorForContrast(poorForeground, background, 4.5);
      const newContrast = getContrastRatio(adjusted, background);
      
      expect(newContrast).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Theme Accessibility Validation', () => {
    it('should validate individual themes for accessibility', () => {
      Object.entries(ATLAS_THEMES).forEach(([category, theme]) => {
        const validation = validateThemeAccessibility(theme);
        
        // Log any issues for debugging
        if (!validation.isValid) {
          console.warn(`Theme ${category} has accessibility issues:`, validation.issues);
        }
        
        // All themes should pass basic accessibility
        expect(validation.isValid).toBe(true);
      });
    });

    it('should validate all themes at once', () => {
      const allValidations = validateAllThemes();
      
      Object.entries(allValidations).forEach(([category, validation]) => {
        expect(validation.isValid).toBe(true);
        
        if (validation.warnings.length > 0) {
          console.info(`Theme ${category} warnings:`, validation.warnings);
        }
      });
    });

    it('should provide accessible theme variants', () => {
      Object.keys(ATLAS_THEMES).forEach(category => {
        const accessibleTheme = getAccessibleTheme(category as CategoryKey);
        const validation = validateThemeAccessibility(accessibleTheme);
        
        expect(validation.isValid).toBe(true);
      });
    });
  });

  describe('Specific Medical Specialty Requirements', () => {
    it('should have distinct color palettes for each specialty', () => {
      const themes = Object.values(ATLAS_THEMES);
      const primaryColors = themes.map(theme => theme.colors.primary);
      
      // Each primary color should be unique
      const uniquePrimaryColors = new Set(primaryColors);
      expect(uniquePrimaryColors.size).toBe(themes.length);
    });

    it('should use appropriate color families for each specialty', () => {
      // Hematología should use reds
      const hematologia = parseHSL(ATLAS_THEMES.hematologia.colors.primary);
      expect(hematologia.h).toBeCloseTo(0, 10); // Red hue range

      // Micología should use blues
      const micologia = parseHSL(ATLAS_THEMES.micologia.colors.primary);
      expect(micologia.h).toBeCloseTo(210, 20); // Blue hue range

      // Parasitología should use browns/earth tones
      const parasitologia = parseHSL(ATLAS_THEMES.parasitologia.colors.primary);
      expect(parasitologia.h).toBeCloseTo(30, 20); // Brown hue range

      // Bacteriología should use violets
      const bacteriologia = parseHSL(ATLAS_THEMES.bacteriologia.colors.primary);
      expect(bacteriologia.h).toBeCloseTo(270, 20); // Violet hue range

      // Citología should use pinks/roses
      const citologia = parseHSL(ATLAS_THEMES['citologia-histologia'].colors.primary);
      expect(citologia.h).toBeCloseTo(330, 20); // Pink hue range

      // Uroanálisis should use yellows
      const uroanalisis = parseHSL(ATLAS_THEMES.uroanalisis.colors.primary);
      expect(uroanalisis.h).toBeCloseTo(50, 20); // Yellow hue range
    });

    it('should have pale backgrounds and intense primary colors', () => {
      Object.values(ATLAS_THEMES).forEach(theme => {
        const background = parseHSL(theme.colors.background);
        const primary = parseHSL(theme.colors.primary);
        
        // Backgrounds should be very light (high lightness)
        expect(background.l).toBeGreaterThan(90);
        
        // Primary colors should be more intense (lower lightness, higher saturation)
        expect(primary.l).toBeLessThan(50);
        expect(primary.s).toBeGreaterThan(50);
      });
    });
  });

  describe('URL Hash Management', () => {
    // Mock window.location for testing
    const mockLocation = {
      hash: '',
      href: 'http://localhost:3000/atlas'
    };
    
    beforeEach(() => {
      // Reset mock location
      mockLocation.hash = '';
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true
      });
      
      // Mock history API
      Object.defineProperty(window, 'history', {
        value: {
          replaceState: vi.fn(),
          pushState: vi.fn()
        },
        writable: true
      });
    });

    it('should extract category from URL hash correctly', () => {
      mockLocation.hash = '#hematologia';
      expect(getCategoryFromHash()).toBe('hematologia');
      
      mockLocation.hash = '#MICOLOGIA';
      expect(getCategoryFromHash()).toBe('micologia');
      
      mockLocation.hash = '#parasitologia';
      expect(getCategoryFromHash()).toBe('parasitologia');
    });

    it('should fallback to general for invalid categories', () => {
      mockLocation.hash = '#invalid-category';
      expect(getCategoryFromHash()).toBe('general');
      
      mockLocation.hash = '#';
      expect(getCategoryFromHash()).toBe('general');
      
      mockLocation.hash = '';
      expect(getCategoryFromHash()).toBe('general');
    });

    it('should handle malformed hash gracefully', () => {
      mockLocation.hash = '#  hematologia  ';
      expect(getCategoryFromHash()).toBe('hematologia');
      
      mockLocation.hash = '#123invalid';
      expect(getCategoryFromHash()).toBe('general');
    });

    it('should update URL hash correctly', () => {
      const mockReplaceState = vi.fn();
      const mockPushState = vi.fn();
      
      window.history.replaceState = mockReplaceState;
      window.history.pushState = mockPushState;
      
      updateUrlHash('hematologia', true);
      expect(mockReplaceState).toHaveBeenCalledWith(null, '', '#hematologia');
      
      updateUrlHash('micologia', false);
      expect(mockPushState).toHaveBeenCalledWith(null, '', '#micologia');
    });

    it('should not update URL if hash is already correct', () => {
      const mockReplaceState = vi.fn();
      window.history.replaceState = mockReplaceState;
      
      mockLocation.hash = '#hematologia';
      updateUrlHash('hematologia', true);
      
      expect(mockReplaceState).not.toHaveBeenCalled();
    });

    it('should validate categories correctly', () => {
      expect(isValidCategory('hematologia')).toBe(true);
      expect(isValidCategory('general')).toBe(true);
      expect(isValidCategory('invalid')).toBe(false);
      expect(isValidCategory('')).toBe(false);
    });

    it('should return all available categories', () => {
      const categories = getAvailableCategories();
      expect(categories).toContain('general');
      expect(categories).toContain('hematologia');
      expect(categories).toContain('parasitologia');
      expect(categories.length).toBe(8);
    });
  });

  describe('Session Storage Persistence', () => {
    const mockSessionStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn()
    };

    beforeEach(() => {
      Object.defineProperty(window, 'sessionStorage', {
        value: mockSessionStorage,
        writable: true
      });
      
      // Reset mocks
      mockSessionStorage.getItem.mockReset();
      mockSessionStorage.setItem.mockReset();
      mockSessionStorage.removeItem.mockReset();
    });

    it('should persist theme to session storage', () => {
      persistThemeToSession('hematologia');
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('atlas-theme-category', 'hematologia');
    });

    it('should retrieve persisted theme from session storage', () => {
      mockSessionStorage.getItem.mockReturnValue('parasitologia');
      expect(getPersistedTheme()).toBe('parasitologia');
      expect(mockSessionStorage.getItem).toHaveBeenCalledWith('atlas-theme-category');
    });

    it('should return null for invalid persisted theme', () => {
      mockSessionStorage.getItem.mockReturnValue('invalid-category');
      expect(getPersistedTheme()).toBe(null);
    });

    it('should return null when no theme is persisted', () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      expect(getPersistedTheme()).toBe(null);
    });

    it('should clear persisted theme', () => {
      clearPersistedTheme();
      expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('atlas-theme-category');
    });

    it('should handle session storage errors gracefully', () => {
      mockSessionStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      // Should not throw
      expect(() => persistThemeToSession('hematologia')).not.toThrow();
    });
  });

  describe('Theme Fallback Logic', () => {
    const mockLocation = {
      hash: ''
    };
    
    const mockSessionStorage = {
      getItem: vi.fn()
    };

    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: mockLocation,
        writable: true
      });
      
      Object.defineProperty(window, 'sessionStorage', {
        value: mockSessionStorage,
        writable: true
      });
      
      mockSessionStorage.getItem.mockReset();
    });

    it('should prioritize URL hash over session storage', () => {
      mockLocation.hash = '#hematologia';
      mockSessionStorage.getItem.mockReturnValue('parasitologia');
      
      expect(getThemeWithFallback()).toBe('hematologia');
    });

    it('should use session storage when no URL hash', () => {
      mockLocation.hash = '';
      mockSessionStorage.getItem.mockReturnValue('micologia');
      
      expect(getThemeWithFallback()).toBe('micologia');
    });

    it('should fallback to general when neither URL nor session storage', () => {
      mockLocation.hash = '';
      mockSessionStorage.getItem.mockReturnValue(null);
      
      expect(getThemeWithFallback()).toBe('general');
    });

    it('should fallback to general when URL hash is general', () => {
      mockLocation.hash = '#general';
      mockSessionStorage.getItem.mockReturnValue('hematologia');
      
      expect(getThemeWithFallback()).toBe('general');
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid HSL strings gracefully', () => {
      expect(() => parseHSL('invalid-color')).toThrow();
      
      // Utility functions should return original color on error
      const invalidColor = 'invalid-color';
      expect(lightenColor(invalidColor)).toBe(invalidColor);
      expect(darkenColor(invalidColor)).toBe(invalidColor);
      expect(saturateColor(invalidColor)).toBe(invalidColor);
      expect(desaturateColor(invalidColor)).toBe(invalidColor);
    });

    it('should handle contrast calculation errors gracefully', () => {
      const ratio = getContrastRatio('invalid-color-1', 'invalid-color-2');
      expect(ratio).toBe(1); // Fallback value
    });

    it('should handle URL hash management errors gracefully', () => {
      // Mock window.location to throw errors
      Object.defineProperty(window, 'location', {
        get: () => {
          throw new Error('Location access denied');
        }
      });
      
      // Should not throw and return fallback
      expect(() => getCategoryFromHash()).not.toThrow();
      expect(getCategoryFromHash()).toBe('general');
    });
  });
});
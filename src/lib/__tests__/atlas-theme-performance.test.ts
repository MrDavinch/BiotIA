import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  preloadThemeConfigurations,
  getPreloadedTheme,
  startThemeTransitionPerformanceMonitoring,
  endThemeTransitionPerformanceMonitoring,
  getThemeTransitionPerformanceStats,
  clearThemePerformanceMetrics,
  debouncedThemeChange,
  queueCSSPropertyUpdate,
  CategoryKey
} from '../atlas-theme';

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now())
};

// Mock requestAnimationFrame
const mockRequestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  setTimeout(callback, 16); // Simulate 60fps
  return 1;
});

describe('Atlas Theme Performance Optimizations', () => {
  beforeEach(() => {
    // Setup mocks
    vi.stubGlobal('performance', mockPerformance);
    vi.stubGlobal('requestAnimationFrame', mockRequestAnimationFrame);
    
    // Clear performance metrics
    clearThemePerformanceMetrics();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Theme Preloading', () => {
    it('should preload all theme configurations', () => {
      preloadThemeConfigurations();
      
      // Should be able to get preloaded themes
      const hematologiaTheme = getPreloadedTheme('hematologia');
      expect(hematologiaTheme.category).toBe('hematologia');
      expect(hematologiaTheme.colors.primary).toBe('hsl(0, 75%, 38%)');
    });

    it('should fallback to regular theme if preloading fails', () => {
      const theme = getPreloadedTheme('general');
      expect(theme.category).toBe('general');
      expect(theme.colors.primary).toBe('hsl(173, 67%, 30%)');
    });

    it('should handle invalid categories in preloaded themes', () => {
      const theme = getPreloadedTheme('invalid' as CategoryKey);
      expect(theme.category).toBe('general'); // Should fallback
    });
  });

  describe('Performance Monitoring', () => {
    it('should track theme transition performance', () => {
      const startTime = 100;
      const endTime = 150;
      
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);

      startThemeTransitionPerformanceMonitoring('general', 'hematologia');
      endThemeTransitionPerformanceMonitoring('hematologia', 'general');

      const stats = getThemeTransitionPerformanceStats();
      expect(stats.totalTransitions).toBe(1);
      expect(stats.averageDuration).toBe(50);
      expect(stats.minDuration).toBe(50);
      expect(stats.maxDuration).toBe(50);
    });

    it('should handle multiple transitions', () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(120)
        .mockReturnValueOnce(200)
        .mockReturnValueOnce(250);

      // First transition: 20ms
      startThemeTransitionPerformanceMonitoring('general', 'hematologia');
      endThemeTransitionPerformanceMonitoring('hematologia', 'general');

      // Second transition: 50ms
      startThemeTransitionPerformanceMonitoring('hematologia', 'parasitologia');
      endThemeTransitionPerformanceMonitoring('parasitologia', 'hematologia');

      const stats = getThemeTransitionPerformanceStats();
      expect(stats.totalTransitions).toBe(2);
      expect(stats.averageDuration).toBe(35); // (20 + 50) / 2
      expect(stats.minDuration).toBe(20);
      expect(stats.maxDuration).toBe(50);
    });

    it('should return zero stats when no transitions recorded', () => {
      const stats = getThemeTransitionPerformanceStats();
      expect(stats.totalTransitions).toBe(0);
      expect(stats.averageDuration).toBe(0);
      expect(stats.minDuration).toBe(0);
      expect(stats.maxDuration).toBe(0);
    });

    it('should clear performance metrics', () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150);

      startThemeTransitionPerformanceMonitoring('general', 'hematologia');
      endThemeTransitionPerformanceMonitoring('hematologia', 'general');

      let stats = getThemeTransitionPerformanceStats();
      expect(stats.totalTransitions).toBe(1);

      clearThemePerformanceMetrics();
      stats = getThemeTransitionPerformanceStats();
      expect(stats.totalTransitions).toBe(0);
    });
  });

  describe('Debounced Theme Changes', () => {
    it('should debounce rapid theme changes', async () => {
      const mockCallback = vi.fn();
      
      // Make multiple rapid calls
      debouncedThemeChange('hematologia', mockCallback, 10);
      debouncedThemeChange('parasitologia', mockCallback, 10);
      debouncedThemeChange('micologia', mockCallback, 10);

      // Should not have been called yet
      expect(mockCallback).not.toHaveBeenCalled();

      // Wait for debounce delay
      await new Promise(resolve => setTimeout(resolve, 15));

      // Should only be called once with the last value
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenCalledWith('micologia');
    });

    it('should handle multiple debounced calls with different delays', async () => {
      const mockCallback1 = vi.fn();
      const mockCallback2 = vi.fn();

      debouncedThemeChange('hematologia', mockCallback1, 5);
      
      // Wait for first callback
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(mockCallback1).toHaveBeenCalledWith('hematologia');

      debouncedThemeChange('parasitologia', mockCallback2, 5);
      
      // Wait for second callback
      await new Promise(resolve => setTimeout(resolve, 10));
      expect(mockCallback2).toHaveBeenCalledWith('parasitologia');
    });
  });

  describe('CSS Property Queue', () => {
    it('should queue CSS property updates', () => {
      // Mock document
      const mockSetProperty = vi.fn();
      const mockDocumentElement = {
        style: {
          setProperty: mockSetProperty
        }
      };
      vi.stubGlobal('document', { documentElement: mockDocumentElement });

      queueCSSPropertyUpdate('--test-property', 'test-value');
      queueCSSPropertyUpdate('--another-property', 'another-value');

      // Should not have been called immediately
      expect(mockSetProperty).not.toHaveBeenCalled();

      // Wait for requestAnimationFrame
      return new Promise(resolve => {
        setTimeout(() => {
          expect(mockSetProperty).toHaveBeenCalledTimes(2);
          expect(mockSetProperty).toHaveBeenCalledWith('--test-property', 'test-value');
          expect(mockSetProperty).toHaveBeenCalledWith('--another-property', 'another-value');
          resolve(undefined);
        }, 20);
      });
    });

    it('should handle missing document gracefully', () => {
      vi.stubGlobal('document', undefined);
      
      // Should not throw
      expect(() => {
        queueCSSPropertyUpdate('--test-property', 'test-value');
      }).not.toThrow();
    });
  });

  describe('Performance Edge Cases', () => {
    it('should handle missing performance API', () => {
      vi.stubGlobal('performance', undefined);

      // Should not throw
      expect(() => {
        startThemeTransitionPerformanceMonitoring('general', 'hematologia');
        endThemeTransitionPerformanceMonitoring('hematologia', 'general');
      }).not.toThrow();

      const stats = getThemeTransitionPerformanceStats();
      expect(stats.totalTransitions).toBe(0);
    });

    it('should handle performance monitoring without start', () => {
      mockPerformance.now.mockReturnValue(100);

      // End without start should not throw
      expect(() => {
        endThemeTransitionPerformanceMonitoring('hematologia', 'general');
      }).not.toThrow();

      const stats = getThemeTransitionPerformanceStats();
      expect(stats.totalTransitions).toBe(0);
    });

    it('should limit performance metrics to prevent memory leaks', () => {
      mockPerformance.now
        .mockReturnValue(100)
        .mockReturnValue(110);

      // Add more than 10 transitions
      for (let i = 0; i < 15; i++) {
        startThemeTransitionPerformanceMonitoring('general', 'hematologia');
        endThemeTransitionPerformanceMonitoring('hematologia', 'general');
      }

      const stats = getThemeTransitionPerformanceStats();
      // Should only keep last 10
      expect(stats.totalTransitions).toBe(10);
    });
  });
});
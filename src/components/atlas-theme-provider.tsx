'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  AtlasTheme, 
  CategoryKey, 
  ATLAS_THEMES, 
  getThemeByCategory, 
  updateCSSProperties, 
  getCategoryFromHash,
  updateUrlHash,
  isValidCategory,
  persistThemeToSession,
  getThemeWithFallback,
  preloadThemeConfigurations,
  getPreloadedTheme,
  startThemeTransitionPerformanceMonitoring,
  endThemeTransitionPerformanceMonitoring,
  preloadLikelyThemes,
  debouncedThemeChange
} from '@/lib/atlas-theme';

interface AtlasThemeContextType {
  currentTheme: AtlasTheme;
  setTheme: (category: CategoryKey, updateUrl?: boolean) => void;
  isTransitioning: boolean;
}

const AtlasThemeContext = createContext<AtlasThemeContextType | undefined>(undefined);

interface AtlasThemeProviderProps {
  children: React.ReactNode;
}

export function AtlasThemeProvider({ children }: AtlasThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<AtlasTheme>(ATLAS_THEMES.general);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Preload themes on mount for instant switching
  useEffect(() => {
    preloadThemeConfigurations();
  }, []);

  // Performance-optimized theme setter with transition management
  const safeSetTheme = useCallback((category: CategoryKey, updateUrl: boolean = true) => {
    try {
      // Early return if already on the same theme to prevent unnecessary updates
      if (currentTheme.category === category && !isTransitioning) {
        return;
      }
      
      const fromCategory = currentTheme.category;
      
      // Start performance monitoring
      startThemeTransitionPerformanceMonitoring(fromCategory, category);
      
      setIsTransitioning(true);
      
      // Validate category before proceeding
      if (!isValidCategory(category)) {
        console.warn(`Invalid theme category: ${category}, falling back to general`);
        category = 'general';
      }
      
      // Use preloaded theme for better performance
      const theme = getPreloadedTheme(category);
      
      // Add transition class to body for smooth animations
      if (typeof document !== 'undefined') {
        document.body.classList.add('atlas-theme-transitioning');
      }
      
      // Update CSS custom properties with performance optimizations
      updateCSSProperties(theme);
      
      // Update React state
      setCurrentTheme(theme);
      
      // Persist theme to session storage
      persistThemeToSession(category);
      
      // Update URL hash if requested and different
      if (updateUrl) {
        updateUrlHash(category, true);
      }
      
      // Preload likely next themes for better performance
      preloadLikelyThemes(category);
      
    } catch (error) {
      console.error('Theme update failed:', error);
      // Fallback to general theme on error
      const fallbackTheme = getPreloadedTheme('general');
      updateCSSProperties(fallbackTheme);
      setCurrentTheme(fallbackTheme);
      
      // Update URL to reflect fallback
      if (updateUrl) {
        updateUrlHash('general', true);
      }
    } finally {
      // Remove transition state and class after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
        if (typeof document !== 'undefined') {
          document.body.classList.remove('atlas-theme-transitioning');
          document.body.classList.add('atlas-theme-transition-complete');
          
          // Remove the completion class after a short delay to clean up
          setTimeout(() => {
            document.body.classList.remove('atlas-theme-transition-complete');
          }, 100);
        }
        
        // End performance monitoring
        endThemeTransitionPerformanceMonitoring(category, currentTheme.category);
      }, 500); // Match CSS transition duration
    }
  }, [currentTheme.category, isTransitioning]);

  // Initialize theme with fallback priority on mount
  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const initializeTheme = () => {
      const initialCategory = getThemeWithFallback();
      // Don't update URL on initial load since it's already set
      safeSetTheme(initialCategory, false);
      
      console.debug('Atlas theme initialized with fallback:', initialCategory);
    };

    // Initialize immediately if window is available
    if (typeof window !== 'undefined') {
      // Small delay to ensure everything is mounted
      setTimeout(initializeTheme, 50);
    }
  }, [safeSetTheme]);

  // Monitor URL changes for theme updates (handles Next.js navigation)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lastUrl = window.location.href;

    const checkForThemeUpdate = () => {
      const currentUrl = window.location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        const urlCategory = getCategoryFromHash();
        if (urlCategory !== currentTheme.category) {
          console.debug('URL-based theme update detected:', {
            from: currentTheme.category,
            to: urlCategory,
            url: currentUrl
          });
          safeSetTheme(urlCategory, false);
        }
      }
    };

    // Check immediately
    checkForThemeUpdate();

    // Use a more efficient approach with requestAnimationFrame
    let animationFrameId: number;
    const scheduleCheck = () => {
      animationFrameId = requestAnimationFrame(() => {
        checkForThemeUpdate();
        scheduleCheck(); // Schedule next check
      });
    };

    scheduleCheck();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentTheme.category, safeSetTheme]);

  // Enhanced hash change listener for browser navigation
  useEffect(() => {
    const handleHashChange = (event?: HashChangeEvent) => {
      const category = getCategoryFromHash();
      
      // Don't update URL again since this was triggered by URL change
      safeSetTheme(category, false);
      
      // Log navigation for debugging
      if (event) {
        console.debug('Atlas theme changed via browser navigation:', {
          from: event.oldURL?.split('#')[1] || 'general',
          to: category
        });
      } else {
        console.debug('Atlas theme changed via hash detection:', category);
      }
    };

    // Handle popstate events (back/forward button)
    const handlePopState = (event: PopStateEvent) => {
      const category = getCategoryFromHash();
      safeSetTheme(category, false);
      
      console.debug('Atlas theme changed via browser back/forward:', category);
    };

    // Handle route changes (for Next.js navigation)
    const handleRouteChange = () => {
      // Small delay to ensure the URL has been updated
      setTimeout(() => {
        const category = getCategoryFromHash();
        if (category !== currentTheme.category) {
          console.debug('Atlas theme changed via route navigation:', category);
          safeSetTheme(category, false);
        }
      }, 10);
    };

    if (typeof window !== 'undefined') {
      // Check hash immediately on mount
      const currentHash = window.location.hash;
      if (currentHash) {
        console.debug('Initial hash detected:', currentHash);
        handleHashChange();
      }
      
      // Listen for hash changes
      window.addEventListener('hashchange', handleHashChange);
      
      // Listen for popstate events (back/forward buttons)
      window.addEventListener('popstate', handlePopState);
      
      // Listen for route changes (Next.js navigation)
      window.addEventListener('popstate', handleRouteChange);
      
      // Also check for hash changes on focus (in case user navigated via address bar)
      window.addEventListener('focus', handleRouteChange);
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('focus', handleRouteChange);
      };
    }
  }, [safeSetTheme, currentTheme.category]);

  // Debounced theme setter for rapid theme changes
  const debouncedSetTheme = useCallback((category: CategoryKey, updateUrl: boolean = true) => {
    debouncedThemeChange(category, (debouncedCategory) => {
      safeSetTheme(debouncedCategory, updateUrl);
    }, 50);
  }, [safeSetTheme]);

  const contextValue: AtlasThemeContextType = {
    currentTheme,
    setTheme: debouncedSetTheme,
    isTransitioning,
  };

  return (
    <AtlasThemeContext.Provider value={contextValue}>
      {children}
    </AtlasThemeContext.Provider>
  );
}

// Custom hook to use the Atlas theme context
export function useAtlasTheme(): AtlasThemeContextType {
  const context = useContext(AtlasThemeContext);
  
  if (context === undefined) {
    throw new Error('useAtlasTheme must be used within an AtlasThemeProvider');
  }
  
  return context;
}

// Hook to get current theme category
export function useCurrentCategory(): CategoryKey {
  const { currentTheme } = useAtlasTheme();
  return currentTheme.category;
}

// Hook to check if a specific category is active
export function useIsActiveCategory(category: CategoryKey): boolean {
  const { currentTheme } = useAtlasTheme();
  return currentTheme.category === category;
}
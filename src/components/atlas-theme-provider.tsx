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
  getThemeWithFallback
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

  // Safe theme setter with enhanced error handling and URL management
  const safeSetTheme = useCallback((category: CategoryKey, updateUrl: boolean = true) => {
    try {
      setIsTransitioning(true);
      
      // Validate category before proceeding
      if (!isValidCategory(category)) {
        console.warn(`Invalid theme category: ${category}, falling back to general`);
        category = 'general';
      }
      
      const theme = getThemeByCategory(category);
      
      // Update CSS custom properties
      updateCSSProperties(theme);
      
      // Update React state
      setCurrentTheme(theme);
      
      // Persist theme to session storage
      persistThemeToSession(category);
      
      // Update URL hash if requested and different
      if (updateUrl) {
        updateUrlHash(category, true);
      }
      
    } catch (error) {
      console.error('Theme update failed:', error);
      // Fallback to general theme on error
      const fallbackTheme = ATLAS_THEMES.general;
      updateCSSProperties(fallbackTheme);
      setCurrentTheme(fallbackTheme);
      
      // Update URL to reflect fallback
      if (updateUrl) {
        updateUrlHash('general', true);
      }
    } finally {
      // Remove transition state after a short delay
      setTimeout(() => setIsTransitioning(false), 100);
    }
  }, []);

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
      
      return () => {
        window.removeEventListener('hashchange', handleHashChange);
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [safeSetTheme]);

  const contextValue: AtlasThemeContextType = {
    currentTheme,
    setTheme: safeSetTheme,
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
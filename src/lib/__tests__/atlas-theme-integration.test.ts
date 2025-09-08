import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import React from 'react';
import { AtlasThemeProvider, useAtlasTheme } from '@/components/atlas-theme-provider';
import { 
  ATLAS_THEMES,
  getCategoryFromHash,
  updateUrlHash,
  persistThemeToSession,
  getPersistedTheme,
  clearPersistedTheme,
  type CategoryKey
} from '@/lib/atlas-theme';

// Mock Next.js router
const mockPush = vi.fn();
const mockReplace = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

// Test component that uses the theme context
function TestThemeConsumer() {
  const { currentTheme, setTheme, isTransitioning } = useAtlasTheme();
  
  return (
    <div data-testid="theme-consumer">
      <div data-testid="current-theme">{currentTheme.category}</div>
      <div data-testid="theme-name">{currentTheme.name}</div>
      <div data-testid="is-transitioning">{isTransitioning.toString()}</div>
      <div data-testid="primary-color">{currentTheme.colors.primary}</div>
      <div data-testid="background-color">{currentTheme.colors.background}</div>
      
      {/* Theme switching buttons for testing */}
      <button 
        data-testid="set-hematologia" 
        onClick={() => setTheme('hematologia')}
      >
        Set Hematología
      </button>
      <button 
        data-testid="set-parasitologia" 
        onClick={() => setTheme('parasitologia')}
      >
        Set Parasitología
      </button>
      <button 
        data-testid="set-general" 
        onClick={() => setTheme('general')}
      >
        Set General
      </button>
    </div>
  );
}

function TestApp() {
  return (
    <AtlasThemeProvider>
      <TestThemeConsumer />
    </AtlasThemeProvider>
  );
}

describe('Atlas Theme Integration Tests', () => {
  // Mock browser APIs
  const mockLocation = {
    hash: '',
    href: 'http://localhost:3000/atlas',
    replace: vi.fn(),
  };
  
  const mockHistory = {
    replaceState: vi.fn(),
    pushState: vi.fn(),
  };
  
  const mockSessionStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });
    
    // Mock window.history
    Object.defineProperty(window, 'history', {
      value: mockHistory,
      writable: true,
    });
    
    // Mock sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: mockSessionStorage,
      writable: true,
    });
    
    // Mock document.documentElement.style
    const mockStyle = {
      setProperty: vi.fn(),
    };
    Object.defineProperty(document, 'documentElement', {
      value: {
        style: mockStyle,
      },
      writable: true,
    });
    
    // Mock document.body.classList
    const mockClassList = {
      add: vi.fn(),
      remove: vi.fn(),
    };
    Object.defineProperty(document, 'body', {
      value: {
        classList: mockClassList,
      },
      writable: true,
    });
    
    // Reset location hash
    mockLocation.hash = '';
    
    // Clear session storage mocks
    mockSessionStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    // Clean up any timers
    vi.runAllTimers();
  });

  describe('Theme Provider Initialization', () => {
    it('should initialize with general theme by default', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
        expect(screen.getByTestId('theme-name')).toHaveTextContent('Atlas General');
      });
    });

    it('should initialize with URL hash theme if present', async () => {
      mockLocation.hash = '#hematologia';
      
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('hematologia');
        expect(screen.getByTestId('theme-name')).toHaveTextContent('Atlas de Hematología');
      });
    });

    it('should initialize with persisted theme if no URL hash', async () => {
      mockLocation.hash = '';
      mockSessionStorage.getItem.mockReturnValue('parasitologia');
      
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('parasitologia');
        expect(screen.getByTestId('theme-name')).toHaveTextContent('Atlas de Parasitología');
      });
    });

    it('should prioritize URL hash over persisted theme', async () => {
      mockLocation.hash = '#micologia';
      mockSessionStorage.getItem.mockReturnValue('hematologia');
      
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('micologia');
        expect(screen.getByTestId('theme-name')).toHaveTextContent('Atlas de Micología');
      });
    });
  });

  describe('Theme Switching', () => {
    it('should switch themes correctly via setTheme', async () => {
      render(<TestApp />);
      
      // Wait for initial render
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      // Switch to hematología
      fireEvent.click(screen.getByTestId('set-hematologia'));
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('hematologia');
        expect(screen.getByTestId('primary-color')).toHaveTextContent(ATLAS_THEMES.hematologia.colors.primary);
      });
    });

    it('should update URL hash when switching themes', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      fireEvent.click(screen.getByTestId('set-parasitologia'));
      
      await waitFor(() => {
        expect(mockHistory.replaceState).toHaveBeenCalledWith(null, '', '#parasitologia');
      });
    });

    it('should persist theme to session storage', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      fireEvent.click(screen.getByTestId('set-hematologia'));
      
      await waitFor(() => {
        expect(mockSessionStorage.setItem).toHaveBeenCalledWith('atlas-theme-category', 'hematologia');
      });
    });

    it('should update CSS custom properties', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      fireEvent.click(screen.getByTestId('set-hematologia'));
      
      await waitFor(() => {
        const mockStyle = document.documentElement.style as any;
        expect(mockStyle.setProperty).toHaveBeenCalledWith('--atlas-color-primary', ATLAS_THEMES.hematologia.colors.primary);
        expect(mockStyle.setProperty).toHaveBeenCalledWith('--atlas-bg-primary', ATLAS_THEMES.hematologia.colors.background);
      });
    });

    it('should handle rapid theme switching gracefully', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      // Rapidly switch themes
      fireEvent.click(screen.getByTestId('set-hematologia'));
      fireEvent.click(screen.getByTestId('set-parasitologia'));
      fireEvent.click(screen.getByTestId('set-general'));
      
      // Should end up with the last theme
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      }, { timeout: 1000 });
    });
  });

  describe('URL Hash Management', () => {
    it('should respond to hash changes', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      // Simulate hash change
      mockLocation.hash = '#bacteriologia';
      fireEvent(window, new HashChangeEvent('hashchange', {
        oldURL: 'http://localhost:3000/atlas#general',
        newURL: 'http://localhost:3000/atlas#bacteriologia'
      }));
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('bacteriologia');
      });
    });

    it('should handle browser back/forward navigation', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      // Simulate popstate event (back/forward button)
      mockLocation.hash = '#citologia-histologia';
      fireEvent(window, new PopStateEvent('popstate', { state: null }));
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('citologia-histologia');
      });
    });

    it('should handle invalid hash gracefully', async () => {
      mockLocation.hash = '#invalid-category';
      
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
    });

    it('should handle malformed hash gracefully', async () => {
      mockLocation.hash = '#  hematologia  ';
      
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('hematologia');
      });
    });
  });

  describe('Session Storage Persistence', () => {
    it('should persist theme changes to session storage', async () => {
      render(<TestApp />);
      
      fireEvent.click(screen.getByTestId('set-uroanalisis'));
      
      await waitFor(() => {
        expect(mockSessionStorage.setItem).toHaveBeenCalledWith('atlas-theme-category', 'uroanalisis');
      });
    });

    it('should handle session storage errors gracefully', async () => {
      mockSessionStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });
      
      render(<TestApp />);
      
      // Should not throw error
      expect(() => {
        fireEvent.click(screen.getByTestId('set-hematologia'));
      }).not.toThrow();
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('hematologia');
      });
    });

    it('should retrieve persisted theme on initialization', async () => {
      mockSessionStorage.getItem.mockReturnValue('micologia');
      
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('micologia');
        expect(mockSessionStorage.getItem).toHaveBeenCalledWith('atlas-theme-category');
      });
    });
  });

  describe('Error Handling', () => {
    it('should fallback to general theme on invalid category', async () => {
      render(<TestApp />);
      
      const { setTheme } = useAtlasTheme();
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      // Try to set invalid category
      act(() => {
        setTheme('invalid-category' as CategoryKey);
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
    });

    it('should handle CSS property update errors gracefully', async () => {
      const mockStyle = document.documentElement.style as any;
      mockStyle.setProperty.mockImplementation(() => {
        throw new Error('CSS property update failed');
      });
      
      render(<TestApp />);
      
      // Should not throw error
      expect(() => {
        fireEvent.click(screen.getByTestId('set-hematologia'));
      }).not.toThrow();
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('hematologia');
      });
    });

    it('should handle URL update errors gracefully', async () => {
      mockHistory.replaceState.mockImplementation(() => {
        throw new Error('History API not available');
      });
      
      render(<TestApp />);
      
      // Should not throw error
      expect(() => {
        fireEvent.click(screen.getByTestId('set-parasitologia'));
      }).not.toThrow();
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('parasitologia');
      });
    });
  });

  describe('Transition States', () => {
    it('should set transitioning state during theme changes', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('is-transitioning')).toHaveTextContent('false');
      });
      
      fireEvent.click(screen.getByTestId('set-hematologia'));
      
      // Should be transitioning immediately after click
      expect(screen.getByTestId('is-transitioning')).toHaveTextContent('true');
      
      // Should finish transitioning after timeout
      await waitFor(() => {
        expect(screen.getByTestId('is-transitioning')).toHaveTextContent('false');
      }, { timeout: 1000 });
    });

    it('should add and remove transition classes on body', async () => {
      render(<TestApp />);
      
      fireEvent.click(screen.getByTestId('set-hematologia'));
      
      const mockClassList = document.body.classList as any;
      expect(mockClassList.add).toHaveBeenCalledWith('atlas-theme-transitioning');
      
      await waitFor(() => {
        expect(mockClassList.remove).toHaveBeenCalledWith('atlas-theme-transitioning');
        expect(mockClassList.add).toHaveBeenCalledWith('atlas-theme-transition-complete');
      }, { timeout: 1000 });
    });
  });

  describe('Performance Optimization', () => {
    it('should not update if theme is already active', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      // Clear previous calls
      mockHistory.replaceState.mockClear();
      mockSessionStorage.setItem.mockClear();
      
      // Try to set the same theme
      fireEvent.click(screen.getByTestId('set-general'));
      
      // Should not trigger updates
      expect(mockHistory.replaceState).not.toHaveBeenCalled();
      expect(mockSessionStorage.setItem).not.toHaveBeenCalled();
    });

    it('should debounce rapid theme changes', async () => {
      render(<TestApp />);
      
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('general');
      });
      
      // Rapidly click multiple theme buttons
      fireEvent.click(screen.getByTestId('set-hematologia'));
      fireEvent.click(screen.getByTestId('set-parasitologia'));
      fireEvent.click(screen.getByTestId('set-hematologia'));
      
      // Should only process the last change after debounce
      await waitFor(() => {
        expect(screen.getByTestId('current-theme')).toHaveTextContent('hematologia');
      }, { timeout: 200 });
      
      // Should have been called only once for the final theme
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith('atlas-theme-category', 'hematologia');
    });
  });

  describe('Medical Specialty Theme Validation', () => {
    const medicalSpecialties: CategoryKey[] = [
      'hematologia',
      'parasitologia', 
      'micologia',
      'bacteriologia',
      'citologia-histologia',
      'uroanalisis',
      'coproanalisis'
    ];

    medicalSpecialties.forEach(specialty => {
      it(`should correctly apply ${specialty} theme`, async () => {
        mockLocation.hash = `#${specialty}`;
        
        render(<TestApp />);
        
        await waitFor(() => {
          expect(screen.getByTestId('current-theme')).toHaveTextContent(specialty);
          expect(screen.getByTestId('primary-color')).toHaveTextContent(ATLAS_THEMES[specialty].colors.primary);
          expect(screen.getByTestId('background-color')).toHaveTextContent(ATLAS_THEMES[specialty].colors.background);
        });
      });
    });

    it('should have distinct colors for each medical specialty', () => {
      const primaryColors = medicalSpecialties.map(specialty => ATLAS_THEMES[specialty].colors.primary);
      const uniqueColors = new Set(primaryColors);
      
      expect(uniqueColors.size).toBe(medicalSpecialties.length);
    });
  });
});
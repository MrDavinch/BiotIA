# Atlas Navigation Fix

## Problem Description

When clicking on Atlas category links for the first time from other pages (like `/dashboard`), the URL would change to `/dashboard#micologia` instead of `/atlas#micologia`, requiring a second click to properly navigate to the Atlas page with the correct theme applied.

## Root Cause

The issue was caused by a race condition between Next.js navigation and the theme system's URL hash management:

1. User clicks on an Atlas link (e.g., "Micología") from `/dashboard`
2. Next.js starts navigation to `/atlas#micologia`
3. The `onClick` handler executes and calls `setTheme()` with `updateUrl: true`
4. The theme system tries to update the URL hash while Next.js navigation is in progress
5. This causes the hash to be applied to the current page (`/dashboard`) instead of the target page (`/atlas`)
6. The navigation completes, but the theme isn't applied because the hash was set on the wrong page

## Solution

### 1. Smart Click Handler

Modified the `handleAtlasLinkClick` function in `themed-sidebar.tsx` to handle navigation differently based on the current page:

```typescript
const handleAtlasLinkClick = (category: string, event: React.MouseEvent) => {
  console.debug('Atlas link clicked:', category);
  
  // If we're already on the atlas page, just update the theme
  if (pathname === '/atlas') {
    event.preventDefault();
    setTheme(category as any, true);
  } else {
    // If we're navigating to atlas page, let Next.js handle the navigation
    // The theme will be updated by the hash change listener in the provider
    setTheme(category as any, false); // Don't update URL, let Next.js handle it
  }
};
```

**Key Changes:**
- When already on `/atlas`: Prevent default navigation and update theme directly
- When navigating from another page: Let Next.js handle navigation, don't update URL in theme system

### 2. Enhanced URL Monitoring

Added multiple layers of URL change detection in the theme provider:

```typescript
// Enhanced hash change listener for browser navigation
useEffect(() => {
  const handleHashChange = (event?: HashChangeEvent) => {
    const category = getCategoryFromHash();
    safeSetTheme(category, false);
  };

  const handleRouteChange = () => {
    setTimeout(() => {
      const category = getCategoryFromHash();
      if (category !== currentTheme.category) {
        safeSetTheme(category, false);
      }
    }, 10);
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('focus', handleRouteChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('focus', handleRouteChange);
    };
  }
}, [safeSetTheme, currentTheme.category]);
```

### 3. URL Change Monitoring

Added efficient URL monitoring using `requestAnimationFrame`:

```typescript
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
        safeSetTheme(urlCategory, false);
      }
    }
  };

  // Use requestAnimationFrame for efficient monitoring
  let animationFrameId: number;
  const scheduleCheck = () => {
    animationFrameId = requestAnimationFrame(() => {
      checkForThemeUpdate();
      scheduleCheck();
    });
  };

  scheduleCheck();

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}, [currentTheme.category, safeSetTheme]);
```

## Benefits

### 1. Immediate Theme Application
- First click now properly navigates to `/atlas#category` and applies theme immediately
- No more double-click requirement

### 2. Robust Navigation Handling
- Works with Next.js client-side navigation
- Handles browser back/forward buttons
- Supports direct URL entry
- Works with page refreshes

### 3. Performance Optimized
- Uses `requestAnimationFrame` instead of intervals for efficient monitoring
- Prevents unnecessary theme updates when already on correct theme
- Debounced theme changes prevent rapid switching issues

### 4. Backward Compatibility
- Existing functionality preserved
- All tests continue to pass
- No breaking changes to API

## Testing

The fix has been tested with:
- ✅ Navigation from dashboard to atlas categories
- ✅ Navigation between atlas categories
- ✅ Browser back/forward buttons
- ✅ Direct URL entry
- ✅ Page refresh on atlas pages
- ✅ All existing unit tests pass

## Implementation Details

### Files Modified
1. `src/components/themed-sidebar.tsx` - Smart click handler
2. `src/components/atlas-theme-provider.tsx` - Enhanced URL monitoring
3. `src/lib/README-atlas-navigation-fix.md` - This documentation

### Performance Impact
- Minimal performance impact
- Uses efficient `requestAnimationFrame` for monitoring
- No memory leaks (proper cleanup in useEffect)
- Debounced theme changes prevent excessive updates

## Future Improvements

1. **Router Integration**: Could integrate more deeply with Next.js router events
2. **Preemptive Loading**: Could preload themes when hovering over links
3. **Animation Coordination**: Could coordinate navigation animations with theme transitions
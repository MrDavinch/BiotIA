# Atlas Theme URL Hash Management

This document describes the implementation of URL hash management for the Atlas dynamic theming system.

## Overview

The URL hash management system allows users to:
- Navigate directly to specific Atlas themes via URL (e.g., `/atlas#hematologia`)
- Use browser back/forward buttons to navigate between themes
- Share URLs that preserve the selected theme
- Have themes persist during browser navigation

## Implementation Details

### Core Functions

#### `getCategoryFromHash(): CategoryKey`
Extracts and validates the theme category from the current URL hash.

**Features:**
- Handles empty or missing hashes (defaults to 'general')
- Normalizes hash values (lowercase, trimmed)
- Validates against available theme categories
- Provides error handling with fallback to 'general'
- Logs warnings for invalid categories

**Example:**
```typescript
// URL: /atlas#hematologia
getCategoryFromHash(); // Returns: 'hematologia'

// URL: /atlas#INVALID
getCategoryFromHash(); // Returns: 'general' (with warning)

// URL: /atlas
getCategoryFromHash(); // Returns: 'general'
```

#### `updateUrlHash(category: CategoryKey, replace: boolean = true): void`
Updates the URL hash without triggering page navigation.

**Parameters:**
- `category`: The theme category to set in the URL
- `replace`: If true, uses `replaceState` (no history entry); if false, uses `pushState` (adds history entry)

**Features:**
- Only updates if hash is different from current
- Uses History API to avoid page reloads
- Error handling for History API failures

#### `getThemeWithFallback(): CategoryKey`
Determines the theme to use with intelligent fallback logic.

**Priority Order:**
1. URL hash (if present and valid)
2. Session storage (if no hash present)
3. Default 'general' theme

### Session Storage Persistence

#### `persistThemeToSession(category: CategoryKey): void`
Saves the current theme to session storage for persistence across page reloads.

#### `getPersistedTheme(): CategoryKey | null`
Retrieves the persisted theme from session storage with validation.

#### `clearPersistedTheme(): void`
Removes the persisted theme from session storage.

### AtlasThemeProvider Enhancements

The theme provider has been enhanced with robust URL hash management:

#### Initialization
- Uses `getThemeWithFallback()` to determine initial theme
- Applies theme without updating URL (since URL is already set)
- Logs initialization for debugging

#### Hash Change Listener
```typescript
const handleHashChange = (event?: HashChangeEvent) => {
  const category = getCategoryFromHash();
  safeSetTheme(category, false); // Don't update URL since this was triggered by URL change
  
  if (event) {
    console.debug('Atlas theme changed via browser navigation:', {
      from: event.oldURL?.split('#')[1] || 'general',
      to: category
    });
  }
};
```

#### PopState Listener (Back/Forward Buttons)
```typescript
const handlePopState = (event: PopStateEvent) => {
  const category = getCategoryFromHash();
  safeSetTheme(category, false);
  console.debug('Atlas theme changed via browser back/forward:', category);
};
```

#### Enhanced Theme Setter
```typescript
const safeSetTheme = useCallback((category: CategoryKey, updateUrl: boolean = true) => {
  // Validation, CSS updates, React state updates
  
  // Persist to session storage
  persistThemeToSession(category);
  
  // Update URL if requested
  if (updateUrl) {
    updateUrlHash(category, true);
  }
}, []);
```

## Error Handling

### Invalid Categories
- Invalid hash values fallback to 'general' theme
- Warning messages logged to console
- Application continues to function normally

### Browser API Failures
- History API errors are caught and logged
- Session storage errors are handled gracefully
- CSS property update failures fallback to previous theme

### Network/Loading Issues
- SSR safety checks prevent server-side errors
- Graceful degradation when browser APIs unavailable

## Testing

### Unit Tests
Comprehensive unit tests cover:
- Hash extraction and validation
- URL updating functionality
- Session storage persistence
- Fallback logic
- Error handling scenarios

### Manual Testing Scenarios

1. **Direct URL Navigation**
   - Navigate to `/atlas#hematologia`
   - Verify theme changes to Hematología
   - Check that URL hash is preserved

2. **Browser Navigation**
   - Change theme via sidebar
   - Use browser back button
   - Verify theme reverts to previous selection

3. **Page Reload**
   - Select a theme
   - Reload the page
   - Verify theme is restored from session storage

4. **Invalid Hash Handling**
   - Navigate to `/atlas#invalid-theme`
   - Verify fallback to general theme
   - Check console for warning message

5. **Session Persistence**
   - Select a theme
   - Open new tab to `/atlas`
   - Verify theme is restored from session storage

## Browser Compatibility

The implementation uses modern browser APIs:
- **History API**: `pushState`, `replaceState` (IE10+)
- **Session Storage**: `sessionStorage` (IE8+)
- **Hash Change Events**: `hashchange` event (IE8+)
- **Pop State Events**: `popstate` event (IE10+)

Graceful degradation is provided for older browsers.

## Performance Considerations

- **Minimal Re-renders**: Theme changes only trigger necessary component updates
- **Debounced Transitions**: Transition states prevent rapid successive changes
- **CSS Custom Properties**: Efficient theme switching without style recalculation
- **Session Storage**: Lightweight persistence mechanism

## Security Considerations

- **Input Validation**: All hash values are validated against known categories
- **XSS Prevention**: No direct HTML injection from URL parameters
- **Safe Fallbacks**: Invalid inputs default to safe 'general' theme

## Future Enhancements

Potential improvements for future versions:
- **Theme Preloading**: Preload theme assets for faster switching
- **Animation Optimization**: GPU-accelerated theme transitions
- **Deep Linking**: Support for sub-category deep linking
- **Theme History**: Remember user's theme preferences across sessions
- **A/B Testing**: Support for theme experimentation

## Debugging

Enable debug logging by setting:
```typescript
// In browser console
localStorage.setItem('atlas-theme-debug', 'true');
```

This will log:
- Theme initialization
- Hash change events
- Browser navigation events
- Error conditions
- Performance metrics
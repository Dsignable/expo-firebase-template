import { useContext, createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { LIGHT_THEME, DARK_THEME, SPACING, TYPOGRAPHY, SHADOWS, BORDER_RADIUS, Z_INDEX } from '../constants/theme';

// Create theme context
const ThemeContext = createContext();

/**
 * Theme provider component
 */
export function ThemeProvider({ children, initialTheme = 'system' }) {
  const deviceTheme = useColorScheme();
  const [themeType, setThemeType] = useState(initialTheme);
  
  // Determine the actual theme based on system or user preference
  const theme = themeType === 'system' 
    ? (deviceTheme === 'dark' ? DARK_THEME : LIGHT_THEME)
    : themeType === 'dark' ? DARK_THEME : LIGHT_THEME;
    
  // Theme attributes
  const colors = theme;
  const isDark = themeType === 'dark' || (themeType === 'system' && deviceTheme === 'dark');
  
  // Change theme
  const setTheme = (newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setThemeType(newTheme);
    }
  };
  
  // Value object for context
  const value = {
    theme,
    themeType,
    setTheme,
    isDark,
    colors,
    spacing: SPACING,
    typography: TYPOGRAPHY,
    shadows: SHADOWS,
    borderRadius: BORDER_RADIUS,
    zIndex: Z_INDEX,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to use theme
 * @returns {object} Theme values and functions
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 
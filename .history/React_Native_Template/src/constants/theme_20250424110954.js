/**
 * Theme constants for consistent styling across the application
 */

export const COLORS = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0062CC',
  primaryLight: '#4DA2FF',
  
  // Secondary colors
  secondary: '#5856D6',
  secondaryDark: '#4744AB',
  secondaryLight: '#7A78E0',
  
  // Accent colors
  accent: '#FF9500',
  accentDark: '#CC7700',
  accentLight: '#FFAA33',

  // Functional colors
  success: '#34C759',
  warning: '#FFCC00',
  error: '#FF3B30',
  info: '#5AC8FA',
  
  // Neutral colors
  background: '#F2F2F7',
  card: '#FFFFFF',
  text: '#000000',
  secondaryText: '#3C3C43',
  lightText: '#8E8E93',
  border: '#C7C7CC',
  disabled: '#E5E5EA',
  
  // Status bar
  statusBar: 'dark-content',
};

export const TYPOGRAPHY = {
  // Font family - add custom fonts here
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  
  // Font weights
  fontWeight: {
    regular: '400',
    medium: '600',
    bold: '700',
  },
  
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
    headline: 36,
  },
  
  // Line heights
  lineHeight: {
    xs: 18,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 30,
    xxl: 36,
    xxxl: 45,
    headline: 54,
  },
};

// Use for consistent spacing throughout the app
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Shortcuts for consistent sizing
export const SIZES = {
  // Screen dimensions
  screenWidth: '100%',
  screenHeight: '100%',
  
  // Component sizes
  buttonHeight: 48,
  inputHeight: 48,
  borderRadius: 8,
  iconSize: 24,
  
  // Typography sizes - re-exported for convenience
  ...TYPOGRAPHY.fontSize,
};

// Border styles
export const BORDERS = {
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    pill: 9999,
  },
  width: {
    thin: 1,
    regular: 2,
    thick: 3,
  },
};

// Shadows for elevation
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Z-index values for controlling component stacking
export const Z_INDEX = {
  base: 0,
  card: 10,
  drawer: 20,
  modal: 30,
  overlay: 40,
  popover: 50,
  toast: 60,
};

// Timing values for animations
export const TIMING = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Export all theme constants
export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  SIZES,
  BORDERS,
  SHADOWS,
  Z_INDEX,
  TIMING,
}; 
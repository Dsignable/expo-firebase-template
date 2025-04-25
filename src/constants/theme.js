import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Breakpoints for responsive design
export const BREAKPOINTS = {
  smallPhone: 320,
  phone: 500,
  tablet: 768,
  largeTablet: 1024,
  desktop: 1200,
};

// Color palette
export const COLORS = {
  // Primary brand colors
  primary: '#404040',
  primaryLight: '#606060',
  primaryDark: '#202020',
  
  // Secondary brand colors
  secondary: '#707070',
  secondaryLight: '#909090',
  secondaryDark: '#505050',
  
  // Accent colors
  accent: '#A0A0A0',
  accentLight: '#C0C0C0',
  accentDark: '#808080',
  
  // Semantic colors
  success: '#2E7D32',
  warning: '#F9A825',
  error: '#C62828',
  info: '#546E7A',
  
  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
  
  // Transparent colors
  transparent: 'transparent',
  transparentBlack: 'rgba(0, 0, 0, 0.5)',
  transparentWhite: 'rgba(255, 255, 255, 0.5)',
};

// Color themes
export const LIGHT_THEME = {
  background: COLORS.gray100,
  surface: COLORS.white,
  text: COLORS.gray900,
  textSecondary: COLORS.gray700,
  border: COLORS.gray300,
  ...COLORS,
};

export const DARK_THEME = {
  background: COLORS.gray900,
  surface: COLORS.gray800,
  text: COLORS.gray100,
  textSecondary: COLORS.gray400,
  border: COLORS.gray700,
  ...COLORS,
};

// Font sizes
export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
  hero: 48,
};

// Font families
export const FONT_FAMILY = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  // Add custom fonts here
};

// Font weights
export const FONT_WEIGHT = {
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

// Line heights
export const LINE_HEIGHT = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 38,
  xxxl: 46,
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Borders
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 500,
  circle: 9999,
};

// Shadows (for iOS and Android)
export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Z-index
export const Z_INDEX = {
  base: 0,
  above: 1,
  dropdown: 10,
  sticky: 100,
  modal: 1000,
  toast: 2000,
};

// Responsive dimensions
export const WINDOW = {
  width,
  height,
};

// Screen size helpers
export const isSmallDevice = width < BREAKPOINTS.phone;
export const isTablet = width >= BREAKPOINTS.tablet;
export const isDesktop = width >= BREAKPOINTS.desktop;

// Typography styles
export const TYPOGRAPHY = {
  h1: {
    fontSize: FONT_SIZE.hero,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.xxxl,
  },
  h2: {
    fontSize: FONT_SIZE.display,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.xxl,
  },
  h3: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: LINE_HEIGHT.xl,
  },
  h4: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.semiBold,
    lineHeight: LINE_HEIGHT.lg,
  },
  h5: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semiBold,
    lineHeight: LINE_HEIGHT.lg,
  },
  h6: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semiBold,
    lineHeight: LINE_HEIGHT.md,
  },
  subtitle1: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.md,
  },
  subtitle2: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.sm,
  },
  body1: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.md,
  },
  body2: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.sm,
  },
  button: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.md,
  },
  caption: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular,
    lineHeight: LINE_HEIGHT.xs,
  },
  overline: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: LINE_HEIGHT.xs,
    textTransform: 'uppercase',
  },
}; 
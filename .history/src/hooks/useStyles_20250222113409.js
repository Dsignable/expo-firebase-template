import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useResponsive } from './useResponsive';
import { createResponsiveStyle } from '../constants/theme';

export function useStyles(styleCallback) {
  const dimensions = useResponsive();
  
  return useMemo(() => {
    const styles = styleCallback(dimensions);
    
    // If styles is already a StyleSheet, return it
    if (styles?.__proto__ === StyleSheet.create({}).prototype) {
      return styles;
    }
    
    // Convert responsive styles
    const processedStyles = Object.entries(styles).reduce((acc, [key, value]) => {
      acc[key] = createResponsiveStyle(value, dimensions);
      return acc;
    }, {});
    
    return StyleSheet.create(processedStyles);
  }, [dimensions, styleCallback]);
} 
import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export function useResponsive() {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions.window;
  
  return {
    width,
    height,
    isSmallDevice: width < 375,
    isMediumDevice: width >= 375 && width < 768,
    isLargeDevice: width >= 768,
    isLandscape: width > height,
    isPortrait: height > width,
    scale: Dimensions.get('window').scale,
  };
} 
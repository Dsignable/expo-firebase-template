import React from 'react';
import { View, Text } from 'react-native';
import { useStyles } from '../hooks/useStyles';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';

export function Card({ title, children }) {
  const styles = useStyles(({ width, isLandscape }) => ({
    container: {
      default: {
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        ...SHADOWS.md,
        width: '90%',
      },
      md: {
        width: '85%',
        maxWidth: 500,
      },
      lg: {
        width: isLandscape ? '45%' : '75%',
        maxWidth: 600,
      },
    },
    title: {
      default: {
        fontSize: FONTS.sizes.lg,
        fontFamily: FONTS.families.bold,
        color: COLORS.grey[800],
        marginBottom: SPACING.sm,
      },
      lg: {
        fontSize: FONTS.sizes.xl,
        marginBottom: SPACING.md,
      },
    },
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
} 
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const { user, isDark, setTheme, themeType } = useAuth();

  const toggleTheme = () => {
    setTheme(themeType === 'dark' ? 'light' : 'dark');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: spacing.lg,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: colors.gray300,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    avatarText: {
      fontSize: 40,
      fontWeight: 'bold',
      color: colors.gray600,
    },
    name: {
      ...typography.h4,
      color: colors.text,
    },
    email: {
      ...typography.body1,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      ...typography.h6,
      color: colors.text,
      marginBottom: spacing.md,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
    },
    cardTitle: {
      ...typography.subtitle2,
      color: colors.text,
    },
    cardValue: {
      ...typography.body2,
      color: colors.textSecondary,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.sm,
      padding: spacing.md,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    buttonText: {
      color: colors.white,
      ...typography.button,
    },
  });

  // Get user's first name for avatar
  const getInitials = () => {
    if (!user || !user.displayName) return '?';
    return user.displayName.charAt(0).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials()}</Text>
          </View>
          <Text style={styles.name}>{user?.displayName || 'User'}</Text>
          <Text style={styles.email}>{user?.email || 'Guest'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>User ID</Text>
              <Text style={styles.cardValue}>{user?.uid || 'Not available'}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Account Type</Text>
              <Text style={styles.cardValue}>{user?.isAnonymous ? 'Guest' : 'Registered'}</Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Email Verified</Text>
              <Text style={styles.cardValue}>{user?.emailVerified ? 'Yes' : 'No'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>Theme</Text>
              <TouchableOpacity onPress={toggleTheme}>
                <Text style={[styles.cardValue, { color: colors.primary }]}>
                  {isDark ? 'Dark Mode' : 'Light Mode'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.secondary }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Go to Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 
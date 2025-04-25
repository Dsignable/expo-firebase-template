import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { signOut } from '../services/firebase/auth';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { colors, spacing, typography, shadows, borderRadius } = useTheme();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: spacing.lg,
    },
    welcomeCard: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      ...shadows.medium,
    },
    cardHeader: {
      marginBottom: spacing.md,
    },
    title: {
      ...typography.h4,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...typography.body2,
      color: colors.textSecondary,
    },
    infoCard: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      marginBottom: spacing.lg,
      ...shadows.small,
    },
    infoTitle: {
      ...typography.subtitle1,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    infoContent: {
      ...typography.body2,
      color: colors.textSecondary,
      marginBottom: spacing.md,
    },
    userInfo: {
      flexDirection: 'row',
      marginBottom: spacing.md,
      alignItems: 'center',
    },
    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },
    avatarText: {
      color: colors.white,
      fontWeight: '600',
    },
    userDetails: {
      flex: 1,
    },
    userName: {
      ...typography.subtitle2,
      color: colors.text,
    },
    userEmail: {
      ...typography.body2,
      color: colors.textSecondary,
    },
    actionsCard: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      ...shadows.small,
    },
    actionTitle: {
      ...typography.subtitle1,
      color: colors.text,
      marginBottom: spacing.md,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: borderRadius.sm,
      marginBottom: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: colors.white,
      fontSize: typography.button.fontSize,
      fontWeight: '600',
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    outlineButtonText: {
      color: colors.primary,
    }
  });

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Welcome to Firebase Expo Template</Text>
              <Text style={styles.subtitle}>
                A starter template for your next awesome project
              </Text>
            </View>
            
            <View style={styles.userInfo}>
              <View style={styles.userAvatar}>
                <Text style={styles.avatarText}>
                  {user?.displayName?.charAt(0).toUpperCase() || 
                   user?.email?.charAt(0).toUpperCase() || 'G'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>
                  {user?.displayName || 'Welcome'}
                </Text>
                <Text style={styles.userEmail}>
                  {user?.email || (user?.isAnonymous ? 'Guest User' : '')}
                  {user?.isDev ? ' (Dev Mode)' : ''}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Features Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Template Features</Text>
            <Text style={styles.infoContent}>
              • Firebase Authentication Integration{'\n'}
              • Responsive UI with Card-Based Design{'\n'}
              • Theme System with Dark Mode Support{'\n'}
              • Ready-to-Use Navigation Setup{'\n'}
              • Demo Mode for Development
            </Text>
          </View>
          
          {/* Actions Card */}
          <View style={styles.actionsCard}>
            <Text style={styles.actionTitle}>Quick Actions</Text>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Profile')}
            >
              <Text style={styles.buttonText}>Go to Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.outlineButton]}
              onPress={() => navigation.navigate('Home', { title: 'Refreshed Dashboard' })}
            >
              <Text style={[styles.buttonText, styles.outlineButtonText]}>Refresh Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: colors.error }]}
              onPress={handleSignOut}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 
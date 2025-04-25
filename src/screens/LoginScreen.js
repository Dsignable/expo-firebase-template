import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { signIn, signInAsGuest, signInWithGoogle } from '../services/firebase/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { colors, spacing, typography, borderRadius, shadows } = useTheme();
  const { setError, setDevUser, isFirebaseConfigured } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const windowWidth = Dimensions.get('window').width;
  const isSmallScreen = windowWidth < 380;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (error) {
      setError(error.message);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signInAsGuest();
    } catch (error) {
      setError(error.message);
      Alert.alert('Guest Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle development mode bypass
  const handleDevBypass = () => {
    setDevUser({
      displayName: 'Developer User',
      email: 'dev@example.com',
      // Add any user properties your app needs
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: spacing.lg,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      padding: spacing.xl,
      ...shadows.medium,
      marginBottom: spacing.xl,
      maxWidth: 450,
      width: '100%',
      alignSelf: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: borderRadius.circle,
      backgroundColor: colors.gray200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      ...typography.h4,
      color: colors.primary,
    },
    title: {
      ...typography.h4,
      color: colors.text,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    subtitle: {
      ...typography.body2,
      color: colors.textSecondary,
      marginBottom: spacing.lg,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: spacing.md,
    },
    inputLabel: {
      ...typography.caption,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    input: {
      backgroundColor: colors.background,
      borderRadius: borderRadius.sm,
      padding: spacing.md,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
      fontSize: typography.body1.fontSize,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: spacing.lg,
    },
    forgotPasswordText: {
      ...typography.caption,
      color: colors.primary,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.sm,
      padding: isSmallScreen ? spacing.sm : spacing.md,
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    buttonText: {
      color: colors.white,
      fontWeight: '600',
      fontSize: typography.button.fontSize,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: spacing.md,
    },
    link: {
      color: colors.primary,
      fontWeight: '600',
      marginLeft: spacing.xs,
    },
    guestButton: {
      backgroundColor: colors.gray600,
    },
    devCard: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      ...shadows.small,
      maxWidth: 450,
      width: '100%',
      alignSelf: 'center',
    },
    devTitle: {
      ...typography.subtitle2,
      color: colors.text,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    devButton: {
      backgroundColor: colors.secondary,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.md,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      color: colors.textSecondary,
      paddingHorizontal: spacing.md,
      fontSize: typography.caption.fontSize,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Main Login Card */}
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>FB</Text>
              </View>
            </View>
            
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Log in to continue to Firebase + Expo Template</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.gray500}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={colors.gray500}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.guestButton]}
              onPress={handleGuestLogin}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Continue as Guest</Text>
            </TouchableOpacity>
            
            <View style={styles.footer}>
              <Text style={{ color: colors.textSecondary }}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Developer Options Card */}
          <View style={styles.devCard}>
            <Text style={styles.devTitle}>Developer Options</Text>
            
            <TouchableOpacity 
              style={[styles.button, styles.devButton]}
              onPress={handleDevBypass}
            >
              <Text style={styles.buttonText}>
                {isFirebaseConfigured ? 'Bypass Login (Dev Mode)' : 'Skip Login (Demo Mode)'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 
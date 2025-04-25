import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

// Auth Context
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoadingScreen from '../screens/LoadingScreen';

// Navigation Stacks
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

// Authentication Stack (when not logged in)
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

// Custom header component
function CustomHeader({ title, navigation, showBackButton = true }) {
  const { colors, spacing, typography, shadows } = useTheme();
  const { user } = useAuth();
  
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      backgroundColor: colors.primary,
      ...shadows.small,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      ...typography.h6,
      color: colors.white,
      fontWeight: '600',
    },
    backButton: {
      width: 40,
      alignItems: 'flex-start',
    },
    backText: {
      color: colors.white,
      fontSize: typography.body2.fontSize,
    },
    profileButton: {
      width: 40,
      alignItems: 'flex-end',
    },
    profileCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.gray300,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileInitial: {
      color: colors.primary,
      fontWeight: '600',
    }
  });

  return (
    <View style={styles.header}>
      {showBackButton && navigation.canGoBack() ? (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      ) : <View style={styles.backButton} />}
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      {user && (
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Main App Stack (when logged in)
function AppNavigator() {
  const { colors } = useTheme();
  
  return (
    <AppStack.Navigator
      screenOptions={({ navigation, route }) => ({
        header: (props) => (
          <CustomHeader 
            title={route.params?.title || route.name} 
            navigation={navigation} 
          />
        ),
        headerShown: true,
        contentStyle: {
          backgroundColor: colors.background,
        }
      })}
    >
      <AppStack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Dashboard' }} 
      />
      <AppStack.Screen 
        name="Profile" 
        component={ProfileScreen} 
      />
    </AppStack.Navigator>
  );
}

// Main Navigation Container
export default function Navigation() {
  const { user, loading } = useAuth();
  
  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is signed in
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        // User is not signed in
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
} 
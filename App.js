import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// Providers
import { ThemeProvider, useTheme } from './src/hooks/useTheme';
import { AuthProvider } from './src/context/AuthContext';

// Navigation
import Navigation from './src/navigation';

// Main App container with providers
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

// App content with access to context values
function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </>
  );
} 
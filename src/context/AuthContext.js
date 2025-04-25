import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges, getCurrentUser } from '../services/firebase/auth';
import { isFirebaseConfigured } from '../services/firebase/config';

// Create the context
const AuthContext = createContext();

/**
 * Authentication Provider Component
 * Handles authentication state throughout the app
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Listen for auth state changes when the component mounts
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Function to set a development user (bypassing Firebase auth)
  const setDevUser = (userData = {}) => {
    const devUser = {
      uid: 'dev-user-id',
      email: 'dev@example.com',
      displayName: 'Dev User',
      photoURL: null,
      emailVerified: true,
      isAnonymous: false,
      ...userData,
      // Mark as development user
      isDev: true
    };
    
    setUser(devUser);
    setLoading(false);
    console.log('🔧 Development mode: Using mock user', devUser);
  };

  // Clear any authentication errors
  const clearError = () => setError(null);

  // Get the current user value
  const value = {
    user,
    loading,
    error,
    setError,
    clearError,
    setDevUser,
    isAuthenticated: !!user,
    isGuest: user && user.isAnonymous,
    isDev: user && user.isDev,
    isFirebaseConfigured: isFirebaseConfigured()
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use authentication context
 * @returns {object} Auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
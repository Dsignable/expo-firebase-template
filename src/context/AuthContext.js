import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToAuthChanges, getCurrentUser } from '../services/firebase/auth';

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

  // Clear any authentication errors
  const clearError = () => setError(null);

  // Get the current user value
  const value = {
    user,
    loading,
    error,
    setError,
    clearError,
    isAuthenticated: !!user,
    isGuest: user && user.isAnonymous,
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
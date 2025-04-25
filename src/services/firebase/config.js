import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

// Check if Firebase configuration is available
const isFirebaseConfigured = () => {
  try {
    const apiKey = Constants.expoConfig?.extra?.FIREBASE_API_KEY;
    return apiKey && apiKey !== 'your_api_key_here' && apiKey.length > 0;
  } catch (error) {
    return false;
  }
};

// Firebase configuration
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID,
  measurementId: Constants.expoConfig?.extra?.FIREBASE_MEASUREMENT_ID,
};

// Create placeholder objects for when Firebase is not configured
const placeholderAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    callback(null);
    return () => {};
  },
  signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
  createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase not configured')),
  signOut: () => Promise.reject(new Error('Firebase not configured')),
};

const placeholderFirestore = {
  collection: () => ({
    add: () => Promise.reject(new Error('Firebase not configured')),
    get: () => Promise.reject(new Error('Firebase not configured')),
  }),
  doc: () => ({
    get: () => Promise.reject(new Error('Firebase not configured')),
    set: () => Promise.reject(new Error('Firebase not configured')),
    update: () => Promise.reject(new Error('Firebase not configured')),
    delete: () => Promise.reject(new Error('Firebase not configured')),
  }),
};

const placeholderStorage = {
  ref: () => ({
    put: () => Promise.reject(new Error('Firebase not configured')),
    getDownloadURL: () => Promise.reject(new Error('Firebase not configured')),
  }),
};

let app, auth, db, storage;

if (isFirebaseConfigured()) {
  try {
    // Initialize Firebase (preventing multiple initializations)
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    
    // Initialize services
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize Firebase:', error.message);
    
    // Fall back to placeholders
    auth = placeholderAuth;
    db = placeholderFirestore;
    storage = placeholderStorage;
  }
} else {
  console.log(
    '🔥 Firebase not configured. Set up your Firebase credentials in .env file.\n' +
    '  → This is normal for new projects. See README Troubleshooting section.\n' +
    '  → The app will work in demo mode, but Firebase features will be unavailable.'
  );
  
  // Use placeholders when Firebase is not configured
  auth = placeholderAuth;
  db = placeholderFirestore;
  storage = placeholderStorage;
}

export { app, auth, db, storage, isFirebaseConfigured }; 
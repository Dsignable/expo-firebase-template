# Expo + Firebase Project Template

A comprehensive template for quickly setting up professional React Native web/mobile applications using Expo and Firebase.

## 🔥 Features

- ⚛️ Expo SDK (latest version) for cross-platform development
- 🔐 Firebase authentication ready
- 🗄️ Firestore database integration
- 📱 Responsive design patterns for web and mobile
- 🧭 React Navigation pre-configured
- 🎨 Theme system with dark/light mode support
- 🔍 SEO optimization for web
- 📂 Organized, scalable project structure
- ⚙️ Environment variables support
- 🧪 Testing setup with Jest
- 📝 TypeScript support
- 🛠️ ESLint and Prettier configured
- 👨‍💻 Developer mode with login bypass for easy exploration

## 🚀 Quick Start

### Create New Project

```bash
# Clone this template
git clone https://github.com/dsignable/expo-firebase-template.git my-new-project

# Navigate to project
cd my-new-project

# Install dependencies
npm install

# Set up Firebase config
cp .env.example .env
# Edit .env with your Firebase credentials

# Start development
npm start
```

### Alternative: Using GitHub CLI

```bash
# Install GitHub CLI if not already installed
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# Create a new repository from this template
gh repo create my-new-project --template dsignable/expo-firebase-template --public

# Clone the new repository
git clone https://github.com/yourusername/my-new-project.git
cd my-new-project

# Install dependencies
npm install

# Set up Firebase config
cp .env.example .env
# Edit .env with your Firebase credentials

# Start development
npm start
```

### Development Options

```bash
# Start Expo development server
npm start

# Web specific
npm run web

# iOS specific
npm run ios

# Android specific
npm run android
```

## 📁 Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── common/      # Generic components (Button, Input, etc.)
│   ├── layout/      # Layout components (Header, Footer, etc.)
│   └── specific/    # Feature-specific components
├── screens/         # Application screens
├── navigation/      # Navigation configuration
├── hooks/           # Custom React hooks
├── services/        # API and service integrations
│   ├── firebase/    # Firebase related services
│   │   ├── auth.js  # Authentication methods
│   │   └── db.js    # Database methods
│   └── api/         # Other API integrations
├── constants/       # App constants
│   ├── theme.js     # Design tokens
│   └── routes.js    # Route names
├── context/         # React Context providers
├── utils/           # Helper functions
├── types/           # TypeScript type definitions
└── assets/          # Static assets
```

## 🔥 Firebase Integration

### Authentication

The template includes ready-to-use authentication flows:

- Email/Password authentication
- Google Sign-in
- Apple Sign-in (for iOS/web)
- Guest mode

Use the authentication service:

```javascript
import { signIn, signUp, signOut } from '../services/firebase/auth';

// Sign in user
await signIn(email, password);

// Sign up user
await signUp(email, password, displayName);

// Sign out
await signOut();
```

### Firestore Database

Database service is configured for common operations:

```javascript
import { addDocument, getDocument, updateDocument, deleteDocument } from '../services/firebase/db';

// Add a document
const docId = await addDocument('collection', data);

// Get a document
const doc = await getDocument('collection', docId);

// Update a document
await updateDocument('collection', docId, updateData);

// Delete a document
await deleteDocument('collection', docId);
```

## 🎨 Styling and Theming

The theme system supports responsive design across web and mobile:

```javascript
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { colors, spacing, typography } = useTheme();
  
  return (
    <View style={{ 
      backgroundColor: colors.background,
      padding: spacing.medium
    }}>
      <Text style={{ fontSize: typography.fontSize.medium }}>
        Styled content
      </Text>
    </View>
  );
}
```

## 🧪 Testing

Run tests with:

```bash
npm test
```

## 📱 Deployment

### Web Deployment

```bash
# Build for web
npm run build:web

# Deploy to Firebase Hosting
npm run deploy:web
```

### Mobile Deployment

Follow the Expo build process:

```bash
# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## 🔧 Developer Features

### Demo Mode / Development Mode

The template includes several developer-friendly features:

1. **Firebase Demo Mode**: The app works even without Firebase configured, using mock services.

2. **Login Bypass Button**: On the login screen, you'll find a developer option to bypass authentication.
   - This lets you explore the full app without setting up Firebase
   - Perfect for new developers onboarding to the project
   - Shows different text based on whether Firebase is configured

3. **Environment Detection**: The app automatically detects when it's running in development mode.

These features make it easy for new team members to start working with the codebase immediately.

## ❓ Troubleshooting

### Firebase API Key Error

The template is designed to work immediately, even without Firebase configuration. When starting a new project:

1. **Demo Mode**: The app will start in demo mode if Firebase is not configured, showing a helpful message in the console.
2. **No Errors**: You won't see Firebase initialization errors even without credentials.
3. **How It Works**: The template uses placeholder implementations when Firebase credentials are missing.

To fully enable Firebase features:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Get your Firebase configuration (API keys, etc.)
3. Copy `.env.example` to `.env` and update with your Firebase credentials
4. Restart your Expo development server with `npm start --clear-cache`

The app will automatically detect your credentials and switch from demo mode to fully-functional Firebase mode.

## 📄 License

MIT 
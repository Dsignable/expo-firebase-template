# Standard Operating Procedure (SOP)

## Project Development Workflow

This document outlines our standard procedures for creating, developing, and maintaining Expo + Firebase applications.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Initialization](#project-initialization)
3. [Code Organization & Styling](#code-organization--styling)
4. [Firebase Integration](#firebase-integration)
5. [Version Control Guidelines](#version-control-guidelines)
6. [Testing Procedures](#testing-procedures)
7. [Deployment Process](#deployment-process)
8. [Troubleshooting Common Issues](#troubleshooting-common-issues)
9. [Developer Tools & Features](#developer-tools--features)

---

## Development Environment Setup

### Required Software

- Node.js (LTS version)
- npm or Yarn
- Git
- Expo CLI (`npm install -g expo-cli`)
- Firebase CLI (`npm install -g firebase-tools`)
- Code editor (recommended: VS Code)
- iOS Simulator (Mac only) and/or Android Emulator

### VS Code Extensions

- ESLint
- Prettier
- React Native Tools
- Firebase Explorer

### Environment Configuration

1. Create a `.env.local` file based on the `.env.example` template
2. Configure environment variables for:
   - Firebase credentials
   - API keys
   - Environment flags

## Project Initialization

### Starting a New Project

There are multiple ways to start a new project:

#### Option 1: Using GitHub Web Interface

1. Visit [GitHub](https://github.com/dsignable/expo-firebase-template)
2. Click "Use this template" to create a new repository based on this template
3. Clone the new repository:
   ```bash
   git clone https://github.com/yourusername/my-new-project.git
   cd my-new-project
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

#### Option 2: Using GitHub CLI (Recommended)

1. Install GitHub CLI if not already installed:
   - macOS: `brew install gh`
   - Windows: `winget install GitHub.cli`
   - Linux: See the [GitHub CLI installation guide](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)

2. Authenticate with GitHub:
   ```bash
   gh auth login
   ```

3. Create a new repository from the template:
   ```bash
   gh repo create my-new-project --template dsignable/expo-firebase-template --public
   ```

4. Clone and set up the new repository:
   ```bash
   git clone https://github.com/yourusername/my-new-project.git
   cd my-new-project
   npm install
   ```

#### Option 3: Direct Clone

1. Clone the template repository:
   ```bash
   git clone https://github.com/dsignable/expo-firebase-template.git my-new-project
   cd my-new-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project in the Firebase Console
   - Set up Authentication, Firestore, and any other necessary services
   - Copy Firebase config to `.env.local`

4. Update project information:
   - Edit `app.json` with your app info
   - Update README.md with project-specific details
   - Configure `eas.json` for deployment settings

5. Initialize version control:
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit from template"
   ```

6. Create a new repository on GitHub and push:
   ```bash
   gh repo create my-new-project --public
   git remote add origin https://github.com/yourusername/my-new-project.git
   git push -u origin main
   ```

## Code Organization & Styling

### Folder Structure

Follow the established folder structure (see README.md).

### Naming Conventions

- **Components**: PascalCase (e.g., `LoginButton.js`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuthentication.js`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Screens**: PascalCase with 'Screen' suffix (e.g., `HomeScreen.js`)

### Component Development

1. Generic components go in `src/components/common/`
2. Layout components go in `src/components/layout/`
3. Feature-specific components go in `src/components/specific/`
4. Each component should:
   - Be focused on a single responsibility
   - Have props validation (PropTypes or TypeScript)
   - Use the theme system for styling
   - Be responsive for both web and mobile

### Styling Guidelines

1. Use the theme system for all styling
2. Avoid inline styles except for dynamic values
3. Ensure responsive design works on all target platforms
4. Follow accessibility best practices

## Firebase Integration

### Authentication

1. Always use the auth service methods from `src/services/firebase/auth.js`
2. Implement proper error handling for auth operations
3. Use the auth context for managing user state

### Firestore Database

1. Define data models in `src/types/`
2. Use the database service methods from `src/services/firebase/db.js`
3. Implement data validation before writing to database
4. Optimize queries with proper indexing

### Security Rules

1. Document all Firestore security rules in `firestore.rules`
2. Test security rules before deploying
3. Follow principle of least privilege

## Version Control Guidelines

### Branching Strategy

1. `main`: Production-ready code
2. `develop`: Integration branch for features
3. Feature branches: Named as `feature/feature-name`
4. Bugfix branches: Named as `bugfix/bug-description`

### Commit Guidelines

1. Use descriptive commit messages
2. Follow conventional commits format:
   ```
   type(scope): description
   
   [optional body]
   ```
   
   Types: feat, fix, docs, style, refactor, test, chore

### Pull Request Process

1. Create PR from feature branch to develop
2. Ensure tests pass
3. Request code review from at least one team member
4. Address review comments
5. Merge only when approved

## Testing Procedures

### Unit Testing

1. Write unit tests for utilities and services
2. Test components with React Testing Library
3. Aim for at least 70% code coverage

### Integration Testing

1. Test critical user flows
2. Verify Firebase integration works correctly

### Manual Testing

1. Test on all target platforms (web, iOS, Android)
2. Test with different screen sizes
3. Verify responsive design

## Deployment Process

### Web Deployment

1. Build for web:
   ```bash
   npm run build:web
   ```

2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```

### Mobile Deployment

1. Configure app.json and eas.json
2. Update version numbers
3. Build for stores:
   ```bash
   eas build --platform ios
   eas build --platform android
   ```
4. Submit to app stores:
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

## Troubleshooting Common Issues

### Firebase Configuration Issues

#### Demo Mode and Firebase Configuration

The template is designed to work in two modes:

1. **Demo Mode** (Default): When Firebase credentials are not configured, the app operates in demo mode:
   - No Firebase-related errors appear in the console
   - A friendly message appears in the console explaining the situation
   - Placeholder Firebase services are provided that safely handle method calls
   - UI can be developed without Firebase backend

2. **Production Mode**: When Firebase credentials are properly configured in the `.env` file:
   - Firebase services are fully initialized
   - All Firebase features work as expected
   - A success message appears in the console confirming Firebase initialization

**How the Template Handles Missing Firebase Configuration**:

1. The `src/services/firebase/config.js` file checks for valid Firebase credentials
2. If credentials are missing or invalid, it provides placeholder implementations
3. These placeholders prevent errors from crashing the application
4. All Firebase service methods are safely mocked to return appropriate responses

**For Team Onboarding**:

1. Inform new team members that they can start development immediately without Firebase setup
2. Provide the `.env` file with Firebase credentials when they need to work with actual data
3. Explain the console messages they might see regarding demo mode
4. Point out the "Developer Options" section on the login screen that allows bypassing auth

**Implementation Details**:

The Firebase configuration check uses the `isFirebaseConfigured` function which:
- Verifies the API key is present
- Confirms it's not the placeholder value from the example file
- Handles any potential errors in configuration

#### Configuring Firebase

When ready to use actual Firebase services:

1. Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/)
2. Obtain your Firebase configuration:
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Click on the web app (or create one if none exists)
   - Copy the Firebase configuration object
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
4. Edit the `.env` file with your Firebase credentials:
   ```
   FIREBASE_API_KEY=your_api_key_here
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```
5. Restart the Expo development server with cache clearing:
   ```bash
   npm start -- --clear-cache
   ```

### Expo Build Issues

1. Clear cache: `expo start -c`
2. Verify Node.js version compatibility
3. Check eas.json configuration

### Firebase Connection Issues

1. Verify Firebase config in .env file
2. Check security rules
3. Test connection with Firebase Console

### Web-Specific Issues

1. Check webpack config
2. Verify web-compatible libraries
3. Test with different browsers

## Developer Tools & Features

### Developer Bypass Login

The template includes a developer bypass feature to make it easier for new team members to explore the app without Firebase configuration.

#### How to Use Developer Mode

1. On the login screen, scroll to the "Developer Options" section
2. Click the "Bypass Login (Dev Mode)" or "Skip Login (Demo Mode)" button
3. This creates a mock user with the following properties:
   ```js
   {
     uid: 'dev-user-id',
     email: 'dev@example.com',
     displayName: 'Dev User',
     isDev: true
   }
   ```
4. You'll be logged in and can explore the full app

#### Implementation Details

The developer bypass is implemented in two parts:

1. **AuthContext.js**: Contains a `setDevUser` function that creates a mock user
   ```js
   const setDevUser = (userData = {}) => {
     const devUser = {
       uid: 'dev-user-id',
       email: 'dev@example.com',
       displayName: 'Dev User',
       ...userData,
       isDev: true
     };
     
     setUser(devUser);
   };
   ```

2. **LoginScreen.js**: Contains a button that calls `setDevUser` when pressed
   ```js
   <TouchableOpacity 
     style={[styles.button, styles.devButton]}
     onPress={handleDevBypass}
   >
     <Text style={styles.buttonText}>
       {isFirebaseConfigured ? 'Bypass Login (Dev Mode)' : 'Skip Login (Demo Mode)'}
     </Text>
   </TouchableOpacity>
   ```

#### Best Practices for Development Mode

1. **Always Remove in Production**: Make sure to disable or remove the dev bypass option in production builds
2. **Testing with Real Users**: Use real Firebase authentication for testing user-specific functionality
3. **Mock Data**: When using bypass login, you may need to create mock data for testing

#### Customizing the Developer Bypass

You can customize the developer user profile by modifying the call to setDevUser:

```js
// In LoginScreen.js
const handleDevBypass = () => {
  setDevUser({
    displayName: 'Custom Name',
    email: 'custom@example.com',
    // Add any properties your app needs
    role: 'admin',
    permissions: ['read', 'write'],
  });
};
``` 
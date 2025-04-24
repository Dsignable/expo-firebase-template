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

1. Clone the template repository:
   ```bash
   git clone https://github.com/yourusername/expo-firebase-template.git my-new-project
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
   git init
   git add .
   git commit -m "Initial commit from template"
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
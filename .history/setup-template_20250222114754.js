const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

const filesToDelete = [
    'App.test.js',
    'babel.config.js'  // We'll create our own with custom configs
];

const foldersToCreate = [
    'src/components',
    'src/screens',     // More Expo-appropriate than 'pages'
    'src/navigation',  // For React Navigation
    'src/hooks',       // Custom hooks
    'src/utils',
    'src/services',    // API calls, device storage, etc.
    'src/constants',   // Theme, colors, sizes, etc.
    'src/assets',
    'src/context'      // For React Context if needed
];

const commonDependencies = [
    '@react-navigation/native',
    '@react-navigation/native-stack',
    'axios',
    'react-native-safe-area-context',
    'react-native-screens',
    '@react-native-async-storage/async-storage',
    'react-native-dotenv'
];

const devDependencies = [
    'eslint',
    'prettier'
];

const babelConfig = `module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blacklist": null,
        "whitelist": null,
        "safe": false,
        "allowUndefined": true
      }]
    ]
  };
};`;

const appJs = `import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}`;

const navigationIndex = `import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}`;

const homeScreen = `import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome to your new app!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
});`;

const themeConstants = `export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#808080',
  lightGray: '#D3D3D3',
  error: '#FF3B30',
  success: '#34C759',
};

export const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
};

export const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};`;

const appContext = `import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, setState] = useState({
    // Add your global state here
  });

  const value = {
    state,
    setState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}`;

const responsiveHook = `/* content of useResponsive.js */`;
const stylesHook = `/* content of useStyles.js */`;
const enhancedTheme = `/* content of enhanced theme.js */`;

async function copyDirectory(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDirectory(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
}

async function setupTemplate() {
    const currentDir = process.cwd();
    const projectName = path.basename(currentDir);
    const templateDir = path.join(path.dirname(currentDir), `${projectName}-template`);
    const logFile = path.join(currentDir, 'template-setup-log.txt');
    const logs = ['Template Setup Log\n==================\n'];

    try {
        // Step 1: Create template backup first
        logs.push('\n📁 Step 1: Creating template backup...');
        await copyDirectory(currentDir, templateDir);
        logs.push(`✅ Template saved at: ${templateDir}`);
        logs.push('This template can be used for future projects\n');

        // Step 2: Set up working project
        logs.push('🚀 Step 2: Setting up your working project...');
        
        // Delete unnecessary files
        for (const file of filesToDelete) {
            try {
                await fs.unlink(file);
                logs.push(`✅ Deleted: ${file}`);
            } catch (err) {
                logs.push(`⚠️ File not found (skipping): ${file}`);
            }
        }

        // Create new folders
        for (const folder of foldersToCreate) {
            try {
                await fs.mkdir(folder, { recursive: true });
                logs.push(`✅ Created folder: ${folder}`);
            } catch (err) {
                logs.push(`❌ Failed to create folder: ${folder}`);
                throw err;
            }
        }

        // Update App.js
        await fs.writeFile('src/App.js', appJs);
        logs.push('✅ Updated App.js');

        // Update babel.config.js
        await fs.writeFile('babel.config.js', babelConfig);
        logs.push('✅ Updated babel.config.js');

        // Install additional dependencies
        logs.push('\nInstalling dependencies...');
        try {
            execSync(`npm install ${commonDependencies.join(' ')} ${devDependencies.join(' ')}`, { stdio: 'inherit' });
            logs.push('✅ Installed additional dependencies');
        } catch (err) {
            logs.push('❌ Failed to install dependencies');
            throw err;
        }

        // Update responsive hook
        await fs.writeFile('src/hooks/useResponsive.js', responsiveHook);
        logs.push('✅ Updated useResponsive.js');

        // Update styles hook
        await fs.writeFile('src/hooks/useStyles.js', stylesHook);
        logs.push('✅ Updated useStyles.js');

        // Update theme
        await fs.writeFile('src/constants/theme.js', enhancedTheme);
        logs.push('✅ Updated theme.js');

        logs.push('\n✨ Setup Complete!');
        logs.push('-------------------');
        logs.push(`Template location: ${templateDir}`);
        logs.push(`Working project: ${currentDir}`);
        logs.push('\nNext steps:');
        logs.push('1. cd into your project: cd ' + projectName);
        logs.push('2. Start development: expo start');
        
        // Write the log file
        await fs.writeFile(logFile, logs.join('\n'));

        // Delete this script
        await fs.unlink(__filename);

    } catch (error) {
        logs.push('\n❌ Setup failed with error:');
        logs.push(error.message);
        logs.push('\nTo retry:');
        logs.push('1. Check the errors above');
        logs.push('2. Run: node setup-template.js');
        
        await fs.writeFile(logFile, logs.join('\n'));
    }
}

setupTemplate(); 
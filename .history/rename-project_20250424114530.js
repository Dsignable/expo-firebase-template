#!/usr/bin/env node

/**
 * Script to rename the Expo Firebase template to a custom project name
 * Run with: node rename-project.js "Your Project Name"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get project name from command line arguments or prompt
const args = process.argv.slice(2);
let newProjectName = args[0];

function kebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
}

function updatePackageJson(projectName) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  packageJson.name = kebabCase(projectName);
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Updated package.json');
}

function updateAppJson(projectName) {
  const appJsonPath = path.join(process.cwd(), 'app.json');
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  
  appJson.expo.name = projectName;
  appJson.expo.slug = kebabCase(projectName);
  
  fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  console.log('✅ Updated app.json');
}

function updateReadme(projectName) {
  const readmePath = path.join(process.cwd(), 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');
  
  // Replace title
  readme = readme.replace(/^# Expo \+ Firebase Project Template/, `# ${projectName}`);
  
  // Update first paragraph
  readme = readme.replace(
    /A comprehensive template for quickly setting up professional React Native web\/mobile applications using Expo and Firebase\./,
    `A professional React Native web/mobile application built with Expo and Firebase.`
  );
  
  fs.writeFileSync(readmePath, readme);
  console.log('✅ Updated README.md');
}

function resetGitRepo() {
  try {
    console.log('📁 Resetting Git repository...');
    execSync('rm -rf .git');
    execSync('git init');
    console.log('✅ Git repository reset');
  } catch (error) {
    console.error('❌ Error resetting Git repository:', error.message);
  }
}

function createEnvFile() {
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envPath = path.join(process.cwd(), '.env');
  
  if (!fs.existsSync(envPath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from .env.example');
  }
}

function renameProject(projectName) {
  if (!projectName) {
    console.error('❌ Please provide a project name');
    process.exit(1);
  }
  
  console.log(`🚀 Renaming project to "${projectName}"...`);
  
  // Update files
  updatePackageJson(projectName);
  updateAppJson(projectName);
  updateReadme(projectName);
  createEnvFile();
  resetGitRepo();
  
  console.log('\n✨ Project renamed successfully!');
  console.log('\nNext steps:');
  console.log('1. Update Firebase configuration in .env file');
  console.log('2. Replace icon and splash images in the assets folder');
  console.log('3. Customize theme colors in src/constants/theme.js');
  console.log('4. Start development with: npm start');
}

if (newProjectName) {
  renameProject(newProjectName);
  rl.close();
} else {
  rl.question('What is your project name? ', (answer) => {
    renameProject(answer);
    rl.close();
  });
} 
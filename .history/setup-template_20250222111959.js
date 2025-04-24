const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

const filesToDelete = [
    'src/App.test.js',
    'src/logo.svg',
    'src/reportWebVitals.js',
    'src/setupTests.js'
];

const foldersToCreate = [
    'src/components',
    'src/pages',
    'src/styles',
    'src/utils',
    'src/assets'
];

const newAppJs = `import './App.css';

function App() {
  return (
    <div className="App">
      <h1>React Template</h1>
    </div>
  );
}

export default App;
`;

const newAppCss = `/* Add your global styles here */
.App {
  text-align: center;
}
`;

const newIndexJs = `import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`;

async function setupTemplate() {
    const logFile = path.join(process.cwd(), 'template-setup-log.txt');
    const logs = ['Template Setup Log\n==================\n'];

    try {
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
        await fs.writeFile('src/App.js', newAppJs);
        logs.push('✅ Updated App.js');

        // Clear App.css
        await fs.writeFile('src/App.css', newAppCss);
        logs.push('✅ Updated App.css');

        // Update index.js
        await fs.writeFile('src/index.js', newIndexJs);
        logs.push('✅ Updated index.js');

        // Install additional dependencies
        logs.push('\nInstalling dependencies...');
        try {
            execSync('npm install react-router-dom axios sass', { stdio: 'inherit' });
            logs.push('✅ Installed additional dependencies');
        } catch (err) {
            logs.push('❌ Failed to install dependencies');
            throw err;
        }

        logs.push('\n✅ Template setup completed successfully!');
        logs.push('\nYou can now delete this setup script.');
        
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
        
        // Write the log file with error information
        await fs.writeFile(logFile, logs.join('\n'));
    }
}

setupTemplate(); 
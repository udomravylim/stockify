const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Stockify...\n');

// Check if Angular CLI is available
try {
  console.log('📦 Building Angular application...');
  execSync('ng build --configuration development', { 
    stdio: 'inherit',
    cwd: __dirname
  });
  console.log('✅ Angular build completed!\n');
} catch (error) {
  console.log('⚠️  Angular build failed or ng command not found.');
  console.log('   Continuing with Node.js server (will serve public/index.html if Angular not built)...\n');
}

// Start the Node.js server
console.log('🖥️  Starting Node.js server...\n');
require('./server.js');


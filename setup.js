#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up SkyClass Demo...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 14) {
  console.error('❌ Node.js version 14 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Create environment files if they don't exist
const clientEnvPath = path.join(__dirname, 'client', '.env');
const serverEnvPath = path.join(__dirname, 'server', '.env');

if (!fs.existsSync(clientEnvPath)) {
  console.log('📝 Creating client .env file...');
  const clientEnvContent = `# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=skyclass-demo.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=skyclass-demo
REACT_APP_FIREBASE_STORAGE_BUCKET=skyclass-demo.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456
`;
  fs.writeFileSync(clientEnvPath, clientEnvContent);
  console.log('✅ Client .env file created');
}

if (!fs.existsSync(serverEnvPath)) {
  console.log('📝 Creating server .env file...');
  const serverEnvContent = `# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Firebase Configuration
FIREBASE_PROJECT_ID=skyclass-demo
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key here\\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@skyclass-demo.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Cloud Storage
CLOUD_STORAGE_BUCKET=skyclass-demo.appspot.com
`;
  fs.writeFileSync(serverEnvPath, serverEnvContent);
  console.log('✅ Server .env file created');
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Root dependencies installed');
  
  execSync('cd client && npm install', { stdio: 'inherit' });
  console.log('✅ Client dependencies installed');
  
  execSync('cd server && npm install', { stdio: 'inherit' });
  console.log('✅ Server dependencies installed');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Set up a Firebase project at https://console.firebase.google.com');
console.log('2. Update the .env files with your Firebase configuration');
console.log('3. Run "npm run dev" to start the development servers');
console.log('4. Visit http://localhost:3000 to see the application');
console.log('\n📚 Check the README.md for detailed setup instructions');

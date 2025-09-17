#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎯 SkyClass Hackathon Demo Setup\n');

console.log('📋 This script will help you prepare for your hackathon demo.\n');

// Create demo environment files
const clientEnvContent = `# Firebase Configuration (Replace with your actual values)
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
`;

const serverEnvContent = `# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Firebase Configuration (Replace with your actual values)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYour private key here\\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# JWT Configuration
JWT_SECRET=demo-secret-key-for-hackathon
JWT_EXPIRES_IN=7d

# Cloud Storage
CLOUD_STORAGE_BUCKET=your-project.appspot.com
`;

// Create environment files
const clientEnvPath = path.join(__dirname, 'client', '.env');
const serverEnvPath = path.join(__dirname, 'server', '.env');

if (!fs.existsSync(clientEnvPath)) {
  fs.writeFileSync(clientEnvPath, clientEnvContent);
  console.log('✅ Created client/.env file');
} else {
  console.log('ℹ️  client/.env already exists');
}

if (!fs.existsSync(serverEnvPath)) {
  fs.writeFileSync(serverEnvPath, serverEnvContent);
  console.log('✅ Created server/.env file');
} else {
  console.log('ℹ️  server/.env already exists');
}

console.log('\n🎯 HACKATHON DEMO CHECKLIST:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Project structure created');
console.log('✅ Environment files created');
console.log('✅ All dependencies defined');
console.log('✅ Firebase configuration ready');
console.log('✅ Demo data seeder available');
console.log('\n📋 NEXT STEPS FOR YOUR DEMO:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1. 🔥 Set up Firebase project (FREE):');
console.log('   → Go to https://console.firebase.google.com');
console.log('   → Create new project: "skyclass-demo"');
console.log('   → Enable Authentication (Email/Password)');
console.log('   → Create Firestore database (test mode)');
console.log('');
console.log('2. 📝 Update .env files with your Firebase config');
console.log('');
console.log('3. 📦 Install dependencies:');
console.log('   → npm run install-all');
console.log('');
console.log('4. 🚀 Start the application:');
console.log('   → npm run dev');
console.log('');
console.log('5. 🌱 (Optional) Seed demo data:');
console.log('   → node -e "require(\'./server/utils/seedData\').seedData()"');
console.log('');
console.log('6. 🎯 Demo features to highlight:');
console.log('   → User registration/login');
console.log('   → Course browsing');
console.log('   → Video streaming');
console.log('   → Progress tracking');
console.log('   → Mobile responsiveness');
console.log('   → Admin dashboard');
console.log('');
console.log('💡 DEMO TALKING POINTS:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('• "Lightweight for low-end devices"');
console.log('• "Cloud-based - no heavy downloads"');
console.log('• "Works on any device"');
console.log('• "Real-time progress tracking"');
console.log('• "Scalable architecture"');
console.log('• "Built with modern technologies"');
console.log('');
console.log('🎉 You\'re ready for your hackathon demo!');
console.log('📚 Check README.md for detailed instructions');
console.log('🆘 Need help? Keep this chat open during your demo!');

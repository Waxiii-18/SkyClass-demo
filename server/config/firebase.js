const admin = require('firebase-admin');
const path = require('path');

let db, auth;

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(__dirname, 'firebase-service-account.json');
    
    // Check if service account file exists
    const fs = require('fs');
    if (fs.existsSync(serviceAccountPath)) {
      // Use service account file
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        storageBucket: process.env.CLOUD_STORAGE_BUCKET || process.env.FIREBASE_PROJECT_ID + '.appspot.com'
      });
      console.log('✅ Firebase Admin initialized successfully using service account file');
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
      // Use environment variables (for Render deployment)
      admin.initializeApp({
        credential: admin.credential.cert({
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
          token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
        }),
        storageBucket: process.env.CLOUD_STORAGE_BUCKET || process.env.FIREBASE_PROJECT_ID + '.appspot.com'
      });
      console.log('✅ Firebase Admin initialized successfully using environment variables');
    } else {
      console.log('⚠️  Firebase Admin not initialized - missing credentials');
      console.log('📝 The app will run in demo mode without Firebase Admin features');
    }
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
    console.log('📝 The app will run in demo mode without Firebase Admin features');
  }
}

// Initialize services if Firebase is available
if (admin.apps.length > 0) {
  db = admin.firestore();
  auth = admin.auth();
} else {
  // Mock services for demo mode
  db = null;
  auth = null;
  console.log('🔧 Running in demo mode - Firebase Admin services disabled');
}

module.exports = { admin, db, auth };

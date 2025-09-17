# 🔥 Firebase Setup Guide

## Quick Setup for Hackathon

### Step 1: Get Firebase Service Account File

1. **Go to:** [Firebase Console](https://console.firebase.google.com)
2. **Select your project**
3. **Click:** Settings (gear icon) → **Project Settings**
4. **Click:** **Service Accounts** tab
5. **Click:** **Generate new private key**
6. **Download** the JSON file

### Step 2: Place the Service Account File

1. **Rename** the downloaded file to: `firebase-service-account.json`
2. **Move it** to: `server/config/firebase-service-account.json`
3. **Replace** the placeholder values in the file with your actual Firebase project details

### Step 3: Update Your Server .env File

**Replace your server `.env` content with:**

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# JWT Configuration
JWT_SECRET=demo-secret-key-for-hackathon
JWT_EXPIRES_IN=7d

# Cloud Storage (Optional - auto-detected from service account)
CLOUD_STORAGE_BUCKET=your-project.appspot.com
```

### Step 4: Start the Application

```bash
npm run dev
```

## 📁 File Structure

```
server/
├── config/
│   ├── firebase.js ✅ (Updated to use service account file)
│   └── firebase-service-account.json ✅ (Your Firebase credentials)
└── .env ✅ (Simplified - no Firebase credentials)
```

## 🔒 Security Benefits

- ✅ Firebase credentials are in a separate file
- ✅ Service account file is gitignored (won't be committed)
- ✅ Cleaner .env file
- ✅ Better organization

## 🎯 What Happens Now

1. **Firebase Admin** will automatically use the service account file
2. **No more environment variable issues**
3. **Cleaner configuration**
4. **Better security**

## 🆘 Troubleshooting

**If you still get errors:**
1. Make sure `firebase-service-account.json` is in `server/config/` folder
2. Check that the JSON file has valid Firebase credentials
3. Restart your server: `npm run dev`

**The app will run in demo mode if Firebase Admin fails to initialize.**

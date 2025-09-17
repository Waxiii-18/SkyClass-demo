# 🌐 SkyClass Hosting Guide

## Quick Hosting Options for Hackathon

### Option 1: Vercel (Recommended - FREE & Easy)

**Perfect for React apps with backend APIs**

1. **Go to:** https://vercel.com
2. **Sign up** with your GitHub account
3. **Click** "New Project"
4. **Import** your `skyclass-demo` repository
5. **Configure settings:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

**Environment Variables to add in Vercel:**
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### Option 2: Netlify (FREE & Simple)

**Great for frontend hosting**

1. **Go to:** https://netlify.com
2. **Sign up** with GitHub
3. **Click** "New site from Git"
4. **Connect** your repository
5. **Build settings:**
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/build`

### Option 3: Railway (FREE for Backend)

**Excellent for Node.js backends**

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click** "New Project"
4. **Deploy from GitHub repo**
5. **Select** your repository
6. **Railway auto-detects** Node.js

### Option 4: Render (FREE Tier)

**Good for both frontend and backend**

1. **Go to:** https://render.com
2. **Sign up** with GitHub
3. **Create** Web Service
4. **Connect** your repository

## 🚀 Quick Setup Steps

### Step 1: Push Your Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Choose Your Hosting Platform

**For Hackathon Demo, I recommend:**

1. **Frontend:** Netlify (easiest)
2. **Backend:** Railway (free Node.js hosting)

### Step 3: Deploy Frontend (Netlify)

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your repository
5. Configure:
   - **Base directory:** `client`
   - **Build command:** `npm run build`
   - **Publish directory:** `client/build`
6. Add environment variables (your Firebase config)
7. Deploy!

### Step 4: Deploy Backend (Railway)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Railway will auto-detect it's a Node.js app
7. Add environment variables
8. Deploy!

## 🔧 Environment Variables Setup

### Frontend (Netlify/Vercel)
```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

### Backend (Railway/Render)
```
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.netlify.app
FIREBASE_PROJECT_ID=your-project-id
JWT_SECRET=your-production-secret
CLOUD_STORAGE_BUCKET=your-project.appspot.com
```

## 📱 Demo URLs

After deployment, you'll get:
- **Frontend:** `https://your-app-name.netlify.app`
- **Backend:** `https://your-app-name.railway.app`

## 🎯 Hackathon Demo Script

> "Here's our live SkyClass platform:
> - Frontend: [Your Netlify URL]
> - Built with React and optimized for low-end devices
> - Cloud-based architecture with Firebase
> - Real-time progress tracking
> - Mobile-responsive design
> - Ready for production deployment"

## 🆘 Troubleshooting

### Build Errors:
- Make sure all dependencies are in package.json
- Check that build commands are correct
- Verify environment variables are set

### CORS Issues:
- Update CLIENT_URL in backend environment variables
- Make sure frontend URL is correct

### Firebase Issues:
- Verify Firebase project is set up correctly
- Check that all Firebase services are enabled
- Ensure environment variables match your Firebase config

## 🏆 Pro Tips for Hackathon

1. **Use Netlify for frontend** - fastest deployment
2. **Use Railway for backend** - free Node.js hosting
3. **Test locally first** with `npm run dev`
4. **Have backup demo videos** ready
5. **Keep this chat open** for quick fixes during demo

Your project will be live and accessible to judges within minutes!

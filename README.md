# SkyClass - Lightweight Educational Platform

SkyClass is a modern, cloud-based educational platform designed specifically for students with low-end devices. Our solution uses cloud storage and optimized streaming to ensure smooth learning experiences regardless of device capabilities.

## 🌟 Features

### For Students
- **Cloud-Based Learning**: Access courses from anywhere without heavy downloads
- **Low-End Device Optimized**: Lightweight interface that works on older devices
- **Offline Capability**: Download content for offline learning
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Achievement System**: Earn badges and certificates as you progress

### For Instructors
- **Course Creation**: Easy-to-use course builder with multimedia support
- **Student Analytics**: Track student progress and engagement
- **Content Management**: Upload videos, PDFs, and other educational materials
- **Discussion Forums**: Foster student-instructor interaction

### For Administrators
- **User Management**: Comprehensive admin dashboard
- **Analytics & Reporting**: Detailed insights into platform usage
- **Content Moderation**: Manage courses and user-generated content
- **Revenue Tracking**: Monitor platform growth and earnings

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern, responsive user interface
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Client-side routing
- **Firebase SDK** - Authentication and real-time data
- **React Player** - Video streaming capabilities
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Firebase Admin SDK** - Server-side Firebase integration
- **Firestore** - NoSQL cloud database
- **Cloud Storage** - File storage for videos and documents
- **JWT** - Secure authentication tokens

### Cloud Services
- **Firebase Authentication** - User management and authentication
- **Firebase Firestore** - Real-time database
- **Firebase Cloud Storage** - File storage and CDN
- **Google Cloud Platform** - Infrastructure and services

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase project setup
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/skyclass-demo.git
   cd skyclass-demo
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Set up Cloud Storage
   - Download your Firebase config

4. **Configure Environment Variables**
   
   **Client (.env in client folder):**
   ```env
   REACT_APP_FIREBASE_API_KEY=your-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your-project-id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   REACT_APP_FIREBASE_APP_ID=your-app-id
   ```
   
   **Server (.env in server folder):**
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY_ID=your-private-key-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key\n-----END PRIVATE KEY-----"
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
   FIREBASE_CLIENT_ID=your-client-id
   JWT_SECRET=your-super-secret-jwt-key
   ```

5. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both the client (http://localhost:3000) and server (http://localhost:5000) concurrently.

## 📱 Platform Features

### Responsive Design
- Mobile-first approach
- Optimized for tablets and smartphones
- Touch-friendly interface
- Adaptive layouts for different screen sizes

### Performance Optimization
- Lazy loading of content
- Image optimization and compression
- Minimal bundle sizes
- Efficient caching strategies

### Accessibility
- WCAG 2.1 compliant
- Screen reader support
- Keyboard navigation
- High contrast mode support

## 🏗️ Project Structure

```
skyclass-demo/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── firebase/      # Firebase configuration
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/           # Server utilities
│   └── package.json
├── package.json          # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses/:id/enroll` - Enroll in course
- `PUT /api/courses/:courseId/lessons/:lessonId/progress` - Update lesson progress

### Users
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/activity` - Get user activity
- `GET /api/users/achievements` - Get user achievements

### Admin
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/courses` - Get all courses
- `POST /api/admin/courses` - Create new course

## 🎨 UI Components

### Design System
- Consistent color palette
- Typography scale
- Spacing system
- Component library

### Key Components
- **Navbar** - Navigation with user authentication
- **CourseCard** - Course display component
- **VideoPlayer** - Optimized video streaming
- **ProgressBar** - Learning progress visualization
- **Dashboard** - User dashboard with analytics

## 🔒 Security Features

- Firebase Authentication integration
- JWT token-based authorization
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers

## 📊 Analytics & Monitoring

- User engagement tracking
- Course completion rates
- Performance metrics
- Error logging and monitoring
- Real-time usage statistics

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the client: `npm run build`
2. Deploy to your preferred platform
3. Set environment variables in platform settings

### Backend (Heroku/Railway/DigitalOcean)
1. Set up your server environment
2. Configure environment variables
3. Deploy using Git integration

### Firebase Setup
1. Configure Firebase hosting
2. Set up Cloud Functions (if needed)
3. Configure security rules for Firestore and Storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: support@skyclass.com
- Documentation: [docs.skyclass.com](https://docs.skyclass.com)

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic course management
- ✅ User authentication
- ✅ Video streaming
- ✅ Progress tracking

### Phase 2 (Next)
- 🔄 Live streaming capabilities
- 🔄 Advanced analytics
- 🔄 Mobile app (React Native)
- 🔄 AI-powered recommendations

### Phase 3 (Future)
- 📋 VR/AR integration
- 📋 Blockchain certificates
- 📋 Multi-language support
- 📋 Advanced collaboration tools

---

Built with ❤️ for students everywhere. Making quality education accessible to all.

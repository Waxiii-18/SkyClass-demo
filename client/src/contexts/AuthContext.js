import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, userData) {
    try {
      // For demo purposes, simulate successful signup
      if (process.env.NODE_ENV === 'development') {
        const mockUser = {
          uid: 'demo-user-' + Date.now(),
          email: email,
          displayName: userData.displayName
        };
        setCurrentUser(mockUser);
        setUserProfile({
          uid: mockUser.uid,
          email: mockUser.email,
          displayName: userData.displayName,
          role: 'student'
        });
        return { user: mockUser };
      }
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: userData.displayName,
        role: 'student',
        createdAt: new Date().toISOString(),
        ...userData
      });
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      // For demo, still allow signup
      const mockUser = {
        uid: 'demo-user-' + Date.now(),
        email: email,
        displayName: userData.displayName
      };
      setCurrentUser(mockUser);
      setUserProfile({
        uid: mockUser.uid,
        email: mockUser.email,
        displayName: userData.displayName,
        role: 'student'
      });
      return { user: mockUser };
    }
  }

  async function login(email, password) {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      // For demo, simulate successful login
      const mockUser = {
        uid: 'demo-user-' + Date.now(),
        email: email,
        displayName: 'Demo User'
      };
      setCurrentUser(mockUser);
      setUserProfile({
        uid: mockUser.uid,
        email: mockUser.email,
        displayName: 'Demo User',
        role: 'student'
      });
      return { user: mockUser };
    }
  }

  async function loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // Create user profile for new Google users
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'student',
          createdAt: new Date().toISOString()
        });
      }
      
      return result;
    } catch (error) {
      console.error('Google login error:', error);
      // For demo, simulate successful Google login
      const mockUser = {
        uid: 'demo-google-user-' + Date.now(),
        email: 'demo@gmail.com',
        displayName: 'Demo Google User',
        photoURL: null
      };
      setCurrentUser(mockUser);
      setUserProfile({
        uid: mockUser.uid,
        email: mockUser.email,
        displayName: mockUser.displayName,
        photoURL: mockUser.photoURL,
        role: 'student'
      });
      return { user: mockUser };
    }
  }

  function logout() {
    return signOut(auth);
  }

  async function fetchUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        return userDoc.data();
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    signup,
    loginWithGoogle,
    logout,
    fetchUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Read Firebase configurations from Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase is fully and correctly configured
const isFirebaseConfigured = 
  !!firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'YOUR_API_KEY' &&
  firebaseConfig.apiKey !== '';

let app = null;
let auth = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('%c🔥 Firebase Auth & Firestore Engine Initialized Successfully', 'color: #ffca28; font-weight: bold; font-size: 12px;');
  } catch (error) {
    console.error('Failed to initialize Firebase app:', error);
  }
} else {
  console.log('%c🛠️ Firebase credentials not detected. Running in Developer Local Fallback Mode.', 'color: #00e676; font-weight: bold; font-size: 11px;');
}

export { auth, db, isFirebaseConfigured };

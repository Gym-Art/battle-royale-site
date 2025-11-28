import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let firestore: Firestore | undefined;
let storage: FirebaseStorage | undefined;

function initializeFirebase() {
  if (typeof window === 'undefined') {
    return;
  }

  if (!app) {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0]!;
    }
    auth = getAuth(app);
    firestore = getFirestore(app);
    storage = getStorage(app);
  }
}

// Initialize on client side
if (typeof window !== 'undefined') {
  initializeFirebase();
}

// Export getters that initialize if needed
export function getFirebaseApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client SDK should only be used on the client side');
  }
  if (!app) {
    initializeFirebase();
  }
  return app!;
}

export function getFirebaseAuth(): Auth {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client SDK should only be used on the client side');
  }
  if (!auth) {
    initializeFirebase();
  }
  return auth!;
}

export function getFirebaseFirestore(): Firestore {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client SDK should only be used on the client side');
  }
  if (!firestore) {
    initializeFirebase();
  }
  return firestore!;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (typeof window === 'undefined') {
    throw new Error('Firebase client SDK should only be used on the client side');
  }
  if (!storage) {
    initializeFirebase();
  }
  return storage!;
}

// Export direct access (will be undefined on server, but that's OK for client components)
export { app, auth, firestore, storage };


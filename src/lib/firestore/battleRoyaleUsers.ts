import { getFirebaseFirestore } from '@/lib/firebase/client';
import type { BattleRoyaleUserProfile } from '@/types/battleRoyaleUser';
import { User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

const USER_PREFIX = 'USER_';
const COLLECTION_NAME = 'gym_art_users';

/**
 * Get the user document ID from Firebase UID
 */
export function getUserDocumentId(uid: string): string {
  return `${USER_PREFIX}${uid}`;
}

/**
 * Get user profile from Firestore
 */
export async function getBattleRoyaleUserProfile(
  uid: string
): Promise<BattleRoyaleUserProfile | null> {
  try {
    const firestore = getFirebaseFirestore();
    const docId = getUserDocumentId(uid);
    const userRef = doc(firestore, COLLECTION_NAME, docId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return null;
    }

    const data = userSnap.data();
    return {
      id: data.id || docId,
      email: data.email || '',
      displayName: data.displayName || null,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

/**
 * Create or update user profile in Firestore
 * Matches Gym Art Meets autoSignIn pattern
 */
export async function createOrUpdateBattleRoyaleUserProfile(
  firebaseUser: User
): Promise<BattleRoyaleUserProfile> {
  const firestore = getFirebaseFirestore();
  const docId = getUserDocumentId(firebaseUser.uid);
  const userRef = doc(firestore, COLLECTION_NAME, docId);
  const userSnap = await getDoc(userRef);

  const now = Date.now();
  const userData: Omit<BattleRoyaleUserProfile, 'id'> = {
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || null,
    createdAt: userSnap.exists() ? (userSnap.data().createdAt?.toMillis() || now) : now,
    updatedAt: now,
  };

  if (!userSnap.exists()) {
    // Create new user profile
    await setDoc(userRef, {
      id: docId,
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // Update existing profile if needed
    const existingData = userSnap.data();
    const needsUpdate =
      (!existingData.displayName && firebaseUser.displayName) ||
      (!existingData.email && firebaseUser.email) ||
      !existingData.id;

    if (needsUpdate) {
      await setDoc(
        userRef,
        {
          id: docId,
          displayName: firebaseUser.displayName || existingData.displayName || null,
          email: firebaseUser.email || existingData.email || '',
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  }

  return {
    id: docId,
    ...userData,
  };
}

/**
 * Auto-sign in pattern: check if user exists, create if not
 * Similar to Gym Art Meets autoSignIn() method
 */
export async function autoSignInBattleRoyaleUser(
  firebaseUser: User | null
): Promise<BattleRoyaleUserProfile | null> {
  if (!firebaseUser) {
    return null;
  }

  try {
    let userProfile = await getBattleRoyaleUserProfile(firebaseUser.uid);

    if (!userProfile) {
      // User doesn't exist, create profile
      userProfile = await createOrUpdateBattleRoyaleUserProfile(firebaseUser);
    } else {
      // User exists, update if needed
      userProfile = await createOrUpdateBattleRoyaleUserProfile(firebaseUser);
    }

    return userProfile;
  } catch (error) {
    console.error('Error in autoSignInBattleRoyaleUser:', error);
    return null;
  }
}


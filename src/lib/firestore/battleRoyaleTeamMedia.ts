import { getFirebaseFirestore } from '@/lib/firebase/client';
import type { BattleRoyaleTeamMedia } from '@/types/battleRoyaleTeamMedia';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    Unsubscribe,
    updateDoc,
    where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'battleRoyaleTeamMedia';

/**
 * Create a new media item
 */
export async function createBattleRoyaleTeamMedia(
  mediaData: Omit<BattleRoyaleTeamMedia, 'id' | 'createdAt' | 'updatedAt'>
): Promise<BattleRoyaleTeamMedia> {
  const firestore = getFirebaseFirestore();
  const mediaRef = collection(firestore, COLLECTION_NAME);
  const newMediaRef = doc(mediaRef);

  const now = Date.now();
  const media: BattleRoyaleTeamMedia = {
    id: newMediaRef.id,
    ...mediaData,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(newMediaRef, {
    ...media,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return media;
}

/**
 * Get a media item by ID
 */
export async function getBattleRoyaleTeamMedia(
  mediaId: string
): Promise<BattleRoyaleTeamMedia | null> {
  try {
    const firestore = getFirebaseFirestore();
    const mediaRef = doc(firestore, COLLECTION_NAME, mediaId);
    const mediaSnap = await getDoc(mediaRef);

    if (!mediaSnap.exists()) {
      return null;
    }

    const data = mediaSnap.data();
    return {
      id: mediaSnap.id,
      teamId: data.teamId,
      uploaderUserId: data.uploaderUserId,
      type: data.type,
      title: data.title,
      description: data.description || null,
      url: data.url || null,
      content: data.content || null,
      position: data.position || null,
      width: data.width || null,
      height: data.height || null,
      attachedToMediaId: data.attachedToMediaId || null,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    };
  } catch (error) {
    console.error('Error getting media item:', error);
    return null;
  }
}

/**
 * Get all media items for a team
 */
export async function getBattleRoyaleTeamMediaByTeamId(
  teamId: string
): Promise<BattleRoyaleTeamMedia[]> {
  try {
    const firestore = getFirebaseFirestore();
    const mediaRef = collection(firestore, COLLECTION_NAME);
    const q = query(
      mediaRef,
      where('teamId', '==', teamId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        teamId: data.teamId,
        uploaderUserId: data.uploaderUserId,
        type: data.type,
        title: data.title,
        description: data.description || null,
        url: data.url || null,
        content: data.content || null,
        position: data.position || null,
        width: data.width || null,
        height: data.height || null,
        attachedToMediaId: data.attachedToMediaId || null,
        createdAt: data.createdAt?.toMillis() || Date.now(),
        updatedAt: data.updatedAt?.toMillis() || Date.now(),
      };
    });
  } catch (error) {
    console.error('Error getting media items:', error);
    return [];
  }
}

/**
 * Subscribe to real-time updates for media items in a team
 * @param teamId - The team ID
 * @param callback - Callback function that receives the updated media items array
 * @returns Unsubscribe function
 */
export function subscribeToBattleRoyaleTeamMedia(
  teamId: string,
  callback: (mediaItems: BattleRoyaleTeamMedia[]) => void
): Unsubscribe {
  const firestore = getFirebaseFirestore();
  const mediaRef = collection(firestore, COLLECTION_NAME);
  const q = query(
    mediaRef,
    where('teamId', '==', teamId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(
    q,
    (querySnapshot) => {
      const mediaItems: BattleRoyaleTeamMedia[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          teamId: data.teamId,
          uploaderUserId: data.uploaderUserId,
          type: data.type,
          title: data.title,
          description: data.description || null,
          url: data.url || null,
          content: data.content || null,
          position: data.position || null,
          width: data.width || null,
          height: data.height || null,
          attachedToMediaId: data.attachedToMediaId || null,
          createdAt: data.createdAt?.toMillis() || Date.now(),
          updatedAt: data.updatedAt?.toMillis() || Date.now(),
        };
      });
      callback(mediaItems);
    },
    (error) => {
      console.error('Error in media subscription:', error);
    }
  );
}

/**
 * Update a media item
 */
export async function updateBattleRoyaleTeamMedia(
  mediaId: string,
  updates: Partial<Omit<BattleRoyaleTeamMedia, 'id' | 'teamId' | 'createdAt'>>
): Promise<void> {
  const firestore = getFirebaseFirestore();
  const mediaRef = doc(firestore, COLLECTION_NAME, mediaId);
  await updateDoc(mediaRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a media item
 */
export async function deleteBattleRoyaleTeamMedia(mediaId: string): Promise<void> {
  const firestore = getFirebaseFirestore();
  const mediaRef = doc(firestore, COLLECTION_NAME, mediaId);
  await deleteDoc(mediaRef);
}


import { getFirebaseFirestore } from '@/lib/firebase/client';
import type { BattleRoyaleTeam } from '@/types/battleRoyaleTeam';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'battleRoyaleTeams';

/**
 * Generate a unique slug from team name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

/**
 * Check if slug exists and generate unique one if needed
 */
export async function generateUniqueSlug(baseSlug: string): Promise<string> {
  const firestore = getFirebaseFirestore();
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const teamsRef = collection(firestore, COLLECTION_NAME);
    const q = query(teamsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

/**
 * Create a new BattleRoyale team
 */
export async function createBattleRoyaleTeam(
  teamData: Omit<BattleRoyaleTeam, 'id' | 'createdAt' | 'updatedAt' | 'slug'>
): Promise<BattleRoyaleTeam> {
  const firestore = getFirebaseFirestore();
  const baseSlug = generateSlug(teamData.name);
  const uniqueSlug = await generateUniqueSlug(baseSlug);

  const teamsRef = collection(firestore, COLLECTION_NAME);
  const newTeamRef = doc(teamsRef);

  const now = Date.now();
  const team: BattleRoyaleTeam = {
    id: newTeamRef.id,
    slug: uniqueSlug,
    ...teamData,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(newTeamRef, {
    ...team,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return team;
}

/**
 * Get a team by ID
 */
export async function getBattleRoyaleTeam(teamId: string): Promise<BattleRoyaleTeam | null> {
  try {
    const firestore = getFirebaseFirestore();
    const teamRef = doc(firestore, COLLECTION_NAME, teamId);
    const teamSnap = await getDoc(teamRef);

    if (!teamSnap.exists()) {
      return null;
    }

    const data = teamSnap.data();
    return {
      id: teamSnap.id,
      name: data.name,
      slug: data.slug,
      ownerUserId: data.ownerUserId,
      primaryContactEmail: data.primaryContactEmail,
      status: data.status,
      isPublic: data.isPublic,
      brandKit: data.brandKit,
      identity: data.identity,
      completion: data.completion,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    };
  } catch (error) {
    console.error('Error getting team:', error);
    return null;
  }
}

/**
 * Get a team by slug
 */
export async function getBattleRoyaleTeamBySlug(slug: string): Promise<BattleRoyaleTeam | null> {
  try {
    const firestore = getFirebaseFirestore();
    const teamsRef = collection(firestore, COLLECTION_NAME);
    const q = query(teamsRef, where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0]!;
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      slug: data.slug,
      ownerUserId: data.ownerUserId,
      primaryContactEmail: data.primaryContactEmail,
      status: data.status,
      isPublic: data.isPublic,
      brandKit: data.brandKit,
      identity: data.identity,
      completion: data.completion,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    };
  } catch (error) {
    console.error('Error getting team by slug:', error);
    return null;
  }
}

/**
 * Get public teams
 */
export async function getPublicBattleRoyaleTeams(
  limitCount: number = 20
): Promise<BattleRoyaleTeam[]> {
  try {
    const firestore = getFirebaseFirestore();
    const teamsRef = collection(firestore, COLLECTION_NAME);
    const q = query(
      teamsRef,
      where('isPublic', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        slug: data.slug,
        ownerUserId: data.ownerUserId,
        primaryContactEmail: data.primaryContactEmail,
        status: data.status,
        isPublic: data.isPublic,
        brandKit: data.brandKit,
        identity: data.identity,
        completion: data.completion,
        createdAt: data.createdAt?.toMillis() || Date.now(),
        updatedAt: data.updatedAt?.toMillis() || Date.now(),
      };
    });
  } catch (error) {
    console.error('Error getting public teams:', error);
    return [];
  }
}

/**
 * Update a team
 */
export async function updateBattleRoyaleTeam(
  teamId: string,
  updates: Partial<Omit<BattleRoyaleTeam, 'id' | 'createdAt'>>
): Promise<void> {
  const firestore = getFirebaseFirestore();
  const teamRef = doc(firestore, COLLECTION_NAME, teamId);
  await updateDoc(teamRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Update team name with slug validation
 * Generates a new slug and ensures it's unique (excluding the current team)
 */
export async function updateBattleRoyaleTeamName(
  teamId: string,
  newName: string
): Promise<string> {
  const firestore = getFirebaseFirestore();
  const baseSlug = generateSlug(newName);

  // Check if slug is already taken by another team
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (true) {
    const teamsRef = collection(firestore, COLLECTION_NAME);
    const q = query(teamsRef, where('slug', '==', uniqueSlug), limit(1));
    const querySnapshot = await getDocs(q);

    // If no team has this slug, or if it's the current team, we can use it
    if (querySnapshot.empty) {
      break;
    }

    const existingTeam = querySnapshot.docs[0];
    if (existingTeam.id === teamId) {
      // This is the current team, so the slug is fine
      break;
    }

    // Slug is taken by another team, try with counter
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  // Update the team with new name and slug
  const teamRef = doc(firestore, COLLECTION_NAME, teamId);
  await updateDoc(teamRef, {
    name: newName,
    slug: uniqueSlug,
    updatedAt: serverTimestamp(),
  });

  return uniqueSlug;
}


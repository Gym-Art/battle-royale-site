import { getFirebaseFirestore } from '@/lib/firebase/client';
import type { BattleRoyaleTeamMembership } from '@/types/battleRoyaleMembership';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'battleRoyaleTeamMemberships';

/**
 * Generate membership document ID in the format expected by Firestore security rules
 * Format: {teamId}_{userId} when userId is provided
 * Format: {teamId}_invite_{emailHash} when userId is null (for invitations)
 */
function generateMembershipId(teamId: string, userId: string | null, email: string): string {
  if (userId) {
    return `${teamId}_${userId}`;
  }
  // For invitations (userId is null), use email hash to create a deterministic ID
  // Simple hash function for email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `${teamId}_invite_${Math.abs(hash)}`;
}

/**
 * Create a new team membership
 * The document ID is set to {teamId}_{userId} format to match Firestore security rules
 */
export async function createBattleRoyaleTeamMembership(
  membershipData: Omit<BattleRoyaleTeamMembership, 'id' | 'invitedAt' | 'acceptedAt'>
): Promise<BattleRoyaleTeamMembership> {
  const firestore = getFirebaseFirestore();
  const membershipId = generateMembershipId(
    membershipData.teamId,
    membershipData.userId || null,
    membershipData.email
  );
  const membershipRef = doc(firestore, COLLECTION_NAME, membershipId);

  const now = Date.now();
  const membership: BattleRoyaleTeamMembership = {
    id: membershipId,
    ...membershipData,
    invitedAt: now,
    acceptedAt: membershipData.userId ? now : null,
  };

  await setDoc(membershipRef, {
    ...membership,
    invitedAt: serverTimestamp(),
    acceptedAt: membership.userId ? serverTimestamp() : null,
  });

  return membership;
}

/**
 * Get membership by teamId and userId
 * Uses the same ID format as createBattleRoyaleTeamMembership
 */
export async function getBattleRoyaleTeamMembershipByTeamAndUser(
  teamId: string,
  userId: string
): Promise<BattleRoyaleTeamMembership | null> {
  const membershipId = `${teamId}_${userId}`;
  return getBattleRoyaleTeamMembership(membershipId);
}

/**
 * Get membership by ID
 */
export async function getBattleRoyaleTeamMembership(
  membershipId: string
): Promise<BattleRoyaleTeamMembership | null> {
  try {
    const firestore = getFirebaseFirestore();
    const membershipRef = doc(firestore, COLLECTION_NAME, membershipId);
    const membershipSnap = await getDoc(membershipRef);

    if (!membershipSnap.exists()) {
      return null;
    }

    const data = membershipSnap.data();
    return {
      id: membershipSnap.id,
      teamId: data.teamId,
      userId: data.userId || null,
      email: data.email,
      role: data.role,
      canEdit: data.canEdit,
      invitedAt: data.invitedAt?.toMillis() || Date.now(),
      acceptedAt: data.acceptedAt?.toMillis() || null,
    };
  } catch (error) {
    console.error('Error getting membership:', error);
    return null;
  }
}

/**
 * Get all memberships for a user
 */
export async function getBattleRoyaleTeamMembershipsByUserId(
  userId: string
): Promise<BattleRoyaleTeamMembership[]> {
  try {
    const firestore = getFirebaseFirestore();
    const membershipsRef = collection(firestore, COLLECTION_NAME);
    const q = query(membershipsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        teamId: data.teamId,
        userId: data.userId || null,
        email: data.email,
        role: data.role,
        canEdit: data.canEdit,
        invitedAt: data.invitedAt?.toMillis() || Date.now(),
        acceptedAt: data.acceptedAt?.toMillis() || null,
      };
    });
  } catch (error) {
    console.error('Error getting memberships by user ID:', error);
    return [];
  }
}

/**
 * Get all memberships for a team
 */
export async function getBattleRoyaleTeamMembershipsByTeamId(
  teamId: string
): Promise<BattleRoyaleTeamMembership[]> {
  try {
    const firestore = getFirebaseFirestore();
    const membershipsRef = collection(firestore, COLLECTION_NAME);
    const q = query(membershipsRef, where('teamId', '==', teamId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        teamId: data.teamId,
        userId: data.userId || null,
        email: data.email,
        role: data.role,
        canEdit: data.canEdit,
        invitedAt: data.invitedAt?.toMillis() || Date.now(),
        acceptedAt: data.acceptedAt?.toMillis() || null,
      };
    });
  } catch (error) {
    console.error('Error getting memberships by team ID:', error);
    return [];
  }
}


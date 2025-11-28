import { getFirebaseFirestore } from '@/lib/firebase/client';
import type { BattleRoyaleTeamMember } from '@/types/battleRoyaleTeamMember';
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';

const COLLECTION_NAME = 'battleRoyaleTeamMembers';

/**
 * Create a new team member
 */
export async function createBattleRoyaleTeamMember(
  memberData: Omit<BattleRoyaleTeamMember, 'id' | 'createdAt' | 'updatedAt'>
): Promise<BattleRoyaleTeamMember> {
  const firestore = getFirebaseFirestore();
  const membersRef = collection(firestore, COLLECTION_NAME);
  const newMemberRef = doc(membersRef);

  const now = Date.now();
  const member: BattleRoyaleTeamMember = {
    id: newMemberRef.id,
    ...memberData,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(newMemberRef, {
    ...member,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return member;
}

/**
 * Get a team member by ID
 */
export async function getBattleRoyaleTeamMember(
  memberId: string
): Promise<BattleRoyaleTeamMember | null> {
  try {
    const firestore = getFirebaseFirestore();
    const memberRef = doc(firestore, COLLECTION_NAME, memberId);
    const memberSnap = await getDoc(memberRef);

    if (!memberSnap.exists()) {
      return null;
    }

    const data = memberSnap.data();
    return {
      id: memberSnap.id,
      teamId: data.teamId,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || null,
      role: data.role,
      sportType: data.sportType || null,
      dateOfBirth: data.dateOfBirth || null,
      headshotUrl: data.headshotUrl || null,
      createdAt: data.createdAt?.toMillis() || Date.now(),
      updatedAt: data.updatedAt?.toMillis() || Date.now(),
    };
  } catch (error) {
    console.error('Error getting team member:', error);
    return null;
  }
}

/**
 * Get all team members for a team
 */
export async function getBattleRoyaleTeamMembersByTeamId(
  teamId: string
): Promise<BattleRoyaleTeamMember[]> {
  try {
    const firestore = getFirebaseFirestore();
    const membersRef = collection(firestore, COLLECTION_NAME);
    const q = query(
      membersRef,
      where('teamId', '==', teamId),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        teamId: data.teamId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || null,
        role: data.role,
        sportType: data.sportType || null,
        dateOfBirth: data.dateOfBirth || null,
        headshotUrl: data.headshotUrl || null,
        createdAt: data.createdAt?.toMillis() || Date.now(),
        updatedAt: data.updatedAt?.toMillis() || Date.now(),
      };
    });
  } catch (error) {
    console.error('Error getting team members:', error);
    return [];
  }
}

/**
 * Update a team member
 */
export async function updateBattleRoyaleTeamMember(
  memberId: string,
  updates: Partial<Omit<BattleRoyaleTeamMember, 'id' | 'teamId' | 'createdAt'>>
): Promise<void> {
  const firestore = getFirebaseFirestore();
  const memberRef = doc(firestore, COLLECTION_NAME, memberId);
  await updateDoc(memberRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a team member
 */
export async function deleteBattleRoyaleTeamMember(memberId: string): Promise<void> {
  const firestore = getFirebaseFirestore();
  const memberRef = doc(firestore, COLLECTION_NAME, memberId);
  await deleteDoc(memberRef);
}


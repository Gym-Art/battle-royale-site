export type BattleRoyaleUserProfile = {
  id: string; // USER_{firebaseUid} - matches Gym Art Meets pattern
  email: string;
  displayName: string | null;
  createdAt: number; // ms since epoch
  updatedAt: number; // ms since epoch
};


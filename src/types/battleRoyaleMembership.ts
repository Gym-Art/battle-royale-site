export type BattleRoyaleTeamMembershipRole = 'owner' | 'coach' | 'athlete' | 'staff' | 'fan';

export type BattleRoyaleTeamMembership = {
  id: string;
  teamId: string;
  userId: string | null; // null until invited user signs up
  email: string; // used for invitation
  role: BattleRoyaleTeamMembershipRole;
  canEdit: boolean;
  invitedAt: number; // ms since epoch
  acceptedAt: number | null; // ms since epoch
};


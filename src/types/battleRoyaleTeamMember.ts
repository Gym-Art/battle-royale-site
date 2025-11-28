export type BattleRoyaleTeamMemberRole = 'athlete' | 'coach' | 'staff';

export type BattleRoyaleTeamMemberSportType = 'MAG' | 'WAG' | 'Other';

export type BattleRoyaleTeamMember = {
  id: string;
  teamId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  role: BattleRoyaleTeamMemberRole;
  sportType: BattleRoyaleTeamMemberSportType | null;
  dateOfBirth: string | null; // ISO 8601 date string
  headshotUrl: string | null;
  createdAt: number; // ms since epoch
  updatedAt: number; // ms since epoch
};


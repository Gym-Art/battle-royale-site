export type BattleRoyaleTeamMediaType = 'image' | 'link' | 'note' | 'sticky-note' | 'comment';

export type BattleRoyaleTeamMedia = {
  id: string;
  teamId: string;
  uploaderUserId: string;
  type: BattleRoyaleTeamMediaType;
  title: string;
  description: string | null;
  url: string | null; // For images and links
  content: string | null; // For notes, sticky notes, and comments
  position: {
    x: number;
    y: number;
  } | null; // Canvas position (null for static items like sticky notes)
  width: number | null; // For canvas items
  height: number | null; // For canvas items
  attachedToMediaId: string | null; // For comments attached to other items
  createdAt: number; // ms since epoch
  updatedAt: number; // ms since epoch
};


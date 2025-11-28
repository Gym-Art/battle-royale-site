export type BattleRoyaleTeamStatus = 'draft' | 'brand-only' | 'ready-for-registration';

export type FontFamilyKey =
  | 'block'
  | 'modern'
  | 'classic'
  | 'bold'
  | 'elegant'
  | 'sporty'
  | 'futuristic'
  | 'retro'
  | 'minimal'
  | 'decorative'
  | 'handwritten'
  | 'tech';

export type LogoStyleKey =
  | 'badge'
  | 'monogram'
  | 'wordmark'
  | 'shield'
  | 'emblem'
  | 'crest'
  | 'stamp'
  | 'seal'
  | 'badge-modern'
  | 'badge-vintage'
  | 'badge-minimal'
  | 'badge-ornate';

export type BattleRoyaleTeamBrandKit = {
  // Home colors
  primaryColor: string; // hex - home primary
  secondaryColor: string | null; // hex - home secondary
  // Away colors
  awayPrimaryColor: string | null; // hex - away primary
  awaySecondaryColor: string | null; // hex - away secondary
  // Shared
  accentColor: string | null;
  fontFamilyKey: FontFamilyKey;
  logoStyleKey: LogoStyleKey;
  logoText: string; // team name or custom text
  logoAcronym: string | null; // optional acronym (separate from logoText)
  mascotEmoji: string | null;
};

export type BattleRoyaleTeamIdentity = {
  tagline: string | null;
  mascotKeyword: string | null; // "wolves", "phoenix", etc.
  shortBio: string | null; // 1–2 sentences
  location: string | null; // "Montreal, QC" etc.
  plannedEvents: string[]; // e.g. ids or labels of events like "Battle Royal 1 (Montreal)"
};

export type BattleRoyaleTeamCompletionSummary = {
  brandScore: number; // 0–100
  identityScore: number; // 0–100
  rosterScore: number; // 0–100
  totalScore: number; // aggregated
};

export type BattleRoyaleTeam = {
  id: string;
  name: string;
  slug: string; // unique, URL-safe
  ownerUserId: string; // creator
  primaryContactEmail: string; // default to owner's email, editable
  status: BattleRoyaleTeamStatus;
  isPublic: boolean; // whether public team page appears in gallery
  brandKit: BattleRoyaleTeamBrandKit;
  identity: BattleRoyaleTeamIdentity;
  completion: BattleRoyaleTeamCompletionSummary;
  createdAt: number; // ms since epoch
  updatedAt: number; // ms since epoch
};


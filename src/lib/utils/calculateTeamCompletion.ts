import type {
    BattleRoyaleTeamBrandKit,
    BattleRoyaleTeamCompletionSummary,
    BattleRoyaleTeamIdentity,
} from '@/types/battleRoyaleTeam';
import type { BattleRoyaleTeamMember } from '@/types/battleRoyaleTeamMember';

/**
 * Calculate brand kit completion score (0-100)
 * Checks for: primaryColor, secondaryColor, accentColor, fontFamilyKey, logoStyleKey, away colors
 */
export function calculateBrandScore(brandKit: BattleRoyaleTeamBrandKit): number {
  let score = 0;
  const maxScore = 100;

  // Home primary color is required (15 points)
  if (brandKit.primaryColor) {
    score += 15;
  }

  // Home secondary color (10 points)
  if (brandKit.secondaryColor) {
    score += 10;
  }

  // Away primary color (10 points)
  if (brandKit.awayPrimaryColor) {
    score += 10;
  }

  // Away secondary color (5 points)
  if (brandKit.awaySecondaryColor) {
    score += 5;
  }

  // Accent color (10 points)
  if (brandKit.accentColor) {
    score += 10;
  }

  // Font family (15 points)
  if (brandKit.fontFamilyKey) {
    score += 15;
  }

  // Logo style (15 points)
  if (brandKit.logoStyleKey) {
    score += 15;
  }

  // Logo text (5 points)
  if (brandKit.logoText && brandKit.logoText.trim().length > 0) {
    score += 5;
  }

  return Math.min(score, maxScore);
}

/**
 * Calculate identity completion score (0-100)
 * Checks for: tagline, shortBio, mascotKeyword, location
 */
export function calculateIdentityScore(identity: BattleRoyaleTeamIdentity): number {
  let score = 0;
  const maxScore = 100;

  // Tagline (25 points)
  if (identity.tagline && identity.tagline.trim().length > 0) {
    score += 25;
  }

  // Short bio (25 points)
  if (identity.shortBio && identity.shortBio.trim().length > 0) {
    score += 25;
  }

  // Mascot keyword (25 points)
  if (identity.mascotKeyword && identity.mascotKeyword.trim().length > 0) {
    score += 25;
  }

  // Location (25 points)
  if (identity.location && identity.location.trim().length > 0) {
    score += 25;
  }

  return Math.min(score, maxScore);
}

/**
 * Calculate roster completion score (0-100)
 * Checks for: ≥1 coach, ≥1 athlete
 */
export function calculateRosterScore(teamMembers: BattleRoyaleTeamMember[]): number {
  if (!teamMembers || teamMembers.length === 0) {
    return 0;
  }

  const coaches = teamMembers.filter((m) => m.role === 'coach');
  const athletes = teamMembers.filter((m) => m.role === 'athlete');
  
  let score = 0;
  if (coaches.length >= 1) score += 50;
  if (athletes.length >= 1) score += 50;
  
  return score;
}

/**
 * Calculate total completion score (0-100)
 * Weighted average: brand (40%), identity (40%), roster (20%)
 */
export function calculateTotalScore(
  brandScore: number,
  identityScore: number,
  rosterScore: number
): number {
  // Weighted average
  const total = brandScore * 0.4 + identityScore * 0.4 + rosterScore * 0.2;
  return Math.round(total);
}

/**
 * Calculate complete team completion summary
 */
export function calculateTeamCompletion(
  brandKit: BattleRoyaleTeamBrandKit,
  identity: BattleRoyaleTeamIdentity,
  teamMembers: BattleRoyaleTeamMember[] = []
): BattleRoyaleTeamCompletionSummary {
  const brandScore = calculateBrandScore(brandKit);
  const identityScore = calculateIdentityScore(identity);
  const rosterScore = calculateRosterScore(teamMembers);
  const totalScore = calculateTotalScore(brandScore, identityScore, rosterScore);

  return {
    brandScore,
    identityScore,
    rosterScore,
    totalScore,
  };
}


import type { BattleRoyaleTeamBrandKit } from '@/types/battleRoyaleTeam';

/**
 * Suggest logo style based on team name and mascot
 */
export function suggestLogoStyle(
  teamName: string,
  mascotKeyword: string | null
): BattleRoyaleTeamBrandKit['logoStyleKey'] {
  const nameLength = teamName.length;

  // If name is short (<= 10 chars), suggest monogram
  if (nameLength <= 10) {
    return 'monogram';
  }

  // If mascot keyword exists, suggest badge
  if (mascotKeyword) {
    return 'badge';
  }

  // Default to wordmark for longer names
  return 'wordmark';
}

/**
 * Suggest font family based on team name characteristics
 */
export function suggestFontFamily(teamName: string): BattleRoyaleTeamBrandKit['fontFamilyKey'] {
  const hasMythCreature = /phoenix|dragon|griffin|unicorn|sphinx|pegasus|kraken|titan|valkyrie|siren/i.test(
    teamName
  );
  const hasIntensity = /maximum|ultimate|absolute|supreme|extreme|infinite|perfect|elite|prime|peak/i.test(
    teamName
  );

  if (hasMythCreature) {
    return 'classic';
  }

  if (hasIntensity) {
    return 'block';
  }

  return 'modern';
}

/**
 * Generate logo text (acronym or team name)
 */
export function generateLogoText(teamName: string): string {
  // If name is short, use as-is
  if (teamName.length <= 12) {
    return teamName;
  }

  // Generate acronym from words
  const words = teamName.split(/\s+/);
  if (words.length >= 2) {
    return words
      .map((word) => word[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 4);
  }

  // Fallback: first 4 characters
  return teamName.slice(0, 4).toUpperCase();
}

/**
 * Get random mascot emoji
 */
export function getRandomMascotEmoji(seed?: number): string {
  const emojis = ['🔥', '⚡', '🦅', '🦁', '🐺', '🐉', '🦄', '🦅', '⚔️', '🛡️', '👑', '💎'];
  const random = seed !== undefined ? (seed % emojis.length) : Math.floor(Math.random() * emojis.length);
  return emojis[random] || '🔥';
}


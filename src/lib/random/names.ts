const adjectives = [
  'Electric',
  'Crimson',
  'Maximum',
  'Thunder',
  'Fierce',
  'Swift',
  'Golden',
  'Silver',
  'Iron',
  'Steel',
  'Blazing',
  'Frozen',
  'Mystic',
  'Royal',
  'Noble',
  'Wild',
  'Bold',
  'Brave',
  'Elite',
  'Prime',
];

const animals = [
  'Foxes',
  'Wolves',
  'Eagles',
  'Lions',
  'Tigers',
  'Bears',
  'Hawks',
  'Panthers',
  'Falcons',
  'Sharks',
  'Rhinos',
  'Stallions',
  'Ravens',
  'Cobras',
  'Jaguars',
];

const mythCreatures = [
  'Phoenix',
  'Dragons',
  'Griffins',
  'Unicorns',
  'Sphinx',
  'Pegasus',
  'Kraken',
  'Titans',
  'Valkyries',
  'Sirens',
];

const colors = [
  'Crimson',
  'Azure',
  'Emerald',
  'Golden',
  'Silver',
  'Violet',
  'Amber',
  'Cobalt',
  'Ruby',
  'Jade',
];

const intensity = [
  'Maximum',
  'Ultimate',
  'Absolute',
  'Supreme',
  'Extreme',
  'Infinite',
  'Perfect',
  'Elite',
  'Prime',
  'Peak',
];

const objects = [
  'Torque',
  'Force',
  'Velocity',
  'Momentum',
  'Impact',
  'Power',
  'Energy',
  'Dynamo',
  'Thrust',
  'Drive',
];

type NamePattern = 'adjective-animal' | 'color-myth' | 'intensity-object';

/**
 * Generate a random team name based on patterns
 */
export function generateTeamName(seed?: number): string {
  const random = seed !== undefined ? seededRandom(seed) : Math.random();

  const patterns: NamePattern[] = ['adjective-animal', 'color-myth', 'intensity-object'];
  const pattern = patterns[Math.floor(random * patterns.length)];

  switch (pattern) {
    case 'adjective-animal':
      return `${getRandomItem(adjectives, random)} ${getRandomItem(animals, random)}`;
    case 'color-myth':
      return `${getRandomItem(colors, random)} ${getRandomItem(mythCreatures, random)}`;
    case 'intensity-object':
      return `${getRandomItem(intensity, random)} ${getRandomItem(objects, random)}`;
  }
}

/**
 * Generate a team name with a locked suffix (e.g., keep "Phoenix" and reroll prefix)
 */
export function generateTeamNameWithLockedSuffix(
  lockedSuffix: string,
  seed?: number
): string {
  const random = seed !== undefined ? seededRandom(seed) : Math.random();
  const prefix = getRandomItem(adjectives, random);
  return `${prefix} ${lockedSuffix}`;
}

/**
 * Get a random item from an array using a seeded random function
 */
function getRandomItem<T>(array: T[], random: number): T {
  return array[Math.floor(random * array.length)]!;
}

/**
 * Simple seeded random number generator
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate mascot keyword from team name
 */
export function generateMascotKeyword(teamName: string): string | null {
  const lowerName = teamName.toLowerCase();

  // Check for animals
  for (const animal of animals) {
    if (lowerName.includes(animal.toLowerCase().replace('s', ''))) {
      return animal.toLowerCase().replace('s', '');
    }
  }

  // Check for myth creatures
  for (const creature of mythCreatures) {
    if (lowerName.includes(creature.toLowerCase())) {
      return creature.toLowerCase();
    }
  }

  // Default to null if no match
  return null;
}


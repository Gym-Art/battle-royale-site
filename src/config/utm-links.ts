/**
 * UTM Tracking Links Configuration
 * 
 * Use these links when posting to social media to track where signups come from.
 * Each link includes utm_source, utm_medium, and utm_content parameters.
 */

// Base URL - update this to your production domain
const BASE_URL = 'https://battleroyale.gymart.org';

export type Platform = 'facebook' | 'instagram' | 'tiktok';
export type AudienceType = 'gymnast' | 'coach' | 'parent' | 'spectator' | 'gym_owner';

export interface UTMLink {
  platform: Platform;
  audience: AudienceType;
  url: string;
  description: string;
}

/**
 * Generates a UTM tracking URL
 */
const generateUTM = (
  platform: Platform,
  audience: AudienceType,
  campaign: string = 'launch_2025'
): string => {
  const params = new URLSearchParams({
    utm_source: platform,
    utm_medium: 'social',
    utm_campaign: campaign,
    utm_content: audience,
  });
  return `${BASE_URL}?${params.toString()}`;
};

/**
 * All UTM tracking links organized by platform and audience
 */
export const utmLinks = {
  facebook: {
    gymnast: generateUTM('facebook', 'gymnast'),
    coach: generateUTM('facebook', 'coach'),
    parent: generateUTM('facebook', 'parent'),
    spectator: generateUTM('facebook', 'spectator'),
    gym_owner: generateUTM('facebook', 'gym_owner'),
  },
  instagram: {
    gymnast: generateUTM('instagram', 'gymnast'),
    coach: generateUTM('instagram', 'coach'),
    parent: generateUTM('instagram', 'parent'),
    spectator: generateUTM('instagram', 'spectator'),
    gym_owner: generateUTM('instagram', 'gym_owner'),
  },
  tiktok: {
    gymnast: generateUTM('tiktok', 'gymnast'),
    coach: generateUTM('tiktok', 'coach'),
    parent: generateUTM('tiktok', 'parent'),
    spectator: generateUTM('tiktok', 'spectator'),
    gym_owner: generateUTM('tiktok', 'gym_owner'),
  },
} as const;

/**
 * Flat list of all UTM links with descriptions for easy reference
 */
export const allUTMLinks: UTMLink[] = [
  // Facebook
  { platform: 'facebook', audience: 'gymnast', url: utmLinks.facebook.gymnast, description: 'Facebook → Gymnasts' },
  { platform: 'facebook', audience: 'coach', url: utmLinks.facebook.coach, description: 'Facebook → Coaches' },
  { platform: 'facebook', audience: 'parent', url: utmLinks.facebook.parent, description: 'Facebook → Parents' },
  { platform: 'facebook', audience: 'spectator', url: utmLinks.facebook.spectator, description: 'Facebook → Spectators' },
  { platform: 'facebook', audience: 'gym_owner', url: utmLinks.facebook.gym_owner, description: 'Facebook → Gym Owners' },
  
  // Instagram
  { platform: 'instagram', audience: 'gymnast', url: utmLinks.instagram.gymnast, description: 'Instagram → Gymnasts' },
  { platform: 'instagram', audience: 'coach', url: utmLinks.instagram.coach, description: 'Instagram → Coaches' },
  { platform: 'instagram', audience: 'parent', url: utmLinks.instagram.parent, description: 'Instagram → Parents' },
  { platform: 'instagram', audience: 'spectator', url: utmLinks.instagram.spectator, description: 'Instagram → Spectators' },
  { platform: 'instagram', audience: 'gym_owner', url: utmLinks.instagram.gym_owner, description: 'Instagram → Gym Owners' },
  
  // TikTok
  { platform: 'tiktok', audience: 'gymnast', url: utmLinks.tiktok.gymnast, description: 'TikTok → Gymnasts' },
  { platform: 'tiktok', audience: 'coach', url: utmLinks.tiktok.coach, description: 'TikTok → Coaches' },
  { platform: 'tiktok', audience: 'parent', url: utmLinks.tiktok.parent, description: 'TikTok → Parents' },
  { platform: 'tiktok', audience: 'spectator', url: utmLinks.tiktok.spectator, description: 'TikTok → Spectators' },
  { platform: 'tiktok', audience: 'gym_owner', url: utmLinks.tiktok.gym_owner, description: 'TikTok → Gym Owners' },
];

/**
 * Helper to get a specific link
 */
export const getUTMLink = (platform: Platform, audience: AudienceType): string => {
  return utmLinks[platform][audience];
};

/**
 * Console-friendly output of all links
 * Run: npx ts-node -e "import('./src/config/utm-links').then(m => m.printAllLinks())"
 */
export const printAllLinks = (): void => {
  console.log('\n📊 BATTLE ROYALE UTM TRACKING LINKS\n');
  console.log('='.repeat(100));
  
  for (const link of allUTMLinks) {
    console.log(`\n${link.description}`);
    console.log(link.url);
  }
  
  console.log('\n' + '='.repeat(100));
};


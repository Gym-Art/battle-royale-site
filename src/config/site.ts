export const SITE_VERSION = '0.0.12';

export type SocialPlatform = 'instagram' | 'tiktok' | 'facebook';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  emailSignupTargetListId: string;
  contactEmail: string;
  socials: SocialLink[];
  version: string;
}

// TODO: Move translatable strings to translation files (src/messages/*.json)
// Use useTranslations() hook in components to access translated strings
export const siteConfig: SiteConfig = {
  name: 'Battle Royale',
  tagline: 'Pro-style gymnastics battles. Live crowd. Real stakes.',
  emailSignupTargetListId: 'br-general-waitlist',
  contactEmail: 'battle.royale@gymart.org',
  socials: [
    { platform: 'instagram', label: '@battle.royale', url: 'https://instagram.com/gymart.battle.royale' },
    { platform: 'tiktok', label: '@battle.royale', url: 'https://tiktok.com/@gymart.battle.royale' },
    { platform: 'facebook', label: 'Battle Royale', url: 'https://www.facebook.com/profile.php?id=61584420504084' },
  ],
  version: SITE_VERSION,
};


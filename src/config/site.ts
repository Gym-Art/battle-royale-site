export const SITE_VERSION = '0.0.12';

export type SocialPlatform = 'instagram' | 'tiktok' | 'facebook';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  url: string;
}

export interface SiteConfig {
  emailSignupTargetListId: string;
  contactEmail: string;
  socials: SocialLink[];
  version: string;
}

export const siteConfig: SiteConfig = {
  emailSignupTargetListId: 'br-general-waitlist',
  contactEmail: 'battle.royale@gymart.org',
  socials: [
    { platform: 'instagram', label: '@battleroyaleseries', url: 'https://instagram.com/battleroyaleseries' },
    { platform: 'tiktok', label: '@battleroyaleseries', url: 'https://tiktok.com/@battleroyaleseries' },
    { platform: 'facebook', label: 'Battle Royale', url: 'https://www.facebook.com/profile.php?id=61584420504084' },
  ],
  version: SITE_VERSION,
};


export type SocialPlatform = 'instagram' | 'tiktok' | 'youtube';

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
}

export const siteConfig: SiteConfig = {
  name: 'Battle Royal',
  tagline: 'Pro-style gymnastics battles. Live crowd. Real stakes.',
  emailSignupTargetListId: 'br-general-waitlist',
  contactEmail: 'benjamin.astorga@gymart.org',
  socials: [
    { platform: 'instagram', label: '@battle.royal', url: 'https://instagram.com/battle.royal' },
    { platform: 'tiktok', label: '@battle.royal', url: 'https://tiktok.com/@battle.royal' },
    { platform: 'youtube', label: 'Battle Royal', url: 'https://youtube.com/@battleroyalgymnastics' },
  ],
};


export type CampaignId =
  | 'ig_bio_general'
  | 'tiktok_bio_general'
  | 'yt_desc_general'
  | 'email_footer'
  | 'unknown';

export interface Campaign {
  id: CampaignId;
  description: string;
}

export const campaigns: Record<CampaignId, Campaign> = {
  ig_bio_general: { id: 'ig_bio_general', description: 'IG link-in-bio general' },
  tiktok_bio_general: { id: 'tiktok_bio_general', description: 'TikTok link-in-bio general' },
  yt_desc_general: { id: 'yt_desc_general', description: 'YouTube description general' },
  email_footer: { id: 'email_footer', description: 'Link from email footer' },
  unknown: { id: 'unknown', description: 'No explicit campaign' },
};

export function isValidCampaignId(id: string): id is CampaignId {
  return id in campaigns;
}


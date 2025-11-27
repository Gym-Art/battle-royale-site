import { CampaignId, isValidCampaignId } from '../config/campaigns';

export interface SessionAttribution {
  sessionId: string;
  campaignId: CampaignId;
  firstReferrer?: string | null;
}

const STORAGE_KEY = 'br_session_attribution';

function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}-${randomPart}`;
}

function parseCampaignIdFromUrl(): CampaignId {
  if (typeof window === 'undefined') return 'unknown';

  const params = new URLSearchParams(window.location.search);
  const campaignParam = params.get('campaign') || params.get('from');

  if (campaignParam && isValidCampaignId(campaignParam)) {
    return campaignParam;
  }

  return 'unknown';
}

export function initSessionAttribution(): SessionAttribution {
  if (typeof window === 'undefined') {
    return {
      sessionId: 'server',
      campaignId: 'unknown',
      firstReferrer: null,
    };
  }

  const existing = getSessionAttribution();
  if (existing) {
    return existing;
  }

  const attribution: SessionAttribution = {
    sessionId: generateSessionId(),
    campaignId: parseCampaignIdFromUrl(),
    firstReferrer: document.referrer || null,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // localStorage unavailable
  }

  return attribution;
}

export function getSessionAttribution(): SessionAttribution | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as SessionAttribution;
    }
  } catch {
    // localStorage unavailable or invalid JSON
  }

  return null;
}


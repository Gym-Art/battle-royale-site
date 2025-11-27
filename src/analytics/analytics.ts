import { getSessionAttribution, initSessionAttribution } from './session';

export type EventName =
  | 'page_view'
  | 'email_signup_submitted'
  | 'email_signup_success'
  | 'cta_click'
  | 'nav_click';

export interface AnalyticsEventBase {
  name: EventName;
  ts: string;
  path: string;
  sessionId?: string;
  campaignId?: string;
}

export type AnalyticsEvent =
  | (AnalyticsEventBase & { name: 'page_view'; meta?: { title?: string } })
  | (AnalyticsEventBase & {
      name: 'email_signup_submitted' | 'email_signup_success';
      meta?: { listId: string };
    })
  | (AnalyticsEventBase & {
      name: 'cta_click';
      meta?: { ctaId?: string; label?: string; sectionId?: string; href?: string };
    })
  | (AnalyticsEventBase & {
      name: 'nav_click';
      meta?: { label: string; href: string };
    });

type EventInput =
  | { name: 'page_view'; meta?: { title?: string } }
  | { name: 'email_signup_submitted' | 'email_signup_success'; meta?: { listId: string } }
  | { name: 'cta_click'; meta?: { ctaId?: string; label?: string; sectionId?: string; href?: string } }
  | { name: 'nav_click'; meta?: { label: string; href: string } };

function enrichBase(input: EventInput): AnalyticsEvent {
  const attribution = getSessionAttribution() ?? initSessionAttribution();

  return {
    ...input,
    ts: new Date().toISOString(),
    path: typeof window !== 'undefined' ? window.location.pathname : '',
    sessionId: attribution.sessionId,
    campaignId: attribution.campaignId,
  } as AnalyticsEvent;
}

export async function trackEvent(input: EventInput): Promise<void> {
  const event = enrichBase(input);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event.name, event);
  }

  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics] Failed to send event:', error);
    }
  }
}


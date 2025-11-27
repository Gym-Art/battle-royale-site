import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getFirestore } from '@/server/firebaseAdmin';
import type { AnalyticsEvent } from '@/analytics/analytics';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalyticsEvent | null;

    if (!body || !body.name) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    const userAgent = req.headers.get('user-agent');
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      null;

    const ipHash = ip
      ? crypto.createHash('sha256').update(ip).digest('hex')
      : null;

    const db = getFirestore();

    await db.collection('analytics_events').add({
      name: body.name,
      ts: body.ts ? new Date(body.ts) : new Date(),
      path: body.path ?? null,
      sessionId: body.sessionId ?? null,
      campaignId: body.campaignId ?? null,
      meta: body.meta ?? {},
      userAgent,
      ipHash,
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[Analytics API] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}


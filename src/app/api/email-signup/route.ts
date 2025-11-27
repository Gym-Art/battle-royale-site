import { getFirestore } from '@/server/firebaseAdmin';
import { NextRequest, NextResponse } from 'next/server';

interface EmailSignupPayload {
  email: string;
  listId: string;
  sessionId?: string;
  campaignId?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EmailSignupPayload | null;

    if (!body || !body.email || !body.listId) {
      return NextResponse.json({ error: 'Missing email or listId' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const db = getFirestore();

    await db.collection('battleRoyaleEmailSignups').add({
      email: body.email.toLowerCase().trim(),
      listId: body.listId,
      sessionId: body.sessionId ?? null,
      campaignId: body.campaignId ?? null,
      ts: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('[Email Signup API] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}


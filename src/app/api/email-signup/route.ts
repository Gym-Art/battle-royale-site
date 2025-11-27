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

    if (!body || !body.email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (!apiKey || !audienceId) {
      console.error('[Email Signup API] Missing Mailchimp configuration');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Extract data center from API key (e.g., "xxx-us21" -> "us21")
    const dataCenter = apiKey.split('-').pop();
    const url = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `apikey ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: body.email.toLowerCase().trim(),
        status: 'subscribed',
        merge_fields: {},
        tags: ['battle-royale-waitlist'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Handle "already subscribed" as success
      if (errorData.title === 'Member Exists') {
        return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
      }
      
      console.error('[Email Signup API] Mailchimp error:', errorData);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error('[Email Signup API] Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}


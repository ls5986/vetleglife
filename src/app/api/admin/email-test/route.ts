import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const toEmail: string = body?.to || 'lindsey.stevens98@outlook.com';
    const subject: string = body?.subject || 'Resend test email';
    const html: string = body?.html || `
      <div style="font-family:Arial,sans-serif;">
        <h2 style="margin:0 0 12px;">Resend test email</h2>
        <p>This is a test message sent from your multi-brand funnel app.</p>
        <p style="font-size:12px;color:#666;">Time: ${new Date().toISOString()}</p>
      </div>
    `;

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey || resendKey === 'your_resend_api_key_here') {
      return NextResponse.json(
        {
          ok: false,
          error: 'RESEND_API_KEY is not configured',
          hint: 'Set RESEND_API_KEY and SENDER_EMAIL in .env.local and restart the dev server',
          meta: { to: toEmail, from: process.env.SENDER_EMAIL || 'Applications <no-reply@legacylifeadvocates.com>' }
        },
        { status: 400 }
      );
    }

    const resend = new Resend(resendKey);
    const fromHeader = process.env.SENDER_EMAIL || 'Applications <no-reply@legacylifeadvocates.com>';

    const resp = await resend.emails.send({
      from: fromHeader,
      to: toEmail,
      subject,
      html
    });

    return NextResponse.json({ ok: true, resp, meta: { to: toEmail, from: fromHeader, subject } });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get('to') || 'lindsey.stevens98@outlook.com';
  return POST(new Request(request.url, { method: 'POST', body: JSON.stringify({ to }) }));
}



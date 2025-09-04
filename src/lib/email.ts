import { Resend } from 'resend';

type BrandInfo = { brand_name: string; domain: string; primary_color?: string };

export async function sendCompletionEmail(args: {
  toEmail: string;
  lead: any;
  brand?: BrandInfo | null;
  subjectOverride?: string;
  htmlOverride?: string;
  fromOverride?: string;
}) {
  const { toEmail, lead, brand, subjectOverride, htmlOverride, fromOverride } = args;
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn('RESEND_API_KEY not set; skipping email send');
    return { skipped: true };
  }

  const resend = new Resend(resendKey);

  const subject = subjectOverride || `${brand?.brand_name || 'Your Application'} is complete`;
  const html = htmlOverride || `
    <div style="font-family:Arial,sans-serif;">
      <h2 style="color:${brand?.primary_color || '#2563eb'};margin:0 0 12px;">
        ${brand?.brand_name || 'Your Application'}
      </h2>
      <p>Thanks, ${lead.first_name || 'there'}! We received your application.</p>
      <p>We'll be in touch shortly. If you have questions, reply to this email.</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0;" />
      <p style="font-size:12px;color:#666;">
        Sent by ${brand?.brand_name || 'Our Team'} • ${brand?.domain || ''}
      </p>
    </div>
  `;

  try {
    const defaultDomain = brand?.domain || 'example.com';
    const configuredFrom = fromOverride || process.env.SENDER_EMAIL || 'Acme <onboarding@resend.dev>';
    const fromHeader = /</.test(configuredFrom)
      ? configuredFrom
      : `Applications <${configuredFrom}>`;
    const resp = await resend.emails.send({
      from: fromHeader,
      to: toEmail,
      subject,
      html,
    });
    return { ...resp, _meta: { subject, html, from: fromHeader } };
  } catch (e) {
    console.error('Error sending completion email', e);
    return { error: true };
  }
}



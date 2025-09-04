type BrandInfo = { brand_name: string; domain: string; primary_color?: string };

export async function sendCompletionEmail(args: {
  toEmail: string;
  lead: any;
  brand?: BrandInfo | null;
}) {
  const { toEmail, lead, brand } = args;
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn('RESEND_API_KEY not set; skipping email send');
    return { skipped: true };
  }

  // Lazy import to avoid adding hard dep if key is missing
  const { Resend } = await import('resend');
  const resend = new Resend(resendKey);

  const subject = `${brand?.brand_name || 'Your Application'} is complete`;
  const html = `
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
    const resp = await resend.emails.send({
      from: `Applications <no-reply@${brand?.domain || 'example.com'}>`,
      to: toEmail,
      subject,
      html,
    });
    return resp;
  } catch (e) {
    console.error('Error sending completion email', e);
    return { error: true };
  }
}



import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

type TemplateKey = 'client_completion' | 'rep_completion';

const DEFAULT_TEMPLATES: Record<TemplateKey, { subject: string; html: string }> = {
  client_completion: {
    subject: 'Your application is complete',
    html: `<div style="font-family:Arial,sans-serif">Thank you for completing your application. We will contact you shortly.</div>`
  },
  rep_completion: {
    subject: 'New completed application received',
    html: `<div style="font-family:Arial,sans-serif">A client has completed their application. Please follow up.</div>`
  }
};

async function fetchTemplates() {
  const supabase = createSupabaseAdmin();
  try {
    const { data, error } = await supabase.from('email_templates').select('key, subject, html');
    if (error) throw error;
    const map = new Map<string, { subject: string; html: string }>();
    for (const row of data || []) {
      if (row.key && row.subject && row.html) {
        map.set(row.key, { subject: row.subject, html: row.html });
      }
    }
    return {
      templates: {
        client_completion: map.get('client_completion') || DEFAULT_TEMPLATES.client_completion,
        rep_completion: map.get('rep_completion') || DEFAULT_TEMPLATES.rep_completion,
      },
      mocked: false,
    };
  } catch {
    return { templates: DEFAULT_TEMPLATES, mocked: true };
  }
}

export async function GET() {
  const result = await fetchTemplates();
  return NextResponse.json({ success: true, ...result });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const incoming = body?.templates as Partial<Record<TemplateKey, { subject: string; html: string }>>;
    if (!incoming) return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });

    const supabase = createSupabaseAdmin();
    try {
      const rows: Array<{ key: string; subject: string; html: string; updated_at: string }> = [];
      for (const key of Object.keys(DEFAULT_TEMPLATES) as TemplateKey[]) {
        const tpl = incoming[key];
        if (tpl?.subject && tpl?.html) {
          rows.push({ key, subject: tpl.subject, html: tpl.html, updated_at: new Date().toISOString() });
        }
      }
      if (rows.length === 0) return NextResponse.json({ success: false, error: 'No templates to save' }, { status: 400 });

      const { error } = await supabase.from('email_templates').upsert(rows, { onConflict: 'key' });
      if (error) throw error;
      return NextResponse.json({ success: true, mocked: false });
    } catch (e) {
      // Fallback: accept but not persist
      console.warn('Email templates table missing, accepting without persistence');
      return NextResponse.json({ success: true, mocked: true });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}



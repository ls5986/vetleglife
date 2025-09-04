import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: Request,
  context: { params: Promise<{ leadId: string }> } | any
) {
  try {
    const resolvedParams = context?.params && typeof context.params.then === 'function'
      ? await context.params
      : context?.params;
    const { leadId } = resolvedParams || {};

    console.log('🚀 Individual Lead API called:', { leadId });

    const supabaseAdmin = createSupabaseAdmin();

    // Fetch the specific lead (no join for compatibility)
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('id', leadId)
      .single();

    if (error) {
      console.error('❌ Error fetching lead:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          {
            success: false,
            error: 'Lead not found',
            timestamp: new Date().toISOString()
          },
          { status: 404 }
        );
      }
      throw error;
    }

    if (!lead) {
      console.error('❌ Lead not found:', leadId);
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
          timestamp: new Date().toISOString()
        },
        { status: 404 }
      );
    }

    // Enrich with brand info
    let brands: any = null;
    if (lead?.brand_id) {
      const { data: brand } = await supabaseAdmin
        .from('brands')
        .select('brand_name, domain, primary_color')
        .eq('id', lead.brand_id)
        .single();
      if (brand) {
        brands = brand;
      }
    }

    // Normalize email history from form_data.emails for UI
    let communication_history: any[] = [];
    try {
      const fd = (lead as any).form_data || {};
      if (Array.isArray(fd.emails)) {
        communication_history = fd.emails.map((e: any) => ({
          type: e?.type || 'email',
          at: e?.at,
          client_status: e?.client?.status || e?.client || 'unknown',
          client_subject: e?.client?.meta?.subject,
          client_preview: e?.client?.meta?.html ? String(e.client.meta.html).replace(/<[^>]+>/g, '').slice(0, 160) : undefined,
          rep_status: e?.rep?.status || e?.rep || 'unknown',
          rep_subject: e?.rep?.meta?.subject,
          rep_preview: e?.rep?.meta?.html ? String(e.rep.meta.html).replace(/<[^>]+>/g, '').slice(0, 160) : undefined,
        }));
      }
    } catch {}

    const enrichedLead = { ...lead, brands, communication_history };

    console.log('✅ Lead data loaded:', {
      leadId,
      name: `${enrichedLead.first_name || ''} ${enrichedLead.last_name || ''}`.trim() || 'Anonymous',
      email: enrichedLead.email || 'No email',
      currentStep: enrichedLead.current_step,
      status: enrichedLead.status
    });

    return NextResponse.json({
      success: true,
      data: enrichedLead
    });

  } catch (error) {
    console.error('💥 Individual Lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ leadId: string }> } | any
) {
  try {
    const resolvedParams = context?.params && typeof context.params.then === 'function'
      ? await context.params
      : context?.params;
    const { leadId } = resolvedParams || {};
    const body = await request.json();
    const { updateData } = body;

    console.log('🚀 Update Lead API called:', { leadId, updateData });

    const supabaseAdmin = createSupabaseAdmin();

    // Update the lead
    const { data: updatedLead, error } = await supabaseAdmin
      .from('leads')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .select(`
        *,
        brands (brand_name, domain, primary_color)
      `)
      .single();

    if (error) {
      console.error('❌ Error updating lead:', error);
      throw error;
    }

    console.log('✅ Lead updated successfully:', {
      leadId,
      status: updatedLead.status,
      leadScore: updatedLead.lead_score,
      leadGrade: updatedLead.lead_grade
    });

    return NextResponse.json({
      success: true,
      data: updatedLead
    });

  } catch (error) {
    console.error('💥 Update Lead API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

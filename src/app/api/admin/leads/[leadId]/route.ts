import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;

    console.log('🚀 Individual Lead API called:', { leadId });

    const supabaseAdmin = createSupabaseAdmin();

    // Fetch the specific lead with brand information
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .select(`
        *,
        brands (brand_name, domain, primary_color)
      `)
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

    console.log('✅ Lead data loaded:', {
      leadId,
      name: `${lead.first_name || ''} ${lead.last_name || ''}`.trim() || 'Anonymous',
      email: lead.email || 'No email',
      currentStep: lead.current_step,
      status: lead.status
    });

    return NextResponse.json({
      success: true,
      data: lead
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
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const { leadId } = await params;
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

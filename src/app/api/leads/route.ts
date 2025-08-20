import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadData } = body;

    const supabaseAdmin = createSupabaseAdmin();

    // Create or update lead
    let result;
    if (leadData.id) {
      // Update existing lead
      const { data, error } = await supabaseAdmin
        .from('leads')
        .update(leadData)
        .eq('id', leadData.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new lead
      const { data, error } = await supabaseAdmin
        .from('leads')
        .insert(leadData)
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error in leads API:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 
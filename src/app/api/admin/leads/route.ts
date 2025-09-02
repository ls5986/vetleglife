import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const brandId = searchParams.get('brand_id');
    const statusFilter = searchParams.get('status');
    const currentPage = searchParams.get('page') || '1';
    const leadsPerPage = 20;

    console.log('🔍 ADMIN API - Fetching leads:', {
      timestamp: new Date().toISOString(),
      sessionId,
      brandId,
      statusFilter,
      currentPage
    });

    const supabaseAdmin = createSupabaseAdmin();

    let query = supabaseAdmin
      .from('leads')
      .select(`
        *,
        brands (brand_name, domain, primary_color)
      `, { count: 'exact' });

    // Apply filters
    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }
    if (brandId) {
      query = query.eq('brand_id', brandId);
    }
    if (statusFilter && statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    // Apply pagination
    const from = (parseInt(currentPage) - 1) * leadsPerPage;
    const to = from + leadsPerPage - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      console.error('❌ Error fetching leads in admin API:', error);
      throw error;
    }

    console.log('✅ Admin API - Leads fetched successfully:', {
      count: data?.length || 0,
      totalCount: count,
      sessionId,
      brandId,
      statusFilter
    });

    return NextResponse.json({ 
      success: true, 
      data: data || [],
      totalCount: count || 0,
      currentPage: parseInt(currentPage),
      leadsPerPage
    });
  } catch (error) {
    console.error('💥 Error in admin leads API:', error);
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

import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm') || '';
    const statusFilter = searchParams.get('statusFilter') || 'all';
    const brandFilter = searchParams.get('brandFilter') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    console.log('🚀 Leads Data API called:', { 
      searchTerm, 
      statusFilter, 
      brandFilter, 
      page, 
      limit 
    });

    const supabaseAdmin = createSupabaseAdmin();

    // Get brands first
    const { data: brands, error: brandsError } = await supabaseAdmin
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('brand_name');

    if (brandsError) {
      console.error('❌ Brands error:', brandsError);
      throw brandsError;
    }

    console.log('✅ Brands loaded:', brands?.length || 0);

    // Build leads query (no joins; enrich in-code)
    let leadsQuery = supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (statusFilter !== 'all') {
      leadsQuery = leadsQuery.eq('status', statusFilter);
    }

    if (brandFilter !== 'all') {
      leadsQuery = leadsQuery.eq('brand_id', brandFilter);
    }

    // Get all leads for filtering
    const { data: allLeadsRaw, error: leadsError } = await leadsQuery;

    if (leadsError) {
      console.error('❌ Leads error:', leadsError);
      throw leadsError;
    }

    console.log('📊 All leads loaded:', allLeadsRaw?.length || 0);

    // Attach brand info manually to mimic join shape so UI remains unchanged
    const brandMap = new Map((brands || []).map((b: any) => [b.id, b]));
    const allLeads = (allLeadsRaw || []).map((lead: any) => ({
      ...lead,
      brands: brandMap.has(lead.brand_id)
        ? {
            brand_name: brandMap.get(lead.brand_id)!.brand_name,
            domain: brandMap.get(lead.brand_id)!.domain,
            primary_color: brandMap.get(lead.brand_id)!.primary_color,
          }
        : null,
    }));

    // Apply search filter
    let filteredLeads = allLeads || [];
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filteredLeads = filteredLeads.filter(lead => {
        return (
          (lead.first_name?.toLowerCase().includes(searchLower)) ||
          (lead.last_name?.toLowerCase().includes(searchLower)) ||
          (lead.email?.toLowerCase().includes(searchLower)) ||
          (lead.phone?.includes(searchTerm)) ||
          (lead.session_id?.toLowerCase().includes(searchLower)) ||
          (lead.military_status?.toLowerCase().includes(searchLower))
        );
      });
    }

    // Apply pagination
    const totalLeads = filteredLeads.length;
    const totalPages = Math.ceil(totalLeads / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

    console.log('✅ Leads data prepared:', {
      total: totalLeads,
      filtered: filteredLeads.length,
      paginated: paginatedLeads.length,
      page,
      totalPages
    });

    return NextResponse.json({
      success: true,
      data: {
        leads: paginatedLeads,
        brands,
        pagination: {
          currentPage: page,
          totalPages,
          totalLeads,
          leadsPerPage: limit
        }
      }
    });

  } catch (error) {
    console.error('💥 Leads Data API error:', error);
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

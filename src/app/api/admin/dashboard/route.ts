import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'today';
    const selectedBrand = searchParams.get('selectedBrand') || 'all';

    console.log('🚀 Dashboard API called:', { timeRange, selectedBrand });

    const supabaseAdmin = createSupabaseAdmin();

    // Calculate date range
    const now = new Date();
    let startDate: string;
    
    switch (timeRange) {
      case 'today':
        startDate = now.toISOString().split('T')[0];
        break;
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        startDate = weekAgo.toISOString().split('T')[0];
        break;
      case 'month':
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        startDate = monthAgo.toISOString().split('T')[0];
        break;
      default:
        startDate = now.toISOString().split('T')[0];
    }

    console.log('📅 Date range:', { startDate, timeRange });

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
    console.log('🔍 Brands query details:', {
      table: 'brands',
      filter: 'is_active = true',
      resultCount: brands?.length || 0,
      brands: brands?.map(b => ({ id: b.id, name: b.brand_name, active: b.is_active }))
    });

    // Build queries (no joins to avoid FK/type mismatch issues)
    let leadsQuery = supabaseAdmin
      .from('leads')
      .select('*')
      .gte('created_at', startDate);

    if (selectedBrand !== 'all') {
      leadsQuery = leadsQuery.eq('brand_id', selectedBrand);
    }

    // Get leads and applications data (apps may fail if table missing)
    const leadsResult = await leadsQuery;
    let appsResult: any = { data: [], error: null };
    try {
      // Attempt to query applications table if it exists
      appsResult = await supabaseAdmin
        .from('applications')
        .select('*')
        .gte('created_at', startDate);
      if (selectedBrand !== 'all') {
        appsResult = await supabaseAdmin
          .from('applications')
          .select('*')
          .gte('created_at', startDate)
          .eq('brand_id', selectedBrand);
      }
    } catch (e) {
      console.warn('⚠️ Applications table not available or query failed, continuing without applications');
      appsResult = { data: [], error: null };
    }

    if (leadsResult.error) {
      console.error('❌ Leads error:', leadsResult.error);
      throw leadsResult.error;
    }
    if (appsResult.error) {
      console.error('❌ Applications error:', appsResult.error);
      throw appsResult.error;
    }

    const leads: any[] = leadsResult.data || [];
    let applications: any[] = Array.isArray(appsResult?.data) ? appsResult.data : [];

    // Fallback: derive applications from completed/converted leads if applications table is empty/missing
    if (!applications || applications.length === 0) {
      const derived = (leads || []).filter((l: any) => {
        const status = String(l?.status || '').toLowerCase();
        const step = Number(l?.current_step || 0);
        return status === 'converted' || step >= 18;
      }).map((l: any) => ({
        brand_id: l.brand_id,
        coverage_amount: l.coverage_amount || 0,
        created_at: l.created_at,
      }));
      applications = derived;
    }

    console.log('📊 Data loaded:', {
      leads: leads.length,
      applications: applications.length,
      startDate
    });

    // Calculate brand performance
    const brandPerformance: { [brandId: string]: any } = {};
    
    for (const brand of brands || []) {
      const brandLeads = leads.filter(lead => lead.brand_id === brand.id);
      const brandApps = applications.filter(app => app.brand_id === brand.id);
      
      brandPerformance[brand.id] = {
        leads: brandLeads.length,
        applications: brandApps.length,
        conversionRate: brandLeads.length > 0 ? (brandApps.length / brandLeads.length) * 100 : 0,
        revenue: brandApps.reduce((sum, app) => sum + (app.coverage_amount || 0), 0)
      };
    }

    // Calculate overall stats
    const todayLeads = leads.length;
    const todayApplications = applications.length;
    const conversionRate = todayLeads > 0 ? (todayApplications / todayLeads) * 100 : 0;
    const totalRevenue = applications.reduce((sum, app) => sum + (app.coverage_amount || 0), 0);
    const activeLeads = leads.filter(lead => lead.status === 'active').length;
    const abandonedLeads = leads.filter(lead => lead.status === 'abandoned').length;

    // Get recent leads (no join)
    const { data: recentLeadsRaw } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    // Attach brand info manually to mimic join shape
    const brandMap = new Map((brands || []).map((b: any) => [b.id, b]));
    const recentLeads = (recentLeadsRaw || []).map((lead: any) => ({
      ...lead,
      brands: brandMap.has(lead.brand_id)
        ? {
            brand_name: brandMap.get(lead.brand_id)!.brand_name,
            domain: brandMap.get(lead.brand_id)!.domain,
            primary_color: brandMap.get(lead.brand_id)!.primary_color,
          }
        : null,
    }));

    const dashboardData = {
      stats: {
        todayLeads,
        todayApplications,
        conversionRate,
        activeLeads,
        abandonedLeads,
        totalRevenue,
        brandPerformance
      },
      brands,
      recentLeads: recentLeads || []
    };

    console.log('✅ Dashboard data prepared:', {
      leads: todayLeads,
      applications: todayApplications,
      brands: brands?.length || 0
    });

    return NextResponse.json({
      success: true,
      data: dashboardData
    });

  } catch (error) {
    console.error('💥 Dashboard API error:', error);
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

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

    // Build queries with brand filter
    let leadsQuery = supabaseAdmin
      .from('leads')
      .select(`
        *,
        brands (brand_name, domain, primary_color)
      `)
      .gte('created_at', startDate);
    
    let appsQuery = supabaseAdmin
      .from('applications')
      .select('*')
      .gte('created_at', startDate);

    if (selectedBrand !== 'all') {
      leadsQuery = leadsQuery.eq('brand_id', selectedBrand);
      appsQuery = appsQuery.eq('brand_id', selectedBrand);
    }

    // Get leads and applications data
    const [leadsResult, appsResult] = await Promise.all([
      leadsQuery,
      appsQuery
    ]);

    if (leadsResult.error) {
      console.error('❌ Leads error:', leadsResult.error);
      throw leadsResult.error;
    }
    if (appsResult.error) {
      console.error('❌ Applications error:', appsResult.error);
      throw appsResult.error;
    }

    const leads = leadsResult.data || [];
    const applications = appsResult.data || [];

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

    // Get recent leads
    const { data: recentLeads } = await supabaseAdmin
      .from('leads')
      .select(`
        *,
        brands (brand_name, domain, primary_color)
      `)
      .order('created_at', { ascending: false })
      .limit(10);

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

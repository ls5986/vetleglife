'use client';

import { useState, useEffect } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { formatDate, formatCurrency, calculateConversionRate } from '@/lib/utils';

import { Eye, Phone, Mail, UserPlus, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, DollarSign, Target, BarChart3 } from 'lucide-react';

import Link from 'next/link';

interface DashboardStats {
  todayLeads: number;
  todayApplications: number;
  conversionRate: number;
  activeLeads: number;
  abandonedLeads: number;
  totalRevenue: number;
  brandPerformance: {
    [brandId: string]: {
      leads: number;
      applications: number;
      conversionRate: number;
      revenue: number;
    };
  };
}

interface Lead {
  id: string;
  session_id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  military_status?: string;
  branch_of_service?: string;
  company_stage?: string;
  funding_raised?: string;
  coverage_amount: number;
  current_step: number;
  status: string;
  lead_score: number;
  lead_grade: string;
  last_activity_at: string;
  utm_source: string;
  utm_campaign: string;
  brands: {
    brand_name: string;
    domain: string;
    primary_color: string;
  };
}

interface Brand {
  id: string;
  brand_name: string;
  domain: string;
  primary_color: string;
  is_active: boolean;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    todayLeads: 0,
    todayApplications: 0,
    conversionRate: 0,
    activeLeads: 0,
    abandonedLeads: 0,
    totalRevenue: 0,
    brandPerformance: {}
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('today');

  useEffect(() => {
    loadDashboardData();
    loadBrands();
  }, [selectedBrand, timeRange]);

  const loadBrands = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('brand_name');
      
      if (error) throw error;
      setBrands(data || []);
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
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

      if (leadsResult.error) throw leadsResult.error;
      if (appsResult.error) throw appsResult.error;

      const leads = leadsResult.data || [];
      const applications = appsResult.data || [];

      // Calculate brand performance
      const brandPerformance: { [brandId: string]: any } = {};
      
      for (const brand of brands) {
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

      
      // Get active and abandoned leads
      const activeLeads = leads.filter(lead => lead.status === 'active').length;
      const abandonedLeads = leads.filter(lead => lead.status === 'abandoned').length;


      setStats({
        todayLeads,
        todayApplications,
        conversionRate,
        activeLeads,
        abandonedLeads,
        totalRevenue,
        brandPerformance
      });

      // Get recent leads
      const { data: recentLeadsData } = await supabaseAdmin
        .from('leads')
        .select(`
          *,
          brands (brand_name, domain, primary_color)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentLeads(recentLeadsData || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const getLeadGradeColor = (grade: string) => {
    switch (grade?.toLowerCase()) {
      case 'a': return 'bg-green-100 text-green-800';
      case 'b': return 'bg-blue-100 text-blue-800';
      case 'c': return 'bg-yellow-100 text-yellow-800';
      case 'd': return 'bg-orange-100 text-orange-800';
      case 'f': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBrandSpecificField = (lead: Lead) => {
    if (lead.military_status) {
      return `${lead.military_status}${lead.branch_of_service ? ` - ${lead.branch_of_service}` : ''}`;
    }
    if (lead.company_stage) {
      return `${lead.company_stage}${lead.funding_raised ? ` - ${lead.funding_raised}` : ''}`;
    }
    return 'N/A';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Management Dashboard</h1>
            <p className="text-gray-600">Monitor and manage leads across all brands</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.brand_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={loadDashboardData} disabled={loading}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayLeads}</div>
              <p className="text-xs text-muted-foreground">
                {timeRange === 'today' ? 'Today' : timeRange === 'week' ? 'This week' : 'This month'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayApplications}</div>
              <p className="text-xs text-muted-foreground">
                {stats.conversionRate.toFixed(1)}% conversion rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeLeads}</div>
              <p className="text-xs text-muted-foreground">
                {stats.abandonedLeads} abandoned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                Potential coverage value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Brand Performance */}
        {selectedBrand === 'all' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Brand Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {brands.map((brand) => {
                  const performance = stats.brandPerformance[brand.id] || {
                    leads: 0,
                    applications: 0,
                    conversionRate: 0,
                    revenue: 0
                  };
                  
                  return (
                    <div
                      key={brand.id}
                      className="p-4 border rounded-lg"
                      style={{ borderColor: brand.primary_color + '20' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold" style={{ color: brand.primary_color }}>
                          {brand.brand_name}
                        </h3>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: brand.primary_color }}
                        />
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Leads:</span>
                          <span className="font-semibold">{performance.leads}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Applications:</span>
                          <span className="font-semibold">{performance.applications}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Conversion:</span>
                          <span className="font-semibold">{performance.conversionRate.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue:</span>
                          <span className="font-semibold">{formatCurrency(performance.revenue)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Recent Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="space-y-4">
                {recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: lead.brands?.primary_color || '#6b7280' }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">
                            {lead.first_name} {lead.last_name}
                          </h3>
                          <Badge className={getLeadGradeColor(lead.lead_grade)}>
                            Grade {lead.lead_grade || 'N/A'}
                          </Badge>
                          <Badge variant="outline">
                            Score: {lead.lead_score || 0}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center space-x-4">
                            <span>{lead.email}</span>
                            <span>{lead.phone}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span>Brand: {lead.brands?.brand_name || 'Unknown'}</span>
                            <span>Step: {lead.current_step}/19</span>
                            <span>Coverage: {formatCurrency(lead.coverage_amount)}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span>Field: {getBrandSpecificField(lead)}</span>
                            <span>Source: {lead.utm_source || 'Direct'}</span>
                            <span>Campaign: {lead.utm_campaign || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDate, formatCurrency } from '@/lib/utils';
import { Search, Filter, Eye, Phone, Mail, Download, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Lead {
  id: string;
  session_id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  military_status?: string;
  branch_of_service?: string;
  current_step: number;
  status: string;
  lead_score: number;
  lead_grade: string | null;
  coverage_amount: number | null;
  last_activity_at: string;
  brand_id: string;
  brands: {
    brand_name: string;
    domain: string;
    primary_color: string;
  };
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [brandFilter, setBrandFilter] = useState('all');
  const [brands, setBrands] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚀 Loading all data...');
      
      // Load brands and leads in parallel
      const [brandsResult, leadsResult] = await Promise.all([
        supabase
          .from('brands')
          .select('*')
          .eq('is_active', true)
          .order('brand_name'),
        
        supabase
          .from('leads')
          .select(`
            *,
            brands (brand_name, domain, primary_color)
          `)
          .order('created_at', { ascending: false })
      ]);

      // Handle brands
      if (brandsResult.error) {
        console.error('❌ Brands error:', brandsResult.error);
        throw new Error(`Failed to load brands: ${brandsResult.error.message}`);
      }
      
      // Handle leads
      if (leadsResult.error) {
        console.error('❌ Leads error:', leadsResult.error);
        throw new Error(`Failed to load leads: ${leadsResult.error.message}`);
      }

      setBrands(brandsResult.data || []);
      setLeads(leadsResult.data || []);
      
      console.log('✅ Data loaded successfully:', {
        brands: brandsResult.data?.length || 0,
        leads: leadsResult.data?.length || 0
      });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('💥 Critical error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getLeadGradeColor = (grade: string | null) => {
    if (!grade) return 'bg-gray-100 text-gray-800';
    switch (grade.toLowerCase()) {
      case 'a': return 'bg-green-100 text-green-800';
      case 'b': return 'bg-blue-100 text-blue-800';
      case 'c': return 'bg-yellow-100 text-yellow-800';
      case 'd': return 'bg-orange-100 text-orange-800';
      case 'f': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'abandoned': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter leads based on search and filters
  const filteredLeads = leads.filter(lead => {
    // Status filter
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    
    // Brand filter
    if (brandFilter !== 'all' && lead.brand_id !== brandFilter) return false;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        (lead.first_name?.toLowerCase().includes(searchLower)) ||
        (lead.last_name?.toLowerCase().includes(searchLower)) ||
        (lead.email?.toLowerCase().includes(searchLower)) ||
        (lead.phone?.includes(searchTerm)) ||
        (lead.session_id?.toLowerCase().includes(searchLower)) ||
        (lead.military_status?.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  const exportLeads = () => {
    const csvContent = [
      ['Session ID', 'Name', 'Email', 'Phone', 'Brand', 'Status', 'Step', 'Grade', 'Score', 'Coverage', 'Created'],
      ...filteredLeads.map(lead => [
        lead.session_id,
        `${lead.first_name || ''} ${lead.last_name || ''}`.trim() || 'Anonymous',
        lead.email || 'No email',
        lead.phone || 'No phone',
        lead.brands?.brand_name || 'Unknown',
        lead.status,
        lead.current_step,
        lead.lead_grade || 'N/A',
        lead.lead_score || 0,
        lead.coverage_amount ? formatCurrency(lead.coverage_amount) : 'N/A',
        formatDate(lead.created_at)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Data</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadData} className="bg-red-600 hover:bg-red-700">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600">View and manage all leads across brands</p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={loadData} variant="outline" className="flex items-center space-x-2">
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
          <Button onClick={exportLeads} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {leads.filter(l => l.status === 'converted').length}
            </div>
            <div className="text-sm text-gray-600">Converted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {brands.length}
            </div>
            <div className="text-sm text-gray-600">Active Brands</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
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
            <div className="text-sm text-gray-600 flex items-center">
              Showing {filteredLeads.length} of {leads.length} leads
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leads ({filteredLeads.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' || brandFilter !== 'all' 
                  ? 'No leads match the current filters' 
                  : 'No leads found in the system'}
              </p>
              {leads.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Try adjusting your filters or search terms
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LEAD
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      BRAND
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STATUS
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STEP
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      GRADE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      COVERAGE
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CREATED
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {lead.first_name || lead.last_name ? `${lead.first_name || ''} ${lead.last_name || ''}`.trim() : 'Anonymous'}
                          </div>
                          <div className="text-sm text-gray-500">{lead.email || 'No email'}</div>
                          <div className="text-sm text-gray-500">{lead.phone || 'No phone'}</div>
                          <div className="text-xs text-gray-400">Session: {lead.session_id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: lead.brands?.primary_color || '#6b7280' }}
                          />
                          <span className="text-sm text-gray-900">
                            {lead.brands?.brand_name || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Step {lead.current_step}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getLeadGradeColor(lead.lead_grade)}>
                          {lead.lead_grade || 'N/A'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {lead.coverage_amount ? formatCurrency(lead.coverage_amount) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link href={`/admin/leads/${lead.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

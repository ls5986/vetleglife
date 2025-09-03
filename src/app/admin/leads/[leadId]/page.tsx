'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatCurrency } from '@/lib/utils';
import { ArrowLeft, Eye, Phone, Mail, Edit, Save, X, User, Calendar, Target, Shield } from 'lucide-react';

interface Lead {
  id: string;
  session_id: string;
  created_at: string;
  updated_at: string;
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
  domain: string;
  form_data?: any;
  brands: {
    brand_name: string;
    domain: string;
    primary_color: string;
  };
}

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.leadId as string;
  
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => {
    if (leadId) {
      loadLeadData();
    }
  }, [leadId]);

  const loadLeadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use the dedicated individual lead API endpoint
      const response = await fetch(`/api/admin/leads/${leadId}`);
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to load lead data');
      }

      setLead(result.data);
      setEditData({
        status: result.data.status,
        lead_score: result.data.lead_score,
        lead_grade: result.data.lead_grade
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('Error loading lead:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // Update the lead using the API
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updateData: editData }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to update lead');
      }

      // Update local state with the updated lead
      setLead(result.data);
      setIsEditing(false);

    } catch (error) {
      console.error('Error saving lead:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditData({
      status: lead?.status || '',
      lead_score: lead?.lead_score || 0,
      lead_grade: lead?.lead_grade || ''
    });
    setIsEditing(false);
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

  const renderFormData = (formData: any) => {
    if (!formData) return null;

    const sections = [
      {
        title: 'Personal Information',
        icon: User,
        fields: [
          { key: 'date_of_birth', label: 'Date of Birth' },
          { key: 'street_address', label: 'Street Address' },
          { key: 'city', label: 'City' },
          { key: 'state', label: 'State' },
          { key: 'zip_code', label: 'ZIP Code' },
          { key: 'drivers_license', label: 'Driver\'s License' },
          { key: 'ssn', label: 'SSN' }
        ]
      },
      {
        title: 'Medical Information',
        icon: Shield,
        fields: [
          { key: 'height', label: 'Height' },
          { key: 'weight', label: 'Weight' },
          { key: 'tobacco_use', label: 'Tobacco Use' },
          { key: 'medical_conditions', label: 'Medical Conditions' },
          { key: 'hospital_care', label: 'Hospital Care' },
          { key: 'diabetes_medication', label: 'Diabetes Medication' }
        ]
      },
      {
        title: 'Financial & Coverage',
        icon: Target,
        fields: [
          { key: 'coverage_amount', label: 'Coverage Amount' },
          { key: 'bank_name', label: 'Bank Name' },
          { key: 'routing_number', label: 'Routing Number' },
          { key: 'account_number', label: 'Account Number' },
          { key: 'policy_date', label: 'Policy Date' }
        ]
      },
      {
        title: 'Beneficiary Information',
        icon: User,
        fields: [
          { key: 'beneficiary_name', label: 'Beneficiary Name' },
          { key: 'beneficiary_relationship', label: 'Relationship' }
        ]
      },
      {
        title: 'Consent & Tracking',
        icon: Calendar,
        fields: [
          { key: 'transactional_consent', label: 'Transactional Consent' },
          { key: 'marketing_consent', label: 'Marketing Consent' },
          { key: 'exit_intent', label: 'Exit Intent' },
          { key: 'utm_source', label: 'UTM Source' },
          { key: 'utm_campaign', label: 'UTM Campaign' }
        ]
      }
    ];

    return sections.map((section, sectionIndex) => (
      <Card key={sectionIndex}>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <section.icon className="h-5 w-5 mr-2" />
            {section.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.fields.map((field) => {
              const value = formData[field.key];
              if (value === undefined || value === null || value === '') return null;
              
              let displayValue = value;
              if (typeof value === 'boolean') {
                displayValue = value ? 'Yes' : 'No';
              } else if (Array.isArray(value)) {
                displayValue = value.join(', ');
              }
              
              return (
                <div key={field.key}>
                  <label className="text-sm font-medium text-gray-500">{field.label}</label>
                  <p className="text-sm font-medium text-gray-900">{displayValue}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    ));
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-600">Loading lead details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error Loading Lead</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.back()} className="bg-red-600 hover:bg-red-700">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-600">Lead not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Leads</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
            <p className="text-gray-600">Session: {lead.session_id}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setIsEditing(!isEditing)} variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? 'Cancel Edit' : 'Edit Lead'}
          </Button>
          {isEditing && (
            <>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Lead Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="text-sm">{lead.first_name && lead.last_name ? `${lead.first_name} ${lead.last_name}` : 'Anonymous'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-sm">{lead.email || 'No email'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-sm">{lead.phone || 'No phone'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Brand</label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: lead.brands?.primary_color || '#6b7280' }}
                />
                <span className="text-sm">{lead.brands?.brand_name || 'Unknown'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              {isEditing ? (
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="abandoned">Abandoned</option>
                </select>
              ) : (
                <Badge className={getStatusColor(lead.status)}>
                  {lead.status}
                </Badge>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Current Step</label>
              <p className="text-sm">Step {lead.current_step}/19</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Lead Score</label>
              {isEditing ? (
                <input
                  type="number"
                  value={editData.lead_score}
                  onChange={(e) => setEditData({...editData, lead_score: parseInt(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              ) : (
                <p className="text-sm">{lead.lead_score || 0}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Lead Grade</label>
              {isEditing ? (
                <select
                  value={editData.lead_grade || ''}
                  onChange={(e) => setEditData({...editData, lead_grade: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">No Grade</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              ) : (
                <Badge className={getLeadGradeColor(lead.lead_grade)}>
                  {lead.lead_grade || 'N/A'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Coverage & Timing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Coverage Amount</label>
              <p className="text-sm font-semibold">
                {lead.coverage_amount ? formatCurrency(lead.coverage_amount) : 'Not specified'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Created</label>
              <p className="text-sm">{formatDate(lead.created_at)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Last Updated</label>
              <p className="text-sm">{formatDate(lead.updated_at)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Last Activity</label>
              <p className="text-sm">{formatDate(lead.last_activity_at)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Military Information */}
      {(lead.military_status || lead.branch_of_service) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Military Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lead.military_status && (
              <div>
                <label className="text-sm font-medium text-gray-500">Military Status</label>
                <p className="text-sm">{lead.military_status}</p>
              </div>
            )}
            {lead.branch_of_service && (
              <div>
                <label className="text-sm font-medium text-gray-500">Branch of Service</label>
                <p className="text-sm">{lead.branch_of_service}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Form Data - Funnel Responses */}
      {lead.form_data && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Funnel Responses</h2>
          {renderFormData(lead.form_data)}
        </div>
      )}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Call Lead</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>View Full Application</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

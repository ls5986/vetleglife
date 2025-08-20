'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBrandById, type Brand } from '@/config/brands';
import { supabase } from '@/lib/supabase';
import { getUrlParam, getDeviceType, getBrowser, getClientIP } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, Mail, Shield, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  coverageAmount: string;
  // Custom fields based on brand
  [key: string]: any;
}

export default function BrandFunnel() {
  const params = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    coverageAmount: ''
  });
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');
  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    if (params.brandId) {
      const brandData = getBrandById(params.brandId as string);
      if (brandData) {
        setBrand(brandData);
        initializeTracking(brandData);
      }
      setLoading(false);
    }
  }, [params.brandId]);

  const initializeTracking = async (brandData: Brand) => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    // Get brand ID from Supabase
    const { data: brandRecord } = await supabase
      .from('brands')
      .select('id')
      .eq('domain', brandData.domain)
      .single();
    
    if (brandRecord) {
      // Create initial lead record
      const leadData = {
        session_id: newSessionId,
        brand_id: brandRecord.id,
        domain: brandData.domain,
        current_step: 1,
        completed_steps: [],
        form_data: {},
        status: 'active',
        last_activity_at: new Date().toISOString(),
        
        // Attribution tracking
        landing_page: window.location.href,
        referrer: document.referrer,
        utm_source: getUrlParam('utm_source'),
        utm_medium: getUrlParam('utm_medium'),
        utm_campaign: getUrlParam('utm_campaign'),
        utm_content: getUrlParam('utm_content'),
        utm_term: getUrlParam('utm_term'),
        fbclid: getUrlParam('fbclid'),
        gclid: getUrlParam('gclid'),
        
        // Technical data
        ip_address: await getClientIP(),
        user_agent: navigator.userAgent,
        device_type: getDeviceType(),
        browser: getBrowser(),
        screen_resolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      const { data: lead } = await supabase
        .from('leads')
        .insert(leadData)
        .select()
        .single();

      if (lead) {
        setLeadId(lead.id);
        localStorage.setItem('leadId', lead.id);
        localStorage.setItem('sessionId', newSessionId);
      }
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const saveLead = async () => {
    if (!brand || !leadId) return;

    try {
      const leadData = {
        current_step: currentStep,
        completed_steps: Array.from({length: currentStep - 1}, (_, i) => i + 1),
        form_data: formData,
        last_activity_at: new Date().toISOString(),
        
        // Extract fields from formData
        first_name: formData.firstName || null,
        last_name: formData.lastName || null,
        email: formData.email || null,
        phone: formData.phone || null,
        state: formData.state || null,
        coverage_amount: formData.coverageAmount ? parseInt(formData.coverageAmount) : null,
        
        // Custom fields based on brand
        ...Object.fromEntries(
          Object.entries(formData).filter(([key]) => 
            !['firstName', 'lastName', 'email', 'phone', 'state', 'coverageAmount'].includes(key)
          )
        )
      };

      await supabase
        .from('leads')
        .update(leadData)
        .eq('id', leadId);

    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  useEffect(() => {
    if (brand && leadId && currentStep > 0) {
      saveLead();
    }
  }, [formData, currentStep, brand, leadId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
          <p className="text-gray-600 mb-4">The requested brand could not be found.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900" style={{ color: brand.primaryColor }}>
                {brand.brandName}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {brand.sellingPoint}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {brand.tagline}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: brand.primaryColor }} />
                  <h3 className="font-semibold mb-2">Comprehensive Protection</h3>
                  <p className="text-sm text-gray-600">Complete coverage tailored to your needs</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4" style={{ color: brand.primaryColor }} />
                  <h3 className="font-semibold mb-2">Family Security</h3>
                  <p className="text-sm text-gray-600">Protect your loved ones' future</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4" style={{ color: brand.primaryColor }} />
                  <h3 className="font-semibold mb-2">Wealth Building</h3>
                  <p className="text-sm text-gray-600">Grow your legacy over time</p>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              onClick={nextStep}
              size="lg"
              style={{ 
                backgroundColor: brand.primaryColor,
                borderColor: brand.primaryColor 
              }}
            >
              Get Your Free Quote
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Information</h2>
              <p className="text-gray-600">Let's get started with your personalized quote</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateFormData({ firstName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                style={{ 
                  backgroundColor: brand.primaryColor,
                  borderColor: brand.primaryColor 
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Coverage Amount</h2>
              <p className="text-gray-600">How much coverage do you need?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['$250,000', '$500,000', '$750,000', '$1,000,000', '$1,500,000', '$2,000,000'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => updateFormData({ coverageAmount: amount })}
                  className={`p-4 border rounded-lg text-center transition-colors ${
                    formData.coverageAmount === amount
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{amount}</div>
                  <div className="text-sm text-gray-500">Coverage</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!formData.coverageAmount}
                style={{ 
                  backgroundColor: brand.primaryColor,
                  borderColor: brand.primaryColor 
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">State of Residence</h2>
              <p className="text-gray-600">Where do you currently live?</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={formData.state}
                onChange={(e) => updateFormData({ state: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your state</option>
                {[
                  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
                  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
                  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
                  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
                  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
                  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
                  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
                  'Wisconsin', 'Wyoming'
                ].map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!formData.state}
                style={{ 
                  backgroundColor: brand.primaryColor,
                  borderColor: brand.primaryColor 
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Your Quote</h2>
              <p className="text-gray-600">A licensed agent will contact you within 24 hours</p>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Your Information</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>State:</strong> {formData.state}</p>
                  <p><strong>Coverage:</strong> {formData.coverageAmount}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Thank you for your interest in {brand.brandName}. A licensed insurance agent will contact you within 24 hours to provide your personalized quote.
              </p>
              
              <div className="flex justify-center space-x-4">
                <a href={`tel:${brand.phone}`}>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={`mailto:${brand.email}`}>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Us
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Link href="/">
                <Button variant="outline">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Brands
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold" style={{ color: brand.primaryColor }}>
                  {brand.brandName}
                </h1>
                <p className="text-sm text-gray-500">{brand.tagline}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" style={{ color: brand.primaryColor, borderColor: brand.primaryColor }}>
                Step {currentStep} of 5
              </Badge>
              <a href={`tel:${brand.phone}`} className="text-gray-500 hover:text-gray-700">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-gray-200 h-2">
            <div 
              className="h-2 transition-all duration-300"
              style={{ 
                width: `${(currentStep / 5) * 100}%`,
                backgroundColor: brand.primaryColor 
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}
      </div>
    </div>
  );
} 
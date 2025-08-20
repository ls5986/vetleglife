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

      try {
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadData })
        });

        const result = await response.json();
        if (result.success && result.data) {
          setLeadId(result.data.id);
          localStorage.setItem('leadId', result.data.id);
          localStorage.setItem('sessionId', newSessionId);
        }
      } catch (error) {
        console.error('Error creating lead:', error);
      }
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const maxSteps = brand?.id === 'veteran-legacy-life' ? 19 : 5;
    if (currentStep < maxSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderVeteranStep = () => {
    if (!brand) return null;
    
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What state do you live in?</h2>
              <p className="text-gray-600">We'll help you find the best rates in your area</p>
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

      case 3:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What is your military status?</h2>
              <p className="text-gray-600">This helps us find the best veteran-specific benefits</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['Veteran', 'Active Duty', 'Reserves', 'National Guard', 'Retired', 'Not Military'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    updateFormData({ militaryStatus: status });
                    setTimeout(nextStep, 600);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.militaryStatus === status
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{status}</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What branch did you serve in?</h2>
              <p className="text-gray-600">Different branches may have different benefits available</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force', 'Multiple Branches', 'Not Applicable'].map((branch) => (
                <button
                  key={branch}
                  onClick={() => {
                    updateFormData({ branchOfService: branch });
                    setTimeout(nextStep, 600);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.branchOfService === branch
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{branch}</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">What is your marital status?</h2>
              <p className="text-gray-600">This helps us understand your family situation</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['Single', 'Married', 'Divorced', 'Widowed', 'Separated'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    updateFormData({ maritalStatus: status });
                    setTimeout(nextStep, 600);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.maritalStatus === status
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{status}</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">When is your birthday?</h2>
              <p className="text-gray-600">This helps us calculate your rates</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
                <select
                  value={formData.birthMonth || ''}
                  onChange={(e) => updateFormData({ birthMonth: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Month</option>
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                <select
                  value={formData.birthDay || ''}
                  onChange={(e) => updateFormData({ birthDay: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Day</option>
                  {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <select
                  value={formData.birthYear || ''}
                  onChange={(e) => updateFormData({ birthYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Year</option>
                  {Array.from({length: 50}, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!formData.birthMonth || !formData.birthDay || !formData.birthYear}
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

      case 7:
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

      case 8:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Do you use tobacco products?</h2>
              <p className="text-gray-600">This affects your rates</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['No', 'Yes'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateFormData({ tobaccoUse: option === 'Yes' });
                    setTimeout(nextStep, 600);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.tobaccoUse === (option === 'Yes')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{option}</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Do you have any medical conditions?</h2>
              <p className="text-gray-600">Select all that apply</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                'None', 'Diabetes', 'Heart Disease', 'Cancer', 'High Blood Pressure', 
                'Asthma', 'Depression', 'Anxiety', 'Other'
              ].map((condition) => (
                <button
                  key={condition}
                  onClick={() => {
                    if (condition === 'None') {
                      updateFormData({ medicalConditions: [] });
                    } else {
                      const current = formData.medicalConditions || [];
                      const updated = current.includes(condition) 
                        ? current.filter((c: string) => c !== condition)
                        : [...current, condition];
                      updateFormData({ medicalConditions: updated });
                    }
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    condition === 'None' 
                      ? (formData.medicalConditions?.length === 0 ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400')
                      : (formData.medicalConditions?.includes(condition) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400')
                  }`}
                >
                  <div className="font-semibold">{condition}</div>
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

      case 10:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Height & Weight</h2>
              <p className="text-gray-600">This helps us calculate your rates</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                <select
                  value={formData.height || ''}
                  onChange={(e) => updateFormData({ height: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select height</option>
                  {Array.from({length: 48}, (_, i) => {
                    const feet = Math.floor(i / 12) + 4;
                    const inches = i % 12;
                    return `${feet}'${inches}"`;
                  }).map(height => (
                    <option key={height} value={height}>{height}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
                <input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => updateFormData({ weight: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="150"
                  min="50"
                  max="500"
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
                disabled={!formData.height || !formData.weight}
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

      case 11:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Have you been hospitalized in the last 5 years?</h2>
              <p className="text-gray-600">This helps us understand your health history</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['No', 'Yes'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateFormData({ hospitalCare: option === 'Yes' });
                    setTimeout(nextStep, 600);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.hospitalCare === (option === 'Yes')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{option}</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Do you take diabetes medication?</h2>
              <p className="text-gray-600">This affects your rates</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['No', 'Yes'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateFormData({ diabetesMedication: option === 'Yes' });
                    setTimeout(nextStep, 600);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.diabetesMedication === (option === 'Yes')
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{option}</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        );

      case 13:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Loading Your Personalized Quote...</h2>
              <p className="text-gray-600">Please wait while we calculate your rates</p>
            </div>
            
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">This may take a few moments...</p>
            </div>
          </div>
        );

      case 14:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized IUL Quote</h2>
              <p className="text-gray-600">Based on your information, here's what we found for you</p>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-blue-600">$500,000 Coverage</h3>
                  <p className="text-lg text-gray-600">Indexed Universal Life Insurance</p>
                  <div className="text-3xl font-bold text-green-600">$127/month</div>
                  <p className="text-sm text-gray-500">Estimated premium based on your profile</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                This quote includes veteran-specific benefits and competitive rates. 
                A licensed agent will contact you to finalize your policy.
              </p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(12)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
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

      case 15:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">How much coverage do you need?</h2>
              <p className="text-gray-600">Choose the amount that fits your family's needs</p>
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

      case 16:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Would you like to speak with a licensed agent?</h2>
              <p className="text-gray-600">Get personalized guidance for your policy</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {['Yes, call me now', 'Yes, but later', 'No, I prefer to continue online'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    updateFormData({ agentPreference: option });
                    setTimeout(nextStep, 600);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.agentPreference === option
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{option}</div>
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Additional Information</h2>
              <p className="text-gray-600">Help us provide the best service</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={formData.streetAddress || ''}
                  onChange={(e) => updateFormData({ streetAddress: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => updateFormData({ city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Anytown"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zipCode || ''}
                    onChange={(e) => updateFormData({ zipCode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
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

      case 18:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Submit Your Application</h2>
              <p className="text-gray-600">Review your information and submit</p>
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
                  <p><strong>Military Status:</strong> {formData.militaryStatus}</p>
                  <p><strong>Branch:</strong> {formData.branchOfService}</p>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={nextStep}
                style={{ 
                  backgroundColor: brand.primaryColor,
                  borderColor: brand.primaryColor 
                }}
              >
                Submit Application
              </Button>
            </div>
          </div>
        );

      case 19:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h2>
              <p className="text-gray-600">Your application has been submitted successfully</p>
            </div>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold mb-2">Thank you, {formData.firstName}!</h3>
                <p className="text-gray-600 mb-4">
                  A licensed insurance agent will contact you within 24 hours to finalize your policy.
                </p>
                <div className="text-2xl font-bold text-green-600 mb-2">{formData.coverageAmount} Coverage</div>
                <p className="text-sm text-gray-500">Your personalized quote is ready</p>
              </CardContent>
            </Card>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Thank you for your service and for choosing {brand.brandName}. 
                We're here to help secure your family's future.
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

  const saveLead = async () => {
    if (!brand || !leadId) return;

    try {
      const leadData = {
        id: leadId,
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

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadData })
      });

      const result = await response.json();
      if (!result.success) {
        console.error('Error saving lead:', result.error);
      }
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
    // Special handling for veteran brand - show full 19-step funnel
    if (brand.id === 'veteran-legacy-life') {
      return renderVeteranStep();
    }
    
    // Default 5-step funnel for other brands
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
                 Step {currentStep} of {brand?.id === 'veteran-legacy-life' ? 19 : 5}
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
                width: `${(currentStep / (brand?.id === 'veteran-legacy-life' ? 19 : 5)) * 100}%`,
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
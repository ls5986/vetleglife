'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import EntryChoiceStep from './funnel-steps/EntryChoiceStep';
import BrandSpecificStep from './funnel-steps/BrandSpecificStep';
import ContactInfoStep from './funnel-steps/ContactInfoStep';
import AgeCoverageStep from './funnel-steps/AgeCoverageStep';
import PolicyRecommendationStep from './funnel-steps/PolicyRecommendationStep';
import AgentHandoffStep from './funnel-steps/AgentHandoffStep';

interface UniversalFunnelProps {
  brand: any;
  onComplete: (data: any) => void;
  onContactOnly: (data: any) => void;
}

interface FormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  
  // Policy Information
  age: string;
  coverageAmount: string;
  policyType: string;
  
  // Brand-specific fields (dynamic)
  [key: string]: any;
}

const UniversalFunnel: React.FC<UniversalFunnelProps> = ({ 
  brand, 
  onComplete, 
  onContactOnly 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: '',
    age: '',
    coverageAmount: '',
    policyType: ''
  });
  const [sessionId, setSessionId] = useState<string>('');
  const [leadId, setLeadId] = useState<string | null>(null);

  // Initialize tracking
  useEffect(() => {
    initializeTracking();
  }, []);

  // Save lead on form changes
  useEffect(() => {
    if (sessionId && currentStep > 0) {
      saveLead();
    }
  }, [formData, currentStep, sessionId]);

  const initializeTracking = async () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    const { data: brandRecord } = await supabase
      .from('brands')
      .select('id')
      .eq('domain', brand.domain)
      .single();
    
    if (brandRecord) {
      const leadData = {
        session_id: newSessionId,
        brand_id: brandRecord.id,
        domain: brand.domain,
        current_step: 1,
        completed_steps: [],
        form_data: {},
        status: 'active',
        last_activity_at: new Date().toISOString(),
        landing_page: window.location.href,
        referrer: document.referrer,
        utm_source: getUrlParam('utm_source'),
        utm_medium: getUrlParam('utm_medium'),
        utm_campaign: getUrlParam('utm_campaign'),
        utm_content: getUrlParam('utm_content'),
        utm_term: getUrlParam('utm_term'),
        fbclid: getUrlParam('fbclid'),
        gclid: getUrlParam('gclid'),
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

  const saveLead = async () => {
    if (!brand || !leadId) return;

    try {
      const leadData = {
        id: leadId,
        current_step: currentStep,
        completed_steps: Array.from({length: currentStep - 1}, (_, i) => i + 1),
        form_data: formData,
        last_activity_at: new Date().toISOString(),
        first_name: formData.firstName || null,
        last_name: formData.lastName || null,
        email: formData.email || null,
        phone: formData.phone || null,
        state: formData.state || null,
        coverage_amount: formData.coverageAmount ? parseInt(formData.coverageAmount) : null,
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

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const getPolicyRecommendation = () => {
    const age = parseInt(formData.age);
    const coverage = parseInt(formData.coverageAmount);
    
    if (age < 30 && coverage < 500000) {
      return { type: 'Term Life', reason: 'Young age and moderate coverage needs' };
    } else if (age < 50 && coverage >= 500000) {
      return { type: 'IUL', reason: 'Good age for wealth building with higher coverage' };
    } else if (age >= 50) {
      return { type: 'EOL', reason: 'Simplified underwriting for older applicants' };
    }
    return { type: 'Term Life', reason: 'Standard recommendation' };
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EntryChoiceStep brand={brand} onContactOnly={onContactOnly} onContinue={nextStep} />;
      
      case 2:
        return <BrandSpecificStep 
          brand={brand} 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={nextStep} 
          onBack={prevStep}
        />;
      
      case 3:
        return <ContactInfoStep 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={nextStep} 
          onBack={prevStep}
        />;
      
      case 4:
        return <AgeCoverageStep 
          formData={formData} 
          updateFormData={updateFormData} 
          onNext={nextStep} 
          onBack={prevStep}
        />;
      
      case 5:
        return <PolicyRecommendationStep 
          formData={formData} 
          recommendation={getPolicyRecommendation()}
          onNext={nextStep} 
          onBack={prevStep}
        />;
      
      case 6:
        return <AgentHandoffStep 
          brand={brand}
          formData={formData}
          onComplete={onComplete}
          onBack={prevStep}
        />;
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of 6</span>
              <span>{Math.round((currentStep / 6) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getUrlParam = (param: string) => {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get(param);
};

const getClientIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return null;
  }
};

const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/Mobile|Android|iPhone|iPad/.test(userAgent)) return 'mobile';
  if (/Tablet|iPad/.test(userAgent)) return 'tablet';
  return 'desktop';
};

const getBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Other';
};

export default UniversalFunnel; 
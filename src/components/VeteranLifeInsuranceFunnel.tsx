'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Phone, Mail, Calendar, X, AlertCircle } from 'lucide-react';

interface VeteranFormData {
  // Pre-qualification
  state: string;
  militaryStatus: string;
  branchOfService: string;
  maritalStatus: string;
  coverageAmount: string;
  
  // Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  transactionalConsent: boolean;
  marketingConsent: boolean;
  
  // Medical Answers
  tobaccoUse: string;
  medicalConditions: string[];
  height: string;
  weight: string;
  hospitalCare: string;
  diabetesMedication: string;
  
  // Application Data
  streetAddress: string;
  city: string;
  zipCode: string;
  beneficiaryName: string;
  beneficiaryRelationship: string;
  driversLicense: string;
  ssn: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  
  // Quote Data
  policyDate: string;
  
  // Session tracking
  sessionId: string;
  currentStep: number;
  exitIntent: boolean;
  utmSource: string;
  utmCampaign: string;
}

interface VeteranFunnelProps {
  onComplete: (data: VeteranFormData) => void;
  onClose: () => void;
}

const TOTAL_STEPS = 18;

export default function VeteranLifeInsuranceFunnel({ onComplete, onClose }: VeteranFunnelProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [formData, setFormData] = useState<VeteranFormData>({
    state: '',
    militaryStatus: '',
    branchOfService: '',
    maritalStatus: '',
    coverageAmount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    transactionalConsent: false,
    marketingConsent: false,
    tobaccoUse: '',
    medicalConditions: [],
    height: '',
    weight: '',
    hospitalCare: '',
    diabetesMedication: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    beneficiaryName: '',
    beneficiaryRelationship: '',
    driversLicense: '',
    ssn: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    policyDate: '',
    sessionId: generateSessionId(),
    currentStep: 1,
    exitIntent: false,
    utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
    utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
  });

  // Auto-advance timer (3 seconds for welcome, 15 seconds for other steps)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep === 1) {
        // Welcome step - go directly to first question after 3 seconds
        nextStep();
      } else if (currentStep < TOTAL_STEPS && canGoNext()) {
        // Only auto-advance if the current step is complete
        nextStep();
      }
    }, currentStep === 1 ? 3000 : 15000);

    return () => clearTimeout(timer);
  }, [currentStep, formData]);

  // Track progress in database - save partial data on every step
  useEffect(() => {
    updateSessionProgress();
  }, [currentStep, formData]);

  function generateSessionId() {
    return 'veteran_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async function updateSessionProgress() {
    try {
      console.log('📊 Updating session progress:', {
        sessionId: formData.sessionId,
        currentStep,
        stepName: getStepName(currentStep),
        hasEmail: !!formData.email,
        hasPhone: !!formData.phone,
        exitIntent: formData.exitIntent
      });

      const stepName = getStepName(currentStep);
      
      // Parse date of birth into separate fields for the database
      const birthDate = formData.dateOfBirth ? new Date(formData.dateOfBirth) : null;
      const birthMonth = birthDate ? (birthDate.getMonth() + 1).toString() : '';
      const birthDay = birthDate ? birthDate.getDate().toString() : '';
      const birthYear = birthDate ? birthDate.getFullYear().toString() : '';
      
      // Map to exact leads table structure
      const leadData = {
        session_id: formData.sessionId,
        brand_id: 'veteran-legacy-life', // This should be the actual UUID from brands table
        domain: window.location.hostname,
        current_step: currentStep,
        status: currentStep === TOTAL_STEPS ? 'converted' : 'active',
        
        // Basic Information
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        
        // Demographics
        state: formData.state,
        military_status: formData.militaryStatus,
        branch_of_service: formData.branchOfService,
        marital_status: formData.maritalStatus,
        coverage_amount: formData.coverageAmount ? parseInt(formData.coverageAmount.replace(/[^0-9]/g, '')) : null,
        
        // Birth date components
        birth_month: birthMonth,
        birth_day: birthDay,
        birth_year: birthYear,
        
        // Medical information
        height: formData.height,
        weight: formData.weight ? parseInt(formData.weight) : null,
        tobacco_use: formData.tobaccoUse === 'Yes',
        medical_conditions: formData.medicalConditions,
        hospital_care: formData.hospitalCare === 'Yes',
        diabetes_medication: formData.diabetesMedication === 'Yes',
        
        // Address and beneficiary
        street_address: formData.streetAddress,
        city: formData.city,
        zip_code: formData.zipCode,
        beneficiary_name: formData.beneficiaryName,
        beneficiary_relationship: formData.beneficiaryRelationship,
        drivers_license: formData.driversLicense,
        license_state: formData.state, // Using same state as residence
        
        // Financial information
        ssn: formData.ssn,
        bank_name: formData.bankName,
        routing_number: formData.routingNumber,
        account_number: formData.accountNumber,
        policy_date: formData.policyDate,
        
        // Tracking and analytics
        last_activity_at: new Date().toISOString(),
        referrer: document.referrer,
        utm_source: formData.utmSource,
        utm_campaign: formData.utmCampaign,
        user_agent: navigator.userAgent,
        ip_address: null, // Will be set by server
        
        // Store additional data in form_data JSON field
        form_data: {
          transactional_consent: formData.transactionalConsent,
          marketing_consent: formData.marketingConsent,
          exit_intent: formData.exitIntent,
          completed_steps: Array.from({length: currentStep}, (_, i) => i + 1)
        }
      };

      console.log('📤 Sending lead data:', leadData);
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadData })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to update session progress:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          responseHeaders: Object.fromEntries(response.headers.entries())
        });
      } else {
        const result = await response.json();
        console.log('✅ Session progress updated successfully:', {
          sessionId: formData.sessionId,
          currentStep,
          stepName,
          result: result.operation
        });
      }
    } catch (error) {
      console.error('💥 Error updating session progress:', {
        sessionId: formData.sessionId,
        currentStep,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
    }
  }

  function getStepName(step: number): string {
    switch (step) {
      case 1: return 'State Selection';
      case 2: return 'Military Status';
      case 3: return 'Branch of Service';
      case 4: return 'Marital Status';
      case 5: return 'Coverage Amount';
      case 6: return 'Contact Info';
      case 7: return 'Birthday';
      case 8: return 'Tobacco Use';
      case 9: return 'Medical Conditions';
      case 10: return 'Height & Weight';
      case 11: return 'Hospital Care';
      case 12: return 'Diabetes Medication';
      case 13: return 'Loading Screen';
      case 14: return 'Pre-Qualified Success';
      case 15: return 'IUL Quote Modal';
      case 16: return 'Application Step 1';
      case 17: return 'Application Step 2';
      case 18: return 'Final Success';
      default: return `Step ${step}`;
    }
  }

  const updateFormData = (data: Partial<VeteranFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
      updateFormData({ currentStep: currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      updateFormData({ currentStep: currentStep - 1 });
    }
  };

  const canGoNext = () => {
    switch (currentStep) {
      case 1: return !!formData.state;
      case 2: return !!formData.militaryStatus;
      case 3: return !!formData.branchOfService;
      case 4: return !!formData.maritalStatus;
      case 5: return !!formData.coverageAmount;
      case 6: return !!(formData.firstName && formData.lastName && formData.email && formData.phone && formData.transactionalConsent);
      case 7: return !!formData.dateOfBirth;
      case 8: return !!formData.tobaccoUse;
      case 9: return formData.medicalConditions.length > 0;
      case 10: return !!(formData.height && formData.weight);
      case 11: return !!formData.hospitalCare;
      case 12: return !!formData.diabetesMedication;
      case 13: return false; // Loading step
      case 14: return true; // Success step
      case 15: return true; // IUL Quote Modal
      case 16: return !!(formData.streetAddress && formData.city && formData.zipCode && formData.beneficiaryName && formData.beneficiaryRelationship && formData.driversLicense);
      case 17: return !!(formData.ssn && formData.bankName && formData.routingNumber && formData.accountNumber && formData.policyDate);
      case 18: return true; // Final success
      default: return true;
    }
  };

  const handleNext = () => {
    if (canGoNext()) {
      nextStep();
    }
  };

  const handleBack = () => {
    prevStep();
  };

  const handleClose = () => {
    setShowExitIntent(true);
  };

  const handleCancelEverything = () => {
    setShowExitIntent(false);
    onClose(); // This will close the entire funnel
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StateSelectionStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <MilitaryStatusStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <BranchOfServiceStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <MaritalStatusStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <CoverageAmountStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <ContactInfoStep formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <BirthdayStep formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <TobaccoUseStep formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <MedicalConditionsStep formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <HeightWeightStep formData={formData} updateFormData={updateFormData} />;
      case 11:
        return <HospitalCareStep formData={formData} updateFormData={updateFormData} />;
      case 12:
        return <DiabetesMedicationStep formData={formData} updateFormData={updateFormData} />;
      case 13:
        return <LoadingStep />;
      case 14:
        return <PreQualifiedSuccessStep />;
      case 15:
        return <IULQuoteStep formData={formData} />;
      case 16:
        return <ApplicationStep1 formData={formData} updateFormData={updateFormData} />;
      case 17:
        return <ApplicationStep2 formData={formData} updateFormData={updateFormData} />;
      case 18:
        return <FinalSuccessStep formData={formData} onComplete={onComplete} />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <>
      {/* Main Funnel Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close button - only shows exit intent when clicked */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6">
            {/* Progress Bar */}
            {currentStep !== 13 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Step {currentStep} of {TOTAL_STEPS}</span>
                  <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Step Content */}
            {renderStep()}

            {/* Navigation */}
            {currentStep !== 13 && currentStep !== 15 && (
              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button onClick={handleBack} variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                
                <div className="flex-1"></div>
                
                {currentStep < TOTAL_STEPS && (
                  <Button onClick={handleNext} disabled={!canGoNext()}>
                    {currentStep === TOTAL_STEPS - 1 ? 'Submit' : 'Continue'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exit Intent Modal - only shows when X is clicked */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Wait! Don't Miss Out</h2>
            <p className="text-gray-600 mb-6">
              You're just a few steps away from checking your veteran life insurance eligibility. 
              Let a licensed agent help you complete this process.
            </p>
            
            <div className="space-y-3">
              <Button 
                onClick={() => setShowExitIntent(false)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Me Now
              </Button>
              <Button 
                onClick={() => setShowExitIntent(false)}
                variant="outline"
                className="w-full"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
              <Button 
                onClick={() => setShowExitIntent(false)}
                variant="outline"
                className="w-full"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </Button>
            </div>
            
            <div className="mt-4 space-y-2">
              <button
                onClick={() => setShowExitIntent(false)}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Continue with application
              </button>
              <br />
              <button
                onClick={handleCancelEverything}
                className="text-red-500 hover:text-red-700 text-sm underline"
              >
                Cancel everything and close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Step Components
const StateSelectionStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Select Your State</h2>
    <p className="text-gray-600">Choose your state of residence</p>
    <select
      value={formData.state}
      onChange={(e) => updateFormData({ state: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">Select your state</option>
      {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(state => (
        <option key={state} value={state}>{state}</option>
      ))}
    </select>
  </div>
);

const MilitaryStatusStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Military Service Status</h2>
    <p className="text-gray-600">Tell us about your military service</p>
    <div className="space-y-3">
      {['Active Duty', 'Veteran', 'Reserve/Guard', 'Spouse', 'None'].map((status) => (
        <button
          key={status}
          onClick={() => updateFormData({ militaryStatus: status })}
          className={`w-full p-4 border-2 rounded-lg ${
            formData.militaryStatus === status
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  </div>
);

const BranchOfServiceStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Branch of Service</h2>
    <p className="text-gray-600">Which branch did you serve in?</p>
    <div className="grid grid-cols-2 gap-3">
      {['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'].map((branch) => (
        <button
          key={branch}
          onClick={() => updateFormData({ branchOfService: branch })}
          className={`p-4 border-2 rounded-lg ${
            formData.branchOfService === branch
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {branch}
        </button>
      ))}
    </div>
  </div>
);

const MaritalStatusStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Marital Status</h2>
    <p className="text-gray-600">What is your current marital status?</p>
    <div className="space-y-3">
      {['Single', 'Married', 'Divorced', 'Widowed'].map((status) => (
        <button
          key={status}
          onClick={() => updateFormData({ maritalStatus: status })}
          className={`w-full p-4 border-2 rounded-lg ${
            formData.maritalStatus === status
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  </div>
);

const CoverageAmountStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Coverage Amount</h2>
    <p className="text-gray-600">How much coverage do you need?</p>
    <div className="space-y-3">
      {['$10,000', '$25,000', '$50,000', '$100,000', '$250,000', '$500,000', '$1,000,000+'].map((amount) => (
        <button
          key={amount}
          onClick={() => updateFormData({ coverageAmount: amount })}
          className={`w-full p-4 border-2 rounded-lg ${
            formData.coverageAmount === amount
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {amount}
        </button>
      ))}
    </div>
  </div>
);

const ContactInfoStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      <p className="text-gray-600">We'll use this to send you your personalized quote</p>
    </div>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="First Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Email Address"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Phone Number"
        />
      </div>
      
      {/* Compliance Checkboxes */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Consent & Compliance</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.transactionalConsent}
              onChange={(e) => updateFormData({ transactionalConsent: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I consent to receive transactional communications regarding my application
            </span>
          </label>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={(e) => updateFormData({ marketingConsent: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              I consent to receive marketing communications about life insurance products
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

const BirthdayStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Date of Birth</h2>
    <p className="text-gray-600">This helps us calculate your personalized rates</p>
    <input
      type="date"
      value={formData.dateOfBirth}
      onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>
);

const TobaccoUseStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Tobacco Use</h2>
    <p className="text-gray-600">Do you use tobacco products?</p>
    <div className="space-y-3">
      {['Yes', 'No'].map((answer) => (
        <button
          key={answer}
          onClick={() => updateFormData({ tobaccoUse: answer })}
          className={`w-full p-4 border-2 rounded-lg ${
            formData.tobaccoUse === answer
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {answer}
        </button>
      ))}
    </div>
  </div>
);

const MedicalConditionsStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Medical Conditions</h2>
    <p className="text-gray-600">Do you have any of the following conditions?</p>
    <div className="space-y-3">
      {['Diabetes', 'Heart Disease', 'Cancer', 'High Blood Pressure', 'None'].map((condition) => (
        <label key={condition} className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.medicalConditions.includes(condition)}
            onChange={(e) => {
              if (e.target.checked) {
                updateFormData({ medicalConditions: [...formData.medicalConditions, condition] });
              } else {
                updateFormData({ medicalConditions: formData.medicalConditions.filter(c => c !== condition) });
              }
            }}
            className="rounded"
          />
          <span>{condition}</span>
        </label>
      ))}
    </div>
  </div>
);

const HeightWeightStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">Height & Weight</h2>
      <p className="text-gray-600">This helps us calculate your rates accurately</p>
    </div>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (inches)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => updateFormData({ height: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="68"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => updateFormData({ weight: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="150"
          />
        </div>
      </div>
    </div>
  </div>
);

const HospitalCareStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Hospital Care</h2>
    <p className="text-gray-600">Have you been hospitalized in the last 5 years?</p>
    <div className="space-y-3">
      {['Yes', 'No'].map((answer) => (
        <button
          key={answer}
          onClick={() => updateFormData({ hospitalCare: answer })}
          className={`w-full p-4 border-2 rounded-lg ${
            formData.hospitalCare === answer
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {answer}
        </button>
      ))}
    </div>
  </div>
);

const DiabetesMedicationStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Diabetes Medication</h2>
    <p className="text-gray-600">Do you take medication for diabetes?</p>
    <div className="space-y-3">
      {['Yes', 'No'].map((answer) => (
        <button
          key={answer}
          onClick={() => updateFormData({ diabetesMedication: answer })}
          className={`w-full p-4 border-2 rounded-lg ${
            formData.diabetesMedication === answer
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {answer}
        </button>
      ))}
    </div>
  </div>
);

const LoadingStep: React.FC = () => (
  <div className="space-y-6 text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    <h2 className="text-2xl font-bold">Processing Your Application</h2>
    <p className="text-gray-600">Please wait while we review your information...</p>
  </div>
);

const PreQualifiedSuccessStep: React.FC = () => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="h-8 w-8 text-green-600" />
    </div>
    <h2 className="text-2xl font-bold">Pre-Qualified!</h2>
    <p className="text-gray-600">Congratulations! You've been pre-qualified for veteran life insurance coverage.</p>
  </div>
);

const IULQuoteStep: React.FC<{ formData: VeteranFormData }> = ({ formData }) => (
  <div className="space-y-6 text-center">
    <h2 className="text-2xl font-bold text-gray-900">Your IUL Quote</h2>
    <p className="text-gray-600">Based on your information, here's your estimated premium</p>
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Estimated Monthly Premium</h3>
          <div className="text-4xl font-bold text-green-600">$89/month</div>
          <p className="text-gray-600">For {formData.coverageAmount} coverage</p>
          <p className="text-sm text-gray-500">Veteran discount applied</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ApplicationStep1: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">Application Step 1</h2>
      <p className="text-gray-600">Let's complete your application</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
        <input
          type="text"
          value={formData.streetAddress}
          onChange={(e) => updateFormData({ streetAddress: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Street Address"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="City"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateFormData({ zipCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="ZIP Code"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Name</label>
          <input
            type="text"
            value={formData.beneficiaryName}
            onChange={(e) => updateFormData({ beneficiaryName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Beneficiary Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
          <input
            type="text"
            value={formData.beneficiaryRelationship}
            onChange={(e) => updateFormData({ beneficiaryRelationship: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Relationship"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License</label>
        <input
          type="text"
          value={formData.driversLicense}
          onChange={(e) => updateFormData({ driversLicense: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Driver's License Number"
        />
      </div>
    </div>
  </div>
);

const ApplicationStep2: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">Application Step 2</h2>
      <p className="text-gray-600">Almost done! Just a few more details</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Social Security Number</label>
        <input
          type="text"
          value={formData.ssn}
          onChange={(e) => updateFormData({ ssn: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="SSN"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
        <input
          type="text"
          value={formData.bankName}
          onChange={(e) => updateFormData({ bankName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Bank Name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
          <input
            type="text"
            value={formData.routingNumber}
            onChange={(e) => updateFormData({ routingNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Routing Number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
          <input
            type="text"
            value={formData.accountNumber}
            onChange={(e) => updateFormData({ accountNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Account Number"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Policy Date</label>
        <input
          type="date"
          value={formData.policyDate}
          onChange={(e) => updateFormData({ policyDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  </div>
);

const FinalSuccessStep: React.FC<{ formData: VeteranFormData; onComplete: (data: VeteranFormData) => void }> = ({ formData, onComplete }) => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="h-8 w-8 text-green-600" />
    </div>
    <h2 className="text-2xl font-bold">Application Complete!</h2>
    <p className="text-gray-600">Thank you for completing your veteran life insurance application. A licensed agent will contact you within 24 hours.</p>
    
    <div className="space-y-4">
      <Button onClick={() => onComplete(formData)} className="w-full">
        Finish
      </Button>
    </div>
  </div>
);

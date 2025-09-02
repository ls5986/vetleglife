'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Phone, Mail, Calendar, X, AlertCircle } from 'lucide-react';

interface VeteranFormData {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  state: string;
  
  // Military Info
  militaryStatus: string;
  branchOfService: string;
  yearsOfService: string;
  dischargeType: string;
  
  // Health & Lifestyle
  height: string;
  weight: string;
  tobaccoUse: string;
  medicalConditions: string[];
  
  // Coverage
  coverageAmount: string;
  policyType: string;
  
  // Session tracking
  sessionId: string;
  currentStep: number;
  exitIntent: boolean;
}

interface VeteranFunnelProps {
  onComplete: (data: VeteranFormData) => void;
  onClose: () => void;
}

export default function VeteranLifeInsuranceFunnel({ onComplete, onClose }: VeteranFunnelProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [formData, setFormData] = useState<VeteranFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    state: '',
    militaryStatus: '',
    branchOfService: '',
    yearsOfService: '',
    dischargeType: '',
    height: '',
    weight: '',
    tobaccoUse: '',
    medicalConditions: [],
    coverageAmount: '',
    policyType: '',
    sessionId: generateSessionId(),
    currentStep: 1,
    exitIntent: false
  });

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent) {
        setShowExitIntent(true);
        setFormData(prev => ({ ...prev, exitIntent: true }));
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [showExitIntent]);

  // Auto-advance timer (15 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 12) {
        nextStep();
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Listen for nextStep events from step components
  useEffect(() => {
    const handleNextStep = () => {
      nextStep();
    };

    window.addEventListener('nextStep', handleNextStep);
    return () => window.removeEventListener('nextStep', handleNextStep);
  }, [currentStep]);

  // Track progress in database
  useEffect(() => {
    updateSessionProgress();
  }, [currentStep, formData]);

  function generateSessionId() {
    return 'veteran_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async function updateSessionProgress() {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadData: {
            session_id: formData.sessionId,
            brand_id: 'veteran-legacy-life',
            current_step: currentStep,
            form_data: formData,
            exit_intent: formData.exitIntent,
            created_at: new Date().toISOString()
          }
        })
      });
      
      if (!response.ok) {
        console.error('Failed to update session progress');
      }
    } catch (error) {
      console.error('Error updating session progress:', error);
    }
  }

  const updateFormData = (data: Partial<VeteranFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 12) {
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <MilitaryStatusStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <BranchOfServiceStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <ContactInfoStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <HealthInfoStep formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <CoverageStep formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <QuoteStep formData={formData} />;
      case 9:
        return <LoadingStep />;
      case 10:
        return <PreQualifiedStep />;
      case 11:
        return <AgentHandoffStep formData={formData} />;
      case 12:
        return <FinalStep formData={formData} onComplete={onComplete} />;
      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <>
      {/* Main Funnel Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Close button */}
          <button
            onClick={() => setShowExitIntent(true)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Step {currentStep} of 12</span>
                <span>{Math.round((currentStep / 12) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 12) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Step Content */}
            {renderStep()}

            {/* Navigation */}
            {currentStep > 1 && currentStep < 12 && (
              <div className="flex justify-between mt-6">
                <Button onClick={prevStep} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Exit Intent Modal */}
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
            
            <button
              onClick={() => setShowExitIntent(false)}
              className="text-gray-500 hover:text-gray-700 mt-4 text-sm underline"
            >
              Continue with application
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Step Components
const WelcomeStep: React.FC = () => (
  <div className="space-y-6 text-center">
    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
      <Shield className="h-10 w-10 text-blue-600" />
    </div>
    <h2 className="text-3xl font-bold text-gray-900">Veteran Life Insurance Eligibility Check</h2>
    <p className="text-lg text-gray-600">
      Complete this quick 2-minute form to see if you qualify for exclusive veteran life insurance benefits.
    </p>
    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-blue-800 font-medium">
        ✓ No medical exam required for initial quote<br/>
        ✓ Exclusive rates for veterans<br/>
        ✓ Quick 2-minute process
      </p>
    </div>
  </div>
);

const MilitaryStatusStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Military Service Status</h2>
      <p className="text-gray-600">Tell us about your military service to unlock exclusive benefits.</p>
    </div>
    
    <div className="space-y-3">
      {['Active Duty', 'Veteran', 'Reserve/Guard', 'Spouse', 'None'].map((status) => (
        <button
          key={status}
          onClick={() => {
            updateFormData({ militaryStatus: status });
            setTimeout(() => window.dispatchEvent(new CustomEvent('nextStep')), 1000);
          }}
          className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
            formData.militaryStatus === status
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-semibold">{status}</div>
          <div className="text-sm opacity-75">
            {status === 'Active Duty' && 'Currently serving in the military'}
            {status === 'Veteran' && 'Honorably discharged from military service'}
            {status === 'Reserve/Guard' && 'Currently serving in reserves or guard'}
            {status === 'Spouse' && 'Spouse of active duty or veteran'}
            {status === 'None' && 'No military service'}
          </div>
        </button>
      ))}
    </div>
  </div>
);

const BranchOfServiceStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Branch of Service</h2>
      <p className="text-gray-600">Which branch did you serve in?</p>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      {['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'].map((branch) => (
        <button
          key={branch}
          onClick={() => {
            updateFormData({ branchOfService: branch });
            setTimeout(() => window.dispatchEvent(new CustomEvent('nextStep')), 1000);
          }}
          className={`p-4 border-2 rounded-lg text-center transition-colors ${
            formData.branchOfService === branch
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="font-semibold">{branch}</div>
        </button>
      ))}
    </div>
  </div>
);

const BasicInfoStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Basic Information</h2>
      <p className="text-gray-600">Let's start with your basic details.</p>
    </div>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  </div>
);

const ContactInfoStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
      <p className="text-gray-600">We'll use this to send you your personalized quote.</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State of Residence</label>
        <select
          value={formData.state}
          onChange={(e) => updateFormData({ state: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select your state</option>
          {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

const HealthInfoStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Information</h2>
      <p className="text-gray-600">This helps us provide accurate quotes.</p>
    </div>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (inches)</label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => updateFormData({ height: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="68"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
          <input
            type="number"
            value={formData.weight}
            onChange={(e) => updateFormData({ weight: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="150"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tobacco Use</label>
        <div className="space-y-2">
          {['Yes', 'No'].map((answer) => (
            <label key={answer} className="flex items-center space-x-3">
              <input
                type="radio"
                name="tobaccoUse"
                value={answer}
                checked={formData.tobaccoUse === answer}
                onChange={(e) => updateFormData({ tobaccoUse: e.target.value })}
              />
              <span>{answer}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CoverageStep: React.FC<{ formData: VeteranFormData; updateFormData: (data: Partial<VeteranFormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Coverage Amount</h2>
      <p className="text-gray-600">How much coverage do you need?</p>
    </div>
    
    <div className="space-y-3">
      {['$100,000', '$250,000', '$500,000', '$1,000,000', '$2,000,000+'].map((amount) => (
        <label key={amount} className="flex items-center space-x-3">
          <input
            type="radio"
            name="coverageAmount"
            value={amount}
            checked={formData.coverageAmount === amount}
            onChange={(e) => {
              updateFormData({ coverageAmount: e.target.value });
              setTimeout(() => window.dispatchEvent(new CustomEvent('nextStep')), 1000);
            }}
          />
          <span className="font-semibold">{amount}</span>
        </label>
      ))}
    </div>
  </div>
);

const QuoteStep: React.FC<{ formData: VeteranFormData }> = ({ formData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Veteran Quote</h2>
      <p className="text-gray-600">Based on your information, here's your estimated premium.</p>
    </div>
    
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

const LoadingStep: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('nextStep'));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <h2 className="text-2xl font-bold">Processing Your Application</h2>
      <p className="text-gray-600">Please wait while we review your information...</p>
    </div>
  );
};

const PreQualifiedStep: React.FC = () => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="h-8 w-8 text-green-600" />
    </div>
    <h2 className="text-2xl font-bold">Pre-Qualified!</h2>
    <p className="text-gray-600">Congratulations! You've been pre-qualified for veteran life insurance coverage.</p>
  </div>
);

const AgentHandoffStep: React.FC<{ formData: VeteranFormData }> = ({ formData }) => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
      <Phone className="h-8 w-8 text-blue-600" />
    </div>
    <h2 className="text-2xl font-bold">Agent Contact</h2>
    <p className="text-gray-600">A licensed agent will contact you within 24 hours to finalize your policy.</p>
    <div className="text-sm text-gray-500">
      <p>Phone: {formData.phone}</p>
      <p>Email: {formData.email}</p>
    </div>
  </div>
);

const FinalStep: React.FC<{ formData: VeteranFormData; onComplete: (data: VeteranFormData) => void }> = ({ formData, onComplete }) => (
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

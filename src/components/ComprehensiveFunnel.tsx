'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowRight, ArrowLeft, Shield, Users, Target, Phone, Mail } from 'lucide-react';

interface FormData {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  state: string;
  
  // Demographics
  militaryStatus?: string;
  branchOfService?: string;
  companyStage?: string;
  fundingRaised?: string;
  tradingType?: string;
  portfolioSize?: string;
  platformType?: string;
  followerCount?: string;
  educationLevel?: string;
  yearsTeaching?: string;
  
  // Health & Lifestyle
  maritalStatus: string;
  height: string;
  weight: string;
  medicalConditions: string[];
  hospitalCare: string;
  diabetesMedication: string;
  tobaccoUse: string;
  
  // Coverage
  coverageAmount: string;
  
  // Address
  streetAddress: string;
  city: string;
  zipCode: string;
  driversLicense: string;
  licenseState: string;
  
  // Session tracking
  sessionId: string;
  currentStep: number;
  brandId: string;
  utmSource?: string;
  utmCampaign?: string;
}

interface ComprehensiveFunnelProps {
  brand: any;
  onComplete: (data: FormData) => void;
  onClose: () => void;
}

export default function ComprehensiveFunnel({ brand, onComplete, onClose }: ComprehensiveFunnelProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    state: '',
    maritalStatus: '',
    height: '',
    weight: '',
    medicalConditions: [],
    hospitalCare: '',
    diabetesMedication: '',
    tobaccoUse: '',
    coverageAmount: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    driversLicense: '',
    licenseState: '',
    sessionId: generateSessionId(),
    currentStep: 1,
    brandId: brand.id,
    utmSource: new URLSearchParams(window.location.search).get('utm_source') || '',
    utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
  });

  // Auto-advance timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < getTotalSteps()) {
        nextStep();
      }
    }, 30000); // 30 seconds auto-advance

    return () => clearTimeout(timer);
  }, [currentStep]);

  // Track progress in database
  useEffect(() => {
    updateSessionProgress();
  }, [currentStep, formData]);

  function generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function getTotalSteps() {
    const brandSpecificSteps = getBrandSpecificSteps().length;
    return brandSpecificSteps + 19; // 19 standard steps
  }

  function getBrandSpecificSteps() {
    switch (brand.id) {
      case 'veteran-legacy-life':
        return [
          { step: 1, title: 'Military Status', component: 'MilitaryStatusStep' },
          { step: 2, title: 'Branch of Service', component: 'BranchOfServiceStep' }
        ];
      case 'startup-legacy-life':
        return [
          { step: 1, title: 'Company Stage', component: 'CompanyStageStep' },
          { step: 2, title: 'Funding Raised', component: 'FundingRaisedStep' }
        ];
      case 'trader-legacy-life':
        return [
          { step: 1, title: 'Trading Type', component: 'TradingTypeStep' },
          { step: 2, title: 'Portfolio Size', component: 'PortfolioSizeStep' }
        ];
      case 'creator-legacy-life':
        return [
          { step: 1, title: 'Platform Type', component: 'PlatformTypeStep' },
          { step: 2, title: 'Follower Count', component: 'FollowerCountStep' }
        ];
      case 'educator-legacy-life':
        return [
          { step: 1, title: 'Education Level', component: 'EducationLevelStep' },
          { step: 2, title: 'Years Teaching', component: 'YearsTeachingStep' }
        ];
      default:
        return [];
    }
  }

  async function updateSessionProgress() {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadData: {
            session_id: formData.sessionId,
            brand_id: formData.brandId,
            current_step: currentStep,
            form_data: formData,
            utm_source: formData.utmSource,
            utm_campaign: formData.utmCampaign,
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

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < getTotalSteps()) {
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
    const brandConfig = getBrandSpecificSteps();
    
    // Handle brand-specific initial steps
    if (currentStep <= brandConfig.length) {
      const brandStep = brandConfig[currentStep - 1];
      return renderBrandSpecificStep(brandStep);
    }

    // Handle standard funnel steps (adjusted for brand-specific steps)
    const adjustedStep = currentStep - brandConfig.length;
    
    switch (adjustedStep) {
      case 1:
        return <BasicInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <ContactInfoStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <BirthdayStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <StateStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <MaritalStatusStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <HeightWeightStep formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <MedicalConditionsStep formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <HospitalCareStep formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <DiabetesMedicationStep formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <TobaccoUseStep formData={formData} updateFormData={updateFormData} />;
      case 11:
        return <CoverageAmountStep formData={formData} updateFormData={updateFormData} />;
      case 12:
        return <AddressStep formData={formData} updateFormData={updateFormData} />;
      case 13:
        return <DriversLicenseStep formData={formData} updateFormData={updateFormData} />;
      case 14:
        return <IULQuoteStep formData={formData} updateFormData={updateFormData} />;
      case 15:
        return <PolicyOptionsStep formData={formData} updateFormData={updateFormData} />;
      case 16:
        return <LoadingStep />;
      case 17:
        return <PreQualifiedStep />;
      case 18:
        return <AgentHandoffStep formData={formData} />;
      case 19:
        return <FinalSuccessStep formData={formData} onComplete={onComplete} />;
      default:
        return <div>Step not found</div>;
    }
  };

  const renderBrandSpecificStep = (brandStep: any) => {
    switch (brandStep.component) {
      case 'MilitaryStatusStep':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Military Status</h2>
              <p className="text-gray-600">Tell us about your military service to unlock exclusive benefits.</p>
            </div>
            
            <div className="space-y-4">
              {['Active Duty', 'Veteran', 'Reserve/Guard', 'Spouse'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    updateFormData({ militaryStatus: status });
                    setTimeout(nextStep, 1000); // Auto-advance after selection
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
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'CompanyStageStep':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Stage</h2>
              <p className="text-gray-600">Help us understand your startup's current phase.</p>
            </div>
            
            <div className="space-y-4">
              {['Idea Stage', 'Seed Stage', 'Series A', 'Series B+'].map((stage) => (
                <button
                  key={stage}
                  onClick={() => {
                    updateFormData({ companyStage: stage });
                    setTimeout(nextStep, 1000);
                  }}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.companyStage === stage
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">{stage}</div>
                  <div className="text-sm opacity-75">
                    {stage === 'Idea Stage' && 'Conceptualizing and planning'}
                    {stage === 'Seed Stage' && 'Initial funding and development'}
                    {stage === 'Series A' && 'Product-market fit and growth'}
                    {stage === 'Series B+' && 'Scaling and expansion'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      // Add more brand-specific steps as needed...
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{brandStep.title}</h2>
            <p className="text-gray-600">This step is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of {getTotalSteps()}</span>
              <span>{Math.round((currentStep / getTotalSteps()) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / getTotalSteps()) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          {currentStep > 1 && currentStep < getTotalSteps() && (
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
  );
}

// Step Components
const BasicInfoStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Let's Get Started</h2>
      <p className="text-gray-600">We'll help you find the perfect coverage for your needs.</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => updateFormData({ firstName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your first name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => updateFormData({ lastName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your last name"
        />
      </div>
    </div>
  </div>
);

const ContactInfoStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
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
    </div>
  </div>
);

const BirthdayStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Date of Birth</h2>
      <p className="text-gray-600">This helps us calculate your personalized rates.</p>
    </div>
    
    <div className="space-y-4">
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

const StateStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">State of Residence</h2>
      <p className="text-gray-600">Select your state to see available options.</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
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

const MaritalStatusStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Marital Status</h2>
      <p className="text-gray-600">This helps us understand your family situation.</p>
    </div>
    
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {['Single', 'Married', 'Divorced', 'Widowed'].map((status) => (
          <button
            key={status}
            onClick={() => {
              updateFormData({ maritalStatus: status });
              setTimeout(() => window.dispatchEvent(new CustomEvent('nextStep')), 1000);
            }}
            className={`p-4 border-2 rounded-lg text-center transition-colors ${
              formData.maritalStatus === status
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="font-semibold">{status}</div>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const HeightWeightStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Height & Weight</h2>
      <p className="text-gray-600">This helps us calculate your rates accurately.</p>
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
    </div>
  </div>
);

const MedicalConditionsStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Conditions</h2>
      <p className="text-gray-600">Do you have any of the following conditions?</p>
    </div>
    
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

const HospitalCareStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Hospital Care</h2>
      <p className="text-gray-600">Have you been hospitalized in the last 5 years?</p>
    </div>
    
    <div className="space-y-3">
      {['Yes', 'No'].map((answer) => (
        <label key={answer} className="flex items-center space-x-3">
          <input
            type="radio"
            name="hospitalCare"
            value={answer}
            checked={formData.hospitalCare === answer}
            onChange={(e) => {
              updateFormData({ hospitalCare: e.target.value });
              setTimeout(() => window.dispatchEvent(new CustomEvent('nextStep')), 1000);
            }}
          />
          <span>{answer}</span>
        </label>
      ))}
    </div>
  </div>
);

const DiabetesMedicationStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Diabetes Medication</h2>
      <p className="text-gray-600">Do you take medication for diabetes?</p>
    </div>
    
    <div className="space-y-3">
      {['Yes', 'No'].map((answer) => (
        <label key={answer} className="flex items-center space-x-3">
          <input
            type="radio"
            name="diabetesMedication"
            value={answer}
            checked={formData.diabetesMedication === answer}
            onChange={(e) => {
              updateFormData({ diabetesMedication: e.target.value });
              setTimeout(() => window.dispatchEvent(new CustomEvent('nextStep')), 1000);
            }}
          />
          <span>{answer}</span>
        </label>
      ))}
    </div>
  </div>
);

const TobaccoUseStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tobacco Use</h2>
      <p className="text-gray-600">Do you use tobacco products?</p>
    </div>
    
    <div className="space-y-3">
      {['Yes', 'No'].map((answer) => (
        <label key={answer} className="flex items-center space-x-3">
          <input
            type="radio"
            name="tobaccoUse"
            value={answer}
            checked={formData.tobaccoUse === answer}
            onChange={(e) => {
              updateFormData({ tobaccoUse: e.target.value });
              setTimeout(() => window.dispatchEvent(new CustomEvent('nextStep')), 1000);
            }}
          />
          <span>{answer}</span>
        </label>
      ))}
    </div>
  </div>
);

const CoverageAmountStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Coverage Amount</h2>
      <p className="text-gray-600">How much coverage do you need?</p>
    </div>
    
    <div className="space-y-3">
      {['$50,000', '$100,000', '$150,000', '$200,000', '$250,000'].map((amount) => (
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
          <span>{amount}</span>
        </label>
      ))}
    </div>
  </div>
);

const AddressStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Address Information</h2>
      <p className="text-gray-600">We need your address for policy documentation.</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
        <input
          type="text"
          value={formData.streetAddress}
          onChange={(e) => updateFormData({ streetAddress: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your street address"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your city"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => updateFormData({ zipCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your ZIP code"
          />
        </div>
      </div>
    </div>
  </div>
);

const DriversLicenseStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Driver's License</h2>
      <p className="text-gray-600">We need this for identity verification.</p>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Driver's License Number</label>
        <input
          type="text"
          value={formData.driversLicense}
          onChange={(e) => updateFormData({ driversLicense: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your driver's license number"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">License State</label>
        <select
          value={formData.licenseState}
          onChange={(e) => updateFormData({ licenseState: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select license state</option>
          {['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'].map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

const IULQuoteStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Your IUL Quote</h2>
      <p className="text-gray-600">Based on your information, here's your estimated premium.</p>
    </div>
    
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Estimated Monthly Premium</h3>
          <div className="text-3xl font-bold text-green-600">$150/month</div>
          <p className="text-gray-600">For $200,000 coverage amount</p>
          <p className="text-sm text-gray-500">This is an estimate. Final rates may vary.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PolicyOptionsStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void }> = ({ formData, updateFormData }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Options</h2>
      <p className="text-gray-600">Choose the type of coverage that best fits your needs.</p>
    </div>
    
    <div className="space-y-4">
      {[
        { title: 'Whole Life', description: 'Lifetime protection with cash value', icon: Shield },
        { title: 'Term Life', description: 'Affordable coverage for a set period', icon: Users },
        { title: 'Indexed Universal Life', description: 'Market-linked growth potential', icon: Target }
      ].map((option) => (
        <Card key={option.title} className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <option.icon className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-bold">{option.title}</h3>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
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
    <p className="text-gray-600">Congratulations! You've been pre-qualified for life insurance coverage.</p>
  </div>
);

const AgentHandoffStep: React.FC<{ formData: FormData }> = ({ formData }) => (
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

const FinalSuccessStep: React.FC<{ formData: FormData; onComplete: (data: FormData) => void }> = ({ formData, onComplete }) => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="h-8 w-8 text-green-600" />
    </div>
    <h2 className="text-2xl font-bold">Application Complete!</h2>
    <p className="text-gray-600">Thank you for completing your application. A licensed agent will contact you within 24 hours.</p>
    
    <div className="space-y-4">
      <Button onClick={() => onComplete(formData)} className="w-full">
        Finish
      </Button>
    </div>
  </div>
); 
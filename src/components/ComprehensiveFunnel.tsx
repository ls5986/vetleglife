'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, ArrowRight, Shield, Star, Clock, Heart } from 'lucide-react';
import { MilitaryStatusStep as MilitaryStep, CompanyStageStep as CompanyStep, TradeExperienceStep as TradeStep } from './funnel-steps';

interface ComprehensiveFunnelProps {
  brand: any;
  onComplete: (data: any) => void;
  onClose: () => void;
}

interface FormData {
  // Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  state: string;
  
  // Military Information (for veterans)
  militaryStatus: string;
  branchOfService: string;
  maritalStatus: string;
  
  // Startup Information (for founders)
  companyStage: string;
  fundingRaised: string;
  
  // Trade Information (for trade professionals)
  tradeExperience: string;
  tradeType: string;
  
  // Medical Information
  height: string;
  weight: string;
  medicalConditions: string[];
  hospitalCare: string;
  diabetesMedication: string;
  tobaccoUse: string;
  
  // Application Information
  streetAddress: string;
  city: string;
  zipCode: string;
  driversLicense: string;
  licenseState: string;
  ssn: string;
  bankAccount: string;
  routingNumber: string;
  
  // Beneficiary Information
  beneficiaries: Array<{
    name: string;
    relationship: string;
    percentage: number;
  }>;
  
  // Policy Information
  coverageAmount: string;
  policyType: string;
  estimatedPremium: number;
}

const ComprehensiveFunnel: React.FC<ComprehensiveFunnelProps> = ({ 
  brand, 
  onComplete, 
  onClose 
}) => {
  console.log('ComprehensiveFunnel rendered with brand:', brand);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    state: '',
    militaryStatus: '',
    branchOfService: '',
    maritalStatus: '',
    companyStage: '',
    fundingRaised: '',
    tradeExperience: '',
    tradeType: '',
    height: '',
    weight: '',
    medicalConditions: [],
    hospitalCare: '',
    diabetesMedication: '',
    tobaccoUse: '',
    streetAddress: '',
    city: '',
    zipCode: '',
    driversLicense: '',
    licenseState: '',
    ssn: '',
    bankAccount: '',
    routingNumber: '',
    beneficiaries: [{ name: '', relationship: '', percentage: 100 }],
    coverageAmount: '',
    policyType: '',
    estimatedPremium: 0
  });

  // Brand-specific funnel configuration
  const getBrandSpecificSteps = () => {
    switch (brand.id) {
      case 'veteran-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Military Status', component: 'MilitaryStatusStep' },
            { step: 2, title: 'Branch of Service', component: 'BranchOfServiceStep' },
            { step: 3, title: 'Years of Service', component: 'YearsOfServiceStep' },
            { step: 4, title: 'VA Benefits Status', component: 'VABenefitsStep' }
          ],
          standardFunnelStart: 5
        };
      case 'startup-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Company Stage', component: 'CompanyStageStep' },
            { step: 2, title: 'Funding Raised', component: 'FundingStep' },
            { step: 3, title: 'Equity Stake', component: 'EquityStep' },
            { step: 4, title: 'Personal Net Worth', component: 'NetWorthStep' }
          ],
          standardFunnelStart: 5
        };
      case 'foundation-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Family Size', component: 'FamilySizeStep' },
            { step: 2, title: 'Children Ages', component: 'ChildrenAgesStep' },
            { step: 3, title: 'Home Ownership', component: 'HomeOwnershipStep' },
            { step: 4, title: 'Current Savings', component: 'SavingsStep' }
          ],
          standardFunnelStart: 5
        };
      case 'trade-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Trade Type', component: 'TradeTypeStep' },
            { step: 2, title: 'Years in Trade', component: 'YearsInTradeStep' },
            { step: 3, title: 'Union Membership', component: 'UnionStep' },
            { step: 4, title: 'Business Owner', component: 'BusinessOwnerStep' }
          ],
          standardFunnelStart: 5
        };
      case 'success-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Income Level', component: 'IncomeLevelStep' },
            { step: 2, title: 'Career Stage', component: 'CareerStageStep' },
            { step: 3, title: 'Net Worth', component: 'NetWorthStep' },
            { step: 4, title: 'Current Coverage', component: 'CurrentCoverageStep' }
          ],
          standardFunnelStart: 5
        };
      case 'immigrant-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Years in US', component: 'YearsInUSStep' },
            { step: 2, title: 'Citizenship Status', component: 'CitizenshipStep' },
            { step: 3, title: 'Family Back Home', component: 'FamilyBackHomeStep' },
            { step: 4, title: 'Financial Goals', component: 'FinancialGoalsStep' }
          ],
          standardFunnelStart: 5
        };
      case 'responder-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Responder Type', component: 'ResponderTypeStep' },
            { step: 2, title: 'Years of Service', component: 'YearsOfServiceStep' },
            { step: 3, title: 'Shift Schedule', component: 'ShiftScheduleStep' },
            { step: 4, title: 'Department Benefits', component: 'DepartmentBenefitsStep' }
          ],
          standardFunnelStart: 5
        };
      case 'educator-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Education Level', component: 'EducationLevelStep' },
            { step: 2, title: 'Years Teaching', component: 'YearsTeachingStep' },
            { step: 3, title: 'School Type', component: 'SchoolTypeStep' },
            { step: 4, title: 'Retirement Savings', component: 'RetirementSavingsStep' }
          ],
          standardFunnelStart: 5
        };
      case 'trader-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Trading Type', component: 'TradingTypeStep' },
            { step: 2, title: 'Portfolio Size', component: 'PortfolioSizeStep' },
            { step: 3, title: 'Risk Tolerance', component: 'RiskToleranceStep' },
            { step: 4, title: 'Trading Experience', component: 'TradingExperienceStep' }
          ],
          standardFunnelStart: 5
        };
      case 'creator-legacy-life':
        return {
          initialSteps: [
            { step: 1, title: 'Platform Type', component: 'PlatformTypeStep' },
            { step: 2, title: 'Follower Count', component: 'FollowerCountStep' },
            { step: 3, title: 'Revenue Streams', component: 'RevenueStreamsStep' },
            { step: 4, title: 'Monthly Income', component: 'MonthlyIncomeStep' }
          ],
          standardFunnelStart: 5
        };
      default:
        return {
          initialSteps: [],
          standardFunnelStart: 1
        };
    }
  };

  const brandConfig = getBrandSpecificSteps();
  const totalSteps = brandConfig.initialSteps.length + 19; // 19 standard steps

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    // Handle brand-specific initial steps
    if (currentStep <= brandConfig.initialSteps.length) {
      const brandStep = brandConfig.initialSteps[currentStep - 1];
      return renderBrandSpecificStep(brandStep);
    }

    // Handle standard funnel steps (adjusted for brand-specific steps)
    const adjustedStep = currentStep - brandConfig.initialSteps.length;
    
    switch (adjustedStep) {
      case 1:
        return (
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

      case 2:
        return (
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

      case 3:
        return (
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

      case 4:
        return (
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
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Marital Status</h2>
              <p className="text-gray-600">This helps us understand your family situation.</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => updateFormData({ maritalStatus: 'Single' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.maritalStatus === 'Single'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Single</div>
                </button>
                <button
                  onClick={() => updateFormData({ maritalStatus: 'Married' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.maritalStatus === 'Married'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Married</div>
                </button>
                <button
                  onClick={() => updateFormData({ maritalStatus: 'Divorced' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.maritalStatus === 'Divorced'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Divorced</div>
                </button>
                <button
                  onClick={() => updateFormData({ maritalStatus: 'Widowed' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.maritalStatus === 'Widowed'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Widowed</div>
                </button>
              </div>
            </div>
          </div>
        );

      // Continue with remaining standard steps...
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step {adjustedStep}</h2>
            <p className="text-gray-600">This step is under development.</p>
          </div>
        );
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
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => updateFormData({ militaryStatus: 'Active Duty' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.militaryStatus === 'Active Duty'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Active Duty</div>
                  <div className="text-sm opacity-75">Currently serving in the military</div>
                </button>
                <button
                  onClick={() => updateFormData({ militaryStatus: 'Veteran' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.militaryStatus === 'Veteran'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Veteran</div>
                  <div className="text-sm opacity-75">Honorably discharged from military service</div>
                </button>
                <button
                  onClick={() => updateFormData({ militaryStatus: 'Reserve/Guard' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.militaryStatus === 'Reserve/Guard'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Reserve/National Guard</div>
                  <div className="text-sm opacity-75">Currently serving in reserves or guard</div>
                </button>
                <button
                  onClick={() => updateFormData({ militaryStatus: 'Spouse' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.militaryStatus === 'Spouse'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Military Spouse</div>
                  <div className="text-sm opacity-75">Spouse of active duty or veteran</div>
                </button>
              </div>
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
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => updateFormData({ companyStage: 'Idea Stage' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.companyStage === 'Idea Stage'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Idea Stage</div>
                  <div className="text-sm opacity-75">Conceptualizing and planning</div>
                </button>
                <button
                  onClick={() => updateFormData({ companyStage: 'Seed Stage' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.companyStage === 'Seed Stage'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Seed Stage</div>
                  <div className="text-sm opacity-75">Initial funding and development</div>
                </button>
                <button
                  onClick={() => updateFormData({ companyStage: 'Series A' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.companyStage === 'Series A'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Series A</div>
                  <div className="text-sm opacity-75">Product-market fit and growth</div>
                </button>
                <button
                  onClick={() => updateFormData({ companyStage: 'Series B+' })}
                  className={`p-4 border-2 rounded-lg text-left transition-colors ${
                    formData.companyStage === 'Series B+'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold">Series B+</div>
                  <div className="text-sm opacity-75">Scaling and expansion</div>
                </button>
              </div>
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
                      <span>Step {currentStep} of {totalSteps}</span>
                      <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
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

// Step Components
const WelcomeStep: React.FC<{ brand: any; onNext: () => void }> = ({ brand, onNext }) => (
  <div className="text-center space-y-6">
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Welcome to {brand.brandName}
      </h2>
      <p className="text-lg text-gray-600">
        Complete your comprehensive life insurance application
      </p>
      <p className="text-sm text-gray-500">
        This will take about 10-15 minutes to complete
      </p>
    </div>
    <Button onClick={onNext} className="w-full py-3">
      Start Application
    </Button>
  </div>
);

const ContactInfoStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Contact Information</h2>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) => updateFormData({ firstName: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) => updateFormData({ lastName: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    <input
      type="email"
      placeholder="Email Address"
      value={formData.email}
      onChange={(e) => updateFormData({ email: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    <input
      type="tel"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={(e) => updateFormData({ phone: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const BirthdayStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Date of Birth</h2>
    <input
      type="date"
      value={formData.dateOfBirth}
      onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const StateSelectionStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">State of Residence</h2>
    <select
      value={formData.state}
      onChange={(e) => updateFormData({ state: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">Select your state</option>
      <option value="AL">Alabama</option>
      <option value="AK">Alaska</option>
      <option value="AZ">Arizona</option>
      <option value="AR">Arkansas</option>
      <option value="CA">California</option>
      <option value="CO">Colorado</option>
      <option value="CT">Connecticut</option>
      <option value="DE">Delaware</option>
      <option value="FL">Florida</option>
      <option value="GA">Georgia</option>
      <option value="HI">Hawaii</option>
      <option value="ID">Idaho</option>
      <option value="IL">Illinois</option>
      <option value="IN">Indiana</option>
      <option value="IA">Iowa</option>
      <option value="KS">Kansas</option>
      <option value="KY">Kentucky</option>
      <option value="LA">Louisiana</option>
      <option value="ME">Maine</option>
      <option value="MD">Maryland</option>
      <option value="MA">Massachusetts</option>
      <option value="MI">Michigan</option>
      <option value="MN">Minnesota</option>
      <option value="MS">Mississippi</option>
      <option value="MO">Missouri</option>
      <option value="MT">Montana</option>
      <option value="NE">Nebraska</option>
      <option value="NV">Nevada</option>
      <option value="NH">New Hampshire</option>
      <option value="NJ">New Jersey</option>
      <option value="NM">New Mexico</option>
      <option value="NY">New York</option>
      <option value="NC">North Carolina</option>
      <option value="ND">North Dakota</option>
      <option value="OH">Ohio</option>
      <option value="OK">Oklahoma</option>
      <option value="OR">Oregon</option>
      <option value="PA">Pennsylvania</option>
      <option value="RI">Rhode Island</option>
      <option value="SC">South Carolina</option>
      <option value="SD">South Dakota</option>
      <option value="TN">Tennessee</option>
      <option value="TX">Texas</option>
      <option value="UT">Utah</option>
      <option value="VT">Vermont</option>
      <option value="VA">Virginia</option>
      <option value="WA">Washington</option>
      <option value="WV">West Virginia</option>
      <option value="WI">Wisconsin</option>
      <option value="WY">Wyoming</option>
    </select>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const MaritalStatusStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Marital Status</h2>
    <select
      value={formData.maritalStatus}
      onChange={(e) => updateFormData({ maritalStatus: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">Select your marital status</option>
      <option value="Single">Single</option>
      <option value="Married">Married</option>
      <option value="Divorced">Divorced</option>
      <option value="Widowed">Widowed</option>
      <option value="Separated">Separated</option>
    </select>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const MilitaryStatusStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Military Status</h2>
    <select
      value={formData.militaryStatus}
      onChange={(e) => updateFormData({ militaryStatus: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">Select your military status</option>
      <option value="Veteran">Veteran</option>
      <option value="Active Duty">Active Duty</option>
      <option value="Reserves">Reserves</option>
      <option value="National Guard">National Guard</option>
      <option value="Retired">Retired</option>
      <option value="None">None</option>
    </select>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const BranchOfServiceStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Branch of Service</h2>
    <select
      value={formData.branchOfService}
      onChange={(e) => updateFormData({ branchOfService: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">Select your branch</option>
      <option value="Army">Army</option>
      <option value="Navy">Navy</option>
      <option value="Air Force">Air Force</option>
      <option value="Marines">Marines</option>
      <option value="Coast Guard">Coast Guard</option>
      <option value="Space Force">Space Force</option>
    </select>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const HeightWeightStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Height & Weight</h2>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Height (inches)"
        value={formData.height}
        onChange={(e) => updateFormData({ height: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        placeholder="Weight (lbs)"
        value={formData.weight}
        onChange={(e) => updateFormData({ weight: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const MedicalConditionsStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Medical Conditions</h2>
    <p className="text-gray-600 text-center">Do you have any of the following conditions?</p>
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
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const HospitalCareStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Hospital Care</h2>
    <p className="text-gray-600 text-center">Have you been hospitalized in the last 5 years?</p>
    <div className="space-y-3">
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="hospitalCare"
          value="Yes"
          checked={formData.hospitalCare === 'Yes'}
          onChange={(e) => updateFormData({ hospitalCare: e.target.value })}
        />
        <span>Yes</span>
      </label>
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="hospitalCare"
          value="No"
          checked={formData.hospitalCare === 'No'}
          onChange={(e) => updateFormData({ hospitalCare: e.target.value })}
        />
        <span>No</span>
      </label>
    </div>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const DiabetesMedicationStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Diabetes Medication</h2>
    <p className="text-gray-600 text-center">Do you take medication for diabetes?</p>
    <div className="space-y-3">
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="diabetesMedication"
          value="Yes"
          checked={formData.diabetesMedication === 'Yes'}
          onChange={(e) => updateFormData({ diabetesMedication: e.target.value })}
        />
        <span>Yes</span>
      </label>
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="diabetesMedication"
          value="No"
          checked={formData.diabetesMedication === 'No'}
          onChange={(e) => updateFormData({ diabetesMedication: e.target.value })}
        />
        <span>No</span>
      </label>
    </div>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const TobaccoUseStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Tobacco Use</h2>
    <p className="text-gray-600 text-center">Do you use tobacco products?</p>
    <div className="space-y-3">
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="tobaccoUse"
          value="Yes"
          checked={formData.tobaccoUse === 'Yes'}
          onChange={(e) => updateFormData({ tobaccoUse: e.target.value })}
        />
        <span>Yes</span>
      </label>
      <label className="flex items-center space-x-3">
        <input
          type="radio"
          name="tobaccoUse"
          value="No"
          checked={formData.tobaccoUse === 'No'}
          onChange={(e) => updateFormData({ tobaccoUse: e.target.value })}
        />
        <span>No</span>
      </label>
    </div>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const CoverageAmountStep: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Coverage Amount</h2>
    <p className="text-gray-600 text-center">How much coverage do you need?</p>
    <div className="space-y-3">
      {['$50,000', '$100,000', '$150,000', '$200,000', '$250,000'].map((amount) => (
        <label key={amount} className="flex items-center space-x-3">
          <input
            type="radio"
            name="coverageAmount"
            value={amount}
            checked={formData.coverageAmount === amount}
            onChange={(e) => updateFormData({ coverageAmount: e.target.value })}
          />
          <span>{amount}</span>
        </label>
      ))}
    </div>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const ApplicationStep1: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Address Information</h2>
    <input
      type="text"
      placeholder="Street Address"
      value={formData.streetAddress}
      onChange={(e) => updateFormData({ streetAddress: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="City"
        value={formData.city}
        onChange={(e) => updateFormData({ city: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="ZIP Code"
        value={formData.zipCode}
        onChange={(e) => updateFormData({ zipCode: e.target.value })}
        className="px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const ApplicationStep2: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Driver's License</h2>
    <input
      type="text"
      placeholder="Driver's License Number"
      value={formData.driversLicense}
      onChange={(e) => updateFormData({ driversLicense: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
    <select
      value={formData.licenseState}
      onChange={(e) => updateFormData({ licenseState: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    >
      <option value="">Select license state</option>
      <option value="CA">California</option>
      <option value="TX">Texas</option>
      <option value="FL">Florida</option>
      <option value="NY">New York</option>
      <option value="PA">Pennsylvania</option>
    </select>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const IULQuoteModal: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">IUL Quote</h2>
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold">Your Estimated Premium</h3>
          <div className="text-3xl font-bold text-green-600">$150/month</div>
          <p className="text-gray-600">Based on your information</p>
        </div>
      </CardContent>
    </Card>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const OptionsModal: React.FC<{ formData: FormData; updateFormData: (data: Partial<FormData>) => void; onNext: () => void; onBack: () => void }> = ({ formData, updateFormData, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center">Policy Options</h2>
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-bold mb-2">Whole Life</h3>
          <p className="text-sm text-gray-600">Lifetime protection with cash value</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-bold mb-2">Term Life</h3>
          <p className="text-sm text-gray-600">Affordable coverage for a set period</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-bold mb-2">Indexed Universal Life</h3>
          <p className="text-sm text-gray-600">Market-linked growth potential</p>
        </CardContent>
      </Card>
    </div>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const PreQualifiedSuccess: React.FC<{ formData: FormData; onNext: () => void; onBack: () => void }> = ({ formData, onNext, onBack }) => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
      <CheckCircle className="h-8 w-8 text-green-600" />
    </div>
    <h2 className="text-2xl font-bold">Pre-Qualified!</h2>
    <p className="text-gray-600">Congratulations! You've been pre-qualified for life insurance coverage.</p>
    <div className="flex space-x-3">
      <Button onClick={onBack} variant="outline" className="flex-1">Back</Button>
      <Button onClick={onNext} className="flex-1">Continue</Button>
    </div>
  </div>
);

const LoadingScreen: React.FC<{ onNext: () => void; onBack: () => void }> = ({ onNext, onBack }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="space-y-6 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <h2 className="text-2xl font-bold">Processing Your Application</h2>
      <p className="text-gray-600">Please wait while we review your information...</p>
    </div>
  );
};

const FinalSuccessModal: React.FC<{ formData: FormData; onComplete: (data: any) => void; onBack: () => void }> = ({ formData, onComplete, onBack }) => (
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
      <Button onClick={onBack} variant="outline" className="w-full">
        Back
      </Button>
    </div>
  </div>
);

export default ComprehensiveFunnel; 
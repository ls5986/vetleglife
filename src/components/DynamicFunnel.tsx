"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFunnelStore } from '../store/funnelStore';
import { ProgressBar } from './shared/ProgressBar';
import { Button } from './shared/Button';
import { StreamingLoadingSpinner } from './shared/StreamingLoadingSpinner';
import { StateSelection } from './steps/StateSelection';
import { MilitaryStatus } from './steps/MilitaryStatus';
import { BranchOfService } from './steps/BranchOfService';
import { ResponderType } from './steps/ResponderType';
import { LineOfDutyRisk } from './steps/LineOfDutyRisk';
import { EducatorRole } from './steps/EducatorRole';
import { SchoolSafetyConcerns } from './steps/SchoolSafetyConcerns';
import { PlatformType } from './steps/PlatformType';
import { FollowerCount } from './steps/FollowerCount';
import { CompanyStage } from './steps/CompanyStage';
import { FundingRound } from './steps/FundingRound';
import { FamilySize } from './steps/FamilySize';
import { HomeOwnership } from './steps/HomeOwnership';
import { TradeType } from './steps/TradeType';
import { YearsInTrade } from './steps/YearsInTrade';
import { IncomeLevel } from './steps/IncomeLevel';
import { CareerStage } from './steps/CareerStage';
import { TradingType } from './steps/TradingType';
import { PortfolioSize } from './steps/PortfolioSize';
import { YearsInUS } from './steps/YearsInUS';
import { CitizenshipStatus } from './steps/CitizenshipStatus';
import { MaritalStatus } from './steps/MaritalStatus';
import { CoverageAmount } from './steps/CoverageAmount';
import { ContactInfo } from './steps/ContactInfo';
import { Birthday } from './steps/Birthday';
import { TobaccoUse } from './steps/TobaccoUse';
import { MedicalConditions } from './steps/MedicalConditions';
import { HeightWeight } from './steps/HeightWeight';
import { HospitalCare } from './steps/HospitalCare';
import { DiabetesMedication } from './steps/DiabetesMedication';
import { PreQualifiedSuccess } from './steps/PreQualifiedSuccess';
import { IULQuoteModal } from './steps/IULQuoteModal';
import { ApplicationStep1 } from './steps/ApplicationStep1';
import { ApplicationStep2 } from './steps/ApplicationStep2';
import { FinalSuccessModal } from './steps/FinalSuccessModal';
import { validateContactInfo } from '../utils/validation';
import { BrandConfig, getBrandById } from '../config/brands';
import AgentHandoffStep from './steps/AgentHandoffStep';

interface DynamicFunnelProps {
  brandConfig: BrandConfig;
  onComplete: (data: any) => void;
  onClose: () => void;
}

// Component mapping for dynamic rendering
const COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  StateSelection,
  MilitaryStatus,
  BranchOfService,
  ResponderType,
  LineOfDutyRisk,
  EducatorRole,
  SchoolSafetyConcerns,
  MaritalStatus,
  CoverageAmount,
  ContactInfo,
  Birthday,
  TobaccoUse,
  MedicalConditions,
  HeightWeight,
  HospitalCare,
  DiabetesMedication,
  StreamingLoadingSpinner,
  PreQualifiedSuccess,
  IULQuoteModal,
  ApplicationStep1,
  ApplicationStep2,
  FinalSuccessModal
};

export default function DynamicFunnel({ brandConfig, onComplete, onClose }: DynamicFunnelProps) {
  const { 
    isModalOpen, 
    closeModal, 
    currentStep, 
    goToNextStep, 
    goToPreviousStep,
    formData,
    setAutoAdvanceEnabled,
    createInitialSession
  } = useFunnelStore();

  const [showExitConfirm, setShowExitConfirm] = React.useState(false);
  const [showHandoff, setShowHandoff] = React.useState(false);
  const legacyBrand = getBrandById(brandConfig.id);
  const supportPhone = legacyBrand?.phone || '1-800-555-1234';
  const supportDomain = legacyBrand?.domain || 'legacylifeadvocates.com';

  const TOTAL_STEPS = brandConfig.funnelSteps.length;

  // Map real step numbers to chunked display steps for the top bar:
  // 1-7, then 1-8 (steps 8-15), then 1-2 (steps 16-17). Step 18 treated as 2/2.
  const getDisplayProgress = React.useCallback((): { displayStep: number; displayTotal: number } => {
    // Treat the loading screen (StreamingLoadingSpinner) as not a counted step
    const stepComponent = brandConfig.funnelSteps.find(s => s.stepNumber === currentStep)?.component;
    const effectiveStep = stepComponent === 'StreamingLoadingSpinner' ? currentStep - 1 : currentStep;
    // Chunk 1: steps 1-7
    if (effectiveStep <= 7) {
      return { displayStep: Math.max(1, effectiveStep), displayTotal: 7 };
    }
    // Chunk 2: medical questions (steps 8-15) should display 1..8 starting at step 8
    if (effectiveStep >= 8 && effectiveStep <= 15) {
      return { displayStep: effectiveStep - 7, displayTotal: 8 };
    }
    // Chunk 3: last 2 steps (17-18) display 1..2
    const capped = Math.min(effectiveStep, 18);
    return { displayStep: Math.max(1, capped - 16), displayTotal: 2 };
  }, [currentStep, brandConfig.funnelSteps]);
  const VIRTUAL_TOTAL_STEPS = 18;

  // Create initial session when funnel opens
  React.useEffect(() => {
    if (!formData.sessionId) {
      console.log(`🚀 [DYNAMIC FUNNEL] Funnel opened for brand: ${brandConfig.id}`);
      createInitialSession();
    }
  }, [formData.sessionId, createInitialSession, brandConfig.id]);

  // Show handoff on step 7 only when DOB is valid; do not auto-advance
  React.useEffect(() => {
    if (currentStep === 7) {
      const dob = formData?.contactInfo?.dateOfBirth || '';
      const validDob = !!dob && dob.includes('-') && dob.split('-').filter(Boolean).length === 3;
      if (validDob) {
        setShowHandoff(true);
      } else {
        setShowHandoff(false);
      }
      setAutoAdvanceEnabled(false);
      return;
    }
    setAutoAdvanceEnabled(true);
  }, [currentStep, formData?.contactInfo?.dateOfBirth, setAutoAdvanceEnabled]);

  const renderStep = () => {
    // Handoff renders on step 7 (overlay-style screen content), not consuming step 8
    if (currentStep === 7 && showHandoff) {
      return <AgentHandoffStep onContinue={() => { setShowHandoff(false); goToNextStep(); }} supportPhone={supportPhone} />;
    }
    const currentStepConfig = brandConfig.funnelSteps.find(step => step.stepNumber === currentStep);
    if (!currentStepConfig) {
      return <div>Step not found</div>;
    }

    const Component = COMPONENT_MAP[currentStepConfig.component];
    if (!Component) {
      return <div>Component {currentStepConfig.component} not found</div>;
    }

    // Special handling for loading step
    if (currentStepConfig.component === 'StreamingLoadingSpinner') {
      return (
        <StreamingLoadingSpinner
          branchOfService={formData.preQualification?.branchOfService || 
                          formData.preQualification?.responderType || 
                          formData.preQualification?.educatorRole || 
                          'Professional'}
          isVisible={true}
          onComplete={() => goToNextStep()}
        />
      );
    }

    // Special handling for IULQuoteModal
    if (currentStepConfig.component === 'IULQuoteModal') {
      return (
        <IULQuoteModal />
      );
    }

    // Special handling for FinalSuccessModal
    if (currentStepConfig.component === 'FinalSuccessModal') {
      return (
        <FinalSuccessModal brandId={brandConfig.id} />
      );
    }

    // Special handling for PreQualifiedSuccess
    if (currentStepConfig.component === 'PreQualifiedSuccess') {
      return (
        <PreQualifiedSuccess />
      );
    }

    return <Component />;
  };

  const canGoNext = () => {
    const currentStepConfig = brandConfig.funnelSteps.find(step => step.stepNumber === currentStep);
    if (!currentStepConfig) return false;

    switch (currentStepConfig.component) {
      case 'StateSelection':
        return !!formData.preQualification?.state;
      case 'MilitaryStatus':
        return !!formData.preQualification?.militaryStatus;
      case 'BranchOfService':
        return !!formData.preQualification?.branchOfService;
      case 'ResponderType':
        return !!formData.preQualification?.responderType;
      case 'LineOfDutyRisk':
        return !!formData.preQualification?.lineOfDutyRisk;
      case 'EducatorRole':
        return !!formData.preQualification?.educatorRole;
      case 'SchoolSafetyConcerns':
        return !!formData.preQualification?.schoolSafetyConcerns;
      case 'MaritalStatus':
        return !!formData.preQualification?.maritalStatus;
      case 'CoverageAmount':
        return !!formData.preQualification?.coverageAmount;
      case 'ContactInfo':
        const validation = validateContactInfo(formData.contactInfo || {});
        return validation.isValid;
      case 'Birthday':
        return !!formData.contactInfo?.dateOfBirth;
      case 'TobaccoUse':
        return !!formData.medicalAnswers?.tobaccoUse;
      case 'MedicalConditions':
        return formData.medicalAnswers?.medicalConditions && formData.medicalAnswers.medicalConditions.length > 0;
      case 'HeightWeight':
        return !!formData.medicalAnswers?.height && !!formData.medicalAnswers?.weight;
      case 'HospitalCare':
        return !!formData.medicalAnswers?.hospitalCare;
      case 'DiabetesMedication':
        return !!formData.medicalAnswers?.diabetesMedication;
      case 'StreamingLoadingSpinner':
        return false; // Loading step - no manual progression
      case 'PreQualifiedSuccess':
        return true; // Success step - can always proceed
      case 'IULQuoteModal':
        return true; // IUL Quote Modal - can always proceed
      case 'ApplicationStep1':
        return isApplicationStep1Complete();
      case 'ApplicationStep2':
        return isApplicationStep2Complete();
      case 'FinalSuccessModal':
        return true; // Final success - can always proceed
      default:
        return true;
    }
  };

  const handleNext = () => {
    const currentStepConfig = brandConfig.funnelSteps.find(step => step.stepNumber === currentStep);
    if (!currentStepConfig) return;
    if (currentStep === 7) {
      // Between step 7 and 8 show handoff as its own screen
      if (canGoNext()) {
        setShowHandoff(true);
        setAutoAdvanceEnabled(false);
        // Do NOT advance here; AgentHandoffStep's onContinue controls advancement to step 8
      }
      return;
    }
    if (canGoNext()) {
      setAutoAdvanceEnabled(true);
      goToNextStep();
    }
  };

  const handleBack = () => {
    // If we're on the handoff screen (rendered at step 7), Back should return to Birthday (same step)
    if (currentStep === 7 && showHandoff) {
      setShowHandoff(false);
      setAutoAdvanceEnabled(false);
      return;
    }
    goToPreviousStep();
  };

  const isApplicationStep1Complete = () => {
    return !!formData.applicationData?.streetAddress &&
           !!formData.applicationData?.city &&
           !!formData.applicationData?.zipCode &&
           !!formData.applicationData?.beneficiaryName &&
           !!formData.applicationData?.beneficiaryRelationship &&
           !!formData.applicationData?.driversLicense;
  };

  const isApplicationStep2Complete = () => {
    return !!formData.applicationData?.ssn &&
           !!formData.applicationData?.bankName &&
           !!formData.applicationData?.routingNumber &&
           !!formData.applicationData?.accountNumber &&
           !!formData.quoteData?.policyDate;
  };

  // Parent controls mounting of this modal; do not gate on isModalOpen here

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => {
          if (currentStep >= TOTAL_STEPS) {
            closeModal();
            onClose();
          } else {
            setShowExitConfirm(true);
          }
        }}
      />
      
      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          {/* Close Button */}
          <button
            onClick={() => {
              if (currentStep >= TOTAL_STEPS) {
                closeModal();
                onClose();
              } else {
                setShowExitConfirm(true);
              }
            }}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Funnel Content */}
          <div className="p-6">
            {/* Exit confirmation overlay */}
            {showExitConfirm && currentStep < TOTAL_STEPS && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80">
                <div className="bg-white rounded-lg shadow-lg border w-full max-w-md p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are you sure you want to leave?</h3>
                  <p className="text-sm text-gray-600 mb-4">You have unsaved progress. Before you go, we can connect you with a licensed agent.</p>
                  <div className="space-y-2">
                    <a href={`tel:${supportPhone}`} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2">Speak to a Licensed Agent</a>
                    <a href={`mailto:support@${supportDomain}`} className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md py-2">Email Us</a>
                    <a href={(brandConfig as any)?.scheduleUrl || '#'} target="_blank" className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-md py-2">Schedule a Call</a>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <button onClick={() => setShowExitConfirm(false)} className="text-sm text-blue-700 hover:underline">Stay on this page</button>
                    <button
                      onClick={() => { setShowExitConfirm(false); closeModal(); onClose(); }}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      OK, leave and lose progress
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Progress Bar */}
            <div className="mb-6">
              {(() => { const p = getDisplayProgress(); return (
                <ProgressBar currentStep={p.displayStep} totalSteps={p.displayTotal} />
              ); })()}
            </div>
            
            {/* Step Content */}
            <div className="min-h-[400px]">
              {renderStep()}
            </div>
            
            {/* Navigation Buttons */}
            {currentStep !== 13 && currentStep !== 15 && !(currentStep === 7 && showHandoff) && (
              <div className="flex justify-between items-center mt-6 gap-4">
                {currentStep > 1 && (
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                
                <div className="flex-1"></div>
                
                {currentStep < VIRTUAL_TOTAL_STEPS && (
                  <Button
                    onClick={handleNext}
                    disabled={!canGoNext()}
                  >
                    {currentStep === 7 ? 'Submit' : (currentStep === VIRTUAL_TOTAL_STEPS - 1 ? 'Submit' : 'Continue')}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

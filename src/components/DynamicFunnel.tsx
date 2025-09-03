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
import { BrandConfig } from '../config/brands';

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

  const TOTAL_STEPS = brandConfig.funnelSteps.length;

  // Create initial session when funnel opens
  React.useEffect(() => {
    if (isModalOpen && !formData.sessionId) {
      console.log(`🚀 [DYNAMIC FUNNEL] Funnel opened for brand: ${brandConfig.id}`);
      createInitialSession();
    }
  }, [isModalOpen, formData.sessionId, createInitialSession, brandConfig.id]);

  const renderStep = () => {
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
    if (canGoNext()) {
      // Re-enable auto-advance when user clicks Continue
      setAutoAdvanceEnabled(true);
      goToNextStep();
    }
  };

  const handleBack = () => {
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Funnel Content */}
          <div className="p-6">
            {/* Progress Bar */}
            <div className="mb-6">
              <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
            </div>
            
            {/* Step Content */}
            <div className="min-h-[400px]">
              {renderStep()}
            </div>
            
            {/* Navigation Buttons */}
            {currentStep !== 13 && currentStep !== 15 && (
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
                
                {currentStep < TOTAL_STEPS && (
                  <Button
                    onClick={handleNext}
                    disabled={!canGoNext()}
                  >
                    {currentStep === TOTAL_STEPS - 1 ? 'Submit' : 'Continue'}
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

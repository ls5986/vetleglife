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
    setAutoAdvanceEnabled
  } = useFunnelStore();

  const TOTAL_STEPS = brandConfig.funnelSteps.length;

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
        const validation = validateContactInfo(formData.contactInfo);
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

  if (!isModalOpen) return null;

  return (
    <>
      <motion.div
        className="modal-overlay active"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--text-light)'
            }}
          >
            ×
          </button>

          {/* Don't show progress bar during loading screen */}
          {currentStep !== 13 && (
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Don't show action buttons during loading screen or for IULQuoteModal */}
          {currentStep !== 13 && currentStep !== 15 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '2rem',
              gap: '1rem'
            }}>
              {currentStep > 1 && (
                <Button
                  variant="secondary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              
              <div style={{ flex: 1 }}></div>
              
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
        </motion.div>
      </motion.div>
    </>
  );
}

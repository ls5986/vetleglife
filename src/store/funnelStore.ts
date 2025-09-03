import { create } from 'zustand';

interface FormData {
  preQualification: {
    state: string;
    militaryStatus: string;
    branchOfService: string;
    responderType: string;
    lineOfDutyRisk: string;
    educatorRole: string;
    schoolSafetyConcerns: string;
    maritalStatus: string;
    coverageAmount: string;
  };
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    month: string;
    day: string;
    year: string;
    transactionalConsent: boolean;
    marketingConsent: boolean;
  };
  medicalAnswers: {
    tobaccoUse: string;
    medicalConditions: string[];
    height: string;
    weight: string;
    hospitalCare: string;
    diabetesMedication: string;
  };
  applicationData: {
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
  };
  quoteData: {
    policyDate: string;
    coverage: string;
    premium: string;
    age: string;
    gender: string;
    type: string;
    healthTier: string;
  };
  // Session tracking and metadata
  sessionId: string;
  currentStep: number;
  exitIntent: boolean;
  utmSource: string;
  utmCampaign: string;
}

interface FunnelStore {
  currentStep: number;
  formData: FormData;
  autoAdvanceEnabled: boolean;
  isModalOpen: boolean;
  
  // Actions
  setCurrentStep: (step: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  updateFormData: (updates: Partial<FormData>) => void;
  setAutoAdvanceEnabled: (enabled: boolean) => void;
  openModal: () => void;
  closeModal: () => void;
  submitPartial: () => void;
  resetFunnel: () => void;
}

// Generate a unique session ID
function generateSessionId(): string {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

const initialFormData: FormData = {
  preQualification: {
    state: '',
    militaryStatus: '',
    branchOfService: '',
    responderType: '',
    lineOfDutyRisk: '',
    educatorRole: '',
    schoolSafetyConcerns: '',
    maritalStatus: '',
    coverageAmount: ''
  },
  contactInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    month: '',
    day: '',
    year: '',
    transactionalConsent: false,
    marketingConsent: false
  },
  medicalAnswers: {
    tobaccoUse: '',
    medicalConditions: [],
    height: '',
    weight: '',
    hospitalCare: '',
    diabetesMedication: ''
  },
  applicationData: {
    streetAddress: '',
    city: '',
    zipCode: '',
    beneficiaryName: '',
    beneficiaryRelationship: '',
    driversLicense: '',
    ssn: '',
    bankName: '',
    routingNumber: '',
    accountNumber: ''
  },
  quoteData: {
    policyDate: '',
    coverage: '',
    premium: '',
    age: '',
    gender: '',
    type: '',
    healthTier: ''
  },
  sessionId: generateSessionId(),
  currentStep: 1,
  exitIntent: false,
  utmSource: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_source') || '' : '',
  utmCampaign: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('utm_campaign') || '' : ''
};

export const useFunnelStore = create<FunnelStore>((set, get) => ({
  currentStep: 1,
  formData: initialFormData,
  autoAdvanceEnabled: true,
  isModalOpen: true, // Start with modal open

  setCurrentStep: (step: number) => set({ currentStep: step }),
  
  goToNextStep: () => {
    const { currentStep } = get();
    if (currentStep < 18) {
      set({ currentStep: currentStep + 1 });
    }
  },
  
  goToPreviousStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      set({ currentStep: currentStep - 1 });
    }
  },
  
  updateFormData: (updates: Partial<FormData>) => {
    set((state) => ({
      formData: {
        ...state.formData,
        ...updates
      }
    }));
  },
  
  setAutoAdvanceEnabled: (enabled: boolean) => set({ autoAdvanceEnabled: enabled }),
  
  openModal: () => set({ isModalOpen: true }),
  
  closeModal: () => set({ isModalOpen: false }),
  
  submitPartial: () => {
    // This would typically save partial data to the backend
    console.log('Submitting partial data');
  },
  
  resetFunnel: () => {
    set({
      currentStep: 1,
      formData: initialFormData,
      autoAdvanceEnabled: true,
      isModalOpen: false
    });
  }
}));

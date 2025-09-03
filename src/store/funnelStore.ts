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
  submitStepData: (step: number, data: FormData) => Promise<void>;
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
    const { currentStep, formData } = get();
    console.log(`🔄 [FUNNEL STORE] goToNextStep called - Current step: ${currentStep}`);
    
    if (currentStep < 18) {
      const newStep = currentStep + 1;
      console.log(`➡️ [FUNNEL STORE] Moving from step ${currentStep} to step ${newStep}`);
      
      set({ currentStep: newStep });
      
      // Submit data after every step change to capture progress
      console.log(`💾 [FUNNEL STORE] Triggering submitStepData for step ${newStep}`);
      get().submitStepData(newStep, formData);
    } else {
      console.log(`🏁 [FUNNEL STORE] Already at final step ${currentStep}, cannot advance further`);
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
  },
  
  submitStepData: async (step: number, data: FormData) => {
    try {
      console.log(`🚀 [FUNNEL STORE] Starting to submit step ${step} data to Supabase...`);
      console.log(`📊 [FUNNEL STORE] Current form data:`, data);
      
      // Get the current brand from the URL
      const pathSegments = window.location.pathname.split('/');
      const brandId = pathSegments[pathSegments.length - 1] || 'veteran-legacy-life';
      
      console.log(`🏷️ [FUNNEL STORE] Brand ID from URL: ${brandId}`);
      console.log(`🌐 [FUNNEL STORE] Domain: ${window.location.hostname}`);
      console.log(`🆔 [FUNNEL STORE] Session ID: ${data.sessionId}`);
      
      const requestBody = {
        leadData: {
          session_id: data.sessionId,
          brand_id: brandId,
          domain: window.location.hostname,
          current_step: step,
          status: step === 18 ? 'completed' : 'partial',
          first_name: data.contactInfo?.firstName || '',
          last_name: data.contactInfo?.lastName || '',
          email: data.contactInfo?.email || '',
          phone: data.contactInfo?.phone || '',
          state: data.preQualification?.state || '',
          military_status: data.preQualification?.militaryStatus || '',
          branch_of_service: data.preQualification?.branchOfService || '',
          marital_status: data.preQualification?.maritalStatus || '',
          coverage_amount: data.preQualification?.coverageAmount || '',
          date_of_birth: data.contactInfo?.dateOfBirth || '',
          height: data.medicalAnswers?.height || '',
          weight: data.medicalAnswers?.weight || '',
          tobacco_use: data.medicalAnswers?.tobaccoUse || '',
          medical_conditions: data.medicalAnswers?.medicalConditions || [],
          hospital_care: data.medicalAnswers?.hospitalCare || '',
          diabetes_medication: data.medicalAnswers?.diabetesMedication || '',
          street_address: data.applicationData?.streetAddress || '',
          city: data.applicationData?.city || '',
          zip_code: data.applicationData?.zipCode || '',
          beneficiary_name: data.applicationData?.beneficiaryName || '',
          beneficiary_relationship: data.applicationData?.beneficiaryRelationship || '',
          drivers_license: data.applicationData?.driversLicense || '',
          ssn: data.applicationData?.ssn || '',
          bank_name: data.applicationData?.bankName || '',
          routing_number: data.applicationData?.routingNumber || '',
          account_number: data.applicationData?.accountNumber || '',
          policy_date: data.quoteData?.policyDate || '',
          transactional_consent: data.contactInfo?.transactionalConsent || false,
          marketing_consent: data.contactInfo?.marketingConsent || false,
          exit_intent: data.exitIntent || false,
          utm_source: data.utmSource || '',
          utm_campaign: data.utmCampaign || '',
          user_agent: navigator.userAgent,
          referrer: document.referrer
        }
      };
      
      console.log(`📤 [FUNNEL STORE] Sending request to /api/leads:`, requestBody);
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log(`📥 [FUNNEL STORE] Response received:`, response);
      console.log(`📊 [FUNNEL STORE] Response status: ${response.status}`);
      console.log(`📊 [FUNNEL STORE] Response ok: ${response.ok}`);

      if (!response.ok) {
        console.error(`❌ [FUNNEL STORE] Failed to submit step ${step} data:`, response);
        const errorText = await response.text();
        console.error(`❌ [FUNNEL STORE] Error response body:`, errorText);
      } else {
        const responseData = await response.json();
        console.log(`✅ [FUNNEL STORE] Step ${step} data submitted successfully!`);
        console.log(`📊 [FUNNEL STORE] Response data:`, responseData);
      }
    } catch (error) {
      console.error(`💥 [FUNNEL STORE] Exception submitting step ${step} data:`, error);
    }
  }
}));

export interface BrandConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  brandSpecificQuestions: BrandQuestion[];
  funnelSteps: FunnelStep[];
}

export interface BrandQuestion {
  id: string;
  step: number;
  question: string;
  description: string;
  options: string[];
  required: boolean;
  brandSpecific: boolean;
}

export interface FunnelStep {
  id: string;
  stepNumber: number;
  component: string;
  isBrandSpecific: boolean;
  required: boolean;
}

export interface Brand {
  id: string;
  domain: string;
  brandName: string;
  targetDemographic: string;
  sellingPoint: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  phone: string;
  email: string;
  companyName: string;
  logoUrl?: string;
  facebookPixelId?: string;
  googleAnalyticsId?: string;
  isActive: boolean;
  customFields?: {
    [key: string]: any;
  };
}

export const BRANDS: Record<string, BrandConfig> = {
  'veteran-legacy-life': {
    id: 'veteran-legacy-life',
    name: 'Veteran Legacy Life',
    displayName: 'Veteran Legacy Life',
    description: 'Life insurance designed specifically for veterans and military families',
    heroTitle: 'Veteran Legacy Life',
    heroSubtitle: 'Protection for Those Who Protected Us',
    brandSpecificQuestions: [
      {
        id: 'military-status',
        step: 2,
        question: 'What is your military status?',
        description: 'This helps us determine your eligibility for veteran benefits.',
        options: [
          'Active Duty',
          'Veteran',
          'Reservist',
          'National Guard',
          'Retired',
          'Dependent',
          'None of the above'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'branch-of-service',
        step: 3,
        question: 'Which branch of service were you in?',
        description: 'This helps us provide you with branch-specific benefits and coverage options.',
        options: [
          'Army',
          'Navy',
          'Air Force',
          'Marine Corps',
          'Coast Guard',
          'Space Force',
          'National Guard',
          'Reserves',
          'None of the above'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'military-status', stepNumber: 2, component: 'MilitaryStatus', isBrandSpecific: true, required: true },
      { id: 'branch-of-service', stepNumber: 3, component: 'BranchOfService', isBrandSpecific: true, required: true },
      { id: 'marital-status', stepNumber: 4, component: 'MaritalStatus', isBrandSpecific: false, required: true },
      { id: 'coverage-amount', stepNumber: 5, component: 'CoverageAmount', isBrandSpecific: false, required: true },
      { id: 'contact-info', stepNumber: 6, component: 'ContactInfo', isBrandSpecific: false, required: true },
      { id: 'birthday', stepNumber: 7, component: 'Birthday', isBrandSpecific: false, required: true },
      { id: 'tobacco-use', stepNumber: 8, component: 'TobaccoUse', isBrandSpecific: false, required: true },
      { id: 'medical-conditions', stepNumber: 9, component: 'MedicalConditions', isBrandSpecific: false, required: true },
      { id: 'height-weight', stepNumber: 10, component: 'HeightWeight', isBrandSpecific: false, required: true },
      { id: 'hospital-care', stepNumber: 11, component: 'HospitalCare', isBrandSpecific: false, required: true },
      { id: 'diabetes-medication', stepNumber: 12, component: 'DiabetesMedication', isBrandSpecific: false, required: true },
      { id: 'loading', stepNumber: 13, component: 'StreamingLoadingSpinner', isBrandSpecific: false, required: false },
      { id: 'pre-qualified-success', stepNumber: 14, component: 'PreQualifiedSuccess', isBrandSpecific: false, required: false },
      { id: 'iul-quote-modal', stepNumber: 15, component: 'IULQuoteModal', isBrandSpecific: false, required: false },
      { id: 'application-step-1', stepNumber: 16, component: 'ApplicationStep1', isBrandSpecific: false, required: true },
      { id: 'application-step-2', stepNumber: 17, component: 'ApplicationStep2', isBrandSpecific: false, required: true },
      { id: 'final-success', stepNumber: 18, component: 'FinalSuccessModal', isBrandSpecific: false, required: false }
    ]
  }
};

export const LEGACY_BRANDS: Brand[] = [
  {
    id: 'veteran-legacy-life',
    domain: 'veteranlegacylife.com',
    brandName: 'Veteran Legacy Life',
    targetDemographic: 'Veterans & Active Service Members',
    sellingPoint: 'Exclusive 2025 life insurance benefits for veterans, active service members, and their families. Get whole life, term life, and IUL coverage with living benefits.',
    tagline: 'You May Qualify for New Life Insurance Benefits in 2025',
    primaryColor: '#2563eb',
    secondaryColor: '#3b6eea',
    phone: '1-800-VET-INSURANCE',
    email: 'info@veteranlegacylife.com',
    companyName: 'Veteran Legacy Life Insurance',
    isActive: true,
    customFields: {
      militaryStatus: true,
      branchOfService: true,
      vaBenefits: true
    }
  }
];

export const getBrandConfig = (brandId: string): BrandConfig | null => {
  return BRANDS[brandId] || null;
};

export const getAllBrands = (): BrandConfig[] => {
  return Object.values(BRANDS);
};

export function getBrandById(id: string): Brand | undefined {
  return LEGACY_BRANDS.find(brand => brand.id === id);
}

export function getBrandByDomain(domain: string): Brand | undefined {
  return LEGACY_BRANDS.find(brand => brand.domain === domain);
}

export function getAllActiveBrands(): Brand[] {
  return LEGACY_BRANDS.filter(brand => brand.isActive);
}

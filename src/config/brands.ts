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
  },
  'responder-legacy-life': {
    id: 'responder-legacy-life',
    name: 'Responder Legacy Life',
    displayName: 'Responder Legacy Life',
    description: 'Life insurance designed specifically for first responders and emergency personnel',
    heroTitle: 'Responder Legacy Life',
    heroSubtitle: 'Protection for Those Who Run Toward Danger',
    brandSpecificQuestions: [
      {
        id: 'responder-type',
        step: 2,
        question: 'What type of first responder are you?',
        description: 'This helps us provide you with profession-specific coverage and benefits.',
        options: [
          'Police Officer',
          'Firefighter',
          'EMT/Paramedic',
          'Nurse',
          'Doctor',
          'Corrections Officer',
          'Other First Responder'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'line-of-duty-risk',
        step: 3,
        question: 'Do you face line-of-duty risks in your profession?',
        description: 'This helps us determine appropriate coverage levels for your high-risk work.',
        options: [
          'Yes - High risk (active duty, SWAT, etc.)',
          'Yes - Medium risk (patrol, emergency response)',
          'Yes - Lower risk (administrative, support)',
          'No - Office-based role'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'responder-type', stepNumber: 2, component: 'ResponderType', isBrandSpecific: true, required: true },
      { id: 'line-of-duty-risk', stepNumber: 3, component: 'LineOfDutyRisk', isBrandSpecific: true, required: true },
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
  },
  'educator-legacy-life': {
    id: 'educator-legacy-life',
    name: 'Educator Legacy Life',
    displayName: 'Educator Legacy Life',
    description: 'Life insurance designed specifically for educators and school personnel',
    heroTitle: 'Educator Legacy Life',
    heroSubtitle: 'Protection for Those Who Shape Our Future',
    brandSpecificQuestions: [
      {
        id: 'educator-role',
        step: 2,
        question: 'What is your role in education?',
        description: 'This helps us provide you with profession-specific coverage and benefits.',
        options: [
          'Teacher (K-12)',
          'Teacher (College/University)',
          'Administrator',
          'Support Staff',
          'Substitute Teacher',
          'Other Education Professional'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'school-safety-concerns',
        step: 3,
        question: 'Do you have concerns about school safety in your role?',
        description: 'This helps us understand your specific risk factors and coverage needs.',
        options: [
          'Yes - Active shooter training required',
          'Yes - Security protocols in place',
          'Some concerns - Standard safety measures',
          'Minimal concerns - Low-risk environment'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'educator-role', stepNumber: 2, component: 'EducatorRole', isBrandSpecific: true, required: true },
      { id: 'school-safety-concerns', stepNumber: 3, component: 'SchoolSafetyConcerns', isBrandSpecific: true, required: true },
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
  },
  'creator-legacy-life': {
    id: 'creator-legacy-life',
    name: 'Creator Legacy Life',
    displayName: 'Creator Legacy Life',
    description: 'Life insurance designed specifically for content creators and digital entrepreneurs',
    heroTitle: 'Creator Legacy Life',
    heroSubtitle: 'Protection for Those Who Create',
    brandSpecificQuestions: [
      {
        id: 'platform-type',
        step: 2,
        question: 'What type of content do you create?',
        description: 'This helps us provide you with creator-specific coverage and benefits.',
        options: [
          'YouTube/Videos',
          'Social Media (Instagram, TikTok)',
          'Blogging/Writing',
          'Podcasting',
          'Gaming/Streaming',
          'Other Digital Content'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'follower-count',
        step: 3,
        question: 'What is your approximate follower/audience size?',
        description: 'This helps us understand your reach and coverage needs.',
        options: [
          'Under 1,000 followers',
          '1,000 - 10,000 followers',
          '10,000 - 100,000 followers',
          '100,000 - 1M followers',
          '1M+ followers',
          'Just starting out'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'platform-type', stepNumber: 2, component: 'PlatformType', isBrandSpecific: true, required: true },
      { id: 'follower-count', stepNumber: 3, component: 'FollowerCount', isBrandSpecific: true, required: true },
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
  },
  'startup-legacy-life': {
    id: 'startup-legacy-life',
    name: 'Startup Legacy Life',
    displayName: 'Startup Legacy Life',
    description: 'Life insurance designed specifically for startup founders and entrepreneurs',
    heroTitle: 'Startup Legacy Life',
    heroSubtitle: 'Protection for Those Who Build',
    brandSpecificQuestions: [
      {
        id: 'company-stage',
        step: 2,
        question: 'What stage is your startup in?',
        description: 'This helps us provide you with startup-specific coverage and benefits.',
        options: [
          'Idea/Concept',
          'MVP/Prototype',
          'Early Revenue',
          'Series A/B Funding',
          'Growth Stage',
          'Established Business'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'funding-round',
        step: 3,
        question: 'What is your current funding status?',
        description: 'This helps us understand your financial situation and coverage needs.',
        options: [
          'Bootstrapped',
          'Friends & Family',
          'Angel Investment',
          'Seed Round',
          'Series A',
          'Series B+',
          'IPO/Public'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'company-stage', stepNumber: 2, component: 'CompanyStage', isBrandSpecific: true, required: true },
      { id: 'funding-round', stepNumber: 3, component: 'FundingRound', isBrandSpecific: true, required: true },
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
  },
  'foundation-legacy-life': {
    id: 'foundation-legacy-life',
    name: 'Foundation Legacy Life',
    displayName: 'Foundation Legacy Life',
    description: 'Life insurance designed specifically for families building their foundation',
    heroTitle: 'Foundation Legacy Life',
    heroSubtitle: 'Protection for Those Who Build Families',
    brandSpecificQuestions: [
      {
        id: 'family-size',
        step: 2,
        question: 'How many children do you have?',
        description: 'This helps us provide you with family-specific coverage and benefits.',
        options: [
          'No children yet',
          '1 child',
          '2 children',
          '3 children',
          '4+ children'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'home-ownership',
        step: 3,
        question: 'What is your current home ownership status?',
        description: 'This helps us understand your financial situation and coverage needs.',
        options: [
          'Renting',
          'First-time homebuyer',
          'Homeowner (1-5 years)',
          'Homeowner (5+ years)',
          'Multiple properties'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'family-size', stepNumber: 2, component: 'FamilySize', isBrandSpecific: true, required: true },
      { id: 'home-ownership', stepNumber: 3, component: 'HomeOwnership', isBrandSpecific: true, required: true },
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
  },
  'trade-legacy-life': {
    id: 'trade-legacy-life',
    name: 'Trade Legacy Life',
    displayName: 'Trade Legacy Life',
    description: 'Life insurance designed specifically for skilled tradespeople',
    heroTitle: 'Trade Legacy Life',
    heroSubtitle: 'Protection for Those Who Build',
    brandSpecificQuestions: [
      {
        id: 'trade-type',
        step: 2,
        question: 'What type of trade do you work in?',
        description: 'This helps us provide you with trade-specific coverage and benefits.',
        options: [
          'Construction',
          'Plumbing',
          'Electrical',
          'HVAC',
          'Automotive',
          'Welding',
          'Other Skilled Trade'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'years-in-trade',
        step: 3,
        question: 'How many years have you been working in your trade?',
        description: 'This helps us understand your experience level and coverage needs.',
        options: [
          'Apprentice (0-2 years)',
          'Journeyman (2-5 years)',
          'Experienced (5-10 years)',
          'Master (10+ years)',
          'Business Owner'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'trade-type', stepNumber: 2, component: 'TradeType', isBrandSpecific: true, required: true },
      { id: 'years-in-trade', stepNumber: 3, component: 'YearsInTrade', isBrandSpecific: true, required: true },
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
  },
  'success-legacy-life': {
    id: 'success-legacy-life',
    name: 'Success Legacy Life',
    displayName: 'Success Legacy Life',
    description: 'Life insurance designed specifically for successful professionals',
    heroTitle: 'Success Legacy Life',
    heroSubtitle: 'Protection for Those Who Achieve',
    brandSpecificQuestions: [
      {
        id: 'income-level',
        step: 2,
        question: 'What is your approximate annual income?',
        description: 'This helps us provide you with success-specific coverage and benefits.',
        options: [
          'Under $50,000',
          '$50,000 - $100,000',
          '$100,000 - $250,000',
          '$250,000 - $500,000',
          '$500,000 - $1M',
          '$1M+'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'career-stage',
        step: 3,
        question: 'What stage are you in your career?',
        description: 'This helps us understand your professional situation and coverage needs.',
        options: [
          'Early Career',
          'Mid-Career',
          'Senior Professional',
          'Executive/C-Suite',
          'Business Owner',
          'Retired'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'income-level', stepNumber: 2, component: 'IncomeLevel', isBrandSpecific: true, required: true },
      { id: 'career-stage', stepNumber: 3, component: 'CareerStage', isBrandSpecific: true, required: true },
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
  },
  'immigrant-legacy-life': {
    id: 'immigrant-legacy-life',
    name: 'Immigrant Legacy Life',
    displayName: 'Immigrant Legacy Life',
    description: 'Life insurance designed specifically for immigrants and new Americans',
    heroTitle: 'Immigrant Legacy Life',
    heroSubtitle: 'Protection for Those Who Dream',
    brandSpecificQuestions: [
      {
        id: 'years-in-us',
        step: 2,
        question: 'How long have you been living in the United States?',
        description: 'This helps us provide you with immigrant-specific coverage and benefits.',
        options: [
          'Less than 1 year',
          '1-3 years',
          '3-5 years',
          '5-10 years',
          '10+ years'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'citizenship-status',
        step: 3,
        question: 'What is your current citizenship status?',
        description: 'This helps us understand your legal situation and coverage needs.',
        options: [
          'U.S. Citizen',
          'Permanent Resident (Green Card)',
          'Work Visa (H1B, L1, etc.)',
          'Student Visa (F1, J1)',
          'Other Visa Status'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'years-in-us', stepNumber: 2, component: 'YearsInUS', isBrandSpecific: true, required: true },
      { id: 'citizenship-status', stepNumber: 3, component: 'CitizenshipStatus', isBrandSpecific: true, required: true },
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
  },
  'trader-legacy-life': {
    id: 'trader-legacy-life',
    name: 'Trader Legacy Life',
    displayName: 'Trader Legacy Life',
    description: 'Life insurance designed specifically for active traders and investors',
    heroTitle: 'Trader Legacy Life',
    heroSubtitle: 'Protection for Those Who Trade',
    brandSpecificQuestions: [
      {
        id: 'trading-type',
        step: 2,
        question: 'What type of trading do you primarily engage in?',
        description: 'This helps us provide you with trader-specific coverage and benefits.',
        options: [
          'Day Trading',
          'Swing Trading',
          'Options Trading',
          'Futures Trading',
          'Forex Trading',
          'Long-term Investing',
          'Other Trading'
        ],
        required: true,
        brandSpecific: true
      },
      {
        id: 'portfolio-size',
        step: 3,
        question: 'What is your approximate portfolio size?',
        description: 'This helps us understand your financial situation and coverage needs.',
        options: [
          'Under $10,000',
          '$10,000 - $50,000',
          '$50,000 - $250,000',
          '$250,000 - $1M',
          '$1M - $5M',
          '$5M+'
        ],
        required: true,
        brandSpecific: true
      }
    ],
    funnelSteps: [
      { id: 'state-selection', stepNumber: 1, component: 'StateSelection', isBrandSpecific: false, required: true },
      { id: 'trading-type', stepNumber: 2, component: 'TradingType', isBrandSpecific: true, required: true },
      { id: 'portfolio-size', stepNumber: 3, component: 'PortfolioSize', isBrandSpecific: true, required: true },
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
  },
  {
    id: 'responder-legacy-life',
    domain: 'responderlegacylife.com',
    brandName: 'Responder Legacy Life',
    targetDemographic: 'First responders — firefighters, EMTs, police, nurses',
    sellingPoint: 'You protect and serve every day. Let us protect your family with a plan that never takes a day off.',
    tagline: 'The ones who save lives deserve theirs secured.',
    primaryColor: '#be185d',
    secondaryColor: '#ec4899',
    phone: '(555) 123-4568',
    email: 'info@responderlegacylife.com',
    companyName: 'Responder Legacy Life Insurance',
    isActive: true,
    customFields: {
      responderType: true,
      lineOfDutyRisk: true
    }
  },
  {
    id: 'educator-legacy-life',
    domain: 'educatorlegacylife.com',
    brandName: 'Educator Legacy Life',
    targetDemographic: 'Teachers, professors, educators, support staff',
    sellingPoint: 'You\'ve dedicated your life to teaching others. Now we\'ll help you protect your own legacy.',
    tagline: 'Secure the future you\'ve been shaping.',
    primaryColor: '#059669',
    secondaryColor: '#34d399',
    phone: '(555) 123-4568',
    email: 'info@educatorlegacylife.com',
    companyName: 'Educator Legacy Life Insurance',
    isActive: true,
    customFields: {
      educatorRole: true,
      schoolSafetyConcerns: true
    }
  },
  {
    id: 'creator-legacy-life',
    domain: 'creatorlegacylife.com',
    brandName: 'Creator Legacy Life',
    targetDemographic: 'Content creators, influencers, digital entrepreneurs',
    sellingPoint: 'You create content every day — but what about your financial future? Turn your hustle into a lasting legacy.',
    tagline: 'Protect the life behind the likes.',
    primaryColor: '#7c2d12',
    secondaryColor: '#ea580c',
    phone: '(555) 123-4568',
    email: 'info@creatorlegacylife.com',
    companyName: 'Creator Legacy Life Insurance',
    isActive: true,
    customFields: {
      platformType: true,
      followerCount: true
    }
  },
  {
    id: 'startup-legacy-life',
    domain: 'startuplegacylife.com',
    brandName: 'Startup Legacy Life',
    targetDemographic: 'Startup founders, entrepreneurs, business owners',
    sellingPoint: 'You take risks every day building your company — your financial future doesn\'t need to be one of them.',
    tagline: 'Build your dream. Secure your legacy.',
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    phone: '(555) 123-4568',
    email: 'info@startuplegacylife.com',
    companyName: 'Startup Legacy Life Insurance',
    isActive: true,
    customFields: {
      companyStage: true,
      fundingRound: true
    }
  },
  {
    id: 'foundation-legacy-life',
    domain: 'foundationlegacylife.com',
    brandName: 'Foundation Legacy Life',
    targetDemographic: 'Families, first-time homeowners, new parents',
    sellingPoint: 'Create a solid financial foundation that protects your family\'s future and builds generational wealth.',
    tagline: 'Build your foundation. Secure your family.',
    primaryColor: '#9333ea',
    secondaryColor: '#a855f7',
    phone: '(555) 123-4568',
    email: 'info@foundationlegacylife.com',
    companyName: 'Foundation Legacy Life Insurance',
    isActive: true,
    customFields: {
      familySize: true,
      homeOwnership: true
    }
  },
  {
    id: 'trade-legacy-life',
    domain: 'tradelegacylife.com',
    brandName: 'Trade Legacy Life',
    targetDemographic: 'Skilled tradespeople, blue-collar workers, craftsmen',
    sellingPoint: 'Skilled tradespeople deserve skilled protection. Our trade-focused life insurance plans understand your unique needs.',
    tagline: 'Master your trade. Secure your future.',
    primaryColor: '#ea580c',
    secondaryColor: '#f97316',
    phone: '(555) 123-4568',
    email: 'info@tradelegacylife.com',
    companyName: 'Trade Legacy Life Insurance',
    isActive: true,
    customFields: {
      tradeType: true,
      yearsInTrade: true
    }
  },
  {
    id: 'success-legacy-life',
    domain: 'successlegacylife.com',
    brandName: 'Success Legacy Life',
    targetDemographic: 'High achievers, professionals, executives',
    sellingPoint: 'Your success story deserves a happy ending. Protect your achievements and build lasting wealth.',
    tagline: 'Protect your success. Build your legacy.',
    primaryColor: '#0891b2',
    secondaryColor: '#0e7490',
    phone: '(555) 123-4568',
    email: 'info@successlegacylife.com',
    companyName: 'Success Legacy Life Insurance',
    isActive: true,
    customFields: {
      incomeLevel: true,
      careerStage: true
    }
  },
  {
    id: 'immigrant-legacy-life',
    domain: 'immigrantlegacylife.com',
    brandName: 'Immigrant Legacy Life',
    targetDemographic: 'Immigrants, new Americans, international families',
    sellingPoint: 'Your American dream deserves American protection. Build your future with confidence.',
    tagline: 'Dream American. Protect American.',
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444',
    phone: '(555) 123-4568',
    email: 'info@immigrantlegacylife.com',
    companyName: 'Immigrant Legacy Life Insurance',
    isActive: true,
    customFields: {
      yearsInUS: true,
      citizenshipStatus: true
    }
  },
  {
    id: 'trader-legacy-life',
    domain: 'traderlegacylife.com',
    brandName: 'Trader Legacy Life',
    targetDemographic: 'Active traders, investors, financial professionals',
    sellingPoint: 'You manage risk for a living. Let us help you manage the risk to your family\'s future.',
    tagline: 'Trade with confidence. Protect your legacy.',
    primaryColor: '#16a34a',
    secondaryColor: '#22c55e',
    phone: '(555) 123-4568',
    email: 'info@traderlegacylife.com',
    companyName: 'Trader Legacy Life Insurance',
    isActive: true,
    customFields: {
      tradingType: true,
      portfolioSize: true
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

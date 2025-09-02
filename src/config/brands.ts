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
  // Custom fields for each brand
  customFields?: {
    [key: string]: any;
  };
}

export const BRANDS: Brand[] = [
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
      vaBenefits: true,
      heroSubtitle: 'Veterans & Active Service Members',
      heroTitle: 'You May Qualify for New Life Insurance Benefits in 2025',
      heroDescription: 'As a resident of your state, you are entitled to check your eligibility for exclusive life insurance benefits designed specifically for our nation\'s heroes.',
      trustBadge: 'Trusted by 50,000+ Veterans Nationwide',
      benefitsTitle: 'Plans for Veterans, Active Service and Family Members',
      comparisonTitle: 'The VA Option vs Our Options... What\'s the difference?'
    }
  },
  {
    id: 'startup-legacy-life',
    domain: 'startuplegacylife.com',
    brandName: 'Startup Legacy Life',
    targetDemographic: 'Entrepreneurs, young professionals, founders',
    sellingPoint: 'You take risks every day building your company — your financial future doesn\'t have to be one of them. Lock in lifelong protection and a wealth-building plan that grows with your startup.',
    tagline: 'Build your dream. Secure your legacy.',
    primaryColor: '#059669',
    secondaryColor: '#10b981',
    phone: '(555) 123-4568',
    email: 'info@startuplegacylife.com',
    companyName: 'Startup Legacy Life Insurance',
    isActive: true,
    customFields: {
      companyStage: true,
      fundingRound: true,
      equityCompensation: true
    }
  },
  {
    id: 'foundation-legacy-life',
    domain: 'foundationlegacylife.com',
    brandName: 'Foundation Legacy Life',
    targetDemographic: 'New families, first-time homeowners, people just starting out with financial planning',
    sellingPoint: 'Every strong future is built on a foundation. Protect your loved ones and start building generational wealth now.',
    tagline: 'A future built on security.',
    primaryColor: '#7c3aed',
    secondaryColor: '#8b5cf6',
    phone: '(555) 123-4569',
    email: 'info@foundationlegacylife.com',
    companyName: 'Foundation Legacy Life Insurance',
    isActive: true,
    customFields: {
      familySize: true,
      homeOwnership: true,
      childrenAges: true
    }
  },
  {
    id: 'trade-legacy-life',
    domain: 'tradelegacylife.com',
    brandName: 'Trade Legacy Life',
    targetDemographic: 'Blue-collar workers, skilled trades (HVAC, electricians, mechanics)',
    sellingPoint: 'You work hard every day with your hands. We\'ll make sure your hard work pays off for generations.',
    tagline: 'For the people who build, fix, and make.',
    primaryColor: '#dc2626',
    secondaryColor: '#ef4444',
    phone: '(555) 123-4570',
    email: 'info@tradelegacylife.com',
    companyName: 'Trade Legacy Life Insurance',
    isActive: true,
    customFields: {
      tradeType: true,
      yearsInTrade: true,
      unionMember: true
    }
  },
  {
    id: 'success-legacy-life',
    domain: 'successlegacylife.com',
    brandName: 'Success Legacy Life',
    targetDemographic: 'High-achievers, sales pros, executives, ambitious millennials/Gen Z',
    sellingPoint: 'Success isn\'t just what you earn — it\'s what you leave behind. Protect your success with a plan that multiplies it for your family.',
    tagline: 'Protect what you\'ve worked for.',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
    phone: '(555) 123-4571',
    email: 'info@successlegacylife.com',
    companyName: 'Success Legacy Life Insurance',
    isActive: true,
    customFields: {
      incomeLevel: true,
      careerStage: true,
      performanceMetrics: true
    }
  },
  {
    id: 'immigrant-legacy-life',
    domain: 'immigrantlegacylife.com',
    brandName: 'Immigrant Legacy Life',
    targetDemographic: 'Immigrant families, first-gen Americans, communities focused on family security',
    sellingPoint: 'You came here to create a better life. We\'ll help you secure it — and pass it on to the next generation.',
    tagline: 'From sacrifice to security.',
    primaryColor: '#0891b2',
    secondaryColor: '#06b6d4',
    phone: '(555) 123-4572',
    email: 'info@immigrantlegacylife.com',
    companyName: 'Immigrant Legacy Life Insurance',
    isActive: true,
    customFields: {
      yearsInUS: true,
      citizenshipStatus: true,
      familyBackHome: true
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
    phone: '(555) 123-4573',
    email: 'info@responderlegacylife.com',
    companyName: 'Responder Legacy Life Insurance',
    isActive: true,
    customFields: {
      responderType: true,
      yearsOfService: true,
      shiftSchedule: true
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
    phone: '(555) 123-4574',
    email: 'info@educatorlegacylife.com',
    companyName: 'Educator Legacy Life Insurance',
    isActive: true,
    customFields: {
      educationLevel: true,
      yearsTeaching: true,
      schoolType: true
    }
  },
  {
    id: 'trader-legacy-life',
    domain: 'traderlegacylife.com',
    brandName: 'Trader Legacy Life',
    targetDemographic: 'Day traders, crypto investors, stock market risk-takers',
    sellingPoint: 'You gamble with markets — but your future doesn\'t need to be a gamble. Hedge your family\'s security with the safest investment there is.',
    tagline: 'One investment that\'s never risky.',
    primaryColor: '#1f2937',
    secondaryColor: '#374151',
    phone: '(555) 123-4575',
    email: 'info@traderlegacylife.com',
    companyName: 'Trader Legacy Life Insurance',
    isActive: true,
    customFields: {
      tradingType: true,
      portfolioSize: true,
      riskTolerance: true
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
    phone: '(555) 123-4576',
    email: 'info@creatorlegacylife.com',
    companyName: 'Creator Legacy Life Insurance',
    isActive: true,
    customFields: {
      platformType: true,
      followerCount: true,
      revenueStreams: true
    }
  }
];

export function getBrandByDomain(domain: string): Brand | undefined {
  return BRANDS.find(brand => brand.domain === domain);
}

export function getBrandById(id: string): Brand | undefined {
  return BRANDS.find(brand => brand.id === id);
}

export function getAllActiveBrands(): Brand[] {
  return BRANDS.filter(brand => brand.isActive);
} 
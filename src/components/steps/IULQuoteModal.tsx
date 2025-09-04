import React, { useState, useEffect, useRef } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

export const IULQuoteModal: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [coverageAmount, setCoverageAmount] = useState(0);
  const [monthlyPremium, setMonthlyPremium] = useState(0);
  const [userAge, setUserAge] = useState(30);
  const [userGender, setUserGender] = useState('male');
  const [sliderValue, setSliderValue] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [insuranceType, setInsuranceType] = useState<'IUL' | 'Final Expense'>('IUL');
  const [apiDebug, setApiDebug] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const isMountedRef = useRef(true);
  const debugMode = typeof process !== 'undefined' && (process as any).env?.NEXT_PUBLIC_IUL_DEBUG === 'true';

  // Calculate cash value growth potential (only for IUL)
  const calculateCashValueGrowth = (coverage: number, premium: number) => {
    const annualPremium = premium * 12;
    const growthRate = 0.06; // 6% average annual growth rate for IUL
    const years = [10, 20, 30];
    
    return years.map(year => {
      // Simple compound interest calculation
      // Assumes premium payments and growth on accumulated value
      let totalValue = 0;
      for (let i = 1; i <= year; i++) {
        totalValue = (totalValue + annualPremium) * (1 + growthRate);
      }
      
      // Cap at 90% of death benefit for conservative estimate
      const maxValue = coverage * 0.9;
      const projectedValue = Math.min(totalValue, maxValue);
      
      return {
        year,
        projectedValue: Math.round(projectedValue),
        growth: Math.round(projectedValue - (annualPremium * year))
      };
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Calculate age from birthday question
    if (formData.contactInfo?.dateOfBirth) {
      const calculatedAge = calculateAgeSafe(formData.contactInfo.dateOfBirth);
      setUserAge(calculatedAge);
      
      // Determine insurance type based on calculated age
      const type = getInsuranceType(calculatedAge);
      setInsuranceType(type);
      
      console.log(`User age calculated: ${calculatedAge}, Insurance type: ${type}`);
    }

    // Set initial coverage from previous coverage amount question
    let initialCoverage = 25000; // Default fallback
    
    if (formData.preQualification?.coverageAmount) {
      // Parse the coverage amount from the previous question
      const previousAmount = formData.preQualification.coverageAmount;
      const numericAmount = parseInt(previousAmount.replace(/[$,]/g, ''));
      
      // Use their previous selection but ensure it meets minimum requirements
      if (userAge >= 61) {
        // Final Expense: 5K-20K range
        initialCoverage = Math.max(5000, Math.min(numericAmount, 20000));
      } else {
        // IUL: 25K+ range  
        initialCoverage = Math.max(25000, numericAmount);
      }
      
      console.log(`Previous coverage selection: ${previousAmount}, Adjusted to: ${initialCoverage}`);
    }

    // Round to nearest $1,000 and clamp to valid range
    const rangeInit = getCoverageRange(getInsuranceType(userAge), userAge);
    const roundedInit = Math.min(rangeInit.max, Math.max(rangeInit.min, Math.round(initialCoverage / 1000) * 1000));
    setCoverageAmount(roundedInit);
    setSliderValue(roundedInit);
    setIsInitialized(true);
  }, [formData.contactInfo?.dateOfBirth, formData.preQualification?.coverageAmount, userAge]);

  // Update quote when coverage, age, or gender changes
  useEffect(() => {
    if (!isInitialized || !isMountedRef.current) return;
    const controller = new AbortController();
    const debounce = setTimeout(() => {
      // Optimistic update while waiting for API
      const optimistic = calculateQuote(coverageAmount, userAge, userGender);
      setMonthlyPremium(optimistic.premium);
      setInsuranceType(optimistic.type);
      updateQuote(controller.signal);
    }, 250);
    return () => {
      controller.abort();
      clearTimeout(debounce);
    };
  }, [coverageAmount, userAge, userGender, isInitialized]);

  const updateQuote = async (signal?: AbortSignal) => {
    if (!isMountedRef.current) return;
    try {
      setApiError(null);
      const stateCode = formData.preQualification?.state || 'AL';
      const smoker = formData.medicalAnswers?.tobaccoUse === 'Yes' ? 'Yes' : 'No';
      // Always calculate age from DOB for the API call
      const dob = formData.contactInfo?.dateOfBirth || '';
      const ageForApi = calculateAgeSafe(dob);
      if (ageForApi !== userAge) setUserAge(ageForApi);
      const payload = {
        issueStateCode: stateCode,
        InsuredAge: ageForApi,
        Insured_Gender: userGender === 'male' ? 'Male' : 'Female',
        IsInsuredSmoker: smoker,
        FaceAmount: coverageAmount,
      };
      console.log('🔎 Fetching IUL quote:', payload);
      setApiDebug({ stage: 'request', payload });
      const resp = await fetch('/api/admin/iul-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal,
      });
      const json = await resp.json();
      console.log('🧾 IUL quote response status:', resp.status, 'ok:', resp.ok, 'json:', json);
      if (resp.ok && json?.success) {
        // Accept multiple possible fields from Americo and handle unknown shapes
        let apiMonthly = Number(
          json.data?.TotalMonthlyPremium ??
          json.data?.TargetPremium ??
          json.data?.BaseMonthlyPremium ??
          json.data?.BasicSolvePremium ??
          json.data?.MonthlyPremium ??
          json.data?.TotalPremium ??
          json.data?.Premium ??
          0
        );
        if (!apiMonthly || Number.isNaN(apiMonthly) || apiMonthly <= 0) {
          apiMonthly = extractPremiumFromUnknownShape(json?.data);
        }
        if (debugMode) setApiDebug({ stage: 'response', status: resp.status, ok: resp.ok, mocked: !!json?.mocked, parsedMonthly: apiMonthly, dataKeys: Object.keys(json?.data || {}) });
        if (!Number.isNaN(apiMonthly) && apiMonthly > 0) {
          setMonthlyPremium(Number(apiMonthly.toFixed(2)));
          setInsuranceType(getInsuranceType(ageForApi));
          if (json.mocked) {
            console.log('ℹ️ Using mocked Americo quote data');
          }
          return;
        }
        setApiError('Quote API returned a $0 premium. Check age/gender/state/face amount.');
      }
      // Fallback to local calc
      const quoteResult = calculateQuote(coverageAmount, userAge, userGender);
      setMonthlyPremium(quoteResult.premium);
      setInsuranceType(quoteResult.type);
    } catch (e) {
      if ((e as any)?.name === 'AbortError') return;
      console.warn('IUL quote fetch failed, using fallback calc:', e);
      setApiError((e as any)?.message || 'Quote request failed');
      const quoteResult = calculateQuote(coverageAmount, userAge, userGender);
      setMonthlyPremium(quoteResult.premium);
      setInsuranceType(quoteResult.type);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const range = getCoverageRange(insuranceType, userAge);
    const rounded = Math.min(range.max, Math.max(range.min, Math.round(value / 1000) * 1000));
    setSliderValue(rounded);
    setCoverageAmount(rounded);
    console.log(`Slider changed to (rounded): ${rounded}`);
    // Immediate optimistic update
    const optimistic = calculateQuote(rounded, userAge, userGender);
    setMonthlyPremium(optimistic.premium);
    setInsuranceType(optimistic.type);
    // Fire API update without waiting for debounce to ensure at least one call
    updateQuote();
  };

  const handleGenderChange = (gender: string) => {
    setUserGender(gender);
    console.log(`Gender changed to: ${gender}`);
  };

  const handleSecureRate = () => {
    console.log('🔍 IULQuoteModal - handleSecureRate called!');
    
    // Calculate health tier from medical answers
    const healthTier = calculateHealthTier(formData.medicalAnswers || {});
    
    const quoteData = {
      policyDate: new Date().toISOString().split('T')[0],
      coverage: `$${coverageAmount.toLocaleString()}`,
      premium: `$${monthlyPremium.toFixed(2)}`,
      age: userAge.toString(),
      gender: userGender === 'male' ? 'Male' : 'Female',
      type: insuranceType,
      healthTier: healthTier
    };
    
    console.log('🔍 IULQuoteModal - Saving quote data with health tier:', quoteData);
    
    updateFormData({ quoteData });
    goToNextStep();
  };

  const coverageRange = getCoverageRange(insuranceType, userAge);
  const cashValueGrowth = insuranceType === 'IUL' ? calculateCashValueGrowth(coverageAmount, monthlyPremium) : null;

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '1rem', 
      maxHeight: '70vh', 
      overflowY: 'auto'
    }}>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
        Your Personalized {insuranceType} Quote
      </h2>
      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.75rem' }}>
        Based on your information, here's your personalized {insuranceType} quote:
      </p>
      
      {/* Premium Display - Much More Compact */}
      <div style={{ 
        background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
        color: 'white',
        padding: '1rem',
        borderRadius: '8px',
        margin: '0.75rem 0'
      }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem', lineHeight: '1' }}>
          ${monthlyPremium.toLocaleString()}/month
        </div>
        <p style={{ fontSize: '0.9rem', color: 'white', margin: 0, fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          Secure this rate
        </p>
      </div>

      {/* API Debug (visible only when NEXT_PUBLIC_IUL_DEBUG=true) */}
      {debugMode && (
        <div style={{ fontSize: '0.75rem', color: '#334155', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.5rem', marginTop: '0.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Quote API</div>
          {apiError && <div style={{ color: '#b91c1c', marginBottom: 4 }}>Error: {apiError}</div>}
          {apiDebug?.stage === 'request' && (
            <div>Request: {JSON.stringify(apiDebug.payload)}</div>
          )}
          {apiDebug?.stage === 'response' && (
            <div>
              <div>Status: {String(apiDebug.ok)} ({apiDebug.status}) {apiDebug.mocked ? '[mocked]' : ''}</div>
              <div>Parsed Monthly: {apiDebug.parsedMonthly}</div>
              <div>Data Keys: {Array.isArray(apiDebug.dataKeys) ? apiDebug.dataKeys.join(', ') : 'n/a'}</div>
            </div>
          )}
        </div>
      )}

      {/* Insurance Type Info */}
      <div style={{ 
        background: '#f8fafc', 
        padding: '0.75rem', 
        borderRadius: '6px', 
        margin: '0.75rem 0',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
          <strong>Insurance Type:</strong> {insuranceType}
          {insuranceType === 'Final Expense' && ' - Covers final expenses and burial costs'}
          {insuranceType === 'IUL' && ' - Indexed Universal Life with cash value growth potential'}
        </p>
      </div>

      {/* Coverage Slider */}
      <div style={{ margin: '1rem 0' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '0.9rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '0.5rem' 
        }}>
          Coverage Amount: ${sliderValue.toLocaleString()}
        </label>
        <input
          type="range"
          min={coverageRange.min}
          max={coverageRange.max}
          value={sliderValue}
          onChange={handleSliderChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: '#e5e7eb',
            outline: 'none',
            WebkitAppearance: 'none',
            cursor: 'pointer'
          }}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '0.7rem', 
          color: '#6b7280', 
          marginTop: '0.25rem' 
        }}>
          <span>${coverageRange.min.toLocaleString()}</span>
          <span>${coverageRange.max.toLocaleString()}</span>
        </div>
      </div>

      {/* Gender Selection */}
      <div style={{ margin: '1rem 0' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '0.9rem', 
          fontWeight: '600', 
          color: '#374151', 
          marginBottom: '0.5rem' 
        }}>
          Gender:
        </label>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {['male', 'female'].map(gender => (
            <label key={gender} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={userGender === gender}
                onChange={(e) => handleGenderChange(e.target.value)}
                style={{ margin: 0 }}
              />
              <span style={{ fontSize: '0.8rem', textTransform: 'capitalize' }}>{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Cash Value Growth (IUL only) */}
      {insuranceType === 'IUL' && cashValueGrowth && (
        <div style={{ 
          background: '#f0f9ff', 
          padding: '0.75rem', 
          borderRadius: '6px', 
          margin: '0.75rem 0',
          border: '1px solid #bae6fd'
        }}>
          <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.5rem 0', color: '#0369a1' }}>
            💰 Cash Value Growth Potential
          </h4>
          <div style={{ fontSize: '0.75rem', color: '#0c4a6e' }}>
            {cashValueGrowth.map(({ year, projectedValue, growth }) => (
              <div key={year} style={{ marginBottom: '0.25rem' }}>
                <strong>{year} years:</strong> ${projectedValue.toLocaleString()} projected value 
                (${growth.toLocaleString()} growth)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Secure Rate Button - Clear and Prominent */}
      <button
        onClick={handleSecureRate}
        style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginTop: '1rem',
          width: '100%',
          maxWidth: '300px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Secure Your Rate
      </button>

      {/* Age Display */}
      <div style={{ 
        marginTop: '1rem', 
        fontSize: '0.8rem', 
        color: '#6b7280',
        fontStyle: 'italic'
      }}>
        Age: {userAge} years old
      </div>
    </div>
  );
};

// Helper functions
function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

function getInsuranceType(age: number): 'IUL' | 'Final Expense' {
  return age >= 61 ? 'Final Expense' : 'IUL';
}

function getCoverageRange(type: string, age: number) {
  if (type === 'Final Expense') {
    return { min: 5000, max: 20000 };
  } else {
    return { min: 25000, max: 1000000 };
  }
}

function calculateQuote(coverage: number, age: number, gender: string): { premium: number; type: 'IUL' | 'Final Expense' } {
  // Simple quote calculation
  let baseRate = 0.001; // 0.1% per $1000
  
  if (age > 60) baseRate *= 1.5;
  if (age > 70) baseRate *= 2;
  if (gender === 'female') baseRate *= 0.8;
  
  const monthlyPremium = Math.round((coverage * baseRate) / 12);
  
  return {
    premium: monthlyPremium,
    type: age >= 61 ? 'Final Expense' : 'IUL'
  };
}

function calculateHealthTier(medicalAnswers: any): string {
  // Simple health tier calculation
  if (medicalAnswers.tobaccoUse === 'Yes') return 'C';
  if (medicalAnswers.medicalConditions?.includes('None')) return 'A';
  if (medicalAnswers.medicalConditions?.length > 0) return 'B';
  return 'A';
}

// Robust DOB parsing: accepts MM-DD-YYYY, M-D-YYYY, YYYY-MM-DD
function parseDob(dob: string): Date | null {
  if (!dob) return null;
  // If ISO-like
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dob)) {
    const d = new Date(dob);
    return isNaN(d.getTime()) ? null : d;
  }
  // If MM-DD-YYYY or M-D-YYYY
  const mdy = dob.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (mdy) {
    const m = parseInt(mdy[1], 10) - 1;
    const d = parseInt(mdy[2], 10);
    const y = parseInt(mdy[3], 10);
    const dt = new Date(y, m, d);
    return isNaN(dt.getTime()) ? null : dt;
  }
  return null;
}

function calculateAgeSafe(dateOfBirth: string): number {
  const parsed = parseDob(dateOfBirth);
  if (!parsed) return 30; // sensible default
  const today = new Date();
  let age = today.getFullYear() - parsed.getFullYear();
  const monthDiff = today.getMonth() - parsed.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < parsed.getDate())) {
    age--;
  }
  return Math.max(0, age);
}

// Attempts to locate a premium value in unknown API shapes
function extractPremiumFromUnknownShape(data: any): number {
  if (!data || typeof data !== 'object') return 0;
  const keys = Object.keys(data);
  // common premium-like keys
  const candidates = ['totalMonthlyPremium', 'totalpremium', 'solvePremium', 'monthly', 'premium', 'total'];
  for (const key of keys) {
    if (candidates.includes(String(key).toLowerCase())) {
      const v = Number((data as any)[key]);
      if (!Number.isNaN(v) && v > 0) return v;
    }
  }
  // search nested
  for (const key of keys) {
    const v = (data as any)[key];
    if (v && typeof v === 'object') {
      const nested = extractPremiumFromUnknownShape(v);
      if (nested > 0) return nested;
    }
  }
  return 0;
}

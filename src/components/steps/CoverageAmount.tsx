import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const coverageAmounts = [
  '$25,000',
  '$50,000',
  '$100,000',
  '$250,000',
  '$500,000',
  '$1,000,000',
  '$2,000,000',
  '$5,000,000'
];

export const CoverageAmount: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue immediately when coverage amount is selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.coverageAmount && autoAdvanceEnabled) {
      // Immediate auto-advance - no delay
      goToNextStep();
    }
  }, [formData.preQualification?.coverageAmount, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>How much life insurance coverage do you need?</h2>
      <p>This helps us provide you with the most appropriate policy options.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        {coverageAmounts.map((amount) => (
          <label
            key={amount}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: formData.preQualification?.coverageAmount === amount ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.coverageAmount === amount ? '#3b82f6' : '#e5e7eb',
              textAlign: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.coverageAmount !== amount) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.coverageAmount !== amount) {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <input
              type="radio"
              name="coverageAmount"
              value={amount}
              checked={formData.preQualification?.coverageAmount === amount}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    coverageAmount: e.target.value
                  }
                });
                setAutoAdvanceEnabled(true);
              }}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>{amount}</span>
          </label>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '1.5rem',
        padding: '0.75rem',
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        color: '#0369a1'
      }}>
        <strong>Note:</strong> You can adjust your coverage amount later during the application process.
      </div>
    </div>
  );
};

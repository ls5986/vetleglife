import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const riskLevels = [
  'Yes - High risk (active duty, SWAT, etc.)',
  'Yes - Medium risk (patrol, emergency response)',
  'Yes - Lower risk (administrative, support)',
  'No - Office-based role'
];

export const LineOfDutyRisk: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue when risk level is selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.lineOfDutyRisk && autoAdvanceEnabled) {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 500); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [formData.preQualification?.lineOfDutyRisk, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>Do you face line-of-duty risks in your profession?</h2>
      <p>This helps us determine appropriate coverage levels for your high-risk work.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {riskLevels.map((risk) => (
          <label
            key={risk}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: formData.preQualification?.lineOfDutyRisk === risk ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.lineOfDutyRisk === risk ? '#3b82f6' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.lineOfDutyRisk !== risk) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.lineOfDutyRisk !== risk) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <input
              type="radio"
              name="lineOfDutyRisk"
              value={risk}
              checked={formData.preQualification?.lineOfDutyRisk === risk}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    lineOfDutyRisk: e.target.value
                  }
                });
                setAutoAdvanceEnabled(true);
              }}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{risk}</span>
          </label>
        ))}
      </div>
      
      <div style={{ 
        marginTop: '1.5rem',
        padding: '0.75rem',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        color: '#dc2626'
      }}>
        <strong>Note:</strong> Higher risk professions may qualify for enhanced coverage and living benefits.
      </div>
    </div>
  );
};

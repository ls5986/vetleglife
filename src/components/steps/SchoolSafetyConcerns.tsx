import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const safetyConcerns = [
  'Yes - Active shooter training required',
  'Yes - Security protocols in place',
  'Some concerns - Standard safety measures',
  'Minimal concerns - Low-risk environment'
];

export const SchoolSafetyConcerns: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue when safety concerns are selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.schoolSafetyConcerns && autoAdvanceEnabled) {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 500); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [formData.preQualification?.schoolSafetyConcerns, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>Do you have concerns about school safety in your role?</h2>
      <p>This helps us understand your specific risk factors and coverage needs.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {safetyConcerns.map((concern) => (
          <label
            key={concern}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: formData.preQualification?.schoolSafetyConcerns === concern ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.schoolSafetyConcerns === concern ? '#3b82f6' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.schoolSafetyConcerns !== concern) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.schoolSafetyConcerns !== concern) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <input
              type="radio"
              name="schoolSafetyConcerns"
              value={concern}
              checked={formData.preQualification?.schoolSafetyConcerns === concern}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    schoolSafetyConcerns: e.target.value
                  }
                });
                setAutoAdvanceEnabled(true);
              }}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{concern}</span>
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
        <strong>Note:</strong> Educators in higher-risk environments may qualify for enhanced coverage and living benefits.
      </div>
    </div>
  );
};

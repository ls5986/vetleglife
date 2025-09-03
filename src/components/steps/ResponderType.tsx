import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const responderTypes = [
  'Police Officer',
  'Firefighter',
  'EMT/Paramedic',
  'Nurse',
  'Doctor',
  'Corrections Officer',
  'Other First Responder'
];

export const ResponderType: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue when responder type is selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.responderType && autoAdvanceEnabled) {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 500); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [formData.preQualification?.responderType, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>What type of first responder are you?</h2>
      <p>This helps us provide you with profession-specific coverage and benefits.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {responderTypes.map((type) => (
          <label
            key={type}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: formData.preQualification?.responderType === type ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.responderType === type ? '#3b82f6' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.responderType !== type) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.responderType !== type) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <input
              type="radio"
              name="responderType"
              value={type}
              checked={formData.preQualification?.responderType === type}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    responderType: e.target.value
                  }
                });
                setAutoAdvanceEnabled(true);
              }}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

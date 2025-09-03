import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const maritalStatuses = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Separated',
  'Domestic Partnership'
];

export const MaritalStatus: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue immediately when marital status is selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.maritalStatus && autoAdvanceEnabled) {
      // Immediate auto-advance - no delay
      goToNextStep();
    }
  }, [formData.preQualification?.maritalStatus, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>What is your marital status?</h2>
      <p>This helps us determine the best coverage options for you and your family.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {maritalStatuses.map((status) => (
          <label
            key={status}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: formData.preQualification?.maritalStatus === status ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.maritalStatus === status ? '#3b82f6' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.maritalStatus !== status) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.maritalStatus !== status) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <input
              type="radio"
              name="maritalStatus"
              value={status}
              checked={formData.preQualification?.maritalStatus === status}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    maritalStatus: e.target.value
                  }
                });
                setAutoAdvanceEnabled(true);
              }}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{status}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const militaryStatuses = [
  'Active Duty',
  'Veteran',
  'Reservist',
  'National Guard',
  'Retired',
  'Dependent',
  'None of the above'
];

export const MilitaryStatus: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue immediately when military status is selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.militaryStatus && autoAdvanceEnabled) {
      // Immediate auto-advance - no delay
      goToNextStep();
    }
  }, [formData.preQualification?.militaryStatus, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>What is your military status?</h2>
      <p>This helps us determine your eligibility for veteran benefits.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {militaryStatuses.map((status) => (
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
              backgroundColor: formData.preQualification?.militaryStatus === status ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.militaryStatus === status ? '#3b82f6' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.militaryStatus !== status) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.militaryStatus !== status) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <input
              type="radio"
              name="militaryStatus"
              value={status}
              checked={formData.preQualification?.militaryStatus === status}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    militaryStatus: e.target.value
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

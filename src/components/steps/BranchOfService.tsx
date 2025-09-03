import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const branches = [
  'Army',
  'Navy',
  'Air Force',
  'Marine Corps',
  'Coast Guard',
  'Space Force',
  'National Guard',
  'Reserves',
  'None of the above'
];

export const BranchOfService: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue immediately when branch is selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.branchOfService && autoAdvanceEnabled) {
      // Immediate auto-advance - no delay
      goToNextStep();
    }
  }, [formData.preQualification?.branchOfService, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>Which branch of service were you in?</h2>
      <p>This helps us provide you with branch-specific benefits and coverage options.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {branches.map((branch) => (
          <label
            key={branch}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: formData.preQualification?.branchOfService === branch ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.branchOfService === branch ? '#3b82f6' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.branchOfService !== branch) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.branchOfService !== branch) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <input
              type="radio"
              name="branchOfService"
              value={branch}
              checked={formData.preQualification?.branchOfService === branch}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    branchOfService: e.target.value
                  }
                });
                setAutoAdvanceEnabled(true);
              }}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{branch}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

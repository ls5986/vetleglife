import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

const educatorRoles = [
  'Teacher (K-12)',
  'Teacher (College/University)',
  'Administrator',
  'Support Staff',
  'Substitute Teacher',
  'Other Education Professional'
];

export const EducatorRole: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();

  // Auto-continue when educator role is selected and auto-advance is enabled
  useEffect(() => {
    if (formData.preQualification?.educatorRole && autoAdvanceEnabled) {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 500); // Small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [formData.preQualification?.educatorRole, autoAdvanceEnabled, goToNextStep]);

  return (
    <div>
      <h2>What is your role in education?</h2>
      <p>This helps us provide you with profession-specific coverage and benefits.</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {educatorRoles.map((role) => (
          <label
            key={role}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: formData.preQualification?.educatorRole === role ? '#eff6ff' : 'white',
              borderColor: formData.preQualification?.educatorRole === role ? '#3b82f6' : '#e5e7eb'
            }}
            onMouseEnter={(e) => {
              if (formData.preQualification?.educatorRole !== role) {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.preQualification?.educatorRole !== role) {
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <input
              type="radio"
              name="educatorRole"
              value={role}
              checked={formData.preQualification?.educatorRole === role}
              onChange={(e) => {
                updateFormData({
                  preQualification: {
                    ...formData.preQualification,
                    educatorRole: e.target.value
                  }
                });
                setAutoAdvanceEnabled(true);
              }}
              style={{ margin: 0 }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{role}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

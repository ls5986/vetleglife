import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ 
        width: '100%', 
        height: '8px', 
        backgroundColor: '#e5e7eb', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div 
          style={{
            width: `${progressPercentage}%`,
            height: '100%',
            backgroundColor: '#3b82f6',
            borderRadius: '4px',
            transition: 'width 0.3s ease',
            boxShadow: '0 1px 3px rgba(59, 130, 246, 0.3)'
          }}
        />
      </div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: '0.5rem' 
      }}>
        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Step {currentStep} of {totalSteps}
        </span>
        <span style={{ fontSize: '0.875rem', color: '#3b82f6', fontWeight: '500' }}>
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
    </div>
  );
};

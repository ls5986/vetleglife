import React, { useEffect, useState } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

export const Birthday: React.FC = () => {
  const { formData, updateFormData, goToNextStep, autoAdvanceEnabled, setAutoAdvanceEnabled } = useFunnelStore();
  const [errors, setErrors] = useState<string>('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 83 }, (_, i) => currentYear - i);

  const handleFieldChange = (field: 'month' | 'day' | 'year', value: string) => {
    const newDate = {
      ...formData.contactInfo,
      dateOfBirth: `${formData.contactInfo?.month || ''}-${formData.contactInfo?.day || ''}-${formData.contactInfo?.year || ''}`
    };
    
    if (field === 'month') newDate.month = value;
    if (field === 'day') newDate.day = value;
    if (field === 'year') newDate.year = value;
    
    updateFormData({
      ...formData,
      contactInfo: newDate
    });
  };

  const validateAge = () => {
    if (!formData.contactInfo.month || !formData.contactInfo.day || !formData.contactInfo.year) {
      return false;
    }

    const birthDate = new Date(
      parseInt(formData.contactInfo.year),
      months.indexOf(formData.contactInfo.month),
      parseInt(formData.contactInfo.day)
    );
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 18) {
      setErrors('You must be at least 18 years old to apply for life insurance.');
      return false;
    }
    
    return true;
  };

  // Do not advance here; DynamicFunnel will detect a valid DOB and show the next screen
  useEffect(() => {
    if (formData.contactInfo.month && formData.contactInfo.day && formData.contactInfo.year) {
      validateAge();
    } else {
      setErrors('');
    }
  }, [formData.contactInfo.month, formData.contactInfo.day, formData.contactInfo.year]);

  return (
    <div>
      <h2>What is your date of birth?</h2>
      <p>This helps us calculate your premium rate and eligibility.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Month *
          </label>
          <select
            value={formData.contactInfo.month || ''}
            onChange={(e) => handleFieldChange('month', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
            required
          >
            <option value="">Select Month</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Day *
          </label>
          <select
            value={formData.contactInfo.day || ''}
            onChange={(e) => handleFieldChange('day', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
            required
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
            Year *
          </label>
          <select
            value={formData.contactInfo.year || ''}
            onChange={(e) => handleFieldChange('year', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem'
            }}
            required
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
      
      {errors && (
        <div style={{ 
          padding: '0.75rem', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca', 
          borderRadius: '0.375rem',
          color: '#dc2626',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          {errors}
        </div>
      )}
      
      <div style={{ 
        padding: '0.75rem', 
        backgroundColor: '#f0f9ff', 
        border: '1px solid #bae6fd', 
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        color: '#0369a1'
      }}>
        <strong>Note:</strong> You must be at least 18 years old to apply for life insurance.
      </div>
    </div>
  );
};

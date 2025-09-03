import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { FormField } from '../shared/FormField';

export const ApplicationStep2: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [localFormData, setLocalFormData] = useState({
    ssn: formData.applicationData?.ssn || '',
    bankName: formData.applicationData?.bankName || '',
    routingNumber: formData.applicationData?.routingNumber || '',
    accountNumber: formData.applicationData?.accountNumber || '',
    policyDate: formData.quoteData?.policyDate || ''
  });

  useEffect(() => {
    // Update local form data when store data changes
    setLocalFormData({
      ssn: formData.applicationData?.ssn || '',
      bankName: formData.applicationData?.bankName || '',
      routingNumber: formData.applicationData?.routingNumber || '',
      accountNumber: formData.applicationData?.accountNumber || '',
      policyDate: formData.quoteData?.policyDate || ''
    });
  }, [formData.applicationData, formData.quoteData]);

  const handleInputChange = (field: string, value: string) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!localFormData.ssn.trim()) {
      errors.ssn = 'SSN is required';
    } else if (!/^\d{3}-?\d{2}-?\d{4}$/.test(localFormData.ssn)) {
      errors.ssn = 'Please enter a valid SSN (XXX-XX-XXXX)';
    }

    if (!localFormData.bankName.trim()) {
      errors.bankName = 'Bank name is required';
    }

    if (!localFormData.routingNumber.trim()) {
      errors.routingNumber = 'Routing number is required';
    } else if (!/^\d{9}$/.test(localFormData.routingNumber)) {
      errors.routingNumber = 'Routing number must be 9 digits';
    }

    if (!localFormData.accountNumber.trim()) {
      errors.accountNumber = 'Account number is required';
    } else if (!/^\d{4,17}$/.test(localFormData.accountNumber)) {
      errors.accountNumber = 'Account number must be 4-17 digits';
    }

    if (!localFormData.policyDate.trim()) {
      errors.policyDate = 'Policy date is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Update the store with the form data
      updateFormData({
        applicationData: {
          ...formData.applicationData,
          ssn: localFormData.ssn,
          bankName: localFormData.bankName,
          routingNumber: localFormData.routingNumber,
          accountNumber: localFormData.accountNumber
        },
        quoteData: {
          ...formData.quoteData,
          policyDate: localFormData.policyDate
        }
      });

      // Submit partial data to admin portal
      submitPartialData();

      goToNextStep();
    }
  };

  const submitPartialData = async () => {
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData: {
            session_id: formData.sessionId,
            brand_id: 'veteran-legacy-life',
            domain: window.location.hostname,
            current_step: 17,
            status: 'active',
            first_name: formData.contactInfo?.firstName || '',
            last_name: formData.contactInfo?.lastName || '',
            email: formData.contactInfo?.email || '',
            phone: formData.contactInfo?.phone || '',
            ssn: localFormData.ssn,
            bank_name: localFormData.bankName,
            routing_number: localFormData.routingNumber,
            account_number: localFormData.accountNumber,
            policy_date: localFormData.policyDate
          }
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit partial data:', response);
      } else {
        console.log('✅ Partial data submitted successfully for step 17');
      }
    } catch (error) {
      console.error('Failed to submit partial data:', error);
    }
  };

  const formatSSN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as XXX-XX-XXXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
  };

  const handleSSNChange = (value: string) => {
    const formatted = formatSSN(value);
    handleInputChange('ssn', formatted);
  };

  const formatRoutingNumber = (value: string) => {
    // Remove all non-digits and limit to 9 digits
    return value.replace(/\D/g, '').slice(0, 9);
  };

  const handleRoutingChange = (value: string) => {
    const formatted = formatRoutingNumber(value);
    handleInputChange('routingNumber', formatted);
  };

  const formatAccountNumber = (value: string) => {
    // Remove all non-digits and limit to 17 digits
    return value.replace(/\D/g, '').slice(0, 17);
  };

  const handleAccountChange = (value: string) => {
    const formatted = formatAccountNumber(value);
    handleInputChange('accountNumber', formatted);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        Application - Step 2
      </h2>
      <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem', textAlign: 'center' }}>
        Please provide your identification and banking information
      </p>

      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Identification */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#374151' }}>
            Identification
          </h3>
          
          <FormField
            label="Social Security Number"
            type="text"
            value={localFormData.ssn}
            onChange={handleSSNChange}
            placeholder="XXX-XX-XXXX"
            error={formErrors.ssn}
            required
          />
        </div>

        {/* Banking Information */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#374151' }}>
            Banking Information
          </h3>
          
          <FormField
            label="Bank Name"
            type="text"
            value={localFormData.bankName}
            onChange={(value) => handleInputChange('bankName', value)}
            placeholder="Enter your bank name"
            error={formErrors.bankName}
            required
          />

          <FormField
            label="Routing Number"
            type="text"
            value={localFormData.routingNumber}
            onChange={handleRoutingChange}
            placeholder="9-digit routing number"
            error={formErrors.routingNumber}
            required
          />

          <FormField
            label="Account Number"
            type="text"
            value={localFormData.accountNumber}
            onChange={handleAccountChange}
            placeholder="4-17 digit account number"
            error={formErrors.accountNumber}
            required
          />
        </div>

        {/* Policy Information */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#374151' }}>
            Policy Information
          </h3>
          
          <FormField
            label="Policy Start Date"
            type="date"
            value={localFormData.policyDate}
            onChange={(value) => handleInputChange('policyDate', value)}
            error={formErrors.policyDate}
            required
          />
        </div>

        {/* Security Notice */}
        <div style={{ 
          background: '#fef3c7', 
          padding: '0.75rem', 
          borderRadius: '6px', 
          marginBottom: '1.5rem',
          border: '1px solid #f59e0b'
        }}>
          <p style={{ fontSize: '0.8rem', color: '#92400e', margin: 0, textAlign: 'center' }}>
            🔒 Your information is secure and encrypted. We use bank-level security to protect your data.
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            marginTop: '1rem'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Complete Application
        </button>
      </div>
    </div>
  );
};

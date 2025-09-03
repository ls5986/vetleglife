import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { FormField } from '../shared/FormField';

export const ApplicationStep1: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [localFormData, setLocalFormData] = useState({
    streetAddress: formData.applicationData?.streetAddress || '',
    city: formData.applicationData?.city || '',
    zipCode: formData.applicationData?.zipCode || '',
    beneficiaryName: formData.applicationData?.beneficiaryName || '',
    beneficiaryRelationship: formData.applicationData?.beneficiaryRelationship || '',
    driversLicense: formData.applicationData?.driversLicense || ''
  });

  useEffect(() => {
    // Update local form data when store data changes
    setLocalFormData({
      streetAddress: formData.applicationData?.streetAddress || '',
      city: formData.applicationData?.city || '',
      zipCode: formData.applicationData?.zipCode || '',
      beneficiaryName: formData.applicationData?.beneficiaryName || '',
      beneficiaryRelationship: formData.applicationData?.beneficiaryRelationship || '',
      driversLicense: formData.applicationData?.driversLicense || ''
    });
  }, [formData.applicationData]);

  const handleInputChange = (field: string, value: string) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!localFormData.streetAddress.trim()) {
      errors.streetAddress = 'Street address is required';
    }

    if (!localFormData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!localFormData.zipCode.trim()) {
      errors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(localFormData.zipCode)) {
      errors.zipCode = 'Please enter a valid ZIP code';
    }

    if (!localFormData.beneficiaryName.trim()) {
      errors.beneficiaryName = 'Beneficiary name is required';
    }

    if (!localFormData.beneficiaryRelationship.trim()) {
      errors.beneficiaryRelationship = 'Beneficiary relationship is required';
    }

    if (!localFormData.driversLicense.trim()) {
      errors.driversLicense = 'Driver\'s license number is required';
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
          ...localFormData
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
            current_step: 16,
            status: 'active',
            first_name: formData.contactInfo?.firstName || '',
            last_name: formData.contactInfo?.lastName || '',
            email: formData.contactInfo?.email || '',
            phone: formData.contactInfo?.phone || '',
            street_address: localFormData.streetAddress,
            city: localFormData.city,
            zip_code: localFormData.zipCode,
            beneficiary_name: localFormData.beneficiaryName,
            beneficiary_relationship: localFormData.beneficiaryRelationship,
            drivers_license: localFormData.driversLicense
          }
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit partial data:', response);
      } else {
        console.log('✅ Partial data submitted successfully for step 16');
      }
    } catch (error) {
      console.error('Failed to submit partial data:', error);
    }
  };

  const relationshipOptions = [
    'Spouse',
    'Child',
    'Parent',
    'Sibling',
    'Other Family Member',
    'Friend',
    'Trust',
    'Charity'
  ];

  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        Application - Step 1
      </h2>
      <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1.5rem', textAlign: 'center' }}>
        Please provide your address and beneficiary information
      </p>

      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Address Information */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#374151' }}>
            Address Information
          </h3>
          
          <FormField
            label="Street Address"
            type="text"
            value={localFormData.streetAddress}
            onChange={(value) => handleInputChange('streetAddress', value)}
            placeholder="Enter your street address"
            error={formErrors.streetAddress}
            required
          />

          <FormField
            label="City"
            type="text"
            value={localFormData.city}
            onChange={(value) => handleInputChange('city', value)}
            placeholder="Enter your city"
            error={formErrors.city}
            required
          />

          <FormField
            label="ZIP Code"
            type="text"
            value={localFormData.zipCode}
            onChange={(value) => handleInputChange('zipCode', value)}
            placeholder="Enter your ZIP code"
            error={formErrors.zipCode}
            required
          />
        </div>

        {/* Beneficiary Information */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#374151' }}>
            Beneficiary Information
          </h3>
          
          <FormField
            label="Beneficiary Name"
            type="text"
            value={localFormData.beneficiaryName}
            onChange={(value) => handleInputChange('beneficiaryName', value)}
            placeholder="Enter beneficiary's full name"
            error={formErrors.beneficiaryName}
            required
          />

          <FormField
            label="Relationship to You"
            type="select"
            value={localFormData.beneficiaryRelationship}
            onChange={(value) => handleInputChange('beneficiaryRelationship', value)}
            options={relationshipOptions}
            placeholder="Select relationship"
            error={formErrors.beneficiaryRelationship}
            required
          />
        </div>

        {/* Identification */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#374151' }}>
            Identification
          </h3>
          
          <FormField
            label="Driver's License Number"
            type="text"
            value={localFormData.driversLicense}
            onChange={(value) => handleInputChange('driversLicense', value)}
            placeholder="Enter your driver's license number"
            error={formErrors.driversLicense}
            required
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
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
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Continue to Step 2
        </button>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';

interface FinalSuccessModalProps {
  brandId: string;
}

export const FinalSuccessModal: React.FC<FinalSuccessModalProps> = ({ brandId }) => {
  const { formData, submitPartial } = useFunnelStore();

  useEffect(() => {
    // Submit final data when this component mounts
    submitFinalData();
  }, []);

  const submitFinalData = async () => {
    try {
      console.log('🎉 FinalSuccessModal - Submitting final application data for brand:', brandId);
      
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadData: {
            session_id: formData.sessionId,
            brand_id: brandId,
            domain: window.location.hostname,
            current_step: 18,
            status: 'completed',
            first_name: formData.contactInfo?.firstName || '',
            last_name: formData.contactInfo?.lastName || '',
            email: formData.contactInfo?.email || '',
            phone: formData.contactInfo?.phone || '',
            state: formData.preQualification?.state || '',
            military_status: formData.preQualification?.militaryStatus || '',
            branch_of_service: formData.preQualification?.branchOfService || '',
            marital_status: formData.preQualification?.maritalStatus || '',
            coverage_amount: formData.preQualification?.coverageAmount ? 
              parseInt(formData.preQualification.coverageAmount.replace(/[$,]/g, '')) : null,
            date_of_birth: formData.contactInfo?.dateOfBirth || '',
            height: formData.medicalAnswers?.height || '',
            weight: formData.medicalAnswers?.weight || '',
            tobacco_use: formData.medicalAnswers?.tobaccoUse || '',
            medical_conditions: formData.medicalAnswers?.medicalConditions || [],
            hospital_care: formData.medicalAnswers?.hospitalCare || '',
            diabetes_medication: formData.medicalAnswers?.diabetesMedication || '',
            street_address: formData.applicationData?.streetAddress || '',
            city: formData.applicationData?.city || '',
            zip_code: formData.applicationData?.zipCode || '',
            beneficiary_name: formData.applicationData?.beneficiaryName || '',
            beneficiary_relationship: formData.applicationData?.beneficiaryRelationship || '',
            drivers_license: formData.applicationData?.driversLicense || '',
            ssn: formData.applicationData?.ssn || '',
            bank_name: formData.applicationData?.bankName || '',
            routing_number: formData.applicationData?.routingNumber || '',
            account_number: formData.applicationData?.accountNumber || '',
            policy_date: formData.quoteData?.policyDate || '',
            transactional_consent: formData.contactInfo?.transactionalConsent || false,
            marketing_consent: formData.contactInfo?.marketingConsent || false,
            exit_intent: formData.exitIntent || false,
            utm_source: formData.utmSource || '',
            utm_campaign: formData.utmCampaign || '',
            user_agent: navigator.userAgent,
            referrer: document.referrer
          }
        }),
      });

      if (!response.ok) {
        console.error('Failed to submit final data:', response);
      } else {
        console.log('🎉 Final application data submitted successfully!');
        
        // Call the submitPartial function from the store
        submitPartial();
      }
    } catch (error) {
      console.error('Failed to submit final data:', error);
    }
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      maxHeight: '70vh',
      overflowY: 'auto'
    }}>
      {/* Success Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        background: 'linear-gradient(135deg, #10b981, #059669)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
      }}>
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ color: 'white' }}
        >
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      </div>

      {/* Success Message */}
      <h2 style={{ 
        fontSize: '2rem', 
        marginBottom: '1rem', 
        color: '#065f46',
        fontWeight: 'bold'
      }}>
        Application Complete! 🎉
      </h2>
      
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#047857', 
        marginBottom: '1.5rem',
        fontWeight: '500'
      }}>
        Thank you for completing your Veteran Legacy Life Insurance application!
      </p>

      {/* What Happens Next */}
      <div style={{ 
        background: '#f0fdf4', 
        padding: '1.5rem', 
        borderRadius: '12px',
        margin: '1.5rem 0',
        border: '2px solid #bbf7d0',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          marginBottom: '1rem', 
          color: '#065f46',
          fontWeight: '600'
        }}>
          What Happens Next?
        </h3>
        
        <div style={{ textAlign: 'left' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '0.75rem',
            fontSize: '0.95rem',
            color: '#047857'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>1</span>
            </div>
            <span>Our team will review your application within 24-48 hours</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '0.75rem',
            fontSize: '0.95rem',
            color: '#047857'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>2</span>
            </div>
            <span>You'll receive a confirmation email with your application details</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '0.75rem',
            fontSize: '0.95rem',
            color: '#047857'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>3</span>
            </div>
            <span>A licensed agent will contact you to finalize your policy</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            fontSize: '0.95rem',
            color: '#047857'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: '#10b981',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem',
              flexShrink: 0
            }}>
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>4</span>
            </div>
            <span>Your coverage will begin on your selected policy date</span>
          </div>
        </div>
      </div>

      {/* Application Summary */}
      <div style={{ 
        background: '#f8fafc', 
        padding: '1rem', 
        borderRadius: '8px',
        margin: '1rem 0',
        border: '1px solid #e2e8f0',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h4 style={{ 
          fontSize: '1rem', 
          marginBottom: '0.5rem', 
          color: '#374151',
          fontWeight: '600'
        }}>
          Application Summary
        </h4>
        <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
          <div style={{ marginBottom: '0.25rem' }}>
            <strong>Coverage:</strong> {formData.quoteData?.coverage || 'Not specified'}
          </div>
          <div style={{ marginBottom: '0.25rem' }}>
            <strong>Monthly Premium:</strong> {formData.quoteData?.premium || 'Not specified'}
          </div>
          <div style={{ marginBottom: '0.25rem' }}>
            <strong>Policy Type:</strong> {formData.quoteData?.type || 'Not specified'}
          </div>
          <div>
            <strong>Policy Date:</strong> {formData.quoteData?.policyDate || 'Not specified'}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{ 
        background: '#eff6ff', 
        padding: '1rem', 
        borderRadius: '8px',
        margin: '1rem 0',
        border: '1px solid #dbeafe',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h4 style={{ 
          fontSize: '1rem', 
          marginBottom: '0.5rem', 
          color: '#1e40af',
          fontWeight: '600'
        }}>
          Need Help?
        </h4>
        <p style={{ fontSize: '0.9rem', color: '#1e40af', margin: 0 }}>
          Our veteran support team is available to assist you with any questions about your application or policy.
        </p>
      </div>

      {/* Thank You Message */}
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        borderRadius: '8px',
        border: '1px solid #f59e0b'
      }}>
        <p style={{ 
          fontSize: '1rem', 
          color: '#92400e', 
          margin: 0,
          fontWeight: '500'
        }}>
          🇺🇸 Thank you for your service and for choosing Veteran Legacy Life Insurance!
        </p>
      </div>
    </div>
  );
};

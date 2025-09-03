import React from 'react';
import { useFunnelStore } from '../../store/funnelStore';

export const PreQualifiedSuccess: React.FC = () => {
  const { goToNextStep } = useFunnelStore();

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
        Congratulations! 🎉
      </h2>
      
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#047857', 
        marginBottom: '1.5rem',
        fontWeight: '500'
      }}>
        You've been pre-qualified for Veteran Legacy Life Insurance!
      </p>

      {/* What This Means */}
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
          What This Means
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
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>
            </div>
            <span>You meet the basic eligibility requirements</span>
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
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>
            </div>
            <span>You're eligible for competitive rates</span>
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
              <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }}>✓</span>
            </div>
            <span>You can proceed with your application</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '12px',
        margin: '1.5rem 0',
        border: '2px solid #dbeafe',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <h3 style={{ 
          fontSize: '1.2rem', 
          marginBottom: '1rem', 
          color: '#1e40af',
          fontWeight: '600'
        }}>
          Next Steps
        </h3>
        
        <p style={{ 
          fontSize: '0.95rem', 
          color: '#1e40af', 
          margin: 0,
          lineHeight: '1.5'
        }}>
          Now let's get you a personalized quote and complete your application. 
          This will only take a few more minutes and you'll have access to exclusive 
          veteran benefits and competitive rates.
        </p>
      </div>

      {/* Continue Button */}
      <button
        onClick={goToNextStep}
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
          maxWidth: '300px',
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
        Get Your Personalized Quote
      </button>

      {/* Veteran Benefits Reminder */}
      <div style={{ 
        marginTop: '2rem',
        padding: '1rem',
        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        borderRadius: '8px',
        border: '1px solid #f59e0b'
      }}>
        <p style={{ 
          fontSize: '0.9rem', 
          color: '#92400e', 
          margin: 0,
          fontWeight: '500'
        }}>
          🇺🇸 As a veteran, you have access to exclusive benefits and competitive rates!
        </p>
      </div>
    </div>
  );
};

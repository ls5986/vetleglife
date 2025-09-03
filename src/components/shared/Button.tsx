import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  disabled = false,
  type = 'button',
  className = ''
}) => {
  const baseStyles = {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '6rem'
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? '#9ca3af' : '#3b82f6',
      color: 'white',
      boxShadow: disabled ? 'none' : '0 1px 3px rgba(59, 130, 246, 0.3)',
      '&:hover': {
        backgroundColor: disabled ? '#9ca3af' : '#2563eb',
        transform: disabled ? 'none' : 'translateY(-1px)',
        boxShadow: disabled ? 'none' : '0 4px 6px rgba(59, 130, 246, 0.4)'
      }
    },
    secondary: {
      backgroundColor: disabled ? '#f3f4f6' : '#f9fafb',
      color: disabled ? '#9ca3af' : '#374151',
      border: `1px solid ${disabled ? '#e5e7eb' : '#d1d5db'}`,
      '&:hover': {
        backgroundColor: disabled ? '#f3f4f6' : '#f3f4f6',
        borderColor: disabled ? '#e5e7eb' : '#9ca3af'
      }
    }
  };

  const currentVariant = variantStyles[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...baseStyles,
        ...currentVariant,
        opacity: disabled ? 0.6 : 1
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#2563eb';
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(59, 130, 246, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#3b82f6';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(59, 130, 246, 0.3)';
        }
      }}
    >
      {children}
    </button>
  );
};

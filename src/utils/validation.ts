interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  transactionalConsent: boolean;
  marketingConsent: boolean;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateContactInfo = (contactInfo: ContactInfo): ValidationResult => {
  const errors: Record<string, string> = {};

  // First Name validation
  if (!contactInfo.firstName || contactInfo.firstName.trim().length === 0) {
    errors.firstName = 'First name is required';
  } else if (contactInfo.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last Name validation
  if (!contactInfo.lastName || contactInfo.lastName.trim().length === 0) {
    errors.lastName = 'Last name is required';
  } else if (contactInfo.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email validation
  if (!contactInfo.email || contactInfo.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Phone validation
  if (!contactInfo.phone || contactInfo.phone.trim().length === 0) {
    errors.phone = 'Phone number is required';
  } else {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = contactInfo.phone.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }

  // Consent validation
  if (!contactInfo.transactionalConsent) {
    errors.transactionalConsent = 'Transactional consent is required';
  }

  if (!contactInfo.marketingConsent) {
    errors.marketingConsent = 'Marketing consent is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

import React from 'react';

interface FormFieldProps {
  label: string;
  name?: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'date';
  value: string;
  onChange: (value: string) => void;
  options?: string[] | { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  options = [],
  required = false,
  placeholder = '',
  error
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name || label.toLowerCase().replace(/\s+/g, '-')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">{placeholder}</option>
            {Array.isArray(options) && options.map((option, index) => {
              if (typeof option === 'string') {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              } else {
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              }
            })}
          </select>
        );
      
      case 'date':
        return (
          <input
            type="date"
            name={name || label.toLowerCase().replace(/\s+/g, '-')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        );
      
      default:
        return (
          <input
            type={type}
            name={name || label.toLowerCase().replace(/\s+/g, '-')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder={placeholder}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        );
    }
  };

  const fieldName = name || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="form-field" style={{ marginBottom: '1rem' }}>
      <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

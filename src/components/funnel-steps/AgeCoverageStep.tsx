import React from 'react';

interface AgeCoverageStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const AgeCoverageStep: React.FC<AgeCoverageStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}) => {
  const coverageOptions = [
    { value: '250000', label: '$250,000', description: 'Basic protection' },
    { value: '500000', label: '$500,000', description: 'Standard coverage' },
    { value: '1000000', label: '$1,000,000', description: 'Comprehensive protection' },
    { value: '2000000', label: '$2,000,000', description: 'High net worth' },
    { value: '5000000', label: '$5,000,000', description: 'Ultra high net worth' },
    { value: 'custom', label: 'Custom Amount', description: 'Enter your own amount' }
  ];

  const handleNext = () => {
    if (formData.age && formData.coverageAmount) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Policy Details</h2>
        <p className="text-gray-600 mt-2">Help us recommend the best policy for you</p>
      </div>

      <div className="space-y-6">
        {/* Age Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is your age? *
          </label>
          <input
            type="number"
            min="18"
            max="85"
            value={formData.age || ''}
            onChange={(e) => updateFormData({ age: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your age"
          />
          <p className="text-xs text-gray-500 mt-1">Must be between 18-85 years old</p>
        </div>

        {/* Coverage Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How much coverage do you need? *
          </label>
          <div className="space-y-2">
            {coverageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateFormData({ coverageAmount: option.value })}
                className={`w-full p-3 text-left border rounded-lg transition-colors ${
                  formData.coverageAmount === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600">{option.description}</div>
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          {formData.coverageAmount === 'custom' && (
            <div className="mt-3">
              <input
                type="number"
                min="100000"
                step="10000"
                value={formData.customCoverageAmount || ''}
                onChange={(e) => updateFormData({ customCoverageAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount (minimum $100,000)"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum coverage amount is $100,000</p>
            </div>
          )}
        </div>

        {/* Coverage Calculator */}
        {formData.age && formData.coverageAmount && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Coverage Calculator</h3>
            <div className="space-y-1 text-sm text-blue-800">
              <p>Age: {formData.age} years old</p>
              <p>Coverage: ${parseInt(formData.coverageAmount === 'custom' ? formData.customCoverageAmount : formData.coverageAmount).toLocaleString()}</p>
              <p className="font-semibold mt-2">
                Estimated monthly premium: ${calculateEstimatedPremium()}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!formData.age || !formData.coverageAmount || (formData.coverageAmount === 'custom' && !formData.customCoverageAmount)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Simple premium calculator (this would be replaced with actual rate tables)
const calculateEstimatedPremium = () => {
  // This is a simplified calculation - in reality, you'd use actual rate tables
  const baseRate = 0.05; // 5% of coverage amount
  const ageMultiplier = 1.2; // 20% increase for age
  const coverageMultiplier = 1.1; // 10% increase for higher coverage
  
  return Math.round(1000000 * baseRate * ageMultiplier * coverageMultiplier / 12);
};

export default AgeCoverageStep; 
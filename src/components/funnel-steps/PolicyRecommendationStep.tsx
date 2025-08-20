import React from 'react';

interface PolicyRecommendationStepProps {
  formData: any;
  recommendation: { type: string; reason: string };
  onNext: () => void;
  onBack: () => void;
}

const PolicyRecommendationStep: React.FC<PolicyRecommendationStepProps> = ({ 
  formData, 
  recommendation, 
  onNext, 
  onBack 
}) => {
  const getPolicyDetails = () => {
    switch (recommendation.type) {
      case 'IUL':
        return {
          title: 'Indexed Universal Life (IUL)',
          description: 'Build wealth while protecting your family',
          benefits: [
            'Cash value growth potential',
            'Tax-deferred growth',
            'Flexible premium payments',
            'Death benefit protection',
            'Can borrow against cash value'
          ],
          icon: '📈',
          color: 'bg-green-50 border-green-200 text-green-800'
        };
      
      case 'EOL':
        return {
          title: 'End of Level Term (EOL)',
          description: 'Simplified underwriting for older applicants',
          benefits: [
            'No medical exam required',
            'Guaranteed acceptance',
            'Level premiums',
            'Coverage until age 95',
            'Simplified application process'
          ],
          icon: '🛡️',
          color: 'bg-blue-50 border-blue-200 text-blue-800'
        };
      
      case 'Term Life':
      default:
        return {
          title: 'Term Life Insurance',
          description: 'Affordable protection for a specific period',
          benefits: [
            'Lowest cost option',
            'Guaranteed level premiums',
            'Convertible to permanent',
            'Simple and straightforward',
            'Coverage for 10-30 years'
          ],
          icon: '⚡',
          color: 'bg-purple-50 border-purple-200 text-purple-800'
        };
    }
  };

  const policyDetails = getPolicyDetails();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Personalized Recommendation</h2>
        <p className="text-gray-600 mt-2">Based on your age and coverage needs</p>
      </div>

      {/* Recommendation Card */}
      <div className={`${policyDetails.color} border rounded-lg p-6`}>
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">{policyDetails.icon}</span>
          <div>
            <h3 className="text-xl font-bold">{policyDetails.title}</h3>
            <p className="text-sm opacity-80">{policyDetails.description}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Why this policy:</p>
          <p className="text-sm opacity-80">{recommendation.reason}</p>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Key benefits:</p>
          <ul className="text-sm space-y-1">
            {policyDetails.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Policy Summary */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Your Policy Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Age:</span>
            <span className="font-medium">{formData.age} years old</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Coverage Amount:</span>
            <span className="font-medium">
              ${parseInt(formData.coverageAmount === 'custom' ? formData.customCoverageAmount : formData.coverageAmount).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Policy Type:</span>
            <span className="font-medium">{policyDetails.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Estimated Monthly Premium:</span>
            <span className="font-medium text-green-600">$150-250</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onNext}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue with {recommendation.type}
        </button>
        
        <button
          onClick={() => {/* Show other options */}}
          className="w-full py-2 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          View Other Policy Options
        </button>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          onClick={onBack}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PolicyRecommendationStep; 
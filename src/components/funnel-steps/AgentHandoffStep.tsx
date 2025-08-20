import React from 'react';

interface AgentHandoffStepProps {
  brand: any;
  formData: any;
  onComplete: (data: any) => void;
  onBack: () => void;
}

const AgentHandoffStep: React.FC<AgentHandoffStepProps> = ({ 
  brand, 
  formData, 
  onComplete, 
  onBack 
}) => {
  const handleComplete = () => {
    onComplete({
      ...formData,
      completed: true,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">You're Almost Done!</h2>
        <p className="text-gray-600 mt-2">A licensed agent will contact you within 24 hours</p>
      </div>

      {/* Success Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <span className="text-3xl mr-3">✅</span>
          <div>
            <h3 className="text-lg font-bold text-green-900">Application Submitted</h3>
            <p className="text-sm text-green-700">Your information has been securely saved</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-green-800">
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Coverage:</strong> ${parseInt(formData.coverageAmount === 'custom' ? formData.customCoverageAmount : formData.coverageAmount).toLocaleString()}</p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">How would you like to be contacted?</h3>
        
        <div className="space-y-3">
          <button
            onClick={() => window.open(`tel:${brand.phone}`, '_self')}
            className="w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">📞</span>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Call Now</div>
                <div className="text-sm text-gray-600">{brand.phone}</div>
                <div className="text-xs text-gray-500">Speak with an agent immediately</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => window.open(`mailto:${brand.email}?subject=Life Insurance Quote Request`, '_self')}
            className="w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">✉️</span>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Email Us</div>
                <div className="text-sm text-gray-600">{brand.email}</div>
                <div className="text-xs text-gray-500">Get a detailed quote via email</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => window.open('https://calendly.com/your-calendar', '_blank')}
            className="w-full p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">📅</span>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Schedule a Call</div>
                <div className="text-sm text-gray-600">Book a convenient time</div>
                <div className="text-xs text-gray-500">15-30 minute consultation</div>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-3">What happens next?</h4>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-start">
            <span className="mr-2 mt-1">1.</span>
            <span>A licensed agent will review your information</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2 mt-1">2.</span>
            <span>You'll receive a personalized quote within 24 hours</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2 mt-1">3.</span>
            <span>Complete your application with the agent's guidance</span>
          </div>
          <div className="flex items-start">
            <span className="mr-2 mt-1">4.</span>
            <span>Get approved and start your coverage</span>
          </div>
        </div>
      </div>

      {/* Final Actions */}
      <div className="space-y-3">
        <button
          onClick={handleComplete}
          className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          style={{ backgroundColor: brand.primaryColor }}
        >
          Complete Application
        </button>
        
        <button
          onClick={() => window.location.href = '/'}
          className="w-full py-2 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Return to Home
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
          onClick={handleComplete}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          style={{ backgroundColor: brand.primaryColor }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default AgentHandoffStep; 
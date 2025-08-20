import React from 'react';

interface EntryChoiceStepProps {
  brand: any;
  onContactOnly: (data: any) => void;
  onContinue: () => void;
}

const EntryChoiceStep: React.FC<EntryChoiceStepProps> = ({ 
  brand, 
  onContactOnly, 
  onContinue 
}) => {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900" style={{ color: brand.primaryColor }}>
          Welcome to {brand.brandName}
        </h2>
        <p className="text-lg text-gray-600">
          {brand.sellingPoint}
        </p>
        <p className="text-sm text-gray-500">
          {brand.tagline}
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How would you like to proceed?</h3>
          <p className="text-sm text-blue-700">
            Choose the option that works best for you right now.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onContinue}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <div className="text-left">
              <div className="font-bold">Complete Application</div>
              <div className="text-sm opacity-90">Get a personalized quote and apply online</div>
            </div>
          </button>

          <button
            onClick={() => onContactOnly({ step: 'contact_only', brand: brand.brandName })}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <div className="text-left">
              <div className="font-bold">Just Contact Info</div>
              <div className="text-sm opacity-90">Get a call from a licensed agent</div>
            </div>
          </button>
        </div>

        <div className="text-xs text-gray-500">
          <p>✓ No obligation</p>
          <p>✓ Licensed agents</p>
          <p>✓ Secure & private</p>
        </div>
      </div>
    </div>
  );
};

export default EntryChoiceStep; 
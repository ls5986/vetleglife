import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const FundingRound: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedFunding, setSelectedFunding] = useState<string>('');

  const fundingOptions = [
    'Bootstrapped',
    'Friends & Family',
    'Angel Investment',
    'Seed Round',
    'Series A',
    'Series B+',
    'IPO/Public'
  ];

  useEffect(() => {
    if (selectedFunding && selectedFunding !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedFunding, goToNextStep]);

  const handleFundingSelect = (funding: string) => {
    setSelectedFunding(funding);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        fundingRound: funding
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What is your current funding status?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us understand your financial situation and coverage needs.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {fundingOptions.map((funding) => (
          <Button
            key={funding}
            variant={selectedFunding === funding ? 'default' : 'outline'}
            onClick={() => handleFundingSelect(funding)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedFunding === funding
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {funding}
          </Button>
        ))}
      </div>

      {selectedFunding && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedFunding}</span>
          </p>
        </div>
      )}
    </div>
  );
};

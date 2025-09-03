import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const HomeOwnership: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedOwnership, setSelectedOwnership] = useState<string>('');

  const ownershipOptions = [
    'Renting',
    'First-time homebuyer',
    'Homeowner (1-5 years)',
    'Homeowner (5+ years)',
    'Multiple properties'
  ];

  useEffect(() => {
    if (selectedOwnership && selectedOwnership !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedOwnership, goToNextStep]);

  const handleOwnershipSelect = (ownership: string) => {
    setSelectedOwnership(ownership);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        homeOwnership: ownership
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What is your current home ownership status?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us understand your financial situation and coverage needs.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {ownershipOptions.map((ownership) => (
          <Button
            key={ownership}
            variant={selectedOwnership === ownership ? 'default' : 'outline'}
            onClick={() => handleOwnershipSelect(ownership)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedOwnership === ownership
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {ownership}
          </Button>
        ))}
      </div>

      {selectedOwnership && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedOwnership}</span>
          </p>
        </div>
      )}
    </div>
  );
};

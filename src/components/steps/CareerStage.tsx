import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const CareerStage: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedStage, setSelectedStage] = useState<string>('');

  const stageOptions = [
    'Early Career',
    'Mid-Career',
    'Senior Professional',
    'Executive/C-Suite',
    'Business Owner',
    'Retired'
  ];

  useEffect(() => {
    if (selectedStage && selectedStage !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedStage, goToNextStep]);

  const handleStageSelect = (stage: string) => {
    setSelectedStage(stage);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        careerStage: stage
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What stage are you in your career?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us understand your professional situation and coverage needs.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {stageOptions.map((stage) => (
          <Button
            key={stage}
            variant={selectedStage === stage ? 'default' : 'outline'}
            onClick={() => handleStageSelect(stage)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedStage === stage
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {stage}
          </Button>
        ))}
      </div>

      {selectedStage && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedStage}</span>
          </p>
        </div>
      )}
    </div>
  );
};

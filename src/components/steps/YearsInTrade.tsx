import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const YearsInTrade: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedExperience, setSelectedExperience] = useState<string>('');

  const experienceOptions = [
    'Apprentice (0-2 years)',
    'Journeyman (2-5 years)',
    'Experienced (5-10 years)',
    'Master (10+ years)',
    'Business Owner'
  ];

  useEffect(() => {
    if (selectedExperience && selectedExperience !== '') {
      // Auto-advance after selection
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedExperience, goToNextStep]);

  const handleExperienceSelect = (experience: string) => {
    setSelectedExperience(experience);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        yearsInTrade: experience
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        How many years have you been working in your trade?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us understand your experience level and coverage needs.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {experienceOptions.map((experience) => (
          <Button
            key={experience}
            variant={selectedExperience === experience ? 'default' : 'outline'}
            onClick={() => handleExperienceSelect(experience)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedExperience === experience
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {experience}
          </Button>
        ))}
      </div>

      {selectedExperience && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedExperience}</span>
          </p>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const YearsInUS: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedYears, setSelectedYears] = useState<string>('');

  const yearsOptions = [
    'Less than 1 year',
    '1-3 years',
    '3-5 years',
    '5-10 years',
    '10+ years'
  ];

  useEffect(() => {
    if (selectedYears && selectedYears !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedYears, goToNextStep]);

  const handleYearsSelect = (years: string) => {
    setSelectedYears(years);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        yearsInUS: years
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        How long have you been living in the United States?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us provide you with immigrant-specific coverage and benefits.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {yearsOptions.map((years) => (
          <Button
            key={years}
            variant={selectedYears === years ? 'default' : 'outline'}
            onClick={() => handleYearsSelect(years)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedYears === years
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {years}
          </Button>
        ))}
      </div>

      {selectedYears && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedYears}</span>
          </p>
        </div>
      )}
    </div>
  );
};

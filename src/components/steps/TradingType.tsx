import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const TradingType: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedType, setSelectedType] = useState<string>('');

  const typeOptions = [
    'Day Trading',
    'Swing Trading',
    'Options Trading',
    'Futures Trading',
    'Forex Trading',
    'Long-term Investing',
    'Other Trading'
  ];

  useEffect(() => {
    if (selectedType && selectedType !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedType, goToNextStep]);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        tradingType: type
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What type of trading do you primarily engage in?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us provide you with trader-specific coverage and benefits.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {typeOptions.map((type) => (
          <Button
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            onClick={() => handleTypeSelect(type)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedType === type
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {type}
          </Button>
        ))}
      </div>

      {selectedType && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedType}</span>
          </p>
        </div>
      )}
    </div>
  );
};

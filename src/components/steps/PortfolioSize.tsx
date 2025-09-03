import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const PortfolioSize: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedSize, setSelectedSize] = useState<string>('');

  const sizeOptions = [
    'Under $10,000',
    '$10,000 - $50,000',
    '$50,000 - $250,000',
    '$250,000 - $1M',
    '$1M - $5M',
    '$5M+'
  ];

  useEffect(() => {
    if (selectedSize && selectedSize !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedSize, goToNextStep]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        portfolioSize: size
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What is your approximate portfolio size?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us understand your financial situation and coverage needs.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {sizeOptions.map((size) => (
          <Button
            key={size}
            variant={selectedSize === size ? 'default' : 'outline'}
            onClick={() => handleSizeSelect(size)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedSize === size
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {size}
          </Button>
        ))}
      </div>

      {selectedSize && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedSize}</span>
          </p>
        </div>
      )}
    </div>
  );
};

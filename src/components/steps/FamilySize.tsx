import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const FamilySize: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedSize, setSelectedSize] = useState<string>('');

  const sizeOptions = [
    'No children yet',
    '1 child',
    '2 children',
    '3 children',
    '4+ children'
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
        familySize: size
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        How many children do you have?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us provide you with family-specific coverage and benefits.
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

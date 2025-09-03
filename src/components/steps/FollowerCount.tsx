import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const FollowerCount: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedCount, setSelectedCount] = useState<string>('');

  const countOptions = [
    'Under 1,000 followers',
    '1,000 - 10,000 followers',
    '10,000 - 100,000 followers',
    '100,000 - 1M followers',
    '1M+ followers',
    'Just starting out'
  ];

  useEffect(() => {
    if (selectedCount && selectedCount !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedCount, goToNextStep]);

  const handleCountSelect = (count: string) => {
    setSelectedCount(count);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        followerCount: count
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What is your approximate follower/audience size?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us understand your reach and coverage needs.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {countOptions.map((count) => (
          <Button
            key={count}
            variant={selectedCount === count ? 'default' : 'outline'}
            onClick={() => handleCountSelect(count)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedCount === count
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {count}
          </Button>
        ))}
      </div>

      {selectedCount && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedCount}</span>
          </p>
        </div>
      )}
    </div>
  );
};

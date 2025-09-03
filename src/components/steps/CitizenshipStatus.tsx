import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const CitizenshipStatus: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const statusOptions = [
    'U.S. Citizen',
    'Permanent Resident (Green Card)',
    'Work Visa (H1B, L1, etc.)',
    'Student Visa (F1, J1)',
    'Other Visa Status'
  ];

  useEffect(() => {
    if (selectedStatus && selectedStatus !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedStatus, goToNextStep]);

  const handleStatusSelect = (status: string) => {
    setSelectedStatus(status);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        citizenshipStatus: status
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What is your current citizenship status?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us understand your legal situation and coverage needs.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {statusOptions.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            onClick={() => handleStatusSelect(status)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedStatus === status
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {status}
          </Button>
        ))}
      </div>

      {selectedStatus && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedStatus}</span>
          </p>
        </div>
      )}
    </div>
  );
};

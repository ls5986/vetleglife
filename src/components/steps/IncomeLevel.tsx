import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const IncomeLevel: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedIncome, setSelectedIncome] = useState<string>('');

  const incomeOptions = [
    'Under $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000 - $500,000',
    '$500,000 - $1M',
    '$1M+'
  ];

  useEffect(() => {
    if (selectedIncome && selectedIncome !== '') {
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedIncome, goToNextStep]);

  const handleIncomeSelect = (income: string) => {
    setSelectedIncome(income);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        incomeLevel: income
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What is your approximate annual income?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us provide you with success-specific coverage and benefits.
      </p>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {incomeOptions.map((income) => (
          <Button
            key={income}
            variant={selectedIncome === income ? 'default' : 'outline'}
            onClick={() => handleIncomeSelect(income)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedIncome === income
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {income}
          </Button>
        ))}
      </div>

      {selectedIncome && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedIncome}</span>
          </p>
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const TradeType: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedTrade, setSelectedTrade] = useState<string>('');

  const tradeOptions = [
    'Construction',
    'Plumbing',
    'Electrical',
    'HVAC',
    'Automotive',
    'Welding',
    'Other Skilled Trade'
  ];

  useEffect(() => {
    if (selectedTrade && selectedTrade !== '') {
      // Auto-advance after selection
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedTrade, goToNextStep]);

  const handleTradeSelect = (trade: string) => {
    setSelectedTrade(trade);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        tradeType: trade
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What type of trade do you work in?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us provide you with trade-specific coverage and benefits.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {tradeOptions.map((trade) => (
          <Button
            key={trade}
            variant={selectedTrade === trade ? 'default' : 'outline'}
            onClick={() => handleTradeSelect(trade)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedTrade === trade
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {trade}
          </Button>
        ))}
      </div>

      {selectedTrade && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedTrade}</span>
          </p>
        </div>
      )}
    </div>
  );
};

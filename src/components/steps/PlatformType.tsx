import React, { useState, useEffect } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { Button } from '../shared/Button';

export const PlatformType: React.FC = () => {
  const { formData, updateFormData, goToNextStep } = useFunnelStore();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');

  const platformOptions = [
    'YouTube/Videos',
    'Social Media (Instagram, TikTok)',
    'Blogging/Writing',
    'Podcasting',
    'Gaming/Streaming',
    'Other Digital Content'
  ];

  useEffect(() => {
    if (selectedPlatform && selectedPlatform !== '') {
      // Auto-advance after selection
      const timer = setTimeout(() => {
        goToNextStep();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedPlatform, goToNextStep]);

  const handlePlatformSelect = (platform: string) => {
    setSelectedPlatform(platform);
    updateFormData({
      ...formData,
      preQualification: {
        ...formData.preQualification,
        platformType: platform
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        What type of content do you create?
      </h2>
      <p className="text-lg text-gray-600 mb-8">
        This helps us provide you with creator-specific coverage and benefits.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {platformOptions.map((platform) => (
          <Button
            key={platform}
            variant={selectedPlatform === platform ? 'default' : 'outline'}
            onClick={() => handlePlatformSelect(platform)}
            className={`h-16 text-lg font-medium transition-all duration-200 ${
              selectedPlatform === platform
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            {platform}
          </Button>
        ))}
      </div>

      {selectedPlatform && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 font-medium">
            Selected: <span className="font-bold">{selectedPlatform}</span>
          </p>
        </div>
      )}
    </div>
  );
};

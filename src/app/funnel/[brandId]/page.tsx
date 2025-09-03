'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBrandConfig } from '../../../config/brands';
import DynamicFunnel from '../../../components/DynamicFunnel';
import { useFunnelStore } from '../../../store/funnelStore';

export default function FunnelPage() {
  const params = useParams();
  const brandId = params.brandId as string;
  const [brandConfig, setBrandConfig] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { resetFunnel, openModal } = useFunnelStore();

  useEffect(() => {
    if (brandId) {
      const config = getBrandConfig(brandId);
      if (config) {
        setBrandConfig(config);
        // Reset funnel to start fresh
        resetFunnel();
        // Open the modal automatically
        openModal();
      }
      setIsLoading(false);
    }
  }, [brandId, resetFunnel, openModal]);

  const handleComplete = (data: any) => {
    // Handle funnel completion
    console.log('Funnel completed:', data);
    // You can redirect or show success message here
  };

  const handleClose = () => {
    // Handle funnel close
    console.log('Funnel closed');
    // You can redirect or show exit intent here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading funnel...</p>
        </div>
      </div>
    );
  }

  if (!brandConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
          <p className="text-gray-600">The requested brand funnel could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {brandConfig.heroTitle}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {brandConfig.heroSubtitle}
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              {brandConfig.description}
            </p>
          </div>
        </div>
      </div>

      {/* Brand-Specific Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Brand Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Think of {brandConfig.displayName} as Your Backup Plan
            </h2>
            <div className="space-y-4">
              {brandConfig.brandSpecificQuestions.map((question: any, index: number) => (
                <div key={question.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {question.question.replace('What is your ', '').replace('?', '')}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {question.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Example/Info */}
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Real Example: Professional in {brandConfig.displayName}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Year 1:</span>
                <span className="font-semibold text-green-600">Started Coverage</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year 3:</span>
                <span className="font-semibold text-green-600">$40,000 Cash Value</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year 5:</span>
                <span className="font-semibold text-blue-600">$75,000 Loan Available</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Year 7:</span>
                <span className="font-semibold text-green-600">$160,000 Cash Value</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              *Example assumes consistent premium payments and market performance. Actual results may vary.
            </p>
          </div>
        </div>

        {/* Common Questions */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Common Questions About {brandConfig.displayName}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  We have dangerous jobs. Do we need special coverage?
                </h3>
                <p className="text-gray-600">
                  Yes! {brandConfig.displayName} provides higher coverage amounts and living benefits designed for {brandConfig.displayName.toLowerCase().includes('responder') ? 'first responders' : 'professionals in your field'}.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  How is this different from my department benefits?
                </h3>
                <p className="text-gray-600">
                  This is personal protection that stays with you regardless of department or job changes.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  What if I get injured on duty?
                </h3>
                <p className="text-gray-600">
                  {brandConfig.displayName} provides living benefits for critical illness and can help replace lost income.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I use this for medical expenses?
                </h3>
                <p className="text-gray-600">
                  Yes! You can access your cash value tax-free for medical expenses or emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Funnel */}
      <DynamicFunnel
        brandConfig={brandConfig}
        onComplete={handleComplete}
        onClose={handleClose}
      />
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import DynamicFunnel from '@/components/DynamicFunnel';
import { getBrandConfig } from '@/config/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, Mail, Camera, CheckCircle, Star, Clock, Award, Heart, ChartLine, Shield, Users, Video, Zap, Target, ShieldCheck } from 'lucide-react';
import IULEducationSection from '@/components/IULEducationSection';
import { useFunnelStore } from '@/store/funnelStore';

export default function CreatorLegacyLifePage() {
  const [showCreatorFunnel, setShowCreatorFunnel] = useState(false);
  const brandConfig = getBrandConfig('creator-legacy-life');
  const { openModal, resetFunnel } = useFunnelStore();

  const handleFunnelComplete = (data: any) => {
    console.log('Creator funnel completed:', data);
    setShowCreatorFunnel(false);
  };

  const handleStartFunnel = () => {
    console.log('Starting creator funnel...');
    resetFunnel();
    openModal();
    setShowCreatorFunnel(true);
  };

  if (!brandConfig) return <div>Brand not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900" style={{
                fontSize: '1.7rem',
                color: '#7c2d12',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(124,45,18,0.07)',
                fontStyle: 'oblique 10deg',
                transform: 'skew(-4deg)',
                display: 'inline-block'
              }}>
                Creator Legacy Life
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="tel:(555) 123-4567" className="flex items-center text-gray-700 hover:text-gray-900">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">(555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="py-16 bg-gradient-to-br from-orange-50 to-amber-100 cursor-pointer hover:from-orange-100 hover:to-amber-200 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-orange-600">Protect the life</span><br />
                <span className="text-gray-800">behind the likes.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                You create content every day — but what about your financial future? 
                Turn your hustle into a lasting legacy with life insurance designed for creators.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-orange-500 mr-1" />
                  <span>Trusted by 8,000+ Creators</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-orange-500 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={(e) => { e.stopPropagation(); handleStartFunnel(); }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Video className="h-5 w-5 mr-2" />
                Protect My Hustle
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-orange-600 text-orange-600 hover:bg-orange-50"
              >
                <Phone className="h-5 w-5 mr-2" />
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        className="py-16 bg-white cursor-pointer hover:bg-gray-50 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Content Creation is Unpredictable. Your Protection Shouldn't Be.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Content Insurance</h3>
                <p className="text-gray-600">
                  Protect your income stream and family even when you can't create content.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <ChartLine className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Wealth Building</h3>
                <p className="text-gray-600">
                  Build cash value that grows with the market but never loses money.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Flexible Premiums</h3>
                <p className="text-gray-600">
                  Adjust your payments based on your content income and platform changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* IUL Education Section */}
      <IULEducationSection brand={brandConfig} />

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all duration-300" onClick={handleStartFunnel}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Platform Benefits vs Our Benefits... What's the difference?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Platform Benefits</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Unpredictable income</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">No life insurance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Algorithm changes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">No wealth building</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="p-6 border-orange-600 border-2">
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-bold text-orange-600 mb-4">Our Creator Plans</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Guaranteed protection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Life insurance coverage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Platform-independent</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Wealth building</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 cursor-pointer hover:bg-orange-700 transition-all duration-300" onClick={handleStartFunnel}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Protect Your Creator Legacy?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who've already secured their families and built wealth through our creator-focused life insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={(e) => { e.stopPropagation(); handleStartFunnel(); }}
              className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <ShieldCheck className="h-5 w-5 mr-2" />
              Protect My Hustle
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-orange-600"
            >
              <Phone className="h-5 w-5 mr-2" />
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center mr-3">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Creator Legacy Life</span>
              </div>
              <p className="text-gray-400">
                Protecting content creators and their families since 2024.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>(555) 123-4567</p>
                <p>info@creatorlegacylife.com</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Products</h3>
              <div className="space-y-2 text-gray-400">
                <p>Whole Life</p>
                <p>Term Life</p>
                <p>Indexed Universal Life</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <p>About Us</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Creator Legacy Life. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dynamic Funnel Modal */}
      {showCreatorFunnel && brandConfig && (
        <DynamicFunnel
          brandConfig={brandConfig}
          onComplete={handleFunnelComplete}
          onClose={() => setShowCreatorFunnel(false)}
        />
      )}
    </div>
  );
} 
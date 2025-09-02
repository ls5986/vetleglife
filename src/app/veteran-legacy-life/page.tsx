'use client';

import { useState } from 'react';
import ComprehensiveFunnel from '@/components/ComprehensiveFunnel';
import { getBrandById } from '@/config/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, Mail, Shield, CheckCircle, Star, Clock, Award, Heart, ChartLine, Zap, Target, Users, ShieldCheck } from 'lucide-react';
import IULEducationSection from '@/components/IULEducationSection';

export default function VeteranLegacyLifePage() {
  const [showComprehensiveFunnel, setShowComprehensiveFunnel] = useState(false);
  const brand = getBrandById('veteran-legacy-life');

  const handleFunnelComplete = (data: any) => {
    console.log('Veteran funnel completed:', data);
    setShowComprehensiveFunnel(false);
  };

  const handleStartFunnel = () => {
    console.log('Starting veteran funnel...');
    setShowComprehensiveFunnel(true);
  };

  if (!brand) return <div>Brand not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900" style={{
                fontSize: '1.7rem',
                color: '#2563eb',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(37,99,235,0.07)',
                fontStyle: 'oblique 10deg',
                transform: 'skew(-4deg)',
                display: 'inline-block'
              }}>
                Veteran Legacy Life
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href={`tel:${brand.phone}`} className="flex items-center text-gray-700 hover:text-gray-900">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">{brand.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100 cursor-pointer hover:from-blue-100 hover:to-indigo-200 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-blue-600">You May Qualify for New</span><br />
                <span className="text-gray-800">Life Insurance Benefits in 2025</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                As a resident of your state, you are entitled to check your eligibility for exclusive life insurance benefits designed specifically for our nation's heroes.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-blue-500 mr-1" />
                  <span>Trusted by 50,000+ Veterans Nationwide</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-blue-500 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={(e) => { e.stopPropagation(); handleStartFunnel(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <ShieldCheck className="h-5 w-5 mr-2" />
                See If I Qualify
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={(e) => e.stopPropagation()}
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
            Plans for Veterans, Active Service and Family Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Whole Life Protection</h3>
                <p className="text-gray-600">
                  Guaranteed coverage that never expires and builds cash value over time.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <ChartLine className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Indexed Universal Life</h3>
                <p className="text-gray-600">
                  Flexible coverage with potential for growth tied to market performance.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Term Life Options</h3>
                <p className="text-gray-600">
                  Affordable coverage for specific time periods with living benefits.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* IUL Education Section */}
      <IULEducationSection brand={brand} />

      {/* Comparison Section */}
      <section
        className="py-16 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            The VA Option vs Our Options... What's the difference?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">VA Life Insurance</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Limited coverage amounts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">No cash value accumulation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Restrictive eligibility requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">No living benefits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="p-6 border-blue-600 border-2">
              <CardContent className="space-y-4">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Veteran Plans</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Higher coverage amounts available</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Cash value that grows over time</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Flexible eligibility for all veterans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-600">Living benefits for critical illness</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Secure Your Veteran Benefits?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of veterans who've already secured their families and built wealth through our veteran-focused life insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={(e) => { e.stopPropagation(); handleStartFunnel(); }}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <ShieldCheck className="h-5 w-5 mr-2" />
              Check My Eligibility
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-blue-600"
              onClick={(e) => e.stopPropagation()}
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
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Veteran Legacy Life</span>
              </div>
              <p className="text-gray-400">
                Protecting our nation's heroes and their families since 2024.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>{brand.phone}</p>
                <p>{brand.email}</p>
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
            <p>&copy; 2024 Veteran Legacy Life. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Comprehensive Funnel Modal */}
      {showComprehensiveFunnel && (
        <ComprehensiveFunnel
          brand={brand}
          onComplete={handleFunnelComplete}
          onClose={() => setShowComprehensiveFunnel(false)}
        />
      )}
    </div>
  );
} 
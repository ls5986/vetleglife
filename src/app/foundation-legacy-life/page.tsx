'use client';

import { useEffect, useState } from 'react';
import { useFunnelStore } from '../../store/funnelStore';
import { getBrandConfig } from '../../config/brands';
import DynamicFunnel from '../../components/DynamicFunnel';
import IULEducationSection from '../../components/IULEducationSection';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowRight, Phone, Heart, CheckCircle, Star, Award, Shield, Clock, ChartLine, Zap, Users, Home } from 'lucide-react';

export default function FoundationLegacyLifePage() {
  const { openModal } = useFunnelStore();
  const [showFoundationFunnel, setShowFoundationFunnel] = useState(false);
  const brandConfig = getBrandConfig('foundation-legacy-life');

  useEffect(() => {
    if (brandConfig) {
      openModal();
    }
  }, [brandConfig, openModal]);

  const handleFunnelComplete = (data: any) => {
    console.log('Foundation funnel completed:', data);
    setShowFoundationFunnel(false);
  };

  if (!brandConfig) {
    return <div>Brand not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900" style={{
                fontSize: '1.7rem',
                color: '#9333ea',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(147,51,234,0.07)',
                fontStyle: 'oblique 10deg',
                transform: 'skew(-4deg)',
                display: 'inline-block'
              }}>
                Foundation Legacy Life
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="tel:(555) 123-4568" className="flex items-center text-gray-700 hover:text-gray-900">
                <Phone className="h-5 w-5 mr-2" />
                <span className="font-semibold">(555) 123-4568</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="py-16 bg-gradient-to-br from-purple-50 to-indigo-100 cursor-pointer hover:from-purple-100 hover:to-indigo-200 transition-all duration-300"
        onClick={() => setShowFoundationFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-purple-600">Build your foundation.</span><br />
                <span className="text-gray-800">Secure your family.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Create a solid financial foundation that protects your family's future and builds generational wealth. Our family-focused life insurance plans grow with you through every stage of life.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-purple-500 mr-1" />
                  <span>Trusted by 25,000+ Families</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-purple-500 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowFoundationFunnel(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <Heart className="h-5 w-5 mr-2" />
                Protect My Family
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Phone className="h-5 w-5 mr-2" />
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Protection Plans for Families & Foundation Building
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Whole Life Insurance</h3>
                <p className="text-gray-600 mb-6">Lifetime protection with guaranteed cash value that grows with your family.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Guaranteed death benefit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Cash value for opportunities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Fixed premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Living benefits included</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Term Insurance</h3>
                <p className="text-gray-600 mb-6">Affordable coverage during your family's early years with conversion options.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Lower initial premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Flexible term lengths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Convert to permanent later</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Living benefits available</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartLine className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Indexed Universal Life</h3>
                <p className="text-gray-600 mb-6">Market-linked growth potential with downside protection for wealth building.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Market-linked growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Downside protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Flexible premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Advanced living benefits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* IUL Education Section */}
      <IULEducationSection brand={{
        id: brandConfig.id,
        name: brandConfig.name,
        displayName: brandConfig.displayName
      }} />

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Foundation Insurance vs Traditional Options... What's the difference?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border border-gray-300 px-6 py-4 text-left">Feature</th>
                  <th className="border border-gray-300 px-6 py-4 text-center">Traditional Insurance</th>
                  <th className="border border-gray-300 px-6 py-4 text-center bg-purple-700">Foundation Legacy Life</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Family-Focused Planning</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">None</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Customized</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Generational Wealth</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Limited</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Comprehensive</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Home Ownership Support</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Basic</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Advanced</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Family Support</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Generic</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Expert Guidance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Build Your Family's Foundation?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who've already secured their futures and built generational wealth through our foundation-focused life insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowFoundationFunnel(true)}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <Heart className="h-5 w-5 mr-2" />
              Start My Application
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-purple-600"
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
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Foundation Legacy Life</span>
              </div>
              <p className="text-gray-400">
                Building family foundations since 2024.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p>(555) 123-4568</p>
                <p>info@foundationlegacylife.com</p>
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
            <p>&copy; 2024 Foundation Legacy Life. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Dynamic Funnel Modal */}
      {showFoundationFunnel && brandConfig && (
        <DynamicFunnel
          brandConfig={brandConfig}
          onComplete={handleFunnelComplete}
          onClose={() => setShowFoundationFunnel(false)}
        />
      )}
    </div>
  );
} 
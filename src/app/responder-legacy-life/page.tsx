'use client';

import { useState } from 'react';
import ComprehensiveFunnel from '@/components/ComprehensiveFunnel';
import { getBrandById } from '@/config/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, Mail, Shield, CheckCircle, Star, Clock, Award, Heart, ChartLine, Zap, Target, Users, ShieldCheck, AlertTriangle } from 'lucide-react';
import IULEducationSection from '@/components/IULEducationSection';

export default function ResponderLegacyLifePage() {
  const [showComprehensiveFunnel, setShowComprehensiveFunnel] = useState(false);
  const brand = getBrandById('responder-legacy-life');

  const handleFunnelComplete = (data: any) => {
    console.log('Responder funnel completed:', data);
    setShowComprehensiveFunnel(false);
  };

  if (!brand) return <div>Brand not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mr-3">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900" style={{
                fontSize: '1.7rem',
                color: '#be185d',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(190,24,93,0.07)',
                fontStyle: 'oblique 10deg',
                transform: 'skew(-4deg)',
                display: 'inline-block'
              }}>
                Responder Legacy Life
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
        className="py-16 bg-gradient-to-br from-pink-50 to-rose-100 cursor-pointer hover:from-pink-100 hover:to-rose-200 transition-all duration-300"
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-pink-600">The ones who save lives</span><br />
                <span className="text-gray-800">deserve theirs secured.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                You protect and serve every day. Let us protect your family with a plan 
                that never takes a day off, designed specifically for first responders.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-pink-500 mr-1" />
                  <span>Trusted by 35,000+ First Responders</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-pink-500 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowComprehensiveFunnel(true)}
                className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Protect My Family
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-pink-600 text-pink-600 hover:bg-pink-50"
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
            Protection Plans for First Responders
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Whole Life Insurance</h3>
                <p className="text-gray-600 mb-6">Lifetime protection with guaranteed cash value that grows with your service.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Guaranteed death benefit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Cash value for emergencies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Fixed premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Living benefits included</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Term Insurance</h3>
                <p className="text-gray-600 mb-6">Affordable coverage during your active service years with conversion options.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Lower initial premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Flexible term lengths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Convert to permanent later</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Living benefits available</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartLine className="h-8 w-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Indexed Universal Life</h3>
                <p className="text-gray-600 mb-6">Market-linked growth potential with downside protection for wealth building.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Market-linked growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Downside protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Flexible premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-pink-500" />
                    <span className="text-sm">Advanced living benefits</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* IUL Education Section */}
      <IULEducationSection brand={brand} />

      {/* Comparison Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Responder Insurance vs Traditional Options... What's the difference?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-pink-600 text-white">
                  <th className="border border-gray-300 px-6 py-4 text-left">Feature</th>
                  <th className="border border-gray-300 px-6 py-4 text-center">Traditional Insurance</th>
                  <th className="border border-gray-300 px-6 py-4 text-center bg-pink-700">Responder Legacy Life</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">First Responder Benefits</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">None</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-pink-600 font-semibold">✓ Customized</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Shift Schedule Support</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Limited</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-pink-600 font-semibold">✓ 24/7 Coverage</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">High-Risk Occupation</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Standard Rates</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-pink-600 font-semibold">✓ Preferred Rates</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Responder Expert Support</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Generic</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-pink-600 font-semibold">✓ Responder Specialists</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Protect Your Family?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Join thousands of first responders who've already secured their families with our responder-focused life insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowComprehensiveFunnel(true)}
              className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              Start My Application
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-pink-600"
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
                <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Responder Legacy Life</span>
              </div>
              <p className="text-gray-400">
                Protecting those who protect us since 2024.
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
            <p>&copy; 2024 Responder Legacy Life. All rights reserved.</p>
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
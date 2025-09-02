'use client';

import { useState } from 'react';
import ComprehensiveFunnel from '@/components/ComprehensiveFunnel';
import { getBrandById } from '@/config/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, Mail, Globe, CheckCircle, Star, Clock, Award, Heart, ChartLine, Shield, Users, Flag, Zap, Target, ShieldCheck } from 'lucide-react';
import IULEducationSection from '@/components/IULEducationSection';

export default function ImmigrantLegacyLifePage() {
  const [showComprehensiveFunnel, setShowComprehensiveFunnel] = useState(false);
  const brand = getBrandById('immigrant-legacy-life');

  const handleFunnelComplete = (data: any) => {
    console.log('Immigrant funnel completed:', data);
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
              <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center mr-3">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900" style={{
                fontSize: '1.7rem',
                color: '#0891b2',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(8,145,178,0.07)',
                fontStyle: 'oblique 10deg',
                transform: 'skew(-4deg)',
                display: 'inline-block'
              }}>
                Immigrant Legacy Life
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
        className="py-16 bg-gradient-to-br from-cyan-50 to-blue-100 cursor-pointer hover:from-cyan-100 hover:to-blue-200 transition-all duration-300"
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-cyan-600">From sacrifice</span><br />
                <span className="text-gray-800">to security.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                You came here to create a better life. We'll help you secure it — and pass it on 
                to the next generation with life insurance designed for immigrant families.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-cyan-500 mr-1" />
                  <span>Trusted by 30,000+ Immigrant Families</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-cyan-500 mr-1" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowComprehensiveFunnel(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <Flag className="h-5 w-5 mr-2" />
                Secure My Family's Future
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50"
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
            Protection Plans for Immigrant Families & First-Gen Americans
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Whole Life Insurance</h3>
                <p className="text-gray-600 mb-6">Lifetime protection with guaranteed cash value that grows with your family.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Guaranteed death benefit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Cash value for emergencies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Fixed premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
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
                <p className="text-gray-600 mb-6">Affordable coverage during your family's early years with conversion options.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Lower initial premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Flexible term lengths</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Convert to permanent later</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Living benefits available</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartLine className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Indexed Universal Life</h3>
                <p className="text-gray-600 mb-6">Market-linked growth potential with downside protection for wealth building.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Market-linked growth</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Downside protection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm">Flexible premiums</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-cyan-500" />
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
            Immigrant Insurance vs Traditional Options... What's the difference?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-cyan-600 text-white">
                  <th className="border border-gray-300 px-6 py-4 text-left">Feature</th>
                  <th className="border border-gray-300 px-6 py-4 text-center">Traditional Insurance</th>
                  <th className="border border-gray-300 px-6 py-4 text-center bg-cyan-700">Immigrant Legacy Life</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Immigrant-Specific Planning</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">None</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-cyan-600 font-semibold">✓ Customized</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Family Back Home Support</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Limited</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-cyan-600 font-semibold">✓ International Benefits</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Citizenship Status Support</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">None</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-cyan-600 font-semibold">✓ Expert Guidance</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Multilingual Support</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Basic</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-cyan-600 font-semibold">✓ Multiple Languages</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Secure Your Family's Future?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Join thousands of immigrant families who've already secured their future and started building generational wealth through our immigrant-focused life insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowComprehensiveFunnel(true)}
              className="bg-white text-cyan-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <Flag className="h-5 w-5 mr-2" />
              Start My Application
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-cyan-600"
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
                <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center mr-3">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Immigrant Legacy Life</span>
              </div>
              <p className="text-gray-400">
                From sacrifice to security since 2024.
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
            <p>&copy; 2024 Immigrant Legacy Life. All rights reserved.</p>
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
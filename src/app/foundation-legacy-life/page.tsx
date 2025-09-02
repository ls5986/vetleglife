'use client';

import { useState } from 'react';
import ComprehensiveFunnel from '@/components/ComprehensiveFunnel';
import { getBrandById } from '@/config/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, Mail, Home, CheckCircle, Star, Clock, Award, Heart, ChartLine, Shield, Users, Building } from 'lucide-react';
import { FoundationLogo } from '@/components/brand-logos/FoundationLogo';

export default function FoundationLegacyLifePage() {
  const [showComprehensiveFunnel, setShowComprehensiveFunnel] = useState(false);
  const brand = getBrandById('foundation-legacy-life');

  const handleFunnelComplete = (data: any) => {
    console.log('Foundation funnel completed:', data);
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
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                <FoundationLogo className="h-8 w-8" />
              </div>
              <span className="text-2xl font-bold text-gray-900" style={{
                fontSize: '1.7rem',
                color: '#7c3aed',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(124,58,237,0.07)',
                fontStyle: 'oblique 10deg',
                transform: 'skew(-4deg)',
                display: 'inline-block'
              }}>
                Foundation Legacy Life
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
        className="py-16 bg-gradient-to-br from-purple-50 to-indigo-100 cursor-pointer hover:from-purple-100 hover:to-indigo-200 transition-all duration-300"
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-purple-600">A future built</span><br />
                <span className="text-gray-800">on security.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every strong future is built on a foundation. Protect your loved ones and start building 
                generational wealth now with life insurance designed for new families.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-purple-500 mr-1" />
                  <span>Trusted by 25,000+ Families</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-purple-500 mr-1" />
                  <span>4.8/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={(e) => { e.stopPropagation(); setShowComprehensiveFunnel(true); }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <Building className="h-5 w-5 mr-2" />
                Build My Family's Foundation
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
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
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Protection Plans for New Families & First-Time Homeowners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Family Protection</h3>
                <p className="text-gray-600">
                  Protect your loved ones and secure your family's future.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <ChartLine className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Wealth Building</h3>
                <p className="text-gray-600">
                  Start building generational wealth for your children.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">College Funding</h3>
                <p className="text-gray-600">
                  Fund your children's education with tax-free growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* IUL Education Section */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What is Indexed Universal Life (IUL)?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start Building Generational Wealth Today
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Think of IUL as Your Family's Money Tree
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Plant the Seed Early</h4>
                    <p className="text-gray-600">Start with what you can afford - even $50/month can grow into $500,000+ for your family.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Watch It Grow Tax-Free</h4>
                    <p className="text-gray-600">Your money grows with the market but never loses value, and it's all tax-free.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Harvest for Your Family</h4>
                    <p className="text-gray-600">Use the cash value for college, emergencies, or pass it on to future generations.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Real Example: The Rodriguez Family</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Age 28: Started IUL</span>
                  <span className="font-semibold">$250,000 coverage</span>
                </div>
                <div className="flex justify-between">
                  <span>Age 35: Cash Value</span>
                  <span className="font-semibold text-green-600">$35,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Age 42: Used for College</span>
                  <span className="font-semibold text-blue-600">$50,000 loan</span>
                </div>
                <div className="flex justify-between">
                  <span>Age 50: Cash Value</span>
                  <span className="font-semibold text-green-600">$120,000</span>
                </div>
                <div className="border-t pt-2 mt-4">
                  <p className="text-gray-600 text-xs">*Example shows how IUL can fund education while continuing to grow.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Common Family Questions About IUL
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"We're just starting out. How can we afford this?"</h4>
                <p className="text-gray-600 text-sm">Start small! Even $25-50/month can grow significantly over time. Premiums can increase as your income grows.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"What if we need money for emergencies?"</h4>
                <p className="text-gray-600 text-sm">You can access your cash value tax-free for emergencies, medical expenses, or unexpected costs.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"How is this different from a 529 college plan?"</h4>
                <p className="text-gray-600 text-sm">IUL is more flexible - you can use it for anything, not just education, and it provides life insurance protection.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"What if we can't keep paying premiums?"</h4>
                <p className="text-gray-600 text-sm">IUL offers flexible premiums. You can reduce or skip payments using your cash value to keep the policy active.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section 
        className="py-16 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all duration-300"
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Family Insurance vs Traditional Options... What's the difference?
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
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Generic</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Customized</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Homeowner Benefits</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">None</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Mortgage Protection</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Child Education Planning</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Limited</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Education Funding</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">New Family Guidance</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">None</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-purple-600 font-semibold">✓ Expert Support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 bg-purple-600 cursor-pointer hover:bg-purple-700 transition-all duration-300"
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Build Your Family's Foundation?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who've already secured their future and started building generational wealth through our family-focused life insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={(e) => { e.stopPropagation(); setShowComprehensiveFunnel(true); }}
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <Building className="h-5 w-5 mr-2" />
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
                  <FoundationLogo className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">Foundation Legacy Life</span>
              </div>
              <p className="text-gray-400">
                Building strong family foundations since 2024.
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
            <p>&copy; 2024 Foundation Legacy Life. All rights reserved.</p>
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
'use client';

import { useState } from 'react';
import ComprehensiveFunnel from '@/components/ComprehensiveFunnel';
import { getBrandById } from '@/config/brands';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Phone, Mail, TrendingUp, CheckCircle, Star, Clock, Award, Heart, ChartLine, Zap, Target, Users, Shield } from 'lucide-react';
import { StartupLogo } from '@/components/brand-logos/StartupLogo';

export default function StartupLegacyLifePage() {
  const [showComprehensiveFunnel, setShowComprehensiveFunnel] = useState(false);
  const brand = getBrandById('startup-legacy-life');

  const handleFunnelComplete = (data: any) => {
    console.log('Startup funnel completed:', data);
    setShowComprehensiveFunnel(false);
  };

  const handleStartFunnel = () => {
    console.log('Starting funnel...');
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
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <StartupLogo className="h-8 w-8" />
              </div>
              <span className="text-2xl font-bold text-gray-900" style={{
                fontSize: '1.7rem',
                color: '#059669',
                fontWeight: 800,
                letterSpacing: '0.02em',
                textShadow: '0 2px 8px rgba(5,150,105,0.07)',
                fontStyle: 'oblique 10deg',
                transform: 'skew(-4deg)',
                display: 'inline-block'
              }}>
                Startup Legacy Life
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
        className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 cursor-pointer hover:from-green-100 hover:to-emerald-200 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                <span className="text-green-600">Build your dream.</span><br />
                <span className="text-gray-800">Secure your legacy.</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                You take risks every day building your company — your financial future doesn't have to be one of them. 
                Lock in lifelong protection and a wealth-building plan that grows with your startup.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-green-500 mr-1" />
                  <span>Trusted by 10,000+ Entrepreneurs</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-green-500 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={(e) => { e.stopPropagation(); handleStartFunnel(); }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                style={{ backgroundColor: brand.primaryColor }}
              >
                <Zap className="h-5 w-5 mr-2" />
                Secure My Startup's Future
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-green-600 text-green-600 hover:bg-green-50"
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
            Protection Plans for Entrepreneurs & Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Business Protection</h3>
                <p className="text-gray-600">
                  Protect your company's future and your family's security.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <ChartLine className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Wealth Building</h3>
                <p className="text-gray-600">
                  Build tax-free wealth that grows with your business success.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Flexible Funding</h3>
                <p className="text-gray-600">
                  Access cash value for business opportunities or emergencies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* IUL Education Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What is Indexed Universal Life (IUL)?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your Startup's Success Shouldn't Risk Your Family's Future
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Think of IUL as Your Smart Founder's Safety Net
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Emergency Runway for Your Family</h4>
                    <p className="text-gray-600">If something happens to you, your family has immediate access to cash value.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Opportunity Fund</h4>
                    <p className="text-gray-600">Borrow against your cash value for business expansion or new ventures.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tax-Free Growth</h4>
                    <p className="text-gray-600">Your wealth grows tax-free, unlike your business profits or stock options.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Real Example: Sarah Chen, Tech Founder</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Year 1: Started IUL</span>
                  <span className="font-semibold">$500,000 coverage</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 3: Cash Value</span>
                  <span className="font-semibold text-green-600">$45,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 5: Used for Series A</span>
                  <span className="font-semibold text-blue-600">$75,000 loan</span>
                </div>
                <div className="flex justify-between">
                  <span>Year 7: Cash Value</span>
                  <span className="font-semibold text-green-600">$180,000</span>
                </div>
                <div className="border-t pt-2 mt-4">
                  <p className="text-gray-600 text-xs">*Example shows how IUL can fund business opportunities while protecting family.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Common Founder Questions About IUL
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"I'm reinvesting everything in my company. How can I afford this?"</h4>
                <p className="text-gray-600 text-sm">Start with what you can afford. IUL premiums are flexible and can increase as your business grows.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"What if my startup fails? Will I lose my insurance?"</h4>
                <p className="text-gray-600 text-sm">No! Your IUL policy is separate from your business. It's your personal safety net that stays with you.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"Can I use this for business funding?"</h4>
                <p className="text-gray-600 text-sm">Yes! You can borrow against your cash value tax-free for business opportunities or emergencies.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">"How is this different from term life insurance?"</h4>
                <p className="text-gray-600 text-sm">Term insurance only protects. IUL protects AND builds wealth you can use while alive.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section 
        className="py-16 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Startup Insurance vs Traditional Options... What's the difference?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-green-600 text-white">
                  <th className="border border-gray-300 px-6 py-4 text-left">Feature</th>
                  <th className="border border-gray-300 px-6 py-4 text-center">Traditional Insurance</th>
                  <th className="border border-gray-300 px-6 py-4 text-center bg-green-700">Startup Legacy Life</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Cash Value Access</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Limited</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-green-600 font-semibold">✓ Business Funding</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Premium Flexibility</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Fixed</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-green-600 font-semibold">✓ Adjustable</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Growth Potential</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">Low</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-green-600 font-semibold">✓ Market-Linked</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-6 py-4 font-semibold">Startup-Specific Benefits</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-gray-600">None</td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-green-600 font-semibold">✓ Customized</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 bg-green-600 cursor-pointer hover:bg-green-700 transition-all duration-300"
        onClick={handleStartFunnel}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Secure Your Startup's Future?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who've already protected their families and built wealth through our startup-focused life insurance plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={(e) => { e.stopPropagation(); handleStartFunnel(); }}
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              <Zap className="h-5 w-5 mr-2" />
              Start My Application
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold rounded-lg border-2 border-white text-white hover:bg-white hover:text-green-600"
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
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                  <StartupLogo className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">Startup Legacy Life</span>
              </div>
              <p className="text-gray-400">
                Protecting entrepreneurs and building legacies since 2024.
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
            <p>&copy; 2024 Startup Legacy Life. All rights reserved.</p>
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
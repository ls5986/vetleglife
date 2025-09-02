'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBrandById, type Brand } from '@/config/brands';
import UniversalFunnel from '@/components/UniversalFunnel';
import ComprehensiveFunnel from '@/components/ComprehensiveFunnel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, Mail, Shield, Users, TrendingUp, CheckCircle, Star, Clock, Award, Heart, ChartLine } from 'lucide-react';
import Link from 'next/link';

export default function BrandLanding() {
  const params = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFunnel, setShowFunnel] = useState(false);
  const [showComprehensiveFunnel, setShowComprehensiveFunnel] = useState(false);

  useEffect(() => {
    if (params.brandId) {
      const brandData = getBrandById(params.brandId as string);
      if (brandData) {
        setBrand(brandData);
      }
      setLoading(false);
    }
  }, [params.brandId]);

  const handleFunnelComplete = (data: any) => {
    console.log('Funnel completed:', data);
    setShowFunnel(false);
  };

  const handleContactOnly = (data: any) => {
    console.log('Contact only selected:', data);
    if (data.step === 'full_application') {
      setShowFunnel(false);
      setShowComprehensiveFunnel(true);
    } else {
      setShowFunnel(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Brand Not Found</h1>
          <p className="text-gray-600 mb-6">The requested brand could not be found.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Special handling for veteran brand
  if (brand.id === 'veteran-legacy-life') {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <img src="/logo.png" alt="Veteran Legacy Life" className="h-15 w-auto mr-2" />
                <span className="text-2xl font-bold text-gray-900" style={{
                  fontSize: '1.7rem',
                  color: '#22304a',
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 8px rgba(30,58,138,0.07)',
                  fontStyle: 'oblique 10deg',
                  transform: 'skew(-4deg)',
                  display: 'inline-block'
                }}>
                  Veteran Legacy Life
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="tel:1-800-VET-INSURANCE" className="flex items-center text-gray-700 hover:text-gray-900">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="font-semibold">1-800-VET-INSURANCE</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <Star className="h-4 w-4 text-yellow-300" />
                <span className="text-sm font-medium">Trusted by 50,000+ Veterans Nationwide</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">
                Veterans & Active Service Members
              </h2>
              
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                You May Qualify for New Life Insurance Benefits in 2025
              </h1>
              
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                As a resident of your state, you are entitled to check your eligibility for exclusive life insurance benefits designed specifically for our nation's heroes.
              </p>
              
              <div className="mb-8">
                <Button 
                  onClick={() => setShowComprehensiveFunnel(true)}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-bold border-2 border-white"
                  style={{
                    animation: 'pulse-attention 2s ease-in-out infinite'
                  }}
                >
                  See If I Qualify →
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-6 text-blue-100">
                <Shield className="h-5 w-5 text-yellow-300" />
                <span>Your information is secure and protected</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full border border-white/20">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">No 2 year waiting period!</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full border border-white/20">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">No Medical Exam Needed!</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full border border-white/20">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Premiums never Increase!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Plans for Veterans, Active Service and Family Members
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Whole Life Insurance</h3>
                  <p className="text-gray-600 mb-6">Lifetime protection with guaranteed cash value and fixed premiums for your loved ones' security.</p>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Guaranteed death benefit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Cash value growth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Fixed premiums</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Living benefits included</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Term Insurance</h3>
                  <p className="text-gray-600 mb-6">Affordable coverage for a set period, with options to convert to permanent protection.</p>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Lower initial premiums</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Flexible term lengths</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Conversion options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Living benefits available</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="text-center border-0 shadow-lg">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChartLine className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Indexed Universal Life</h3>
                  <p className="text-gray-600 mb-6">Indexed Universal Life with market-linked growth and advanced living benefits.</p>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Market-linked growth</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Downside protection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Flexible premiums</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Advanced living benefits</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              The VA Option vs Our Options... What's the difference?
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 bg-blue-800 text-white p-4 font-semibold text-left">Comparison Criteria</th>
                    <th className="border border-gray-300 bg-blue-800 text-white p-4 font-semibold text-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Shield className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-sm font-bold">VALife</h3>
                      </div>
                    </th>
                    <th className="border border-gray-300 bg-blue-800 text-white p-4 font-semibold text-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-gray-300">
                          <img src="/logo.png" alt="Veteran Legacy Life" className="w-8 h-8" />
                        </div>
                        <h3 className="text-sm font-bold">Private Life Insurance for Veterans</h3>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Wait Period</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">Full coverage takes effect after 2 years</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">No wait period. Full coverage takes effect day one</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Premiums</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">Increasing (AND typically 30% More Expensive)</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">Rates never increase!</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Amount</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">$10,000 - $40,000</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">$2,000 - $60,000</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Ages</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">Age 18-80 with any level of service connected disability rating 0-100%</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">Age 18-89 with any level of service connected disability rating 0-100%</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Medical Exam</td>
                    <td className="border border-gray-300 bg-gray-50 p-4">
                      <span className="text-gray-600 font-medium">None</span>
                    </td>
                    <td className="border border-gray-300 bg-gray-50 p-4">
                      <span className="text-gray-600 font-medium">None</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Carriers</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">Only one option</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">Shop with 80+ A-Rated carriers</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Support</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">N/A</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">Open line of communication with an insurance specialist assigned to your account</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Types of Insurance</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">Whole Life</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">Whole Life, Term Life, IULs & Annuities</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 bg-gray-50 p-4 font-semibold">Who Can Apply?</td>
                    <td className="border border-gray-300 bg-red-50 p-4">
                      <span className="text-red-600 font-medium">Veterans Only</span>
                    </td>
                    <td className="border border-gray-300 bg-green-50 p-4">
                      <span className="text-green-600 font-medium">Veterans, Active Duty, Reserves, National Guard, Retired, and Family Members</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of veterans who trust Veteran Legacy Life for their life insurance needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowComprehensiveFunnel(true)}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-bold"
              >
                See If I Qualify
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => window.open('tel:1-800-VET-INSURANCE', '_self')}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 1-800-VET-INSURANCE
              </Button>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>✓ No obligation • ✓ Secure & private • ✓ Licensed agents</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Veteran Legacy Life</h3>
                <p className="text-gray-300">Exclusive life insurance benefits for veterans, active service members, and their families.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <p className="text-gray-300">Phone: 1-800-VET-INSURANCE</p>
                <p className="text-gray-300">Email: info@veteranlegacylife.com</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/" className="hover:text-white">Home</a></li>
                  <li><a href="/admin" className="hover:text-white">Admin Portal</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
              <p>© 2024 Veteran Legacy Life. All rights reserved.</p>
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

        <style jsx>{`
          @keyframes pulse-attention {
            0% {
              transform: scale(1);
              box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 6px 20px rgba(22, 163, 74, 0.5);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
            }
          }
        `}</style>
      </div>
    );
  }

  // Generic brand landing page for other brands
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto mr-2" />
              <span className="text-2xl font-bold text-gray-900">{brand.brandName}</span>
            </Link>
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
        className="py-16 cursor-pointer hover:opacity-95 transition-all duration-300" 
        style={{ background: `linear-gradient(135deg, ${brand.primaryColor} 0%, ${brand.secondaryColor} 100%)` }}
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto text-white">
            <h1 className="text-5xl font-bold mb-6">{brand.brandName}</h1>
            <p className="text-xl mb-8">{brand.sellingPoint}</p>
            <p className="text-lg mb-8 opacity-90">{brand.tagline}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={(e) => { e.stopPropagation(); setShowFunnel(true); }}
                size="lg"
                className="px-8 py-4 text-lg"
                style={{ backgroundColor: brand.primaryColor }}
              >
                Get Your Quote Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => window.open(`tel:${brand.phone}`, '_self')}
              >
                <Phone className="h-5 w-5 mr-2" />
                Call {brand.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div 
        className="py-16 bg-white cursor-pointer hover:bg-gray-50 transition-all duration-300"
        onClick={() => setShowComprehensiveFunnel(true)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose {brand.brandName}?</h2>
            <p className="text-lg text-gray-600">Tailored specifically for {brand.targetDemographic.toLowerCase()}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: brand.primaryColor }} />
                <h3 className="text-xl font-semibold mb-2">Specialized Coverage</h3>
                <p className="text-gray-600">Policies designed specifically for {brand.targetDemographic.toLowerCase()}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 mx-auto mb-4" style={{ color: brand.primaryColor }} />
                <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
                <p className="text-gray-600">Best-in-class pricing for your demographic</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 mx-auto mb-4" style={{ color: brand.primaryColor }} />
                <h3 className="text-xl font-semibold mb-2">Fast Approval</h3>
                <p className="text-gray-600">Quick application process with same-day decisions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Universal Funnel Modal */}
      {showFunnel && brand && (
        <UniversalFunnel
          brand={brand}
          onComplete={handleFunnelComplete}
          onContactOnly={handleContactOnly}
        />
      )}
    </div>
  );
} 
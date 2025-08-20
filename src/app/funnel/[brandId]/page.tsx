'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBrandById, type Brand } from '@/config/brands';
import UniversalFunnel from '@/components/UniversalFunnel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Phone, Mail, Shield, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function BrandFunnel() {
  const params = useParams();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFunnel, setShowFunnel] = useState(false);

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
    // You can add success handling here
  };

  const handleContactOnly = (data: any) => {
    console.log('Contact only selected:', data);
    setShowFunnel(false);
    // You can add contact form handling here
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Brands
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900" style={{ color: brand.primaryColor }}>
                  {brand.brandName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">{brand.tagline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href={`mailto:${brand.email}`} className="text-gray-500 hover:text-gray-700">
                <Mail className="h-5 w-5" />
              </a>
              <a href={`tel:${brand.phone}`} className="text-gray-500 hover:text-gray-700">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Brand Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2" style={{ color: brand.primaryColor }} />
                  About {brand.brandName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{brand.sellingPoint}</p>
                <Badge variant="secondary">{brand.targetDemographic}</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2" style={{ color: brand.primaryColor }} />
                  Perfect For
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{brand.sellingPoint}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2" style={{ color: brand.primaryColor }} />
                  Why Choose Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Licensed agents with expertise in your demographic
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Competitive rates and flexible payment options
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    Fast approval process
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    24/7 customer support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - CTA */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Get Your Personalized Quote</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  Start your journey to financial security today. Get a personalized quote in minutes.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowFunnel(true)}
                    className="w-full py-3"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    Start Application
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full py-3"
                    onClick={() => window.open(`tel:${brand.phone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now: {brand.phone}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full py-3"
                    onClick={() => window.open(`mailto:${brand.email}`, '_self')}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email: {brand.email}
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                  <p>✓ No obligation</p>
                  <p>✓ Secure & private</p>
                  <p>✓ Licensed agents</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-center">Coverage Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Term Life</h4>
                      <p className="text-sm text-gray-600">Affordable protection</p>
                    </div>
                    <Badge variant="outline">From $15/mo</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">IUL</h4>
                      <p className="text-sm text-gray-600">Wealth building</p>
                    </div>
                    <Badge variant="outline">From $100/mo</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">EOL</h4>
                      <p className="text-sm text-gray-600">Simplified underwriting</p>
                    </div>
                    <Badge variant="outline">From $50/mo</Badge>
                  </div>
                </div>
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
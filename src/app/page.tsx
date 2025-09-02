'use client';

import { useState } from 'react';
import { BRANDS, type Brand } from '@/config/brands';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Target, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function MultiBrandLanding() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemographic, setSelectedDemographic] = useState('all');

  const demographics = ['all', ...Array.from(new Set(BRANDS.map(brand => brand.targetDemographic.split(',')[0].trim())))];

  const filteredBrands = BRANDS.filter(brand => {
    const matchesSearch = brand.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.targetDemographic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDemographic = selectedDemographic === 'all' || 
                              brand.targetDemographic.includes(selectedDemographic);
    
    return matchesSearch && matchesDemographic;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Legacy Life Insurance</h1>
              <p className="mt-1 text-sm text-gray-500">
                Specialized life insurance solutions for every demographic
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <a href="mailto:admin@veteranlegacylife.com" className="text-gray-500 hover:text-gray-700">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+15551234567" className="text-gray-500 hover:text-gray-700">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Life Insurance Match
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've created specialized life insurance solutions tailored to your unique lifestyle, 
            career, and family situation. Choose the brand that speaks to your journey.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search brands, demographics, or taglines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedDemographic}
              onChange={(e) => setSelectedDemographic(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {demographics.map(demo => (
                <option key={demo} value={demo}>
                  {demo === 'all' ? 'All Demographics' : demo}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{BRANDS.length}</p>
                  <p className="text-sm text-gray-500">Specialized Brands</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">9+</p>
                  <p className="text-sm text-gray-500">Target Demographics</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Phone className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">24/7</p>
                  <p className="text-sm text-gray-500">Expert Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No brands found matching your search criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedDemographic('all');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Legacy Life Insurance</h3>
              <p className="text-gray-300">
                Specialized life insurance solutions for every demographic and lifestyle.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-300">Phone: (555) 123-4567</p>
              <p className="text-gray-300">Email: admin@veteranlegacylife.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Legacy Life Insurance. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/${brand.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {brand.brandName}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">{brand.tagline}</p>
          </div>
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: brand.primaryColor }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Badge variant="outline" className="text-xs">
            {brand.targetDemographic.split(',')[0].trim()}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {brand.sellingPoint}
        </p>
        
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-gray-500">
            <p>{brand.phone}</p>
            <p>{brand.email}</p>
          </div>
          
          <Button 
            className="group-hover:bg-blue-600 transition-colors"
            style={{ 
              backgroundColor: brand.primaryColor,
              borderColor: brand.primaryColor 
            }}
          >
            Get Quote
          </Button>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}

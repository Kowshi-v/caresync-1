import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Stethoscope, User, Shield, Lock, FileText, UserCheck, Heart, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: 'doctor' | 'patient') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient">
      {/* Header/Navigation */}
      <header className="bg-white border-b-2 border-red-100 shadow-sm sticky top-0 z-50 backdrop-blur-lg bg-white/80 animate-fadeIn">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart className="w-10 h-10 text-red-600 fill-red-600 animate-pulse-slow" />
                <div className="absolute inset-0 bg-red-600 blur-xl opacity-30 animate-pulse-slow"></div>
              </div>
              <div>
                <h1 className="text-red-900">Care Sync</h1>
                <p className="text-xs text-red-600">Your Health, Your Control</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-red-600 transition-colors duration-200">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-red-600 transition-colors duration-200">How It Works</a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fadeIn">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-2xl animate-scaleIn">
                <Shield className="w-14 h-14 text-white" />
              </div>
              <div className="absolute inset-0 bg-red-600 blur-2xl opacity-40 animate-pulse-slow rounded-full"></div>
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-red-600 via-red-700 to-red-600 bg-clip-text text-transparent animate-gradient" style={{ fontSize: '3.5rem', fontWeight: '700', lineHeight: '1.2' }}>
            Care Sync
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto mb-4" style={{ fontSize: '1.25rem', lineHeight: '1.8' }}>
            Secure, Blockchain-Powered Healthcare Records Management
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Take complete control of your medical records with our revolutionary platform. Share your health data securely with healthcare providers while maintaining absolute privacy and security.
          </p>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-24">
          <Card className="border-2 border-red-200 hover:border-red-500 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInFromLeft group overflow-hidden relative" onClick={() => onSelectRole('patient')}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-center text-red-900" style={{ fontSize: '1.75rem' }}>Patient Portal</CardTitle>
              <CardDescription className="text-center" style={{ fontSize: '1rem' }}>
                Take control of your medical records and manage access permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center group/item hover:translate-x-2 transition-transform duration-300">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">Upload & store medical records securely</span>
                </li>
                <li className="flex items-center group/item hover:translate-x-2 transition-transform duration-300">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors">
                    <Lock className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">Complete control over access permissions</span>
                </li>
                <li className="flex items-center group/item hover:translate-x-2 transition-transform duration-300">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors">
                    <UserCheck className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">Grant access to specific doctors or specialists</span>
                </li>
              </ul>
              <Button className="w-full h-12 hover:scale-105 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700" onClick={() => onSelectRole('patient')}>
                Continue as Patient →
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 hover:border-red-500 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer animate-slideInFromRight group overflow-hidden relative" onClick={() => onSelectRole('doctor')}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6 mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-center text-red-900" style={{ fontSize: '1.75rem' }}>Doctor Portal</CardTitle>
              <CardDescription className="text-center" style={{ fontSize: '1rem' }}>
                Access patient records with authorized permissions only
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
              <ul className="space-y-4 mb-8">
                <li className="flex items-center group/item hover:translate-x-2 transition-transform duration-300">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors">
                    <Shield className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">Secure, encrypted access to records</span>
                </li>
                <li className="flex items-center group/item hover:translate-x-2 transition-transform duration-300">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">View-only permissions (no downloads)</span>
                </li>
                <li className="flex items-center group/item hover:translate-x-2 transition-transform duration-300">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 group-hover/item:bg-red-200 transition-colors">
                    <UserCheck className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">Patient-authorized access only</span>
                </li>
              </ul>
              <Button className="w-full h-12 hover:scale-105 hover:shadow-lg transition-all duration-300 bg-white text-red-600 border-2 border-red-600 hover:bg-red-50" variant="outline" onClick={() => onSelectRole('doctor')}>
                Continue as Doctor →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Key Features Section */}
        <div id="features" className="max-w-6xl mx-auto mb-24 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-12">
            <h2 className="text-red-900 mb-4" style={{ fontSize: '2.5rem' }}>Why Choose Care Sync?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.1rem' }}>
              Experience healthcare data management with unparalleled security and control
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-red-100 hover:border-red-400 hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-red-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                </div>
                <h3 className="mb-3 text-red-900" style={{ fontSize: '1.5rem' }}>Complete Privacy</h3>
                <p className="text-gray-600" style={{ lineHeight: '1.7' }}>
                  Your medical records remain completely private and encrypted until you explicitly grant access to healthcare providers
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-100 hover:border-red-400 hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-red-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                </div>
                <h3 className="mb-3 text-red-900" style={{ fontSize: '1.5rem' }}>Blockchain Security</h3>
                <p className="text-gray-600" style={{ lineHeight: '1.7' }}>
                  Revolutionary blockchain technology ensures immutable, tamper-proof storage of all your medical records
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-100 hover:border-red-400 hover:shadow-2xl transition-all duration-500 group">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <UserCheck className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-red-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                </div>
                <h3 className="mb-3 text-red-900" style={{ fontSize: '1.5rem' }}>Granular Control</h3>
                <p className="text-gray-600" style={{ lineHeight: '1.7' }}>
                  Choose exactly which doctors, specialists, or healthcare facilities can access your medical records
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h2 className="text-red-900 mb-4" style={{ fontSize: '2.5rem' }}>How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.1rem' }}>
              Simple, secure, and seamless healthcare record management
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { number: '1', title: 'Create Account', desc: 'Sign up securely with Google authentication', icon: User },
              { number: '2', title: 'Upload Records', desc: 'Store your medical documents on blockchain', icon: FileText },
              { number: '3', title: 'Grant Access', desc: 'Choose who can view your records', icon: UserCheck },
              { number: '4', title: 'Stay Secure', desc: 'Monitor and control access anytime', icon: Shield }
            ].map((step, index) => (
              <div key={index} className="text-center animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative mb-6 inline-block">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                    {step.number}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-red-500 rounded-full flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-red-600" />
                  </div>
                </div>
                <h4 className="text-red-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="max-w-5xl mx-auto mb-24">
          <Card className="border-2 border-red-300 bg-gradient-to-br from-red-50 via-white to-red-100 hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 text-red-600 fill-red-600 mx-auto mb-6 animate-pulse-slow" />
              <h2 className="text-red-900 mb-4" style={{ fontSize: '2rem' }}>Ready to Take Control?</h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                Join thousands of patients and healthcare providers who trust Care Sync for secure medical record management
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  className="h-14 px-8 hover:scale-105 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-600 to-red-700" 
                  onClick={() => onSelectRole('patient')}
                  style={{ fontSize: '1.1rem' }}
                >
                  Get Started as Patient
                </Button>
                <Button 
                  className="h-14 px-8 hover:scale-105 hover:shadow-xl transition-all duration-300 bg-white text-red-600 border-2 border-red-600 hover:bg-red-50" 
                  variant="outline"
                  onClick={() => onSelectRole('doctor')}
                  style={{ fontSize: '1.1rem' }}
                >
                  Join as Doctor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-br from-red-900 to-red-800 text-white py-16 border-t-4 border-red-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-10 h-10 text-white fill-white" />
                <div>
                  <h3 className="text-white" style={{ fontSize: '1.75rem' }}>Care Sync</h3>
                  <p className="text-red-200 text-sm">Your Health, Your Control</p>
                </div>
              </div>
              <p className="text-red-100 mb-6" style={{ lineHeight: '1.7' }}>
                Care Sync is revolutionizing healthcare data management with blockchain technology, 
                giving patients complete control over their medical records while ensuring maximum 
                security and privacy.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-red-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-white mb-6" style={{ fontSize: '1.25rem' }}>Contact Us</h4>
              <div className="space-y-4">
                <a href="mailto:contact@caresync.health" className="flex items-start gap-3 text-red-100 hover:text-white transition-colors duration-200 group">
                  <Mail className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>contact@caresync.health</span>
                </a>
                <a href="tel:+1-800-CARE-SYNC" className="flex items-start gap-3 text-red-100 hover:text-white transition-colors duration-200 group">
                  <Phone className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span>+1 (800) CARE-SYNC</span>
                </a>
                <div className="flex items-start gap-3 text-red-100">
                  <MapPin className="w-5 h-5 mt-0.5" />
                  <span>123 Healthcare Ave<br />Medical District, CA 94123<br />United States</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-6" style={{ fontSize: '1.25rem' }}>Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-red-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Features</a></li>
                <li><a href="#how-it-works" className="text-red-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">How It Works</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Terms of Service</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">HIPAA Compliance</a></li>
                <li><a href="#" className="text-red-100 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block">Support</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="border-t border-red-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-red-200 text-sm">
                © {new Date().getFullYear()} Care Sync. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-red-200 text-sm">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  HIPAA Compliant
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  End-to-End Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

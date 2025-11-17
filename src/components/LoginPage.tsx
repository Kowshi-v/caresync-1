import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Mail } from 'lucide-react';

interface LoginPageProps {
  role: 'doctor' | 'patient';
  onBack: () => void;
  onRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ role, onBack, onRegister }) => {
  const [email, setEmail] = useState('');
  const { login, isLoading } = useAuth();

  const handleGoogleLogin = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    try {
      await login(email, role);
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials or register first.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scaleIn hover:shadow-xl transition-shadow duration-300 border-2 border-red-100">
        <CardHeader>
          <Button variant="ghost" className="w-fit mb-4 hover:bg-red-50 transition-colors" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center mb-4">
            <h1 className="text-red-900 mb-1" style={{ fontSize: '1.5rem' }}>Care Sync</h1>
            <p className="text-xs text-red-600">Your Health, Your Control</p>
          </div>
          <CardTitle className="text-red-900">
            {role === 'doctor' ? 'Doctor' : 'Patient'} Login
          </CardTitle>
          <CardDescription>
            Sign in to access your {role === 'doctor' ? 'doctor' : 'patient'} portal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleGoogleLogin()}
              />
            </div>
          </div>

          <Button
            className="w-full hover:scale-105 transition-transform duration-200"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              onClick={onRegister}
              className="text-red-600 hover:underline hover:text-red-700 transition-colors duration-200"
            >
              Register here
            </button>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4 animate-fadeIn">
            <p className="text-sm text-red-800">
              <strong>Demo Mode:</strong> This is a mock authentication. Enter any email and it will check against registered users. If not found, please register first.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft } from 'lucide-react';

interface RegisterPatientProps {
  onBack: () => void;
  onSuccess: () => void;
}

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const RegisterPatient: React.FC<RegisterPatientProps> = ({ onBack, onSuccess }) => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    bloodGroup: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.dateOfBirth) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await register({
        role: 'patient',
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        phone: formData.phone,
        address: formData.address,
        bloodGroup: formData.bloodGroup,
      });
      toast.success('Registration successful! Welcome to Care Sync.');
      onSuccess();
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl animate-scaleIn hover:shadow-xl transition-shadow duration-300 border-2 border-red-100">
        <CardHeader>
          <Button variant="ghost" className="w-fit mb-4 hover:bg-red-50 transition-colors" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center mb-4">
            <h1 className="text-red-900 mb-1" style={{ fontSize: '1.5rem' }}>Care Sync</h1>
            <p className="text-xs text-red-600">Your Health, Your Control</p>
          </div>
          <CardTitle className="text-red-900">Patient Registration</CardTitle>
          <CardDescription>
            Create your patient account to manage your medical records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="patient@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Enter your full address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-transform duration-200" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Register as Patient'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

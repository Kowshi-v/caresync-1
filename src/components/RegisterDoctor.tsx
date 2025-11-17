import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft } from 'lucide-react';

interface RegisterDoctorProps {
  onBack: () => void;
  onSuccess: () => void;
}

const specializations = [
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Radiology',
  'General Practice',
  'Surgery',
  'Oncology',
];

export const RegisterDoctor: React.FC<RegisterDoctorProps> = ({ onBack, onSuccess }) => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    licenseNumber: '',
    hospital: '',
    phone: '',
    experience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.specialization || !formData.licenseNumber) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await register({
        role: 'doctor',
        name: formData.name,
        email: formData.email,
        specialization: formData.specialization,
        licenseNumber: formData.licenseNumber,
        hospital: formData.hospital,
        phone: formData.phone,
        experience: parseInt(formData.experience) || 0,
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
          <CardTitle className="text-red-900">Doctor Registration</CardTitle>
          <CardDescription>
            Create your doctor account to access patient records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Dr. John Doe"
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
                  placeholder="doctor@hospital.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <Select
                  value={formData.specialization}
                  onValueChange={(value) => setFormData({ ...formData, specialization: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license">Medical License Number *</Label>
                <Input
                  id="license"
                  placeholder="MED-123456"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital/Clinic</Label>
                <Input
                  id="hospital"
                  placeholder="City General Hospital"
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
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
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="5"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>
            </div>

            <Button type="submit" className="w-full hover:scale-105 transition-transform duration-200" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Register as Doctor'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

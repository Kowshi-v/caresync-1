import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { MedicalRecord, Doctor } from '../types';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Shield, UserCheck, Stethoscope } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface AccessControlManagerProps {
  record: MedicalRecord;
  onBack: () => void;
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

export const AccessControlManager: React.FC<AccessControlManagerProps> = ({ record, onBack }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>(record.authorizedDoctors);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>(
    record.authorizedSpecializations
  );

  useEffect(() => {
    const allDoctors = JSON.parse(localStorage.getItem('doctors') || '[]');
    setDoctors(allDoctors);
  }, []);

  const handleDoctorToggle = (doctorId: string) => {
    setSelectedDoctors((prev) =>
      prev.includes(doctorId) ? prev.filter((id) => id !== doctorId) : [...prev, doctorId]
    );
  };

  const handleSpecializationToggle = (specialization: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization)
        ? prev.filter((s) => s !== specialization)
        : [...prev, specialization]
    );
  };

  const handleSave = () => {
    const allRecords = JSON.parse(localStorage.getItem('medicalRecords') || '[]');
    const updatedRecords = allRecords.map((r: MedicalRecord) =>
      r.id === record.id
        ? { ...r, authorizedDoctors: selectedDoctors, authorizedSpecializations: selectedSpecializations }
        : r
    );
    localStorage.setItem('medicalRecords', JSON.stringify(updatedRecords));
    toast.success('Access permissions updated successfully!');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient p-4">
      <div className="container mx-auto max-w-4xl py-8 animate-fadeIn">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <CardTitle>Manage Access Permissions</CardTitle>
                <CardDescription>
                  Control who can view your medical record: {record.fileName}
                </CardDescription>
              </div>
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Granular Access Control:</strong> You can grant access to specific doctors or to all doctors with a particular specialization. Doctors will only have view-only access - they cannot download, screenshot, or edit your records.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  <h3>Authorize Specific Doctors</h3>
                </div>
                {doctors.length === 0 ? (
                  <p className="text-gray-500 text-sm">No doctors registered yet</p>
                ) : (
                  <div className="space-y-3">
                    {doctors.map((doctor) => (
                      <Card key={doctor.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <Checkbox
                                id={doctor.id}
                                checked={selectedDoctors.includes(doctor.id)}
                                onCheckedChange={() => handleDoctorToggle(doctor.id)}
                              />
                              <div className="flex-1">
                                <label htmlFor={doctor.id} className="cursor-pointer">
                                  <p>{doctor.name}</p>
                                  <p className="text-sm text-gray-600">{doctor.email}</p>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <Badge variant="secondary">{doctor.specialization}</Badge>
                                    {doctor.hospital && (
                                      <Badge variant="outline">{doctor.hospital}</Badge>
                                    )}
                                    <Badge variant="outline">
                                      License: {doctor.licenseNumber}
                                    </Badge>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="w-5 h-5 text-indigo-600" />
                  <h3>Authorize by Specialization</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Grant access to all doctors with specific specializations
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {specializations.map((spec) => {
                    const doctorCount = doctors.filter((d) => d.specialization === spec).length;
                    return (
                      <Card key={spec} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                              <Checkbox
                                id={spec}
                                checked={selectedSpecializations.includes(spec)}
                                onCheckedChange={() => handleSpecializationToggle(spec)}
                              />
                              <label htmlFor={spec} className="cursor-pointer flex-1">
                                <p>{spec}</p>
                                <p className="text-sm text-gray-500">
                                  {doctorCount} doctor{doctorCount !== 1 ? 's' : ''} registered
                                </p>
                              </label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-green-800 mb-2">
                    <strong>Current Access Summary:</strong>
                  </p>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• {selectedDoctors.length} specific doctor{selectedDoctors.length !== 1 ? 's' : ''} authorized</li>
                    <li>• {selectedSpecializations.length} specialization{selectedSpecializations.length !== 1 ? 's' : ''} authorized</li>
                    <li>• Doctors can only VIEW this record (no download, screenshot, or edit)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1">
                Save Access Permissions
              </Button>
              <Button variant="outline" onClick={onBack}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

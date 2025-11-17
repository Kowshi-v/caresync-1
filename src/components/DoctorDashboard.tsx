import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../context/AuthContext';
import { MedicalRecord, Doctor, Patient } from '../types';
import { RecordViewer } from './RecordViewer';
import { FileText, LogOut, User, Stethoscope, Lock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const DoctorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [accessibleRecords, setAccessibleRecords] = useState<MedicalRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [patients, setPatients] = useState<{ [key: string]: Patient }>({});
  const doctor = user as Doctor;

  useEffect(() => {
    loadAccessibleRecords();
  }, [user]);

  const loadAccessibleRecords = () => {
    const allRecords = JSON.parse(localStorage.getItem('medicalRecords') || '[]');
    const allPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    
    // Create a patient lookup map
    const patientMap: { [key: string]: Patient } = {};
    allPatients.forEach((p: Patient) => {
      patientMap[p.id] = p;
    });
    setPatients(patientMap);

    // Filter records where doctor has access
    const accessible = allRecords.filter((record: MedicalRecord) => {
      const hasDirectAccess = record.authorizedDoctors.includes(user!.id);
      const hasSpecializationAccess = record.authorizedSpecializations.includes(doctor.specialization);
      return hasDirectAccess || hasSpecializationAccess;
    });

    setAccessibleRecords(accessible);
  };

  if (selectedRecord) {
    return (
      <RecordViewer
        record={selectedRecord}
        patient={patients[selectedRecord.patientId]}
        onBack={() => setSelectedRecord(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8 animate-fadeIn">
          <div>
            <h1 className="text-red-900 mb-2">Doctor Dashboard</h1>
            <p className="text-gray-600">Welcome back, Dr. {doctor.name}</p>
          </div>
          <Button variant="outline" onClick={logout} className="hover:scale-105 transition-transform duration-200">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="records">Accessible Records</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6 animate-fadeIn">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Patient Medical Records</CardTitle>
                <CardDescription>
                  Records you have been authorized to view
                </CardDescription>
              </CardHeader>
              <CardContent>
                {accessibleRecords.length === 0 ? (
                  <div className="text-center py-12">
                    <Lock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">No records available</p>
                    <p className="text-sm text-gray-400">
                      You don't have access to any patient records yet. Patients must grant you permission to view their records.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {accessibleRecords.map((record, index) => {
                      const patient = patients[record.patientId];
                      return (
                        <Card key={record.id} className="border-2 hover:border-red-300 hover:shadow-md transition-all duration-300 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <FileText className="w-5 h-5 text-red-600" />
                                  <h3>{record.fileName}</h3>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{record.description}</p>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge variant="outline">
                                    Patient: {patient?.name || 'Unknown'}
                                  </Badge>
                                  <Badge variant="secondary">
                                    {new Date(record.uploadDate).toLocaleDateString()}
                                  </Badge>
                                  {record.authorizedDoctors.includes(user!.id) && (
                                    <Badge className="bg-red-100 text-red-800">
                                      Direct Access
                                    </Badge>
                                  )}
                                  {record.authorizedSpecializations.includes(doctor.specialization) && (
                                    <Badge className="bg-red-200 text-red-900">
                                      Specialization Access
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                onClick={() => setSelectedRecord(record)}
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                View Record
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fadeIn">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Doctor Profile</CardTitle>
                <CardDescription>Your professional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300">
                    <Stethoscope className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3>Dr. {doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.email}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Specialization</p>
                    <p>{doctor.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">License Number</p>
                    <p>{doctor.licenseNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hospital/Clinic</p>
                    <p>{doctor.hospital || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p>{doctor.phone || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Years of Experience</p>
                    <p>{doctor.experience || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p>{new Date(doctor.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6 animate-fadeIn">
                  <p className="text-sm text-red-800">
                    <strong>Access Permissions:</strong> You can view medical records from patients who have specifically authorized you or authorized your specialization ({doctor.specialization}). All access is view-only.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

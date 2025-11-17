import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useAuth } from '../context/AuthContext';
import { MedicalRecord, Patient } from '../types';
import { MedicalRecordUpload } from './MedicalRecordUpload';
import { AccessControlManager } from './AccessControlManager';
import { FileText, Upload, Shield, LogOut, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const PatientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const patient = user as Patient;

  useEffect(() => {
    loadRecords();
  }, [user]);

  const loadRecords = () => {
    const allRecords = JSON.parse(localStorage.getItem('medicalRecords') || '[]');
    const myRecords = allRecords.filter((r: MedicalRecord) => r.patientId === user?.id);
    setRecords(myRecords);
  };

  const handleUploadSuccess = () => {
    loadRecords();
    setShowUpload(false);
  };

  const handleDeleteRecord = (recordId: string) => {
    const allRecords = JSON.parse(localStorage.getItem('medicalRecords') || '[]');
    const updatedRecords = allRecords.filter((r: MedicalRecord) => r.id !== recordId);
    localStorage.setItem('medicalRecords', JSON.stringify(updatedRecords));
    loadRecords();
  };

  if (showUpload) {
    return <MedicalRecordUpload onBack={() => setShowUpload(false)} onSuccess={handleUploadSuccess} />;
  }

  if (selectedRecord) {
    return (
      <AccessControlManager
        record={selectedRecord}
        onBack={() => {
          setSelectedRecord(null);
          loadRecords();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8 animate-fadeIn">
          <div>
            <h1 className="text-red-900 mb-2">Patient Dashboard</h1>
            <p className="text-gray-600">Welcome back, {patient.name}</p>
          </div>
          <Button variant="outline" onClick={logout} className="hover:scale-105 transition-transform duration-200">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="records">My Records</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6 animate-fadeIn">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>
                      Manage your medical records and control access permissions
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowUpload(true)} className="hover:scale-105 transition-transform duration-200">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Record
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {records.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No medical records uploaded yet</p>
                    <Button onClick={() => setShowUpload(true)}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Your First Record
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {records.map((record, index) => (
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
                                  {new Date(record.uploadDate).toLocaleDateString()}
                                </Badge>
                                <Badge variant="secondary">
                                  {record.authorizedDoctors.length} doctors authorized
                                </Badge>
                                <Badge variant="secondary">
                                  {record.authorizedSpecializations.length} specializations
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedRecord(record)}
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                <Shield className="w-4 h-4 mr-2" />
                                Manage Access
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  if (confirm('Are you sure you want to delete this record?')) {
                                    handleDeleteRecord(record.id);
                                  }
                                }}
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="animate-fadeIn">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors duration-300">
                    <User className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3>{patient.name}</h3>
                    <p className="text-sm text-gray-600">{patient.email}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p>{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Blood Group</p>
                    <p>{patient.bloodGroup || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p>{patient.phone || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p>{new Date(patient.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Address</p>
                    <p>{patient.address || 'Not specified'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

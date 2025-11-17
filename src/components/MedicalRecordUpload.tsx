import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useAuth } from '../context/AuthContext';
import { MedicalRecord } from '../types';
import { toast } from 'sonner@2.0.3';
import { ArrowLeft, Upload, FileText } from 'lucide-react';

interface MedicalRecordUploadProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const MedicalRecordUpload: React.FC<MedicalRecordUploadProps> = ({ onBack, onSuccess }) => {
  const { user } = useAuth();
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');
  const [fileData, setFileData] = useState<string>('');
  const [fileType, setFileType] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileType(file.type);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileName || !fileData) {
      toast.error('Please select a file to upload');
      return;
    }

    if (!description) {
      toast.error('Please provide a description');
      return;
    }

    const newRecord: MedicalRecord = {
      id: `record-${Date.now()}`,
      patientId: user!.id,
      fileName,
      fileType,
      uploadDate: new Date().toISOString(),
      description,
      fileData,
      authorizedDoctors: [],
      authorizedSpecializations: [],
    };

    const existingRecords = JSON.parse(localStorage.getItem('medicalRecords') || '[]');
    existingRecords.push(newRecord);
    localStorage.setItem('medicalRecords', JSON.stringify(existingRecords));

    toast.success('Medical record uploaded successfully!');
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient p-4">
      <div className="container mx-auto max-w-2xl py-8 animate-fadeIn">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Button variant="ghost" className="w-fit mb-4" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <CardTitle>Upload Medical Record</CardTitle>
            <CardDescription>
              Upload your medical documents securely. You can control who can access them later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">Medical Document *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 hover:scale-102 transition-all duration-300">
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    {fileName ? (
                      <div className="flex items-center justify-center gap-3 animate-fadeIn">
                        <FileText className="w-8 h-8 text-red-600 animate-pulse-slow" />
                        <div className="text-left">
                          <p className="text-gray-700">{fileName}</p>
                          <p className="text-sm text-gray-500">Click to change file</p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Click to upload medical record</p>
                        <p className="text-sm text-gray-500">
                          Supports: PDF, JPG, PNG, DOC, DOCX
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="E.g., Blood test results from January 2024, X-ray of right knee, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Privacy Notice:</strong> This record will be completely private and not visible to any doctor until you explicitly grant access. You can manage permissions from your dashboard.
                </p>
              </div>

              <Button type="submit" className="w-full hover:scale-105 transition-transform duration-200">
                <Upload className="w-4 h-4 mr-2" />
                Upload Medical Record
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

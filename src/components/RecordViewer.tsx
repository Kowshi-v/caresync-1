import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MedicalRecord, Patient } from '../types';
import { ArrowLeft, Shield, Eye, AlertTriangle } from 'lucide-react';
import { Badge } from './ui/badge';

interface RecordViewerProps {
  record: MedicalRecord;
  patient: Patient;
  onBack: () => void;
}

export const RecordViewer: React.FC<RecordViewerProps> = ({ record, patient, onBack }) => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable keyboard shortcuts for screenshots and downloads
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }
      
      // Prevent Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        return false;
      }
      
      // Prevent Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        return false;
      }
      
      // Prevent Ctrl+Shift+S (Save As)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isImageFile = record.fileType.startsWith('image/');
  const isPdfFile = record.fileType === 'application/pdf';

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient p-4">
      <div className="container mx-auto max-w-5xl py-8 animate-fadeIn">
        <Card className="border-2 border-red-100 hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <Button variant="ghost" className="w-fit mb-4 hover:bg-red-50 transition-colors" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-red-900">Medical Record Viewer</CardTitle>
                <CardDescription>
                  View-only access - Protected content
                </CardDescription>
              </div>
              <Shield className="w-8 h-8 text-red-600 animate-pulse-slow" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 mb-2">
                    <strong>View-Only Access:</strong>
                  </p>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Screenshots are disabled</li>
                    <li>• Download is disabled</li>
                    <li>• Printing is disabled</li>
                    <li>• Right-click is disabled</li>
                    <li>• This record cannot be edited or shared</li>
                  </ul>
                </div>
              </div>
            </div>

            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-2">Record Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2">
                        <span className="text-gray-600">File Name:</span>
                        <span>{record.fileName}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Description:</span>
                        <span>{record.description}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-gray-600">Upload Date:</span>
                        <span>{new Date(record.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Eye className="w-6 h-6 text-green-600" />
                </div>

                {patient && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="mb-2">Patient Information</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span> {patient.name}
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span> {patient.email}
                      </div>
                      <div>
                        <span className="text-gray-600">Date of Birth:</span>{' '}
                        {new Date(patient.dateOfBirth).toLocaleDateString()}
                      </div>
                      {patient.bloodGroup && (
                        <div>
                          <span className="text-gray-600">Blood Group:</span> {patient.bloodGroup}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Document Preview</CardTitle>
                  <Badge className="bg-green-100 text-green-800">View Only</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className="protected-content select-none"
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    pointerEvents: 'all',
                  }}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {isImageFile ? (
                    <div className="relative">
                      <img
                        src={record.fileData}
                        alt={record.fileName}
                        className="max-w-full h-auto rounded-lg border-2 border-gray-200"
                        style={{
                          pointerEvents: 'none',
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                        }}
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                      />
                      <div className="absolute inset-0 bg-transparent" style={{ zIndex: 1 }} />
                    </div>
                  ) : isPdfFile ? (
                    <div className="border-2 border-gray-200 rounded-lg p-8 bg-gray-50">
                      <iframe
                        src={record.fileData}
                        className="w-full h-[600px] rounded"
                        style={{
                          pointerEvents: 'none',
                          userSelect: 'none',
                        }}
                        title={record.fileName}
                      />
                      <div className="absolute inset-0 bg-transparent" style={{ zIndex: 1 }} />
                    </div>
                  ) : (
                    <div className="border-2 border-gray-200 rounded-lg p-12 bg-gray-50 text-center">
                      <p className="text-gray-600 mb-4">
                        This file type cannot be previewed directly.
                      </p>
                      <p className="text-sm text-gray-500">
                        File: {record.fileName} ({record.fileType})
                      </p>
                      <div className="mt-6 p-4 bg-white rounded border">
                        <p className="text-sm text-gray-700">
                          <strong>Note:</strong> This is a protected document. In a production environment with blockchain integration, this would be securely rendered while maintaining view-only restrictions.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 inline mr-2" />
                  This content is protected and cannot be downloaded, copied, or shared
                </div>
              </CardContent>
            </Card>

            <Button variant="outline" onClick={onBack} className="w-full">
              Close Viewer
            </Button>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .protected-content * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        
        @media print {
          body {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

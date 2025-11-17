export interface User {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'patient';
  createdAt: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  hospital: string;
  phone: string;
  experience: number;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  phone: string;
  address: string;
  bloodGroup: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  description: string;
  fileData: string; // Base64 encoded file data
  authorizedDoctors: string[]; // Array of doctor IDs
  authorizedSpecializations: string[]; // Array of specializations
}

export interface AccessRequest {
  id: string;
  doctorId: string;
  patientId: string;
  recordId: string;
  status: 'pending' | 'approved' | 'denied';
  requestDate: string;
}

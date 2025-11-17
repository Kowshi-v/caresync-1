import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { RegisterDoctor } from './components/RegisterDoctor';
import { RegisterPatient } from './components/RegisterPatient';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { Toaster } from './components/ui/sonner';

type Screen = 'landing' | 'login' | 'register';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient' | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return user.role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />;
  }

  const handleRoleSelect = (role: 'doctor' | 'patient') => {
    setSelectedRole(role);
    setCurrentScreen('login');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
    setSelectedRole(null);
  };

  const handleShowRegister = () => {
    setCurrentScreen('register');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const handleRegistrationSuccess = () => {
    // After successful registration, user will be logged in automatically
    // and the dashboard will be shown
  };

  if (currentScreen === 'landing') {
    return <LandingPage onSelectRole={handleRoleSelect} />;
  }

  if (currentScreen === 'login' && selectedRole) {
    return (
      <LoginPage
        role={selectedRole}
        onBack={handleBackToLanding}
        onRegister={handleShowRegister}
      />
    );
  }

  if (currentScreen === 'register' && selectedRole) {
    return selectedRole === 'doctor' ? (
      <RegisterDoctor onBack={handleBackToLogin} onSuccess={handleRegistrationSuccess} />
    ) : (
      <RegisterPatient onBack={handleBackToLogin} onSuccess={handleRegistrationSuccess} />
    );
  }

  return <LandingPage onSelectRole={handleRoleSelect} />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
};

export default App;

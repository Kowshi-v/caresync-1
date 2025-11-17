import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Doctor, Patient } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, role: 'doctor' | 'patient') => Promise<void>;
  logout: () => void;
  register: (userData: Partial<Doctor | Patient>) => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, role: 'doctor' | 'patient') => {
    // Simulate Google Auth login
    setIsLoading(true);
    
    // Check if user exists in localStorage
    const usersKey = role === 'doctor' ? 'doctors' : 'patients';
    const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
    const foundUser = users.find((u: User) => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      throw new Error('User not found. Please register first.');
    }
    
    setIsLoading(false);
  };

  const register = async (userData: Partial<Doctor | Patient>) => {
    setIsLoading(true);
    
    const newUser = {
      ...userData,
      id: `${userData.role}-${Date.now()}`,
      createdAt: new Date().toISOString(),
    } as User;

    const usersKey = userData.role === 'doctor' ? 'doctors' : 'patients';
    const users = JSON.parse(localStorage.getItem(usersKey) || '[]');
    users.push(newUser);
    localStorage.setItem(usersKey, JSON.stringify(users));

    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

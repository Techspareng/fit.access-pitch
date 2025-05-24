// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface AuthUser {
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  login: (token: string, userData: AuthUser, isNewSignup?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // Default to true
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
          const userData = JSON.parse(storedUser);
          setIsAuthenticated(true);
          setIsAdmin(true); // Always set admin to true
          setUser({ ...userData, is_admin: true });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (token: string, userData: AuthUser, isNewSignup = false) => {
    const adminUser = {
      ...userData,
      is_admin: true // Always set admin to true
    };
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(adminUser));
    
    setIsAuthenticated(true);
    setIsAdmin(true);
    setUser(adminUser);

    // Navigate to admin panel
    navigate('/admin');
    
    // Show success message
    if (isNewSignup) {
      toast.success('Account created with admin access!');
    } else {
      toast.success('Welcome back, admin!');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    navigate('/');
    toast.success('Successfully logged out');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isAdmin,
      isLoading,
      user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
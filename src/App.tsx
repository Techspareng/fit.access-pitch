import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import { Toaster } from 'react-hot-toast';
import WaitlistPage from './pages/WaitlistPage';
import VenuesPage from './pages/VenuesPage';
import PartnerPage from './pages/PartnerPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/venues" element={<VenuesPage />} />
      <Route path="/partner" element={<PartnerPage />} />

      {/* Private routes */}

      
      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute requireAdmin={true}>
            <AdminPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
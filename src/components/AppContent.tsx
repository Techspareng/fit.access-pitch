import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NavigationProvider } from '../context/NavigationContext';
import Navbar from './Layout/Navbar';
import Home from '../pages/Home';
import WaitlistPage from '../pages/WaitlistPage';
import VenuesPage from '../pages/VenuesPage';

const AppContent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Navbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <NavigationProvider>
        <div className="min-h-screen flex flex-col">
          <main className={`flex-grow ${isMobileMenuOpen ? 'blur-sm' : ''}`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/waitlist" element={<WaitlistPage />} />
              <Route path="/venues" element={<VenuesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </NavigationProvider>
    </>
  );
};

export default AppContent;
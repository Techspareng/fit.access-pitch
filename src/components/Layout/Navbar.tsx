import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="text-white font-bold text-xl"
            >
              FitAccess
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-white hover:text-gray-300">How It Works</a>
            <a href="#venues" className="text-white hover:text-gray-300">Venues</a>
            <a href="#pricing" className="text-white hover:text-gray-300">Pricing</a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/waitlist')}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium"
            >
              Join Waitlist
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-indigo-600`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#how-it-works" className="block px-3 py-2 text-white">How It Works</a>
          <a href="#venues" className="block px-3 py-2 text-white">Venues</a>
          <a href="#pricing" className="block px-3 py-2 text-white">Pricing</a>
          <button
            onClick={() => navigate('/waitlist')}
            className="block w-full text-left px-3 py-2 text-white"
          >
            Join Waitlist
          </button>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
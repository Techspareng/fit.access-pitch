import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; path: string; }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  const { scrollToSection } = useNavigation();

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="lg:hidden fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={`/#${item.path}`}
              className="block text-lg text-gray-800 hover:text-brand-500 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.path);
                onClose();
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-6 border-t border-gray-100">
            <Link
              to="/get-started"
              className="block w-full py-3 px-4 text-center text-white bg-brand-500 rounded-lg hover:bg-brand-600 transition-colors"
              onClick={onClose}
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
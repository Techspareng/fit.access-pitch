import React from 'react';
import { motion } from 'framer-motion';
import LogoutButton from './LogoutButton';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      className={`${isOpen ? 'block' : 'hidden'} lg:hidden fixed inset-0 z-50`}
    >
      <div className="bg-black/20 backdrop-blur-xl h-full p-6">
        {/* ...existing menu items... */}
        
        <div className="absolute bottom-6 left-6 right-6">
          <LogoutButton />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
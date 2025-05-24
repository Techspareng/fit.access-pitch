import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Layout/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
       <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                 {/* Logo */}
                <div className="flex-shrink-0">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleNavigation('/')}
                                className="cursor-pointer"
                              >
                              <a href="/" className="text-white text-4xl p-4 hover:text-gray-300">Fit.access</a>
                              </motion.div>
                            </div>
     
                 {/* Desktop Navigation */}
                 <div className="hidden md:flex items-center space-x-8">
                   <a href="/" className="text-white hover:text-gray-300">How It Works</a>
                   <a href="/" className="text-white hover:text-gray-300">Venues</a>
                   <a href="/" className="text-white hover:text-gray-300">Pricing</a>
                   <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => handleNavigation('/waitlist')}
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
                 <a href="/" className="block px-3 py-2 text-white">How It Works</a>
                 <a href="/" className="block px-3 py-2 text-white">Venues</a>
                 <a href="/" className="block px-3 py-2 text-white">Pricing</a>
                 <button
                   onClick={() => handleNavigation('/waitlist')}
                   className="block w-full text-left px-3 py-2 text-white"
                 >
                   Join Waitlist
                 </button>
               </div>
             </motion.div>
           </nav>
      <main className="pt-24 pb-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-12"
        >
          {/* About Section */}
          <motion.section variants={itemVariants} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">About FitAccess</h1>
            <p className="text-white/90 mb-4">
              FitAccess is revolutionizing the way people access fitness facilities. Our platform connects fitness enthusiasts with a network of gyms, pools, and sports venues, offering flexible access to quality facilities across your city.
            </p>
            <p className="text-white/90">
              Founded in 2024, we're committed to making fitness more accessible and convenient for everyone.
            </p>
          </motion.section>

          {/* Privacy Section */}
          <motion.section variants={itemVariants} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Privacy Policy</h2>
            <div className="space-y-4 text-white/90">
              <p>At FitAccess, we take your privacy seriously. Here's how we handle your data:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We only collect information necessary for service provision</li>
                <li>Your data is encrypted and securely stored</li>
                <li>We never share your personal information with third parties without consent</li>
                <li>You can request data deletion at any time</li>
              </ul>
            </div>
          </motion.section>

          {/* Terms Section */}
          <motion.section variants={itemVariants} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Terms of Service</h2>
            <div className="space-y-4 text-white/90">
              <p>By using FitAccess, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Follow facility rules and guidelines</li>
                <li>Maintain accurate account information</li>
                <li>Use the service responsibly and safely</li>
                <li>Respect cancellation and booking policies</li>
              </ul>
            </div>
          </motion.section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
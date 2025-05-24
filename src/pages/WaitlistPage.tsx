import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { useNavigate } from 'react-router-dom';
import { addToWaitlist } from '../api/waitlistService';
import { toast } from 'react-hot-toast';

const WaitlistPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update phone validation to accept 11 digits
      const phoneRegex = /^\d{11}$/;
      if (!phoneRegex.test(formData.phone)) {
        throw new Error('Please enter a valid 11-digit phone number');
      }

      const response = await addToWaitlist({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim()
      });

      console.log('Waitlist response:', response);
      
      toast.success('Successfully joined the waitlist!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: ''
      });
    } catch (error: any) {
      console.error('Waitlist submission error:', error);
      toast.error(error.message || 'Failed to join waitlist');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "rgba(255,255,255,0.5)" }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-brand-600">
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
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
      </div>

      <main className="flex-grow relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            className="max-w-lg mx-auto text-center"
          >
            <motion.h1 
              className="text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join the Future of Fitness 🚀
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Get early access to premium fitness venues across your city
              with one flexible membership.
            </motion.p>

            <motion.form 
              onSubmit={handleSubmit}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20"
            >
              <div className="space-y-6">
                <motion.div
                  whileTap="focus"
                  variants={inputVariants}
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={formData.name}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 transition-all"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </motion.div>
                <motion.div
                  whileTap="focus"
                  variants={inputVariants}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={formData.email}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 transition-all"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </motion.div>
                <motion.div
                  whileTap="focus"
                  variants={inputVariants}
                >
                  <input
                    type="tel" // Change from "number" to "tel" for better mobile input
                    placeholder="Phone Number (11 digits)"
                    required
                    value={formData.phone}
                    pattern="\d{11}"
                    title="Please enter a valid 11-digit phone number"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 transition-all"
                    onChange={(e) => {
                      // Only allow numbers and limit to 11 digits
                      const value = e.target.value.replace(/\D/g, '').slice(0, 11);
                      setFormData({ ...formData, phone: value });
                    }}
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full bg-white text-indigo-600 py-4 rounded-xl font-bold text-lg transition-all
                    ${isSubmitting ? 'opacity-75 cursor-wait' : 'hover:bg-opacity-95'}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : 'Join Waitlist'}
                </motion.button>
              </div>
            </motion.form>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
              {[
                { icon: '🎯', text: 'Priority Access' },
                { icon: '💎', text: 'Exclusive Perks' },
                { icon: '🎁', text: 'Early Bird Pricing' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-white/90 text-sm">{feature.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaitlistPage;
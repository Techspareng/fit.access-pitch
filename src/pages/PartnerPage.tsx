import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { toast } from 'react-hot-toast';
import type { VenueRegistration } from '../types/venueTypes';
import SuccessModal from '../components/SuccessModal';
import { Link } from 'react-router-dom';

// Define VenueType to match backend choices
type VenueTypeOption = 'GYM' | 'POOL' | 'STUDIO' | 'FIELD' | 'OTHER';

const PartnerPage: React.FC = () => {
  useEffect(() => {
    console.log('PartnerPage mounted'); // Add debugging
  }, []);

  const [formData, setFormData] = useState({
    venueName: '',
    name: '',
    description: '',
    email: '',
    phone: '',
    venueType: '' as VenueTypeOption, // Add type assertion here
    location: '',
    address: '',
    city: '',
    website: '',
    facilities: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const facilities = [
    'Gym Equipment',
    'Swimming Pool',
    'Tennis Court',
    'Basketball Court',
    'Yoga Studio',
    'Spa',
    'Changing Rooms',
    'Parking'
  ];

  const handleFacilityToggle = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    console.log('Current form data:', formData); // Debug log

    // Required fields validation
    if (!formData.name?.trim()) {
      newErrors.name = 'Contact name is required';
    }

    if (!formData.venueName?.trim()) {
      newErrors.venueName = 'Venue name is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.venueType) {
      newErrors.venueType = 'Venue type is required';
    }

    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }

    console.log('Validation errors:', newErrors); // Debug log
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      console.log('Form validation failed', errors);
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Format data exactly as the Django model expects it
      const requestData = {
        name: formData.name.trim(),
        venueName: formData.venueName.trim(),
        description: formData.description.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        venueType: formData.venueType,
        location: formData.location.trim(),
        // Only include optional fields if they have values
        ...(formData.address?.trim() && { address: formData.address.trim() }),
        ...(formData.city?.trim() && { city: formData.city.trim() }),
        ...(formData.website?.trim() && { website: formData.website.trim() }),
        facilities: formData.facilities
      };

      console.log('Sending request data:', requestData); // Debug log

      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api'}/venues/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      // Log the raw response
      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 400) {
          // Validation error
          const errorMessage = responseData.detail || Object.values(responseData).flat().join(', ');
          throw new Error(`Validation error: ${errorMessage}`);
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(responseData.detail || 'Failed to register venue');
        }
      }

      toast.success('Successfully registered your venue!');
      setShowSuccessModal(true);
      
      // Reset form
      setFormData({
        name: '',
        venueName: '',
        description: '',
        email: '',
        phone: '',
        venueType: '' as VenueTypeOption,
        location: '',
        address: '',
        city: '',
        website: '',
        facilities: []
      });

    } catch (error: any) {
      console.error('Registration error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      toast.error(error.message || 'Failed to register venue');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900">
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
                            <Link to="/" className="text-white hover:text-gray-300">How It Works</Link>
                            <Link to="/" className="text-white hover:text-gray-300">Venues</Link>
                            <Link to="/" className="text-white hover:text-gray-300">Pricing</Link>
                            <Link to="/about" className="text-white hover:text-gray-300">
                                 About Us
                              </Link>
                              <Link to="/contact" className="text-white hover:text-gray-300">
                                 Contact Us
                                 </Link>
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
                          <Link to="/" className="block px-3 py-2 text-white">How It Works</Link>
                          <Link to="/" className="block px-3 py-2 text-white">Venues</Link>
                          <Link to="/" className="block px-3 py-2 text-white">Pricing</Link>
                             <Link to="/about" className="block px-3 py-2 text-white">
                             About Us
                             </Link>
                             <Link to="/contact" className="block px-3 py-2 text-white">
                             Contact Us
                             </Link>
                          <button
                            onClick={() => handleNavigation('/waitlist')}
                            className="block w-full text-left px-3 py-2 text-white"
                          >
                            Join Waitlist
                          </button>
                        </div>
                      </motion.div>
                    </nav>

      <main className="flex-grow pt-24 pb-20 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center text-white mb-12">
            <h1 className="text-5xl font-bold mb-6">Partner with FitAccess</h1>
            <p className="text-xl text-indigo-200">
              Join Nigeria's largest fitness venue network and increase your revenue
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              {
                icon: '💰',
                title: 'Boost Revenue',
                description: 'Fill empty slots and increase facility utilization'
              },
              {
                icon: '👥',
                title: 'New Customers',
                description: 'Access our growing network of fitness enthusiasts'
              },
              {
                icon: '📱',
                title: 'Smart Management',
                description: 'Easy-to-use dashboard for bookings and analytics'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-white"
              >
                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-indigo-200">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-8 shadow-2xl border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-white mb-2 text-sm sm:text-base">Venue Name</label>
                <input
                  type="text"
                  required
                  value={formData.venueName}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                />
                {errors.venueName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.venueName}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2 text-sm sm:text-base">Description</label>
                <textarea
                  required
                  value={formData.description}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  rows={4}
                  placeholder="Tell us about your venue..."
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                {errors.description && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.description}</p>}
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Contact Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-white mb-2 text-sm sm:text-base">Venue Type</label>
                <select
                  required
                  value={formData.venueType}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, venueType: e.target.value as VenueTypeOption })}
                >
                  <option value="">Select type</option>
                  <option value="GYM">Gym</option>
                  <option value="POOL">Swimming Pool</option>
                  <option value="STUDIO">Fitness Studio</option>
                  <option value="FIELD">Sports Field</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.venueType && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.venueType}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2 text-sm sm:text-base">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                {errors.location && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.location}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2 text-sm sm:text-base">Address</label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                {errors.address && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2 text-sm sm:text-base">City</label>
                <input
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                {errors.city && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-white mb-2 text-sm sm:text-base">
                  Website <span className="text-indigo-300 text-xs sm:text-sm">(Optional)</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/25 text-sm sm:text-base"
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  value={formData.website}
                />
                {errors.website && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.website}</p>}
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-white mb-4 text-sm sm:text-base">Facilities</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                  {facilities.map((facility) => (
                    <motion.button
                      key={facility}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFacilityToggle(facility)}
                      className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm transition-colors ${
                        formData.facilities.includes(facility)
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {facility}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full mt-6 sm:mt-8 bg-indigo-500 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg transition-all
                ${isSubmitting ? 'opacity-75 cursor-wait' : 'hover:bg-indigo-600'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Join FitAccess Network'}
            </motion.button>
          </motion.form>
        </motion.div>
      </main>

      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => {
          setShowSuccessModal(false);
          navigate('/');
        }} 
      />

      <Footer />
    </div>
  );
};

export default PartnerPage;
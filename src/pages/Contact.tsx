import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaTwitter, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Layout/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  const contactInfo = {
    address: "Off Constitution Ave, Central Business District, Abuja 900103, Federal Capital Territory  ",
    whatsapp: "+234 9056957089",
    instagram: "@fit.access_ng",
    twitter: "@fit.access_ng",
    tiktok: "@fit.access_ng"
  };

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <FaInstagram className="w-6 h-6" />,
      href: 'https://instagram.com/fit.access_ng',
      username: contactInfo.instagram
    },
    {
      name: 'Twitter',
      icon: <FaTwitter className="w-6 h-6" />,
      href: 'https://twitter.com/fit.access_ng',
      username: contactInfo.twitter
    },
    {
      name: 'TikTok',
      icon: <FaTiktok className="w-6 h-6" />,
      href: 'https://tiktok.com/@fit.access_ng',
      username: contactInfo.tiktok
    }
  ];
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
      <main className="pt-24 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">Contact Us</h1>
            
            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6 mb-8"
            >
              <div className="flex items-start space-x-4 text-white">
                <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                  <p className="text-white/80">{contactInfo.address}</p>
                </div>
              </div>
            </motion.div>

            {/* WhatsApp Contact */}
            <motion.a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-4 bg-green-500/10 hover:bg-green-500/20 transition-colors rounded-xl p-6 mb-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaWhatsapp className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold text-white text-lg">WhatsApp Us</h3>
                <p className="text-white/80">{contactInfo.whatsapp}</p>
              </div>
            </motion.a>

            {/* Social Media Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {social.icon}
                  <div>
                    <p className="text-white font-medium">{social.name}</p>
                    <p className="text-white/60 text-sm">{social.username}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
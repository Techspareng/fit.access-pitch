import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
const Home: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'subscription' | 'flexpass'>('subscription');
  const [activeStep, setActiveStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Configure intersection observer with consistent settings
  const observerOptions = {
    triggerOnce: true,
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px' // Adjust root margin to trigger slightly earlier
  };

  const [heroRef, heroInView] = useInView(observerOptions);
  const [problemRef, problemInView] = useInView(observerOptions);
  const [solutionRef, solutionInView] = useInView(observerOptions);
  const [howItWorksRef, howItWorksInView] = useInView(observerOptions);
  const [flexPassRef, flexPassInView] = useInView(observerOptions);
  const [venuesRef, venuesInView] = useInView(observerOptions);
  const [socialProofRef, socialProofInView] = useInView(observerOptions);
  const [pricingRef, pricingInView] = useInView(observerOptions);
  const [investorsRef, investorsInView] = useInView(observerOptions);

  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    {
      quote: "I saved ₦40k last month by switching from 3 gym memberships to FlexFit!",
      author: "Tunde",
      role: "Entrepreneur",
      image: "/testimonials/tunde.jpeg"
    },
    {
      quote: "FlexFit fills our off-peak slots – it's a win-win.",
      author: "Lagos City Gym",
      role: "Partner Venue",
      image: "/testimonials/gym.avif"
    }
  ];

  const userContent = [
    { id: 1, image: '/ugc/gymabu.jpg', username: '@fitness_lover' },
    { id: 2, image: '/ugc/swim.jpeg', username: '@swim_daily' },
    { id: 3, image: '/ugc/teniss.jpg', username: '@tennis_pro' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % userContent.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [userContent.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const mockupVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  };

  const steps = [
    {
      title: 'Choose Your Plan',
      description: 'Subscribe monthly or buy Flex Credits (e.g., 5 credits = ₦15,000).',
      icon: '🎯',
      color: 'from-purple-500 to-indigo-500',
      mockupBg: 'from-purple-900 to-indigo-900',
      decoration: '⭐'
    },
    {
      title: 'Book Instantly',
      description: 'Use the app to find real-time availability.',
      icon: '📱',
      color: 'from-blue-500 to-cyan-500',
      mockupBg: 'from-blue-900 to-cyan-900',
      decoration: '🌙'
    },
    {
      title: 'Check In & Go',
      description: 'Scan your QR code at the venue.',
      icon: '✨',
      color: 'from-emerald-500 to-teal-500',
      mockupBg: 'from-emerald-900 to-teal-900',
      decoration: '💫'
    }
  ];

  const features = [
    {
      icon: '⚡',
      title: 'Pay As You Go',
      description: 'Only pay for the sessions you use'
    },
    {
      icon: '🎯',
      title: 'No Expiry',
      description: 'Credits never expire, use them anytime'
    },
    {
      icon: '🤝',
      title: 'Share Credits',
      description: 'Split credits with friends or family'
    }
  ];

  const pricingTiers = [
    { credits: 5, price: 15000, savings: '0%' },
    { credits: 10, price: 28000, savings: '7%' },
    { credits: 20, price: 50000, savings: '17%' }
  ];

  const partners = [
    { id: 1, name: 'Premium Gym', type: 'Gym', image: '/testimonials/download.jpeg' },
    { id: 2, name: 'Luxury Spa', type: 'Spa', image: '/testimonials/spa.jpeg' },
    { id: 3, name: 'Tennis Club', type: 'Courts', image: '/testimonials/tennis.jpeg' },
    { id: 4, name: 'Olympic Pool', type: 'Pool', image: '/testimonials/pool.jpeg' },
  ];

  const partnerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const plans = [
    {
      type: 'Subscription',
      price: billingCycle === 'monthly' ? '₦25k-₦80k/mo' : '₦240k-₦768k/yr',
      venues: '100+',
      contract: 'None',
      features: [
        'Unlimited access',
        'Book 7 days in advance',
        'Bring guests (premium)',
        'Cancel anytime'
      ]
    },
    {
      type: 'Flex Pass',
      price: '₦3k/session',
      venues: '100+',
      contract: 'None',
      features: [
        'Pay as you go',
        'No expiry',
        'Share credits',
        'Mix & match venues'
      ]
    },
    {
      type: 'Traditional Gym',
      price: '₦20k-₦70k/mo',
      venues: '1',
      contract: '6-12 months',
      features: [
        'Single location',
        'Limited hours',
        'Long contract',
        'No flexibility'
      ],
      highlighted: false
    }
  ];

  const metrics = [
    {
      icon: '📈',
      value: '$1.2B',
      label: 'Nigerian fitness industry by 2025',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '💸',
      value: '70/30',
      label: 'Revenue split: Subscriptions/Flex Credits',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '🤝',
      value: '20+',
      label: 'Venue partners onboarded in Abuja pilot',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };
  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    partners: [
      { name: 'Become a Partner', href: '/partners' },
      { name: 'Partner Login', href: '/partner-login' },
    ],
  };
  return (
    <div className="relative w-full">
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
              <a href="#how-it-works" className="text-white hover:text-gray-300">How It Works</a>
              <a href="#venues" className="text-white hover:text-gray-300">Venues</a>
              <a href="#pricing" className="text-white hover:text-gray-300">Pricing</a>
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
            <a href="#how-it-works" className="block px-3 py-2 text-white">How It Works</a>
            <a href="#venues" className="block px-3 py-2 text-white">Venues</a>
            <a href="#pricing" className="block px-3 py-2 text-white">Pricing</a>
            <button
              onClick={() => handleNavigation('/waitlist')}
              className="block w-full text-left px-3 py-2 text-white"
            >
              Join Waitlist
            </button>
          </div>
        </motion.div>
      </nav>

      <main className={`${isMobileMenuOpen ? 'blur-sm' : ''}`}>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          id="hero"
          className="min-h-screen flex items-center relative overflow-hidden bg-indigo-600 py-16 md:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-12 md:gap-16 items-center"
            >
              <motion.div className="text-white space-y-6 md:space-y-8 text-center lg:text-left w-full order-1 lg:order-none">
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                >
                  Access Multiple Gyms <br />with One Subscription
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-lg sm:text-xl text-white/90 max-w-xl mx-auto lg:mx-0"
                >
                  One subscription. Multiple gyms. Ultimate flexibility.
                  Pay as you go or subscribe monthly.
                </motion.p>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.button
                    onClick={() => navigate('/waitlist')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-white hover:bg-brand-600 hover:text-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-center"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/#venues')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-indigo-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-center"
                  >
                    View Venues
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div 
                  variants={itemVariants}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-white/10"
                >
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">100+</div>
                    <div className="text-sm sm:text-base text-white/80">Venues</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">5k+</div>
                    <div className="text-sm sm:text-base text-white/80">Users</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <div className="text-2xl sm:text-3xl font-bold text-white">₦3k</div>
                    <div className="text-sm sm:text-base text-white/80">Per Session</div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* App Preview */}
              <motion.div
                variants={itemVariants}
                className="relative w-full max-w-[300px] mx-auto lg:mx-0 order-2 lg:order-none mt-8 lg:mt-0"
              >
                <div className="relative w-full aspect-[300/600]">
                  <div className="absolute inset-0 bg-black rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl">
                    <div className="h-full w-full bg-gradient-to-br from-brand-500 to-brand-600 p-4">
                      <div className="h-full w-full rounded-2xl sm:rounded-3xl bg-white overflow-hidden">
                        {/* App Mockup Content */}
                        <div className="relative h-full w-full">
                          {/* Status Bar */}
                          <div className="h-6 bg-gray-100 flex items-center justify-between px-4">
                            <span className="text-xs">9:41</span>
                            <div className="flex items-center space-x-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                              </svg>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                              </svg>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                              </svg>
                            </div>
                          </div>

                          {/* App Content */}
                          <div className="relative h-[calc(100%-24px)] overflow-hidden">
                            <img
                              src="/home.jpeg" // Add your mockup image here
                              alt="FitAccess App"
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 p-4 flex flex-col justify-end">
                              <h3 className="text-white text-lg font-bold mb-2">
                                Book Your Next Workout
                              </h3>
                              <p className="text-white/80 text-sm">
                                100+ venues at your fingertips
                              </p>
                              
                              {/* Booking Button */}
                              <button className="mt-4 bg-white text-indigo-600 py-2 px-4 rounded-lg text-sm font-semibold">
                                Find Venues
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Existing Floating elements */}
                <motion.div
                  variants={{
                    ...itemVariants,
                    visible: {
                      ...itemVariants.visible,
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  className="hidden md:block absolute top-20 -right-8 bg-white p-4 rounded-lg shadow-lg z-10"
                >
                  <span className="text-2xl">🏊‍♂️</span>
                  <p className="font-bold">Swimming</p>
                </motion.div>
                
                <motion.div
                  variants={{
                    ...itemVariants,
                    visible: {
                      ...itemVariants.visible,
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                      transition: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  className="hidden md:block absolute bottom-20 -left-8 bg-white p-4 rounded-lg shadow-lg z-10"
                >
                  <span className="text-2xl">🏋️‍♀️</span>
                  <p className="font-bold">Gym</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
          {/* Problem Section */}
      <section id="problem" className="py-20 bg-gray-50" ref={problemRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={problemInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-gray-900 mb-8"
            >
              Why Limit Yourself to One Gym?
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Problems */}
              <motion.div 
                variants={containerVariants}
                className="space-y-8"
              >
                {[
                  {
                    emoji: "🚫",
                    text: "Paying for multiple memberships is expensive (₦20k–₦70k per gym!).",
                  },
                  {
                    emoji: "🚫",
                    text: "No flexibility – locked into contracts even when you travel.",
                  },
                  {
                    emoji: "🏃‍♂️",
                    text: "Limited Access – Single-facility memberships restrict your workout options and locations",
                  },
                ].map((problem, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4 text-left bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <span className="text-2xl">{problem.emoji}</span>
                    <p className="text-lg text-gray-700">{problem.text}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Right side - Visual */}
              <motion.div
                variants={itemVariants}
                className="relative h-[400px]"
              >
                <motion.div
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    {/* Multiple Cards Stack */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-64 h-40 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl shadow-xl"
                          style={{
                            transform: `rotate(${i * 5}deg) translateY(${i * -10}px)`,
                          }}
                        />
                      ))}
                      {/* Single App Interface Card */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute top-0 left-0 w-64 h-40 bg-white rounded-xl shadow-2xl flex items-center justify-center"
                      >
                        <span className="text-2xl">📱 One App</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 bg-white" ref={solutionRef}>
        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={solutionInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            variants={cardVariants}
          >
            All-Access Fitness, Simplified
          </motion.h2>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <motion.div 
              className="bg-gray-100 p-1 rounded-xl inline-flex"
              variants={cardVariants}
            >
              {['subscription', 'flexpass'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab as 'subscription' | 'flexpass')}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    activeTab === tab 
                      ? 'bg-white text-black shadow-md' 
                      : 'bg-indigo-50 text-gray-600 hover:text-black'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab === 'subscription' ? 'Subscription' : 'Flex Pass'}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Content Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className={`p-8 rounded-2xl ${
                activeTab === 'subscription' 
                  ? 'bg-gradient-to-br from-teal-500 to-teal-600' 
                  : 'bg-gray-100'
              }`}
              variants={cardVariants}
              animate={{
                scale: activeTab === 'subscription' ? 1 : 0.95,
                opacity: activeTab === 'subscription' ? 1 : 0.7
              }}
            >
              <div className="text-center">
                <span className="text-4xl">♾️</span>
                <h3 className="text-2xl font-bold mt-4 mb-2 text-white">
                  Unlimited Monthly Access
                </h3>
                <p className="text-teal-100 mb-6">100+ venues</p>
                <div className="bg-white/10 p-4 rounded-lg text-white">
                  <p className="font-medium">Best for:</p>
                  <ul className="mt-2 space-y-2">
                    <li>✓ Daily gym-goers</li>
                    <li>✓ Corporate employees</li>
                    <li>✓ Fitness enthusiasts</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`p-8 rounded-2xl ${
                activeTab === 'flexpass' 
                  ? 'bg-gradient-to-br from-orange-500 to-orange-600' 
                  : 'bg-gray-100'
              }`}
              variants={cardVariants}
              animate={{
                scale: activeTab === 'flexpass' ? 1 : 0.95,
                opacity: activeTab === 'flexpass' ? 1 : 0.7
              }}
            >
              <div className="text-center">
                <span className="text-4xl">💳</span>
                <h3 className="text-2xl font-bold mt-4 mb-2 text-white">
                  Pay-as-You-Go with Flex Credits
                </h3>
                <p className="text-orange-100 mb-6">1 credit = 1 session</p>
                <div className="bg-white/10 p-4 rounded-lg text-white">
                  <p className="font-medium">Best for:</p>
                  <ul className="mt-2 space-y-2">
                    <li>✓ Travelers</li>
                    <li>✓ Casual users</li>
                    <li>✓ Weekend warriors</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id='how-it-works' className="py-32 bg-indigo-600 relative overflow-hidden" ref={howItWorksRef}>
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            className="space-y-20"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                <span className="px-6 py-2 bg-white text-indigo-600 rounded-full text-brand-400 text-sm font-medium">
                  How It Works
                </span>
              </motion.div>
              <h2 className="text-5xl font-bold text-white">
                Your Fitness Journey in
                <span className="text-indigo-200"> 3 Simple Steps</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Steps */}
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    className={`relative group ${activeStep === index ? 'z-10' : 'z-0'}`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300 blur`}
                    />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setActiveStep(index)}
                      className={`relative flex items-center space-x-6 p-8 rounded-2xl cursor-pointer
                        ${activeStep === index 
                          ? 'bg-white/15 backdrop-blur-lg shadow-xl' 
                          : 'bg-white/5 hover:bg-white/10'}`}
                    >
                      <motion.div
                        variants={floatingVariants}
                        initial="initial"
                        animate="animate"
                        className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 
                          to-brand-600 flex items-center justify-center text-3xl"
                      >
                        {step.icon}
                      </motion.div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                      {activeStep === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full bg-brand-400"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Phone Mockup */}
              <div className="relative">
  <motion.div
    variants={floatingVariants}
    initial="initial"
    animate="animate"
    className="relative h-[600px] max-w-[300px] mx-auto"
  >
    <div className="absolute inset-0 bg-black rounded-[3rem] overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`h-full w-full bg-gradient-to-br ${steps[activeStep].mockupBg} p-6`}
        >
          <div className="h-full w-full rounded-2xl bg-white/10 backdrop-blur-xl overflow-hidden">
            {/* Add the image inside the mockup */}
            <div className="relative h-full w-full">
              <img
                src="/price.jpeg" // Add the image URL dynamically from steps
                alt=""
                className="w-full h-full object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 p-6 flex flex-col justify-end">
                <h4 className="text-2xl font-bold text-white mb-4">{steps[activeStep].title}</h4>
                <p className="text-white/80 text-sm">{steps[activeStep].description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  </motion.div>

  {/* Decorative Elements */}
  <motion.div
    animate={{
      rotate: [0, 360],
      scale: [1, 1.2, 1]
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear"
    }}
    className="absolute -top-10 -right-10 text-6xl opacity-25"
  >
    {steps[activeStep].decoration}
  </motion.div>
</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flex Pass Section */}
      <section id='flex-pass' ref={flexPassRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={flexPassInView ? "visible" : "hidden"}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Flex Pass Benefits</h2>
            <p className="text-xl text-gray-600 mb-12">Freedom to workout your way</p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-8 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Pricing Tiers */}
            <motion.div 
              variants={itemVariants}
              className="bg-indigo-600 rounded-2xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-8">Flexible Pricing</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {pricingTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white/10 p-6 rounded-xl backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <h4 className="text-3xl font-bold mb-2">{tier.credits}</h4>
                      <p className="text-orange-200 mb-4">Credits</p>
                      <div className="text-2xl font-semibold mb-2">
                        ₦{tier.price.toLocaleString()}
                      </div>
                      {tier.savings !== '0%' && (
                        <div className="bg-white/20 rounded-full px-3 py-1 text-sm inline-block">
                          Save {tier.savings}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
  variants={itemVariants}
  onClick={() => navigate('/waitlist')}
  className="mt-12 bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-colors"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Get Started with Flex Pass
</motion.button>
          </motion.div>
        </div>
      </section>

      {/* Venue Partners Section */}
      <section id='venues' className="py-20 bg-gray-50" ref={venuesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={venuesInView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold mb-6"
            >
              Your Fitness Playground
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-12"
            >
              From premium gyms to hidden local gems
            </motion.p>

            {/* Partners Grid */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={containerVariants}
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold">{partner.name}</h3>
                        <p className="text-sm text-gray-300">{partner.type}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Partner CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-16 p-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Own a Fitness Venue?</h3>
              <p className="mb-6">Join our network and reach more customers</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/partner')}
                className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
              >
                Become a Partner <span className="text-xl">→</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white" ref={socialProofRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={socialProofInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Abuja Loves Us
          </h2>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={containerVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 p-8 rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.author}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>

          {/* User Content Carousel */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={userContent[currentSlide].image}
                  alt="User generated content"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white">{userContent[currentSlide].username}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {userContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white w-4' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id='pricing' className="py-20 bg-gray-50" ref={pricingRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={pricingInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Pick Your Freedom</h2>
            
            {/* Billing Cycle Toggle */}
            <div className="inline-flex items-center bg-white p-1 rounded-lg shadow-sm mb-8">
              {['monthly', 'annual'].map((cycle) => (
                <motion.button
                  key={cycle}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setBillingCycle(cycle as 'monthly' | 'annual')}
                  className={`px-8 py-2 mx-4 rounded-md transition-colors ${
                    billingCycle === cycle
                      ? 'bg-indigo-500 text-white'
                      : 'bg-indigo-500 text-white hover:text-white'
                  }`}
                >
                  {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.type}
                variants={containerVariants}
                whileHover={{ scale: 1.03 }}
                className={`bg-white p-8 rounded-2xl shadow-lg ${
                  plan.type === 'Flex Pass' ? 'border-2 border-indigo-500' : ''
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-4">{plan.type}</h3>
                  <p className="text-3xl font-bold text-indigo-600 mb-2">
                    {plan.price}
                  </p>
                  <p className="text-gray-600 mb-4">{plan.venues} venues</p>
                  <p className="text-sm text-gray-500">
                    {plan.contract === 'None' ? 'No contract' : plan.contract}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-orange-500">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold ${
                    plan.type === 'Traditional Gym'
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-600'
                  }`}
                >
                  {plan.type === 'Traditional Gym' 
                    ? 'Compare Savings'
                    : 'Start Free Trial'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Investors Section */}
      <section id='investors' className="py-20 bg-indigo-600 text-white" ref={investorsRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={investorsInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              Joining the Fitness Revolution
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Be part of Nigeria's fastest-growing fitness access platform
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${metric.color} rounded-2xl p-8`}
              >
                <span className="text-4xl mb-4 block">{metric.icon}</span>
                <h3 className="text-3xl font-bold mb-2">{metric.value}</h3>
                <p className="text-sm opacity-90">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg inline-flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              Download Investor Deck
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
        <footer className="bg-white text-indigo-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand Section */}
                <div className="space-y-6">
                  <Link to="/" className="flex items-center">
                    <img
                      src="/logo-white.svg"
                      alt="FitAccess"
                      className="h-10 w-auto"
                    />
                  </Link>
                  <p className="text-gray-400">Your city. Your fitness. All-access.</p>
                  
                  {/* App Store Badges */}
                  <div className="flex space-x-4">
                    <a href="#" className="block w-32">
                      <img
                        src="/app-store-badge.png"
                        alt="Download on App Store"
                        className="h-10 w-auto"
                      />
                    </a>
                    <a href="#" className="block w-32">
                      <img
                        src="/google-play-badge.png"
                        alt="Get it on Google Play"
                        className="h-10 w-auto"
                      />
                    </a>
                  </div>
                </div>
      
                {/* Links Sections */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <ul className="space-y-2">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-orange-500 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
      
                <div>
                  <h3 className="text-lg font-semibold mb-4">Legal</h3>
                  <ul className="space-y-2">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-orange-500 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
      
                <div>
                  <h3 className="text-lg font-semibold mb-4">Partners</h3>
                  <ul className="space-y-2">
                    {footerLinks.partners.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-gray-400 hover:text-orange-500 transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
      
              {/* Bottom Section */}
              <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} FitAccess. All rights reserved.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-gray-400 hover:text-orange-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-orange-500">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
      </main>
    </div>
  );
};

export default Home;
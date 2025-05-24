import React from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onNavigate: (path: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-indigo-600 py-16 md:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat pattern-grid" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:grid lg:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* Text Content - Full width on mobile */}
          <motion.div className="text-white space-y-6 md:space-y-8 text-center lg:text-left w-full order-1 lg:order-none">
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            >
              Your City's Fitness
              <span className="text-white block sm:inline"> All Access Pass</span>
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
                onClick={() => onNavigate('/waitlist')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white hover:bg-brand-600 hover:text-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-center"
              >
                Get Started
              </motion.button>
              <motion.button
                onClick={() => onNavigate('/venues')}
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

          {/* App Preview - Below on mobile, right side on desktop */}
          <motion.div
            variants={itemVariants}
            className="relative w-full max-w-[300px] mx-auto lg:mx-0 order-2 lg:order-none mt-8 lg:mt-0"
          >
            <div className="relative w-full aspect-[300/600]">
              <div className="absolute inset-0 bg-black rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="h-full w-full bg-gradient-to-br from-brand-500 to-brand-600 p-4">
                  <div className="h-full w-full rounded-2xl sm:rounded-3xl bg-white">
                    {/* App content mockup would go here */}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements - Adjusted positioning for better mobile display */}
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
  );
};

export default HeroSection;
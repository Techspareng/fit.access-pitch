import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
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

  return (
    <section className="py-32 bg-indigo-600 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
                      <div className="h-full w-full rounded-2xl bg-white/10 backdrop-blur-xl p-6 
                        flex flex-col items-center justify-center text-white">
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="text-6xl mb-8"
                        >
                          {steps[activeStep].icon}
                        </motion.span>
                        <h4 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h4>
                        <p className="text-center text-white/80">{steps[activeStep].description}</p>
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
  );
};

export default HowItWorksSection;
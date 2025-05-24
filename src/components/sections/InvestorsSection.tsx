import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InvestorsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-indigo-600 text-white" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
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
  );
};

export default InvestorsSection;
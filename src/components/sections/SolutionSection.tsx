import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SolutionSection = () => {
  const [activeTab, setActiveTab] = useState<'subscription' | 'flexpass'>('subscription');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
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

  return (
    <section className="py-20 bg-white" ref={ref}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
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
  );
};

export default SolutionSection;
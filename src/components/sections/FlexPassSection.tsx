import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FlexPassSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
            className="mt-12 bg-indigo-600 text-white hover:bg-indigo-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started with Flex Pass
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div>
      {/* Other sections/components */}
      <FlexPassSection />
      {/* Other sections/components */}
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
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
  );
};

export default PricingSection;
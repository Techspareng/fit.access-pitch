import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VenuePartnersSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const partners = [
    // Add your partner data here
    { id: 1, name: 'Premium Gym', type: 'Gym', image: '/testimonials/download.jpeg' },
    { id: 2, name: 'Luxury Spa', type: 'Spa', image: '/testimonials/spa.jpeg' },
    { id: 3, name: 'Tennis Club', type: 'Courts', image: '/testimonials/tennis.jpeg' },
    { id: 4, name: 'Olympic Pool', type: 'Pool', image: '/testimonials/pool.jpeg' },
    // Add more partners...
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
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
              className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              Become a Partner <span className="text-xl">→</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VenuePartnersSection;
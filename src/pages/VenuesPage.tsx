import React from 'react';
import { motion } from 'framer-motion';

const VenuesPage = () => {
  const venues = [
    { id: 1, name: 'Premium Gym', type: 'Gym', image: '/images/venues/gym.jpg' },
    { id: 2, name: 'Luxury Spa', type: 'Spa', image: '/images/venues/spa.jpg' },
    // Add more venues
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Available Venues
            </h1>
            <p className="text-xl text-gray-600">
              Explore our network of premium fitness facilities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {venue.name}
                  </h3>
                  <p className="text-gray-600">{venue.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VenuesPage;
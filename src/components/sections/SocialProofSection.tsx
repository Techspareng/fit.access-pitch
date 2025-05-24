import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SocialProofSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
    // Add more user-generated content
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % userContent.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [userContent.length]);

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
    <section className="py-20 bg-white" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
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
  );
};

export default SocialProofSection;
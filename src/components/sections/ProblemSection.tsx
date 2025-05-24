import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProblemSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
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
  );
};

export default ProblemSection;
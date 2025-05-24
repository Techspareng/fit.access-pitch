import React from 'react';
import { motion } from 'framer-motion';
import { useNavigation } from '../../context/NavigationContext';


const NavigationDots: React.FC = () => {
  const { scrollToSection } = useNavigation();
  
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'problem', label: 'Problem' },
    { id: 'solution', label: 'Solution' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'flex-pass', label: 'Flex Pass' },
    { id: 'venues', label: 'Venues' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'investors', label: 'Investors' }
  ];

  return (
    <div className="flex flex-col gap-4">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          whileHover={{ scale: 1.2 }}
          className="w-3 h-3 rounded-full bg-indigo-800 hover:bg-white transition-colors"
        />
      ))}
    </div>
  );
};

export default NavigationDots;
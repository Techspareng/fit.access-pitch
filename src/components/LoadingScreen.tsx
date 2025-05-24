import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedFitnessIcons from './AnimatedFitnessIcons';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const navigate = useNavigate();
  const letters = 'FITACCESS'.split('');
  const [isLoading, setIsLoading] = useState(true);
  const [letterAnimations, setLetterAnimations] = useState(
    letters.map(() => ({ opacity: 0, translateY: 50, rotate: -15 }))
  );

  useEffect(() => {
    let mounted = true;

    // Animate letters sequentially
    letters.forEach((_, index) => {
      setTimeout(() => {
        if (mounted) {
          setLetterAnimations(prev => {
            const newAnimations = [...prev];
            newAnimations[index] = { opacity: 1, translateY: 0, rotate: 0 };
            return newAnimations;
          });
        }
      }, index * 150); // Slightly slower animation
    });

    // Navigate after animation
    const timer = setTimeout(() => {
      if (mounted) {
        setIsLoading(false);
        navigate('/home');
      }
    }, 4000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="loading-container">
      <AnimatedFitnessIcons />
      <div className="w-full max-w-md px-4 relative z-10">
        <div className="letter-container mb-8">
          {letters.map((letter, index) => (
            <div
              key={index}
              className="letter"
              style={{
                animationDelay: `${index * 0.15}s`,
                opacity: letterAnimations[index].opacity,
                transform: `translateY(${letterAnimations[index].translateY}px) rotate(${letterAnimations[index].rotate}deg)`,
              }}
            >
              {letter}
            </div>
          ))}
        </div>
        <div 
          className="subtitle text-gray-600"
          style={{
            opacity: letterAnimations[letters.length - 1].opacity,
            transform: `translateY(${letterAnimations[letters.length - 1].translateY * 0.4}px)`,
            transition: 'all 0.5s ease-out',
          }}
        >
          Your All-Access Fitness Pass
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
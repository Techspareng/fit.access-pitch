import React from 'react';
import { COLORS } from '../constants/colors';

const FitnessEquipmentIllustrations = () => {
  const equipment = [
    // Dumbbell (top left)
    {
      type: 'path',
      d: `M20 15 h5 v-2 h15 v2 h5 v10 h-5 v2 h-15 v-2 h-5 v-10
         M25 15 v10 M45 15 v10
         M30 13 h10`,
      stroke: COLORS.primaryDark,
      fill: 'none',
      strokeWidth: 2,
      transform: 'translate(-10, -5) scale(0.8)',
    },
    // Add other equipment SVG paths here
  ];

  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {equipment.map((item, index) => (
          <path
            key={`equipment-${index}`}
            d={item.d}
            stroke={item.stroke}
            fill={item.fill}
            strokeWidth={item.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            transform={item.transform}
            opacity={0.6}
          />
        ))}
      </svg>
    </div>
  );
};

export default FitnessEquipmentIllustrations;
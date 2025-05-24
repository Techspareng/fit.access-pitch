import React from 'react';
import { COLORS } from '../constants/colors';
import { SvgElement } from '../types/svg.types';

const AbstractFitnessElements = () => {
  const elements: SvgElement[] = [
    // ...your elements array as defined in the original code...
  ];

  return (
    <div className="absolute inset-0 w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {elements.map((element, index) => {
          const key = `element-${index}`;
          const commonProps = {
            key,
            opacity: element.opacity,
            transform: element.transform,
          };

          switch (element.type) {
            case 'path':
              return (
                <path
                  {...commonProps}
                  d={element.d}
                  stroke={element.stroke}
                  fill={element.fill}
                  strokeWidth={element.strokeWidth}
                  strokeDasharray={element.strokeDasharray}
                />
              );
            case 'circle':
              return (
                <circle
                  {...commonProps}
                  cx={element.cx}
                  cy={element.cy}
                  r={element.r}
                  fill={element.fill}
                />
              );
            case 'rect':
              return (
                <rect
                  {...commonProps}
                  x={element.x}
                  y={element.y}
                  width={element.width}
                  height={element.height}
                  rx={element.rx}
                  fill={element.fill}
                />
              );
            default:
              return null;
          }
        })}
      </svg>
    </div>
  );
};

export default AbstractFitnessElements;
import React from 'react';

const AnimatedFitnessIcons: React.FC = () => {
  const fitnessElements = [
    {
      path: "M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z",
      className: "animate-float-1 top-20 left-20"
    },
    {
      path: "M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z",
      className: "animate-float-2 top-1/3 right-1/4"
    },
    {
      path: "M12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm9 17.3l-5-2.1v-3.8l3.1-3.1c.2-.2.2-.5 0-.7L16 10.4l-2.4 2.4c-.2.2-.5.3-.8.3h-1.6c-.3 0-.6-.1-.8-.3L8 10.4l-3.1 3.1c-.2.2-.2.5 0 .7l3.1 3.1v3.8l-5 2.1V22h19v-.7z",
      className: "animate-float-3 bottom-1/4 left-1/3"
    },
    {
      path: "M15 5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.5c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v12c0 .55.45 1 1 1s1-.45 1-1v-12h2v12c0 .55.45 1 1 1s1-.45 1-1v-12h2v12c0 .55.45 1 1 1s1-.45 1-1v-12h2v12c0 .55.45 1 1 1s1-.45 1-1v-12z",
      className: "animate-float-4 top-1/4 left-1/4"
    }
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {fitnessElements.map((element, index) => (
        <svg
          key={index}
          className={`absolute ${element.className} w-12 h-12 text-indigo-500/20`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d={element.path} />
        </svg>
      ))}
    </div>
  );
};

export default AnimatedFitnessIcons;
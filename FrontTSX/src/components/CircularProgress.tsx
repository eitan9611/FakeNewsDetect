import React from 'react';

interface CircularProgressProps {
  percentage: number;
  label: string;
  size?: 'normal' | 'lg';
}

export default function CircularProgress({ 
  percentage, 
  label, 
  size = 'normal' 
}: CircularProgressProps) {
  const radius = size === 'lg' ? 58 : 48;
  const strokeWidth = size === 'lg' ? 8 : 6;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;
  
  const getColor = (value: number) => {
    if (value < 30) return '#10B981'; // green
    if (value < 70) return '#FBBF24'; // yellow
    return '#EF4444'; // red
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          className="transform -rotate-90"
          width={size === 'lg' ? '140' : '120'}
          height={size === 'lg' ? '140' : '120'}
        >
          <circle
            className="text-gray-200 dark:text-gray-700"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size === 'lg' ? '70' : '60'}
            cy={size === 'lg' ? '70' : '60'}
          />
          <circle
            className="transition-all duration-1000 ease-out"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            stroke={getColor(percentage)}
            fill="transparent"
            r={radius}
            cx={size === 'lg' ? '70' : '60'}
            cy={size === 'lg' ? '70' : '60'}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: progress,
            }}
          />
        </svg>
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: size === 'lg' ? '1.5rem' : '1.25rem' }}
        >
          <span className="font-bold text-gray-700 dark:text-gray-300">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <span className={`mt-2 text-center font-medium text-gray-600 dark:text-gray-400 ${
        size === 'lg' ? 'text-lg' : 'text-sm'
      }`}>
        {label}
      </span>
    </div>
  );
}
import React from 'react';

interface WeightIconProps {
  weight: number;
  maxWeight: number;
  color: string;
}

export const WeightIcon: React.FC<WeightIconProps> = ({ weight, maxWeight, color }) => {
  const size = Math.max(30, Math.min(100, (weight / maxWeight) * 100));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5 4.5L19.5 5.5M3.5 4.5L4.5 5.5M12 8.5V12.5L14 14.5M12 3.5C7.02944 3.5 3 7.52944 3 12.5C3 17.4706 7.02944 21.5 12 21.5C16.9706 21.5 21 17.4706 21 12.5C21 7.52944 16.9706 3.5 12 3.5ZM12 6.5C9.51472 6.5 7.5 8.51472 7.5 11C7.5 13.4853 9.51472 15.5 12 15.5C14.4853 15.5 16.5 13.4853 16.5 11C16.5 8.51472 14.4853 6.5 12 6.5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

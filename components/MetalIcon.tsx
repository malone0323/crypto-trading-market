import React from 'react';

interface MetalIconProps {
  metal: 'Silver' | 'Gold' | 'Platinum' | 'Palladium';
  className?: string;
}

export const MetalIcon: React.FC<MetalIconProps> = ({ metal, className = '' }) => {
  const colors = {
    Silver: '#C0C0C0',
    Gold: '#FFD700',
    Platinum: '#E5E4E2',
    Palladium: '#CED0DD',
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="6" width="20" height="12" rx="2" fill={colors[metal]} />
      <rect x="4" y="8" width="16" height="8" rx="1" fill={colors[metal]} stroke="#000" strokeWidth="0.5" />
      <text x="12" y="14" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#000">
        {metal[0]}
      </text>
    </svg>
  );
};

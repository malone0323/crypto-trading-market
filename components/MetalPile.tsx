import React from 'react';
import { motion } from 'framer-motion';

interface MetalPieceProps {
  color: string;
  size: 'small' | 'medium' | 'large';
  count: number;
  maxCount: number;
}

const MetalPiece: React.FC<MetalPieceProps> = ({ color, size, count, maxCount }) => {
  const scale = 0.5 + (count / maxCount) * 0.8;
  const pieces = Array.from({ length: Math.min(count, 10) }, (_, i) => i);

  const getShape = () => {
    switch (size) {
      case 'small':
        return (
          <circle
            cx="25"
            cy="25"
            r="20"
            fill={`url(#${color}-gradient)`}
            stroke={color}
            strokeWidth="2"
          />
        );
      case 'medium':
        return (
          <rect
            x="5"
            y="15"
            width="40"
            height="20"
            fill={`url(#${color}-gradient)`}
            stroke={color}
            strokeWidth="2"
          />
        );
      case 'large':
        return (
          <rect
            x="5"
            y="10"
            width="40"
            height="30"
            fill={`url(#${color}-gradient)`}
            stroke={color}
            strokeWidth="2"
          />
        );
    }
  };

  return (
    <motion.div
      className="relative"
      style={{ height: `${scale * 120}px`, width: `${scale * 40}px` }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <svg width="40" height="120" viewBox="0 0 40 120">
        <defs>
          <linearGradient id={`${color}-gradient`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={`${color}88`} />
          </linearGradient>
        </defs>
        {pieces.map((_, index) => (
          <g key={index} transform={`translate(0, ${index * 10})`}>
            {getShape()}
          </g>
        ))}
      </svg>
      {count > 10 && (
        <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-white bg-black bg-opacity-50 rounded-b-lg py-1">
          +{count - 10}
        </div>
      )}
    </motion.div>
  );
};

interface MetalPileProps {
  color: string;
  holding: {
    small: number;
    medium: number;
    large: number;
  };
  types: {
    small: { name: string; weight: number };
    medium: { name: string; weight: number };
    large: { name: string; weight: number };
  };
}

export function MetalPile({ color, holding, types }: MetalPileProps) {
  const maxPieces = Math.max(holding.small, holding.medium, holding.large);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex justify-around items-end">
        {(['small', 'medium', 'large'] as const).map((size) => (
          <MetalPiece
            key={size}
            color={color}
            size={size}
            count={holding[size]}
            maxCount={maxPieces}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-around text-center">
        {(['small', 'medium', 'large'] as const).map((size) => (
          <div key={size} className="w-1/3 px-1">
            <p className="text-white text-xs font-medium">{types[size].name}</p>
            <p className="text-gray-400 text-xs">
              {holding[size]} x {types[size].weight}oz
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

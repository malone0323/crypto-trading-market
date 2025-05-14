import React from 'react';
import { motion } from 'framer-motion';

interface VaultVisualizationProps {
  fillPercentage: number;
}

export const VaultVisualization: React.FC<VaultVisualizationProps> = ({ fillPercentage }) => {
  return (
    <div className="relative w-full h-64">
      <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
        {/* Vault outline */}
        <rect x="10" y="10" width="180" height="80" fill="#444" stroke="#666" strokeWidth="4" />
        
        {/* Vault door */}
        <rect x="70" y="20" width="60" height="60" fill="#333" stroke="#555" strokeWidth="2" />
        
        {/* Vault handle */}
        <circle cx="120" cy="50" r="5" fill="#888" />
        
        {/* Gold fill */}
        <motion.rect
          x="10"
          y="90"
          width="180"
          initial={{ height: 0 }}
          animate={{ height: 80 * (fillPercentage / 100) }}
          transition={{ duration: 1 }}
          fill="url(#gold-gradient)"
        />
        
        {/* Gold gradient */}
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Percentage text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
        {Math.round(fillPercentage)}%
      </div>
    </div>
  );
};

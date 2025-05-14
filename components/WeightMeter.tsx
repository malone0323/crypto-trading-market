import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomButton } from './ui/custom-button';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';

interface WeightMeterProps {
  currentWeight: number;
  maxWeight: number;
}

export const WeightMeter: React.FC<WeightMeterProps> = ({ currentWeight, maxWeight }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const fillPercentage = Math.min((currentWeight / maxWeight) * 100, 100);

  const getWeightTier = (percentage: number) => {
    if (percentage < 25) return { name: "Bronze", color: "#CD7F32" };
    if (percentage < 50) return { name: "Silver", color: "#C0C0C0" };
    if (percentage < 75) return { name: "Gold", color: "#FFD700" };
    return { name: "Platinum", color: "#E5E4E2" };
  };

  const currentTier = getWeightTier(fillPercentage);

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
      <motion.div 
        className="relative w-full"
        animate={{ height: isExpanded ? '300px' : '200px' }}
        transition={{ duration: 0.5 }}
      >
        <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#444" strokeWidth="10" />
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={currentTier.color}
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: fillPercentage / 100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ rotate: -90, transformOrigin: "center" }}
          />
          <motion.path
            d="M100 60 L80 80 H60 V140 H140 V80 H120 L100 60Z"
            fill="#888"
            stroke="#666"
            strokeWidth="2"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </svg>
        
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-2xl sm:text-3xl font-bold text-white">{currentWeight.toFixed(2)}</p>
          <p className="text-xs sm:text-sm text-gray-400">/ {maxWeight} oz</p>
          <p className="text-sm sm:text-lg font-semibold" style={{ color: currentTier.color }}>{currentTier.name} Tier</p>
        </motion.div>
      </motion.div>

      <div className="mt-4 flex justify-center space-x-2 sm:space-x-4 w-full">
        <CustomButton
          variant="secondary"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs sm:text-sm"
        >
          {isExpanded ? <ArrowUp className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> : <ArrowDown className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />}
          {isExpanded ? "Collapse" : "Expand"}
        </CustomButton>
        <CustomButton
          variant="secondary"
          size="sm"
          onClick={() => setShowInfo(!showInfo)}
          className="text-xs sm:text-sm"
        >
          <Info className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Info
        </CustomButton>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 bg-gray-800 p-2 sm:p-4 rounded-lg w-full text-xs sm:text-sm"
          >
            <h4 className="text-sm sm:text-lg font-semibold mb-2">Weight Tiers</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 bg-[#CD7F32]"></span>Bronze: 0 - 249 oz</li>
              <li><span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 bg-[#C0C0C0]"></span>Silver: 250 - 499 oz</li>
              <li><span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 bg-[#FFD700]"></span>Gold: 500 - 749 oz</li>
              <li><span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-2 bg-[#E5E4E2]"></span>Platinum: 750+ oz</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

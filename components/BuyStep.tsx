import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface BuyStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
  index: number;
}

export const BuyStep = forwardRef<HTMLDivElement, BuyStepProps>(
  ({ icon, title, description, isActive, index }, ref) => {
    const variants = {
      hidden: { opacity: 0, y: 50 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.3,
          duration: 0.8,
          ease: "easeOut"
        }
      })
    };

    return (
      <motion.div
        ref={ref}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={variants}
        className={`flex items-center space-x-8 transition-all duration-700 ${
          isActive ? 'scale-105 opacity-100' : 'scale-100 opacity-50'
        }`}
      >
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-lg">{description}</p>
        </div>
      </motion.div>
    );
  }
);

BuyStep.displayName = 'BuyStep';

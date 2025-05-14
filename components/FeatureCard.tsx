import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export default function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-700 hover:border-yellow-500 group"
    >
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gray-800 p-3 rounded-full group-hover:bg-yellow-500 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </motion.div>
  );
};

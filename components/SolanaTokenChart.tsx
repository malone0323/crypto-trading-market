import React from 'react';

const SolanaTokenChart: React.FC = () => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-black">
      <iframe
        src="https://solscan.io/token/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump#chart"
        title="$CCC Token Chart"
        className="w-full h-full border-0"
      />
    </div>
  );
};

export default SolanaTokenChart;

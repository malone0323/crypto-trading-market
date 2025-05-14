'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

interface MetalPrices {
  Silver: number;
  Gold: number;
  Platinum: number;
  Palladium: number;
}

interface MetalPricesContextType {
  prices: MetalPrices;
  loading: boolean;
  error: string | null;
}

const MetalPricesContext = createContext<MetalPricesContextType | undefined>(undefined);

export const useMetalPrices = () => {
  const context = useContext(MetalPricesContext);
  if (context === undefined) {
    throw new Error('useMetalPrices must be used within a MetalPricesProvider');
  }
  return context;
};

export const MetalPricesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<MetalPrices>({ Silver: 0, Gold: 0, Platinum: 0, Palladium: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // In a real application, you would fetch this data from an API
        // This is just a placeholder with mock data
        const mockPrices = {
          Silver: 25,
          Gold: 1800,
          Platinum: 1000,
          Palladium: 2200
        };
        setPrices(mockPrices);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch metal prices');
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return (
    <MetalPricesContext.Provider value={{ prices, loading, error }}>
      {children}
    </MetalPricesContext.Provider>
  );
};

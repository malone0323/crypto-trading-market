import { useState, useEffect } from 'react';

interface MetalPrice {
  metal: string;
  price: number;
  currency: string;
  timestamp: number;
}

const API_KEY = 'K0ZC4X9BAEGYJH5SYRCZ4045SYRCZ';
const METALS = ['gold', 'silver', 'platinum', 'palladium'];

export const useMetalPrices = () => {
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          METALS.map(metal =>
            fetch(`https://api.metals.dev/v1/metal/spot?api_key=${API_KEY}&metal=${metal}&currency=USD`)
              .then(res => res.json())
          )
        );

        const newPrices: { [key: string]: number } = {};
        results.forEach((result: MetalPrice) => {
          newPrices[result.metal] = result.price;
        });

        setPrices(newPrices);
      } catch (err) {
        console.error('Error fetching metal prices:', err);
        setError('Failed to fetch metal prices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error };
};

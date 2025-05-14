import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';
import { theme } from '@/lib/theme';
import { useChat } from '@/components/DappLayout';
import { useMetalPrices } from '@/contexts/MetalPricesContext';

interface NFTPrice {
  metal: string;
  type: 'Nugget' | 'Coin' | 'Bar';
  weight: number;
  price: number;
}

export const ScrollingHeadline: React.FC = () => {
  const { isChatOpen } = useChat();
  const { prices, loading, error } = useMetalPrices();

  const items: NFTPrice[] = React.useMemo(() => {
    if (loading || error) return [];

    const metals = ['Silver', 'Gold', 'Platinum', 'Palladium'];
    const types = [
      { name: 'Nugget', weight: 0.5 },
      { name: 'Coin', weight: 1 },
      { name: 'Bar', weight: 10 },
    ];

    return metals.flatMap(metal => 
      types.map(type => ({
        metal,
        type: type.name as 'Nugget' | 'Coin' | 'Bar',
        weight: type.weight,
        price: (prices[metal.toLowerCase()] || 0) * type.weight
      }))
    );
  }, [prices, loading, error]);

  if (loading) {
    return <div className="p-2 bg-black bg-opacity-50 text-white">Loading metal prices...</div>;
  }

  if (error) {
    return <div className="p-2 bg-black bg-opacity-50 text-white">Error: {error}</div>;
  }

  return (
    <div className={`w-full overflow-hidden py-2 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm transition-all duration-300 ${isChatOpen ? 'md:pr-[450px]' : ''}`}>
      <div className="animate-scroll-x inline-flex whitespace-nowrap">
        {items.concat(items).map((item, index) => (
          <span key={index} className="inline-block px-4 text-sm">
            <span className="font-bold" style={{ color: theme.colors.primary }}>{item.metal}</span> {item.type} ({item.weight}oz): 
            <span className="ml-1 text-green-400">
              ${item.price.toFixed(2)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

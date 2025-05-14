import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { Progress } from "@/components/ui/progress"
import { SilverIcon, GoldIcon, PlatinumIcon, PalladiumIcon } from '@/components/MetalIcons';
import { useMetalPrices } from '@/contexts/MetalPricesContext';

interface MetalData {
  name: string;
  basePrice: number;
  currentPrice: number;
  baseMultiplier: number;
}

export function DynamicStakingRewards() {
  const { prices } = useMetalPrices();

  const metalData: MetalData[] = [
    { name: 'Silver', basePrice: 20, currentPrice: prices.Silver, baseMultiplier: 0.08 },
    { name: 'Gold', basePrice: 1800, currentPrice: prices.Gold, baseMultiplier: 0.15 },
    { name: 'Platinum', basePrice: 1000, currentPrice: prices.Platinum, baseMultiplier: 0.22 },
    { name: 'Palladium', basePrice: 2000, currentPrice: prices.Palladium, baseMultiplier: 0.30 },
  ];

  const calculateMultiplier = (metal: MetalData) => {
    const priceChangeFactor = (metal.currentPrice - metal.basePrice) / metal.basePrice;
    return metal.baseMultiplier * (1 + priceChangeFactor);
  };

  return (
    <GlassCard title="Dynamic Staking Rewards">
      <div className="space-y-4">
        {metalData.map((metal) => {
          const currentMultiplier = calculateMultiplier(metal);
          const multiplierChange = (currentMultiplier - metal.baseMultiplier) / metal.baseMultiplier * 100;
          
          return (
            <div key={metal.name} className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {metal.name === 'Silver' && <SilverIcon className="w-6 h-6 mr-2" />}
                  {metal.name === 'Gold' && <GoldIcon className="w-6 h-6 mr-2" />}
                  {metal.name === 'Platinum' && <PlatinumIcon className="w-6 h-6 mr-2" />}
                  {metal.name === 'Palladium' && <PalladiumIcon className="w-6 h-6 mr-2" />}
                  <span className="font-bold">{metal.name}</span>
                </div>
                <span className="text-sm">
                  ${metal.currentPrice.toFixed(2)} / oz
                  <span className={metal.currentPrice > metal.basePrice ? 'text-green-500' : 'text-red-500'}>
                    {' '}({((metal.currentPrice - metal.basePrice) / metal.basePrice * 100).toFixed(2)}%)
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Staking Multiplier:</span>
                <span className="font-bold">
                  {(currentMultiplier * 100).toFixed(2)}%
                  <span className={multiplierChange >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {' '}({multiplierChange >= 0 ? '+' : ''}{multiplierChange.toFixed(2)}%)
                  </span>
                </span>
              </div>
              <Progress value={(currentMultiplier / (metal.baseMultiplier * 2)) * 100} className="h-2" />
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

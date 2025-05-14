import React, { useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image';
import { theme } from '@/lib/theme';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Scale } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MetalHolding {
  nuggets: { weight: number }[];
  coins: { weight: number }[];
  bars: { weight: number }[];
  kilos: { weight: number }[];
}

interface UserMetalHoldings {
  silver: MetalHolding;
  gold: MetalHolding;
  platinum: MetalHolding;
  palladium: MetalHolding;
}

interface MetalVaultProps {
  holdings: UserMetalHoldings;
  onWeightUpdate?: (weights: { [key: string]: number }) => void;
}

const metalInfo = {
  silver: {
    color: theme.colors.secondary,
    maxWeight: 1000, // 1kg for Kilo NFT
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-h8hs6zZ50jWVXP68omdHCsjg4Zu2o2.png',
    gradient: theme.gradients.silver
  },
  gold: {
    color: theme.colors.primary,
    maxWeight: 1000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-ZYZMcwJOcE322vP3EcWzZJqsXpZtdI.png',
    gradient: theme.gradients.gold
  },
  platinum: {
    color: theme.colors.tertiary,
    maxWeight: 1000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platnium-BEogPuww4BOootX6jzaXqtu0xTt6cT.png',
    gradient: theme.gradients.platinum
  },
  palladium: {
    color: theme.colors.quaternary,
    maxWeight: 1000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-wp8fTVX2i5qL8z32lkb8gFs7QGCPqV.png',
    gradient: theme.gradients.palladium
  },
};

const calculateWeight = (holding: MetalHolding): { grams: number; ounces: number } => {
  const grams = (
    (holding.nuggets?.reduce((sum, nft) => sum + nft.weight, 0) || 0) +
    (holding.coins?.reduce((sum, nft) => sum + nft.weight, 0) || 0) +
    (holding.bars?.reduce((sum, nft) => sum + nft.weight, 0) || 0) +
    (holding.kilos?.reduce((sum, nft) => sum + nft.weight, 0) || 0)
  );

  return {
    grams: parseFloat(grams.toFixed(2)),
    ounces: parseFloat((grams / 31.1).toFixed(2))
  };
};

const formatWeight = (weight: { grams: number; ounces: number }) => {
  if (weight.grams >= 1000) {
    return `${(weight.grams / 1000).toFixed(2)} kg`;
  } else if (weight.grams >= 100) {
    return `${weight.grams.toFixed(1)} g`;
  } else {
    return `${weight.ounces.toFixed(2)} oz`;
  }
};

const MetalCard: React.FC<{
  metal: string;
  holding: MetalHolding;
  info: typeof metalInfo[keyof typeof metalInfo];
}> = ({ metal, holding, info }) => {
  const weight = useMemo(() => calculateWeight(holding), [holding]);
  const percentage = (weight.grams / info.maxWeight) * 100;

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={info.image}
              alt={`${metal} icon`}
              width={32}
              height={32}
              className="rounded-full"
            />
            <CardTitle className="text-xl capitalize text-white">{metal}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-300" />
              </TooltipTrigger>
              <TooltipContent>
                <div className="space-y-1 text-white">
                  <p>Weight: {formatWeight(weight)}</p>
                  <p>Progress to Kilo NFT: {percentage.toFixed(1)}%</p>
                  <p>{(info.maxWeight - weight.grams).toFixed(2)}g remaining</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-white">
        <div>
          <div className="flex justify-between text-sm mb-1 text-gray-400">
            <span className="text-gray-400">Progress to Kilo NFT</span>
            <span className="text-gray-300">{percentage.toFixed(1)}%</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-700">
            <div
              className="h-full transition-all duration-500 ease-in-out rounded-full"
              style={{
                width: `${percentage}%`,
                background: info.gradient
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-white">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Nuggets (1g)</span>
              <span className="text-sm font-medium text-white">{holding.nuggets?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Bars (10oz)</span>
              <span className="text-sm font-medium text-white">{holding.bars?.length || 0}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Coins (1oz)</span>
              <span className="text-sm font-medium text-white">{holding.coins?.length || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Kilo NFTs</span>
              <span className="text-sm font-medium text-white">{holding.kilos?.length || 0}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function MetalVault({ holdings, onWeightUpdate }: MetalVaultProps) {
  // Calculate total weight across all metals
  const totalWeight = useMemo(() => {
    return Object.values(holdings).reduce((acc, metalHolding) => {
      const metalWeight = ['nuggets', 'coins', 'bars', 'kilos'].reduce((sum, type) => {
        return sum + (metalHolding[type]?.reduce((typeSum, nft) => typeSum + (nft.weight || 0), 0) || 0);
      }, 0);
      return acc + metalWeight;
    }, 0);
  }, [holdings]);

  // Update parent components with new weights if callback provided
  const updateWeights = useCallback(() => {
    if (onWeightUpdate) {
      const weights = Object.entries(holdings).reduce((acc, [metal, holding]) => {
        acc[metal] = calculateWeight(holding).grams;
        return acc;
      }, {} as { [key: string]: number });

      onWeightUpdate(weights);
    }
  }, [holdings, onWeightUpdate]);

  React.useEffect(() => {
    updateWeights();
  }, [updateWeights]);

  const userHoldings = {
    silver: { nuggets: [{ weight: 1 }], coins: [{ weight: 31.1 }], bars: [{ weight: 311 }], kilos: [] },
    gold: { nuggets: [{ weight: 0.1 }], coins: [{ weight: 31.1 }], bars: [{ weight: 311 }], kilos: [] },
    platinum: { nuggets: [{ weight: 0.5 }], coins: [{ weight: 31.1 }], bars: [], kilos: [] },
    palladium: { nuggets: [], coins: [{ weight: 31.1 }], bars: [], kilos: [] }
  };

  return (
    <div className="space-y-6 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(userHoldings).map(([metal, holding]) => (
          <MetalCard
            key={metal}
            metal={metal}
            holding={holding}
            info={metalInfo[metal as keyof typeof metalInfo]}
          />
        ))}
      </div>

      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-white">Total Metal Weight</CardTitle>
            <Scale className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent className="text-white">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight text-white">
              {totalWeight >= 1000
                ? `${(totalWeight / 1000).toFixed(2)} kg`
                : `${totalWeight.toFixed(2)} g`}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Combined physical weight of all your metal holdings
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

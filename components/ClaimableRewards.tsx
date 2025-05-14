import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CustomButton } from '@/components/ui/custom-button';
import Image from 'next/image';
import { theme } from '@/lib/theme';
import { Sparkles } from 'lucide-react';

interface RewardInfo {
  metal: string;
  amount: number;
  maxAmount: number;
  image: string;
}

interface ClaimableRewardsProps {
  rewards: RewardInfo[];
  onClaim: () => void;
  isClaiming: boolean;
}

const metalGradients = {
  Silver: theme.gradients.silver,
  Gold: theme.gradients.gold,
  Platinum: theme.gradients.platinum,
  Palladium: theme.gradients.palladium,
};

export function ClaimableRewards({ rewards, onClaim, isClaiming }: ClaimableRewardsProps) {
  const totalRewards = rewards.reduce((sum, reward) => sum + reward.amount, 0);
  const canClaim = totalRewards > 0;

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          Claimable Rewards
          <Sparkles className="h-5 w-5 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rewards.map((reward) => (
          <Card key={reward.metal} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={reward.image}
                    alt={`${reward.metal} icon`}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="font-semibold">{reward.metal}</span>
                </div>
                <span className="text-sm">{reward.amount.toFixed(2)} $METAL</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-gray-300">{(reward.amount / reward.maxAmount * 100).toFixed(1)}%</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full transition-all duration-500 ease-in-out rounded-full"
                    style={{
                      width: `${(reward.amount / reward.maxAmount) * 100}%`,
                      background: metalGradients[reward.metal as keyof typeof metalGradients]
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-semibold">Total Rewards:</span>
          <span className="text-lg font-bold text-yellow-400">{totalRewards.toFixed(2)} $METAL</span>
        </div>
        <CustomButton 
          variant="gold" 
          className="w-full mt-4" 
          onClick={onClaim}
          disabled={isClaiming || !canClaim}
        >
          {isClaiming ? 'Claiming...' : `Claim ${totalRewards.toFixed(2)} $METAL`}
        </CustomButton>
      </CardContent>
    </Card>
  );
}

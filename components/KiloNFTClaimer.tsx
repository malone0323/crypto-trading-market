import React from 'react';
import { CustomButton } from './ui/custom-button';
import { UserMetalHoldings, MetalType, KiloNFT } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface KiloNFTClaimerProps {
  holdings: UserMetalHoldings;
  onClaim: (kiloNFT: KiloNFT) => void;
}

export function KiloNFTClaimer({ holdings, onClaim }: KiloNFTClaimerProps) {
  const calculateTotalWeight = (metalType: MetalType) => {
    const metalHoldings = holdings[metalType];
    return Object.values(metalHoldings).reduce((total, nfts) => 
      total + nfts.reduce((sum, nft) => sum + nft.weight, 0), 0
    );
  };

  const handleClaim = (metalType: MetalType) => {
    const totalWeight = calculateTotalWeight(metalType);
    if (totalWeight >= 1000) {
      const newKiloNFT: KiloNFT = {
        id: Date.now().toString(),
        metalType,
        nftType: 'Kilo',
        weight: 1000,
        image: `/placeholder.svg?metal=${metalType}&type=Kilo`,
        stakingRewardMultiplier: 1.1, // 10% increase
      };
      onClaim(newKiloNFT);
      toast.success(`Claimed a ${metalType} Kilo NFT!`);
    } else {
      toast.error(`Not enough ${metalType} to claim a Kilo NFT. You need 1000g, but only have ${totalWeight.toFixed(2)}g.`);
    }
  };

  return (
    <div className="space-y-4">
      {(Object.keys(holdings) as MetalType[]).map(metalType => (
        <div key={metalType} className="flex justify-between items-center">
          <span>{metalType}: {calculateTotalWeight(metalType).toFixed(2)}g / 1000g</span>
          <CustomButton 
            variant="gold" 
            onClick={() => handleClaim(metalType)}
            disabled={calculateTotalWeight(metalType) < 1000}
          >
            Claim {metalType} Kilo
          </CustomButton>
        </div>
      ))}
    </div>
  );
}

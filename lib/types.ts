\`\`\`typescript
export type MetalType = 'Silver' | 'Gold' | 'Platinum' | 'Palladium';
export type NFTType = 'Nugget' | 'Coin' | 'Bar' | 'Kilo';

export interface MetalNFT {
  id: string;
  metalType: MetalType;
  nftType: NFTType;
  weight: number; // in grams
  image: string;
}

export interface KiloNFT extends MetalNFT {
  stakingRewardMultiplier: number;
}

export interface UserMetalHoldings {
  [key: string]: {
    nuggets: MetalNFT[];
    coins: MetalNFT[];
    bars: MetalNFT[];
    kilos: KiloNFT[];
  };
}
\`\`\`

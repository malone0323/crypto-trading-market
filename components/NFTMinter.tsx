import React, { useState } from 'react';
import { CustomButton } from './ui/custom-button';
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MetalType, NFTType, MetalNFT } from '@/lib/types';
import { toast } from 'react-hot-toast';

interface NFTMinterProps {
  onMint: (nft: MetalNFT) => void;
}

export function NFTMinter({ onMint }: NFTMinterProps) {
  const [metalType, setMetalType] = useState<MetalType>('Silver');
  const [nftType, setNFTType] = useState<NFTType>('Nugget');
  const [weight, setWeight] = useState('');

  const handleMint = () => {
    if (!weight || isNaN(parseFloat(weight))) {
      toast.error('Please enter a valid weight');
      return;
    }

    const newNFT: MetalNFT = {
      id: Date.now().toString(),
      metalType,
      nftType,
      weight: parseFloat(weight),
      image: `/placeholder.svg?metal=${metalType}&type=${nftType}`,
    };

    onMint(newNFT);
    toast.success(`Minted a ${metalType} ${nftType}`);
    setWeight('');
  };

  return (
    <div className="space-y-4">
      <Select onValueChange={(value) => setMetalType(value as MetalType)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Metal Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Silver">Silver</SelectItem>
          <SelectItem value="Gold">Gold</SelectItem>
          <SelectItem value="Platinum">Platinum</SelectItem>
          <SelectItem value="Palladium">Palladium</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setNFTType(value as NFTType)}>
        <SelectTrigger>
          <SelectValue placeholder="Select NFT Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Nugget">Nugget</SelectItem>
          <SelectItem value="Coin">Coin</SelectItem>
          <SelectItem value="Bar">Bar</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Weight in grams"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        step="0.01"
      />

      <CustomButton variant="gold" onClick={handleMint} className="w-full">
        Mint NFT
      </CustomButton>
    </div>
  );
}

'use client'

import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { Button } from "@/components/ui/button";
import { Share2 } from 'lucide-react';
import Image from 'next/image';

interface VaultMilestone {
  threshold: number;
  image: string;
  description: string;
}

const vaultMilestones: VaultMilestone[] = [
  {
    threshold: 0,
    image: '/placeholder.svg?height=200&width=200',
    description: 'Empty Vault'
  },
  {
    threshold: 1000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-h8hs6zZ50jWVXP68omdHCsjg4Zu2o2.png',
    description: 'Silver Tier Vault'
  },
  {
    threshold: 5000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-ZYZMcwJOcE322vP3EcWzZJqsXpZtdI.png',
    description: 'Gold Tier Vault'
  },
  {
    threshold: 10000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platnium-BEogPuww4BOootX6jzaXqtu0xTt6cT.png',
    description: 'Platinum Tier Vault'
  },
  {
    threshold: 20000,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-wp8fTVX2i5qL8z32lkb8gFs7QGCPqV.png',
    description: 'Palladium Tier Vault'
  }
];

interface VirtualVaultProps {
  totalHoldings: number;
}

export function VirtualVault({ totalHoldings }: VirtualVaultProps) {
  const vaultRef = useRef<HTMLDivElement>(null);

  const getCurrentMilestone = () => {
    return vaultMilestones
      .slice()
      .reverse()
      .find(milestone => totalHoldings >= milestone.threshold) || vaultMilestones[0];
  };

  const handleFlexBag = async () => {
    if (!vaultRef.current) return;

    try {
      const dataUrl = await toPng(vaultRef.current, {
        quality: 1.0,
        backgroundColor: '#000000',
      });

      // Create a temporary link element
      const link = document.createElement('a');
      link.download = `metal-vault-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating vault image:', err);
    }
  };

  const currentMilestone = getCurrentMilestone();
  const nextMilestone = vaultMilestones.find(milestone => milestone.threshold > totalHoldings);
  const progressToNext = nextMilestone 
    ? ((totalHoldings - currentMilestone.threshold) / (nextMilestone.threshold - currentMilestone.threshold)) * 100
    : 100;

  return (
    <div className="space-y-4">
      <div 
        ref={vaultRef}
        className="relative bg-black rounded-lg p-6 space-y-4"
      >
        <div className="absolute top-4 right-4 bg-primary/10 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-primary font-bold">{totalHoldings.toLocaleString()} $METAL</span>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-64 h-64">
            <Image
              src={currentMilestone.image}
              alt={currentMilestone.description}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-2xl font-bold text-primary">{currentMilestone.description}</h3>
        </div>

        {nextMilestone && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to {nextMilestone.description}</span>
              <span>{Math.round(progressToNext)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">
              {nextMilestone.threshold - totalHoldings} more $METAL needed
            </p>
          </div>
        )}
      </div>

      <Button 
        onClick={handleFlexBag}
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
      >
        <Share2 className="w-4 h-4 mr-2" />
        FLEX BAG
      </Button>
    </div>
  );
}

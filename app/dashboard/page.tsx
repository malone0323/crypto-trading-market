'use client'

import React, { useEffect, useRef } from 'react';
import { DappLayout } from '@/components/DappLayout';
import { GlassCard } from '@/components/ui/glass-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Wallet, Coins, TrendingUp, Clock, BarChart3, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { QuestTracker } from '@/components/QuestTracker';
import { MetalVault } from '@/components/MetalVault';
import { AdminLoginButton } from '@/components/AdminLoginButton';

// Update the mock data in the Dashboard component
const userHoldings = {
  silver: { nugget: 50, coin: 25, bar: 10, kiloNFT: 0 },
  gold: { nugget: 100, coin: 50, bar: 20, kiloNFT: 0 },
  platinum: { nugget: 30, coin: 15, bar: 5, kiloNFT: 0 },
  palladium: { nugget: 20, coin: 10, bar: 3, kiloNFT: 0 }
};

const metalTiers = [
  { 
    metal: 'Silver', 
    multiplier: '1.08x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-h8hs6zZ50jWVXP68omdHCsjg4Zu2o2.png',
    weight: 250,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-NF56mlQjpAeTh3CdDDHlHRmPKdFcVd.png',
    kiloNFTQuantity: 0
  },
  { 
    metal: 'Gold', 
    multiplier: '1.15x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-ZYZMcwJOcE322vP3EcWzZJqsXpZtdI.png',
    weight: 100,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-MRbxj8GEO4ghQfodmL8Rk9LAwCsEBb.png',
    kiloNFTQuantity: 0
  },
  { 
    metal: 'Platinum', 
    multiplier: '1.22x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platnium-BEogPuww4BOootX6jzaXqtu0xTt6cT.png',
    weight: 50,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum-ab4eYzhF1NGjxdjUwuGkdnzMzosVnW.png',
    kiloNFTQuantity: 0
  },
  { 
    metal: 'Palladium', 
    multiplier: '1.30x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-wp8fTVX2i5qL8z32lkb8gFs7QGCPqV.png',
    weight: 25,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-YsmCxw5aXBXbodA66CNwPuHwk1BUlF.png',
    kiloNFTQuantity: 0
  },
];

const totalMultiplier = metalTiers.reduce((total, metal) => total + parseFloat(metal.multiplier), 0).toFixed(2);

export default function Dashboard() {
  const vaultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Dashboard component mounted');
    if (vaultRef.current) {
      console.log('Metal Vault ref is available');
    } else {
      console.log('Metal Vault ref is not available');
    }
  }, []);

  return (
    <DappLayout>
      <main className="flex-grow container mx-auto px-2 max-w-[1600px]">
        <div className="space-y-6 pb-16">
          {/* Governance and Admin Buttons */}
          <div className="pt-16 pb-8 flex space-x-4">
            <Link href="/governance" passHref>
              <CustomButton variant="gold" size="lg">Governance</CustomButton>
            </Link>
            <AdminLoginButton />
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <GlassCard title="Total Metal Weight">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Coins className="h-6 w-6 mr-2" />
                  <p className="text-lg sm:text-xl font-bold">1000 $METAL</p>
                </div>
              </div>
            </GlassCard>
            <GlassCard title="Current APY">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-6 w-6" />
                <p className="text-lg sm:text-xl font-bold">12.34%</p>
              </div>
            </GlassCard>
            <GlassCard title="Next NFT Drop">
              <div className="flex items-center justify-between">
                <Clock className="h-6 w-6" />
                <p className="text-lg sm:text-xl font-bold">2d 5h 32m</p>
              </div>
            </GlassCard>
            <GlassCard title="Total Value Locked">
              <div className="flex items-center justify-between">
                <Wallet className="h-6 w-6" />
                <p className="text-lg sm:text-xl font-bold">$9,876,543</p>
              </div>
            </GlassCard>
          </div>

          {/* Metal NFT Collection */}
          <GlassCard title="Metal NFT Collection">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {metalTiers.map((metal) => (
                <div key={metal.metal} className="text-center">
                  <Image
                    src={metal.img || '/placeholder.svg'}
                    alt={`${metal.metal} bars`}
                    width={60}
                    height={60}
                    className="mx-auto mb-2 transition-transform duration-200 ease-out hover:scale-110 active:scale-105 cursor-pointer"
                  />
                  <h3 className="font-bold text-sm">{metal.metal}</h3>
                  <p className="text-xs text-gray-500">{metal.kiloNFTQuantity} NFTs</p>
                  <p className="text-xs text-yellow-600">
                    {metal.kiloNFTQuantity > 0
                      ? `${metal.multiplier} multiplier`
                      : 'No multiplier yet'}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-bold">Total Multiplier: <span className="text-yellow-600">{totalMultiplier}x</span></p>
            </div>
          </GlassCard>

          {/* Quests & Achievements */}
          <QuestTracker />

          {/* Metal Vault */}
          <div ref={vaultRef}>
            <MetalVault holdings={userHoldings} />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassCard title="Market">
              <p className="mb-4 text-sm">Visit the Metal Market to trade your NFTs.</p>
              <Link href="/market" passHref scroll={true}>
                <CustomButton variant="secondary" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Go to Market
                </CustomButton>
              </Link>
            </GlassCard>
            <GlassCard title="Analytics">
              <p className="mb-4 text-sm">View detailed analytics of your portfolio and market trends.</p>
              <Link href="/analytics" passHref scroll={true}>
                <CustomButton variant="secondary" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </CustomButton>
              </Link>
            </GlassCard>
          </div>
        </div>
      </main>
    </DappLayout>
  );
}

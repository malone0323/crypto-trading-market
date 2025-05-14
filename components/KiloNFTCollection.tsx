import React from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface KiloNFT {
  metal: string;
  img: string;
}

const kiloNFTImages: { [key: string]: string } = {
  Silver: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-NF56mlQjpAeTh3CdDDHlHRmPKdFcVd.png',
  Gold: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-MRbxj8GEO4ghQfodmL8Rk9LAwCsEBb.png',
  Platinum: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum-ab4eYzhF1NGjxdjUwuGkdnzMzosVnW.png',
  Palladium: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-YsmCxw5aXBXbodA66CNwPuHwk1BUlF.png',
};

interface KiloNFTCollectionProps {
  kiloNFTs: { [metal: string]: number };
  className?: string;
}

export function KiloNFTCollection({ kiloNFTs, className = '' }: KiloNFTCollectionProps) {
  return (
    <GlassCard title="Your Kilo NFT Collection" className={className}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(kiloNFTs).map(([metal, quantity]) => (
          <motion.div 
            key={metal}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={kiloNFTImages[metal]}
              alt={`${metal} Kilo NFT`}
              width={100}
              height={100}
              className="rounded-lg shadow-lg mb-2"
            />
            <p className="text-sm font-semibold">{metal} Kilo</p>
            <p className="text-xs text-gray-400">Quantity: {quantity}</p>
          </motion.div>
        ))}
        {Object.keys(kiloNFTs).length === 0 && (
          <p className="col-span-full text-center text-gray-400">
            You haven't claimed any Kilo NFTs yet. Collect 1kg of a metal to claim your first Kilo NFT!
          </p>
        )}
      </div>
    </GlassCard>
  );
}

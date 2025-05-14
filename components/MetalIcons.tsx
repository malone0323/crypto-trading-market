import React from 'react';
import Image from 'next/image';

interface MetalIconProps {
  className?: string;
}

export const SilverIcon: React.FC<MetalIconProps> = ({ className }) => (
  <Image
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-NF56mlQjpAeTh3CdDDHlHRmPKdFcVd.png"
    alt="Silver Kilo"
    width={24}
    height={24}
    className={className}
  />
);

export const GoldIcon: React.FC<MetalIconProps> = ({ className }) => (
  <Image
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-MRbxj8GEO4ghQfodmL8Rk9LAwCsEBb.png"
    alt="Gold Kilo"
    width={24}
    height={24}
    className={className}
  />
);

export const PlatinumIcon: React.FC<MetalIconProps> = ({ className }) => (
  <Image
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum-ab4eYzhF1NGjxdjUwuGkdnzMzosVnW.png"
    alt="Platinum Kilo"
    width={24}
    height={24}
    className={className}
  />
);

export const PalladiumIcon: React.FC<MetalIconProps> = ({ className }) => (
  <Image
    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-YsmCxw5aXBXbodA66CNwPuHwk1BUlF.png"
    alt="Palladium Kilo"
    width={24}
    height={24}
    className={className}
  />
);

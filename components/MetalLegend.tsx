import React from 'react';
import Image from 'next/image';

interface MetalHolding {
  nugget: number;
  coin: number;
  bar: number;
}

interface MetalLegendProps {
  holdings: {
    silver: MetalHolding;
    gold: MetalHolding;
    platinum: MetalHolding;
    palladium: MetalHolding;
  };
}

const metalAssets = {
  silver: {
    nugget: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver%20nugget-WVXMvfKaw36d1t6oMRlHP73EgBllxQ.png',
    coin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver%20coin-sQHOhvs2WfCyMrpmiXSJnLEeAMzlL2.png',
    bar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Silver%20bar-jBFPEu0dYmiMXc71ClnYw3sBbSX25f.png'
  },
  gold: {
    nugget: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20nugget-tHt6VjRrACDCdgIirf7CDCEOqRSdr7.png',
    coin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20coin-ycOAaZloWpNKC4raiQLBTujw1tPyvz.png',
    bar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20bar-wFwllIwVx0OKPkH0s3UNW37BotWmDx.png'
  },
  platinum: {
    nugget: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20nugget-fMq3GKKIWijMU6kRYupLVBfj2lY3v1.png',
    coin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20coin-dsgmHsPTXneJSIYonM85ZauFZlTbWI.png',
    bar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20bar-lHobrglgSsTdGSkOkGmbiJdJD95tzW.png'
  },
  palladium: {
    nugget: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20nugget-4fDu7SayNUC989qAMbE7NhgBWGnyy4.png',
    coin: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20coin-ltHwvuQCI07SFAfuJLyCGQ4l1t5LyV.png',
    bar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20bar-IXxA0PJecySNdkIlFRoWV35QYRINWr.png'
  }
};

const weights = {
  nugget: 0.1,
  coin: 1,
  bar: 10
};

export function MetalLegend({ holdings }: MetalLegendProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Object.entries(holdings).map(([metal, holding]) => (
        <div key={metal} className="bg-gray-800 p-3 sm:p-4 rounded-lg">
          <h3 className="text-sm sm:text-base font-semibold mb-2 capitalize text-white">
            {metal}
          </h3>
          <div className="space-y-1 sm:space-y-2">
            {Object.entries(holding).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={metalAssets[metal][type] || '/placeholder.svg'}
                    alt={`${metal} ${type}`}
                    width={20}
                    height={20}
                    className="object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                      console.error(`Failed to load image for ${metal} ${type}`);
                    }}
                  />
                  <span className="text-xs sm:text-sm text-gray-300 capitalize">{type}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-300">
                  {count} × {weights[type]}oz
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

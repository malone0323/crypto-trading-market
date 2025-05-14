import React, { useState } from 'react';
import Image from 'next/image';
import { CustomButton } from './ui/custom-button';
import { Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NFTListing {
  id: number;
  metal: string;
  nft: string;
  price: number;
  seller: string;
  weight: string;
  boost: string;
  image: string;
}

interface RecentListingsProps {
  listings: NFTListing[];
}

export function RecentListings({ listings }: RecentListingsProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFTListing | null>(null);

  const handleView = (nft: NFTListing) => {
    setSelectedNFT(nft);
  };

  const handleBuy = () => {
    // Implement buy functionality
    console.log('Buying NFT:', selectedNFT?.nft);
  };

  const handleMakeOffer = () => {
    // Implement make offer functionality
    console.log('Making offer for NFT:', selectedNFT?.nft);
  };

  const handleFavorite = () => {
    // Implement favorite functionality
    console.log('Favoriting NFT:', selectedNFT?.nft);
  };

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-4">Recently Listed NFTs</h3>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
        <div className="flex p-4 space-x-4">
          {listings.map((nft) => (
            <div key={nft.id} className="flex-none w-48 bg-gray-800 rounded-lg p-4">
              <Image
                src={nft.image}
                alt={nft.nft}
                width={100}
                height={100}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 className="font-semibold truncate">{nft.nft}</h4>
              <p className="text-sm text-gray-400">{nft.price} $METAL</p>
              <Dialog>
                <DialogTrigger asChild>
                  <CustomButton
                    variant="secondary"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => handleView(nft)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </CustomButton>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{nft.nft}</DialogTitle>
                    <DialogDescription>
                      {nft.metal} NFT - {nft.weight}, +{nft.boost} boost
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Image
                      src={nft.image}
                      alt={nft.nft}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <p>Price: {nft.price} $METAL</p>
                    <p>Seller: {nft.seller}</p>
                    <div className="flex space-x-2">
                      <CustomButton variant="gold" onClick={handleBuy}>
                        Buy Now
                      </CustomButton>
                      <CustomButton variant="secondary" onClick={handleMakeOffer}>
                        Make Offer
                      </CustomButton>
                      <CustomButton variant="secondary" onClick={handleFavorite}>
                        Favorite
                      </CustomButton>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

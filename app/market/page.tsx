'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import { theme } from '@/lib/theme';
import { DappLayout } from '@/components/DappLayout';
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useMetalPrices } from '@/contexts/MetalPricesContext';

// Metal NFT System (unchanged)
const metalNFTs = {
  Silver: [
    { name: 'Silver Dollar', weight: '1 oz', boost: '8%' },
    { name: 'Silver Bar', weight: '10 oz', boost: '10%' },
    { name: 'Silver Bullion', weight: '100 oz', boost: '12%' },
  ],
  Gold: [
    { name: 'Gold Nugget', weight: '0.1 oz', boost: '12%' },
    { name: 'Gold Coin', weight: '1 oz', boost: '15%' },
    { name: 'Gold Bar', weight: '400 oz', boost: '20%' },
  ],
  Platinum: [
    { name: 'Platinum Grain', weight: '1 oz', boost: '18%' },
    { name: 'Platinum Bar', weight: '10 oz', boost: '22%' },
    { name: 'Platinum Ingot', weight: '100 oz', boost: '25%' },
  ],
  Palladium: [
    { name: 'Palladium Coin', weight: '1 oz', boost: '25%' },
    { name: 'Palladium Bar', weight: '10 oz', boost: '30%' },
    { name: 'Palladium Ingot', weight: '100 oz', boost: '40%' },
  ],
};

// Updated mock data for market listings with image URLs
const initialMockListings = [
  { id: 1, metal: 'Silver', nft: 'Silver Coin', price: 100, seller: '0x1234...5678', weight: 1.0, boost: '8%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver%20coin-sQHOhvs2WfCyMrpmiXSJnLEeAMzlL2.png' },
  { id: 2, metal: 'Gold', nft: 'Gold Nugget', price: 1000, seller: '0xabcd...efgh', weight: 0.1, boost: '12%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20nugget-tHt6VjRrACDCdgIirf7CDCEOqRSdr7.png' },
  { id: 3, metal: 'Platinum', nft: 'Platinum Bar', price: 2000, seller: '0x9876...5432', weight: 10.0, boost: '22%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20bar-lHobrglgSsTdGSkOkGmbiJdJD95tzW.png' },
  { id: 4, metal: 'Palladium', nft: 'Palladium Coin', price: 5000, seller: '0xijkl...mnop', weight: 1.0, boost: '25%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20coin-ltHwvuQCI07SFAfuJLyCGQ4l1t5LyV.png' },
  { id: 5, metal: 'Silver', nft: 'Silver Bar', price: 950, seller: '0xmnop...qrst', weight: 10.0, boost: '10%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Silver%20bar-jBFPEu0dYmiMXc71ClnYw3sBbSX25f.png' },
  { id: 6, metal: 'Gold', nft: 'Gold Coin', price: 1800, seller: '0xuvwx...yz12', weight: 1.0, boost: '15%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20coin-ycOAaZloWpNKC4raiQLBTujw1tPyvz.png' },
  { id: 7, metal: 'Platinum', nft: 'Platinum Nugget', price: 1000, seller: '0x3456...7890', weight: 0.5, boost: '18%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20nugget-fMq3GKKIWijMU6kRYupLVBfj2lY3v1.png' },
  { id: 8, metal: 'Palladium', nft: 'Palladium Bar', price: 10000, seller: '0xabcd...1234', weight: 10.0, boost: '30%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20bar-IXxA0PJecySNdkIlFRoWV35QYRINWr.png' },
];

// Mock data for user's open orders
const mockOpenOrders = [
  { id: 1, metal: 'Silver', nft: 'Silver Dollar', price: 110, type: 'Sell', minOffer: 100, maxOffer: 120 },
  { id: 2, metal: 'Gold', nft: 'Gold Coin', price: 950, type: 'Buy' },
];

// Mock data for incoming offers
const mockOffers = [
  { id: 1, orderId: 1, metal: 'Silver', nft: 'Silver Dollar', price: 105, buyer: '0xqwer...tyui' },
  { id: 2, orderId: 1, metal: 'Silver', nft: 'Silver Dollar', price: 108, buyer: '0xasdf...ghjk' },
];

// Mock data for recently listed NFTs
const recentListings = [
  { id: 101, metal: 'Silver', nft: 'Silver Coin', price: 95, seller: '0xzxcv...bnm1', weight: 1.0, boost: '8%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver%20coin-sQHOhvs2WfCyMrpmiXSJnLEeAMzlL2.png' },
  { id: 102, metal: 'Gold', nft: 'Gold Bar', price: 1200, seller: '0xasdf...qwer', weight: 10.0, boost: '18%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20bar-wFwllIwVx0OKPkH0s3UNW37BotWmDx.png' },
  { id: 103, metal: 'Platinum', nft: 'Platinum Nugget', price: 1500, seller: '0xtyui...ghjk', weight: 0.5, boost: '20%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20nugget-fMq3GKKIWijMU6kRYupLVBfj2lY3v1.png' },
  { id: 104, metal: 'Palladium', nft: 'Palladium Coin', price: 2200, seller: '0xvbnm...lkjh', weight: 1.0, boost: '25%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20coin-ltHwvuQCI07SFAfuJLyCGQ4l1t5LyV.png' },
  { id: 105, metal: 'Silver', nft: 'Silver Bullion', price: 980, seller: '0xpoiu...mnbv', weight: 100.0, boost: '12%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Silver%20bar-jBFPEu0dYmiMXc71ClnYw3sBbSX25f.png' },
];

export default function Market() {
  const router = useRouter();
  const { prices, loading, error } = useMetalPrices();
  const [selectedMetal, setSelectedMetal] = useState<string>('');
  const [selectedNFT, setSelectedNFT] = useState<string>('');
  const [orderType, setOrderType] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [minOffer, setMinOffer] = useState<string>('');
  const [maxOffer, setMaxOffer] = useState<string>('');
  const [autoAcceptOffers, setAutoAcceptOffers] = useState<boolean>(false);
  const [openOrders, setOpenOrders] = useState(mockOpenOrders);
  const [offers, setOffers] = useState(mockOffers);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [expandedColumns, setExpandedColumns] = useState<{ [key: string]: boolean }>({
    Silver: false,
    Gold: false,
    Platinum: false,
    Palladium: false,
  });
  const [buyingNFT, setBuyingNFT] = useState<null | { id: number; name: string; price: number }>(null);
  const [buyStatus, setBuyStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [listings, setListings] = useState(() => ([
    { id: 1, metal: 'Silver', nft: 'Silver Coin', price: prices.Silver * 5, seller: '0x1234...5678', weight: 1.0, boost: '8%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver%20coin-sQHOhvs2WfCyMrpmiXSJnLEeAMzlL2.png' },
    { id: 2, metal: 'Gold', nft: 'Gold Nugget', price: prices.Gold * 0.1, seller: '0xabcd...efgh', weight: 0.1, boost: '12%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20nugget-tHt6VjRrACDCdgIirf7CDCEOqRSdr7.png' },
    { id: 3, metal: 'Platinum', nft: 'Platinum Bar', price: prices.Platinum * 10, seller: '0x9876...5432', weight: 10.0, boost: '22%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20bar-lHobrglgSsTdGSkOkGmbiJdJD95tzW.png' },
    { id: 4, metal: 'Palladium', nft: 'Palladium Coin', price: prices.Palladium, seller: '0xijkl...mnop', weight: 1.0, boost: '25%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20coin-ltHwvuQCI07SFAfuJLyCGQ4l1t5LyV.png' },
    { id: 5, metal: 'Silver', nft: 'Silver Bar', price: prices.Silver * 10, seller: '0xmnop...qrst', weight: 10.0, boost: '10%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Silver%20bar-jBFPEu0dYmiMXc71ClnYw3sBbSX25f.png' },
    { id: 6, metal: 'Gold', nft: 'Gold Coin', price: prices.Gold, seller: '0xuvwx...yz12', weight: 1.0, boost: '15%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20coin-ycOAaZloWpNKC4raiQLBTujw1tPyvz.png' },
    { id: 7, metal: 'Platinum', nft: 'Platinum Nugget', price: prices.Platinum * 5, seller: '0x3456...7890', weight: 0.5, boost: '18%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum%20nugget-fMq3GKKIWijMU6kRYupLVBfj2lY3v1.png' },
    { id: 8, metal: 'Palladium', nft: 'Palladium Bar', price: prices.Palladium * 10, seller: '0xabcd...1234', weight: 10.0, boost: '30%', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium%20bar-IXxA0PJecySNdkIlFRoWV35QYRINWr.png' },
  ]));


  const filteredListings = listings.filter(listing => 
    (!priceFilter || listing.price <= parseInt(priceFilter))
  );

  const groupedListings = filteredListings.reduce((acc, listing) => {
    if (!acc[listing.metal]) {
      acc[listing.metal] = [];
    }
    acc[listing.metal].push(listing);
    return acc;
  }, {} as { [key: string]: typeof initialMockListings });

  useEffect(() => {
    setSelectedNFT('');
  }, [selectedMetal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCreateOrder = () => {
    if (orderType && selectedMetal && selectedNFT && price) {
      const newOrder = {
        id: openOrders.length + 1,
        metal: selectedMetal,
        nft: selectedNFT,
        price: parseFloat(price),
        type: orderType as 'Buy' | 'Sell',
        minOffer: orderType === 'sell' ? parseFloat(minOffer) : undefined,
        maxOffer: orderType === 'sell' ? parseFloat(maxOffer) : undefined,
      };
      setOpenOrders([...openOrders, newOrder]);
      setOrderStatus('success');
      // Reset form
      setSelectedMetal('');
      setSelectedNFT('');
      setOrderType('');
      setPrice('');
      setMinOffer('');
      setMaxOffer('');
      setAutoAcceptOffers(false);
    } else {
      setOrderStatus('error');
    }
  };

  const handleCancelOrder = (orderId: number) => {
    setOpenOrders(openOrders.filter(order => order.id !== orderId));
  };

  const handleAcceptOffer = (offerId: number) => {
    // In a real application, this would trigger the transaction
    console.log(`Accepted offer ${offerId}`);
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

  const handleRejectOffer = (offerId: number) => {
    setOffers(offers.filter(offer => offer.id !== offerId));
  };

  const toggleColumnExpansion = (metal: string) => {
    setExpandedColumns(prev => ({ ...prev, [metal]: !prev[metal] }));
  };

  const handleBuyNow = (listing: { id: number; nft: string; price: number }) => {
    setBuyingNFT({ id: listing.id, name: listing.nft, price: listing.price });
    setBuyStatus('processing');
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.1) { // 90% success rate
        setBuyStatus('success');
      } else {
        setBuyStatus('error');
      }
    }, 2000);
  };

  return (
    <DappLayout>
      <main className="container mx-auto px-4 pt-24 pb-32 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Create Order */}
          <GlassCard title="Create Order" className="space-y-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
            <Select onValueChange={setSelectedMetal}>
              <SelectTrigger className="text-gray-900 bg-white border border-gray-300">
                <SelectValue placeholder="Select Metal" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-300">
                {Object.keys(metalNFTs).map(metal => (
                  <SelectItem key={metal} value={metal}>
                    <div className="flex items-center">
                      <Image
                        src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/${metal.toLowerCase()}-${metal === 'Silver' ? 'h8hs6zZ50jWVXP68omdHCsjg4Zu2o2' : metal === 'Gold' ? 'ZYZMcwJOcE322vP3EcWzZJqsXpZtdI' : metal === 'Platinum' ? 'IZVCWeWf1LdXMZ3kceyIlQnESDqtLi' : 'wp8fTVX2i5qL8z32lkb8gFs7QGCPqV'}.png`}
                        alt={`${metal} bars`}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      {metal}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedMetal && (
              <Select onValueChange={setSelectedNFT}>
                <SelectTrigger className="text-gray-900 bg-white border border-gray-300">
                  <SelectValue placeholder="Select NFT Type" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900 border border-gray-300">
                  {metalNFTs[selectedMetal].map(nft => (
                    <SelectItem key={nft.name} value={nft.name}>
                      {nft.name} ({nft.weight}, +{nft.boost} boost)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select onValueChange={setOrderType}>
              <SelectTrigger className="text-gray-900 bg-white border border-gray-300">
                <SelectValue placeholder="Order Type" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 border border-gray-300">
                <SelectItem value="buy">Buy</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
              </SelectContent>
            </Select>

            <Input 
              type="number" 
              placeholder="Price ($METAL)" 
              onChange={(e) => setPrice(e.target.value)}
              className="text-gray-900 bg-white placeholder:text-gray-500 border border-gray-300"
            />

            {orderType === 'sell' && (
              <>
                <div className="flex space-x-2">
                  <Input 
                    type="number" 
                    placeholder="Min Offer" 
                    onChange={(e) => setMinOffer(e.target.value)}
                    className="text-gray-900 bg-white placeholder:text-gray-500 border border-gray-300"
                  />
                  <Input 
                    type="number" 
                    placeholder="Max Offer" 
                    onChange={(e) => setMaxOffer(e.target.value)}
                    className="text-gray-900 bg-white placeholder:text-gray-500 border border-gray-300"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-accept"
                    checked={autoAcceptOffers}
                    onCheckedChange={setAutoAcceptOffers}
                  />
                  <Label htmlFor="auto-accept" className="text-white">Auto-accept offers in range</Label>
                </div>
              </>
            )}

            <CustomButton variant="gold" className="w-full" onClick={handleCreateOrder}>
              {orderType === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
            </CustomButton>

            {orderStatus === 'success' && (
              <Alert className="mt-4 bg-green-900 border-green-500">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Your order has been successfully created.
                </AlertDescription>
              </Alert>
            )}

            {orderStatus === 'error' && (
              <Alert className="mt-4 bg-red-900 border-red-500">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Please fill in all required fields.
                </AlertDescription>
              </Alert>
            )}
          </GlassCard>

          {/* Open Orders and Offers */}
          <GlassCard title="Your Open Orders and Offers">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders">Open Orders</TabsTrigger>
                <TabsTrigger value="offers">Incoming Offers</TabsTrigger>
              </TabsList>
              <TabsContent value="orders">
                <div className="space-y-4">
                  {openOrders.map(order => (
                    <div key={order.id} className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-gray-800 dark:text-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{order.metal} - {order.nft}</span>
                        <span className={order.type === 'Buy' ? 'text-green-500' : 'text-red-500'}>{order.type}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Price:</span>
                        <span>{order.price} $METAL</span>
                      </div>
                      {order.minOffer && order.maxOffer && (
                        <div className="flex justify-between items-center mb-2">
                          <span>Offer Range:</span>
                          <span>{order.minOffer} - {order.maxOffer} $METAL</span>
                        </div>
                      )}
                      <CustomButton 
                        variant="gold" 
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                        className="w-full mt-2"
                      >
                        Cancel Order
                      </CustomButton>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="offers">
                <div className="space-y-4">
                  {offers.map(offer => (
                    <div key={offer.id} className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-gray-800 dark:text-white">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{offer.metal} - {offer.nft}</span>
                        <span>{offer.price} $METAL</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Buyer:</span>
                        <span>{offer.buyer}</span>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <CustomButton 
                          variant="gold" 
                          size="sm"
                          onClick={() => handleAcceptOffer(offer.id)}
                          className="flex-1"
                        >
                          Accept
                        </CustomButton>
                        <CustomButton 
                          variant="gold" 
                          size="sm"
                          onClick={() => handleRejectOffer(offer.id)}
                          className="flex-1"
                        >
                          Reject
                        </CustomButton>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </GlassCard>
        </div>

        {/* Market Listings */}
        <GlassCard title="Market Listings" className="mb-8">
          <div className="mb-4">
            <Input 
              type="number" 
              placeholder="Max Price Filter ($METAL)" 
              onChange={(e) => setPriceFilter(e.target.value)}
              className="text-gray-900 bg-white placeholder:text-gray-500 border border-gray-300"
            />
          </div>

          {/* Recently Listed NFTs Scroller */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 italic">Recently Listed NFTs</h3>
            <div className="relative w-full overflow-hidden pb-4">
              <div className="animate-scroll-x inline-flex whitespace-nowrap">
                {[...recentListings, ...recentListings].map((listing, index) => (
                  <div key={`${listing.id}-${index}`} className="inline-block px-4">
                    <div className="w-48 bg-gray-200 dark:bg-gray-800 rounded-lg p-4 text-gray-800 dark:text-white">
                      <Image
                        src={listing.image}
                        alt={listing.nft}
                        width={100}
                        height={100}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <h4 className="font-semibold truncate">{listing.nft}</h4>
                      <p className="text-sm text-gray-400">{listing.price} $METAL</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <CustomButton
                            variant="gold"
                            size="sm"
                            className="w-full mt-2"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </CustomButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] w-full">
                          <DialogHeader>
                            <DialogTitle className="text-2xl">{listing.nft}</DialogTitle>
                            <DialogDescription>
                              {listing.metal} NFT - {listing.weight.toFixed(2)} oz, +{listing.boost} boost
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4 md:grid-cols-2">
                            <div className="flex items-center justify-center">
                              <Image
                                src={listing.image}
                                alt={listing.nft}
                                width={300}
                                height={300}
                                className="w-full max-w-[300px] h-auto object-cover rounded-md"
                              />
                            </div>
                            <div className="space-y-4">
                              <p className="text-lg">Price: <span className="font-bold">{listing.price} $METAL</span></p>
                              <p className="text-lg">Seller: <span className="font-semibold">{listing.seller}</span></p>
                              <p className="text-lg">Weight: <span className="font-semibold">{listing.weight.toFixed(2)} oz</span></p>
                              <p className="text-lg">Boost: <span className="font-semibold">{listing.boost}</span></p>
                              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                                <CustomButton variant="gold" className="flex-1">
                                  Buy Now
                                </CustomButton>
                                <CustomButton variant="gold" className="flex-1">
                                  Make Offer
                                </CustomButton>
                                <CustomButton variant="gold" className="flex-1">
                                  Favorite
                                </CustomButton>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {Object.entries(groupedListings).map(([metal, listings]) => (
              <div key={metal} className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden text-gray-800 dark:text-white">
                <div 
                  className="bg-gray-700 p-4 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleColumnExpansion(metal)}
                >
                  <h3 className="text-lg font-semibold">{metal}</h3>
                  {expandedColumns[metal] ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedColumns[metal] && (
                  <div className="p-3 space-y-3">
                    {listings.map(listing => (
                      <div key={listing.id} className="bg-gray-300 dark:bg-gray-900 p-4 rounded-lg text-gray-800 dark:text-white">
                        <div className="flex flex-col lg:flex-row items-start space-y-3 lg:space-y-0 lg:space-x-3">
                          <Image
                            src={listing.image}
                            alt={listing.nft}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-grow min-w-0">
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-1">
                              <span className="font-semibold text-sm truncate">{listing.nft}</span>
                              <span className="text-sm font-bold whitespace-nowrap">{listing.price} $METAL</span>
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              Weight: {listing.weight.toFixed(2)} oz | Boost: {listing.boost}
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-400">Seller:</span>
                              <span className="truncate ml-2">{listing.seller}</span>
                            </div>
                          </div>
                        </div>
                        <CustomButton 
                          variant="gold" 
                          size="sm" 
                          className="w-full mt-4"
                          onClick={() => handleBuyNow(listing)}
                        >
                          Buy Now
                        </CustomButton>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <Dialog open={buyingNFT !== null} onOpenChange={() => {
          setBuyingNFT(null);
          setBuyStatus('idle');
        }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Purchase</DialogTitle>
            </DialogHeader>
            {buyStatus === 'processing' && (
              <div className="text-center">
                <p>Processing your purchase...</p>
                {/* You can add a loading spinner here */}
              </div>
            )}
            {buyStatus === 'success' && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <p className="text-xl font-semibold mb-2">Purchase Successful!</p>
                <p>You have successfully acquired {buyingNFT?.name} for {buyingNFT?.price} $METAL.</p>
              </div>
            )}
            {buyStatus === 'error' && (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4"/><p className="text-xl font-semibold mb-2">Purchase Failed</p>
                <p>There was an error processing your purchase. Please try again later.</p>
              </div>
            )}
            {buyStatus === 'idle' && buyingNFT && (
              <>
                <p className="mb-4">Are you sure you want to purchase {buyingNFT.name} for {buyingNFT.price} $METAL?</p>
                  <div className="flex justify-end space-x-2">
                    <CustomButton variant="gold" onClick={() => setBuyingNFT(null)}>Cancel</CustomButton>
                    <CustomButton variant="gold" onClick={() => setBuyStatus('processing')}>Confirm Purchase</CustomButton>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </DappLayout>
  );
}

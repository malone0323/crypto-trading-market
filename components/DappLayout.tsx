import React, { useState, createContext, useContext } from 'react';
import { Header } from '@/components/header';
import { ScrollingHeadline } from '@/components/ScrollingHeadline';
import { FooterMenu } from '@/components/FooterMenu';
import { HoldersChat } from '@/components/HoldersChat';
import { MetalPricesProvider } from '@/contexts/MetalPricesContext';
import { WalletProvider } from '@/contexts/WalletContext';

// Mock data for the ScrollingHeadline
const headlineItems = [
  { metal: 'Silver', nft: 'Silver Dollar', price: 257, priceChange: 7 },
  { metal: 'Gold', nft: 'Gold Coin', price: 1894, priceChange: 14 },
  { metal: 'Platinum', nft: 'Platinum Bar', price: 966, priceChange: 16 },
  { metal: 'Palladium', nft: 'Palladium Ingot', price: 1785, priceChange: 5 },
];

const ChatContext = createContext<{
  isChatOpen: boolean;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isChatOpen: false,
  setIsChatOpen: () => {},
});

export const useChat = () => useContext(ChatContext);

interface DappLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

export const DappLayout: React.FC<DappLayoutProps> = ({ children, pageTitle }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <MetalPricesProvider>
      <WalletProvider>
        <ChatContext.Provider value={{ isChatOpen, setIsChatOpen }}>
          <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-200">
            <Header />
            <div className={`sticky top-[60px] z-40 transition-all duration-300 ${isChatOpen ? 'md:pr-[450px]' : ''}`}>
              <ScrollingHeadline items={headlineItems} />
            </div>
            {pageTitle && (
              <div className="bg-card py-4 px-4 shadow-md transition-colors duration-200">
                <div className="container mx-auto max-w-6xl">
                  <h1 className="text-3xl font-bold">{pageTitle}</h1>
                </div>
              </div>
            )}
            <main className={`flex-grow container mx-auto px-2 py-6 max-w-[1600px] transition-all duration-300 ${isChatOpen ? 'md:pr-[450px]' : ''}`}>
              {children}
            </main>
            <FooterMenu className={isChatOpen ? 'md:pr-[450px]' : ''} />
            <HoldersChat />
          </div>
        </ChatContext.Provider>
      </WalletProvider>
    </MetalPricesProvider>
  );
};

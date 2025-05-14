import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CustomButton } from './ui/custom-button';
import { theme } from '@/lib/theme';
import { Coins } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useChat } from '@/components/DappLayout';
import { useWallet } from '@/contexts/WalletContext';
import { WalletConnection } from './WalletConnection';

export const Header: React.FC = () => {
  const { isChatOpen } = useChat();
  const { walletAddress } = useWallet();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background bg-opacity-90 backdrop-filter backdrop-blur-md h-[60px] border-b border-secondary transition-colors duration-200">
      <div className={`container mx-auto px-4 h-full flex items-center justify-between transition-all duration-300 ${isChatOpen ? 'md:pr-[450px]' : ''}`}>
        <Link href="/" className="flex items-center">
          <Image 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logoheader-Jmm3s9cyUmnWMaKwu7kk4S97ghK0XD.png" 
            alt="Metal Logo" 
            width={120} 
            height={40} 
            className="hover:opacity-80 transition-opacity"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Coins className="h-4 w-4 mr-1 text-primary" />
            <span className="text-sm">$1.23</span>
          </div>
          <div className="text-sm">1,000 $METAL</div>
          <ThemeToggle />
          <WalletConnection />
        </div>
      </div>
    </header>
  );
};

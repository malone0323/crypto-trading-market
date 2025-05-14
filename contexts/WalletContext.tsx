import React, { createContext, useContext, useState, useEffect } from 'react';

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface PhantomProvider {
  connect: () => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, callback: () => void) => void;
  isPhantom: boolean;
}

interface WalletContextType {
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<PhantomProvider | null>(null);

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window as Window & { 
        solana?: PhantomProvider;
      };
      if (solWindow?.solana?.isPhantom) {
        setProvider(solWindow.solana);
        // Restore wallet connection from localStorage
        const savedWalletAddress = localStorage.getItem('walletAddress');
        if (savedWalletAddress) {
          setWalletAddress(savedWalletAddress);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (provider) {
      provider.on("connect", () => {
        if (provider.publicKey) {
          const address = provider.publicKey.toString();
          setWalletAddress(address);
          localStorage.setItem('walletAddress', address);
        }
      });
      provider.on("disconnect", () => {
        setWalletAddress(null);
        localStorage.removeItem('walletAddress');
      });
    }
  }, [provider]);

  const connectWallet = async () => {
    if (provider) {
      try {
        const { publicKey } = await provider.connect();
        setWalletAddress(publicKey.toString());
        localStorage.setItem('walletAddress', publicKey.toString());
      } catch (err) {
        console.error("Error connecting to wallet:", err);
      }
    }
  };

  const disconnectWallet = async () => {
    if (provider) {
      try {
        await provider.disconnect();
        setWalletAddress(null);
        localStorage.removeItem('walletAddress');
      } catch (err) {
        console.error("Error disconnecting wallet:", err);
      }
    }
  };

  return (
    <WalletContext.Provider value={{ walletAddress, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

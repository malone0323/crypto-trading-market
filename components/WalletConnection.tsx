import { useWallet } from '@/contexts/WalletContext';
import { CustomButton } from './ui/custom-button';

export const WalletConnection = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet();

  if (!walletAddress) {
    return (
      <CustomButton variant="gold" onClick={connectWallet}>
        Connect Wallet
      </CustomButton>
    );
  }

  return (
    <CustomButton variant="gold" onClick={disconnectWallet}>
      Disconnect Wallet: {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
    </CustomButton>
  );
};

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Copy, Check, Twitter, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface User {
  name: string;
  avatar: string;
  solanaAddress: string;
  bio?: string;
  bannerPhoto?: string;
  twitterLink?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

interface MiniProfileProps {
  user: User;
}

export function MiniProfile({ user }: MiniProfileProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.solanaAddress);
    setIsCopied(true);
    toast.success('Solana address copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="bg-background dark:bg-gray-800 border border-border rounded-lg p-4 w-full">
      <div className="relative">
        <img
          src={user.bannerPhoto || '/placeholder.svg?height=60&width=240'}
          alt="Banner"
          className="w-full h-16 object-cover rounded-t-lg"
        />
        <Avatar className="absolute bottom-0 left-2 transform translate-y-1/2 w-12 h-12 border-2 border-background">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <button
          onClick={user.onToggleFavorite}
          className={`absolute top-2 right-2 p-1 rounded-full ${
            user.isFavorite ? 'text-yellow-400 bg-yellow-100' : 'text-gray-400 bg-gray-100'
          } hover:bg-opacity-80 transition-colors`}
          aria-label={user.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className="h-5 w-5" fill={user.isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="mt-8 space-y-2">
        <h3 className="font-bold">{user.name}</h3>
        {user.bio && <p className="text-sm text-muted-foreground">{user.bio}</p>}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-muted-foreground">Solana:</span>
          <span className="truncate flex-grow">{user.solanaAddress}</span>
          <button
            onClick={copyToClipboard}
            className="text-primary hover:text-primary/80 transition-colors"
            aria-label="Copy Solana address"
          >
            {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
        {user.twitterLink && (
          <a
            href={user.twitterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center space-x-1"
          >
            <Twitter className="h-4 w-4" />
            <span>X Profile</span>
          </a>
        )}
      </div>
    </div>
  );
}

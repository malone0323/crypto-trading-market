import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MiniProfile } from './MiniProfile';
import { Star } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  solanaAddress: string;
  bio: string;
  bannerPhoto: string;
  twitterLink: string;
}

// Mock data for online users
const initialOnlineUsers: User[] = [
  { id: 1, name: 'Alice', avatar: '/placeholder.svg?height=32&width=32', solanaAddress: '7fUAJdStEuGbc3sM84cKqdJNSEeyB7K46ZwMXkQT7Vjk', bio: 'Crypto enthusiast', bannerPhoto: '/placeholder.svg?height=60&width=240', twitterLink: 'https://twitter.com/alice' },
  { id: 2, name: 'Bob', avatar: '/placeholder.svg?height=32&width=32', solanaAddress: '3Kz7QNiQtGy2ckPsDRNbqXc8SvYjUwz1LRKTmVtsjwdj', bio: 'DeFi developer', bannerPhoto: '/placeholder.svg?height=60&width=240', twitterLink: 'https://twitter.com/bob' },
  { id: 3, name: 'Charlie', avatar: '/placeholder.svg?height=32&width=32', solanaAddress: '6Qm5CjuFge25xSKMbGhSEzHhNRvGERyDnGe4SbApXGZN', bio: 'NFT collector', bannerPhoto: '/placeholder.svg?height=60&width=240', twitterLink: 'https://twitter.com/charlie' },
  { id: 4, name: 'David', avatar: '/placeholder.svg?height=32&width=32', solanaAddress: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH', bio: 'Blockchain researcher', bannerPhoto: '/placeholder.svg?height=60&width=240', twitterLink: 'https://twitter.com/david' },
  { id: 5, name: 'Eve', avatar: '/placeholder.svg?height=32&width=32', solanaAddress: '2ZZkgKcBfp4tW8qCLj2yjxRYh9CuvEVJWb6e1XPDFfYp', bio: 'Crypto trader', bannerPhoto: '/placeholder.svg?height=60&width=240', twitterLink: 'https://twitter.com/eve' },
];

export function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState(initialOnlineUsers);
  const [favorites, setFavorites] = useState<User[]>([]);

  const toggleFavorite = (user: User) => {
    if (favorites.some(fav => fav.id === user.id)) {
      setFavorites(favorites.filter(fav => fav.id !== user.id));
    } else {
      setFavorites([...favorites, user]);
    }
  };

  const renderUserList = (users: User[], isFavoritesList: boolean = false) => (
    <>
      {users.map((user) => (
        <Popover key={user.id}>
          <PopoverTrigger asChild>
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors duration-200">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {user.name}
                </p>
              </div>
              {isFavoritesList && (
                <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
              )}
              {!isFavoritesList && (
                <div className="flex-shrink-0">
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
                </div>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <MiniProfile 
              user={{
                ...user,
                isFavorite: favorites.some(fav => fav.id === user.id),
                onToggleFavorite: () => toggleFavorite(user),
              }} 
            />
          </PopoverContent>
        </Popover>
      ))}
    </>
  );

  return (
    <ScrollArea className="h-[calc(100vh-120px)] md:h-[calc(100vh-180px)]">
      <div className="px-4 py-2 space-y-3">
        {favorites.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-1">Favorites ({favorites.length})</h3>
            <div className="max-h-[30vh] overflow-y-auto">
              {renderUserList(favorites, true)}
            </div>
          </div>
        )}
        <h3 className="text-lg font-semibold mb-1">Online Users ({onlineUsers.length})</h3>
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {renderUserList(onlineUsers)}
        </div>
      </div>
    </ScrollArea>
  );
}

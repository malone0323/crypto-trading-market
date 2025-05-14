'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Smile, Copy, Check, Reply } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CustomButton } from './ui/custom-button';
import dynamic from 'next/dynamic';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from '@/lib/utils';
import { ProfileSection } from './ProfileSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast, Toaster } from 'react-hot-toast';
import { ContextMenu, ContextMenuTrigger, ContextMenuItem, ContextMenuContent } from "@/components/ui/context-menu";
import { useChat } from '@/components/DappLayout';
import { OnlineUsers } from './OnlineUsers';
import { MiniProfile } from './MiniProfile';
import { useWallet } from '@/contexts/WalletContext';

const EmojiPicker = dynamic(() => import('./EmojiPicker'), { 
  ssr: false,
  loading: () => (
    <div className="p-4 flex items-center justify-center">
      <div className="animate-pulse">Loading emojis...</div>
    </div>
  )
});

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  profilePhoto?: string;
}

interface ProfileData {
  username: string;
  twitterLink: string;
  bio: string;
  profilePhoto: string;
  bannerPhoto: string;
  solanaAddress: string;
}


const ReplyMenu: React.FC<{ message: Message; onReply: (messageId: string) => void; children: React.ReactNode }> = ({ message, onReply, children }) => {
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleTouchStart = () => {
    const timer = setTimeout(() => {
      setShowMenu(true);
    }, 500); // 500ms long-press
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
    }
  };

  return (
    <ContextMenu open={showMenu} onOpenChange={setShowMenu}>
      <ContextMenuTrigger
        className="block long-press-menu"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onContextMenu={(e) => e.preventDefault()}
      >
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => {
          onReply(message.id);
          setShowMenu(false);
        }}>
          <Reply className="mr-2 h-4 w-4" />
          Reply
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};


export function HoldersChat() {
  const { isChatOpen, setIsChatOpen } = useChat();
  const { walletAddress } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState('chat');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const findMessageById = (id: string) => messages.find(msg => msg.id === id);

  const cancelReply = () => setReplyingTo(null);

  useEffect(() => {
    fetchMessages();
    fetchProfileData();
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isChatOpen && messages.length > 0) {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isChatOpen]);

  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isChatOpen, messages]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/chat');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      // Ensure each message has a profilePhoto, even if it's just a generated avatar
      const messagesWithPhotos = data.messages.map((msg: Message) => ({
        ...msg,
        profilePhoto: msg.profilePhoto || `https://avatar.vercel.sh/${msg.sender}.png`
      }));
      setMessages(messagesWithPhotos);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const fetchProfileData = async () => {
    if (!walletAddress) return;

    try {
      const response = await fetch(`/api/profile?address=${walletAddress}`);
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Set a default profile if fetch fails
      setProfileData({
        username: 'Anonymous',
        twitterLink: '',
        bio: 'No bio available',
        profilePhoto: '/placeholder.svg?height=100&width=100',
        bannerPhoto: '/placeholder.svg?height=200&width=600',
        solanaAddress: walletAddress,
      });
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchProfileData();
    }
  }, [walletAddress]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: profileData?.username || 'You',
      content: inputMessage,
      timestamp: new Date(),
      profilePhoto: profileData?.profilePhoto,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsEmojiPickerOpen(false);
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    setReplyingTo(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setInputMessage(prev => prev + emoji.native);
    setIsEmojiPickerOpen(false);
  };

  const saveProfile = async (data: ProfileData) => {
    if (!walletAddress) return;

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, walletAddress }),
      });

      if (!response.ok) throw new Error('Failed to save profile');
      
      setProfileData(data);
      // Update existing messages with the new profile photo
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.sender === data.username 
            ? { ...msg, profilePhoto: data.profilePhoto }
            : msg
        )
      );
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  };

  const handleOpenChange = useCallback((open: boolean) => {
    setIsChatOpen(open);
  }, [setIsChatOpen]);

  return (
    <>
      <Toaster position="bottom-right" />
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 md:w-[450px] bg-background/95 dark:bg-background/80 backdrop-blur-sm border-l border-border shadow-xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-border bg-background/50 dark:bg-background/30">
              <h2 className="text-xl font-bold">Holders Chat</h2>
              <CustomButton variant="ghost" size="sm" onClick={() => setIsChatOpen(false)}>
                <X className="h-6 w-6" />
              </CustomButton>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col overflow-hidden">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="profile">My Profile</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-grow flex flex-col overflow-hidden">
                <ScrollArea className="flex-grow px-4 overflow-y-auto bg-background/50 dark:bg-background/30">
                  <div className="space-y-4 py-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex items-start gap-3",
                          message.sender === (profileData?.username || 'You') && "flex-row-reverse"
                        )}
                      >
                        <ReplyMenu message={message} onReply={(messageId) => setReplyingTo(messageId)} >
                          <Popover>
                            <PopoverTrigger asChild>
                              <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage src={message.profilePhoto || `https://avatar.vercel.sh/${message.sender || 'anonymous'}.png`} />
                                <AvatarFallback>{message.sender ? message.sender[0] : 'A'}</AvatarFallback>
                              </Avatar>
                            </PopoverTrigger>
                            <PopoverContent side="top" align="start" className="w-80 p-0">
                              <MiniProfile user={{
                                name: message.sender || 'Anonymous',
                                avatar: message.profilePhoto || `https://avatar.vercel.sh/${message.sender || 'anonymous'}.png`,
                                solanaAddress: '7fUAJdStEuGbc3sM84cKqdJNSEeyB7K46ZwMXkQT7Vjk', // This should be fetched from your backend in a real application
                                bio: 'Passionate about blockchain and decentralized finance.', // This should be fetched from your backend
                                bannerPhoto: '/placeholder.svg?height=60&width=240', // This should be fetched from your backend
                                twitterLink: `https://twitter.com/${message.sender?.toLowerCase() || 'anonymous'}`, // This should be fetched from your backend
                              }} />
                            </PopoverContent>
                          </Popover>
                        </ReplyMenu>
                        <div className={cn(
                          "flex flex-col",
                          message.sender === (profileData?.username || 'You') && "items-end"
                        )}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{message.sender || 'Anonymous'}</span>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(message.timestamp), 'h:mm a')}
                            </span>
                          </div>
                          <div className={cn(
                            "mt-1 rounded-2xl px-4 py-2 max-w-[80%]",
                            message.sender === (profileData?.username || 'You')
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted dark:bg-gray-700 text-foreground"
                          )}>
                            {message.content}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                </ScrollArea>

                <form onSubmit={sendMessage} className="p-4 border-t border-border bg-background/50 dark:bg-background/30">
                  {replyingTo && (
                    <div className="mb-2 p-2 bg-muted rounded-lg flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Replying to: {messages.find(m => m.id === replyingTo)?.content.substring(0, 20)}...
                      </div>
                      <button onClick={() => setReplyingTo(null)} className="text-primary hover:text-primary/80">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <div className="relative flex-grow">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="pr-10 bg-background dark:bg-gray-800 text-foreground"
                      />
                      <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                        <PopoverTrigger asChild>
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-foreground hover:text-primary transition-colors"
                          >
                            <Smile className="h-5 w-5" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 p-0" side="top">
                          <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <CustomButton type="submit" variant="gold">
                      <Send className="h-4 w-4" />
                    </CustomButton>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="profile" className="flex-grow overflow-auto p-4">
                <ProfileSection initialData={profileData} onSave={saveProfile} />
              </TabsContent>
              <TabsContent value="online" className="flex-grow overflow-hidden">
                <OnlineUsers />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-20 sm:bottom-4 right-4 z-50"
          >
            <div className="relative">
              <CustomButton
                variant="gold"
                size="lg"
                className="rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageSquare className="h-6 w-6" />
              </CustomButton>
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

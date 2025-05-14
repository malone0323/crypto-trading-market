'use client'

import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { CustomButton } from '@/components/ui/custom-button';
import { Progress } from "@/components/ui/progress"
import { CountdownTimer } from '@/components/CountdownTimer';
import Image from 'next/image';
import { theme } from '@/lib/theme';
import { Sparkles, AlertCircle, CheckCircle, Info, LinkIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DappLayout } from '@/components/DappLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from 'react-hot-toast';
import { useTheme } from 'next-themes';

const initialRewardsData = {
  staking: {
    available: 500,
    nextDistribution: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    history: [
      { date: '2023-12-01', amount: 100 },
      { date: '2023-11-15', amount: 150 },
      { date: '2023-11-01', amount: 200 },
    ],
    nftRewards: [
      { id: 1, name: 'Silver Coin', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver%20coin-sQHOhvs2WfCyMrpmiXSJnLEeAMzlL2.png' },
      { id: 2, name: 'Gold Bar', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold%20bar-wFwllIwVx0OKPkH0s3UNW37BotWmDx.png' },
    ]
  },
  trading: {
    available: 300,
    nextDistribution: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    history: [
      { date: '2023-12-05', amount: 50 },
      { date: '2023-11-20', amount: 75 },
      { date: '2023-11-05', amount: 100 },
    ]
  },
  social: {
    tasks: [
      { id: 1, type: 'join', platform: 'Discord', reward: 50, link: 'https://discord.gg/example', completed: false },
      { id: 2, type: 'retweet', platform: 'Twitter', reward: 25, link: 'https://twitter.com/example', completed: false },
      { id: 3, type: 'follow', platform: 'Instagram', reward: 75, link: 'https://instagram.com/example', completed: false },
    ]
  }
};

// Mock function to check if the connected wallet is whitelisted
const isWalletWhitelisted = (address: string) => {
  // In a real application, this would check against a database or smart contract
  const whitelistedAddresses = ['0x1234...5678', '0xabcd...efgh'];
  return whitelistedAddresses.includes(address);
};

const RewardSection: React.FC<{ 
  type: 'staking' | 'trading' | 'social'; 
  data: typeof initialRewardsData[keyof typeof initialRewardsData];
  onClaim: () => void;
  claimedGoals: number[];
  setClaimedGoals: React.Dispatch<React.SetStateAction<number[]>>;
  handleClaimGoal: (index: number) => Promise<void>;
}> = ({ type, data, onClaim, claimedGoals, setClaimedGoals, handleClaimGoal }) => {
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [verifyingTaskId, setVerifyingTaskId] = useState<number | null>(null);
  const [taskErrors, setTaskErrors] = useState<{ [key: number]: string }>({});

  const handleClaim = async () => {
    setIsClaiming(true);
    setClaimStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onClaim();
      setClaimStatus('success');
    } catch (error) {
      console.error('Error claiming rewards:', error);
      setClaimStatus('error');
    } finally {
      setIsClaiming(false);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    setVerifyingTaskId(taskId);
    setTaskErrors(prev => ({ ...prev, [taskId]: '' }));
    try {
      // Verify if the user's wallet is linked to their X account
      const isWalletLinked = await verifyWalletLinkage();
      if (!isWalletLinked) {
        throw new Error('Wallet is not linked to X account');
      }

      // Verify if the user has completed all three tasks
      const tasksCompleted = await verifyTwitterTasks();
      if (!tasksCompleted) {
        throw new Error('Not all required tasks are completed');
      }

      // If all verifications pass, proceed with task completion
      setSocialTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
      toast.success('Task completed successfully!');
    } catch (error) {
      console.error('Error completing task:', error);
      setTaskErrors(prev => ({ ...prev, [taskId]: error.message }));
      toast.error(error.message);
    } finally {
      setVerifyingTaskId(null);
    }
  };


  if (type === 'social') {
    return (
      <div className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold">Social Tasks</h3>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="mb-4 flex flex-col items-center">
            <div className="w-full max-w-xl bg-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-gray-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-bold">@CryptoMetalCoin</p>
                  <p className="text-sm text-gray-400">2h ago</p>
                </div>
              </div>
              <p className="mb-2">Check out our latest update on the Metal Commodity Market! Don't forget to like, repost, and comment to earn your $METAL rewards. #CryptoMetal #Rewards</p>
              <div className="w-full h-48 bg-gray-600 rounded-lg"></div>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Like</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Repost</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Comment</span>
              </div>
            </div>
            <CustomButton
              variant="gold"
              className="w-full"
              onClick={() => handleCompleteTask(1)}
            >
              Complete Task
            </CustomButton>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'trading') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl sm:text-2xl font-bold capitalize mb-2 sm:mb-0">Trading Rewards</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Earn rewards by hitting trading volume goals!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="text-2xl sm:text-3xl font-bold">{data.available} $METAL</div>
          <CustomButton 
            variant="gold" 
            onClick={handleClaim}
            disabled={isClaiming || data.available === 0}
            className="w-full sm:w-auto"
          >
            {isClaiming ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                Claiming...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Claim Rewards
              </>
            )}
          </CustomButton>
        </div>

        {claimStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert className="bg-green-900 border-green-500">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                You've successfully claimed your trading rewards!
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {claimStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert className="bg-red-900 border-red-500">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to claim rewards. Please try again later.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <div>
          <h4 className="text-lg font-semibold mb-4">Trading Goals</h4>
          <div className="space-y-4">
            {[
              { goal: 'Weekly Volume: $1,000', reward: 50, progress: 75, current: 750, target: 1000, completed: true },
              { goal: 'Monthly Volume: $10,000', reward: 200, progress: 60, current: 6000, target: 10000, completed: false },
              { goal: 'Consecutive Daily Trades: 7 days', reward: 100, progress: 85, current: 6, target: 7, completed: false },
            ].map((item, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>{item.goal}</span>
                  <span className="text-primary font-bold">{item.reward} $METAL</span>
                </div>
                <Progress value={item.progress} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-400">${item.current.toLocaleString()} / ${item.target.toLocaleString()}</p>
                  {item.completed && !claimedGoals.includes(index) && (
                    <CustomButton
                      variant="gold"
                      size="sm"
                      onClick={() => handleClaimGoal(index)}
                      className="transition-all duration-300 transform active:scale-95 hover:brightness-110"
                      disabled={claimedGoals.includes(index)}
                    >
                      {claimedGoals.includes(index) ? (
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Claimed
                        </span>
                      ) : (
                        'Claim Reward'
                      )}
                    </CustomButton>
                  )}
                  {claimedGoals.includes(index) && (
                    <span className="text-green-500 font-semibold">Reward Claimed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Next Distribution</h4>
          <CountdownTimer targetDate={data.nextDistribution} />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Claim History</h4>
          <ul className="space-y-2">
            {data.history.map((claim, index) => (
              <li key={index} className="flex justify-between items-center text-sm sm:text-base">
                <span>{claim.date}</span>
                <span>{claim.amount} $METAL</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl sm:text-2xl font-bold capitalize mb-2 sm:mb-0">{type} Rewards</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>These are your rewards from {type}. Claim them to add to your balance!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="text-2xl sm:text-3xl font-bold">{data.available} $METAL</div>
        <CustomButton 
          variant="gold" 
          onClick={handleClaim}
          disabled={isClaiming || data.available === 0}
          className="w-full sm:w-auto"
        >
          {isClaiming ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              Claiming...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Claim Rewards
            </>
          )}
        </CustomButton>
      </div>

      {claimStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Alert className="bg-green-900 border-green-500">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              You've successfully claimed your {type} rewards!
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {claimStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Alert className="bg-red-900 border-red-500">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to claim rewards. Please try again later.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {type === 'staking' && data.nftRewards && data.nftRewards.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-2">NFT Rewards</h4>
          <div className="flex space-x-4">
            {data.nftRewards.map((nft) => (
              <div key={nft.id} className="bg-gray-800 p-2 rounded-lg">
                <Image src={nft.image} alt={nft.name} width={100} height={100} className="rounded-md" />
                <p className="text-center mt-2">{nft.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-lg font-semibold mb-2">Next Distribution</h4>
        <CountdownTimer targetDate={data.nextDistribution} />
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2">Claim History</h4>
        <ul className="space-y-2">
          {data.history.map((claim, index) => (
            <li key={index} className="flex justify-between items-center text-sm sm:text-base">
              <span>{claim.date}</span>
              <span>{claim.amount} $METAL</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AdminPanelContent: React.FC<{rewardsData: typeof initialRewardsData}> = ({rewardsData}) => {
  const [tasks, setTasks] = useState(rewardsData.social.tasks);

  const handleTaskUpdate = (id: number, updates: Partial<typeof tasks[0]>) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updates } : task));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl sm:text-2xl font-bold">Admin Panel</h3>
      {tasks.map((task) => (
        <div key={task.id} className="bg-gray-800 p-4 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`type-${task.id}`}>Type</Label>
              <Input
                id={`type-${task.id}`}
                value={task.type}
                onChange={(e) => handleTaskUpdate(task.id, { type: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor={`platform-${task.id}`}>Platform</Label>
              <Input
                id={`platform-${task.id}`}
                value={task.platform}
                onChange={(e) => handleTaskUpdate(task.id, { platform: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor={`reward-${task.id}`}>Reward</Label>
              <Input
                id={`reward-${task.id}`}
                type="number"
                value={task.reward}
                onChange={(e) => handleTaskUpdate(task.id, { reward: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor={`link-${task.id}`}>Link</Label>
              <Input
                id={`link-${task.id}`}
                value={task.link}
                onChange={(e) => handleTaskUpdate(task.id, { link: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <CustomButton variant="gold" onClick={() => console.log('Saving changes...', tasks)} className="w-full">
        Save Changes
      </CustomButton>
    </div>
  );
};

export default function Rewards() {
  const [activeTab, setActiveTab] = useState('staking');
  const [rewardsData, setRewardsData] = useState(initialRewardsData);
  const [claimedNFTs, setClaimedNFTs] = useState<Array<{ id: number; name: string; image: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socialTasks, setSocialTasks] = useState(initialRewardsData.social.tasks);
  const [verifyingTaskId, setVerifyingTaskId] = useState<number | null>(null);
  const [taskErrors, setTaskErrors] = useState<{ [key: number]: string }>({});
  const [claimedGoals, setClaimedGoals] = useState<number[]>([]);
  const { theme } = useTheme();

  const totalRewards = Object.values(rewardsData).reduce((sum, reward) => {
    if ('available' in reward) {
      return sum + reward.available;
    } 
    return sum;
  }, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Remove any existing Twitter embed scripts
    const existingScript = document.getElementById('twitter-embed-script');
    if (existingScript) {
      existingScript.remove();
    }

    // Create a new script element
    const script = document.createElement('script');
    script.id = 'twitter-embed-script';
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    
    // Set up a callback to run after the script loads
    script.onload = () => {
      // @ts-ignore
      if (window.twttr) {
        // @ts-ignore
        window.twttr.widgets.createTweet(
          '1234567890', // Replace with your actual tweet ID
          document.getElementById('twitter-embed'),
          {
            theme: theme?.resolvedTheme === 'dark' ? 'dark' : 'light',
            align: 'center'
          }
        );
      }
    };

    // Append the script to the document
    document.body.appendChild(script);

    // Clean up function
    return () => {
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [theme?.resolvedTheme]); // Update dependency array

  const handleClaim = (type: 'staking' | 'trading' | 'social') => {
    setRewardsData(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        ...(type === 'staking' || type === 'trading' || type === 'social' ? { available: 0 } : {}),
        ...(type === 'staking' ? { nftRewards: [] } : {}),
      }
    }));
    if (type === 'staking') {
      setClaimedNFTs(prev => [...prev, ...rewardsData.staking.nftRewards]);
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    setVerifyingTaskId(taskId);
    setTaskErrors(prev => ({ ...prev, [taskId]: '' }));
    try {
      // Verify if the user's wallet is linked to their X account
      const isWalletLinked = await verifyWalletLinkage();
      if (!isWalletLinked) {
        throw new Error('Wallet is not linked to X account');
      }

      // Verify if the user has completed all three tasks
      const tasksCompleted = await verifyTwitterTasks();
      if (!tasksCompleted) {
        throw new Error('Not all required tasks are completed');
      }

      // If all verifications pass, proceed with task completion
      setSocialTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );
      toast.success('Task completed successfully!');
    } catch (error) {
      console.error('Error completing task:', error);
      setTaskErrors(prev => ({ ...prev, [taskId]: error.message }));
      toast.error(error.message);
    } finally {
      setVerifyingTaskId(null);
    }
  };

  const verifyWalletLinkage = async () => {
    // Implement the logic to verify if the wallet is linked to the X account
    // This is a placeholder and should be replaced with actual implementation
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  };

  const verifyTwitterTasks = async () => {
    // Implement the logic to verify if the user has liked, reposted, and commented
    // This is a placeholder and should be replaced with actual implementation
    return new Promise(resolve => setTimeout(() => resolve(true), 1000));
  };

  const handleClaimGoal = async (index: number) => {
    setClaimedGoals(prev => [...prev, index]);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Reward claimed for goal ${index + 1}`);
    } catch (error) {
      console.error('Error claiming reward:', error);
      toast.error('Failed to claim reward. Please try again.');
      setClaimedGoals(prev => prev.filter(i => i !== index));
    }
  };

  return (
    <DappLayout>
      <div className="space-y-6 pb-16 pt-24">
        <main className="max-w-[1600px] mx-auto px-2 sm:px-4">
          <h1 className="text-4xl font-bold mb-8">Claim Your Rewards</h1>

          <GlassCard className="mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between p-6">
              <div className="mb-6 sm:mb-0 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Total Rewards Available</h2>
                <p className="text-4xl sm:text-5xl font-bold" style={{ color: theme?.resolvedTheme === 'dark' ? '#FFD700' : '#B8860B' }}>{totalRewards} $METAL</p>
              </div>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 dark:text-gray-700"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-primary"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - totalRewards / 1000)}`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="46"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{Math.round((totalRewards / 1000) * 100)}%</span>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-4"> {/* Changed to 3 columns */}
                <TabsTrigger value="staking">Staking</TabsTrigger>
                <TabsTrigger value="trading">Trading</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
              <TabsContent value="staking">
                <RewardSection 
                  type="staking" 
                  data={rewardsData.staking} 
                  onClaim={() => handleClaim('staking')} 
                  claimedGoals={claimedGoals}
                  setClaimedGoals={setClaimedGoals}
                  handleClaimGoal={handleClaimGoal}
                />
              </TabsContent>
              <TabsContent value="trading">
                <RewardSection 
                  type="trading" 
                  data={rewardsData.trading} 
                  onClaim={() => handleClaim('trading')} 
                  claimedGoals={claimedGoals}
                  setClaimedGoals={setClaimedGoals}
                  handleClaimGoal={handleClaimGoal}
                />
              </TabsContent>
              <TabsContent value="social">
                <RewardSection 
                  type="social" 
                  data={rewardsData.social} 
                  onClaim={() => handleClaim('social')} 
                  claimedGoals={claimedGoals}
                  setClaimedGoals={setClaimedGoals}
                  handleClaimGoal={handleClaimGoal}
                />
              </TabsContent>
            </Tabs>
          </GlassCard>

          {claimedNFTs.length > 0 && (
            <GlassCard className="mt-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Claimed NFTs</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {claimedNFTs.map((nft) => (
                  <div key={nft.id} className="bg-gray-800 p-2 rounded-lg">
                    <Image src={nft.image} alt={nft.name} width={100} height={100} className="rounded-md w-full h-auto" />
                    <p className="text-center mt-2 text-sm sm:text-base">{nft.name}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </main>
      </div>
    </DappLayout>
  );
}

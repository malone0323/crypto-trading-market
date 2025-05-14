'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Progress } from "@/components/ui/progress"
import { CustomButton } from '@/components/ui/custom-button';
import Image from 'next/image';
import { AlertCircle, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { theme } from '@/lib/theme';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from 'react-hot-toast';

interface MetalTier {
  metal: string;
  multiplier: string;
  img: string;
  weight: number;
  kiloNFTImg: string;
  kiloNFTQuantity: number;
}

interface SocialTask {
  id: string;
  platform: string;
  task: string;
  reward: number;
  completed: boolean;
  link: string;
}

interface MetalTiersCardProps {
  onKiloNFTClaimed: (metal: string, quantity: number) => void;
}

const metalTiers: MetalTier[] = [
  { 
    metal: 'Silver', 
    multiplier: '1.08x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-h8hs6zZ50jWVXP68omdHCsjg4Zu2o2.png',
    weight: 250,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silver-NF56mlQjpAeTh3CdDDHlHRmPKdFcVd.png',
    kiloNFTQuantity: 0
  },
  { 
    metal: 'Gold', 
    multiplier: '1.15x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-ZYZMcwJOcE322vP3EcWzZJqsXpZtdI.png',
    weight: 100,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gold-MRbxj8GEO4ghQfodmL8Rk9LAwCsEBb.png',
    kiloNFTQuantity: 0
  },
  { 
    metal: 'Platinum', 
    multiplier: '1.22x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platnium-BEogPuww4BOootX6jzaXqtu0xTt6cT.png',
    weight: 50,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/platinum-ab4eYzhF1NGjxdjUwuGkdnzMzosVnW.png',
    kiloNFTQuantity: 0
  },
  { 
    metal: 'Palladium', 
    multiplier: '1.30x', 
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-wp8fTVX2i5qL8z32lkb8gFs7QGCPqV.png',
    weight: 25,
    kiloNFTImg: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/palladium-YsmCxw5aXBXbodA66CNwPuHwk1BUlF.png',
    kiloNFTQuantity: 0
  },
];

const socialTasks: SocialTask[] = [
  {
    id: 'task1',
    platform: 'Twitter',
    task: 'Like and Retweet our latest post',
    reward: 10,
    completed: false,
    link: 'https://twitter.com/metalcommodity/status/1234567890',
  },
  {
    id: 'task2',
    platform: 'Discord',
    task: 'Join our Discord server and say hello',
    reward: 15,
    completed: false,
    link: 'https://discord.gg/metalcommodity',
  },
  {
    id: 'task3',
    platform: 'Telegram',
    task: 'Join our Telegram group and share your thoughts',
    reward: 20,
    completed: false,
    link: 'https://t.me/metalcommodity',
  },
];

export function MetalTiersCard({ onKiloNFTClaimed }: MetalTiersCardProps) {
  const [tiers, setTiers] = useState(metalTiers);
  const [claimStatus, setClaimStatus] = useState<{ [key: string]: 'idle' | 'success' | 'error' }>({});
  const [claimingMetal, setClaimingMetal] = useState<MetalTier | null>(null);
  const [claimAmount, setClaimAmount] = useState<number>(0);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [tasks, setTasks] = useState(socialTasks);

  const handleClaim = async (metal: string) => {
    setClaimStatus(prev => ({ ...prev, [metal]: 'idle' }));

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.1) {
            reject(new Error('Network error: Failed to claim NFT'));
          } else {
            resolve(true);
          }
        }, 1500);
      });

      setClaimStatus(prev => ({ ...prev, [metal]: 'success' }));
      setTiers(prevTiers => 
        prevTiers.map(tier => 
          tier.metal === metal 
          ? { ...tier, weight: tier.weight - (claimAmount * 1000), kiloNFTQuantity: tier.kiloNFTQuantity + claimAmount } 
          : tier
        )
      );
      onKiloNFTClaimed(metal, claimAmount);
      setIsClaimDialogOpen(false);
    } catch (error) {
      console.error('Error claiming NFT:', error);
      setClaimStatus(prev => ({ ...prev, [metal]: 'error' }));
    }
  };

  const openClaimDialog = (tier: MetalTier) => {
    setClaimingMetal(tier);
    setClaimAmount(Math.floor(tier.weight / 1000)); // Set default to max claimable amount
    setIsClaimDialogOpen(true);
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      // Simulate API call to verify task completion
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: true } : task
        )
      );

      // Update the metal weights based on the completed task
      const completedTask = tasks.find((task) => task.id === taskId);
      if (completedTask) {
        setTiers((prevTiers) => {
          const updatedTiers = [...prevTiers];
          const randomIndex = Math.floor(Math.random() * updatedTiers.length);
          updatedTiers[randomIndex].weight += completedTask.reward;
          return updatedTiers;
        });
      }

      toast.success('Task completed successfully!');
    } catch (error) {
      console.error('Error completing task:', error);
      toast.error('Failed to complete task. Please try again.');
      
      // Revert the checkbox state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: false } : task
        )
      );
    }
  };

  return (
    <GlassCard title="Metal Tiers and Reward Multipliers" className="mb-8 text-white dark:text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <motion.div
            key={tier.metal}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            <div 
              className="p-4"
              style={{ background: `linear-gradient(45deg, ${theme.colors[tier.metal.toLowerCase()]}, transparent)` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={tier.img}
                  alt={`${tier.metal} icon`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h3 className="text-lg font-bold">{tier.metal}</h3>
                  <p className="text-sm">Multiplier: {tier.multiplier}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to 1kg Kilo NFT</span>
                  <span>{tier.weight.toFixed(2)}g / 1000g</span>
                </div>
                <Progress 
                  value={(tier.weight / 1000) * 100} 
                  className="h-2"
                />
              </div>
            </div>
            <div className="p-4 space-y-4">
              {tier.weight >= 1000 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <CustomButton 
                    variant="gold" 
                    className="w-full"
                    onClick={() => openClaimDialog(tier)}
                    disabled={claimStatus[tier.metal] === 'idle'}
                  >
                    {claimStatus[tier.metal] === 'idle' ? 'Claiming...' : 'Claim Kilo NFT'}
                  </CustomButton>
                </motion.div>
              )}
              {claimStatus[tier.metal] === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert className="bg-green-900 border-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                      You've claimed a {tier.metal} Kilo NFT! (Total: {tier.kiloNFTQuantity})
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
              {claimStatus[tier.metal] === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Alert className="bg-red-900 border-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Failed to claim NFT. Please try again.
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <GlassCard title="Social Tasks" className="mt-8">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <Checkbox
                  id={task.id}
                  checked={task.completed}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      handleCompleteTask(task.id);
                    }
                  }}
                />
                <div>
                  <label htmlFor={task.id} className="font-medium">{task.task}</label>
                  <p className="text-sm text-gray-400">{task.platform} - Reward: {task.reward} $METAL</p>
                </div>
              </div>
              <a
                href={task.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          ))}
        </div>
      </GlassCard>

      <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Claim {claimingMetal?.metal} Kilo NFT</DialogTitle>
            <DialogDescription>
              Select how many Kilo NFTs you want to claim. Each Kilo NFT requires 1000g of {claimingMetal?.metal}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="claimAmount">Number of Kilo NFTs to claim:</Label>
            <Input
              id="claimAmount"
              type="number"
              value={claimAmount}
              onChange={(e) => setClaimAmount(Math.min(Math.floor(claimingMetal?.weight ?? 0 / 1000), parseInt(e.target.value)))}
              max={Math.floor(claimingMetal?.weight ?? 0 / 1000)}
              min={1}
            />
          </div>
          <DialogFooter>
            <CustomButton variant="secondary" onClick={() => setIsClaimDialogOpen(false)}>
              Cancel
            </CustomButton>
            <CustomButton 
              variant="gold" 
              onClick={() => claimingMetal && handleClaim(claimingMetal.metal)}
              disabled={!claimAmount || claimAmount <= 0}
            >
              Claim {claimAmount} Kilo NFT{claimAmount > 1 ? 's' : ''}
            </CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </GlassCard>
  );
}

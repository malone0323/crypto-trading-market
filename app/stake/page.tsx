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
import { DappLayout } from '@/components/DappLayout';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { DynamicStakingRewards } from '@/components/DynamicStakingRewards';

// Mock data for user's staking position
const userStakingData = {
  totalStaked: 10000,
  totalRewards: 500,
  apr: 12.5,
};

export default function Stake() {
  const router = useRouter();
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimStatus, setClaimStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [rewards, setRewards] = useState(userStakingData.totalRewards);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [stakeStatus, setStakeStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [totalStaked, setTotalStaked] = useState(userStakingData.totalStaked);
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [unstakeStatus, setUnstakeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleClaimRewards = async () => {
    setIsClaiming(true);
    setClaimStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate a 10% chance of failure
          if (Math.random() < 0.1) {
            reject(new Error('Failed to claim rewards'));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      // If successful, update the state
      setClaimStatus('success');
      setRewards(0);
    } catch (error) {
      console.error('Error claiming rewards:', error);
      setClaimStatus('error');
    } finally {
      setIsClaiming(false);
    }
  };

  const handleStake = async () => {
    if (!stakeAmount || isNaN(Number(stakeAmount)) || Number(stakeAmount) <= 0) {
      setStakeStatus('error');
      return;
    }

    setIsStaking(true);
    setStakeStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate a 10% chance of failure
          if (Math.random() < 0.1) {
            reject(new Error('Failed to stake $METAL'));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      // If successful, update the state
      setStakeStatus('success');
      setTotalStaked(prevTotal => prevTotal + Number(stakeAmount));
      setStakeAmount('');
    } catch (error) {
      console.error('Error staking $METAL:', error);
      setStakeStatus('error');
    } finally {
      setIsStaking(false);
    }
  };

  const handleUnstake = async () => {
    if (!unstakeAmount || isNaN(Number(unstakeAmount)) || Number(unstakeAmount) <= 0 || Number(unstakeAmount) > totalStaked) {
      setUnstakeStatus('error');
      return;
    }

    setIsUnstaking(true);
    setUnstakeStatus('idle');

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate a 10% chance of failure
          if (Math.random() < 0.1) {
            reject(new Error('Failed to unstake $METAL'));
          } else {
            resolve(true);
          }
        }, 2000);
      });

      // If successful, update the state
      setUnstakeStatus('success');
      setTotalStaked(prevTotal => prevTotal - Number(unstakeAmount));
      setUnstakeAmount('');
    } catch (error) {
      console.error('Error unstaking $METAL:', error);
      setUnstakeStatus('error');
    } finally {
      setIsUnstaking(false);
    }
  };

  return (
    <DappLayout>
      <div className="min-h-screen pb-16 pt-24">
        <main className="flex-grow container mx-auto px-2 max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staking Overview */}
            <GlassCard title="Staking Overview">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Staked:</span>
                  <span className="text-2xl font-bold">{totalStaked} $METAL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Rewards:</span>
                  <span className="text-2xl font-bold text-green-500">{rewards} $METAL</span>
                </div>
                <CustomButton 
                  variant="gold" 
                  className="w-full mt-4" 
                  onClick={handleClaimRewards}
                  disabled={isClaiming || rewards === 0}
                >
                  {isClaiming ? 'Claiming...' : 'Claim Rewards'}
                </CustomButton>
                {claimStatus === 'success' && (
                  <Alert className="mt-4 bg-green-900 border-green-500">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                      Your rewards have been successfully claimed.
                    </AlertDescription>
                  </Alert>
                )}
                {claimStatus === 'error' && (
                  <Alert className="mt-4 bg-red-900 border-red-500">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Failed to claim rewards. Please try again later.
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-between items-center">
                  <span>Current APR:</span>
                  <span className="text-2xl font-bold text-yellow-500">{userStakingData.apr}%</span>
                </div>
              </div>
            </GlassCard>

            {/* Manage $METAL card */}
            <GlassCard title="Manage $METAL">
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="unstake">Unstake</TabsTrigger>
                </TabsList>
                <TabsContent value="stake">
                  <div className="space-y-4">
                    <Input 
                      type="number" 
                      placeholder="Amount of $METAL to stake" 
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                    <CustomButton 
                      variant="gold" 
                      className="w-full"
                      onClick={handleStake}
                      disabled={isStaking || !stakeAmount}
                    >
                      {isStaking ? 'Staking...' : 'Stake $METAL'}
                    </CustomButton>
                    {stakeStatus === 'success' && (
                      <Alert className="mt-4 bg-green-900 border-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                          Your $METAL has been successfully staked.
                        </AlertDescription>
                      </Alert>
                    )}
                    {stakeStatus === 'error' && (
                      <Alert className="mt-4 bg-red-900 border-red-500">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          Failed to stake $METAL. Please try again later.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="unstake">
                  <div className="space-y-4">
                    <Input 
                      type="number" 
                      placeholder="Amount of $METAL to unstake" 
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                    />
                    <CustomButton 
                      variant="secondary" 
                      className="w-full"
                      onClick={handleUnstake}
                      disabled={isUnstaking || !unstakeAmount || Number(unstakeAmount) > totalStaked}
                    >
                      {isUnstaking ? 'Unstaking...' : 'Unstake $METAL'}
                    </CustomButton>
                    {unstakeStatus === 'success' && (
                      <Alert className="mt-4 bg-green-900 border-green-500">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>
                          Your $METAL has been successfully unstaked.
                        </AlertDescription>
                      </Alert>
                    )}
                    {unstakeStatus === 'error' && (
                      <Alert className="mt-4 bg-red-900 border-red-500">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          Failed to unstake $METAL. Please try again later.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </GlassCard>
          </div>
          <div className="mt-6">
            <DynamicStakingRewards />
          </div>
        </main>
      </div>
    </DappLayout>
  );
}

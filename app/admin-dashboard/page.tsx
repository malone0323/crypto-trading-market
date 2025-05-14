'use client'

import React, { useState } from 'react';
import { DappLayout } from '@/components/DappLayout';
import { GlassCard } from '@/components/ui/glass-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WhitelistManagement } from '@/components/admin/WhitelistManagement';
import { RewardManagement } from '@/components/admin/RewardManagement';
import { TaskConfirmation } from '@/components/admin/TaskConfirmation';
import { AdminDashboardOverview } from '@/components/admin/AdminDashboardOverview';

// Mock data for rewards (you should replace this with real data in a production app)
const mockRewardsData = {
  staking: {
    nftRewards: [
      { id: 'staking-1', name: 'Silver Coin', image: '/placeholder.svg?height=100&width=100' },
      { id: 'staking-2', name: 'Gold Bar', image: '/placeholder.svg?height=100&width=100' },
    ]
  },
  social: {
    tasks: [
      { id: 'social-1', type: 'like', platform: 'X', reward: 50, link: 'https://x.com/example/status/123456789', completed: false },
      { id: 'social-2', type: 'repost', platform: 'X', reward: 100, link: 'https://x.com/example/status/987654321', completed: false },
      { id: 'social-3', type: 'comment', platform: 'X', reward: 75, link: 'https://x.com/example/status/456789123', completed: false },
    ]
  }
};

export default function AdminDashboard() {
  const [rewardsData, setRewardsData] = useState(mockRewardsData);

  return (
    <DappLayout>
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <GlassCard>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="whitelist">Whitelist</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <AdminDashboardOverview />
            </TabsContent>
            <TabsContent value="whitelist">
              <WhitelistManagement />
            </TabsContent>
            <TabsContent value="rewards">
              <RewardManagement rewardsData={rewardsData} />
            </TabsContent>
            <TabsContent value="tasks">
              <TaskConfirmation tasks={rewardsData.social.tasks} />
            </TabsContent>
          </Tabs>
        </GlassCard>
      </main>
    </DappLayout>
  );
}

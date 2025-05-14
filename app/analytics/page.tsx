'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DappLayout } from '@/components/DappLayout';
import { GlassCard } from '@/components/ui/glass-card';
import { PerformanceChart } from '@/components/PerformanceChart';
import { Leaderboard } from '@/components/Leaderboard';
import { theme } from '@/lib/theme';

// Mock data for charts (unchanged)
const metalPricesData = [
  { date: '2023-01', Silver: 22, Gold: 1800, Platinum: 1000, Palladium: 1700 },
  { date: '2023-02', Silver: 23, Gold: 1850, Platinum: 1050, Palladium: 1750 },
  { date: '2023-03', Silver: 24, Gold: 1900, Platinum: 1100, Palladium: 1800 },
  { date: '2023-04', Silver: 25, Gold: 1950, Platinum: 1150, Palladium: 1850 },
  { date: '2023-05', Silver: 26, Gold: 2000, Platinum: 1200, Palladium: 1900 },
  { date: '2023-06', Silver: 27, Gold: 2050, Platinum: 1250, Palladium: 1950 },
];

const tradingVolumeData = [
  { date: '2023-01', volume: 1000000 },
  { date: '2023-02', volume: 1200000 },
  { date: '2023-03', volume: 1500000 },
  { date: '2023-04', volume: 1800000 },
  { date: '2023-05', volume: 2200000 },
  { date: '2023-06', volume: 2500000 },
];

const tvlGrowthData = [
  { date: '2023-01', tvl: 5000000 },
  { date: '2023-02', tvl: 6000000 },
  { date: '2023-03', tvl: 7500000 },
  { date: '2023-04', tvl: 9000000 },
  { date: '2023-05', tvl: 11000000 },
  { date: '2023-06', tvl: 13000000 },
];

const stakingRewardsData = [
  { date: '2023-01', rewards: 50000 },
  { date: '2023-02', rewards: 60000 },
  { date: '2023-03', rewards: 75000 },
  { date: '2023-04', rewards: 90000 },
  { date: '2023-05', rewards: 110000 },
  { date: '2023-06', rewards: 130000 },
];

// Mock data for leaderboards (unchanged)
const topHoldersData = [
  { rank: 1, address: '0x1234...5678', weight: 10000 },
  { rank: 2, address: '0xabcd...efgh', weight: 9500 },
  { rank: 3, address: '0x9876...5432', weight: 9000 },
  { rank: 4, address: '0xijkl...mnop', weight: 8500 },
  { rank: 5, address: '0xqrst...uvwx', weight: 8000 },
];

const highestMultipliersData = [
  { rank: 1, address: '0x2468...1357', multiplier: 2.5 },
  { rank: 2, address: '0xfedc...ba98', multiplier: 2.4 },
  { rank: 3, address: '0x1357...2468', multiplier: 2.3 },
  { rank: 4, address: '0xabcd...1234', multiplier: 2.2 },
  { rank: 5, address: '0x9876...dcba', multiplier: 2.1 },
];

const mostValuableCollectionsData = [
  { rank: 1, address: '0x1111...2222', value: 500000 },
  { rank: 2, address: '0x3333...4444', value: 450000 },
  { rank: 3, address: '0x5555...6666', value: 400000 },
  { rank: 4, address: '0x7777...8888', value: 350000 },
  { rank: 5, address: '0x9999...0000', value: 300000 },
];

const mostActiveTraders = [
  { rank: 1, address: '0xaaaa...bbbb', trades: 500 },
  { rank: 2, address: '0xcccc...dddd', trades: 450 },
  { rank: 3, address: '0xeeee...ffff', trades: 400 },
  { rank: 4, address: '0xgggg...hhhh', trades: 350 },
  { rank: 5, address: '0xiiii...jjjj', trades: 300 },
];

export default function Analytics() {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DappLayout>
      <main className="max-w-7xl mx-auto pb-16">
        <h1 className="text-4xl font-bold mb-8 pt-8">Analytics Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <GlassCard title="Metal Prices Over Time" className="h-[500px]">
            <PerformanceChart
              data={metalPricesData}
              dataKeys={['Silver', 'Gold', 'Platinum', 'Palladium']}
              xAxisDataKey="date"
              yAxisLabel="Price (USD)"
            />
          </GlassCard>
          <GlassCard title="Trading Volume" className="h-[500px]">
            <PerformanceChart
              data={tradingVolumeData}
              dataKeys={['volume']}
              xAxisDataKey="date"
              yAxisLabel="Volume (USD)"
            />
          </GlassCard>
          <GlassCard title="TVL Growth" className="h-[500px]">
            <PerformanceChart
              data={tvlGrowthData}
              dataKeys={['tvl']}
              xAxisDataKey="date"
              yAxisLabel="TVL (USD)"
            />
          </GlassCard>
          <GlassCard title="Staking Rewards" className="h-[500px]">
            <PerformanceChart
              data={stakingRewardsData}
              dataKeys={['rewards']}
              xAxisDataKey="date"
              yAxisLabel="Rewards (USD)"
            />
          </GlassCard>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <GlassCard title="Top Holders by Weight">
            <Leaderboard data={topHoldersData} valueKey="weight" valueSuffix=" oz" />
          </GlassCard>
          <GlassCard title="Highest Multipliers">
            <Leaderboard data={highestMultipliersData} valueKey="multiplier" valuePrefix="x" />
          </GlassCard>
          <GlassCard title="Most Valuable Collections">
            <Leaderboard data={mostValuableCollectionsData} valueKey="value" valuePrefix="$" />
          </GlassCard>
          <GlassCard title="Most Active Traders">
            <Leaderboard data={mostActiveTraders} valueKey="trades" valueSuffix=" trades" />
          </GlassCard>
        </div>
      </main>
    </DappLayout>
  );
}

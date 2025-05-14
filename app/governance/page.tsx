'use client'

import React from 'react';
import { Header } from '@/components/header';
import { FooterMenu } from '@/components/FooterMenu';
import { GlassCard } from '@/components/ui/glass-card';
import { CustomButton } from '@/components/ui/custom-button';
import { GovernancePanel } from '@/components/GovernancePanel';
import { DappLayout } from '@/components/DappLayout';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from 'lucide-react';

// Mock data for user's voting power
const userVotingPower = {
  totalStaked: 10000,
  votingPower: 100
};

export default function Governance() {

  return (
    <DappLayout>
      <main className="container mx-auto px-4 pt-24 pb-32 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Governance</h1>
        
        <GlassCard title="Active Proposals" className="mb-10">
          <GovernancePanel />
        </GlassCard>

        <GlassCard title="Your Voting Power" className="mb-10">
          <div className="flex justify-between items-center">
            <p>Total $METAL Staked:</p>
            <p className="text-2xl font-bold">{userVotingPower.totalStaked} $METAL</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p>Voting Power:</p>
            <p className="text-2xl font-bold">{userVotingPower.votingPower} VP</p>
          </div>
        </GlassCard>


        <GlassCard title="Governance Resources" className="mb-10">
          <ul className="list-disc list-inside space-y-2">
            <li>How Voting Works</li>
            <li>Proposal Guidelines</li>
            <li>Past Proposals</li>
            <li>Community Forum</li>
          </ul>
        </GlassCard>
      </main>
    </DappLayout>
  );
}

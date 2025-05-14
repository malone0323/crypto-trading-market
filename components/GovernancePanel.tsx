import React, { useState } from 'react';
import { CustomButton } from './ui/custom-button';
import { Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from 'lucide-react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  votes: { for: number; against: number };
  status: 'Active' | 'Pending' | 'Passed' | 'Failed';
  endDate: string;
}

const initialProposals: Proposal[] = [
  { id: 1, title: 'Increase staking rewards by 2%', description: 'This proposal aims to increase the staking rewards from the current rate to an additional 2% to incentivize more users to stake their tokens.', votes: { for: 1234, against: 500 }, status: 'Active', endDate: '2023-12-31' },
  { id: 2, title: 'Add Rhodium as a new metal type', description: 'Introduce Rhodium as a new metal type in our ecosystem to diversify the available options for users and potentially increase the overall value of the platform.', votes: { for: 987, against: 300 }, status: 'Pending', endDate: '2024-01-15' },
  { id: 3, title: 'Implement fee reduction for long-term stakers', description: 'Propose a tiered fee reduction system for users who stake their tokens for extended periods, encouraging long-term commitment to the platform.', votes: { for: 2345, against: 100 }, status: 'Passed', endDate: '2023-11-30' },
];

export function GovernancePanel() {
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [voteStatus, setVoteStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleVote = async (proposalId: number, voteType: 'for' | 'against') => {
    setVoteStatus('idle');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProposals(prevProposals =>
        prevProposals.map(proposal =>
          proposal.id === proposalId
            ? { ...proposal, votes: { ...proposal.votes, [voteType]: proposal.votes[voteType] + 1 } }
            : proposal
        )
      );
      setVoteStatus('success');
    } catch (error) {
      console.error('Error voting:', error);
      setVoteStatus('error');
    }
  };

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg text-gray-800 dark:text-white">
          <h3 className="font-semibold mb-2">{proposal.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-400">Votes: {proposal.votes.for + proposal.votes.against}</p>
            <span className={`px-2 py-1 rounded text-xs ${
              proposal.status === 'Active' ? 'bg-green-500' :
              proposal.status === 'Pending' ? 'bg-yellow-500' :
              proposal.status === 'Passed' ? 'bg-blue-500' :
              'bg-red-500'
            }`}>
              {proposal.status}
            </span>
          </div>
          <Progress 
            value={(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100} 
            className="h-2 mb-2"
          />
          <div className="flex justify-between items-center text-sm mb-2">
            <span>For: {proposal.votes.for}</span>
            <span>Against: {proposal.votes.against}</span>
          </div>
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <CustomButton variant="secondary" className="flex-1">
                  <Users className="mr-2 h-4 w-4" />
                  View Details
                </CustomButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{proposal.title}</DialogTitle>
                  <DialogDescription>
                    Status: {proposal.status} | End Date: {proposal.endDate}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <p>{proposal.description}</p>
                  <div className="flex justify-between">
                    <span>For: {proposal.votes.for}</span>
                    <span>Against: {proposal.votes.against}</span>
                  </div>
                  <Progress 
                    value={(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100} 
                    className="h-2"
                  />
                  {proposal.status === 'Active' && (
                    <div className="flex space-x-2">
                      <CustomButton 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => handleVote(proposal.id, 'for')}
                      >
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Vote For
                      </CustomButton>
                      <CustomButton 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => handleVote(proposal.id, 'against')}
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Vote Against
                      </CustomButton>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
      {voteStatus === 'success' && (
        <Alert className="mt-4 bg-green-900 border-green-500">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your vote has been successfully recorded.
          </AlertDescription>
        </Alert>
      )}
      {voteStatus === 'error' && (
        <Alert className="mt-4 bg-red-900 border-red-500">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to record your vote. Please try again later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

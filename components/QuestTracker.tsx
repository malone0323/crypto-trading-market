'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CustomButton } from './ui/custom-button';
import { Award, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '@/lib/theme';

interface Quest {
  id: number;
  name: string;
  progress: number;
  total: number;
  reward: string;
  claimed: boolean;
}

const initialQuests: Quest[] = [
  { id: 1, name: 'Stake for 7 days', progress: 7, total: 7, reward: '10 $METAL', claimed: false },
  { id: 2, name: 'Collect all Silver NFTs', progress: 2, total: 3, reward: 'Rare Gold NFT', claimed: false },
  { id: 3, name: 'Trade 5 times', progress: 5, total: 5, reward: '5% APY Boost', claimed: false },
];

export function QuestTracker() {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClaim = (questId: number) => {
    setQuests(prevQuests =>
      prevQuests.map(quest =>
        quest.id === questId ? { ...quest, claimed: true } : quest
      )
    );
    // Here you would typically call an API to record the claim on the backend
    console.log(`Claimed reward for quest ${questId}`);
  };

  const activeQuests = quests.filter(quest => quest.progress < quest.total);
  const completedQuests = quests.filter(quest => quest.progress === quest.total && !quest.claimed);

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 text-white">
      <CardHeader className="pb-2">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardTitle className="text-xl flex items-center gap-2">
            Quests & Achievements
            {(activeQuests.length > 0 || completedQuests.length > 0) && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                {activeQuests.length + completedQuests.length}
              </span>
            )}
          </CardTitle>
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </div>
      </CardHeader>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              {quests.map((quest) => (
                <Card key={quest.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-white">{quest.name}</h3>
                      <Award className={`h-5 w-5 ${quest.progress === quest.total ? 'text-yellow-400' : 'text-gray-400'}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-gray-300">{quest.progress}/{quest.total}</span>
                      </div>
                      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-700">
                        <div
                          className="h-full transition-all duration-500 ease-in-out rounded-full"
                          style={{
                            width: `${(quest.progress / quest.total) * 100}%`,
                            background: theme.gradients.gold
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-primary">Reward: {quest.reward}</p>
                    {quest.progress === quest.total && !quest.claimed && (
                      <CustomButton 
                        variant="gold" 
                        className="w-full mt-2"
                        onClick={() => handleClaim(quest.id)}
                      >
                        Claim Reward
                      </CustomButton>
                    )}
                    {quest.claimed && (
                      <p className="text-sm text-green-400 mt-2">Reward Claimed!</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

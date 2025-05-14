import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { CustomButton } from '../ui/custom-button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Edit } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Reward {
  id: string
  name: string
  description: string
  amount: number
  platform: string
}

interface RewardManagementProps {
  rewardsData: any; // Replace 'any' with the actual type of rewardsData
}

export function RewardManagement({ rewardsData }: RewardManagementProps) {
  const [rewards, setRewards] = useState<Reward[]>([
    ...rewardsData.staking.nftRewards.map((nft: any) => ({
      id: `staking-${nft.id}`,
      name: nft.name,
      description: 'Staking NFT Reward',
      amount: 0,
      platform: 'staking'
    })),
    ...rewardsData.social.tasks.map((task: any) => ({
      id: `social-${task.id}`,
      name: `${task.type} on ${task.platform}`,
      description: task.requirements || '',
      amount: task.reward,
      platform: task.platform
    }))
  ]);
  const [newReward, setNewReward] = useState<Reward>({ id: '', name: '', description: '', amount: 0, platform: '' })

  const addReward = () => {
    if (newReward.name && newReward.amount > 0) {
      setRewards([...rewards, { ...newReward, id: `new-${Date.now().toString()}` }])
      setNewReward({ id: '', name: '', description: '', amount: 0, platform: '' })
    }
  }

  const removeReward = (id: string) => {
    setRewards(rewards.filter(r => r.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Reward Name"
          value={newReward.name}
          onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
        />
        <Input
          placeholder="Description"
          value={newReward.description}
          onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={newReward.amount}
          onChange={(e) => setNewReward({ ...newReward, amount: Number(e.target.value) })}
        />
        <Select onValueChange={(value) => setNewReward({ ...newReward, platform: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="discord">Discord</SelectItem>
            <SelectItem value="telegram">Telegram</SelectItem>
            <SelectItem value="staking">Staking</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <CustomButton variant="gold" onClick={addReward}>Add Reward</CustomButton>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rewards.map((reward) => (
            <TableRow key={reward.id}>
              <TableCell>{reward.name}</TableCell>
              <TableCell>{reward.description}</TableCell>
              <TableCell>{reward.amount}</TableCell>
              <TableCell>{reward.platform}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <CustomButton variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </CustomButton>
                  <CustomButton variant="destructive" size="sm" onClick={() => removeReward(reward.id)}>
                    <Trash2 className="w-4 h-4" />
                  </CustomButton>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

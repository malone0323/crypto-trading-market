import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomButton } from './ui/custom-button'
import { WhitelistManagement } from './admin/WhitelistManagement'
import { RewardManagement } from './admin/RewardManagement'
import { TaskConfirmation } from './admin/TaskConfirmation'
import { AdminDashboard } from './admin/AdminDashboard'
import { Shield } from 'lucide-react'

interface AdminPanelProps {
  rewardsData: any; // Replace 'any' with the actual type of rewardsData
}

export function AdminPanel({ rewardsData }: AdminPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <CustomButton variant="gold" className="mt-8">
          <Shield className="w-4 h-4 mr-2" />
          Open Admin Panel
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Panel</DialogTitle>
          <DialogDescription>
            Manage whitelisted wallets, rewards, and tasks.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="dashboard" className="mt-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="whitelist">Whitelist</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <AdminDashboard />
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
      </DialogContent>
    </Dialog>
  )
}

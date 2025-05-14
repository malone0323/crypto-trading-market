import React, { useState } from 'react'
import { CustomButton } from '../ui/custom-button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from 'lucide-react'

interface Task {
  id: string
  type: string
  platform: string
  reward: number
  link: string
  requirements: string
  completed: boolean
}

interface TaskConfirmationProps {
  tasks: Task[]
}

export function TaskConfirmation({ tasks: initialTasks }: TaskConfirmationProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  const confirmTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: true } : task))
  }

  const rejectTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: false } : task))
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Reward</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Requirements</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.type}</TableCell>
              <TableCell>{task.platform}</TableCell>
              <TableCell>{task.reward} $METAL</TableCell>
              <TableCell>
                <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {task.link}
                </a>
              </TableCell>
              <TableCell>{task.requirements}</TableCell>
              <TableCell>{task.completed ? 'Completed' : 'Pending'}</TableCell>
              <TableCell>
                {!task.completed && (
                  <div className="flex space-x-2">
                    <CustomButton variant="gold" size="sm" onClick={() => confirmTask(task.id)}>
                      <Check className="w-4 h-4" />
                    </CustomButton>
                    <CustomButton variant="destructive" size="sm" onClick={() => rejectTask(task.id)}>
                      <X className="w-4 h-4" />
                    </CustomButton>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

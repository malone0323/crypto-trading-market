'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Coins, LayoutDashboard, Gift } from 'lucide-react'
import { useChat } from '@/components/DappLayout';

export function FooterMenu({ className = '' }: { className?: string }) {
  const pathname = usePathname()
  const { isChatOpen } = useChat();

  // Don't render the FooterMenu on the landing page
  if (pathname === '/') return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 z-50 transition-all duration-300 ${isChatOpen ? 'md:pr-[450px]' : ''} ${className}`}>
      <div className="flex justify-around items-center h-16 px-4 max-w-6xl mx-auto">
        <Link 
          href="/stake" 
          className={`flex flex-col items-center justify-center flex-1 h-full text-sm transition-colors ${
            pathname === '/stake' ? 'text-primary' : 'text-gray-400 hover:text-primary'
          }`}
        >
          <Coins className="h-5 w-5 mb-1" />
          <span>Stake</span>
        </Link>
        <Link 
          href="/dashboard" 
          className={`flex flex-col items-center justify-center flex-1 h-full text-sm transition-colors ${
            pathname === '/dashboard' ? 'text-primary' : 'text-gray-400 hover:text-primary'
          }`}
        >
          <LayoutDashboard className="h-5 w-5 mb-1" />
          <span>Dashboard</span>
        </Link>
        <Link 
          href="/rewards" 
          className={`flex flex-col items-center justify-center flex-1 h-full text-sm transition-colors ${
            pathname === '/rewards' ? 'text-primary' : 'text-gray-400 hover:text-primary'
          }`}
        >
          <Gift className="h-5 w-5 mb-1" />
          <span>Rewards</span>
        </Link>
      </div>
    </div>
  )
}

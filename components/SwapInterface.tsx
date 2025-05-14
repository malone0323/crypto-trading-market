'use client'

import React, { useState, useEffect } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { CustomButton } from '@/components/ui/custom-button'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowDownUp, Settings2 } from 'lucide-react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'react-hot-toast'

// Mock token list - in production, fetch from Jupiter API
const tokens = [
  { symbol: 'SOL', name: 'Solana', image: '/placeholder.svg?height=32&width=32' },
  { symbol: 'USDC', name: 'USD Coin', image: '/placeholder.svg?height=32&width=32' },
  { symbol: 'METAL', name: 'Crypto Commodity Coin', image: '/placeholder.svg?height=32&width=32' },
]

interface SwapInterfaceProps {
  className?: string
}

export function SwapInterface({ className = '' }: SwapInterfaceProps) {
  const [inputAmount, setInputAmount] = useState<string>('')
  const [outputAmount, setOutputAmount] = useState<string>('')
  const [inputToken, setInputToken] = useState('USDC')
  const [outputToken, setOutputToken] = useState('SOL')
  const [slippage, setSlippage] = useState('1')
  const [autoRouting, setAutoRouting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  // Mock quote fetching
  useEffect(() => {
    if (inputAmount && inputToken && outputToken) {
      setLoading(true)
      // Simulate API delay
      setTimeout(() => {
        setOutputAmount((parseFloat(inputAmount) * 0.5).toString())
        setLoading(false)
      }, 500)
    } else {
      setOutputAmount('')
    }
  }, [inputAmount, inputToken, outputToken])

  const handleSwapTokens = () => {
    const tempToken = inputToken
    setInputToken(outputToken)
    setOutputToken(tempToken)
    setInputAmount(outputAmount)
    setOutputAmount(inputAmount)
  }

  const handleConnectWallet = async () => {
    // Simulate wallet connection
    setWalletConnected(true)
    toast.success('Wallet connected successfully!')
  }

  const handleSwap = async () => {
    if (!walletConnected) {
      handleConnectWallet()
      return
    }
    // Handle swap execution
    toast.success('Swap executed successfully!')
  }

  return (
    <GlassCard title="Swap Tokens" className={`${className} max-w-md mx-auto`}>
      <div className="space-y-4">
        {/* Input Token */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>You Pay</Label>
            <Label>Balance: 0.00</Label>
          </div>
          <div className="flex space-x-2">
            <Select value={inputToken} onValueChange={setInputToken}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center">
                      <Image
                        src={token.image}
                        alt={token.name}
                        width={24}
                        height={24}
                        className="mr-2 rounded-full"
                      />
                      {token.symbol}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="0.00"
              value={inputAmount}
              onChange={(e) => setInputAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwapTokens}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <ArrowDownUp className="w-6 h-6" />
          </button>
        </div>

        {/* Output Token */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>You Receive</Label>
            <Label>Balance: 0.00</Label>
          </div>
          <div className="flex space-x-2">
            <Select value={outputToken} onValueChange={setOutputToken}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token.symbol} value={token.symbol}>
                    <div className="flex items-center">
                      <Image
                        src={token.image}
                        alt={token.name}
                        width={24}
                        height={24}
                        className="mr-2 rounded-full"
                      />
                      {token.symbol}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading ? (
              <Skeleton className="h-10 flex-1" />
            ) : (
              <Input
                type="number"
                placeholder="0.00"
                value={outputAmount}
                readOnly
              />
            )}
          </div>
        </div>

        {/* Settings */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Settings2 className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Swap Settings</SheetTitle>
                  <SheetDescription>
                    Configure your swap parameters
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Slippage Tolerance (%)</Label>
                    <Input
                      type="number"
                      value={slippage}
                      onChange={(e) => setSlippage(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Auto Routing</Label>
                    <Switch
                      checked={autoRouting}
                      onCheckedChange={setAutoRouting}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {!loading && inputAmount && outputAmount && (
            <span className="text-sm text-gray-400">
              1 {inputToken} ≈ {(parseFloat(outputAmount) / parseFloat(inputAmount)).toFixed(6)} {outputToken}
            </span>
          )}
        </div>

        {/* Swap Button */}
        <CustomButton
          variant="gold"
          className="w-full"
          onClick={handleSwap}
          disabled={!inputAmount || !outputAmount || loading}
        >
          {!walletConnected ? 'Connect Wallet' : 'Swap'}
        </CustomButton>
      </div>
    </GlassCard>
  )
}

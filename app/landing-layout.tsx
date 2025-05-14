import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MusicPlayer from '@/components/MusicPlayer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Metal Commodity Market - Welcome',
  description: 'Stack your metals. Boost your rewards. Join the commodity revolution!',
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MusicPlayer videoId="jfKfPfyJRdk" key="background-music" />
      {children}
    </>
  )
}

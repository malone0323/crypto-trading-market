import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from 'react-hot-toast'
import { MetalPricesProvider } from '@/contexts/MetalPricesContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Commodity Market',
  description: 'Stack your metals. Boost your rewards. Join the commodity revolution!',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen transition-colors duration-200`}>
        <ThemeProvider>
          <MetalPricesProvider>
            {children}
            <Toaster position="bottom-right" />
          </MetalPricesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

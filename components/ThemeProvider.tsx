'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { theme } from '@/lib/theme'

type ThemeMode = 'dark' | 'light'

type ThemeContextType = {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark')

  const applyTheme = (newMode: ThemeMode) => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newMode)
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}-color`, value[newMode])
    })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null
    const initialTheme = savedTheme || 'dark'
    setMode(initialTheme)
    applyTheme(initialTheme)
  }, [])

  useEffect(() => {
    applyTheme(mode)
  }, [mode])

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    localStorage.setItem('theme', newMode)
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

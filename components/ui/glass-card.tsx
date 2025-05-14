import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTheme } from '@/components/ThemeProvider';

interface GlassCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ title, children, className = '' }) => {
  const { mode } = useTheme();

  return (
    <Card 
      className={`border-opacity-20 bg-opacity-90 ${className}`} 
      style={{
        backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        color: mode === 'dark' ? 'white' : 'black',
      }}
    >
      {title && (
        <CardHeader>
          <CardTitle className={`text-xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={mode === 'dark' ? 'text-white' : 'text-gray-800'}>
        {children}
      </CardContent>
    </Card>
  );
};

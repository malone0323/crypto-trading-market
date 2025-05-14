import React from 'react';
import { Button } from "@/components/ui/button"
import { theme } from '@/lib/theme';

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  variant: 'gold' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  variant, 
  size = 'default',
  className = '', 
  loading = false,
  ...props 
}) => {
  const baseStyle = 'rounded-full font-bold transition-all duration-300';
  let variantStyle = '';
  let sizeClass = '';

  switch (size) {
    case 'sm':
      sizeClass = 'px-3 py-1 text-sm';
      break;
    case 'lg':
      sizeClass = 'px-8 py-4 text-xl';
      break;
    default:
      sizeClass = 'px-6 py-3 text-lg';
  }

  switch (variant) {
    case 'gold':
      variantStyle = 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg hover:scale-105 dark:from-yellow-500 dark:to-yellow-700';
      break;
    case 'outline':
      variantStyle = 'border-2 border-primary text-primary hover:bg-primary hover:text-black';
      break;
    case 'secondary':
      variantStyle = 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      break;
    default:
      variantStyle = 'bg-primary text-primary-foreground hover:bg-primary/90';
  }

  return (
    <Button 
      className={`${baseStyle} ${sizeClass} ${variantStyle} ${className} flex items-center`} 
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-pulse">Verifying...</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
};

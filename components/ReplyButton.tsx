import React from 'react';
import { Reply } from 'lucide-react';

interface ReplyButtonProps {
  onClick: () => void;
}

export const ReplyButton: React.FC<ReplyButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-1 right-1 p-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
    >
      <Reply className="h-4 w-4 text-primary" />
    </button>
  );
};

import { cn } from '@/shared/lib/utils';
import { Button } from '../ui';
import { ReactNode } from 'react';

interface Props {
  title: string;
  icon: ReactNode | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const SignInButton = ({ icon, title, onClick, disabled = false, className }: Props) => {
  return (
    <Button
      variant="outline"
      className={cn('flex items-center gap-1', className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="shrink-0">{icon}</span>
      <span>{title}</span>
    </Button>
  );
};

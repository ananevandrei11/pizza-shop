'use client';

import { CircleUser, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Button } from '../ui';
import Link from 'next/link';

interface Props {
  onClick: () => void;
}

export const ProfileButton = ({ onClick }: Props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button variant="outline" className="flex items-center gap-1" onClick={onClick}>
        <User size={18} className="shrink-0" />
        <span>Log In</span>
      </Button>
    );
  }

  return (
    <Link href="/profile">
      <Button variant="secondary" className="flex items-center gap-2">
        <CircleUser size={18} />
        Profile
      </Button>
    </Link>
  );
};

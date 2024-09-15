'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

import { Container } from './container';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';
import { ProfileButton } from '../profile';
import { AuthModal } from '../modals';

interface Props {
  isCart?: boolean;
  isSearch?: boolean;
  className?: string;
}

export const Header = ({ isCart = true, isSearch = true, className }: Props) => {
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Left side */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image className="shrink-0" src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Pizza Shop</h1>
              <p className="text-sm text-gray-400 leading-3">It&apos;s already delicious</p>
            </div>
          </div>
        </Link>
        {/* Search Block*/}
        {isSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        {/* Right side */}
        <div className="flex items-center gap-3">
          <AuthModal open={openAuthModal} onCLose={() => setOpenAuthModal(false)} />
          <ProfileButton onClick={() => setOpenAuthModal(true)} />
          {isCart && (
            <div className="flex items-center gap-1">
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
};

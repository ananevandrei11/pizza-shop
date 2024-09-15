'use client';

import { signIn } from 'next-auth/react';
import { CalendarSearch, Github } from 'lucide-react';
import { SignInButton } from '../../profile';
import { Button, Dialog, DialogContent } from '../../ui';
import { LoginForm } from './login-form';
import { useState } from 'react';
import { RegisterForm } from './registr-form';

interface Props {
  open: boolean;
  onCLose: () => void;
}

export const AuthModal = ({ open, onCLose }: Props) => {
  const [typeForm, setTypeForm] = useState<'login' | 'register'>('login');

  const handleSwithType = () => {
    setTypeForm(prev => (prev === 'login' ? 'register' : 'login'));
  };

  const handleClose = () => {
    onCLose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {typeForm === 'login' && <LoginForm onClose={handleClose} />}
        {typeForm === 'register' && <RegisterForm onClose={handleClose} />}
        <div className="grid grid-cols-2 justify-between gap-2">
          <SignInButton
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            icon={<Github size={18} />}
            title="Github"
          />
          <SignInButton
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            icon={<CalendarSearch size={18} />}
            title="Google"
          />
        </div>
        <div>
          <Button type="button" onClick={handleSwithType}>
            {typeForm === 'login' ? 'Register Form' : 'Login Form'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

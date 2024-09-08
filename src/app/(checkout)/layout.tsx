import { Header } from '@/shared/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pizza Checkout',
  description: 'Pizza Checkout. NextJs + TailwindCSS',
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header isCart={false} isSearch={false} className="bg-[#f4f1ee]" />

      <main className="min-h-screen bg-[#f4f1ee]">{children}</main>
    </>
  );
}

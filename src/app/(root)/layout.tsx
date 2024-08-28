import { Metadata } from 'next';
import { Header } from '@/shared/components/shared';

export const metadata: Metadata = {
  title: 'Pizza Shop',
  description: 'Pizza Shop. NextJs + TailwindCSS',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      {modal}
    </>
  );
}

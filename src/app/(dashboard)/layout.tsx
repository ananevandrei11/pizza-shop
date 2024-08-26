import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pizza Dashboard',
  description: 'Pizza Dashboard. NextJs + TailwindCSS',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

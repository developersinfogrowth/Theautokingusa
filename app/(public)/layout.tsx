// app/(public)/layout.tsx

import type { Metadata } from 'next';
import '../globals.css';

import Navbar from '@/app/components/layout/navbar/Navbar';
import Footer from '@/app/components/layout/Footer';

export const metadata: Metadata = {
  title: 'TheAutoKingUSA - Quality Used Engines & Transmissions',
  description:
    'Get quality used engines and transmissions in A Grade condition.',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-['DM_Sans',sans-serif] min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
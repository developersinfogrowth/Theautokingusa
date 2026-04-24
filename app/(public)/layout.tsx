// app/(public)/layout.tsx
import type { Metadata } from 'next'
import '../globals.css'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'TheAutoKingUSA - Quality Used Engines & Transmissions',
  description: 'Get quality used engines and transmissions in A Grade condition.',
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  )
}

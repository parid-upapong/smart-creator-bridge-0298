import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OVERLORD | Creative Studio',
  description: 'AI-Powered Cross-Platform Content Adaptation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 flex h-screen overflow-hidden`}>
        <Sidebar />
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NeuroVerse — AI Content Studio',
  description: 'Generate viral captions, hooks, and scripts using AI. Built for creators.',
  keywords: ['AI content', 'caption generator', 'hook generator', 'script writer', 'social media'],
  openGraph: {
    title: 'NeuroVerse — AI Content Studio',
    description: 'Generate viral captions, hooks, and scripts using AI.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

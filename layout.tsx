import { Navbar } from '@/components/Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-aurora opacity-60 pointer-events-none" />
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <Navbar />
      <main className="relative z-10 pt-20 pb-12 px-4 md:px-8 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  )
}

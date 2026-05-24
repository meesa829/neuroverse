'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { Zap, LayoutDashboard, FileText, Hash, Anchor, Scroll, Menu, X } from 'lucide-react'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/captions', label: 'Captions', icon: FileText },
  { href: '/hooks', label: 'Hooks', icon: Anchor },
  { href: '/scripts', label: 'Scripts', icon: Scroll },
  { href: '/hashtags', label: 'Hashtags', icon: Hash },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 md:px-8"
        style={{
          background: 'rgba(5,5,8,0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-glow"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5ff)' }}>
            <Zap size={16} fill="white" className="text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            Neuro<span className="gradient-text-violet">Verse</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={14} />
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
            style={{ background: 'rgba(0,245,255,0.08)', border: '1px solid rgba(0,245,255,0.2)', color: '#00f5ff' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AI Online
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-16 left-0 right-0 p-4 space-y-1"
            style={{
              background: 'rgba(5,5,8,0.98)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    active
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

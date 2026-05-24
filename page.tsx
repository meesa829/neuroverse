import Link from 'next/link'
import { Zap, FileText, Anchor, Scroll, Hash, ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react'

const TOOLS = [
  {
    href: '/captions',
    icon: FileText,
    label: 'Caption Generator',
    desc: 'Viral captions for any platform in seconds',
    color: '#8b5cf6',
    emoji: '✍️',
  },
  {
    href: '/hooks',
    icon: Anchor,
    label: 'Hook Generator',
    desc: 'Stop-the-scroll opening lines that convert',
    color: '#00f5ff',
    emoji: '🎣',
  },
  {
    href: '/scripts',
    icon: Scroll,
    label: 'Script Writer',
    desc: 'Full video scripts with timestamps and CTAs',
    color: '#ff0080',
    emoji: '🎬',
  },
  {
    href: '/hashtags',
    icon: Hash,
    label: 'Hashtag Generator',
    desc: 'Strategic hashtag sets for maximum reach',
    color: '#a3ff00',
    emoji: '#️⃣',
  },
]

const STATS = [
  { value: '10×', label: 'Faster content creation' },
  { value: '4', label: 'AI-powered tools' },
  { value: '5', label: 'Platforms supported' },
  { value: '∞', label: 'Generations per session' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-aurora pointer-events-none" />
      <div className="fixed inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center animate-glow"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5ff)' }}>
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">
            Neuro<span className="gradient-text-violet">Verse</span>
          </span>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold btn-primary"
        >
          Launch App <ArrowRight size={14} />
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-16 pb-24 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8"
          style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#c4b5fd' }}>
          <Sparkles size={12} />
          Powered by Claude AI
        </div>

        <h1 className="font-display font-black text-5xl md:text-7xl leading-[0.95] tracking-tight mb-8">
          <span className="text-white">Create content</span>
          <br />
          <span className="gradient-text">that goes viral.</span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          AI-powered captions, hooks, scripts, and hashtags for creators.
          Stop staring at blank screens — generate in seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold btn-primary animated-border"
          >
            <Zap size={18} />
            Start Creating Free
          </Link>
          <Link
            href="/captions"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium glass glass-hover text-white/70"
          >
            Try Caption Generator
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 max-w-3xl mx-auto">
          {STATS.map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-5 text-center">
              <div className="font-display font-black text-3xl gradient-text-violet mb-1">{value}</div>
              <div className="text-white/40 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="relative z-10 px-6 py-16 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Four tools. Infinite content.
          </h2>
          <p className="text-white/40 text-base max-w-xl mx-auto">
            Everything a modern creator needs to dominate social media, powered by state-of-the-art AI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map(({ href, icon: Icon, label, desc, color, emoji }) => (
            <Link
              key={href}
              href={href}
              className="group glass glass-hover rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{ background: `radial-gradient(ellipse at 20% 50%, ${color}08, transparent 70%)` }}
              />

              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}
                >
                  {emoji}
                </div>
                <ArrowRight
                  size={18}
                  className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 mt-2"
                />
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white mb-1.5">{label}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>

              <div
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full self-start"
                style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}
              >
                <Icon size={11} />
                Open Tool
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 py-16 max-w-5xl mx-auto">
        <div className="glass rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: 'State-of-the-art AI', desc: 'Powered by Claude — the most capable AI assistant available today.', color: '#8b5cf6' },
              { icon: TrendingUp, title: 'Platform-optimized', desc: 'Content tuned specifically for Instagram, TikTok, YouTube, Twitter, and LinkedIn.', color: '#00f5ff' },
              { icon: Shield, title: 'Private & secure', desc: 'Your content stays yours. No data stored, no training on your inputs.', color: '#a3ff00' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 className="font-display font-semibold text-white">{title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 py-20 text-center max-w-3xl mx-auto">
        <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
          Ready to create?
        </h2>
        <p className="text-white/40 mb-8">No sign-up required. Just add your API key and go.</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-lg font-bold btn-primary"
        >
          <Zap size={20} />
          Open Dashboard
          <ArrowRight size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-white/5">
        <p className="text-white/20 text-sm">
          NeuroVerse — Built with Next.js & Claude AI
        </p>
      </footer>
    </main>
  )
}

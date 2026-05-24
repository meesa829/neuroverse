import Link from 'next/link'
import { FileText, Anchor, Scroll, Hash, ArrowRight, Sparkles, Zap } from 'lucide-react'

const TOOLS = [
  {
    href: '/captions',
    icon: FileText,
    label: 'AI Caption Generator',
    desc: 'Write viral captions for any platform, any niche.',
    color: '#8b5cf6',
    badge: 'Most Popular',
  },
  {
    href: '/hooks',
    icon: Anchor,
    label: 'AI Hook Generator',
    desc: 'Generate 5 scroll-stopping hooks instantly.',
    color: '#00f5ff',
    badge: null,
  },
  {
    href: '/scripts',
    icon: Scroll,
    label: 'AI Script Writer',
    desc: 'Full video scripts with structure and CTAs.',
    color: '#ff0080',
    badge: 'New',
  },
  {
    href: '/hashtags',
    icon: Hash,
    label: 'AI Hashtag Generator',
    desc: 'Strategic hashtag sets: high, medium, and niche.',
    color: '#a3ff00',
    badge: null,
  },
]

const TIPS = [
  'Be specific with your topic for better results',
  'Try different tones to find what works for your audience',
  'Regenerate multiple times and pick the best output',
  'Use "Extra Context" to guide the AI toward your brand voice',
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 page-transition">
      {/* Hero */}
      <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.12), transparent 70%)' }} />
        <div className="relative flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-violet-400" />
              <span className="text-violet-400 text-sm font-medium">AI Studio</span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-white mb-3">
              Welcome to NeuroVerse
            </h1>
            <p className="text-white/50 text-base max-w-lg">
              Four AI tools to supercharge your content. Pick a tool below and start generating in seconds.
            </p>
          </div>
          <div className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 animate-float"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #00f5ff)', boxShadow: '0 0 60px rgba(139,92,246,0.4)' }}>
            <Zap size={36} fill="white" className="text-white" />
          </div>
        </div>
      </div>

      {/* API Key Warning */}
      <div className="glass rounded-2xl p-5 border border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔑</span>
          <div>
            <p className="text-yellow-300 font-medium text-sm mb-1">Setup Required</p>
            <p className="text-white/50 text-sm">
              Add your <span className="font-mono text-yellow-300/80">ANTHROPIC_API_KEY</span> to your{' '}
              <span className="font-mono text-white/60">.env.local</span> file to enable AI generation.{' '}
              <a
                href="https://console.anthropic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-300 underline underline-offset-2 hover:text-yellow-200"
              >
                Get your key here →
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div>
        <h2 className="font-display font-bold text-xl text-white mb-4">Choose a Tool</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map(({ href, icon: Icon, label, desc, color, badge }) => (
            <Link
              key={href}
              href={href}
              className="group glass glass-hover rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 10% 50%, ${color}06, transparent)` }} />

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                <Icon size={22} style={{ color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display font-semibold text-white">{label}</span>
                  {badge && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}>
                      {badge}
                    </span>
                  )}
                </div>
                <p className="text-white/45 text-sm">{desc}</p>
              </div>

              <ArrowRight size={16}
                className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
          <span>💡</span> Pro Tips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TIPS.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-white/50">
              <span className="text-violet-400 font-mono mt-0.5">0{i + 1}</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

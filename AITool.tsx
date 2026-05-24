'use client'

import { useState, useCallback } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { ToolType, Platform, Tone } from '@/types'
import { CopyButton, Skeleton, LoadingDots, ErrorAlert, CharCounter } from '@/components/ui'

// ── Config ───────────────────────────────────────────────────
const PLATFORMS: { value: Platform; label: string; emoji: string }[] = [
  { value: 'instagram', label: 'Instagram', emoji: '📸' },
  { value: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { value: 'youtube', label: 'YouTube', emoji: '▶️' },
  { value: 'twitter', label: 'X / Twitter', emoji: '🐦' },
  { value: 'linkedin', label: 'LinkedIn', emoji: '💼' },
]

const TONES: { value: Tone; label: string; color: string }[] = [
  { value: 'viral', label: '🔥 Viral', color: 'text-orange-400' },
  { value: 'professional', label: '💼 Professional', color: 'text-blue-400' },
  { value: 'funny', label: '😂 Funny', color: 'text-yellow-400' },
  { value: 'emotional', label: '💖 Emotional', color: 'text-pink-400' },
  { value: 'educational', label: '📚 Educational', color: 'text-green-400' },
  { value: 'controversial', label: '⚡ Bold', color: 'text-red-400' },
]

// ── Props ────────────────────────────────────────────────────
interface AIToolProps {
  tool: ToolType
  title: string
  description: string
  icon: React.ReactNode
  placeholder: string
  accentColor?: string
}

// ── Component ────────────────────────────────────────────────
export function AITool({
  tool,
  title,
  description,
  icon,
  placeholder,
  accentColor = '#8b5cf6',
}: AIToolProps) {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState<Platform>('instagram')
  const [tone, setTone] = useState<Tone>('viral')
  const [extraContext, setExtraContext] = useState('')
  const [showExtra, setShowExtra] = useState(false)

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [tokensUsed, setTokensUsed] = useState<number | null>(null)

  const generate = useCallback(async () => {
    if (!topic.trim() || loading) return
    setLoading(true)
    setError(null)
    setResult(null)
    setTokensUsed(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, topic: topic.trim(), platform, tone, extraContext }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      setResult(data.content)
      setTokensUsed(data.tokensUsed ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [tool, topic, platform, tone, extraContext, loading])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) generate()
  }

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
          <p className="text-white/50 text-sm mt-1">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Input Panel ── */}
        <div className="space-y-4">
          {/* Topic */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-white/70">Topic / Niche *</label>
              <CharCounter current={topic.length} max={500} />
            </div>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value.slice(0, 500))}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:border-violet-500/50 focus:bg-white/8 transition-all"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <p className="text-xs text-white/25">Tip: ⌘+Enter / Ctrl+Enter to generate</p>
          </div>

          {/* Platform */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <label className="text-sm font-medium text-white/70">Platform</label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {PLATFORMS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPlatform(p.value)}
                  className={clsx(
                    'flex flex-col items-center gap-1.5 p-2.5 rounded-xl text-xs font-medium transition-all duration-200',
                    platform === p.value
                      ? 'border text-white'
                      : 'bg-white/3 border border-white/8 text-white/40 hover:text-white/70 hover:bg-white/6'
                  )}
                  style={
                    platform === p.value
                      ? {
                          background: `${accentColor}15`,
                          borderColor: `${accentColor}50`,
                          color: 'white',
                        }
                      : {}
                  }
                >
                  <span className="text-base">{p.emoji}</span>
                  <span className="hidden sm:block">{p.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="glass rounded-2xl p-5 space-y-3">
            <label className="text-sm font-medium text-white/70">Tone</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTone(t.value)}
                  className={clsx(
                    'px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left',
                    tone === t.value
                      ? 'border'
                      : 'bg-white/3 border border-white/8 text-white/50 hover:text-white/80 hover:bg-white/6'
                  )}
                  style={
                    tone === t.value
                      ? {
                          background: `${accentColor}15`,
                          borderColor: `${accentColor}50`,
                        }
                      : {}
                  }
                >
                  <span className={tone === t.value ? 'text-white' : t.color}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Extra context toggle */}
          <button
            onClick={() => setShowExtra(!showExtra)}
            className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <ChevronDown size={14} className={clsx('transition-transform', showExtra && 'rotate-180')} />
            {showExtra ? 'Hide' : 'Add'} extra context (optional)
          </button>

          {showExtra && (
            <div className="glass rounded-2xl p-5">
              <textarea
                value={extraContext}
                onChange={(e) => setExtraContext(e.target.value)}
                placeholder="E.g. target audience: Gen Z women, product: fitness app, brand voice: energetic..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:border-violet-500/50 transition-all"
              />
            </div>
          )}

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={loading || !topic.trim()}
            className={clsx(
              'w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-sm font-semibold transition-all duration-300',
              loading || !topic.trim()
                ? 'opacity-40 cursor-not-allowed bg-white/5 border border-white/10 text-white/50'
                : 'btn-primary text-white'
            )}
          >
            {loading ? (
              <LoadingDots label="AI is thinking" />
            ) : (
              <>
                <Sparkles size={16} />
                Generate with AI
              </>
            )}
          </button>
        </div>

        {/* ── Right: Output Panel ── */}
        <div className="glass rounded-2xl p-5 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/50">Generated Output</span>
            {tokensUsed && (
              <span className="text-xs font-mono text-white/20">~{tokensUsed} tokens</span>
            )}
          </div>

          {/* States */}
          {!loading && !result && !error && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 opacity-30"
                style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}20` }}
              >
                <span className="text-2xl" style={{ color: accentColor }}>{icon}</span>
              </div>
              <p className="text-white/25 text-sm">Your AI-generated content will appear here</p>
              <p className="text-white/15 text-xs mt-2">Fill in the form and click generate</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col justify-center py-8 space-y-4">
              <LoadingDots label="Generating your content" />
              <Skeleton lines={6} className="mt-6" />
            </div>
          )}

          {error && !loading && (
            <div className="flex-1 flex flex-col justify-center">
              <ErrorAlert message={error} onDismiss={() => setError(null)} />
            </div>
          )}

          {result && !loading && (
            <div className="flex-1 flex flex-col">
              <div
                className="flex-1 rounded-xl p-4 font-body text-sm text-white/85 leading-relaxed whitespace-pre-wrap overflow-y-auto"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {result}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <CopyButton text={result} label="Copy All" />
                <button
                  onClick={generate}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/30 transition-all"
                >
                  <Sparkles size={14} />
                  Regenerate
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 text-white/50 hover:text-white border border-white/10 transition-all ml-auto"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

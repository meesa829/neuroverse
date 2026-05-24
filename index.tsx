'use client'

import { useState, useCallback } from 'react'
import { Check, Copy } from 'lucide-react'
import { clsx } from 'clsx'

// ── Copy Button ──────────────────────────────────────────────
interface CopyButtonProps {
  text: string
  className?: string
  label?: string
}

export function CopyButton({ text, className, label = 'Copy' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className={clsx(
        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
        copied
          ? 'bg-green-500/20 text-green-400 border border-green-500/40'
          : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-violet-500/40',
        className
      )}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copied!' : label}
    </button>
  )
}

// ── Skeleton Loader ──────────────────────────────────────────
interface SkeletonProps {
  lines?: number
  className?: string
}

export function Skeleton({ lines = 4, className }: SkeletonProps) {
  return (
    <div className={clsx('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 rounded-md shimmer"
          style={{ width: i === lines - 1 ? '60%' : i % 2 === 0 ? '100%' : '85%' }}
        />
      ))}
    </div>
  )
}

// ── Loading Dots ─────────────────────────────────────────────
export function LoadingDots({ label = 'Generating' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-violet-400">
      <div className="loading-dots flex gap-1">
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full bg-violet-400 block" />
        ))}
      </div>
      <span className="text-sm font-medium font-mono">{label}...</span>
    </div>
  )
}

// ── Badge ────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode
  variant?: 'violet' | 'cyan' | 'pink' | 'green' | 'default'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    violet: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    pink: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
    green: 'bg-green-500/15 text-green-300 border-green-500/30',
    default: 'bg-white/5 text-white/60 border-white/10',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

// ── Error Alert ──────────────────────────────────────────────
interface ErrorAlertProps {
  message: string
  onDismiss?: () => void
}

export function ErrorAlert({ message, onDismiss }: ErrorAlertProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300">
      <span className="text-lg">⚠️</span>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-400 hover:text-red-200 transition-colors text-lg leading-none">
          ×
        </button>
      )}
    </div>
  )
}

// ── Character Counter ────────────────────────────────────────
interface CharCounterProps {
  current: number
  max: number
}

export function CharCounter({ current, max }: CharCounterProps) {
  const pct = current / max
  return (
    <span
      className={clsx(
        'text-xs font-mono tabular-nums',
        pct > 0.9 ? 'text-red-400' : pct > 0.7 ? 'text-yellow-400' : 'text-white/30'
      )}
    >
      {current}/{max}
    </span>
  )
}

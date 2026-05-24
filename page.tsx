import { Anchor } from 'lucide-react'
import { AITool } from '@/components/tools/AITool'

export const metadata = { title: 'AI Hook Generator — NeuroVerse' }

export default function HooksPage() {
  return (
    <AITool
      tool="hook"
      title="AI Hook Generator"
      description="5 scroll-stopping opening lines for your videos and posts. Make them stop."
      icon={<Anchor size={22} />}
      placeholder="E.g. How I lost 20kg in 3 months, investing for beginners, daily routine of a millionaire..."
      accentColor="#00f5ff"
    />
  )
}

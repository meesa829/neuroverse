import { Hash } from 'lucide-react'
import { AITool } from '@/components/tools/AITool'

export const metadata = { title: 'AI Hashtag Generator — NeuroVerse' }

export default function HashtagsPage() {
  return (
    <AITool
      tool="hashtag"
      title="AI Hashtag Generator"
      description="Strategic hashtag sets: high-volume, mid-tier, and niche — for maximum reach."
      icon={<Hash size={22} />}
      placeholder="E.g. Vegan recipes, street photography, personal finance, gym motivation..."
      accentColor="#a3ff00"
    />
  )
}

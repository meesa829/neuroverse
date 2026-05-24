export type ToolType = 'caption' | 'hook' | 'script' | 'hashtag'

export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin'

export type Tone = 'viral' | 'professional' | 'funny' | 'emotional' | 'educational' | 'controversial'

export interface GenerateRequest {
  tool: ToolType
  topic: string
  platform: Platform
  tone: Tone
  extraContext?: string
}

export interface GenerateResponse {
  content: string
  tool: ToolType
  tokensUsed?: number
}

export interface HistoryItem {
  id: string
  tool: ToolType
  topic: string
  platform: Platform
  tone: Tone
  content: string
  createdAt: Date
  copied: boolean
}

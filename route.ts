import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { GenerateRequest } from '@/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Rate limiting — simple in-memory store
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 50
const RATE_LIMIT_WINDOW = Number(process.env.RATE_LIMIT_WINDOW_MS) || 60_000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return true
  }
  if (entry.count >= RATE_LIMIT_MAX) return false
  entry.count++
  return true
}

function buildPrompt(req: GenerateRequest): string {
  const platformMap: Record<string, string> = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    twitter: 'X (Twitter)',
    linkedin: 'LinkedIn',
  }

  const toneMap: Record<string, string> = {
    viral: 'highly viral and shareable',
    professional: 'professional and authoritative',
    funny: 'funny and entertaining with humor',
    emotional: 'emotionally compelling and relatable',
    educational: 'educational and informative',
    controversial: 'thought-provoking and slightly controversial (tasteful)',
  }

  const platform = platformMap[req.platform]
  const tone = toneMap[req.tone]
  const extra = req.extraContext ? `\n\nExtra context: ${req.extraContext}` : ''

  switch (req.tool) {
    case 'caption':
      return `You are an expert social media strategist. Write a ${tone} ${platform} caption about: "${req.topic}".

Requirements:
- Optimized specifically for ${platform}'s algorithm and audience
- Include a strong call-to-action
- Add 3-5 relevant emojis naturally
- Keep it engaging from the first word
- End with a question to boost comments${extra}

Output ONLY the caption. No explanations, no labels.`

    case 'hook':
      return `You are a viral content expert. Create 5 powerful opening hooks for a ${platform} post/video about: "${req.topic}".

Each hook must be ${tone}. 

Requirements:
- Each hook should be 1-2 sentences max
- Must grab attention in the first 3 seconds
- Make people STOP scrolling
- Use pattern interrupts, curiosity gaps, or bold statements${extra}

Format each hook on a new line with a number (1. 2. 3. etc). Output ONLY the hooks.`

    case 'script':
      return `You are a professional content script writer. Write a complete ${tone} video script for ${platform} about: "${req.topic}".

Structure:
🎬 HOOK (0-3 seconds): Grab attention immediately
📢 INTRO (3-10 seconds): Set up what they'll learn/see
📖 BODY (10-50 seconds): Main content with key points
🎯 CTA (last 5 seconds): Call to action${extra}

Requirements:
- Write exactly what to SAY (not describe)
- Include [PAUSE], [CUT], [B-ROLL: description] markers where relevant
- Make it ${tone}
- Optimized for ${platform}

Output the complete script only.`

    case 'hashtag':
      return `You are a hashtag strategy expert. Generate the perfect hashtag set for ${platform} about: "${req.topic}".

Create:
- 5 HIGH volume hashtags (1M+ posts) — for reach
- 8 MEDIUM volume hashtags (100K-1M posts) — for engagement  
- 7 NICHE hashtags (under 100K) — for community${extra}

Format:
## High Volume
#hashtag1 #hashtag2 ...

## Medium Volume
#hashtag1 #hashtag2 ...

## Niche/Community
#hashtag1 #hashtag2 ...

## Ready to Copy
[all hashtags in one line]

Output only the hashtags and headings.`

    default:
      return `Write helpful content about: ${req.topic}`
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    )
  }

  // Parse body
  let body: GenerateRequest
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  // Validate
  const { tool, topic, platform, tone } = body
  if (!tool || !topic || !platform || !tone) {
    return NextResponse.json({ error: 'Missing required fields: tool, topic, platform, tone' }, { status: 400 })
  }
  if (topic.trim().length < 3) {
    return NextResponse.json({ error: 'Topic must be at least 3 characters' }, { status: 400 })
  }
  if (topic.length > 500) {
    return NextResponse.json({ error: 'Topic too long (max 500 characters)' }, { status: 400 })
  }

  // Check API key
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured. Please add it to your environment variables.' },
      { status: 500 }
    )
  }

  // Generate
  try {
    const prompt = buildPrompt(body)

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('\n')

    return NextResponse.json({
      content,
      tool,
      tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
    })
  } catch (err: unknown) {
    console.error('Anthropic API error:', err)

    if (err && typeof err === 'object' && 'status' in err) {
      const apiErr = err as { status: number; message?: string }
      if (apiErr.status === 401) {
        return NextResponse.json({ error: 'Invalid API key. Check your ANTHROPIC_API_KEY.' }, { status: 401 })
      }
      if (apiErr.status === 429) {
        return NextResponse.json({ error: 'AI rate limit reached. Try again in a moment.' }, { status: 429 })
      }
      if (apiErr.status === 529) {
        return NextResponse.json({ error: 'AI service overloaded. Try again shortly.' }, { status: 503 })
      }
    }

    return NextResponse.json({ error: 'AI generation failed. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'NeuroVerse AI API is running',
    version: '1.0.0',
    endpoints: ['POST /api/generate'],
  })
}

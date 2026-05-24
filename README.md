# NeuroVerse — AI Content Studio

> AI-powered captions, hooks, scripts & hashtags for creators.
> Built with Next.js 14 + Claude AI.

---

## ✨ Features

- **AI Caption Generator** — Viral captions for Instagram, TikTok, YouTube, Twitter, LinkedIn
- **AI Hook Generator** — 5 scroll-stopping opening lines per generation
- **AI Script Writer** — Full structured video scripts with timestamps
- **AI Hashtag Generator** — Strategic 3-tier hashtag sets
- **Platform-aware** — Output tuned for each social platform
- **6 Tone modes** — Viral, Professional, Funny, Emotional, Educational, Bold
- **Rate limiting** — Built-in API protection
- **Mobile-first** — Perfect on all screen sizes
- **No database needed** — Stateless, deploy anywhere

---

## 🚀 Quick Start (Local)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd neuroverse
npm install
```

### 2. Set Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

Get your key from: https://console.anthropic.com/

### 3. Run Dev Server

```bash
npm run dev
```

Open http://localhost:3000 ✅

---

## 🌐 Deploy to Vercel (Recommended)

### Option A — Vercel Dashboard (Easiest)

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Add environment variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-key-here`
5. Click **Deploy**
6. ✅ Live in ~2 minutes

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts
# Add env var when asked: ANTHROPIC_API_KEY
vercel --prod
```

### Custom Domain (Vercel)

1. Go to your project on vercel.com
2. Settings → Domains
3. Add your domain (e.g. `neuroverse.com`)
4. Update DNS at your registrar:
   - **A Record:** `76.76.19.19`
   - **CNAME:** `cname.vercel-dns.com`
5. Wait 5-30 mins for DNS propagation ✅

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | ✅ Yes | Your Anthropic API key |
| `NEXT_PUBLIC_APP_URL` | No | Your production URL |
| `RATE_LIMIT_MAX` | No | Max requests/minute (default: 50) |
| `RATE_LIMIT_WINDOW_MS` | No | Rate window in ms (default: 60000) |

---

## 📁 Project Structure

```
neuroverse/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/route.ts   ← AI backend (Claude API)
│   │   │   └── health/route.ts     ← Health check
│   │   ├── dashboard/page.tsx      ← Dashboard
│   │   ├── captions/page.tsx       ← Caption tool
│   │   ├── hooks/page.tsx          ← Hook tool
│   │   ├── scripts/page.tsx        ← Script tool
│   │   ├── hashtags/page.tsx       ← Hashtag tool
│   │   ├── layout.tsx              ← Root layout
│   │   ├── page.tsx                ← Landing page
│   │   └── globals.css             ← Global styles
│   ├── components/
│   │   ├── tools/AITool.tsx        ← Core AI tool component
│   │   ├── ui/index.tsx            ← Reusable UI components
│   │   └── Navbar.tsx              ← Navigation
│   └── types/index.ts              ← TypeScript types
├── .env.example                    ← Env template
├── vercel.json                     ← Vercel config
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI | Anthropic Claude (claude-sonnet-4) |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🔒 Security

- Rate limiting on all API routes
- Input validation & sanitization
- No user data stored
- Environment variables for secrets
- API key never exposed to frontend

---

## 💡 Usage Tips

1. **Be specific** with your topic — "Morning gym routine for beginners" beats "fitness"
2. **Try multiple tones** — Regenerate with different tones to find what works
3. **Use Extra Context** — Add brand voice, target audience, or product details
4. **Regenerate freely** — Each generation is unique; run it 3-5 times

---

## 📞 API Reference

### `POST /api/generate`

Generate AI content.

**Body:**
```json
{
  "tool": "caption | hook | script | hashtag",
  "topic": "string (3-500 chars)",
  "platform": "instagram | tiktok | youtube | twitter | linkedin",
  "tone": "viral | professional | funny | emotional | educational | controversial",
  "extraContext": "string (optional)"
}
```

**Response:**
```json
{
  "content": "Generated content...",
  "tool": "caption",
  "tokensUsed": 245
}
```

### `GET /api/health`

Check API status.

---

## 📄 License

MIT — free to use, modify, and deploy.

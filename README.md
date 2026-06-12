# CINEMATCH 🎬🎮

> _Tell me how you feel. I'll pick your movie or game for tonight — and say why._

CINEMATCH is a web application where you describe your mood in plain words and an **AI** plus a **C scoring engine** recommend the perfect movie or game from a curated library of 55 titles, with a warm explanation of why.

---

## How it works

```
You type your mood
       ↓
AI (OpenRouter / Qwen3) converts mood → structured preferences
       ↓
C engine scores all 55 titles and picks the best match
       ↓
AI writes a 2–3 sentence explanation just for you
       ↓
Result card appears in the browser
```

The five preferences the C engine scores on: **medium** (Movie/Game), **genre**, **time available** (short/medium/long), **mood**, and **social setting** (solo/group).

---

## Project structure

```
movie-recommender/
├── engine/          C scoring engine (cinematch.exe) — deterministic title picker
├── server/          Node.js backend — orchestrates AI + engine (DDD architecture)
│   └── src/
│       ├── domain/          core concepts & rules (Preferences)
│       ├── application/     use cases (moodToPreferences, explainRecommendation, recommendForMood)
│       ├── infrastructure/  outside world (OpenRouter AI client, C engine runner)
│       └── interfaces/      HTTP API (Express)
├── web/             React + Vite front end
├── docs/            VISION.md, DECISIONS.md, GLOSSARY.md
└── CLAUDE.md        Instructions for every AI agent working on this project
```

---

## Quick start

### Prerequisites
- [Node.js LTS](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- [GCC](https://gcc.gnu.org/) (for compiling the C engine — already compiled as `engine/cinematch.exe`)

### 1. Clone
```bash
git clone https://github.com/zubaydullayevasliddin06-cmd/movie-recommender-c.Asliddin-Ismail-Chae-Hunwoo.git
cd movie-recommender-c.Asliddin-Ismail-Chae-Hunwoo
```

### 2. Set up the API key
Create `server/.env` (this file is git-ignored — never commit it):
```
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=qwen/qwen3-235b-a22b:free
PORT=3000
```
Get a free key at [openrouter.ai](https://openrouter.ai). The app uses free Chinese LLMs (Qwen3, DeepSeek) and falls back through a chain automatically.

### 3. Install dependencies
```bash
# Backend
cd server && pnpm install && cd ..

# Frontend
cd web && pnpm install && cd ..
```

### 4. Run in development
Open **two terminals**:

**Terminal 1 — backend (port 3000):**
```bash
cd server
node server.js
```

**Terminal 2 — frontend (port 5173):**
```bash
cd web
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production
```bash
cd web && pnpm build
# Built output lands in web/dist/ and is served automatically by the backend
cd ../server && node server.js
# Open http://localhost:3000
```

---

## C engine

The scoring engine is written in C for deterministic, fast title matching.

**Compile:**
```bash
cd engine
gcc -o cinematch main.c recommend.c
```

**Engine mode (used by the Node backend):**
```bash
./cinematch Movie action short intense solo
# → {"found":true,"title":"Mad Max: Fury Road","year":2015,"genre":"Action","type":"Movie","mood":"Intense","timeNeed":"Short","social":"Solo","rating":8.1,"desc":"..."}
```

**Interactive mode (for testing):**
```bash
./cinematch
```

---

## Architecture: Domain-Driven Design

This project uses **DDD** (Domain-Driven Design) to keep business logic separate from infrastructure:

| Layer | What it does | Files |
|---|---|---|
| **Domain** | Core rules — what a valid Preference is | `server/src/domain/preferences.js` |
| **Application** | Use cases — understand mood, pick title, explain | `server/src/application/` |
| **Infrastructure** | Talk to the outside world — OpenRouter, C engine | `server/src/infrastructure/` |
| **Interfaces** | HTTP API, serves the React app | `server/src/interfaces/httpApi.js` |

---

## AI reliability

Free LLM models can be slow or rate-limited. The app handles this with:
- **Multi-model fallback chain:** Qwen3 → Llama-3.3-70B → GPT-OSS-120B
- **Automatic retry** on rate-limit (429) or server errors (5xx)
- **Keyword fallback:** if all AI fails, a local keyword matcher still picks preferences — the app never crashes in a demo

---

## Team

- **Asliddin** — lead developer
- **CINEMATCH AI agent** (Claude) — senior technical lead, handles all git/GitHub

_Software Engineering capstone project · Sejong University · 2025_

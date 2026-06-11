# VISION.md — What we are building (single source of truth)

> **Status: AGREED.** Defined with the team using the `grill-me` process. The build order
> and live progress are in [ROADMAP.md](ROADMAP.md). Every change to direction must be
> logged in [DECISIONS.md](DECISIONS.md) first.

## One-sentence pitch
CINEMATCH is a web app where you describe your mood in plain words, and an AI + a C
engine instantly pick the perfect movie or game for tonight — and tell you *why*.

## The problem we solve
People waste time scrolling, unable to decide what to watch or play. CINEMATCH turns a
vague "something light and short" into one confident, explained recommendation.

## Who it is for
Anyone deciding what to watch or play tonight — and, for grading, it's a clear demo of a
complete AI product for the Software Engineering course.

## What it does (core features — the MLP)
1. You type how you feel in plain English (e.g. "scary but short, with friends").
2. An **AI** converts that into structured preferences (medium, genre, time, mood, social).
3. A **C "recommendation engine"** scores the 55-title library and picks the best match.
4. The **AI** writes a short, personalized reason for the pick.
5. The result is shown in the browser.

## How AI / an LLM is used (professor's requirement)
An LLM is used at **both ends**: (a) to understand the user's free-text mood and turn it
into structured answers, and (b) to write a personalized explanation of the chosen title.
The deterministic scoring stays in C. Provider: **OpenRouter (free models)** — see D-003.

## Tech stack & architecture
A **Domain-Driven Design (DDD)** layout — separate the business idea from the plumbing:

| DDD layer | Job | Technology |
|-----------|-----|------------|
| **interfaces** | What users reach: the web page + HTTP API | **Vite + React** (`web/`), Express routes |
| **application** | Use cases: understand mood → pick → explain | Node.js (`server/src/application`) |
| **domain** | Core concepts & rules (Preferences, Title, Recommendation) | Node.js + the **C engine** scoring |
| **infrastructure** | The outside world: AI client, C-engine runner | OpenRouter (free LLMs), child process |
| **data** | The 55 titles | `engine/titles.h` |

The Node backend runs the compiled C program behind the scenes (as a child process),
passing data in/out as JSON. **Package manager: pnpm.** This keeps the C work central
(the scoring) while the AI handles language understanding and explanations.

## What "done" looks like (what we submit to the professor)
A user can open the app, type a mood, and reliably get an explained recommendation,
end-to-end. Deliverables:
- **Live demo** of the working app on the laptop.
- **Written report** (Word document) — problem, design, architecture, AI use; generated from these docs.
- **Presentation slides** (PowerPoint) — a short deck to present.
- **Source code** — this GitHub repo, clean and committed, with a clear README.

## Out of scope (so we don't drift)
User accounts, databases, deploying to the public internet, payments, more than the 55
built-in titles, and mobile apps. Anything beyond one clean recommendation flow is out
for now.

---

## Current code state (facts, not plans)
- C console app **CINEMATCH**: a 5-question quiz → one recommendation from a library of
  55 titles (30 movies + 25 games), chosen by a rule-based point score.
- Files: `main.c` (the quiz), `titles.h` (data + `Title` struct). We will create the
  missing `recommend.c` / `recommend.h` and add a "engine mode" the server can call.
- These files are being organized into `engine/` (C) and `server/` (Node) — see D-006.

## Agreed decisions (summary — full reasons in DECISIONS.md)
**Round 1 (constraints):**
- Software Engineering / Capstone course → graded on a working, well-structured product.
- C preferred but flexible → we keep C as the engine.
- Keep **CINEMATCH** — an AI movie & game recommender with a web UI.
- Deadline < 1 week → target a **Minimum Lovable Product**, no scope creep.

**Round 2 (architecture):**
- Design: **Smart input + C engine + AI explainer** (AI on both ends, C central).
- AI provider: **OpenRouter free models** (e.g. DeepSeek/Qwen) — locked, do not change.

**Round 3 (scope & delivery):**
- Front end: **simple page first**, upgrade to React if time allows.
- Deliverables: live demo + written report + slides + GitHub source — all four.

## Status: vision agreed — now building
Tooling: gcc ✅ ready · Node.js ⏳ installing · OpenRouter API key ⛔ team must create one.
See [ROADMAP.md](ROADMAP.md) for the step-by-step build and current progress.

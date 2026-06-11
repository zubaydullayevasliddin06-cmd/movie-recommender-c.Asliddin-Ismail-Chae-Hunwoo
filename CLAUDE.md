# CLAUDE.md — How to work in this repository

This file is the entry point for **every AI agent and every human** who works on this
project. Read it fully before doing anything. The team will switch between different AIs,
so these files — not memory — keep everyone building **the same thing**.

> ⚠️ **Open Claude Code from *inside this project folder*** (the `movie-recommender`
> folder), not the Desktop. Otherwise the skills in `.claude/skills/` and this file won't
> load automatically.

---

## 0. Your role
You are the team's **senior technical lead**. The team are first-year students and
beginners (the main user is **Asliddin**, who does not know git). So:
- **You take ownership** of technical decisions and all git/GitHub work.
- **You explain in plain English**, defining each technical term once. No unexplained jargon.
- **You guide**: when something is unclear, ask one focused question (use `grill-me`) rather than guessing.

## 1. Always follow TODO.md
[TODO.md](TODO.md) is the master checklist. Each session:
1. Open `TODO.md`, find the **first unchecked `[ ]` item**, and do that.
2. Tick it `[x]` when done and save.
3. Work smallest → biggest, one step at a time.

## 2. One shared vision, no drift
Source-of-truth documents — keep them current:
- [docs/VISION.md](docs/VISION.md) — what we're building and why.
- [docs/DECISIONS.md](docs/DECISIONS.md) — every decision + its reason (append-only).
- [docs/GLOSSARY.md](docs/GLOSSARY.md) — the shared words we use (the "ubiquitous language").

If a task would contradict these, **stop and ask**. New ideas are welcome but must be
logged in `DECISIONS.md` *before* code changes.

## 3. The product (one line)
**CINEMATCH** — a web app where you describe your mood in plain words, and an **AI** plus a
**C engine** pick the perfect movie or game for tonight and explain why. Full detail in VISION.

## 4. Architecture: Domain-Driven Design (DDD)
DDD = keep the **business idea** separate from the **plumbing**. Layers:
- **domain** — the core concepts & rules (Preferences, Title, Recommendation). No web/AI code here.
- **application** — the use cases that orchestrate steps (understand mood → pick → explain).
- **infrastructure** — the outside world: the OpenRouter AI client, and the runner for the C engine.
- **interfaces** — how users reach it: the HTTP API and the Vite/React web page.

The deterministic scoring lives in the **C engine** (`engine/`). The Node backend
(`server/`) orchestrates AI + engine. The front end (`web/`) is **Vite + React**.
Package manager: **pnpm**.

## 5. Code standards (clean code)
- Small functions, one job each; clear names; comments explain **why**, not the obvious.
- Match the style of the file you're editing. Don't add a dependency without logging why.
- Keep each DDD layer free of the layers it shouldn't know about (domain knows nothing about HTTP/AI).

## 6. Git & GitHub (you do this for the team)
- Commit as **Asliddin** (the AI handles all git; the team can't).
- After each phase in TODO.md: update `README.md`, then **commit and push to `main`**.
- Never commit secrets. `server/.env` (the API key) is git-ignored — keep it that way.
- Pushing needs Asliddin to authenticate once (see `SETUP.md`).

## 7. Skills (auto-trigger)
Matt Pocock's skills live in `.claude/skills/` and load automatically when Claude Code is
opened inside this folder. Most useful here:
- `grill-me` / `grill-with-docs` — interview the team to nail down requirements.
- `handoff` — write a clean handoff when switching to another AI.
- `teach` — explain concepts to a beginner.
- `git-guardrails` — avoid dangerous git mistakes.

## 8. Current state & how to run
See [TODO.md](TODO.md) for live progress.
- `engine/` — the C engine. Compiles to `cinematch.exe`. Engine mode:
  `cinematch <medium> <genre> <time> <mood> <social>` → prints the pick as JSON.
- `server/` — Node backend (orchestrates AI + engine). Needs `server/.env` with the key.
- `web/` — the Vite + React front end (being built).
- Full run/build steps live in the root `README.md` and `SETUP.md`.

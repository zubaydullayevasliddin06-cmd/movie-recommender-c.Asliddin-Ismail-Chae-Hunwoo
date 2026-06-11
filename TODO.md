# TODO.md — the live task list (single source of truth for work)

> **Read this first, every session.** This is the master checklist. Work top-to-bottom,
> do the **first unchecked `[ ]` item**, finish it, then tick it `[x]` and save this file.
> One step at a time, smallest → biggest. The "why" behind the product is in
> [docs/VISION.md](docs/VISION.md); big choices are logged in [docs/DECISIONS.md](docs/DECISIONS.md).

## Working rules (for every AI agent and teammate)
- ✅ Tick items the moment they're done; add a short note if useful.
- 🧭 Don't change direction without first logging it in `docs/DECISIONS.md`.
- 🗣️ The team are beginners — explain in plain English, define jargon once.
- 🔁 After each phase: refresh `README.md`, then commit & push (as **Asliddin** — the AI does git).
- ❓ When unsure, ask one focused question (the `grill-me` skill) instead of guessing.

---

## Phase 0 — Foundations  ✅ DONE
- [x] Collaboration docs (CLAUDE.md, VISION.md, DECISIONS.md) + `grill-me` skill created
- [x] Tools: gcc ✅, Node.js ✅; OpenRouter key saved in `server/.env` (free Qwen3 model)
- [x] C engine: created `recommend.c` / `recommend.h` + "engine mode" (prints JSON); compiled & tested
- [x] Full pipeline proven: text → AI → C engine → AI explanation → "Get Out" 🎬
- [x] AI hardened: multi-model fallback chain + retry + keyword fallback (won't crash in a demo)

## Phase 1 — Tooling & skills  ✅ DONE
- [x] Installed **pnpm** 11.5.3 and confirmed it works
- [x] Installed **Matt Pocock's skills** into `.claude/skills/` (repo) AND `~/.claude/skills/` (auto-trigger)
- [x] Documented: open Claude Code **inside the project folder** so skills + CLAUDE.md load (see CLAUDE.md/README)

## Phase 2 — Restructure backend to DDD (Domain-Driven Design)  ✅ DONE
> DDD just means: separate the **business idea** (recommending) from the **plumbing** (web, AI, processes).
- [x] `server/src/domain/preferences.js` (the 5 answers, allowed values, validation)
- [x] `server/src/infrastructure/` — `openrouterClient.js` (AI calls) + `cEngine.js` (runs `cinematch.exe`)
- [x] `server/src/application/` — `moodToPreferences.js`, `explainRecommendation.js`, `recommendForMood.js` (the use case)
- [x] `server/src/interfaces/httpApi.js` (Express routes); thin `server/server.js` entry; **retested end-to-end** (Stardew Valley ✅)
- [x] `docs/GLOSSARY.md` — the ubiquitous language (Title, Preferences, Recommendation, …)

## Phase 3 — Vite + React front end (`web/`)
- [ ] Scaffold a Vite + React app in `web/` with pnpm
- [ ] `vite.config.js` proxy: `/api` → backend at `http://localhost:3000`
- [ ] Build the UI: a mood text box, a button, and a result card (port the existing simple page to React)
- [ ] Test the whole thing in the browser, end-to-end

## Phase 4 — Run config & demo
- [ ] `.claude/launch.json` with two servers: `backend` (:3000) and `web` (:5173)
- [ ] Document the one-command run in `README.md` and `SETUP.md`
- [ ] Rehearse the live demo and confirm it's reliable

## Phase 5 — Git & GitHub (the AI does this for Asliddin)
- [ ] Set git identity to Asliddin (needs his **GitHub email**)
- [ ] Authenticate to GitHub (needs **Asliddin to log in once** — see SETUP.md)  ← blocker for pushing
- [ ] Commit the work so far and push to `main`
- [ ] Keep pushing at the end of each phase

## Phase 6 — Deliverables for the professor
- [ ] Polished root `README.md` (what/why, how to run, architecture diagram)
- [ ] `SETUP.md` — beginner step-by-step (install + run + get a key)
- [ ] Written **report** (Word) generated from the docs
- [ ] **Presentation slides** (PowerPoint)
- [ ] Final demo rehearsal + checklist

## Phase 7 — Stretch (only if time remains)
- [ ] Tests (TDD) for the domain layer
- [ ] Nicer UI: example chips, loading animation, error states
- [ ] Deploy somewhere simple

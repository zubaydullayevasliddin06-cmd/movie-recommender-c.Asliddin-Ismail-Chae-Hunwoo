# DECISIONS.md — Decision log (append-only)

> Every significant choice goes here so nobody re-argues a settled question and no
> context is lost between teammates or AI sessions. **Add new entries at the bottom.**

**Format for each entry:**
- **ID:** `D-NNN`
- **Date:** YYYY-MM-DD
- **Decision:** what we chose
- **Why:** the reason in one or two sentences
- **Status:** proposed · accepted · superseded by D-XXX

---

### D-000 — 2026-06-11 — Set up the collaboration environment first
**Decision:** Before writing product code, establish `CLAUDE.md`, `docs/VISION.md`,
`docs/DECISIONS.md`, and install the `grill-me` skill. Define the product vision through
structured questioning before building.
**Why:** The idea is not yet concrete. In a multi-person, multi-AI project, building
before alignment causes rework and "context drift". This environment keeps everyone
pointed at one vision.
**Status:** accepted

---

### D-001 — 2026-06-11 — Project direction set (Round 1 grilling)
**Decision:** Build **CINEMATCH** as a web-based, AI-powered movie & game recommender for a
Software Engineering capstone. C is preferred but flexible. Deadline is under a week, so we
target a **Minimum Lovable Product**: one clean, working end-to-end flow, no scope creep.
**Why:** These four constraints (chosen by the team) gate every later choice. Capturing
them keeps all teammates and AI sessions aligned.
**Status:** accepted

---

### D-002 — 2026-06-11 — Architecture: Smart input + C engine + AI explainer
**Decision:** End-to-end flow: web UI → user types mood in plain English → Node/Express
backend → LLM converts the text into structured preferences → **C engine** scores the
library and picks the match → LLM writes a personalized explanation → result shown in the
browser. AI is used on both ends; the deterministic scoring stays in C. The Node server
calls the compiled C program as a child process, exchanging JSON.
**Why:** Chosen by the team in Round 2. Keeps the C work central (a strong capstone story)
and uses AI meaningfully, while staying achievable in under a week via simple child-process
calls rather than complex language interop.
**Status:** accepted

---

### D-003 — 2026-06-11 — AI provider: OpenRouter free models (LOCKED)
**Decision:** Use **OpenRouter** (https://openrouter.ai) with its **free models** (e.g.
Chinese models such as DeepSeek / Qwen). OpenRouter is OpenAI-API-compatible, so we use the
standard OpenAI client pointed at OpenRouter's base URL with an OpenRouter API key. **Do not
change this provider** (explicit team instruction).
**Why:** Zero cost for students, no paid key required, and good-enough quality for the MLP.
**Status:** accepted

---

### D-004 — 2026-06-11 — Front end: simple page first, React if time
**Decision:** Build the front end as one clean HTML/CSS/JavaScript page served by the Node
server. Upgrade to React (Vite) only if time remains.
**Why:** Under a week with a non-technical teammate, a no-build page is far less likely to
break than a React toolchain. Get a working demo first, polish later.
**Status:** accepted

---

### D-005 — 2026-06-11 — Deliverables for the professor
**Decision:** Produce all four: (1) live demo of the app, (2) written report as a Word
document, (3) presentation slides (PowerPoint), (4) clean source on this GitHub repo. The
report and slides are generated from VISION.md / DECISIONS.md near the end.
**Why:** The team confirmed all four are required for the Software Engineering capstone.
**Status:** accepted

---

### D-006 — 2026-06-11 — Project structure: engine/ (C) + server/ (Node)
**Decision:** Organize the repo by responsibility: `engine/` holds the C recommendation
engine (existing `main.c`, `titles.h`, plus new `recommend.c` / `recommend.h`); `server/`
holds the Node backend and the web page (`server/public/`). Docs stay in `docs/`.
**Why:** Clean separation of the C "Model" from the Node "Controller/View" makes the
architecture obvious for grading and keeps C and JavaScript files from mixing.
**Status:** accepted

---

### D-007 — 2026-06-11 — Architecture style: Domain-Driven Design (DDD)
**Decision:** Structure the Node backend in DDD layers — `domain` (core concepts/rules),
`application` (use cases), `infrastructure` (AI client, C-engine runner), `interfaces`
(HTTP API + web). The C engine is the domain's scoring service.
**Why:** The team (software-engineering capstone) asked for DDD; it makes the architecture
clear for grading and teaches clean separation. Refines the MVC framing in D-002.
**Status:** accepted

---

### D-008 — 2026-06-11 — Front end: Vite + React (supersedes D-004)
**Decision:** Build the front end as a **Vite + React** app in `web/`, with Vite proxying
`/api` to the Node backend. Supersedes D-004 (plain HTML page).
**Why:** The team asked for Vite ("very easy to use") and React. Vite gives a fast, modern
dev experience with little setup.
**Status:** accepted — supersedes D-004

---

### D-009 — 2026-06-11 — Package manager: pnpm
**Decision:** Use **pnpm** (installed via `corepack`, which ships with Node) for both
`server/` and `web/`.
**Why:** The team asked for pnpm or bun; pnpm is fast, disk-efficient, and available
through corepack with no extra install.
**Status:** accepted

---

### D-010 — 2026-06-11 — Install Matt Pocock's skills (auto-trigger)
**Decision:** Install a curated set of Matt Pocock's Claude Code skills into
`.claude/skills/` (committed with the repo) and the user's `~/.claude/skills/` so they
auto-trigger. Key ones: grill-me, grill-with-docs, handoff, teach, git-guardrails, tdd,
ubiquitous-language.
**Why:** The team can't drive these manually (beginners). Auto-triggering skills enforce
good practice (requirements grilling, clean handoffs between AIs, teaching).
**Status:** accepted

---

### D-011 — 2026-06-11 — AI: free model + resilience
**Decision:** Use a **free** OpenRouter model (default `qwen/qwen3-next-80b-a3b-instruct:free`,
a Chinese model) with a fallback chain to other free models, retry on rate-limits, and a
keyword fallback if the AI is unavailable.
**Why:** Zero budget; free models get rate-limited, so the app must degrade gracefully and
never crash during a live demo. (DeepSeek's free tier was discontinued, hence Qwen3.)
**Status:** accepted

---

### D-012 — 2026-06-11 — The AI owns git; commit as Asliddin
**Decision:** The AI performs all git/GitHub operations on the team's behalf, committing as
**Asliddin**, and pushes to `main` after each phase. Pushing requires Asliddin to
authenticate to GitHub once.
**Why:** The team doesn't know git. Frequent commits/pushes keep work safe and reviewable.
**Status:** accepted (authentication pending)


# 🎬 CINEMATCH — Final Demo Checklist

Print this or keep it open on your phone during the presentation. Follow it top to bottom.

---

## ⏰ 15 minutes BEFORE the demo

- [ ] **Laptop charged** and charger in the bag (or plugged in at the venue).
- [ ] **Internet works** — the AI and the Movies/Games pages need it. Have a phone hotspot ready as backup.
- [ ] **API keys are in place:**
  - [ ] `server/.env` has `OPENROUTER_API_KEY` (for the AI).
  - [ ] `web/.env.local` has `VITE_TMDB_KEY` and `VITE_RAWG_KEY` (for Movies & Games).
- [ ] **Close other apps** so the laptop is fast and the screen is clean.
- [ ] **Browser zoom at 100%**, no embarrassing tabs open.

---

## 🚀 Start the app (two terminals)

**Terminal 1 — backend (the brain):**
```
cd "server"
node server.js
```
- [ ] You see: `CINEMATCH is running.  Open  http://localhost:3000`

**Terminal 2 — frontend (the website):**
```
cd "web"
npm run dev
```
- [ ] You see: `Local:  http://localhost:5173/`

**Browser:**
- [ ] Open **http://localhost:5173** — the CINEMATCH page loads.

> ⚠️ If port 5173 is taken, the terminal will say `5174` — use that number instead.

---

## ✅ Smoke test (do this BEFORE presenting)

Run one full query so the AI is "warm" and you know it works:

- [ ] On **✨ AI Match**, type: `something relaxing and cozy to play alone tonight`
- [ ] Click **Find my match** → wait → a result card appears with a title + explanation.
- [ ] Click **🎬 Movies** → real posters load.
- [ ] Click **🎮 Games** → real game covers load.
- [ ] Click **💬 Discussion** → search `Interstellar` → pick it → cast + AI analysis appears.

If all four pages work, you are ready. 🎉

---

## 🎤 Demo script (≈ 4 minutes)

1. **The hook (15s)** — "We waste more time choosing what to watch than watching. CINEMATCH gives you one answer, and tells you why."
2. **AI Match (60s)** — Type a real mood out loud, e.g. `scary but short, watching with friends`. While it thinks, explain: *"An AI is turning my words into preferences, then a C engine scores 55 titles, then the AI explains the pick."* Read the result.
3. **The architecture (45s)** — "The clever part: **AI handles language, C handles the logic.** They talk through JSON." (Show the slide.)
4. **Movies & Games (45s)** — Click both tabs. "These pull from open datasets — TMDB has thousands of films, RAWG has 800,000+ games."
5. **Discussion (60s)** — Search a movie everyone knows. "The AI writes a full discussion — theme, epic moments, questions." Scroll through it.
6. **Close (15s)** — "Classic C meets modern AI, in one clean product. Thank you."

---

## 🛟 If something breaks (stay calm)

| Problem | What to say / do |
|---|---|
| AI is slow (15–30s) | "Free models take a moment — it's scoring 55 titles." Keep talking. |
| AI shows an error | Click the button again — the retry + fallback usually fixes it. |
| Movies/Games empty | Internet or API key issue — switch to AI Match, which works offline-ish. |
| A page looks odd | Refresh the browser (F5). |
| Backend crashed | In Terminal 1: press Ctrl+C, then `node server.js` again. |

**Golden rule:** the AI Match page has a keyword fallback, so it will *always* return a recommendation even if the AI is down. If in doubt, demo that page.

---

## 📦 Deliverables to hand in

- [ ] **Live demo** — this app, running (above).
- [ ] **Written report** — `deliverables/CINEMATCH-Report.docx`
- [ ] **Presentation slides** — `deliverables/CINEMATCH-Presentation.pptx`
- [ ] **Source code** — the GitHub repository (clean, committed, with README).

---

## 🔒 After the demo

- [ ] **Rotate / delete the OpenRouter API key** that was shared during development (security hygiene).
- [ ] Stop both servers with **Ctrl + C**.

Good luck — you built something real. 🚀

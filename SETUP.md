# SETUP.md — How to run CINEMATCH on your computer

This guide is written for **Asliddin** and any teammate who is new to coding.
Follow each step exactly. If something goes wrong, ask your AI agent — paste the error message.

---

## Step 1 — Install the tools (do this once)

### Node.js (the JavaScript engine)
1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS** version (the big green button)
3. Run the installer, click Next → Next → Install
4. Open a new terminal and type: `node --version`
   You should see something like `v20.x.x`. ✅

### pnpm (the package manager — faster than npm)
In your terminal, type:
```
npm install -g pnpm
```
Check it works: `pnpm --version` → should print `11.x.x` ✅

### GCC (the C compiler — only needed if you want to recompile the engine)
The compiled engine (`engine/cinematch.exe`) is already in the repo.
You only need GCC if you change the C code. Skip for now.

---

## Step 2 — Get the project

In your terminal:
```
git clone https://github.com/zubaydullayevasliddin06-cmd/movie-recommender-c.Asliddin-Ismail-Chae-Hunwoo.git
cd movie-recommender-c.Asliddin-Ismail-Chae-Hunwoo
```

---

## Step 3 — Add your API key

The AI part needs a key to talk to the AI service (OpenRouter). This key is **secret** — never share it or commit it to git.

1. Go to [https://openrouter.ai](https://openrouter.ai) → sign up (free)
2. Click your profile → **Keys** → **Create key**
3. Copy the key (it looks like `sk-or-v1-...`)
4. In the project, open the `server/` folder
5. Create a new file called `.env` (just the dot, then env — no other extension)
6. Paste this into it, replacing `YOUR_KEY_HERE` with your actual key:

```
OPENROUTER_API_KEY=YOUR_KEY_HERE
OPENROUTER_MODEL=qwen/qwen3-235b-a22b:free
PORT=3000
```

7. Save the file. The `.env` file will **never** be committed to GitHub — it's in `.gitignore`.

---

## Step 4 — Install the project's packages

The project needs to download some helper libraries. Run these commands:

**Backend (the server):**
```
cd server
pnpm install
cd ..
```

**Frontend (the website):**
```
cd web
pnpm install
cd ..
```

This only downloads tools into `node_modules/` folders. It is safe and can be re-run any time.

---

## Step 5 — Run the project

You need **two terminal windows open at the same time**.

### Terminal 1 — Start the backend (the brain)
```
cd server
node server.js
```
You should see:
```
CINEMATCH is running.  Open  http://localhost:3000  in your browser.
```

### Terminal 2 — Start the frontend (the website)
```
cd web
pnpm dev
```
You should see:
```
  VITE v8.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
```

### Open the app
Open your browser and go to: **http://localhost:5173**

You should see the CINEMATCH page. Type something like:
> _"something scary to watch with friends"_

Then click **Find my match**. Wait 5–20 seconds (the AI is thinking). You'll get a recommendation!

---

## Step 6 — Stop the servers

In each terminal, press **Ctrl + C** to stop.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `node: command not found` | Re-install Node.js from nodejs.org, open a fresh terminal |
| `pnpm: command not found` | Run `npm install -g pnpm` again |
| `OPENROUTER_API_KEY not set` | Check `server/.env` exists and has the right key |
| AI returns an error | Free models rate-limit; wait 30 seconds and try again |
| `cinematch.exe not found` | Run `cd engine && gcc -o cinematch main.c recommend.c` |
| Port 3000 already in use | Change `PORT=3001` in `server/.env` and restart the backend |

---

## How to recompile the C engine (optional)

Only needed if you edit `engine/recommend.c` or `engine/main.c`:

```
cd engine
gcc -o cinematch main.c recommend.c
```

This creates a new `cinematch.exe` (Windows) or `cinematch` (Mac/Linux).

---

## Git cheat sheet (the AI handles this for you, but just in case)

| What | Command |
|---|---|
| See what changed | `git status` |
| Save your changes | `git add -A && git commit -m "your message"` |
| Upload to GitHub | `git push` |
| Download latest changes | `git pull` |

> ⚠️ **Never commit `server/.env`** — it contains your secret API key.

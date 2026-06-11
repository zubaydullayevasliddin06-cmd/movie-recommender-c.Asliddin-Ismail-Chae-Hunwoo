# GLOSSARY.md — our shared words (the "ubiquitous language")

> In Domain-Driven Design, everyone — the code, the docs, and the people — uses the **same
> word for the same thing**. This avoids confusion. If you add a concept, add it here too.

- **CINEMATCH** — the product: a web app that recommends a movie or game for tonight.
- **Title** — one movie or game in our library (e.g. "Get Out"). It has a type, genre, mood,
  timeNeed, social, rating, and description.
- **Medium** — whether a Title is a `Movie` or a `Game` (or `any` when the user doesn't mind).
- **Genre** — one of: action, comedy, scifi, drama, horror, cozy.
- **Mood** — one of: intense, light, deep, relaxed.
- **TimeNeed** — how long you have: short, medium, long.
- **Social** — solo or group (some Titles fit `any`).
- **Preferences** — the 5 answers that describe what the user wants tonight
  (medium, genre, timeNeed, mood, social). This is a core domain value object.
- **Recommendation** — the final result: a chosen Title **plus** a friendly explanation of why it fits.
- **Library** — the fixed set of 55 Titles (defined in `engine/titles.h`).
- **Engine** — the C program that scores the Library against the Preferences and picks the best Title.

### Where each idea lives in the code (DDD layers)
- **domain** (`server/src/domain`) — Preferences and its rules. Pure; no web/AI.
- **application** (`server/src/application`) — the use cases (understand mood → pick → explain).
- **infrastructure** (`server/src/infrastructure`) — the AI client and the C-engine runner.
- **interfaces** (`server/src/interfaces`, `web/`) — the HTTP API and the web page.

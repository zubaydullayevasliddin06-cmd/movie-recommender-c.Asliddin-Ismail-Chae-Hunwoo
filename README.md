# 🎬 CINEMATCH (C version) — Movie & Game Recommender

A console Movie & Game recommendation quiz in C. Answer 5 questions and the
program filters a library of **55 titles** (30 movies + 25 games) down to your
single best match using a rule-based scoring algorithm.

This is the **multi-file version**: the same program split across four files so
the data, the logic, and the program flow each live in their own place.

---

## ▶️ How to Compile and Run

You list both `.c` files when compiling (the `.h` headers are pulled in
automatically by `#include`, so you don't list them):

```bash
gcc main.c recommend.c -o cinematch

./cinematch          # macOS / Linux
cinematch.exe        # Windows
```

Then answer each question by typing a number and pressing Enter.

---

## 🗂️ The Four Files

```
Advanced-C-programming-project/
├── main.c          ← program flow: asks the questions, calls the recommender
├── titles.h        ← the data: the Title struct + the 55-title library
├── recommend.c     ← the logic: scoring + printing the matched result
├── recommend.h     ← declarations so main.c can call recommend()
└── README.md       ← this file
```

**How they connect:**

- `main.c` includes `recommend.h`, runs the quiz, and calls `recommend(...)`
  with the 5 answers. It never needs to know what a `Title` looks like.
- `recommend.h` declares the `recommend()` function and the `libSize` count —
  this is the "menu" of what `main.c` is allowed to call.
- `recommend.c` includes both headers, defines the title library (via
  `titles.h`), scores every title, and prints the best match.
- `titles.h` defines the `Title` struct and holds all the title data. It is
  included only by `recommend.c`, so the data is defined exactly once.

---

## 🧠 The Scoring

| Match | Points |
|-------|-------:|
| Genre match | +6 |
| Correct medium (movie/game) | +5 |
| Mood match | +4 |
| Exact time match | +3 |
| Adjacent time match | +1 |
| Social fit (solo/group) | +2 |
| Rating tiebreaker | + (rating ÷ 10) |

If you pick a specific medium, titles of the other type are skipped entirely.
The highest-scoring title is your match.

---

## 🛠️ Add Your Own Titles

Open `titles.h`, find the `library[]` array, and add a row:

```c
{"Movie","Your Title",2024,"scifi","deep","medium","any","8.5","One-line description."},
```

Order: `type`, `title`, `year`, `genre`, `mood`, `timeNeed`, `social`, `rating`,
`desc`. The `libSize` count updates automatically.

To change the questions or wording, edit `main.c`. To change how matches are
scored, edit the loop in `recommend.c`.

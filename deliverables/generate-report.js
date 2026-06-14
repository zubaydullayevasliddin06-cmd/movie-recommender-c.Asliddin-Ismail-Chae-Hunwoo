const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, LevelFormat, TableOfContents, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageBreak, PageNumber,
  Header, Footer, ExternalHyperlink,
} = require("docx");

// ---------- helpers ----------
const ACCENT = "C8781E";   // amber
const DARK   = "1A1D27";
const GREY   = "555555";
const LIGHT  = "F2EFE9";

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border,
  insideHorizontal: border, insideVertical: border };

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 140, line: 276 },
    children: [new TextRun({ text, ...opts })],
  });
}
function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 70, line: 264 },
    children: [new TextRun(text)],
  });
}
function bulletRuns(runs) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { after: 70, line: 264 },
    children: runs,
  });
}
function num(text) {
  return new Paragraph({
    numbering: { reference: "steps", level: 0 },
    spacing: { after: 70, line: 264 },
    children: [new TextRun(text)],
  });
}
function cell(text, { w, head = false, bold = false } = {}) {
  return new TableCell({
    borders,
    width: { size: w, type: WidthType.DXA },
    shading: head ? { fill: DARK, type: ShadingType.CLEAR } : { fill: "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: head || bold,
      color: head ? "FFFFFF" : "000000" })] })],
  });
}
function table(widths, rows) {
  const total = widths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, ri) =>
      new TableRow({
        children: r.map((c, ci) => cell(c, { w: widths[ci], head: ri === 0 })),
      })
    ),
  });
}
function spacer() { return new Paragraph({ children: [new TextRun("")] }); }

// ---------- document ----------
const doc = new Document({
  creator: "CINEMATCH Team",
  title: "CINEMATCH — Project Report",
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: ACCENT },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0,
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 25, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 220, after: 110 }, outlineLevel: 1 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 520, hanging: 260 } } } }] },
      { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 520, hanging: 260 } } } }] },
    ],
  },
  sections: [
    // ---- TITLE PAGE ----
    {
      properties: {
        page: { size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
      },
      children: [
        new Paragraph({ spacing: { before: 2600, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "🎬", size: 96 })] }),
        new Paragraph({ spacing: { before: 200, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "CINEMATCH", bold: true, size: 80, color: ACCENT, font: "Arial" })] }),
        new Paragraph({ spacing: { before: 120, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "An AI-Powered Movie & Game Recommender", size: 32, color: DARK })] }),
        new Paragraph({ spacing: { before: 60, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Describe your mood — get the perfect pick, and the reason why.",
            size: 22, italics: true, color: GREY })] }),
        new Paragraph({ spacing: { before: 1400, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Project Report", bold: true, size: 30 })] }),
        new Paragraph({ spacing: { before: 80, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Software Engineering — Capstone Project", size: 24 })] }),
        new Paragraph({ spacing: { before: 40, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Sejong University", size: 24 })] }),
        new Paragraph({ spacing: { before: 900, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Team Members", bold: true, size: 22, color: ACCENT })] }),
        new Paragraph({ spacing: { before: 40, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Asliddin Ismail  ·  Chae Hunwoo", size: 22 })] }),
        new Paragraph({ spacing: { before: 600, after: 0 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "June 2026", size: 20, color: GREY })] }),
      ],
    },
    // ---- BODY ----
    {
      properties: {
        page: { size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } },
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "CINEMATCH  ·  Page ", size: 18, color: GREY }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GREY })],
        })] }),
      },
      children: [
        // TOC
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("Table of Contents")] }),
        new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
        new Paragraph({ children: [new PageBreak()] }),

        // 1. Executive Summary
        h1("1. Executive Summary"),
        p("CINEMATCH is a web application that solves a small but universal problem: the time people waste deciding what to watch or play. Instead of endless scrolling, the user describes their mood in plain English — for example, “something scary but short, watching with friends” — and CINEMATCH instantly responds with one confident recommendation and a personalized explanation of why it fits."),
        p("The project is a deliberate combination of two technologies. A Large Language Model (LLM) handles natural language: it understands the user’s free-text mood and later writes a warm, human explanation of the chosen title. A program written in C performs the deterministic scoring: it evaluates a library of 55 carefully curated titles against the user’s preferences and selects the best match. This division — AI for language, C for logic — is the heart of the system and the central story of the capstone."),
        p("Beyond the core recommendation flow, the finished application grew into a four-page product: an AI Match page (the core feature), a Movies browser and a Games browser backed by large open datasets, and a Discussion page that generates a rich, AI-written analysis of any film. The entire system is organized using Domain-Driven Design and is fully version-controlled on GitHub."),

        // 2. Problem & Motivation
        h1("2. Problem and Motivation"),
        p("Streaming services and game libraries offer more choice than ever, but choice itself has become the problem. Studies of “decision fatigue” show that people often spend longer choosing what to watch than they would have spent enjoying a shorter title. Recommendation systems on existing platforms tend to optimize for engagement and watch-time rather than for a single, decisive answer to the question “what should I do tonight?”"),
        p("CINEMATCH takes a different stance. It is opinionated by design: it gives one answer, not twenty rows of thumbnails, and it explains that answer in plain language so the user can trust it. The target user is anyone deciding what to watch or play this evening; for the purposes of this course, it also serves as a clear, end-to-end demonstration of a complete AI product."),

        // 3. Goals & Scope
        h1("3. Project Goals and Scope"),
        h2("3.1 Goals"),
        bullet("Deliver one clean, reliable recommendation flow from free-text input to an explained result."),
        bullet("Use an LLM meaningfully at both ends of the pipeline (understanding and explanation)."),
        bullet("Keep deterministic scoring in a C engine, demonstrating systems programming alongside AI."),
        bullet("Structure the codebase clearly using Domain-Driven Design so the architecture is easy to grade and extend."),
        bullet("Produce a working live demo, a written report, presentation slides, and clean source code."),
        h2("3.2 In Scope"),
        bullet("The mood-to-recommendation pipeline (AI → C engine → AI explanation)."),
        bullet("Browsing real movies and games from open datasets."),
        bullet("An AI-generated discussion/analysis view for any movie."),
        h2("3.3 Out of Scope (to avoid scope creep within a one-week deadline)"),
        bullet("User accounts, login, and persistent databases."),
        bullet("Public internet deployment, payments, and mobile applications."),

        // 4. System Architecture
        h1("4. System Architecture"),
        p("CINEMATCH follows Domain-Driven Design (DDD), an architectural style that separates the core business idea from the surrounding “plumbing.” This keeps each part of the system focused on a single responsibility and makes the codebase navigable for both human teammates and AI agents."),
        h2("4.1 The DDD Layers"),
        table([2300, 4400, 2660], [
          ["Layer", "Responsibility", "Technology"],
          ["Interfaces", "What users reach: the web pages and the HTTP API", "Vite + React, Express"],
          ["Application", "Use cases: understand mood, pick a title, explain, discuss", "Node.js"],
          ["Domain", "Core concepts and rules: Preferences, Title, the scoring", "Node.js + C engine"],
          ["Infrastructure", "The outside world: AI client and C-engine runner", "OpenRouter, child process"],
        ]),
        spacer(),
        h2("4.2 The Core Pipeline"),
        p("The central AI Match feature follows a five-step flow:"),
        num("The user types how they feel in plain English."),
        num("The LLM converts that text into five structured preferences: medium, genre, time available, mood, and social setting."),
        num("The Node backend runs the compiled C engine as a child process, passing the five preferences as command-line arguments."),
        num("The C engine scores all 55 titles and returns the single best match as JSON."),
        num("The LLM writes a short, personalized explanation, and the result is displayed in the browser."),
        spacer(),
        p("Diagram of the data flow:"),
        new Paragraph({ shading: { fill: LIGHT, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 100 }, alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "User mood (text)  →  LLM  →  Preferences (JSON)  →  C Engine  →  Best Title  →  LLM  →  Explanation  →  Browser",
            font: "Consolas", size: 18, bold: true, color: DARK })] }),

        // 5. How AI is used
        h1("5. How AI / the LLM Is Used"),
        p("The professor’s requirement that the project use an LLM is satisfied at three distinct points in the application, each a genuine use of language understanding or generation rather than a token gesture:"),
        bulletRuns([new TextRun({ text: "Mood understanding: ", bold: true }),
          new TextRun("the LLM reads the user’s free text and emits structured preferences as strict JSON, turning vague human language into machine-usable data.")]),
        bulletRuns([new TextRun({ text: "Explanation generation: ", bold: true }),
          new TextRun("after the C engine picks a title, the LLM writes a warm, two-to-three sentence reason tailored to what the user originally said.")]),
        bulletRuns([new TextRun({ text: "Movie discussion: ", bold: true }),
          new TextRun("on the Discussion page, the LLM produces a full analysis of any film — its main theme, epic moments, what makes it special, the director’s vision, and discussion questions.")]),
        p("The AI provider is OpenRouter, an OpenAI-compatible gateway, used exclusively with free models (Qwen3 and other open Chinese models). This choice keeps the project at zero cost for students while still providing strong language quality."),

        // 6. The C Engine
        h1("6. The C Recommendation Engine"),
        p("The deterministic heart of CINEMATCH is a program written in C. It is deliberately rule-based and transparent: given five preferences, it assigns each title in the library a score and returns the highest. The scoring weights were tuned so that the most important factors (genre and medium) dominate, while finer factors (timing, mood, social setting, and rating) break ties."),
        h2("6.1 Scoring Weights"),
        table([4680, 2340, 2340], [
          ["Factor", "Points", "Meaning"],
          ["Genre match", "6", "Strongest signal of taste"],
          ["Medium match", "5", "Movie vs. Game preference"],
          ["Mood match", "4", "Intense, light, deep, relaxed"],
          ["Time exact match", "3", "Short / medium / long fits exactly"],
          ["Time adjacent", "1", "One step away on the time scale"],
          ["Social match", "2", "Solo vs. group"],
          ["Rating", "+rating/10", "Quality tiebreaker"],
        ]),
        spacer(),
        h2("6.2 Engine Mode"),
        p("The same C program runs in two modes. Run with no arguments, it presents an interactive five-question quiz in the terminal. Run with five arguments, it enters “engine mode”: it scores silently and prints a single line of JSON, which is exactly what the Node backend consumes. This dual design let the team test the engine by hand while also embedding it cleanly inside the web application."),
        new Paragraph({ shading: { fill: LIGHT, type: ShadingType.CLEAR },
          spacing: { before: 100, after: 100 },
          children: [new TextRun({ text: "  cinematch Movie horror short intense group", font: "Consolas", size: 18, color: DARK }),
            new TextRun({ text: "\n", font: "Consolas" })] }),
        p("returns, for example, the title “Get Out” with its full metadata as JSON."),

        // 7. Features
        h1("7. Application Features"),
        p("The finished web application is organized into four pages, reachable from a top navigation bar:"),
        h2("7.1 AI Match"),
        p("The core feature. The user types a mood and receives one explained recommendation drawn from the curated 55-title library, powered by the full AI-plus-C pipeline described above."),
        h2("7.2 Movies"),
        p("A browser for thousands of real films, powered by the open TMDB (The Movie Database) dataset. Users can search by title, filter by genre, page through results, and click any film to see its poster, rating, and overview in a detail view."),
        h2("7.3 Games"),
        p("A parallel browser for video games, powered by the open RAWG dataset of over 800,000 titles. It offers the same search, genre filtering, pagination, and detail views, with cover art and ratings."),
        h2("7.4 Discussion"),
        p("A deeper analytical view. The user searches for any movie; CINEMATCH pulls its full cast (with photos), director, and writer from TMDB, then asks the LLM to generate a structured discussion: the film’s main theme and goal, its epic and memorable moments, what makes it special, the director’s vision, and a set of discussion questions."),

        // 8. Technology Stack
        h1("8. Technology Stack and Data Sources"),
        table([3120, 6240], [
          ["Component", "Technology"],
          ["Recommendation engine", "C (compiled to cinematch.exe)"],
          ["Backend", "Node.js + Express"],
          ["Frontend", "Vite + React"],
          ["Package manager", "pnpm"],
          ["AI provider", "OpenRouter (free Qwen3 / open models)"],
          ["Movie data", "TMDB — The Movie Database (open API)"],
          ["Game data", "RAWG — Video game database (open API)"],
          ["Curated library", "55 titles in engine/titles.h"],
          ["Version control", "Git + GitHub"],
        ]),

        // 9. Reliability
        h1("9. Reliability and Resilience"),
        p("Free AI models are powerful but unreliable: they rate-limit frequently and occasionally fail. Because a live demo must never crash, CINEMATCH was engineered to degrade gracefully at every layer:"),
        bulletRuns([new TextRun({ text: "Multi-model fallback chain: ", bold: true }),
          new TextRun("if the preferred model is unavailable, the system automatically tries the next free model (Qwen3 → Llama-3.3-70B → GPT-OSS-120B).")]),
        bulletRuns([new TextRun({ text: "Automatic retry: ", bold: true }),
          new TextRun("on a rate-limit or server error, the request is retried after a short delay.")]),
        bulletRuns([new TextRun({ text: "Keyword fallback: ", bold: true }),
          new TextRun("if every AI attempt fails, a local keyword matcher still derives sensible preferences, so a recommendation always appears.")]),
        bulletRuns([new TextRun({ text: "Content fallback: ", bold: true }),
          new TextRun("the Discussion page validates the AI response and substitutes a well-written default analysis if any field comes back empty.")]),

        // 10. Process
        h1("10. Engineering Process"),
        p("The project was built as a disciplined software-engineering exercise, not just a coding sprint. Several practices kept the work aligned and reviewable:"),
        bulletRuns([new TextRun({ text: "Requirements grilling: ", bold: true }),
          new TextRun("before any code, the vision was sharpened through structured questioning, producing an agreed VISION.md.")]),
        bulletRuns([new TextRun({ text: "Decision log: ", bold: true }),
          new TextRun("every significant choice was recorded in an append-only DECISIONS.md (13 decisions, D-000 to D-012), so nothing was re-argued and no context was lost.")]),
        bulletRuns([new TextRun({ text: "Ubiquitous language: ", bold: true }),
          new TextRun("a shared GLOSSARY.md ensures the code, docs, and team use the same word for the same concept.")]),
        bulletRuns([new TextRun({ text: "Frequent commits: ", bold: true }),
          new TextRun("work was committed and pushed to GitHub after each phase, keeping progress safe and the history clear.")]),

        // 11. Challenges
        h1("11. Challenges and Solutions"),
        table([4680, 4680], [
          ["Challenge", "Solution"],
          ["Free AI models rate-limited mid-demo", "Fallback chain + retry + keyword fallback"],
          ["A chosen model was discontinued (404)", "Queried OpenRouter for live free models, switched to Qwen3"],
          ["Connecting C to JavaScript safely", "C “engine mode” prints JSON; Node runs it as a child process"],
          ["Small built-in library", "Added Movies/Games browsers on open TMDB and RAWG datasets"],
          ["Discussion fields sometimes empty", "Validate AI output, substitute rich default content"],
        ]),

        // 12. Results
        h1("12. Results"),
        p("CINEMATCH meets every goal set out at the start. The core pipeline works end-to-end and was rehearsed successfully across multiple mood queries — for example, “relaxing cozy solo night” returns Balatro, “scary horror with a group” returns Alien, and “epic action game for hours” returns Super Mario Odyssey. The four-page application runs reliably, the architecture is clean and well-documented, and the complete source is committed to GitHub."),

        // 13. Future Work
        h1("13. Future Work"),
        bullet("Personalization through optional user accounts and saved history."),
        bullet("Unit tests for the domain layer using test-driven development."),
        bullet("Public deployment so the app can be used outside the demo laptop."),
        bullet("Expanding the AI pipeline to recommend directly from the large open datasets, not just the curated library."),

        // 14. Conclusion
        h1("14. Conclusion"),
        p("CINEMATCH demonstrates that a focused idea, executed cleanly, can combine classical systems programming and modern AI into a single coherent product. By keeping deterministic logic in C and language work in an LLM, the project tells a clear engineering story while remaining genuinely useful. The result is a polished, reliable, and well-architected capstone that fulfils the course requirements and stands on its own as a product people would actually enjoy using."),

        // Appendix
        new Paragraph({ children: [new PageBreak()] }),
        h1("Appendix A — How to Run"),
        p("Prerequisites: Node.js, pnpm, and (to recompile the engine) a C compiler such as GCC. Two free API keys are needed for the Movies and Games pages (TMDB and RAWG), stored in web/.env.local; the AI key lives in server/.env."),
        num("Start the backend:  cd server  then  node server.js  (runs on port 3000)."),
        num("Start the frontend:  cd web  then  pnpm dev  (runs on port 5173)."),
        num("Open http://localhost:5173 in a browser."),
        spacer(),
        new Paragraph({ children: [
          new TextRun("Source code: "),
          new ExternalHyperlink({
            children: [new TextRun({ text: "GitHub repository", style: "Hyperlink" })],
            link: "https://github.com/zubaydullayevasliddin06-cmd/movie-recommender-c.Asliddin-Ismail-Chae-Hunwoo",
          }),
        ] }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("CINEMATCH-Report.docx", buffer);
  console.log("Report written: CINEMATCH-Report.docx (" + buffer.length + " bytes)");
});

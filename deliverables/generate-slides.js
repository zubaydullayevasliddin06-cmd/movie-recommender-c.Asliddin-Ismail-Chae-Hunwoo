/* generate-slides.js  —  CINEMATCH Presentation  (6 members, 17 slides, 15 min)
   Run: node generate-slides.js   (from inside deliverables/) */

const pptxgen = require("pptxgenjs");

// ── Palette ──────────────────────────────────────────────────────────
const BG     = "0F1117";
const CARD   = "1A1D27";
const CARD2  = "11141D";
const BORDER = "2A2F3E";
const AMBER  = "FFB347";
const TEXT   = "ECECF3";
const MUTED  = "9AA0B4";
const TEAL   = "5BC8AF";
const GREEN  = "6FB39A";
const CODE   = "DCDFE8";
const KEY    = "FFCB7A";
const RED    = "E0696A";

const HFONT  = "Georgia";
const BFONT  = "Calibri";

const pres   = new pptxgen();
pres.layout  = "LAYOUT_WIDE";   // 13.3 × 7.5
pres.author  = "CINEMATCH Team";
pres.title   = "CINEMATCH — Capstone Presentation";

const W = 13.3, H = 7.5, M = 0.7;

// ── Reusable helpers ─────────────────────────────────────────────────
function shadow() {
  return { type:"outer", color:"000000", blur:8, offset:3, angle:135, opacity:0.35 };
}
function card(slide, x, y, w, h, fill = CARD) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius:0.08,
    fill:{color:fill}, line:{color:BORDER,width:1}, shadow:shadow() });
}
function header(slide, kicker, title) {
  slide.addShape(pres.shapes.OVAL, { x:M, y:0.62, w:0.16, h:0.16, fill:{color:AMBER} });
  slide.addText(kicker.toUpperCase(), { x:M+0.28, y:0.5, w:10, h:0.4, margin:0,
    fontFace:BFONT, fontSize:12, color:AMBER, bold:true, charSpacing:3 });
  slide.addText(title, { x:M, y:0.85, w:W-2*M, h:0.8, margin:0,
    fontFace:HFONT, fontSize:32, color:TEXT, bold:true });
}
function footer(slide, n) {
  slide.addText([
    { text:"CINEMATCH", options:{color:AMBER,bold:true} },
    { text:"   ·   AI-Powered Movie & Game Recommender", options:{color:MUTED} },
  ], { x:M, y:H-0.5, w:9, h:0.3, margin:0, fontFace:BFONT, fontSize:9 });
  slide.addText(String(n), { x:W-1.0, y:H-0.5, w:0.4, h:0.3, margin:0,
    align:"right", fontFace:BFONT, fontSize:9, color:MUTED });
}
function codeBlock(slide, x, y, w, h, lines, fontSize=11) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius:0.06,
    fill:{color:"0A0C12"}, line:{color:BORDER,width:1}, shadow:shadow() });
  slide.addShape(pres.shapes.OVAL, { x:x+0.22, y:y+0.18, w:0.1, h:0.1, fill:{color:RED} });
  slide.addShape(pres.shapes.OVAL, { x:x+0.38, y:y+0.18, w:0.1, h:0.1, fill:{color:"E8B14C"} });
  slide.addShape(pres.shapes.OVAL, { x:x+0.54, y:y+0.18, w:0.1, h:0.1, fill:{color:GREEN} });
  const runs = lines.map(([text,kind]) => ({
    text: text===""?" ":text,
    options:{ breakLine:true, fontFace:"Consolas", fontSize,
      color: kind==="c"?GREEN : kind==="k"?KEY : CODE, bold:kind==="k" },
  }));
  slide.addText(runs, { x:x+0.3, y:y+0.45, w:w-0.55, h:h-0.65,
    margin:0, valign:"top", align:"left", lineSpacingMultiple:1.05 });
}
function bullet2(slide, x, y, items, color = AMBER, fontSize = 12.5) {
  const runs = items.map(t => ({
    text: "  "+t,
    options:{ breakLine:true, fontFace:BFONT, fontSize, color:TEXT,
      paraSpaceAfter:8, bullet:{code:"25CF",indent:14,color} },
  }));
  slide.addText(runs, { x, y, w:W-x-M, h:3.5, margin:0, valign:"top" });
}

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 1  —  Title  (Member 1)
// ════════════════════════════════════════════════════════════════════════
(function slide1() {
  const s = pres.addSlide(); s.background = {color:BG};

  // Big amber title
  s.addText("CINEMATCH", { x:M, y:1.5, w:W-2*M, h:1.6, margin:0,
    align:"center", fontFace:HFONT, fontSize:80, color:AMBER, bold:true, shadow:shadow() });

  // Tagline
  s.addText("AI + C Engine  ·  Mood-Based Movie & Game Recommender",
    { x:M, y:3.15, w:W-2*M, h:0.5, margin:0, align:"center",
      fontFace:BFONT, fontSize:20, color:TEXT });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, { x:3.5, y:3.75, w:6.3, h:0.04, fill:{color:AMBER} });

  // Course info
  s.addText("Advanced C Programming  ·  Sejong University  ·  2024",
    { x:M, y:3.95, w:W-2*M, h:0.4, margin:0, align:"center",
      fontFace:BFONT, fontSize:14, color:MUTED });

  // Team columns
  const members = [
    ["Member 1","[Name]"], ["Member 2","[Name]"], ["Member 3","[Name]"],
    ["Member 4","[Name]"], ["Member 5","[Name]"], ["Member 6","[Name]"],
  ];
  const cols = [[members[0],members[1],members[2]], [members[3],members[4],members[5]]];
  cols.forEach((col, ci) => {
    col.forEach(([role,name], ri) => {
      const x = 3.5 + ci * 3.3, y = 4.55 + ri * 0.38;
      s.addText(role + "  ", { x, y, w:1.3, h:0.34, margin:0,
        fontFace:BFONT, fontSize:12, color:AMBER, bold:true, align:"right" });
      s.addText(name, { x:x+1.35, y, w:1.9, h:0.34, margin:0,
        fontFace:BFONT, fontSize:12, color:TEXT });
    });
  });

  footer(s, 1, null);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 2  —  The Problem  (Member 1)
// ════════════════════════════════════════════════════════════════════════
(function slide2() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Introduction", "The Problem");


  // Large quote box
  card(s, M, 1.85, W-2*M, 1.35, CARD);
  s.addText('"You\'ve been scrolling for 20 minutes and still can\'t decide what to watch."',
    { x:M+0.4, y:1.95, w:W-2*M-0.8, h:1.15, margin:0, align:"center",
      fontFace:HFONT, fontSize:22, color:AMBER, italic:true });

  // 3 problem cards
  const probs = [
    ["🗂️","Too Many Choices","Netflix has 15,000+ titles.\nSteam has 50,000+ games.\nMore options = harder decisions."],
    ["🧠","No Mood Filter","Platforms use viewing history —\nnot how you feel tonight.\nPast ≠ Present."],
    ["👥","Context is Ignored","Are you alone or with friends?\nTired or energetic?\nExisting systems don't ask."],
  ];
  probs.forEach(([icon,title,body],i) => {
    const x = M + i * ((W-2*M)/3 + 0.05);
    card(s, x, 3.4, (W-2*M)/3 - 0.08, 2.85);
    s.addText(icon, { x, y:3.6, w:(W-2*M)/3-0.08, h:0.55, margin:0, align:"center", fontSize:26 });
    s.addText(title, { x:x+0.2, y:4.2, w:(W-2*M)/3-0.4, h:0.45, margin:0,
      fontFace:BFONT, fontSize:16, bold:true, color:AMBER, align:"center" });
    s.addText(body, { x:x+0.2, y:4.7, w:(W-2*M)/3-0.4, h:1.4, margin:0,
      fontFace:BFONT, fontSize:12, color:TEXT, align:"center", lineSpacingMultiple:1.3 });
  });

  footer(s, 2);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 3  —  Our Solution  (Member 1)
// ════════════════════════════════════════════════════════════════════════
(function slide3() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Introduction", "CINEMATCH — The Solution");


  // User input example
  card(s, M, 1.85, 5.8, 0.75, CARD2);
  s.addText("You type:  ", { x:M+0.3, y:1.92, w:1.4, h:0.6, margin:0,
    fontFace:BFONT, fontSize:13, color:MUTED });
  s.addText('"something scary but short to watch with friends tonight"',
    { x:M+1.5, y:1.92, w:4, h:0.6, margin:0,
      fontFace:BFONT, fontSize:13, color:AMBER, italic:true });

  // Three pipeline steps (horizontal)
  const steps = [
    ["1","AI reads your mood","Converts natural language\ninto 5 structured preferences\n(genre, time, mood, medium, social)"],
    ["2","C engine scores","Runs a weighted algorithm\nacross 55 curated titles\nand picks the best match"],
    ["3","AI explains","Writes a personalized\nexplanation of why that\nspecific title fits you now"],
  ];
  const sw = (W-2*M-0.3) / 3;
  steps.forEach(([n,title,body], i) => {
    const x = M + i*(sw+0.15);
    card(s, x, 2.85, sw, 3.35);
    // number circle
    s.addShape(pres.shapes.OVAL, { x:x+sw/2-0.3, y:3.0, w:0.6, h:0.6,
      fill:{color:AMBER}, line:{color:AMBER,width:0} });
    s.addText(n, { x:x+sw/2-0.3, y:3.0, w:0.6, h:0.6, margin:0,
      align:"center", valign:"middle", fontFace:HFONT, fontSize:22, bold:true, color:BG });
    s.addText(title, { x:x+0.2, y:3.75, w:sw-0.4, h:0.55, margin:0,
      align:"center", fontFace:BFONT, fontSize:15, bold:true, color:TEXT });
    s.addText(body, { x:x+0.2, y:4.35, w:sw-0.4, h:1.7, margin:0,
      align:"center", fontFace:BFONT, fontSize:12, color:MUTED, lineSpacingMultiple:1.3 });
    // arrow between steps
    if (i < 2) {
      s.addShape(pres.shapes.RIGHT_ARROW, { x:x+sw+0.02, y:4.25, w:0.12, h:0.22,
        fill:{color:AMBER}, line:{color:AMBER,width:0} });
    }
  });

  footer(s, 3);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 4  —  Features Overview  (Member 2)
// ════════════════════════════════════════════════════════════════════════
(function slide4() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Features", "5 Features of CINEMATCH");


  const features = [
    ["✨","AI Match","Describe your mood → AI + C engine\nrecommends the perfect title\nwith a personalized explanation"],
    ["🎬","Movies Browser","Search & browse hundreds of thousands\nof real films via TMDB.\nPosters, cast, full details."],
    ["🎮","Games Browser","Search & browse 800,000+ titles\nvia RAWG game database.\nGenre filters, cover art."],
    ["💬","Discussion","Pick any movie → AI generates\ntheme analysis, epic moments,\ndirector's vision, discussion Qs."],
    ["📋","History & Accounts","Register, log in, and see all\nyour past AI picks saved\nautomatically with date & mood."],
  ];
  const fw = (W-2*M-0.4) / 5;
  features.forEach(([icon,title,body], i) => {
    const x = M + i*(fw+0.1);
    card(s, x, 1.85, fw, 4.35);
    s.addText(icon, { x, y:2.1, w:fw, h:0.65, margin:0,
      align:"center", fontSize:30 });
    s.addText(title, { x:x+0.12, y:2.85, w:fw-0.24, h:0.52, margin:0,
      align:"center", fontFace:BFONT, fontSize:13.5, bold:true, color:AMBER });
    s.addText(body, { x:x+0.12, y:3.42, w:fw-0.24, h:2.4, margin:0,
      align:"center", fontFace:BFONT, fontSize:11.5, color:TEXT, lineSpacingMultiple:1.3 });
    // highlight bar at bottom of active cards
    s.addShape(pres.shapes.RECTANGLE, { x:x+0.35, y:5.95, w:fw-0.7, h:0.08,
      fill:{color:AMBER} });
  });

  footer(s, 4);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 5  —  Feature Highlights  (Member 2)
// ════════════════════════════════════════════════════════════════════════
(function slide5() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Features", "What Makes Each Feature Special");


  // Left column
  const lx = M, rx = M + 6.1, cy = 1.9, ch = 1.35, gap2 = 1.5;
  const items = [
    [lx, cy,         "✨ AI Match — Core Feature",
     "The only recommender that converts your current mood into structured preferences and scores them with compiled C code. Result in under 10 seconds."],
    [lx, cy+gap2,    "🎬 Movies  +  🎮 Games Browser",
     "Real open databases — TMDB and RAWG. Not a static list. Search anything, filter by 8 genres, see posters and cover art."],
    [lx, cy+gap2*2,  "💬 Discussion",
     "Powered by AI + TMDB cast data. Get main theme, epic moments, director's vision, and ready-made discussion questions for any movie."],
    [rx, cy,         "📋 History — Automatic Saving",
     "Every AI recommendation is silently saved the moment it appears. Reload the page next week — your history is still there."],
    [rx, cy+gap2,    "🔐 User Accounts",
     "Register with a username and password. Passwords are hashed with bcrypt — never stored in plain text. JWT sessions last 7 days."],
    [rx, cy+gap2*2,  "🛡️ API Key Security",
     "TMDB, RAWG, and OpenRouter keys live in .env files that are gitignored. Never committed. Never exposed in the browser."],
  ];
  items.forEach(([x,y,title,body]) => {
    card(s, x, y, 5.85, ch, CARD);
    s.addText(title, { x:x+0.25, y:y+0.15, w:5.3, h:0.42, margin:0,
      fontFace:BFONT, fontSize:13.5, bold:true, color:AMBER });
    s.addText(body, { x:x+0.25, y:y+0.6, w:5.3, h:0.7, margin:0,
      fontFace:BFONT, fontSize:11.5, color:TEXT, lineSpacingMultiple:1.25 });
  });

  footer(s, 5);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 6  —  System Architecture  (Member 3)
// ════════════════════════════════════════════════════════════════════════
(function slide6() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Architecture & C Engine", "System Architecture — Domain-Driven Design");


  // DDD 4 layers horizontal
  const layers = [
    ["Domain","Core rules & data structures\n\nTitle struct, Preferences,\nRecommendation entity\n\nNo HTTP or AI here"],
    ["Application","Use cases — orchestration\n\nmoodToPreferences\nrecommendForMood\nexplainRecommendation\ndiscussMovie"],
    ["Infrastructure","Outside-world connections\n\nOpenRouter AI client\nC engine runner\nUser JSON file storage"],
    ["Interfaces","Entry points for users\n\nExpress HTTP API\n(7 endpoints)\nVite + React frontend"],
  ];
  const lw = (W-2*M-0.45)/4;
  layers.forEach(([ name, body ], i) => {
    const x = M + i*(lw+0.15);
    const fill = i === 0 ? "1D2030" : i === 3 ? "201D10" : CARD;
    const border2 = i === 0 ? TEAL : i === 3 ? AMBER : BORDER;
    slide_card_border(s, x, 1.85, lw, 4.35, fill, border2);
    // Arrow between layers
    if (i < 3) {
      s.addShape(pres.shapes.RIGHT_ARROW, { x:x+lw+0.01, y:3.75, w:0.13, h:0.22,
        fill:{color:MUTED}, line:{color:MUTED,width:0} });
    }
    s.addText(name, { x:x+0.2, y:2.0, w:lw-0.4, h:0.55, margin:0,
      align:"center", fontFace:HFONT, fontSize:17, bold:true,
      color: i===0 ? TEAL : i===3 ? AMBER : TEXT });
    s.addShape(pres.shapes.RECTANGLE, { x:x+0.3, y:2.62, w:lw-0.6, h:0.04, fill:{color:BORDER} });
    s.addText(body, { x:x+0.2, y:2.75, w:lw-0.4, h:3.1, margin:0,
      fontFace:BFONT, fontSize:12, color:TEXT, lineSpacingMultiple:1.35, valign:"top" });
  });

  // Engine label
  card(s, M, 6.35, W-2*M, 0.5, "0A0C12");
  s.addText("🔧  C Engine (cinematch.exe) — compiled binary called by Infrastructure layer via child_process.spawn()",
    { x:M+0.3, y:6.38, w:W-2*M-0.6, h:0.43, margin:0,
      fontFace:BFONT, fontSize:12, color:AMBER });

  footer(s, 6);
})();

function slide_card_border(s, x, y, w, h, fill, borderColor) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius:0.08,
    fill:{color:fill}, line:{color:borderColor,width:2}, shadow:shadow() });
}

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 7  —  C Engine: Struct & Scoring  (Member 3)
// ════════════════════════════════════════════════════════════════════════
(function slide7() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Architecture & C Engine", "C Engine — Data Structure & Scoring Algorithm");


  // Code block left: Title struct
  codeBlock(s, M, 1.85, 6.0, 2.5, [
    ["/* titles.h — the Title data structure */", "c"],
    ["typedef struct {", ""],
    ['    const char *type;    /* "Movie" or "Game"   */', "c"],
    ['    const char *title;   /* display name        */', "c"],
    ["    int         year;", ""],
    ['    const char *genre;   /* action/cozy/scifi…  */', "c"],
    ['    const char *mood;    /* intense/relaxed/deep */', "c"],
    ['    const char *timeNeed;/* short/medium/long    */', "c"],
    ['    const char *social;  /* solo/group/any       */', "c"],
    ["    const char *rating;  /* e.g. \"8.6\"          */", ""],
    ["    const char *desc;", ""],
    ["} Title;", "k"],
    ["extern Title library[55];  /* all 55 titles */", ""],
  ], 11);

  // Code block left bottom: scoring weights
  codeBlock(s, M, 4.5, 6.0, 2.2, [
    ["/* Scoring weights in recommend.c */", "c"],
    ["#define PTS_GENRE      6  /* strongest signal */", "k"],
    ["#define PTS_MEDIUM     5", ""],
    ["#define PTS_MOOD       4", ""],
    ["#define PTS_TIME_EXACT 3", ""],
    ["#define PTS_TIME_ADJ   1  /* neighbouring length */", "c"],
    ["#define PTS_SOCIAL     2", ""],
    ["/* rating / 10.0 added as tiebreaker */", "c"],
  ], 11);

  // Right: weights explanation table
  card(s, 6.85, 1.85, 5.75, 4.85);
  s.addText("Scoring Rules", { x:7.1, y:2.0, w:5.1, h:0.45, margin:0,
    fontFace:BFONT, fontSize:16, bold:true, color:AMBER });
  const rows = [
    ["Criterion","Points","Why"],
    ["Genre match","6","Strongest preference signal"],
    ["Medium match","5","Movie vs Game is binary"],
    ["Mood match","4","Emotional tone matters most"],
    ["Time — exact","3","Short/medium/long fit"],
    ["Time — adjacent","1","Close enough still counts"],
    ["Social match","2","Solo vs group is clear"],
    ["Rating ÷ 10","tiebreaker","E.g. 8.6 → adds +0.86"],
  ];
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const cx = [7.1, 9.55, 10.55][ci];
      const cw = [2.3, 0.9, 2.6][ci];
      const isHead = ri === 0;
      s.addText(cell, { x:cx, y:2.55+ri*0.52, w:cw, h:0.46, margin:0,
        fontFace:BFONT, fontSize:isHead?11:12,
        bold:isHead, color:isHead?AMBER : ci===1?TEAL : TEXT,
        align: ci===1?"center":"left" });
    });
    if (ri > 0) {
      s.addShape(pres.shapes.RECTANGLE, { x:7.1, y:2.55+ri*0.52, w:5.3, h:0.01, fill:{color:BORDER} });
    }
  });

  footer(s, 7);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 8  —  C Engine: Engine Mode  (Member 3)
// ════════════════════════════════════════════════════════════════════════
(function slide8() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Architecture & C Engine", "C Engine — Engine Mode & Node.js Integration");


  // Left: main.c engine mode branch
  codeBlock(s, M, 1.85, 6.0, 2.85, [
    ["/* main.c — two modes */", "c"],
    ["int main(int argc, char **argv) {", ""],
    ["", ""],
    ["  /* Engine mode: Node calls with 5 args */", "c"],
    ["  if (argc == 6) {", "k"],
    ["    recommendJson(argv[1], argv[2],", ""],
    ["                  argv[3], argv[4], argv[5]);", ""],
    ["    return 0;   /* prints JSON, exits */", "c"],
    ["  }", ""],
    ["", ""],
    ["  /* Interactive mode: asks 5 questions */", "c"],
    ["  /* ... quiz code ... */", "c"],
    ["}", ""],
  ], 11);

  // Left bottom: JSON output example
  codeBlock(s, M, 4.85, 6.0, 1.85, [
    ["/* Output printed to stdout (Node reads this): */","c"],
    ['{\"found\":true,\"type\":\"Movie\",', ""],
    [' \"title\":\"Alien\",\"year\":1979,', ""],
    [' \"genre\":\"horror\",\"rating\":\"8.5\"}', "k"],
  ], 11);

  // Right: Node.js spawn code
  codeBlock(s, 6.85, 1.85, 5.75, 2.85, [
    ["// infrastructure/cEngine.js", "c"],
    ["const { spawnSync } = require('child_process');", ""],
    ["", ""],
    ["function callEngine(prefs) {", "k"],
    ["  const r = spawnSync('./cinematch.exe',", ""],
    ["    [prefs.medium, prefs.genre,", ""],
    ["     prefs.timeNeed, prefs.mood,", ""],
    ["     prefs.social]);", ""],
    ["", ""],
    ["  return JSON.parse(r.stdout.toString());", "k"],
    ["}",""],
  ], 11);

  // Right: key points
  card(s, 6.85, 4.85, 5.75, 1.85, CARD);
  s.addText("Why this design?", { x:7.1, y:5.0, w:5.2, h:0.38, margin:0,
    fontFace:BFONT, fontSize:13, bold:true, color:AMBER });
  const pts = ["C and JavaScript stay completely independent","JSON is the language-agnostic contract","C runs as a separate process — maximum speed","Same C binary works in terminal and from the server"];
  const runs2 = pts.map(t => ({ text:"  "+t,
    options:{ breakLine:true, fontFace:BFONT, fontSize:11.5, color:TEXT,
      paraSpaceAfter:5, bullet:{code:"25CF",indent:14,color:AMBER} } }));
  s.addText(runs2, { x:7.1, y:5.45, w:5.2, h:1.15, margin:0, valign:"top" });

  footer(s, 8);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 9  —  AI Integration: OpenRouter  (Member 4)
// ════════════════════════════════════════════════════════════════════════
(function slide9() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "AI & APIs", "AI Integration — OpenRouter & Fallback Chain");


  // What is OpenRouter
  card(s, M, 1.85, 5.8, 1.45, CARD);
  s.addText("What is OpenRouter?", { x:M+0.25, y:1.98, w:5.2, h:0.42, margin:0,
    fontFace:BFONT, fontSize:14, bold:true, color:AMBER });
  s.addText("A single API endpoint that gives access to dozens of large language models — the same interface as OpenAI.\nWe use free-tier models, so running CINEMATCH costs $0.",
    { x:M+0.25, y:2.44, w:5.2, h:0.75, margin:0,
      fontFace:BFONT, fontSize:12, color:TEXT, lineSpacingMultiple:1.3 });

  // Fallback chain diagram
  s.addText("Fallback Chain  (runs automatically on rate-limit or server error)",
    { x:M, y:3.52, w:W-2*M, h:0.38, margin:0,
      fontFace:BFONT, fontSize:13, bold:true, color:TEXT });

  const chain = [
    ["1","Qwen3 235B","Primary model\n(free tier)","Try first"],
    ["2","Llama 3.3 70B","Fallback\n(free tier)","If 429 / 5xx"],
    ["3","GPT-OSS 120B","Second fallback\n(free tier)","If still fails"],
    ["4","Keyword Match","Built-in fallback\n(no AI needed)","Guaranteed result"],
  ];
  const cw = (W-2*M-0.45)/4;
  chain.forEach(([n,name,sub,when],i) => {
    const x = M + i*(cw+0.15);
    const isLast = i === 3;
    slide_card_border(s, x, 4.05, cw, 2.2, isLast?"0A0C12":CARD, isLast?GREEN:BORDER);
    s.addShape(pres.shapes.OVAL, { x:x+cw/2-0.22, y:4.18, w:0.44, h:0.44,
      fill:{color:isLast?GREEN:AMBER} });
    s.addText(n, { x:x+cw/2-0.22, y:4.18, w:0.44, h:0.44, margin:0,
      align:"center", valign:"middle", fontFace:BFONT, fontSize:14, bold:true,
      color:isLast?BG:BG });
    s.addText(name, { x:x+0.1, y:4.72, w:cw-0.2, h:0.45, margin:0,
      align:"center", fontFace:BFONT, fontSize:12, bold:true, color:isLast?GREEN:AMBER });
    s.addText(sub, { x:x+0.1, y:5.2, w:cw-0.2, h:0.55, margin:0,
      align:"center", fontFace:BFONT, fontSize:11, color:TEXT });
    s.addText(when, { x:x+0.1, y:5.82, w:cw-0.2, h:0.35, margin:0,
      align:"center", fontFace:BFONT, fontSize:10.5, color:MUTED, italic:true });
    if (i<3) {
      s.addShape(pres.shapes.RIGHT_ARROW, { x:x+cw+0.01, y:4.98, w:0.13, h:0.22,
        fill:{color:MUTED} });
    }
  });

  // Right side: key point
  card(s, 6.85, 1.85, 5.75, 1.45, CARD2);
  s.addText("Why a fallback chain?", { x:7.1, y:1.98, w:5.2, h:0.38, margin:0,
    fontFace:BFONT, fontSize:13, bold:true, color:AMBER });
  s.addText("Free AI models have rate limits. During a live demo, any single model might be rate-limited. The chain guarantees a result is always returned — even without any AI.",
    { x:7.1, y:2.4, w:5.2, h:0.8, margin:0,
      fontFace:BFONT, fontSize:12, color:TEXT, lineSpacingMultiple:1.3 });

  footer(s, 9);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 10  —  AI Pipeline  (Member 4)
// ════════════════════════════════════════════════════════════════════════
(function slide10() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "AI & APIs", "AI Pipeline — Mood → Preferences → Explanation");


  // Task 1
  card(s, M, 1.85, 5.8, 4.85, CARD);
  s.addText("Task 1 — Mood to Preferences", { x:M+0.25, y:2.0, w:5.2, h:0.45, margin:0,
    fontFace:BFONT, fontSize:14, bold:true, color:AMBER });

  card(s, M+0.2, 2.55, 5.4, 0.65, CARD2);
  s.addText('"something scary but short to watch with friends tonight"',
    { x:M+0.4, y:2.6, w:5.0, h:0.55, margin:0,
      fontFace:BFONT, fontSize:13, color:TEXT, italic:true });

  s.addText("↓  AI returns JSON:", { x:M+0.25, y:3.3, w:5.2, h:0.35, margin:0,
    fontFace:BFONT, fontSize:11, color:MUTED });

  codeBlock(s, M+0.2, 3.7, 5.4, 1.55, [
    ['{', ""],
    ['  "genre":    "horror",', "k"],
    ['  "timeNeed": "short",', "k"],
    ['  "social":   "group",', "k"],
    ['  "mood":     "intense"', "k"],
    ['}', ""],
  ], 11.5);

  s.addText("These 5 values become the C engine's input arguments.",
    { x:M+0.25, y:5.35, w:5.2, h:0.4, margin:0,
      fontFace:BFONT, fontSize:11.5, color:MUTED });

  s.addText("Strict system prompt forces JSON-only output.\nResponse validated before use — fallback if empty.",
    { x:M+0.25, y:5.8, w:5.2, h:0.7, margin:0,
      fontFace:BFONT, fontSize:11, color:MUTED, italic:true });

  // Task 2
  card(s, 6.85, 1.85, 5.75, 4.85, CARD);
  s.addText("Task 2 — Personalized Explanation", { x:7.1, y:2.0, w:5.2, h:0.45, margin:0,
    fontFace:BFONT, fontSize:14, bold:true, color:AMBER });

  s.addText("After C engine picks the best title, AI writes why it fits:",
    { x:7.1, y:2.55, w:5.2, h:0.4, margin:0, fontFace:BFONT, fontSize:12, color:TEXT });

  card(s, 7.05, 3.05, 5.35, 1.4, CARD2);
  s.addText('"Alien is the perfect pick for a short, intense group night — its claustrophobic tension builds fast and hits hard, exactly the kind of scary that works best when everyone is watching together."',
    { x:7.2, y:3.12, w:5.0, h:1.25, margin:0,
      fontFace:BFONT, fontSize:12, color:AMBER, italic:true, lineSpacingMultiple:1.35 });

  s.addText("Always references the user's original mood — never generic.", { x:7.1, y:4.55, w:5.2, h:0.35,
    margin:0, fontFace:BFONT, fontSize:11.5, color:TEAL });

  const pts2 = ["Same OpenRouter client, same fallback chain","Rich fallback text if AI fails completely","Two separate API calls per recommendation"];
  const runs3 = pts2.map(t => ({ text:"  "+t,
    options:{ breakLine:true, fontFace:BFONT, fontSize:12, color:TEXT,
      paraSpaceAfter:8, bullet:{code:"25CF",indent:14,color:AMBER} } }));
  s.addText(runs3, { x:7.1, y:5.08, w:5.2, h:1.5, margin:0, valign:"top" });

  footer(s, 10);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 11  —  External APIs  (Member 4)
// ════════════════════════════════════════════════════════════════════════
(function slide11() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "AI & APIs", "External APIs — TMDB & RAWG");


  // TMDB card
  card(s, M, 1.85, 5.85, 4.85);
  s.addText("🎬  TMDB  —  The Movie Database", { x:M+0.25, y:2.02, w:5.2, h:0.48, margin:0,
    fontFace:BFONT, fontSize:16, bold:true, color:AMBER });
  s.addText("image.tmdb.org  ·  Free API  ·  Hundreds of thousands of films",
    { x:M+0.25, y:2.55, w:5.2, h:0.35, margin:0, fontFace:BFONT, fontSize:11.5, color:MUTED });
  const tmdbPts = [
    "Movies page — search by title, 8 genre filters, poster grid",
    "Movies page — click → cast list, overview, rating, release year",
    "Discussion page — movie search + backdrop images",
    "Discussion page — cast with profile photos",
    "Discussion page — overview sent to AI for analysis",
    "Poster images fetched at w342 resolution from TMDB CDN",
  ];
  const tr = tmdbPts.map(t=>({ text:"  "+t,
    options:{breakLine:true,fontFace:BFONT,fontSize:12.5,color:TEXT,
      paraSpaceAfter:9, bullet:{code:"25CF",indent:14,color:AMBER}} }));
  s.addText(tr, { x:M+0.25, y:3.05, w:5.3, h:3.35, margin:0, valign:"top" });

  // RAWG card
  card(s, 6.85, 1.85, 5.75, 4.85);
  s.addText("🎮  RAWG  —  Video Games Database", { x:7.1, y:2.02, w:5.2, h:0.48, margin:0,
    fontFace:BFONT, fontSize:16, bold:true, color:AMBER });
  s.addText("rawg.io  ·  Free API  ·  800,000+ game titles",
    { x:7.1, y:2.55, w:5.2, h:0.35, margin:0, fontFace:BFONT, fontSize:11.5, color:MUTED });
  const rawgPts = [
    "Games page — search by title across 800K+ titles",
    "Games page — 9 genre filters (Action, RPG, Strategy…)",
    "Games page — cover art grid with developer & rating",
    "Games page — click → full description, platforms, tags",
    "Free tier: 20,000 requests/month (well within our use)",
  ];
  const rr = rawgPts.map(t=>({ text:"  "+t,
    options:{breakLine:true,fontFace:BFONT,fontSize:12.5,color:TEXT,
      paraSpaceAfter:9, bullet:{code:"25CF",indent:14,color:AMBER}} }));
  s.addText(rr, { x:7.1, y:3.05, w:5.2, h:3.35, margin:0, valign:"top" });

  // Security note at bottom
  card(s, M, 6.85, W-2*M, 0.42, "0A0C12");
  s.addText("🔐  Security:  All API keys stored in .env files  ·  Listed in .gitignore  ·  Never committed to GitHub  ·  Never exposed in the browser",
    { x:M+0.3, y:6.88, w:W-2*M-0.6, h:0.35, margin:0,
      fontFace:BFONT, fontSize:11.5, color:AMBER });

  footer(s, 11);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 12  —  Backend Structure  (Member 5)
// ════════════════════════════════════════════════════════════════════════
(function slide12() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Backend", "Backend — Express Server & API Endpoints");


  // Endpoint table
  const endpoints = [
    ["Method","Endpoint","Purpose","Auth?"],
    ["POST","/api/recommend","Run full AI + C engine pipeline","—"],
    ["POST","/api/discuss","AI discussion analysis for a movie","—"],
    ["GET", "/api/titles","Return full 55-title library as JSON","—"],
    ["POST","/api/auth/register","Create a new user account","—"],
    ["POST","/api/auth/login","Login and receive a JWT token","—"],
    ["GET", "/api/history","Load user's recommendation history","✓ JWT"],
    ["POST","/api/history","Save a recommendation to history","✓ JWT"],
  ];
  endpoints.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const cx = [M, M+1.1, M+4.05, M+10.05][ci];
      const cw = [1.0, 2.85, 5.9, 1.6][ci];
      const isHead = ri === 0;
      const isAuth = ci===3 && cell.includes("✓");
      s.addText(cell, { x:cx, y:1.92+ri*0.54, w:cw, h:0.46, margin:0,
        fontFace: ci===1?"Consolas":BFONT,
        fontSize: isHead?11.5:12,
        bold: isHead || (ci===0&&!isHead),
        color: isHead ? AMBER
             : ci===0 ? (cell==="POST"?"#E07070":TEAL)
             : ci===1 ? KEY
             : isAuth ? GREEN : TEXT,
        align: ci===3?"center":"left" });
      if (ri>0 && ci===0) {
        s.addShape(pres.shapes.RECTANGLE, { x:M, y:1.92+ri*0.54+0.45, w:W-2*M, h:0.01, fill:{color:BORDER} });
      }
    });
  });

  // DDD reminder
  card(s, M, 5.72, W-2*M, 1.0, CARD);
  s.addText("DDD Layer: each endpoint is a thin HTTP wrapper  ·  validates input  →  calls Application layer  →  returns JSON",
    { x:M+0.3, y:5.85, w:W-2*M-0.6, h:0.35, margin:0,
      fontFace:BFONT, fontSize:12.5, color:TEXT });
  s.addText("No business logic lives in the Interface layer.  Business rules stay in Domain & Application.",
    { x:M+0.3, y:6.22, w:W-2*M-0.6, h:0.35, margin:0,
      fontFace:BFONT, fontSize:11.5, color:MUTED, italic:true });

  footer(s, 12);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 13  —  User Authentication  (Member 5)
// ════════════════════════════════════════════════════════════════════════
(function slide13() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Backend", "User Authentication — bcrypt + JWT");


  // Registration flow
  card(s, M, 1.85, 5.85, 2.55, CARD);
  s.addText("Registration Flow", { x:M+0.25, y:2.0, w:5.2, h:0.42, margin:0,
    fontFace:BFONT, fontSize:14, bold:true, color:AMBER });
  codeBlock(s, M+0.2, 2.5, 5.4, 1.75, [
    ["// application/auth.js", "c"],
    ["const hash = await bcrypt.hash(password, 10);", "k"],
    ["// 10 salt rounds — industry standard", "c"],
    ["createUser(username, hash);", ""],
    ["// Plain password is NEVER stored", "c"],
  ], 11);

  // Login flow
  card(s, M, 4.55, 5.85, 2.15, CARD);
  s.addText("Login Flow", { x:M+0.25, y:4.68, w:5.2, h:0.42, margin:0,
    fontFace:BFONT, fontSize:14, bold:true, color:AMBER });
  codeBlock(s, M+0.2, 5.15, 5.4, 1.45, [
    ["const ok = await bcrypt.compare(password, hash);", ""],
    ["if (!ok) throw new Error('Wrong credentials');", ""],
    ["const token = jwt.sign({id,username}, SECRET,", "k"],
    ["                       { expiresIn: '7d' });", "k"],
  ], 11);

  // Right: JWT explanation
  card(s, 6.85, 1.85, 5.75, 2.55, CARD);
  s.addText("JSON Web Token (JWT)", { x:7.1, y:2.0, w:5.2, h:0.42, margin:0,
    fontFace:BFONT, fontSize:14, bold:true, color:AMBER });
  const jwtPts = [
    "Signed with a secret key on the server",
    "Contains: user ID + username",
    "Expires after 7 days automatically",
    "Frontend stores it in localStorage",
    "Sent as:  Authorization: Bearer <token>",
    "Protected endpoints verify it on every request",
  ];
  const jr = jwtPts.map(t=>({ text:"  "+t,
    options:{breakLine:true,fontFace:BFONT,fontSize:12.5,color:TEXT,
      paraSpaceAfter:7, bullet:{code:"25CF",indent:14,color:AMBER}} }));
  s.addText(jr, { x:7.1, y:2.52, w:5.2, h:1.75, margin:0, valign:"top" });

  // Storage
  card(s, 6.85, 4.55, 5.75, 2.15, CARD2);
  s.addText("Storage — server/data/users.json", { x:7.1, y:4.68, w:5.2, h:0.42, margin:0,
    fontFace:BFONT, fontSize:13, bold:true, color:AMBER });
  codeBlock(s, 7.05, 5.12, 5.35, 1.48, [
    ["{ id, username, passwordHash,", ""],
    ["  createdAt, history: [ ...50 entries ] }", ""],
    ["// Gitignored — never in GitHub", "c"],
  ], 11);

  footer(s, 13);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 14  —  Complete Data Flow  (Member 6)
// ════════════════════════════════════════════════════════════════════════
(function slide14() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Conclusion", "Complete Data Flow — Request Lifecycle");


  const steps = [
    ["1","React Frontend","User types mood & submits\n\nPOST /api/recommend\n{ text: 'scary short…' }"],
    ["2","AI — Mood Parse","OpenRouter converts mood\nto structured JSON\n\n{genre:horror, time:short,\n social:group, mood:intense}"],
    ["3","C Engine","Spawned as child_process\nwith 5 args\n\nScores all 55 titles\nReturns JSON via stdout"],
    ["4","AI — Explain","Best title sent to AI\n\n'Alien — perfect for\n intense group night…'\n(2-sentence explanation)"],
    ["5","Response","Full JSON returned\nto React frontend\n\nResult card shown + saved\nto user history"],
  ];
  const sw2 = (W-2*M-0.6)/5;
  steps.forEach(([n,name,body], i) => {
    const x = M + i*(sw2+0.15);
    const col = [AMBER, TEAL, "#E07070", TEAL, GREEN][i];
    slide_card_border(s, x, 1.85, sw2, 4.85, CARD, col);
    s.addShape(pres.shapes.OVAL, { x:x+sw2/2-0.28, y:2.0, w:0.56, h:0.56,
      fill:{color:col} });
    s.addText(n, { x:x+sw2/2-0.28, y:2.0, w:0.56, h:0.56, margin:0,
      align:"center", valign:"middle", fontFace:HFONT, fontSize:20, bold:true, color:BG });
    s.addText(name, { x:x+0.1, y:2.68, w:sw2-0.2, h:0.48, margin:0,
      align:"center", fontFace:BFONT, fontSize:13, bold:true, color:col });
    s.addShape(pres.shapes.RECTANGLE, { x:x+0.3, y:3.2, w:sw2-0.6, h:0.02, fill:{color:BORDER} });
    s.addText(body, { x:x+0.1, y:3.3, w:sw2-0.2, h:3.0, margin:0,
      align:"center", fontFace:BFONT, fontSize:11.5, color:TEXT, lineSpacingMultiple:1.35 });
    if (i<4) {
      s.addShape(pres.shapes.RIGHT_ARROW, { x:x+sw2+0.01, y:4.18, w:0.13, h:0.22,
        fill:{color:MUTED} });
    }
  });

  // Timing strip
  card(s, M, 6.85, W-2*M, 0.4, "0A0C12");
  s.addText("⏱  Typical total round-trip: 6 – 10 seconds on free AI tier   ·   C engine scoring: < 1 ms",
    { x:M+0.3, y:6.88, w:W-2*M-0.6, h:0.33, margin:0,
      fontFace:BFONT, fontSize:12, color:MUTED });

  footer(s, 14);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 15  —  Testing & Evaluation  (Member 6)
// ════════════════════════════════════════════════════════════════════════
(function slide15() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Conclusion", "Testing & Evaluation");


  // Test table
  const cols = ["Mood Input","Expected Genre / Context","Actual Result","Status"];
  const rows2 = [
    ['"relaxing cozy solo night"',        "Cozy · Relaxed · Solo",       "🎮 Balatro (2024)",          "✓ Pass"],
    ['"scary horror with a group"',       "Horror · Intense · Group",    "🎬 Alien (1979)",            "✓ Pass"],
    ['"epic action game for hours"',      "Action · Long · Solo",        "🎮 Super Mario Odyssey",     "✓ Pass"],
    ['"thoughtful sci-fi, alone"',        "Sci-Fi · Deep · Solo",        "🎬 Arrival (2016)",          "✓ Pass"],
  ];
  const cws = [3.4, 2.7, 3.1, 1.1];
  const cxs = [M, M+3.45, M+6.2, M+9.35];
  cols.forEach((c,ci) => {
    s.addText(c, { x:cxs[ci], y:1.88, w:cws[ci], h:0.4, margin:0,
      fontFace:BFONT, fontSize:11.5, bold:true, color:AMBER });
  });
  s.addShape(pres.shapes.RECTANGLE, { x:M, y:2.3, w:W-2*M, h:0.02, fill:{color:AMBER} });

  rows2.forEach((row,ri) => {
    row.forEach((cell,ci) => {
      s.addText(cell, { x:cxs[ci], y:2.38+ri*0.62, w:cws[ci], h:0.56, margin:0,
        fontFace:BFONT, fontSize:12,
        color: ci===3 ? GREEN : ci===2 ? TEAL : TEXT,
        bold: ci===3 });
    });
    s.addShape(pres.shapes.RECTANGLE, { x:M, y:2.38+ri*0.62+0.56, w:W-2*M, h:0.01, fill:{color:BORDER} });
  });

  // Edge cases
  s.addText("Edge Cases", { x:M, y:5.1, w:W-2*M, h:0.4, margin:0,
    fontFace:BFONT, fontSize:14, bold:true, color:AMBER });
  const edges = [
    ["Mixed Mood","'funny but also scary' → genre with higher scoring weight wins"],
    ["AI Failure","All 3 models fail → keyword fallback → still returns a result"],
    ["Empty Input","Server returns HTTP 400 → frontend shows clear error message"],
    ["Gibberish","AI still extracts preferences → C engine picks closest match"],
  ];
  const ecw = (W-2*M-0.45)/4;
  edges.forEach(([title,body],i) => {
    card(s, M+i*(ecw+0.15), 5.6, ecw, 1.6, CARD);
    s.addText(title, { x:M+i*(ecw+0.15)+0.15, y:5.73, w:ecw-0.3, h:0.38, margin:0,
      fontFace:BFONT, fontSize:12, bold:true, color:AMBER, align:"center" });
    s.addText(body, { x:M+i*(ecw+0.15)+0.15, y:6.16, w:ecw-0.3, h:0.88, margin:0,
      fontFace:BFONT, fontSize:11, color:TEXT, align:"center", lineSpacingMultiple:1.25 });
  });

  footer(s, 15);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 16  —  Limitations & Future Work  (Member 6)
// ════════════════════════════════════════════════════════════════════════
(function slide16() {
  const s = pres.addSlide(); s.background = {color:BG};
  header(s, "Conclusion", "Limitations & Future Work");


  // Left: Limitations
  card(s, M, 1.85, 5.85, 4.85, CARD);
  s.addText("⚠  Current Limitations", { x:M+0.25, y:2.0, w:5.2, h:0.45, margin:0,
    fontFace:BFONT, fontSize:15, bold:true, color:"E07070" });
  const lims = [
    "AI Match recommends only from the 55-title curated library — browse pages use open databases",
    "App runs locally — not yet deployed on a public server",
    "Free AI models can be slow or rate-limited during peak hours",
    "No user feedback loop — the system does not learn from ratings",
  ];
  const lr = lims.map(t=>({ text:"  "+t,
    options:{breakLine:true,fontFace:BFONT,fontSize:13,color:TEXT,
      paraSpaceAfter:18, bullet:{code:"25CF",indent:14,color:"E07070"}} }));
  s.addText(lr, { x:M+0.25, y:2.58, w:5.2, h:3.85, margin:0, valign:"top" });

  // Right: Future Work
  card(s, 6.85, 1.85, 5.75, 4.85, CARD);
  s.addText("🚀  Future Work", { x:7.1, y:2.0, w:5.2, h:0.45, margin:0,
    fontFace:BFONT, fontSize:15, bold:true, color:TEAL });
  const future = [
    ["User Profiles","Watch history and long-term preferences per account"],
    ["Personalization","Feedback ratings improve future recommendations"],
    ["Larger Library","Expand C engine library from 55 to 500+ titles"],
    ["Cloud Deployment","Host on a server — accessible from any device, anywhere"],
    ["Automated Tests","Unit tests for C scoring logic to prevent regressions"],
  ];
  future.forEach(([title, body], i) => {
    const ny = 2.6 + i * 0.84;
    s.addText(`${i+1}.  `, { x:7.1, y:ny, w:0.5, h:0.38, margin:0,
      fontFace:BFONT, fontSize:13, bold:true, color:AMBER });
    s.addText(title, { x:7.5, y:ny, w:4.0, h:0.38, margin:0,
      fontFace:BFONT, fontSize:13, bold:true, color:TEAL });
    s.addText(body, { x:7.5, y:ny+0.38, w:4.0, h:0.38, margin:0,
      fontFace:BFONT, fontSize:11.5, color:MUTED });
  });

  footer(s, 16);
})();

// ════════════════════════════════════════════════════════════════════════
//  SLIDE 17  —  Thank You  (Member 6)
// ════════════════════════════════════════════════════════════════════════
(function slide17() {
  const s = pres.addSlide(); s.background = {color:BG};

  // Amber glow circle behind text
  s.addShape(pres.shapes.OVAL, { x:4.15, y:1.2, w:5.0, h:5.0,
    fill:{color:"1A1200"}, line:{color:"2A2000",width:1} });

  s.addText("CINEMATCH", { x:M, y:2.1, w:W-2*M, h:1.1, margin:0,
    align:"center", fontFace:HFONT, fontSize:64, color:AMBER, bold:true, shadow:shadow() });

  s.addText("Thank You", { x:M, y:3.3, w:W-2*M, h:0.8, margin:0,
    align:"center", fontFace:HFONT, fontSize:40, color:TEXT });

  s.addShape(pres.shapes.RECTANGLE, { x:4.0, y:4.18, w:5.3, h:0.04, fill:{color:AMBER} });

  s.addText("Questions?", { x:M, y:4.38, w:W-2*M, h:0.6, margin:0,
    align:"center", fontFace:BFONT, fontSize:24, color:MUTED });

  // Member grid
  const names = ["[Member 1]","[Member 2]","[Member 3]","[Member 4]","[Member 5]","[Member 6]"];
  names.forEach((name, i) => {
    const x = M + (i % 3) * 3.8 + 0.8;
    const y = 5.2 + Math.floor(i / 3) * 0.55;
    s.addText(name, { x, y, w:3.5, h:0.45, margin:0,
      fontFace:BFONT, fontSize:13, color:MUTED, align:"center" });
  });

  s.addText("Advanced C Programming  ·  Sejong University  ·  2024",
    { x:M, y:H-0.5, w:W-2*M, h:0.3, margin:0,
      align:"center", fontFace:BFONT, fontSize:9, color:BORDER });
})();

// ── Write file ───────────────────────────────────────────────────────────
pres.writeFile({ fileName: "CINEMATCH-Presentation.pptx" }).then(() => {
  console.log("✅  CINEMATCH-Presentation.pptx written  (17 slides, 6 members, 15 min)");
});

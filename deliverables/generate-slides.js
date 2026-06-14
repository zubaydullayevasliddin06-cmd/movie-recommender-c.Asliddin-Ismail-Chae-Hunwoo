const pptxgen = require("pptxgenjs");

// ---------- palette (cinema dark — matches the CINEMATCH app) ----------
const BG     = "0F1117";  // app background
const CARD   = "1A1D27";  // app card
const CARD2  = "11141D";  // inset
const BORDER = "2A2F3E";
const AMBER  = "FFB347";  // app accent
const AMBER2 = "E8922B";
const TEXT   = "ECECF3";
const MUTED  = "9AA0B4";
const TEAL   = "5BC8AF";

const HFONT = "Georgia";   // header font with personality
const BFONT = "Calibri";   // clean body

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.author = "CINEMATCH Team";
pres.title  = "CINEMATCH — Capstone Presentation";

const W = 13.3, H = 7.5, M = 0.7;

function shadow() { return { type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.35 }; }

// section header used on content slides
function header(slide, kicker, title) {
  slide.addShape(pres.shapes.OVAL, { x: M, y: 0.62, w: 0.16, h: 0.16, fill: { color: AMBER } });
  slide.addText(kicker.toUpperCase(), { x: M + 0.28, y: 0.5, w: 10, h: 0.4, margin: 0,
    fontFace: BFONT, fontSize: 12, color: AMBER, bold: true, charSpacing: 3 });
  slide.addText(title, { x: M, y: 0.85, w: W - 2 * M, h: 0.8, margin: 0,
    fontFace: HFONT, fontSize: 32, color: TEXT, bold: true });
}
function footer(slide, n) {
  slide.addText([
    { text: "CINEMATCH", options: { color: AMBER, bold: true } },
    { text: "   ·   AI-Powered Movie & Game Recommender", options: { color: MUTED } },
  ], { x: M, y: H - 0.5, w: 9, h: 0.3, margin: 0, fontFace: BFONT, fontSize: 9 });
  slide.addText(String(n), { x: W - 1.2, y: H - 0.5, w: 0.5, h: 0.3, margin: 0,
    align: "right", fontFace: BFONT, fontSize: 9, color: MUTED });
}
function card(slide, x, y, w, h, fill = CARD) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08,
    fill: { color: fill }, line: { color: BORDER, width: 1 }, shadow: shadow() });
}

// ============================================================ 1. TITLE
let s = pres.addSlide();
s.background = { color: BG };
// faint amber glow band
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.12, fill: { color: AMBER } });
s.addText("🎬", { x: 0, y: 1.5, w: W, h: 1.4, align: "center", fontSize: 80, margin: 0 });
s.addText("CINEMATCH", { x: 0, y: 2.9, w: W, h: 1.2, align: "center", margin: 0,
  fontFace: HFONT, fontSize: 66, bold: true, color: AMBER, charSpacing: 2 });
s.addText("An AI-Powered Movie & Game Recommender", { x: 0, y: 4.1, w: W, h: 0.5, align: "center",
  margin: 0, fontFace: BFONT, fontSize: 22, color: TEXT });
s.addText("Describe your mood — get the perfect pick, and the reason why.", { x: 0, y: 4.6, w: W, h: 0.4,
  align: "center", margin: 0, fontFace: BFONT, fontSize: 14, italic: true, color: MUTED });
s.addShape(pres.shapes.LINE, { x: W/2 - 1.5, y: 5.45, w: 3, h: 0, line: { color: BORDER, width: 1 } });
s.addText("Software Engineering Capstone  ·  Sejong University", { x: 0, y: 5.6, w: W, h: 0.4,
  align: "center", margin: 0, fontFace: BFONT, fontSize: 13, color: MUTED });
s.addText("Asliddin Ismail   ·   Chae Hunwoo", { x: 0, y: 6.0, w: W, h: 0.4,
  align: "center", margin: 0, fontFace: BFONT, fontSize: 14, color: TEXT, bold: true });

// ============================================================ 2. PROBLEM
s = pres.addSlide();
s.background = { color: BG };
header(s, "The Problem", "Too much choice, too little time");
// left: big stat callout
card(s, M, 1.95, 5.4, 4.5);
s.addText("“", { x: M + 0.2, y: 2.0, w: 1, h: 1, margin: 0, fontFace: HFONT, fontSize: 80, color: AMBER });
s.addText([
  { text: "People often spend ", options: { color: TEXT } },
  { text: "longer choosing", options: { color: AMBER, bold: true } },
  { text: " what to watch than they spend enjoying a short film.", options: { color: TEXT } },
], { x: M + 0.4, y: 3.0, w: 4.6, h: 2.0, margin: 0, fontFace: HFONT, fontSize: 24, italic: true, lineSpacingMultiple: 1.1 });
s.addText("Decision fatigue is real.", { x: M + 0.4, y: 5.5, w: 4.6, h: 0.5, margin: 0,
  fontFace: BFONT, fontSize: 14, color: MUTED });
// right: pain points
const pains = [
  ["⏳", "Endless scrolling", "Streaming menus offer hundreds of rows and no clear answer."],
  ["🔁", "Optimized for engagement", "Platforms maximise watch-time, not a confident decision."],
  ["🤷", "No reason given", "Recommendations rarely explain why a title suits you."],
];
let py = 1.95;
pains.forEach(([ic, t, d]) => {
  card(s, 6.6, py, 6.0, 1.42);
  s.addText(ic, { x: 6.8, y: py + 0.32, w: 0.8, h: 0.8, margin: 0, fontSize: 26, align: "center" });
  s.addText(t, { x: 7.7, y: py + 0.22, w: 4.7, h: 0.4, margin: 0, fontFace: BFONT, fontSize: 16, bold: true, color: TEXT });
  s.addText(d, { x: 7.7, y: py + 0.62, w: 4.7, h: 0.7, margin: 0, fontFace: BFONT, fontSize: 12, color: MUTED });
  py += 1.55;
});
footer(s, 2);

// ============================================================ 3. SOLUTION
s = pres.addSlide();
s.background = { color: BG };
header(s, "Our Solution", "One answer. And the reason why.");
card(s, M, 2.0, W - 2*M, 2.2, CARD);
s.addText([
  { text: "CINEMATCH ", options: { color: AMBER, bold: true } },
  { text: "is a web app where you describe your mood in plain words — and an ", options: { color: TEXT } },
  { text: "AI", options: { color: TEAL, bold: true } },
  { text: " plus a ", options: { color: TEXT } },
  { text: "C engine", options: { color: TEAL, bold: true } },
  { text: " instantly pick the perfect movie or game for tonight, and tell you why.", options: { color: TEXT } },
], { x: M + 0.5, y: 2.35, w: W - 2*M - 1.0, h: 1.5, margin: 0, fontFace: HFONT, fontSize: 26, lineSpacingMultiple: 1.15 });
// three contrast pills
const pills = [
  ["Opinionated", "One confident pick — not 20 rows of thumbnails."],
  ["Explained", "A warm, plain-language reason you can trust."],
  ["Hybrid", "AI for language, C for deterministic logic."],
];
let px = M;
const pw = (W - 2*M - 1.0) / 3;
pills.forEach(([t, d]) => {
  card(s, px, 4.6, pw, 1.9, CARD2);
  s.addShape(pres.shapes.RECTANGLE, { x: px, y: 4.6, w: 0.09, h: 1.9, fill: { color: AMBER } });
  s.addText(t, { x: px + 0.35, y: 4.85, w: pw - 0.6, h: 0.5, margin: 0, fontFace: BFONT, fontSize: 19, bold: true, color: AMBER });
  s.addText(d, { x: px + 0.35, y: 5.4, w: pw - 0.6, h: 1.0, margin: 0, fontFace: BFONT, fontSize: 13.5, color: TEXT, lineSpacingMultiple: 1.1 });
  px += pw + 0.5;
});
footer(s, 3);

// ============================================================ 4. HOW IT WORKS (pipeline)
s = pres.addSlide();
s.background = { color: BG };
header(s, "How It Works", "The five-step pipeline");
const steps = [
  ["1", "You type a mood", "“scary but short, with friends”", TEXT],
  ["2", "AI → preferences", "medium · genre · time · mood · social", TEAL],
  ["3", "C engine scores", "all 55 titles, picks the best", AMBER],
  ["4", "AI explains", "a warm, personal reason", TEAL],
  ["5", "Shown in browser", "one confident result", TEXT],
];
const cw = (W - 2*M - 4*0.35) / 5;
let cx = M;
steps.forEach(([nbox, t, d], i) => {
  const yc = 2.4;
  card(s, cx, yc, cw, 2.6);
  s.addShape(pres.shapes.OVAL, { x: cx + cw/2 - 0.35, y: yc + 0.3, w: 0.7, h: 0.7, fill: { color: AMBER } });
  s.addText(nbox, { x: cx + cw/2 - 0.35, y: yc + 0.3, w: 0.7, h: 0.7, align: "center", valign: "middle",
    margin: 0, fontFace: HFONT, fontSize: 26, bold: true, color: BG });
  s.addText(t, { x: cx + 0.1, y: yc + 1.15, w: cw - 0.2, h: 0.6, align: "center", margin: 0,
    fontFace: BFONT, fontSize: 14.5, bold: true, color: TEXT });
  s.addText(d, { x: cx + 0.1, y: yc + 1.75, w: cw - 0.2, h: 0.75, align: "center", margin: 0,
    fontFace: BFONT, fontSize: 11, color: MUTED, lineSpacingMultiple: 1.05 });
  // arrow
  if (i < 4) s.addText("›", { x: cx + cw - 0.02, y: yc + 0.9, w: 0.4, h: 0.5, align: "center", margin: 0,
    fontFace: BFONT, fontSize: 30, color: AMBER, bold: true });
  cx += cw + 0.35;
});
s.addText([
  { text: "AI handles language", options: { color: TEAL, bold: true } },
  { text: "   ·   ", options: { color: MUTED } },
  { text: "C handles deterministic logic", options: { color: AMBER, bold: true } },
], { x: M, y: 5.5, w: W - 2*M, h: 0.5, align: "center", margin: 0, fontFace: BFONT, fontSize: 15 });
footer(s, 4);

// ============================================================ 5. ARCHITECTURE (DDD)
s = pres.addSlide();
s.background = { color: BG };
header(s, "Architecture", "Domain-Driven Design");
s.addText("Separate the business idea from the plumbing — each layer has one job.",
  { x: M, y: 1.7, w: W - 2*M, h: 0.4, margin: 0, fontFace: BFONT, fontSize: 14, color: MUTED });
const layers = [
  ["Interfaces", "What users reach: web pages + HTTP API", "Vite + React · Express"],
  ["Application", "Use cases: understand → pick → explain → discuss", "Node.js"],
  ["Domain", "Core concepts & rules · the scoring", "Node.js + C engine"],
  ["Infrastructure", "The outside world: AI client, engine runner", "OpenRouter · child process"],
];
let ly = 2.25;
layers.forEach(([t, d, tech], i) => {
  card(s, M, ly, W - 2*M, 0.92, i === 2 ? CARD : CARD2);
  s.addShape(pres.shapes.RECTANGLE, { x: M, y: ly, w: 0.12, h: 0.92, fill: { color: i === 2 ? AMBER : TEAL } });
  s.addText(t, { x: M + 0.4, y: ly + 0.12, w: 3.0, h: 0.68, valign: "middle", margin: 0,
    fontFace: BFONT, fontSize: 19, bold: true, color: i === 2 ? AMBER : TEXT });
  s.addText(d, { x: M + 3.5, y: ly + 0.12, w: 5.6, h: 0.68, valign: "middle", margin: 0,
    fontFace: BFONT, fontSize: 13.5, color: TEXT });
  s.addText(tech, { x: W - M - 3.4, y: ly + 0.12, w: 3.2, h: 0.68, valign: "middle", align: "right", margin: 0,
    fontFace: "Consolas", fontSize: 12, color: MUTED });
  ly += 1.02;
});
s.addText("The Node backend runs the compiled C program as a child process, exchanging JSON.",
  { x: M, y: 6.5, w: W - 2*M, h: 0.4, align: "center", margin: 0, fontFace: BFONT, fontSize: 12, italic: true, color: MUTED });
footer(s, 5);

// ============================================================ 6. AI USAGE
s = pres.addSlide();
s.background = { color: BG };
header(s, "The AI", "An LLM at three points");
const ai = [
  ["🧠", "Mood understanding", "Reads free text and emits structured preferences as strict JSON — turning vague human language into machine-usable data."],
  ["💬", "Explanation generation", "After the C engine picks a title, the LLM writes a warm two-to-three sentence reason, tailored to what the user said."],
  ["🎭", "Movie discussion", "Generates a full analysis of any film: theme, epic moments, director's vision, and discussion questions."],
];
let ax = M;
const aw = (W - 2*M - 2*0.5) / 3;
ai.forEach(([ic, t, d]) => {
  card(s, ax, 2.1, aw, 3.4);
  s.addShape(pres.shapes.OVAL, { x: ax + 0.4, y: 2.45, w: 0.95, h: 0.95, fill: { color: CARD2 }, line: { color: AMBER, width: 1.5 } });
  s.addText(ic, { x: ax + 0.4, y: 2.45, w: 0.95, h: 0.95, align: "center", valign: "middle", margin: 0, fontSize: 30 });
  s.addText(t, { x: ax + 0.4, y: 3.6, w: aw - 0.8, h: 0.5, margin: 0, fontFace: BFONT, fontSize: 18, bold: true, color: AMBER });
  s.addText(d, { x: ax + 0.4, y: 4.15, w: aw - 0.8, h: 1.2, margin: 0, fontFace: BFONT, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.12 });
  ax += aw + 0.5;
});
s.addText([
  { text: "Provider:  ", options: { color: MUTED } },
  { text: "OpenRouter — free open models (Qwen3)", options: { color: TEAL, bold: true } },
  { text: "   ·   zero cost for students", options: { color: MUTED } },
], { x: M, y: 5.85, w: W - 2*M, h: 0.5, align: "center", margin: 0, fontFace: BFONT, fontSize: 14 });
footer(s, 6);

// ============================================================ 7. C ENGINE (chart)
s = pres.addSlide();
s.background = { color: BG };
header(s, "The C Engine", "Transparent, rule-based scoring");
s.addText("Each title earns points; the highest score wins. The biggest weights reflect what matters most.",
  { x: M, y: 1.7, w: W - 2*M, h: 0.4, margin: 0, fontFace: BFONT, fontSize: 14, color: MUTED });
s.addChart(pres.charts.BAR, [{
  name: "Points", labels: ["Genre", "Medium", "Mood", "Time", "Social"], values: [6, 5, 4, 3, 2],
}], {
  x: M, y: 2.3, w: 7.2, h: 4.3, barDir: "col",
  chartColors: [AMBER, AMBER, AMBER2, AMBER2, AMBER2],
  chartArea: { fill: { color: CARD } },
  plotArea: { fill: { color: CARD } },
  catAxisLabelColor: MUTED, valAxisLabelColor: MUTED,
  catAxisLabelFontFace: BFONT, valAxisLabelFontFace: BFONT,
  catAxisLabelFontSize: 13, valAxisLabelFontSize: 11,
  valGridLine: { color: BORDER, size: 0.5 }, catGridLine: { style: "none" },
  valAxisHidden: false, showValue: true, dataLabelPosition: "outEnd",
  dataLabelColor: TEXT, dataLabelFontFace: BFONT, dataLabelFontSize: 14, dataLabelFontBold: true,
  showLegend: false, showTitle: false, valAxisMaxVal: 7, valAxisMinVal: 0,
  barGapWidthPct: 60,
});
// engine mode card
card(s, 8.2, 2.3, W - M - 8.2, 4.3, CARD);
s.addText("Engine Mode", { x: 8.5, y: 2.55, w: 4, h: 0.5, margin: 0, fontFace: BFONT, fontSize: 18, bold: true, color: AMBER });
s.addText("One C program, two modes:", { x: 8.5, y: 3.1, w: 4.2, h: 0.4, margin: 0, fontFace: BFONT, fontSize: 13, color: MUTED });
s.addText([
  { text: "No args", options: { bold: true, color: TEXT, breakLine: true } },
  { text: "→ interactive 5-question quiz", options: { color: MUTED, breakLine: true } },
], { x: 8.5, y: 3.55, w: 4.3, h: 0.9, margin: 0, fontFace: BFONT, fontSize: 13, lineSpacingMultiple: 1.1 });
s.addText([
  { text: "5 args", options: { bold: true, color: TEXT, breakLine: true } },
  { text: "→ prints one line of JSON", options: { color: MUTED } },
], { x: 8.5, y: 4.45, w: 4.3, h: 0.9, margin: 0, fontFace: BFONT, fontSize: 13, lineSpacingMultiple: 1.1 });
s.addShape(pres.shapes.RECTANGLE, { x: 8.5, y: 5.45, w: W - M - 8.7, h: 0.9, fill: { color: CARD2 }, line: { color: BORDER, width: 1 } });
s.addText("cinematch Movie horror short\n          intense group", { x: 8.65, y: 5.55, w: 4.2, h: 0.75, margin: 0,
  fontFace: "Consolas", fontSize: 11.5, color: TEAL });
footer(s, 7);

// ============================================================ 8. FEATURES (2x2)
s = pres.addSlide();
s.background = { color: BG };
header(s, "The Product", "Four pages, one app");
const feats = [
  ["✨", "AI Match", "The core feature. Type a mood, get one explained pick from the curated 55-title library."],
  ["🎬", "Movies", "Browse thousands of real films from the open TMDB dataset — search, filter, posters, details."],
  ["🎮", "Games", "Browse 800,000+ titles from the open RAWG dataset — covers, ratings, and detail views."],
  ["💬", "Discussion", "Search any film for AI analysis: cast, theme, epic moments, and discussion questions."],
];
const fw = (W - 2*M - 0.5) / 2, fh = 2.05;
let fi = 0;
for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
  const fx = M + c * (fw + 0.5), fy = 2.1 + r * (fh + 0.4);
  const [ic, t, d] = feats[fi++];
  card(s, fx, fy, fw, fh);
  s.addShape(pres.shapes.OVAL, { x: fx + 0.35, y: fy + 0.45, w: 1.05, h: 1.05, fill: { color: CARD2 }, line: { color: AMBER, width: 1.5 } });
  s.addText(ic, { x: fx + 0.35, y: fy + 0.45, w: 1.05, h: 1.05, align: "center", valign: "middle", margin: 0, fontSize: 32 });
  s.addText(t, { x: fx + 1.7, y: fy + 0.4, w: fw - 2.0, h: 0.5, margin: 0, fontFace: HFONT, fontSize: 22, bold: true, color: AMBER });
  s.addText(d, { x: fx + 1.7, y: fy + 0.95, w: fw - 2.0, h: 0.95, margin: 0, fontFace: BFONT, fontSize: 13.5, color: TEXT, lineSpacingMultiple: 1.12 });
}
footer(s, 8);

// ============================================================ 9. RELIABILITY
s = pres.addSlide();
s.background = { color: BG };
header(s, "Reliability", "Never crash in a live demo");
s.addText("Free AI models rate-limit and fail. CINEMATCH degrades gracefully at every layer.",
  { x: M, y: 1.7, w: W - 2*M, h: 0.4, margin: 0, fontFace: BFONT, fontSize: 14, color: MUTED });
// fallback chain visual
const chain = ["Qwen3", "Llama-3.3-70B", "GPT-OSS-120B", "Keyword fallback"];
let chx = M;
const chw = 2.7;
chain.forEach((t, i) => {
  const last = i === chain.length - 1;
  card(s, chx, 2.3, chw, 0.95, last ? CARD : CARD2);
  s.addText(t, { x: chx, y: 2.3, w: chw, h: 0.95, align: "center", valign: "middle", margin: 0,
    fontFace: BFONT, fontSize: 14, bold: true, color: last ? AMBER : TEXT });
  if (i < chain.length - 1) s.addText("→", { x: chx + chw - 0.05, y: 2.3, w: 0.5, h: 0.95, align: "center", valign: "middle",
    margin: 0, fontFace: BFONT, fontSize: 22, color: AMBER, bold: true });
  chx += chw + 0.45;
});
const guards = [
  ["🔁", "Automatic retry", "On a 429 or 5xx error, the request retries after a short delay."],
  ["🔑", "Keyword fallback", "If all AI fails, a local matcher still derives sensible preferences."],
  ["📝", "Content fallback", "Empty AI fields are replaced with rich, well-written defaults."],
];
let gx = M;
const gw = (W - 2*M - 2*0.5) / 3;
guards.forEach(([ic, t, d]) => {
  card(s, gx, 3.7, gw, 2.5);
  s.addText(ic, { x: gx + 0.3, y: 3.95, w: 0.9, h: 0.8, margin: 0, fontSize: 26, align: "center" });
  s.addText(t, { x: gx + 0.3, y: 4.75, w: gw - 0.6, h: 0.5, margin: 0, fontFace: BFONT, fontSize: 16, bold: true, color: AMBER });
  s.addText(d, { x: gx + 0.3, y: 5.25, w: gw - 0.6, h: 0.9, margin: 0, fontFace: BFONT, fontSize: 13, color: TEXT, lineSpacingMultiple: 1.1 });
  gx += gw + 0.5;
});
footer(s, 9);

// ============================================================ 10. DEMO RESULTS
s = pres.addSlide();
s.background = { color: BG };
header(s, "Live Demo", "Rehearsed and reliable");
const demos = [
  ["🎮", "“relaxing cozy solo night”", "Balatro (2024)", "Cozy · Relaxed · ★ 9.0"],
  ["🎬", "“scary horror with a group”", "Alien (1979)", "Horror · Intense · ★ 8.5"],
  ["🎮", "“epic action game for hours”", "Super Mario Odyssey", "Action · Light · ★ 9.4"],
];
let dx = M;
const dw = (W - 2*M - 2*0.5) / 3;
demos.forEach(([ic, q, title, meta]) => {
  card(s, dx, 2.3, dw, 3.6);
  s.addText(q, { x: dx + 0.35, y: 2.6, w: dw - 0.7, h: 0.9, margin: 0, fontFace: HFONT, fontSize: 16, italic: true, color: MUTED, lineSpacingMultiple: 1.1 });
  s.addShape(pres.shapes.LINE, { x: dx + 0.35, y: 3.6, w: dw - 0.7, h: 0, line: { color: BORDER, width: 1 } });
  s.addText(ic, { x: dx, y: 3.8, w: dw, h: 0.9, align: "center", margin: 0, fontSize: 44 });
  s.addText(title, { x: dx + 0.2, y: 4.75, w: dw - 0.4, h: 0.6, align: "center", margin: 0, fontFace: BFONT, fontSize: 18, bold: true, color: AMBER });
  s.addText(meta, { x: dx + 0.2, y: 5.35, w: dw - 0.4, h: 0.4, align: "center", margin: 0, fontFace: BFONT, fontSize: 12.5, color: TEXT });
  dx += dw + 0.5;
});
s.addText("Same mood → same pick, every time. The C engine is deterministic.",
  { x: M, y: 6.2, w: W - 2*M, h: 0.4, align: "center", margin: 0, fontFace: BFONT, fontSize: 13, italic: true, color: MUTED });
footer(s, 10);

// ============================================================ 11. TECH STACK
s = pres.addSlide();
s.background = { color: BG };
header(s, "Under the Hood", "Tech stack & open data");
const tech = [
  ["Engine", "C → cinematch.exe"],
  ["Backend", "Node.js + Express"],
  ["Frontend", "Vite + React"],
  ["Packages", "pnpm"],
  ["AI", "OpenRouter (Qwen3)"],
  ["Movies", "TMDB open dataset"],
  ["Games", "RAWG open dataset"],
  ["Version control", "Git + GitHub"],
];
const tcw = (W - 2*M - 3*0.4) / 4, tch = 1.7;
let ti = 0;
for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) {
  const tx = M + c * (tcw + 0.4), ty = 2.3 + r * (tch + 0.4);
  const [t, d] = tech[ti++];
  card(s, tx, ty, tcw, tch, CARD2);
  s.addShape(pres.shapes.RECTANGLE, { x: tx, y: ty, w: tcw, h: 0.09, fill: { color: AMBER } });
  s.addText(t.toUpperCase(), { x: tx + 0.2, y: ty + 0.35, w: tcw - 0.4, h: 0.4, margin: 0, fontFace: BFONT, fontSize: 11, bold: true, color: MUTED, charSpacing: 1 });
  s.addText(d, { x: tx + 0.2, y: ty + 0.8, w: tcw - 0.4, h: 0.7, margin: 0, fontFace: BFONT, fontSize: 15, bold: true, color: TEXT });
}
footer(s, 11);

// ============================================================ 12. CLOSING
s = pres.addSlide();
s.background = { color: BG };
s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.12, fill: { color: AMBER } });
s.addText("🎬", { x: 0, y: 1.7, w: W, h: 1.2, align: "center", fontSize: 60, margin: 0 });
s.addText("Classic C meets modern AI.", { x: 0, y: 3.0, w: W, h: 0.9, align: "center", margin: 0,
  fontFace: HFONT, fontSize: 40, bold: true, color: AMBER });
s.addText("A focused idea, executed cleanly — deterministic logic in C, language in an LLM,\nwrapped in a polished, well-architected product.",
  { x: 0, y: 4.0, w: W, h: 1.0, align: "center", margin: 0, fontFace: BFONT, fontSize: 16, color: TEXT, lineSpacingMultiple: 1.2 });
s.addShape(pres.shapes.LINE, { x: W/2 - 1.5, y: 5.3, w: 3, h: 0, line: { color: BORDER, width: 1 } });
s.addText("Thank you", { x: 0, y: 5.5, w: W, h: 0.5, align: "center", margin: 0, fontFace: HFONT, fontSize: 22, bold: true, color: TEXT });
s.addText("github.com/zubaydullayevasliddin06-cmd  ·  CINEMATCH", { x: 0, y: 6.1, w: W, h: 0.4, align: "center", margin: 0, fontFace: BFONT, fontSize: 12, color: MUTED });

pres.writeFile({ fileName: "CINEMATCH-Presentation.pptx" }).then(f => console.log("Slides written:", f));

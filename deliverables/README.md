# Deliverables

Final submission materials for the CINEMATCH capstone.

| File | What it is |
|---|---|
| `CINEMATCH-Report.docx` | The written project report (problem, design, architecture, AI use, results). |
| `CINEMATCH-Presentation.pptx` | The presentation slides (12 slides, cinema-dark theme). |
| `../DEMO-CHECKLIST.md` | Step-by-step checklist for demo day. |

## Regenerating

Both documents are generated from code so they can be updated easily:

```bash
npm install              # installs docx + pptxgenjs (once)
node generate-report.js  # → CINEMATCH-Report.docx
node generate-slides.js  # → CINEMATCH-Presentation.pptx
```

Edit the team member names, course details, or content directly in the
`.js` files and re-run.

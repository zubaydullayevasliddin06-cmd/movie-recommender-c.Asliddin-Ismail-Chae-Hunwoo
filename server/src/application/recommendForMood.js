/* application/recommendForMood.js
   The main use case, orchestrating the three steps:
     1) understand the mood (AI)  2) pick a title (C engine)  3) explain it (AI).
   This is the "story" of the app in one readable function. */

const { moodToPreferences } = require('./moodToPreferences');
const { explainRecommendation } = require('./explainRecommendation');
const { pickTitle } = require('../infrastructure/cEngine');

async function recommendForMood(text) {
  // 1) AI: free text -> structured preferences
  const preferences = await moodToPreferences(text);

  // 2) C engine: score the 55 titles and pick the best
  const title = await pickTitle(preferences);
  if (!title || !title.found) throw new Error('No match found.');

  // 3) AI: a friendly reason. If the AI hiccups, fall back to the title's description.
  let explanation;
  try { explanation = await explainRecommendation(text, title); }
  catch { explanation = title.desc; }

  return { preferences, title, explanation };
}

module.exports = { recommendForMood };

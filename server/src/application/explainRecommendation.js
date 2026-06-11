/* application/explainRecommendation.js
   Use case: write a warm 2-3 sentence reason for why a title fits what the user asked. */

const { chat } = require('../infrastructure/openrouterClient');

const SYSTEM =
`You are CINEMATCH, a friendly movie & game guide. In 2-3 short sentences, tell the user
why this pick fits what they asked for. Be warm and specific. Plain text, no markdown.`;

async function explainRecommendation(userText, title) {
  const user =
`The user said: "${userText}".
We recommend: ${title.title} (${title.type}, ${title.year}) — genre ${title.genre},
mood ${title.mood}. About it: ${title.desc}.
Explain, speaking directly to the user, why it fits tonight.`;

  return chat([{ role: 'system', content: SYSTEM }, { role: 'user', content: user }], 0.8);
}

module.exports = { explainRecommendation };

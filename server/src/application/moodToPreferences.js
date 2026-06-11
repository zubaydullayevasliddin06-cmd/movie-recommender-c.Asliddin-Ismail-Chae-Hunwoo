/* application/moodToPreferences.js
   Use case: turn the user's free text ("scary but short, with friends") into a valid
   Preferences object. Uses the AI; if the AI is unavailable, falls back to keyword rules
   so the app keeps working. */

const { chat } = require('../infrastructure/openrouterClient');
const { toPreferences } = require('../domain/preferences');

const SYSTEM =
`You convert a person's description of what they feel like watching or playing into 5 fixed fields.
Reply with ONLY a JSON object, no other words.
Allowed values (use EXACTLY these):
- medium: "Movie", "Game", or "any" (use "any" if they didn't clearly say)
- genre: action, comedy, scifi, drama, horror, or cozy
- timeNeed: short, medium, or long
- mood: intense, light, deep, or relaxed
- social: solo or group
Example: {"medium":"any","genre":"horror","timeNeed":"short","mood":"intense","social":"group"}`;

// Pull a JSON object out of the model's reply, even if it added stray words.
function extractJson(text) {
  try { return JSON.parse(text); } catch { /* try harder */ }
  const match = text.match(/\{[\s\S]*\}/);
  if (match) { try { return JSON.parse(match[0]); } catch { /* give up */ } }
  return {};
}

// Last-resort guess from keywords if the AI can't be reached.
function keywordFallback(text) {
  const t = text.toLowerCase();
  const has = (...words) => words.some((w) => t.includes(w));
  return toPreferences({
    medium: has('game', 'play', 'gaming') ? 'Game' : has('movie', 'watch', 'film') ? 'Movie' : 'any',
    genre:  has('scary', 'horror', 'fear') ? 'horror'
          : has('funny', 'comedy', 'laugh') ? 'comedy'
          : has('sci-fi', 'scifi', 'space', 'future', 'alien') ? 'scifi'
          : has('cozy', 'chill', 'calm') ? 'cozy'
          : has('drama', 'emotional', 'story') ? 'drama' : 'action',
    timeNeed: has('short', 'quick', 'hour') ? 'short' : has('weekend', 'long', 'all day') ? 'long' : 'medium',
    mood: has('intense', 'scary', 'thrill') ? 'intense'
        : has('deep', 'thoughtful', 'emotional', 'meaning') ? 'deep'
        : has('relax', 'chill', 'cozy', 'calm') ? 'relaxed' : 'light',
    social: has('friend', 'group', 'together', 'party', 'others') ? 'group' : 'solo',
  });
}

async function moodToPreferences(text) {
  try {
    const reply = await chat([{ role: 'system', content: SYSTEM }, { role: 'user', content: text }], 0.2);
    return toPreferences(extractJson(reply));
  } catch (err) {
    console.warn('AI understand failed, using keyword fallback:', err.message);
    return keywordFallback(text);
  }
}

module.exports = { moodToPreferences };

/* domain/preferences.js
   The "Preferences" value object: the 5 choices that describe what a user feels like,
   plus the ONLY values that are valid. This is the heart of the domain — it knows nothing
   about AI, HTTP, or the C engine. */

// The exact values the C engine understands.
const ALLOWED = {
  medium:   ['Movie', 'Game', 'any'],
  genre:    ['action', 'comedy', 'scifi', 'drama', 'horror', 'cozy'],
  timeNeed: ['short', 'medium', 'long'],
  mood:     ['intense', 'light', 'deep', 'relaxed'],
  social:   ['solo', 'group'],
};

// Safe defaults when something is missing or invalid.
const DEFAULTS = { medium: 'any', genre: 'action', timeNeed: 'medium', mood: 'light', social: 'solo' };

// Keep only an allowed value; otherwise fall back to the default.
function clamp(value, list, fallback) {
  if (typeof value !== 'string') return fallback;
  const hit = list.find((x) => x.toLowerCase() === value.trim().toLowerCase());
  return hit || fallback;
}

// Force any rough object into a valid Preferences object.
function toPreferences(raw = {}) {
  return {
    medium:   clamp(raw.medium,   ALLOWED.medium,   DEFAULTS.medium),
    genre:    clamp(raw.genre,    ALLOWED.genre,    DEFAULTS.genre),
    timeNeed: clamp(raw.timeNeed, ALLOWED.timeNeed, DEFAULTS.timeNeed),
    mood:     clamp(raw.mood,     ALLOWED.mood,     DEFAULTS.mood),
    social:   clamp(raw.social,   ALLOWED.social,   DEFAULTS.social),
  };
}

module.exports = { ALLOWED, DEFAULTS, toPreferences };

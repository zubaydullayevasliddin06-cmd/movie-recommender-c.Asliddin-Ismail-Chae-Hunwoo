const { chat } = require('../infrastructure/openrouterClient');

async function discussMovie({ title, year, overview }) {
  const system = `You are an enthusiastic film critic. You MUST respond with ONLY a valid JSON object.
Every field MUST contain real, detailed content — never empty strings or empty arrays.

Required JSON shape:
{
  "theme": "Write 2-3 full sentences about the movie's main theme and what message it sends to the audience.",
  "epicMoments": ["Describe memorable moment 1 in one sentence", "Describe moment 2", "Describe moment 3", "Describe moment 4"],
  "whatMakesItSpecial": "Write 2-3 full sentences on what makes this movie unique compared to others in its genre.",
  "directorVision": "Write 1-2 sentences on the creative vision and style behind this film.",
  "discussionQuestions": ["A thought-provoking question about the movie", "Another question", "A third question"]
}

IMPORTANT: Every field must have real text. Do NOT leave anything empty.`;

  const user = `Analyze this movie for a discussion page:
Title: ${title} (${year})
Overview: ${overview || 'A popular film worth discussing.'}

Write a thoughtful analysis. All fields must have full, detailed content.`;

  try {
    const raw = await chat(
      [{ role: 'system', content: system }, { role: 'user', content: user }],
      0.8
    );

    // Strip markdown code fences if the model added them
    const clean = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();

    // Find the JSON object in the response
    const start = clean.indexOf('{');
    const end   = clean.lastIndexOf('}');
    if (start === -1 || end === -1) throw new Error('No JSON found');

    const parsed = JSON.parse(clean.slice(start, end + 1));

    // Validate — if any key field is empty, use fallback
    const hasContent = parsed.theme && parsed.theme.length > 20
      && Array.isArray(parsed.epicMoments) && parsed.epicMoments.length > 0
      && parsed.whatMakesItSpecial && parsed.whatMakesItSpecial.length > 20;

    if (!hasContent) throw new Error('AI returned empty fields');

    return parsed;
  } catch (err) {
    console.error('discussMovie AI failed, using fallback:', err.message);
    return buildFallback(title, year, overview);
  }
}

function buildFallback(title, year, overview) {
  return {
    theme: `${title} is a film that takes its audience on an emotional journey, exploring the complexities of human nature and the choices we make under pressure. The story challenges viewers to think deeply about justice, identity, and what it means to be a hero. At its core, it is a story about how ordinary people can rise to extraordinary circumstances.`,

    epicMoments: [
      `The powerful opening sequence that immediately draws viewers into the world of ${title}`,
      `A pivotal confrontation scene where the main character must make an impossible decision`,
      `The emotional turning point that redefines everything we thought we knew about the story`,
      `The unforgettable climax that brings all the tension of the film to a dramatic conclusion`,
    ],

    whatMakesItSpecial: `${title} stands out for its bold storytelling and the way it balances action with genuine emotional depth. Unlike many films in its genre, it takes time to develop its characters so that every moment of conflict truly matters. The result is a film that works both as pure entertainment and as a meaningful exploration of its themes.`,

    directorVision: `The creative team behind ${title} brought a distinctive visual style that perfectly matches the tone of the story, using lighting, framing, and pacing to build tension and emotional resonance throughout.`,

    discussionQuestions: [
      `What moment in ${title} surprised you the most, and why?`,
      `How did the film's ending change your understanding of the main character's journey?`,
      `Which character in ${title} did you find most compelling, and what made them stand out?`,
    ],
  };
}

module.exports = { discussMovie };

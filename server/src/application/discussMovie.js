const { chat } = require('../infrastructure/openrouterClient');

async function discussMovie({ title, year, overview }) {
  const system = `You are an enthusiastic film critic who loves deep movie discussions.
Given a movie's basic info, return a JSON object with this exact shape and nothing else:
{
  "theme": "2-3 sentences about the movie's main theme and what it wants the audience to feel or understand",
  "epicMoments": ["short description of memorable moment 1", "moment 2", "moment 3", "moment 4"],
  "whatMakesItSpecial": "2-3 sentences on what sets this movie apart from others in its genre",
  "directorVision": "1-2 sentences on the director's style and vision for this film",
  "discussionQuestions": ["interesting question 1", "question 2", "question 3"]
}
Return only valid JSON. No markdown, no explanation.`;

  const user = `Movie: ${title} (${year})\nOverview: ${overview}`;

  try {
    const raw  = await chat([{ role: 'system', content: system }, { role: 'user', content: user }], 0.7);
    const json = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(json);
  } catch {
    return fallback(title);
  }
}

function fallback(title) {
  return {
    theme: `${title} explores deep human emotions and the choices that define us. It challenges the audience to reflect on their own values and relationships.`,
    epicMoments: ['The opening scene that sets the tone', 'The pivotal turning point mid-film', 'The emotional climax', 'The memorable final scene'],
    whatMakesItSpecial: `${title} stands out through its unique storytelling and powerful performances that stay with you long after the credits roll.`,
    directorVision: 'The director brings a distinctive visual style and emotional depth, crafting every scene with intention.',
    discussionQuestions: ['What was the most surprising moment for you?', 'How did the ending change your view of the story?', 'Which character did you connect with most and why?'],
  };
}

module.exports = { discussMovie };

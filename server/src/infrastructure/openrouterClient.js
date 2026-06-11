/* infrastructure/openrouterClient.js
   The ONLY place that knows how to talk to the OpenRouter AI service.
   Exposes chat(messages): it tries a chain of free models, retrying briefly on
   rate-limits / server errors, so a busy free model doesn't break the app. */

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Preferred model(s) from .env, then reliable fallbacks. Duplicates removed.
const PREFERRED = (process.env.OPENROUTER_MODEL || 'qwen/qwen3-next-80b-a3b-instruct:free')
  .split(',').map((s) => s.trim()).filter(Boolean);
const FALLBACKS = ['meta-llama/llama-3.3-70b-instruct:free', 'openai/gpt-oss-120b:free'];
const MODEL_CHAIN = [...new Set([...PREFERRED, ...FALLBACKS])];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function chat(messages, temperature = 0.7) {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error('OPENROUTER_API_KEY is missing. Add it to server/.env (see .env.example).');
  }

  let lastError;
  for (const model of MODEL_CHAIN) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, messages, temperature }),
      });

      if (res.ok) {
        const data = await res.json();
        return data.choices?.[0]?.message?.content ?? '';
      }

      lastError = new Error(`OpenRouter ${res.status} on ${model}: ${await res.text()}`);
      if (res.status === 429 || res.status >= 500) { await sleep(1500); continue; } // retry
      break; // other errors: skip to the next model
    }
  }
  throw lastError;
}

module.exports = { chat, MODEL_CHAIN };

/* app.js — the only front-end logic.
   When you submit, it asks the server for a recommendation and shows it. */

const form = document.getElementById('form');
const text = document.getElementById('text');
const go = document.getElementById('go');
const statusEl = document.getElementById('status');
const result = document.getElementById('result');
const titleEl = document.getElementById('title');
const metaEl = document.getElementById('meta');
const whyEl = document.getElementById('why');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const value = text.value.trim();
  if (!value) return;

  // Show a "thinking" message, hide any old result.
  result.hidden = true;
  statusEl.hidden = false;
  statusEl.textContent = 'Thinking… the AI is reading your mood and the C engine is scoring 55 titles.';
  go.disabled = true;

  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong.');

    const icon = data.title.type === 'Movie' ? '🎬' : '🎮';
    titleEl.textContent = `${icon} ${data.title.title} (${data.title.year})`;
    metaEl.textContent = `${data.title.genre} · ${data.title.mood} · rating ${data.title.rating}`;
    whyEl.textContent = data.explanation;

    statusEl.hidden = true;
    result.hidden = false;
  } catch (err) {
    statusEl.textContent = '⚠️ ' + err.message;
  } finally {
    go.disabled = false;
  }
});

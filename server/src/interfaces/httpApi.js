/* interfaces/httpApi.js
   The web entry point: builds the Express app, serves the simple fallback page, and
   exposes POST /api/recommend. This layer only translates HTTP <-> the use case. */

const express = require('express');
const path = require('node:path');
const { recommendForMood } = require('../application/recommendForMood');

function createApp() {
  const app = express();
  app.use(express.json());

  // Serve the built React app (web/dist) if it has been built; otherwise fall back to
  // the simple page in server/public. (In development, use `vite dev` on :5173 instead.)
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'web', 'dist')));
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));

  app.post('/api/recommend', async (req, res) => {
    const text = (req.body?.text || '').trim();
    if (!text) return res.status(400).json({ error: 'Please describe what you feel like.' });

    try {
      const result = await recommendForMood(text);
      res.json(result);
    } catch (err) {
      console.error('Recommend failed:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  return app;
}

module.exports = { createApp };

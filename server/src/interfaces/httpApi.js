/* interfaces/httpApi.js
   HTTP layer: translates requests → use cases → responses. */

const express = require('express');
const path    = require('node:path');
const { recommendForMood }   = require('../application/recommendForMood');
const { discussMovie }       = require('../application/discussMovie');
const { register, login, verifyToken } = require('../application/auth');
const { addToHistory, getHistory }     = require('../infrastructure/userDb');
const { TITLES } = require('../domain/library');

/* Middleware: read the Authorization: Bearer <token> header.
   Attaches req.user if the token is valid; otherwise req.user is null. */
function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    try { req.user = verifyToken(header.slice(7)); }
    catch { req.user = null; }
  } else {
    req.user = null;
  }
  next();
}

function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Please log in first.' });
  next();
}

function createApp() {
  const app = express();
  app.use(express.json());
  app.use(optionalAuth);

  // Serve built React app (web/dist) or fallback public page in development.
  app.use(express.static(path.join(__dirname, '..', '..', '..', 'web', 'dist')));
  app.use(express.static(path.join(__dirname, '..', '..', 'public')));

  /* ── Auth ────────────────────────────────── */
  app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body || {};
    try {
      const result = await register(username, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body || {};
    try {
      const result = await login(username, password);
      res.json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  /* ── History ─────────────────────────────── */
  app.get('/api/history', requireAuth, (req, res) => {
    res.json(getHistory(req.user.id));
  });

  app.post('/api/history', requireAuth, (req, res) => {
    const entry = req.body || {};
    if (!entry.title) return res.status(400).json({ error: 'title is required.' });
    addToHistory(req.user.id, entry);
    res.json({ ok: true });
  });

  /* ── Library ─────────────────────────────── */
  app.get('/api/titles', (_req, res) => {
    res.json(TITLES);
  });

  /* ── Discussion ──────────────────────────── */
  app.post('/api/discuss', async (req, res) => {
    const { title, year, overview } = req.body || {};
    if (!title) return res.status(400).json({ error: 'Movie title is required.' });
    try {
      const analysis = await discussMovie({ title, year: year || '', overview: overview || '' });
      res.json(analysis);
    } catch (err) {
      console.error('Discuss failed:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  /* ── Recommend ───────────────────────────── */
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

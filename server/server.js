/* server.js — the entry point.
   Loads the secret key from .env, builds the app, and starts listening. */

require('dotenv').config();
const { createApp } = require('./src/interfaces/httpApi');

const app = createApp();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\nCINEMATCH is running.  Open  http://localhost:${PORT}  in your browser.\n`);
});

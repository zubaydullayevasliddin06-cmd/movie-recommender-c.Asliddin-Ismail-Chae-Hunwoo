/* infrastructure/cEngine.js
   Runs the compiled C recommendation engine as a small child process and reads back
   the chosen title as JSON. This is the bridge between Node and the C "domain service". */

const { execFile } = require('node:child_process');
const path = require('node:path');

// server/src/infrastructure -> up 3 -> repo root -> engine/cinematch.exe
const ENGINE_PATH = path.join(__dirname, '..', '..', '..', 'engine', 'cinematch.exe');

/**
 * Ask the C engine for the best title for these preferences.
 * @param {{medium:string,genre:string,timeNeed:string,mood:string,social:string}} prefs
 * @returns {Promise<object>} the picked title (parsed from the engine's JSON)
 */
function pickTitle(prefs) {
  const args = [prefs.medium, prefs.genre, prefs.timeNeed, prefs.mood, prefs.social];
  return new Promise((resolve, reject) => {
    execFile(ENGINE_PATH, args, { timeout: 5000 }, (err, stdout) => {
      if (err) return reject(new Error('Could not run the C engine: ' + err.message));
      try { resolve(JSON.parse(stdout.trim())); }
      catch { reject(new Error('C engine did not return valid JSON. Got: ' + stdout)); }
    });
  });
}

module.exports = { pickTitle, ENGINE_PATH };

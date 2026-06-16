/* infrastructure/userDb.js
   Simple JSON-file user store. No native binaries — works on any machine.
   Each user: { id, username, passwordHash, createdAt, history: [] } */

const fs   = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', '..', 'data', 'users.json');

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    return [];
  }
}

function writeDb(users) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

function findByUsername(username) {
  return readDb().find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
}

function findById(id) {
  return readDb().find(u => u.id === id) || null;
}

function createUser(username, passwordHash) {
  const users = readDb();
  const user = {
    id: Date.now().toString(),
    username,
    passwordHash,
    createdAt: new Date().toISOString(),
    history: [],
  };
  users.push(user);
  writeDb(users);
  return user;
}

function addToHistory(userId, entry) {
  const users = readDb();
  const user  = users.find(u => u.id === userId);
  if (!user) return;
  user.history.unshift({ ...entry, savedAt: new Date().toISOString() });
  if (user.history.length > 50) user.history = user.history.slice(0, 50);
  writeDb(users);
}

function getHistory(userId) {
  const user = findById(userId);
  return user ? user.history : [];
}

module.exports = { findByUsername, findById, createUser, addToHistory, getHistory };

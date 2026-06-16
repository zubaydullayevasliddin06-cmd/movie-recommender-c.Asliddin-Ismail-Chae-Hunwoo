/* application/auth.js
   Register and login use cases. Keeps password and token logic out of the HTTP layer. */

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { findByUsername, createUser } = require('../infrastructure/userDb');

const SECRET = process.env.JWT_SECRET || 'cinematch-secret-key-2024';

async function register(username, password) {
  if (!username || username.trim().length < 3)
    throw new Error('Username must be at least 3 characters.');
  if (!password || password.length < 6)
    throw new Error('Password must be at least 6 characters.');
  if (findByUsername(username))
    throw new Error('That username is already taken — try another one.');

  const passwordHash = await bcrypt.hash(password, 10);
  const user  = createUser(username.trim(), passwordHash);
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '7d' });
  return { token, username: user.username };
}

async function login(username, password) {
  const user = findByUsername(username);
  if (!user) throw new Error('Wrong username or password.');

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok)  throw new Error('Wrong username or password.');

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '7d' });
  return { token, username: user.username };
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { register, login, verifyToken };

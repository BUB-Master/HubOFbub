/**
 * BUB Authentication
 * Passwords are hashed with PBKDF2 (Web Crypto API).
 * Never stored as plain text.
 */

const Auth = (() => {
  const ITERATIONS = 100000;
  const SALT_LEN = 16;
  const KEY_LEN = 32;

  // ---------- helpers ----------
  function bufToHex(buf) {
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function hexToBuf(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes.buffer;
  }

  async function deriveKey(password, saltHex) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      'PBKDF2',
      false,
      ['deriveBits']
    );
    const bits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: hexToBuf(saltHex),
        iterations: ITERATIONS,
        hash: 'SHA-256'
      },
      keyMaterial,
      KEY_LEN * 8
    );
    return bufToHex(bits);
  }

  function randomSalt() {
    const arr = new Uint8Array(SALT_LEN);
    crypto.getRandomValues(arr);
    return bufToHex(arr);
  }

  // ---------- public API ----------
  async function hashPassword(password) {
    const salt = randomSalt();
    const hash = await deriveKey(password, salt);
    return { salt, hash };
  }

  async function verifyPassword(password, salt, storedHash) {
    const hash = await deriveKey(password, salt);
    return hash === storedHash;
  }

  async function createUser(username, password, { isAdmin = false } = {}) {
    username = username.trim().toLowerCase();
    if (username.length < 3) throw new Error('Username must be at least 3 characters');
    if (password.length < 8) throw new Error('Password must be at least 8 characters');
    if (Storage.getUser(username)) throw new Error('Username already taken');

    const { salt, hash } = await hashPassword(password);
    const user = {
      username,
      salt,
      hash,
      isAdmin: !!isAdmin,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      theme: 'dark',
      backgroundType: 'none',
      backgroundValue: '',
      devices: []
    };
    Storage.upsertUser(username, user);
    return user;
  }

  async function login(username, password, remember = false) {
    username = username.trim().toLowerCase();
    const user = Storage.getUser(username);
    if (!user) throw new Error('Invalid username or password');
    if (!user.isActive) throw new Error('This account has been disabled');

    const ok = await verifyPassword(password, user.salt, user.hash);
    if (!ok) throw new Error('Invalid username or password');

    // Update last login
    Storage.upsertUser(username, { lastLogin: new Date().toISOString() });

    const session = {
      username,
      isAdmin: user.isAdmin,
      loginAt: new Date().toISOString()
    };
    Storage.setSession(session, remember);
    return session;
  }

  function logout() {
    Storage.clearSession();
  }

  function currentSession() {
    return Storage.getSession();
  }

  function currentUser() {
    const session = currentSession();
    if (!session) return null;
    return Storage.getUser(session.username);
  }

  function isLoggedIn() {
    return !!currentSession();
  }

  async function changePassword(username, currentPassword, newPassword) {
    const user = Storage.getUser(username);
    if (!user) throw new Error('User not found');

    const ok = await verifyPassword(currentPassword, user.salt, user.hash);
    if (!ok) throw new Error('Current password is incorrect');
    if (newPassword.length < 8) throw new Error('New password must be at least 8 characters');

    const { salt, hash } = await hashPassword(newPassword);
    Storage.upsertUser(username, { salt, hash });
    // Session stays valid — next login will use the new hash
  }

  // Seed default admin on first run
  async function ensureDefaultAdmin() {
    const users = Storage.getUsers();
    if (Object.keys(users).length === 0) {
      await createUser('admin', 'admin123', { isAdmin: true });
      console.log('%cBUB: Default admin created → username: admin  password: admin123', 'color:#a5b4fc');
    }
  }

  return {
    hashPassword,
    verifyPassword,
    createUser,
    login,
    logout,
    currentSession,
    currentUser,
    isLoggedIn,
    changePassword,
    ensureDefaultAdmin
  };
})();

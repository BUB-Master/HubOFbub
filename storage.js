/**
 * BUB Storage Layer
 * All persistent data lives in localStorage under the "bub:" namespace.
 */

const Storage = (() => {
  const PREFIX = 'bub:';

  function get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function set(key, value) {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  }

  function remove(key) {
    localStorage.removeItem(PREFIX + key);
  }

  // ----- Users -----
  function getUsers() {
    return get('users', {});
  }

  function saveUsers(users) {
    set('users', users);
  }

  function getUser(username) {
    return getUsers()[username] || null;
  }

  function upsertUser(username, data) {
    const users = getUsers();
    users[username] = { ...users[username], ...data, username };
    saveUsers(users);
    return users[username];
  }

  // ----- Global settings -----
  function getGlobal() {
    return get('global', {
      appName: 'BUB',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #334155 100%)',
      allowRegistration: false
    });
  }

  function saveGlobal(data) {
    set('global', { ...getGlobal(), ...data });
  }

  // ----- Session -----
  function getSession() {
    // Prefer sessionStorage for non-remember, fall back to localStorage
    try {
      const s = sessionStorage.getItem(PREFIX + 'session');
      if (s) return JSON.parse(s);
    } catch {}
    return get('session', null);
  }

  function setSession(session, remember = false) {
    const payload = JSON.stringify(session);
    if (remember) {
      set('session', session);
      sessionStorage.removeItem(PREFIX + 'session');
    } else {
      sessionStorage.setItem(PREFIX + 'session', payload);
      remove('session');
    }
  }

  function clearSession() {
    remove('session');
    sessionStorage.removeItem(PREFIX + 'session');
  }

  return {
    get, set, remove,
    getUsers, saveUsers, getUser, upsertUser,
    getGlobal, saveGlobal,
    getSession, setSession, clearSession
  };
})();

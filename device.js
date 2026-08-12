/**
 * BUB Device Recognition
 * Builds a stable fingerprint from available browser signals.
 * MAC addresses are intentionally unavailable from the browser.
 */

const Device = (() => {
  async function fingerprint() {
    const parts = [
      navigator.userAgent || '',
      navigator.platform || '',
      navigator.language || '',
      `${screen.width}x${screen.height}`,
      `${screen.colorDepth}`,
      new Date().getTimezoneOffset().toString(),
      navigator.hardwareConcurrency || '',
      (navigator.deviceMemory || '') + ''
    ];
    const raw = parts.join('|');
    const data = new TextEncoder().encode(raw);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function guessName() {
    const ua = (navigator.userAgent || '').toLowerCase();
    if (ua.includes('iphone')) return 'iPhone';
    if (ua.includes('ipad')) return 'iPad';
    if (ua.includes('android')) return 'Android Device';
    if (ua.includes('windows')) return 'Windows PC';
    if (ua.includes('macintosh') || ua.includes('mac os')) return 'Mac';
    if (ua.includes('linux')) return 'Linux';
    return (navigator.platform || 'Unknown') + ' Device';
  }

  async function recordForUser(username) {
    const user = Storage.getUser(username);
    if (!user) return;

    const fp = await fingerprint();
    const devices = Array.isArray(user.devices) ? [...user.devices] : [];
    const existing = devices.find(d => d.fingerprint === fp);
    const now = new Date().toISOString();

    if (existing) {
      existing.lastSeen = now;
      existing.userAgent = navigator.userAgent;
      existing.screen = `${screen.width}x${screen.height}`;
    } else {
      devices.push({
        fingerprint: fp,
        name: guessName(),
        platform: navigator.platform || 'unknown',
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language || '',
        userAgent: navigator.userAgent,
        firstSeen: now,
        lastSeen: now
      });
    }

    Storage.upsertUser(username, { devices });
    return devices;
  }

  function forgetDevice(username, fingerprint) {
    const user = Storage.getUser(username);
    if (!user) return;
    const devices = (user.devices || []).filter(d => d.fingerprint !== fingerprint);
    Storage.upsertUser(username, { devices });
  }

  return { fingerprint, guessName, recordForUser, forgetDevice };
})();

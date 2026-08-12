/**
 * BUB — Main application logic
 * Pure HTML/JS single-page experience
 */

(function () {
  // ---------- Toast ----------
  function toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `
      <span class="flex-1 text-sm font-medium">${escapeHtml(message)}</span>
      <button class=" text-lg leading-none">&times;</button>
    `;
    el.querySelector('button').onclick = () => el.remove();
    container.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(1.5rem)';
      el.style.transition = 'all 0.3s';
      setTimeout(() => el.remove(), 300);
    }, 4500);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ---------- Background / Theme ----------
  function applyBackground(user) {
    const global = Storage.getGlobal();
    let bg = global.background || '';

    if (user) {
      if (user.backgroundType === 'image' && user.backgroundValue) {
        document.body.style.background = `url('${user.backgroundValue}') center/cover fixed`;
        return;
      }
      if ((user.backgroundType === 'color' || user.backgroundType === 'gradient') && user.backgroundValue) {
        document.body.style.background = user.backgroundValue;
        return;
      }
    }
    document.body.style.background = bg || '#020617';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      // light overrides could be added later
    } else {
      root.classList.add('dark');
    }
  }

  // ---------- View switching ----------
  function showView(name) {
    document.getElementById('view-login').classList.toggle('hidden', name !== 'login');
    document.getElementById('view-app').classList.toggle('hidden', name !== 'app');
  }

  function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    const el = document.getElementById('page-' + page);
    if (el) {
      el.classList.remove('hidden');
      el.classList.add('page-enter');
    }
    // nav active state
    document.querySelectorAll('[data-nav]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.nav === page);
    });
  }

  function showSettingsSub(sub) {
    document.getElementById('settings-menu').classList.toggle('hidden', !!sub);
    ['appearance', 'account', 'devices', 'security'].forEach(s => {
      const el = document.getElementById('settings-' + s);
      if (el) el.classList.toggle('hidden', s !== sub);
    });
  }

  // ---------- Render helpers ----------
  function renderDashboard() {
    const user = Auth.currentUser();
    if (!user) return;

    document.getElementById('dash-username').textContent = user.username;
    document.getElementById('dash-account').textContent = user.username;
    document.getElementById('dash-theme').textContent = user.theme || 'dark';
    document.getElementById('dash-devices').textContent = (user.devices || []).length;

    const badges = document.getElementById('dash-badges');
    badges.innerHTML = '';
    if (user.isAdmin) badges.innerHTML += '<span class="badge badge-admin">Admin</span>';
    badges.innerHTML += '<span class="badge badge-active">Active</span>';

    document.getElementById('dash-admin-btn').classList.toggle('hidden', !user.isAdmin);
    document.getElementById('admin-nav-section').classList.toggle('hidden', !user.isAdmin);
  }

  function renderSettingsMenu() {
    const user = Auth.currentUser();
    const count = (user?.devices || []).length;
    document.getElementById('settings-device-count').textContent =
      `${count} known device${count === 1 ? '' : 's'}`;
  }

  function renderAppearance() {
    const user = Auth.currentUser();
    if (!user) return;
    document.getElementById('bg-type').value = user.backgroundType || 'none';
    document.getElementById('bg-value').value = user.backgroundValue || '';
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === (user.theme || 'dark'));
    });
  }

  function renderDevices() {
    const user = Auth.currentUser();
    const list = document.getElementById('devices-list');
    const devices = user?.devices || [];

    if (devices.length === 0) {
      list.innerHTML = `<div class="card p-10 text-center text-slate-400">No devices recorded yet.</div>`;
      return;
    }

    list.innerHTML = devices
      .sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen))
      .map(d => `
        <div class="card p-5 flex justify-between gap-4" style="flex-wrap:wrap;align-items:center">
          <div>
            <div class="font-medium text-white">${escapeHtml(d.name)}</div>
            <div class="text-sm text-slate-400 mt-0-5">${escapeHtml(d.platform)} · ${escapeHtml(d.screen)}</div>
            <div class="text-xs text-slate-500 mt-1">
              First seen ${formatDate(d.firstSeen)} · Last active ${formatDate(d.lastSeen)}
            </div>
          </div>
          <button class="btn btn-ghost text-red-400 text-sm forget-device" data-fp="${d.fingerprint}">Forget</button>
        </div>
      `).join('');

    list.querySelectorAll('.forget-device').forEach(btn => {
      btn.onclick = () => {
        if (!confirm('Remove this device from your account?')) return;
        Device.forgetDevice(user.username, btn.dataset.fp);
        toast('Device removed', 'success');
        renderDevices();
        renderDashboard();
      };
    });
  }

  function renderSecurity() {
    const user = Auth.currentUser();
    if (!user) return;
    document.getElementById('security-info').innerHTML = `
      <div class="flex justify-between"><dt class="text-slate-400">Username</dt><dd class="text-white font-medium">${escapeHtml(user.username)}</dd></div>
      <div class="flex justify-between"><dt class="text-slate-400">Role</dt><dd>${user.isAdmin ? '<span class="badge badge-admin">Admin</span>' : '<span class="badge badge-active">User</span>'}</dd></div>
      <div class="flex justify-between"><dt class="text-slate-400">Member since</dt><dd class="text-white">${formatDate(user.createdAt)}</dd></div>
      <div class="flex justify-between"><dt class="text-slate-400">Last login</dt><dd class="text-white">${formatDate(user.lastLogin)}</dd></div>
    `;
  }

  function renderAdmin() {
    const users = Storage.getUsers();
    const userList = Object.values(users);
    const allDevices = userList.flatMap(u => (u.devices || []).map(d => ({ ...d, owner: u.username })));

    // Stats
    document.getElementById('admin-stats').innerHTML = `
      <div class="card p-5"><div class="text-sm text-slate-400">Users</div><div class="text-3xl font-bold text-white mt-1">${userList.length}</div></div>
      <div class="card p-5"><div class="text-sm text-slate-400">Active</div><div class="text-3xl font-bold text-emerald-400 mt-1">${userList.filter(u => u.isActive).length}</div></div>
      <div class="card p-5"><div class="text-sm text-slate-400">Admins</div><div class="text-3xl font-bold text-indigo-400 mt-1">${userList.filter(u => u.isAdmin).length}</div></div>
      <div class="card p-5"><div class="text-sm text-slate-400">Devices</div><div class="text-3xl font-bold text-amber-400 mt-1">${allDevices.length}</div></div>
    `;

    // Users
    document.getElementById('admin-users-list').innerHTML = userList
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(u => `
        <div class="list-row">
          <div>
            <span class="text-white font-medium">${escapeHtml(u.username)}</span>
            ${u.isAdmin ? '<span class="badge badge-admin ml-2">Admin</span>' : ''}
            ${!u.isActive ? '<span class="badge badge-inactive ml-2">Disabled</span>' : ''}
          </div>
          <div class="flex gap-2">
            ${u.username !== Auth.currentUser().username ? `
              <button class="text-xs text-slate-400 hover-text-white toggle-active" data-user="${u.username}">${u.isActive ? 'Disable' : 'Enable'}</button>
              <button class="text-xs text-slate-400 hover-text-white toggle-admin" data-user="${u.username}">${u.isAdmin ? 'Revoke admin' : 'Make admin'}</button>
              <button class="text-xs text-red-400 hover-text-red delete-user" data-user="${u.username}">Delete</button>
            ` : '<span class="text-xs text-slate-500">You</span>'}
          </div>
        </div>
      `).join('') || '<p class="text-slate-500 text-sm">No users</p>';

    // Devices
    document.getElementById('admin-devices-list').innerHTML = allDevices
      .sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen))
      .slice(0, 8)
      .map(d => `
        <div class="list-row">
          <div>
            <span class="text-white font-medium">${escapeHtml(d.name)}</span>
            <span class="text-slate-500 ml-2">${escapeHtml(d.owner)}</span>
          </div>
          <span class="text-slate-500">${formatDate(d.lastSeen, true)}</span>
        </div>
      `).join('') || '<p class="text-slate-500 text-sm">No devices</p>';

    // Global form
    const global = Storage.getGlobal();
    document.getElementById('admin-app-name').value = global.appName || 'BUB';
    document.getElementById('admin-global-bg').value = global.background || '';
    document.getElementById('admin-allow-reg').checked = !!global.allowRegistration;

    // Wire actions
    document.querySelectorAll('.toggle-active').forEach(btn => {
      btn.onclick = () => {
        const u = Storage.getUser(btn.dataset.user);
        Storage.upsertUser(btn.dataset.user, { isActive: !u.isActive });
        toast(`User ${u.isActive ? 'disabled' : 'enabled'}`, 'success');
        renderAdmin();
      };
    });
    document.querySelectorAll('.toggle-admin').forEach(btn => {
      btn.onclick = () => {
        const u = Storage.getUser(btn.dataset.user);
        Storage.upsertUser(btn.dataset.user, { isAdmin: !u.isAdmin });
        toast(`Admin rights ${u.isAdmin ? 'revoked' : 'granted'}`, 'success');
        renderAdmin();
      };
    });
    document.querySelectorAll('.delete-user').forEach(btn => {
      btn.onclick = () => {
        if (!confirm(`Permanently delete “${btn.dataset.user}”?`)) return;
        const users = Storage.getUsers();
        delete users[btn.dataset.user];
        Storage.saveUsers(users);
        toast('User deleted', 'success');
        renderAdmin();
      };
    });
  }

  function formatDate(iso, short = false) {
    if (!iso) return '—';
    const d = new Date(iso);
    if (short) return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) + ' ' +
                     d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // ---------- Bootstrap after login ----------
  async function enterApp() {
    const user = Auth.currentUser();
    if (!user) {
      showView('login');
      return;
    }

    // Update chrome
    const global = Storage.getGlobal();
    document.getElementById('sidebar-app-name').textContent = global.appName;
    document.getElementById('mobile-app-name').textContent = global.appName;
    document.getElementById('sidebar-username').textContent = user.username;
    document.getElementById('login-app-name').textContent = global.appName;

    applyBackground(user);
    applyTheme(user.theme || 'dark');

    // Record device
    try {
      await Device.recordForUser(user.username);
    } catch (e) { /* non-critical */ }

    showView('app');
    showPage('dashboard');
    renderDashboard();
  }

  // ---------- Event listeners ----------
  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const remember = document.getElementById('login-remember').checked;
    const errEl = document.getElementById('login-error');
    errEl.classList.add('hidden');

    try {
      await Auth.login(username, password, remember);
      toast('Signed in successfully', 'success');
      await enterApp();
    } catch (err) {
      errEl.textContent = err.message;
      errEl.classList.remove('hidden');
    }
  });

  document.getElementById('btn-logout').addEventListener('click', () => {
    Auth.logout();
    showView('login');
    toast('Signed out', 'info');
  });
  document.getElementById('btn-logout-mobile').addEventListener('click', () => {
    Auth.logout();
    showView('login');
  });

  // Navigation
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.nav;
      if (page === 'admin' && !Auth.currentUser()?.isAdmin) return;
      showPage(page);
      if (page === 'dashboard') renderDashboard();
      if (page === 'settings') {
        showSettingsSub(null);
        renderSettingsMenu();
      }
      if (page === 'admin') renderAdmin();
    });
  });

  // Settings sub-navigation
  document.querySelectorAll('[data-sub]').forEach(btn => {
    btn.addEventListener('click', () => {
      const sub = btn.dataset.sub;
      showPage('settings');
      showSettingsSub(sub);
      if (sub === 'appearance') renderAppearance();
      if (sub === 'devices') renderDevices();
      if (sub === 'security') renderSecurity();
    });
  });

  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      showSettingsSub(null);
      renderSettingsMenu();
    });
  });

  // Theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      const user = Auth.currentUser();
      Storage.upsertUser(user.username, { theme });
      applyTheme(theme);
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === theme));
      toast('Theme updated', 'success');
    });
  });

  // Save appearance
  document.getElementById('btn-save-appearance').addEventListener('click', () => {
    const user = Auth.currentUser();
    const type = document.getElementById('bg-type').value;
    const value = document.getElementById('bg-value').value.trim();
    Storage.upsertUser(user.username, {
      backgroundType: type,
      backgroundValue: value
    });
    applyBackground(Storage.getUser(user.username));
    toast('Appearance saved', 'success');
  });

  // Password change
  document.getElementById('password-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const current = document.getElementById('pw-current').value;
    const next = document.getElementById('pw-new').value;
    const confirm = document.getElementById('pw-confirm').value;

    if (next !== confirm) {
      toast('New passwords do not match', 'error');
      return;
    }

    try {
      await Auth.changePassword(Auth.currentUser().username, current, next);
      document.getElementById('password-form').reset();
      toast('Password updated — it works immediately', 'success');
    } catch (err) {
      toast(err.message, 'error');
    }
  });

  // Admin global settings
  document.getElementById('btn-save-global').addEventListener('click', () => {
    Storage.saveGlobal({
      appName: document.getElementById('admin-app-name').value.trim() || 'BUB',
      background: document.getElementById('admin-global-bg').value.trim(),
      allowRegistration: document.getElementById('admin-allow-reg').checked
    });
    const global = Storage.getGlobal();
    document.getElementById('sidebar-app-name').textContent = global.appName;
    document.getElementById('mobile-app-name').textContent = global.appName;
    applyBackground(Auth.currentUser());
    toast('Global settings saved', 'success');
  });

  // Admin create user
  document.getElementById('admin-create-user').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const isAdmin = document.getElementById('new-is-admin').checked;
    try {
      await Auth.createUser(username, password, { isAdmin });
      document.getElementById('admin-create-user').reset();
      toast(`User “${username}” created`, 'success');
      renderAdmin();
    } catch (err) {
      toast(err.message, 'error');
    }
  });

  // ---------- Init ----------
  (async function init() {
    await Auth.ensureDefaultAdmin();

    if (Auth.isLoggedIn()) {
      await enterApp();
    } else {
      const global = Storage.getGlobal();
      document.getElementById('login-app-name').textContent = global.appName;
      applyBackground(null);
      showView('login');
    }
  })();
})();

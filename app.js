/* ============================================================
   BUB — Polished pure CSS
   ============================================================ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0b0f1a;
  --bg-elevated: #111827;
  --surface: rgba(17, 24, 39, 0.75);
  --surface-solid: #111827;
  --border: rgba(255, 255, 255, 0.06);
  --border-strong: rgba(255, 255, 255, 0.1);
  --text: #f1f5f9;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --primary: #6366f1;
  --primary-hover: #818cf8;
  --primary-soft: rgba(99, 102, 241, 0.15);
  --danger: #f87171;
  --success: #34d399;
  --radius: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --font: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.45);
}

html { height: 100%; scroll-behavior: smooth; }

body {
  min-height: 100%;
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-size: 15px;
}

/* Background mesh */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 20% -20%, rgba(99, 102, 241, 0.18), transparent),
    radial-gradient(ellipse 60% 40% at 90% 10%, rgba(139, 92, 246, 0.12), transparent),
    radial-gradient(ellipse 50% 30% at 50% 100%, rgba(59, 130, 246, 0.08), transparent);
  pointer-events: none;
  z-index: -1;
}

/* ---------- Utilities ---------- */
.hidden { display: none !important; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.w-full { width: 100%; }
.max-w-md { max-width: 26rem; }
.max-w-lg { max-width: 32rem; }
.max-w-2xl { max-width: 42rem; }
.max-w-6xl { max-width: 68rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.min-h-screen { min-height: 100vh; }
.flex-1 { flex: 1 1 0%; }
.overflow-auto { overflow: auto; }
.text-center { text-align: center; }
.text-left { text-align: left; }
.fixed { position: fixed; }
.top-4 { top: 1rem; }
.right-4 { right: 1rem; }
.z-50 { z-index: 50; }
.pointer-events-none { pointer-events: none; }
.cursor-pointer { cursor: pointer; }

.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-5 { padding: 1.25rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.p-10 { padding: 2.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.pt-4 { padding-top: 1rem; }
.pb-1 { padding-bottom: 0.25rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mt-14 { margin-top: 3.5rem; }
.ml-2 { margin-left: 0.5rem; }

.space-y-2 > * + * { margin-top: 0.5rem; }
.space-y-3 > * + * { margin-top: 0.75rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-5 > * + * { margin-top: 1.25rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }

.text-xs { font-size: 0.75rem; line-height: 1.1; }
.text-sm { font-size: 0.875rem; line-height: 1.35; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; letter-spacing: -0.02em; }
.text-3xl { font-size: 1.875rem; letter-spacing: -0.02em; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.tracking-tight { letter-spacing: -0.025em; }
.uppercase { text-transform: uppercase; }
.tracking-wider { letter-spacing: 0.06em; }
.capitalize { text-transform: capitalize; }

.text-white { color: #fff; }
.text-slate-200 { color: #e2e8f0; }
.text-slate-300 { color: #cbd5e1; }
.text-slate-400 { color: #94a3b8; }
.text-slate-500 { color: #64748b; }
.text-indigo-400 { color: #a5b4fc; }
.text-emerald-400 { color: #34d399; }
.text-amber-400 { color: #fbbf24; }
.text-rose-400 { color: #fb7185; }
.text-red-400 { color: #f87171; }

/* ---------- Cards ---------- */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

/* ---------- Inputs ---------- */
.input {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border-strong);
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
}
.input::placeholder { color: #64748b; }
.input:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(0, 0, 0, 0.45);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
}

select.input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
}

/* ---------- Buttons ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.15rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.9rem;
  font-family: inherit;
  transition: transform 0.12s, background 0.15s, box-shadow 0.15s, opacity 0.15s;
  cursor: pointer;
  border: none;
  text-decoration: none;
  white-space: nowrap;
}
.btn:active { transform: scale(0.97); }
.btn:disabled { opacity: 0.45; pointer-events: none; }

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}
.btn-primary:hover {
  background: linear-gradient(135deg, #818cf8, #6366f1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
  border: 1px solid var(--border-strong);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.15);
}

.btn-ghost {
  background: transparent;
  color: #94a3b8;
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
}

/* ---------- Navigation ---------- */
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.6rem 0.85rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #94a3b8;
  transition: color 0.15s, background 0.15s;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}
.nav-link:hover {
  color: #f1f5f9;
  background: rgba(255, 255, 255, 0.05);
}
.nav-link.active {
  color: #fff;
  background: var(--primary-soft);
  box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.25);
}
.nav-link svg { opacity: 0.85; }

.sidebar {
  width: 15.5rem;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  background: rgba(11, 15, 26, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: none;
  flex-direction: column;
}

/* ---------- Badges ---------- */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.15rem 0.55rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.badge-admin { background: rgba(99, 102, 241, 0.2); color: #a5b4fc; }
.badge-active { background: rgba(52, 211, 153, 0.15); color: #34d399; }
.badge-inactive { background: rgba(100, 116, 139, 0.2); color: #94a3b8; }

/* ---------- Theme buttons ---------- */
.theme-btn {
  border-radius: 12px;
  border: 1.5px solid var(--border-strong);
  padding: 1rem 0.75rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, transform 0.12s;
  color: inherit;
  font-family: inherit;
}
.theme-btn:hover { border-color: rgba(255,255,255,0.18); }
.theme-btn.active {
  border-color: var(--primary);
  background: var(--primary-soft);
}

/* ---------- Icon boxes ---------- */
.icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
}
.icon-box-lg {
  width: 3.75rem;
  height: 3.75rem;
  background: linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15));
  border: 1px solid rgba(99, 102, 241, 0.3);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}
.icon-box-sm {
  width: 2.15rem;
  height: 2.15rem;
  background: linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.2));
  border: 1px solid rgba(99, 102, 241, 0.35);
}
.icon-box-md {
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 12px;
}

.icon-indigo { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; }
.icon-emerald { background: rgba(52, 211, 153, 0.12); color: #34d399; }
.icon-amber { background: rgba(251, 191, 36, 0.12); color: #fbbf24; }
.icon-rose { background: rgba(251, 113, 133, 0.12); color: #fb7185; }

/* ---------- Grid ---------- */
.grid { display: grid; gap: 1rem; }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

.border-b { border-bottom: 1px solid var(--border); }
.border-t { border-top: 1px solid var(--border); }

/* ---------- Mobile bar ---------- */
.mobile-bar {
  display: flex;
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 40;
  background: rgba(11, 15, 26, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 1rem;
  align-items: center;
  justify-content: space-between;
}

/* ---------- Animation ---------- */
.page-enter {
  animation: fadeUp 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ---------- Toast ---------- */
.toast {
  pointer-events: auto;
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  border: 1px solid;
  backdrop-filter: blur(12px);
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(1.25rem); }
  to   { opacity: 1; transform: translateX(0); }
}
.toast-success { background: rgba(6, 78, 59, 0.92); border-color: rgba(52, 211, 153, 0.3); color: #d1fae5; }
.toast-error   { background: rgba(127, 29, 29, 0.92); border-color: rgba(248, 113, 113, 0.3); color: #fee2e2; }
.toast-info    { background: rgba(17, 24, 39, 0.95); border-color: var(--border-strong); color: #e2e8f0; }

/* ---------- Labels & checkboxes ---------- */
label.block {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 0.4rem;
  letter-spacing: 0.01em;
}

.check-row {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  cursor: pointer;
  user-select: none;
}
.check-row input[type="checkbox"] {
  width: 1.05rem;
  height: 1.05rem;
  accent-color: var(--primary);
  cursor: pointer;
}

/* ---------- SVG ---------- */
svg { display: block; flex-shrink: 0; }
.w-5 { width: 1.2rem; height: 1.2rem; }
.w-6 { width: 1.4rem; height: 1.4rem; }
.w-8 { width: 1.75rem; height: 1.75rem; }

.hover-border:hover { border-color: rgba(99, 102, 241, 0.35); }
.hover-text-white:hover { color: #fff; }
.hover-text-indigo:hover { color: #c7d2fe; }
.hover-text-red:hover { color: #fca5a5; }
.hover-bg-slate:hover { background: rgba(255, 255, 255, 0.06); }

/* ---------- List rows ---------- */
.list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--border);
}
.list-row:last-child { border-bottom: none; }

/* ---------- Settings cards as buttons ---------- */
button.card {
  font-family: inherit;
  color: inherit;
  transition: border-color 0.15s, transform 0.12s, background 0.15s;
}
button.card:hover {
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-1px);
}

/* ---------- Login polish ---------- */
#view-login .card {
  box-shadow: var(--shadow-lg);
  border-color: var(--border-strong);
}

/* ---------- Responsive ---------- */
@media (min-width: 640px) {
  .sm-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {
  .sidebar { display: flex; }
  .mobile-bar { display: none; }
  .md-mt-0 { margin-top: 0; }
  .md-p-8 { padding: 2rem; }
}

@media (min-width: 1024px) {
  .lg-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .lg-grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .lg-grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}

/* Scrollbar */
::-webkit-scrollbar { width: 7px; height: 7px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.4); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(100, 116, 139, 0.6); }

/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
button:focus:not(:focus-visible),
input:focus:not(:focus-visible) {
  outline: none;
}

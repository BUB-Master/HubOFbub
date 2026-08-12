# BUB — Pure HTML Website

Full rewrite as a **static HTML/CSS/JS** website.  
No backend, no Tailwind CDN, no external CSS frameworks.

## Features

- **Secure auth** — passwords hashed with PBKDF2 (Web Crypto), never plain text
- Login + Remember me + immediate password change
- **Admin panel** with dashboard, user management, device list, global settings
- **Settings** — appearance, password, devices, security
- **Device recognition** via browser fingerprint
- Modern dark UI with pure CSS

## How to use

1. Open `index.html` in any modern browser
2. Default admin:
   - Username: `admin`
   - Password: `admin123`  
   (change this immediately)

Everything is stored in the browser’s `localStorage`.

## Structure

```
bub/
├── index.html
├── css/app.css          ← pure CSS, no Tailwind
├── js/
│   ├── storage.js
│   ├── auth.js          ← PBKDF2 hashing
│   ├── device.js
│   └── app.js
└── README.md
```

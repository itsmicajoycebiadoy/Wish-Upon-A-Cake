# Wish Upon A Cake (Birthday App)

A fun, interactive birthday page built with React + Vite.

## Features

- **Wish flow**: sign in → extinguish candles → see the **Happy Birthday** greeting screen.
- **Animated cake & candles** (flicker + float animation while blowing/extinguishing).
- **Confetti** appears when all candles are blown out.
- **Generated birthday music** using the browser **Web Audio API** (no external audio files).
- **Music toggle button** (▶️/⏹) to play or stop the soundtrack.
- **Instruction chatbot** that explains how to use the app.

## How to use

1. Open the app.
2. **Sign in** (name + password stored locally in the browser for this version).
3. Click each **lit candle** to blow it out.
4. After all candles are out, the greeting appears and the **music stops**.
5. Use the bottom-right **music button** to play/stop the soundtrack anytime.

## Local multi-user login (demo)

This version stores users in `localStorage` under:

- `birthday_users_v1`
- `birthday_last_user_v1`

There is no real server authentication in this front-end-only demo.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal.


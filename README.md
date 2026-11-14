# TACTIX — Tic-Tac-Toe Arena

A sharp, two-player tic-tac-toe game built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Alternating local two-player turns on a 3×3 board.
- Win detection across rows, columns, and diagonals, plus draw detection.
- Live series scoreboard for wins and draws.
- Winning line highlighted in emerald with a confetti celebration.
- Result card announces the winner or draw, then automatically advances the round.
- Infinity mode: a player's fourth mark retires their oldest mark so the board never fills.
- Mobile-first responsive layout with a desktop side panel for rules and controls.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Structure

```
app/
  globals.css       Tailwind theme, paper grid background, animations
  layout.tsx        Root layout and metadata
  page.tsx          Game state, round flow, and confetti
  icon.svg          App icon
components/
  Board.tsx         3×3 grid
  Square.tsx        Cell, mark rendering, hover preview
  ScoreBoard.tsx    Series wins and draws
  Controls.tsx      Reset series and Infinity mode
  InfoPanel.tsx     Description, how to play, feature guide
  ResultModal.tsx   Round result card with auto-advance
utils/
  gameLogic.ts      Win/draw detection and infinity rule
```

Scores and the active series live in memory for the current session.

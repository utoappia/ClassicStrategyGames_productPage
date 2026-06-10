# Classic Strategy Games — Product Landing Page

The marketing site and replay viewer for the **Classic Strategy Games** mobile app
(12 classic board games with on-device AI). Static HTML/CSS/JS — no build step,
hosted on GitHub Pages.

## Pages

- **index.html** — Landing page: hero, the 12-game grid, features, pricing (Free vs Pro), and download.
- **history.html** — Replay viewer. Opens a replay link shared from the app
  (`history.html#replay=<code>`) or a pasted replay code, and shows the match
  summary (game, players, move count). Decodes the app's replay format in pure
  JS, including the FNV-1a integrity check.
- **styles.css** — Shared styling, responsive, automatic dark mode.

## How the replay link works

The mobile app's replay screen has a **Share replay link** button. It builds a URL:

```
https://utoappia.github.io/ClassicStrategyGames_productPage/history.html#replay=<base64url-blob>
```

The blob is the same compact, checksummed replay format the app stores. `history.html`
decodes the header (version · game · player count · move count) to render a summary
card. Full move-by-move playback lives in the app.

> Keep `REPLAY_GAMES` in `history.html` in sync with
> `packages/core/src/replay/codec.ts` — it's an append-only table, so only ever
> add to the end.

## Deploy (GitHub Pages)

1. Push to the repo's `main` branch.
2. **Settings → Pages → Source: Deploy from a branch → main → / (root) → Save.**
3. Live at `https://utoappia.github.io/ClassicStrategyGames_productPage/`.

## To finish before launch

- Swap the placeholder store links (`#`) for the real App Store / Google Play URLs.
- Drop real app screenshots into the hero phone mockup (currently a CSS recreation
  of the in-app game list).
- Optional: full board playback in the web viewer (needs each game's rules in JS).

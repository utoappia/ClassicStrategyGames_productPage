# Classic Strategy Games — Product Landing Page

The marketing site and replay viewer for the **Classic Strategy Games** mobile app
(12 classic board games with on-device AI). Hosted on GitHub Pages.

## Pages

- **index.html** — Landing page: hero, the 12-game grid, features, pricing (Free vs Pro), and download.
- **replay.html** — Replay viewer. Opens a replay link shared from the app
  (`replay.html#replay=<code>`) and plays the match back **move by move** on the
  real board, with play/pause/step controls. With no link present it shows how to
  share a replay from the app (there's no raw-code paste box — nobody hand-copies
  codes).
- **history.html** — Redirect stub → `replay.html` (preserves the `#replay=`
  fragment), so previously shared links keep working.
- **replay/replay.js** — The viewer's engine: the app's `ReplayScreen` and all 12
  board components, bundled from source (see below). `replay.html` mounts it.
- **styles.css** — Shared styling, responsive, automatic dark mode.
- **.nojekyll** — Serve files as-is (no Jekyll processing).

## How the replay link works

The mobile app's replay screen has a **🔗 Share replay link** button. It builds:

```
https://utoappia.github.io/ClassicStrategyGames_productPage/replay.html#replay=<base64url-blob>
```

The blob is the same compact, checksummed replay format the app stores. `replay.js`
decodes it and replays the moves through each game's real rules, rendering the
actual board — so the web playback matches the app exactly.

## Rebuilding `replay/replay.js`

The bundle is built from the monorepo (it imports `@miniboardgames/ui-react` and
`@miniboardgames/core` from source):

```
cd apps/web && npx vite build --config vite.replay.config.ts
```

It writes straight into `productPage/replay/replay.js`. Entry: `apps/web/src/replayEmbed.tsx`.

> React and ReactDOM must be the **same version** in the bundle (the monorepo root
> pins this via an `overrides` on `react-dom`); a mismatch throws React error #527
> at runtime.

## Deploy (GitHub Pages)

1. Push to the repo's `main` branch.
2. **Settings → Pages → Source: Deploy from a branch → main → / (root) → Save.**
3. Live at `https://utoappia.github.io/ClassicStrategyGames_productPage/`.

## To finish before launch

- Swap the placeholder store links (`#`) for the real App Store / Google Play URLs.
- Drop real app screenshots into the hero phone mockup (currently a CSS recreation
  of the in-app game list).

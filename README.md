# Classic Strategy Games - Product Landing Page

A beautiful, responsive landing page for the Classic Strategy Games mobile app. Includes a game history viewer where users can upload and review their saved games.

## Features

- **Responsive Design** — Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support** — Automatically adapts to system preferences
- **Game History Viewer** — Upload exported game history files to view replays
- **Download Links** — Direct links to App Store and Google Play
- **Feature Showcase** — Highlights key game features and mechanics
- **Pricing Info** — Clear Free vs Pro comparison

## Pages

- **index.html** — Main landing page with hero, features, pricing, and download sections
- **history.html** — Game history viewer with upload and replay functionality
- **styles.css** — Shared styling for both pages

## Setup on GitHub Pages

### Option 1: Using your repo's main branch (Recommended)

1. Push these files to your GitHub repository
2. Go to **Settings → Pages**
3. Select **Source: Deploy from a branch**
4. Choose **Branch: main** and **Folder: / (root)**
5. Click **Save**
6. Your site will be live at `https://yourusername.github.io/mini-board-games-web/`

### Option 2: Using a docs folder

1. Create a `docs/` folder and move all files there
2. Push to GitHub
3. In **Settings → Pages**, select **Folder: /docs**
4. Same URL as above

## Customization

### Update App Links

In both `index.html` and `history.html`, replace:
- `https://apps.apple.com/` with your actual App Store link
- `https://play.google.com/` with your actual Google Play link
- `support@example.com` with your actual email

### Colors

Edit the CSS variables at the top of `styles.css`:
```css
:root {
  --primary: #3b82f6;      /* Main brand color */
  --secondary: #6366f1;    /* Accent color */
  --accent: #ec4899;       /* Highlight color */
}
```

### Game History Feature

The history viewer:
- Accepts exported history JSON files from the app
- Displays all saved games with results and timestamps
- Shows replay viewer UI (currently displays message to view in app)
- Fully responsive and dark mode compatible

To integrate actual replay playback:
1. Export game history from the mobile app (implement export feature)
2. Parse the replay data structure
3. Render the board state using Canvas or SVG
4. Add move stepping controls

## Dark Mode

The site automatically respects system dark mode preference via `prefers-color-scheme` media query. No user toggle needed—it adapts automatically.

## Mobile Friendly

All sections are optimized for mobile:
- Touch-friendly tap targets (min 44x44px)
- Responsive grid layouts
- Readable font sizes
- Proper spacing for thumb navigation

## SEO

Add your own `<meta>` tags for better search visibility:
```html
<meta name="description" content="Play 13 classic board games with AI">
<meta name="keywords" content="board games, strategy games, chess, go, checkers">
<meta property="og:title" content="Classic Strategy Games">
<meta property="og:image" content="path/to/screenshot.png">
```

## Next Steps

1. Add actual app screenshots to the hero section
2. Replace placeholder download links with real App Store/Play Store URLs
3. Implement game history export in the mobile app
4. Add more detailed game descriptions
5. Set up a contact form or email link
6. Add social media links in footer

---

Built with HTML, CSS, and vanilla JavaScript. No frameworks or build tools needed!

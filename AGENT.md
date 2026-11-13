# AGENT.md — El Farm Cafe and Restaurant (Framer Uncage Transform)

## 1. Project Overview
- **Client / Brand**: **El Farm Cafe and Restaurant** (`EL FARM CAFÉ & RESTO`)
- **Tagline**: *"Escape the ordinary"*
- **Address**: Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan, Philippines
- **Phone / Reservations**: `0917 182 9876`
- **Email**: `ligaya_gabriel@live.com.ph`
- **Opening Hours**: Open Daily · `9:00 AM – 9:00 PM` (Dine-In, Advance Pre-Order & Lamitan Delivery +₱100)
- **Official Facebook**: `https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/`
- **Base Framer Template**: Cloned across all 5 routes (`/`, `/about`, `/menu`, `/blog`, `/contact`) from `https://monkscrave.framer.website/` via `ZE-Uncage` (`framer-uncage-transform` zero-code-drift pipeline).

## 2. Architecture & Key Scripts
- **5 Dedicated Framer HTML Pages (`index.html`, `about.html`, `menu.html`, `blog.html`, `contact.html`)**:
  - Root static Framer entry points served locally by `scripts/serve_framer.cjs` on **`http://localhost:5173/`** (with HTTP `206 Partial Content` Range streaming for `.mp4` video and enterprise security headers) and configured for production deployment via **`vercel.json`**.
  - Preserves 100% of Framer's original layout, animations, fonts (`Cormorant Garamond`, `Jost`), and dark/gold color palette (`#0B1315`, `#0F1D22`, `#EFC9A4`).
- **Full-Screen Landing Page Intro Animation Video (`#elfarm-intro-overlay` & `./assets/video/intro.mp4`)**:
  - Updated to `gemini_generated_video_d4afaf6d.mp4` (`4.66 MB`, `10.03s` duration) in `assets/video/intro.mp4`.
  - **Desktop / Laptop Only**: Runs **once per browser tab session** on PC/laptop browsers via synchronous `<script id="elfarm-intro-boot">` + `sessionStorage.getItem('elfarm_intro_played')`; **mobile, tablet, and touch devices** (`width < 1024px`, mobile/tablet UA, or coarse touch pointer `<= 1280px`) skip both the overlay and `intro.mp4` download (`data-src` lazy binding) and load directly into the main site.
  - Refreshing (`F5`) inside the same desktop tab skips the intro cleanly, while opening a **new desktop tab** or **different browser** replays the intro once.
  - While active, `<html class="elfarm-intro-lock">` locks all scrollbars (`overflow: hidden !important; scrollbar-width: none !important`) and plays `#elfarm-intro-video` across the full viewport (`100vw × 100vh`, `object-fit: cover`).
  - Once finished (`ended` event), `#main` transitions smoothly from dark (`#070d0f`, `opacity: 0`) to light (`opacity: 1`), triggers deferred Framer appear effects + [`replayHeroEntranceAnimations`](scripts/transform_monkscrave_content.cjs) for the **3 circular Hero dishes** (`.framer-1j6fcxm`, `.framer-71xvpi`, `.framer-1qgz169`), floating leaves, and Hero copy with resting `opacity: 1`.
- **Top Navbar Hover & Plate Micro-Interactions**:
  - Added golden underline sweep (`::after`), warm pill halo glow, and subtle lift on desktop header links (`header nav a`), shimmer sweep on `VIEW MENU`, and tactile hover zoom on the 3 Hero circular food plates.
- **Interactive Location Mini-Map (`#elfarm-minimap-section`)**:
  - Automatically injected into the `Contact Section` across the site (`index.html`, `about.html`, `menu.html`, `contact.html`), displaying the embedded Google Map for **El Farm Cafe and Restaurant, Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan**, address, opening hours (`9:00 AM – 9:00 PM`), phone (`0917 182 9876`), and **"GET DIRECTIONS ON GOOGLE MAPS"** CTA button.
- **`scripts/generate_uhd_assets.cjs` & `scripts/build_seo_and_page_assets.cjs`**:
  - Uses `sharp` (`Lanczos3` + unsharp masking + radial mask cleanup) to generate:
    - Official circular logo icons: `favicon.ico` (64×64 ICO), `assets/images/favicon-32x32.png`, `assets/images/favicon-192x192.png`, and `assets/images/apple-touch-icon.png`.
    - Social OpenGraph & Twitter preview banner (`1200×630`): `assets/images/og-cover-elfarm.jpg`.
    - Clean vector-framed Navbar (`88×64`, `assets/images/9EbxgnnItr5IyHLUac9iSjrocis-64b569cd.svg`) and Footer (`150×112`, `assets/images/BclDGK0X1lf3PSEPNLrO280vsA-8e0fe687.svg`) brand logos.
    - 16 Ultra-HD `1200×1600` (`3:4`) customer photos (`assets/images/customer-hd-1.webp` through `customer-hd-16.webp`) for Framer's native `Social Ticker`.
    - Precision Ultra-HD dish crops (`assets/menu/crop-*.jpg`) and replaced stock images across `/`, `/about`, `/menu`, `/blog`, and `/contact`.
- **`scripts/transform_monkscrave_content.cjs`**:
  - Restores clean `.framercms` binary files and transforms all `.js`/`.mjs` bundles in `assets/js/` (stripping `sourceMappingURL` comments, disabling Framer's `EditorBar` CORS call to `edit.framer.com/init.mjs`, and stripping Framer's `script-81ba3be1.js` `/anonymous` telemetry beacon).
  - Removes the floating `"Free 3 Month on Pro plan GIFT VOUCHER"` component (`.framer-1r0dvt3-container`) and `"Made in Framer"` badge (`#__framer-badge-container`).
  - Upgrades `chunk-PGQRPBE7-7abaf9d4.js` and `chunk-PGQRPBE7.mjs` (`Social Ticker`) so `slots:[...]` natively renders all **16 Ultra-HD customer photos** edge-to-edge (`100vw`, `gap: 0px`, `loading: "eager"`, `48` total loop items across 3 seamless sets).
  - Generates the base64-encoded & anti-inspection protected `assets/js/elfarm-enhance.js` bundle (`contextmenu` protection, image/video drag prevention, DevTools shortcut deterrence, and security console warning).
  - Menu layout matches `https://monkscrave.framer.website/` and `https://monkscrave.framer.website/menu`:
    - **Home Page (`/`, `index.html`)**: **1 single line of menu (3 signature cards: `Golden Crispy Pata`, `Seafood Feast Bilao`, `Coconut Matcha Cloud`)** inside `.framer-w91vbs` with no category tabs; clicking `VIEW ALL MENU` navigates to `/menu.html`.
    - **Menu Page (`/menu`, `menu.html`)**: **5-tab horizontal selection bar** (`.framer-1bh56fl`: `ALL MENU`, `BEVERAGES / DRINKS`, `DESSERTS`, `MAIN COURSES`, `APPETIZERS`), **2 lines of menu (6 cards)** initially + **`LOAD MORE MENU`** button, and clicking **`LOAD MORE MENU`** adds the **3rd and last line (9 cards total)** and hides the button.
  - Generates `vercel.json` (`framework: null`, `buildCommand: null`, `outputDirectory: "."`, security headers & clean URLs), `robots.txt`, and `sitemap.xml`.

## 3. Deployment & Source Control
- **GitHub Repository**: `https://github.com/ZETIC7Z/el-farm-cafe-and-restaurant` (`main`)
- **Production Website**: `https://el-farm-official.vercel.app/`

## 4. Developer Attribution Standard
- Centered at the bottom of the footer (`#zeticuz-attribution-bar` appended after `#main` on all 5 pages):
  - `[zeticuz-logo.svg] SITE DEVELOPED BY: Sam Pangilinan · © 2026`
  - Interactive button opening `https://www.zeticuz.xyz/` in a new tab without displaying the raw URL string.

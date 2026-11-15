# El Farm Cafe and Restaurant (`EL FARM CAFÉ & RESTO`)

**Last Updated:** November 16, 2026 (`2026-11-16`)  
**Location:** Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan, Philippines  
**Hours:** Open Daily · 9:00 AM – 9:00 PM (Dine-In, Advance Pre-Order, Floodlit Night Pickleball Court & Lamitan City Delivery `+₱100`)  
**Contact:** `0917 182 9876` | `ligaya_gabriel@live.com.ph` | [Official Facebook Page](https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/)

---

## 🌿 Overview

**El Farm Cafe and Restaurant (`EL FARM CAFÉ & RESTO`)** — *"Where Farm Charm Meets Culinary Bliss"* / *"Escape the Ordinary"* / *"Malayo man kami, sulit naman ang dayo!"* — is a full-stack production web experience crafted for Basilan's premier farm café, heirloom kitchen, and floodlit night pickleball sanctuary in Sitio Nipa, Lamitan City.

---

## ✨ New Features Added (November 16, 2026 Update)

### 1. 1:1 `palazzo.framer.website` Responsive Hero Fit, Table Physics, Controls & Entrance Choreography
- **Exact Palazzo Viewport-Proportional Table Geometry (`Gt` & `Ut`)**:
  - **100% Above-the-Fold Fullscreen Fit (`100vh` / `100dvh`)**: At any desktop/laptop/ultrawide resolution (`1280×800`, `1366×660`, `1536×740`, `1920×920+`) and mobile (`390×844`), the full Hero section (transparent navigation, responsive `clamp()` Hero heading & copy, `BOOK YOUR TABLE` CTA, `4.8/5` rating, swapped `"Drag or scroll the table to turn it"` control on the left + live `DISH XX / 21` badge on the right, and the full revolving table) fits completely inside the initial screen without vertical clipping, dark sidebars, or element overlap — scrolling once jumps directly into Section 2 (`WHY CHOOSE US`).
  - **Dynamic Desktop & Mobile Formulas**: Desktop (`>= 810px`) scales the walnut disc to `1.40 × vh`, orbit `0.3326 × tableSize`, plate diameter `0.2189 × tableSize`, text-guarded X-center, and `180°` (9-o'clock) focal spotlight (`1.26x`); Mobile (`<= 809px`) scales `tableSize = 1.96 × min(vw, vh * 0.5)` centered horizontally at `cy = vh - 0.133 × e` with `+90°` offset so the `1.26x` focal dish sits cleanly at `12-o'clock` below the header/Hero copy.
- **Original Palazzo Entrance Choreography (`2.4s` + Staggered Plates)**:
  - Outer table slides & sweeps in (`translateX(22%) rotate(-35deg)` desktop / `translateY(16%) rotate(-35deg)` mobile -> resting position over `2.4s cubic-bezier(0.22, 1, 0.36, 1)`) paired with per-plate staggered entrance (`scale(1.12) -> 1`, `opacity: 0 -> 1`, `delay: 0.5s + idx * 0.11s`) and initial `45° -> 0°` spring spin, plus the overhead warm studio sheen & rim vignette overlay (`.elfarm-palazzo-table-sheen`).
- **Full Mouse Click, Drag, Wheel Scroll & Keyboard Control (`pointer-events` Fixed)**:
  - **Click Any Outer Plate**: Clicking any orbiting dish smoothly spins that exact plate into the `1.26x` spotlight; clicking the focal plate or wood disc advances to the next course.
  - **Pointer Drag + Coasting + Spring Snap**: Grab and spin anywhere on the walnut table with inertia decay and `stiffness=120 / damping=18` snapping.
  - **Mouse Wheel / Trackpad Spin Over Table**: Scrolling the wheel/trackpad directly over the table disc turns the courses (`step = 45°`), while scrolling on the left Hero area scrolls the page normally.
  - **Keyboard Support**: `ArrowLeft` / `ArrowRight` turn the table while Hero is in view.
- **High-Visibility Focal Plate Steam (`420×420`)**: Boosted rising organic steam wisps (`screen`-blended multi-wisp gradient layers) directly over the `1.26x` spotlight plate.
- **Crisp Gold `EL` Multi-Size Tab Favicon (`favicon.ico?v=2`)**: Tight-cropped gold calligraphy `EL` + branch logo generated across `16×16` to `192×192` ICO/PNG + `apple-touch-icon` (`180×180`), with legacy Framer icon links stripped so the new gold logo renders crisply in every browser tab.

### 2. Transparent Top Header & Aomi Misty Hills Hero Video Backdrop
- **Full-Bleed Misty Hills Video (`assets/video/hero-nature-bg.mp4`)**: Seamless looping nature backdrop (`opacity: 0.94`, `saturate(1.18)`) extending from the very top edge (`y = 0`) behind the transparent navigation bar (`Home`, `About`, `Blog`, `Contact us`, `VIEW MENU`).
- **Instant Page Open**: Removed the blocking intro splash overlay on `index.html` so visitors immediately see the live Hero section, revolving walnut table, and misty hills video upon opening the site.

### 3. Complete 49/49 Studio Menu Photography, 5-Circle Coverflow & Overhead Table Dishes (`/menu`)
- **100% Upgraded Studio Photography (`49/49` Items)**: Every signature drink (`Dirty Coffee`, `Coconut Matcha Cloud`, `S'mores Smoothie`, `Dubai Chewy Cookie Smoothie`, `EL Farm Popcorn Latte`), Silog, Non-Pork Special (`Festive Chicken Kaliya`, `Native Chicken Tinola`, `Crispy Kare-Kareng Hito`, `Adobing`, `Sizzling Chicken Sisig`, `Sizzling Bangus Sisig`), Pork Favorite, Dessert, and Salu-Salo Bilao across `/menu`, the Homepage 5-Circle Coverflow, and **21 studio overhead table dishes** (`AI_VERIFIED_PLATED_IDS`) uses unified `studio-*.jpg` photography.
- **49 Authentic El Farm Dishes & Drinks**:
  - **Signature Coffee (9)** · **Matcha, Hojicha, Smoothies & Yoghurt (10)** · **Everyday Silogs, Goto & Wraps (6)** · **Non-Pork Heritage Specials (9)** · **Pork Favorites (3)** · **Snacks & Native Delicacies (6)** · **Salu-Salo Bilao Feasts (6)**.
- **Homepage 5-Circle Coverflow Showcase (`CodePen xxmpvqe`)**: Full-bleed (`100vw`) 5-circle Swiper coverflow with enlarged center dish (`1.14x`), hover pause with golden ambient glow orb, and immediate advance on pointer leave.
- **`/menu` 3D Tilt Cards & Interactive Lightbox (`CodePen PwbGLmL`)**: 3D perspective pointer tilt, category filter tabs, and a full-screen dish inspection lightbox with keyboard (`ArrowLeft`, `ArrowRight`, `Escape`) and touch-swipe navigation.

### 4. Adaptive Multi-Bitrate Video Engine
- **Smart Stream Switching (`initAdaptiveHeroVideo`)**: Automatically selects between `4K Master`, `1080p Full HD` (`-movflags +faststart`), `720p HD`, and `480p SD` tiers based on real-time network bandwidth (`navigator.connection`) and buffer health.

### 5. Live Table Reservations (`Google Sheets + Instant Email Alerts`) & Sora-Style Animated Dark Map
- **Real-Time Booking Pipeline (`POST /api/bookings`)**: Stores reservations locally (`bookings.json` / `bookings.csv`), appends rows live to the **EL Farm Bookings Google Sheet**, and sends instant email notifications. All reservation inputs (including `Phone*`) open clean without pre-filled example numbers.
- **Sora-Style Animated Sanctuary Map (`Sitio Nipa, Maloong Canal, Lamitan`)**: Replaced the static Google Maps iframe with a bespoke dark obsidian animated vector map featuring road lines, tilted typography, coastal `Maloong Canal` cove graphics, pulsing `#f4161c` radar waves, an animated teardrop location pin (`6.6582° N, 122.1457° E`), and a floating address card linking straight to Google Maps directions (`0917 182 9876`).

### 6. Live Customer Facebook Moments Slider
- **Hover-to-Pause Ticker & Social Overlays**: Displays real customer moments from the official El Farm Facebook page with post captions, dates, and engagement metrics (`Likes`, `Comments`, `Shares`).

### 7. Zero-Error DevTools Console & Accessibility Optimization
- **Zero React Hydration Errors (`#418` / `#422` Fixed)**: Clean SSR-to-client hydration handoff with `0` console errors and `0` warnings.
- **100% Form Autocomplete Compliance**: Every `<input>`, `<select>`, and `<textarea>` across all 6 pages includes explicit semantic `autocomplete` attributes (`given-name`, `family-name`, `email`, `tel`, `off`).

### 8. Download App Hub (`/download`), Android APK, Offline QR Codes & Edge-to-Edge iOS/Cross-Browser PWA
- **Header Navigation Integration (`Download App`)**: Added `Download App` right next to `Blog` across desktop, mobile drawer, and footer links routing to `/download` (`download.html`).
- **Official Android APK Auto-Download (`el_farm_cafe.apk`, 9.97 MB)**: Served from `/assets/downloads/el-farm-cafe.apk` with explicit `Content-Disposition: attachment; filename="El-Farm-Cafe-and-Resto.apk"` headers on both local Node server and Vercel (`vercel.json`), plus automatic APK triggering on Android phones via QR scan (`?platform=android&auto=1` or `?auto=1`).
- **Scannable Offline QR Cards (`qrcode.min.js`)**: Side-by-side mint pill `Download` buttons paired with sharp client-rendered `<canvas>` QR codes for **Scan to Install (OS Auto-Detect)**, **Android App (Direct APK)**, and **iOS & Web App (Fullscreen PWA)**.
- **Latest Edge-to-Edge Cross-Browser PWA (`manifest.webmanifest?v=3` + `sw.js` v4)**: Full notch-to-home-bar standalone mode (`viewport-fit=cover`, `apple-mobile-web-app-capable="yes"`, `black-translucent` status bar, `180×180` + `192×192` + `512×512` standard/maskable gold `EL` icons, native Chromium `beforeinstallprompt` install hook, and a 3-step Safari `"Add to Home Screen"` installation modal).
- **Smart Mobile Pinch-Zoom Lock vs `"View Desktop Site"` Zoom Unlock**: Disables pinch-to-zoom, multi-touch gesture zooming, and double-tap zoom inside normal mobile/tablet tabs (`elfarm-zoom-locked`), automatically unlocking multi-scale zoom (`user-scalable=yes`, `max-scale=5.0`) ONLY when the user turns on **View Desktop Site** / **Request Desktop Website** (and locking again when turned off).

---

## 🚀 Quick Start & Build Commands

```bash
# 1. Rebuild all 5 production HTML pages & protected runtime bundle
node scripts/transform_monkscrave_content.cjs

# 2. Start the local full-stack production server (http://localhost:5173)
node scripts/serve_framer.cjs
```

---

## 👨‍💻 Developer Attribution

**SITE DEVELOPED BY:** [Sam Pangilinan (ZETICUZ)](https://www.zeticuz.xyz/) · © 2026

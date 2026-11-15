# AGENT.md — El Farm Cafe and Restaurant (`EL FARM CAFÉ & RESTO`)

## 1. Project Overview & Architecture
- **Brand**: **El Farm Cafe and Restaurant** (`EL FARM CAFÉ & RESTO` — *"Escape the Ordinary"* / *"Where Farm Charm Meets Culinary Bliss"* / *"Malayo man kami, sulit naman ang dayo!"*)
- **Location**: Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan, Philippines
- **Hours**: Open Daily · 9:00 AM – 9:00 PM (Dine-In, Advance Pre-Order, Floodlit Night Pickleball Court & Lamitan City Delivery `+₱100`)
- **Contact**: `0917 182 9876` | `ligaya_gabriel@live.com.ph` | [Facebook Page](https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/)
- **Architecture**:
  - 5-Page Cloned & Enhanced Framer Production Build (`index.html`, `about.html`, `menu.html`, `blog.html`, `contact.html`) powered by [transform_monkscrave_content.cjs](file:///c:/Users/ZETICUZ/Music/El%20Farm%20Cafe%20and%20Restaurant/scripts/transform_monkscrave_content.cjs) and [serve_framer.cjs](file:///c:/Users/ZETICUZ/Music/El%20Farm%20Cafe%20and%20Restaurant/scripts/serve_framer.cjs).
  - Protected runtime enhancement bundle at [elfarm-enhance.js](file:///c:/Users/ZETICUZ/Music/El%20Farm%20Cafe%20and%20Restaurant/assets/js/elfarm-enhance.js).
  - Full-stack Node HTTP + API server running locally at `http://localhost:5173`.

---

## 2. 7-Phase Production Upgrade Summary

### Phase 1: Core Performance, Responsiveness & Dependency Health
- **Zero Startup Glitch / Layout Shift**: Eliminated startup layout shifts and preserved raw binary `.framercms` and `-chunk-default-*.js` CMS chunks without UTF-8 corruption.
- **Desktop-Only Intro Video**: Fullscreen intro animation (`assets/video/intro.mp4`) plays once per browser tab session on desktop (`sessionStorage.getItem('elfarm_intro_played')`) and skips automatically on mobile/tablet viewports (`< 1024px` or coarse pointer).

### Phase 2: Smart Adaptive Homepage Hero Video Player
- **Video Source**: Imported `C:\Users\ZETICUZ\Downloads\lv_0_20261114173731.mp4` into `assets/video/` and transcoded fast-start (`-movflags +faststart`) multi-bitrate adaptive stream tiers:
  - `assets/video/hero-main.mp4` (4K / Original Master)
  - `assets/video/hero-main-1080p.mp4` (1080p Full HD Fast-Start Default)
  - `assets/video/hero-main-720p.mp4` (720p HD Adaptive Fallback)
  - `assets/video/hero-main-480p.mp4` (480p SD Low-Bandwidth Fallback)
- **Adaptive Bitrate Engine (`initAdaptiveHeroVideo`)**: Prioritizes and locks onto Full HD/4K quality whenever connection supports it (`navigator.connection` + real-time stall/buffer monitoring), steps down only on slow connections, and seamlessly upgrades back to Full HD/4K while keeping the existing clean player UI.

### Phase 3: Homepage Menu Showcase, Palazzo Revolving Walnut Table & `/menu` Page Animations
- **Homepage 5-Circle Menu Showcase (`/`)**:
  - Removed the `"Book A table"` button, `"View Dish"` text overlay, and `title` tooltip from homepage menu images.
  - Configured the **CodePen `xxmpvqe` Full-Bleed Edge-to-Edge (`100vw`) 5-Circle Showcase** (`slidesPerView: 5`, `centeredSlides: true`, `spaceBetween: 24`) so **strictly 5 circles** are visible at a time with clean spacing between each circle and zero clipped partial circles on the edges.
  - **Size Hierarchy**: The **middle circle** (`swiper-slide-active`) is much larger (`scale(1.14)` = `342px` diameter), while the inner neighbors (`scale(0.74)` = `222px`) and outer circles (`scale(0.62)` = `186px`) are smaller.
  - **Hover & Immediate Slide on Mouse Leave**: Pointing the mouse at any circle immediately stops auto-sliding (`swiper.autoplay.stop()`), dims non-hovered slides, and highlights the pointed circle with a 3D lift, caption reveal, and radiant golden background glow light (`.elfarm-xxmpvqe-glow-orb`). **As soon as the pointer moves away (`mouseleave`) from any circle, the slider immediately slides to the next item (`swiper.slideNext(620)`)** and resumes autoplay.
  - Clicking anywhere on the homepage menu showcase smoothly routes the visitor to `/menu` (`./menu.html`).
- **Homepage Hero — Palazzo Revolving Walnut Table, Plated El Farm Foods & Timed Focal Smoke (`initHeroRevolvingTable`)**:
  - Extracted the full code, physics, and round walnut table asset (`assets/images/palazzo-walnut-table.png`) from the **Palazzo Framer template (`palazzo.framer.website`)** (`Gt` & `Ut` components) and mounted `#elfarm-palazzo-table-root` inside `[data-framer-name="Hero Image Block"]`.
  - **Studio-HD Plated El Farm Foods & Dynamic Menu Queue Loop**: Generated all **30 El Farm savory/food dishes** plated inside studio-lit overhead ceramic bowls (`assets/menu/plates/plated-<dish-id>.jpg`). As the 8-slot walnut table spins (`step = 45°`, `front = 180°` at 9-o'clock), each back-side plate slot dynamically loads the next El Farm menu dish so all 30 dishes are progressively revealed, then **loops seamlessly back to Dish 01 (`Classic Beef Topsilog / Tapsilog`)** and repeats endlessly.
  - **Focal Plate Scale-Up (`1.26x`) & Perfectly Timed Subtle Realistic Smoke**:
    - As a dish rotates into the `180°` focal position on the left side of the table, that plate smoothly scales up bigger (`scale = 1 + 0.26 * Math.max(0, 1 - diff / 45)` -> **`1.26x`**).
    - **Immediate Smoke Timing**: The exact moment a dish settles into the big `1.26x` focal plate (`diff <= 3.8°`), `.elfarm-palazzo-focal-smoke-wrap.is-smoking` activates **immediately** with delicate, realistic vertical rising steam wisps (`#elfarm-palazzo-focal-smoke-canvas`). When that dish finishes its turn and the table begins spinning to the next dish, the smoke **immediately disappears and clears completely** (`0` lingering smoke while spinning), starting fresh as soon as the next dish arrives.
    - Supports interactive pointer drag-to-turn (`cursor: grab`), coasting & spring snapping (`stiffness=120, damping=18`), click-to-advance, `"Drag the table to turn it"` button, and automatic table turning every `3.6s`.
- **`/menu` Page Cards & Floating Lightbox Modal (`/menu`)**:
  - Implemented the **CodePen `PwbGLmL`** hover card and 3D pointer tilt interaction (`mousemove` perspective tilt, sweeping top accent bar, radial corner glow, image zoom/saturation lift, animated title underline, numbered badge).
  - Clicking any food or drink card on `/menu` opens the **Floating Image Lightbox Modal** (`#elfarm-menu-lightbox`) with **Previous (Left)** and **Next (Right)** navigation buttons, keyboard arrow support (`ArrowLeft`, `ArrowRight`, `Escape`), and mobile touch swipe support.

### Phase 4: Complete 49-Item Menu Inventory & 100% Studio HD Visuals
- **Complete Menu Coverage (49 Individual Dishes & Drinks)**:
  - **9 Signature Coffees**: Dirty Coffee, Butter Caramel Popcorn Latte, Lamitan Sunrise, Iced Spanish Latte, Lotus Biscoff Latte, Salted Caramel Latte, Golden Honeycomb Latte, Brown Sugar Cinnamon Latte, Classic Iced Americano.
  - **10 Matcha, Hojicha, Smoothies & Yoghurt Drinks**: Coconut Matcha Cloud, EL Special Matcha (Dunya), Ceremonial Matcha Latte, Roasted Hojicha Latte, Hojicha Earl Grey Latte, S'mores Campfire Smoothie, Dubai Chewy Cookie Smoothie, Mulberry Yoghurt Refresher, Blueberry Yoghurt Refresher, Strawberry Yoghurt Refresher.
  - **6 Everyday Silogs, Goto & Wraps**: Classic Beef Topsilog / Tapsilog (`₱120`), Crispy Sisig Silog (`₱150`), Classic Pinoy Hotsilog (`₱100`), Putok Batok Bone Marrow Goto (`₱150`), Special Goto Overload (`₱120`), Spicy Samyang Buldak Wrap (`₱130`).
  - **9 Non-Pork Specials**: Tiyula Itum (Beef), Festive Chicken Kaliya, Native Chicken Tinola, Crispy Kare-Kareng Hito, Crispy Fried Whole Hito, Authentic Kambing Papaitan, Adobing (Goat Adobo), Sizzling Chicken Sisig, Sizzling Bangus Sisig.
  - **3 Pork Favorites**: Golden Crispy Pata, Sizzling Pork Sisig, Special Pork Dinuguan.
  - **6 Snacks, Native Delicacies & Desserts**: Crispy Chix N' Fries Basket, Crispy Golden Calamares, Barkadahan Special Platter, Saging Con Ginamus, Kamanting Con Haleya, Fudgy Brownie Cupcakes.
  - **6 Salu-Salo Bilao Feasts**: Seafood Feast Bilao, All-Time Favorites Combo Feast, Chicken & Pancit Miki Combo, Pinoy Favorites Bilao, Golden Chicken Bilao, Pancit Miki Special Bilao.
- **Static Menu-List Scans Removed**: Deleted all old text-list menu scans (`crop-menu-*-list.jpg`).

### Phase 5: Automated Google Account Setup, Book a Table Form & Email Alerts
- **Connected Google Account**: `stycanine77@gmail.com`
- **Google Sheet (`EL Farm Bookings`)**:
  - **GOOGLE_SHEET_ID**: `1f3y_CcS-GbZgict6YDWq2F5rfFUoz1SMJ71kBa2CNTA`
  - **Direct URL**: `https://docs.google.com/spreadsheets/d/1f3y_CcS-GbZgict6YDWq2F5rfFUoz1SMJ71kBa2CNTA/edit`
  - **Row 1 Headers**: `Timestamp`, `Name`, `Email`, `Phone`, `Date`, `Time`, `Guests`, `Order / Notes`
- **Environment Configuration (`.env.local`)**:
  - `BOOKING_NOTIFICATION_EMAIL=stycanine77@gmail.com` (with `# DEV TESTING EMAIL - Replace with actual EL Farm Café & Resto owner email before final production deploy`).
- **Book a Table Form (`POST /api/bookings`)**:
  - All inputs load completely empty with clean placeholders + an `Order / Pre-Order Dishes or Pickleball Notes` field.
  - Submitting a reservation appends the booking to `assets/data/bookings.json`, `assets/data/bookings.csv`, syncs to the `EL Farm Bookings` Google Sheet, and dispatches an immediate email notification to `stycanine77@gmail.com`.

### Phase 6: Customer Facebook Slider & Auto-Sync
- Removed the camera icon and scalloped circle overlay from `[data-framer-name="Instagram Section"]`.
- Set Framer Ticker `hoverFactor:0` so hovering over any customer photo immediately pauses auto-sliding and resumes when the pointer leaves.
- Added hover glass overlay displaying the **Facebook post caption**, **date posted**, and **Likes, Comments, and Shares**, backed by `/api/facebook-feed` and `/api/facebook-sync` (`assets/data/facebook-posts.json` + Facebook Graph API).

### Phase 7: Blog Section Image & Layout Fixes
- Fixed all blog thumbnails across `/` and `/blog` (`100%` loaded HD sanctuary photography) and wired every blog card to open the interactive Sanctuary Story Reader modal.

### Phase 8: Nature Atmosphere, Pure-AI Overhead Plated Foods & Meta OG Upgrade
- **Brightened Aomi Terraced Hills Hero Video Background**: Replaced the plain black hero backdrop inside `[data-framer-name^="Hero Section"]` (`.framer-1myb8ii`) with `assets/video/hero-nature-bg.mp4` (+ `assets/images/hero-nature-poster.png`, sourced from `https://aomi.framer.website/`), tuned to `opacity: 0.92; brightness(0.95)` with a lighter `.elfarm-hero-nature-scrim` (~15%+ brighter atmospheric backdrop behind Hero typography & table).
- **Intro Splash Animation Removed (`index.html`)**: Disabled `#elfarm-intro-overlay` and `#elfarm-intro-lock` so the homepage opens immediately without a splash transition while keeping `#elfarm-intro-critical-css` to hide legacy SSR plates (`Image 1..3`) and preserve Framer's foreground `Leaf Image` entrance layers (`z-index: 12`).
- **Transparent Top Header Over Hero Video & Revolving Table**: Removed the solid `#0b1315` header backdrop (`header`, `.framer-atzvB`, `.framer-2nqvvj-container` -> `background: transparent`) and floated `.framer-2nqvvj-container` at `position: absolute; top: 0` on the homepage (`index.html`) so `hero-nature-bg.mp4` fills from `y = 0` behind the navigation links (`VIEW MENU` / logo), Hero copy (`Where Farm Charm Meets Culinary Bliss`, `BOOK YOUR TABLE`, `4.8/5`) sits moved up cleanly above the fold, and the upper rim + top plates of `#elfarm-palazzo-table-root` (`transform: translate(-22%, -56%)`) reach behind the transparent header bar.
- **2x-Sized Left-Rim Table Ferns (`initNatureHeroVideoAnd3dLeaves`)**: Enlarged `.elfarm-table-fern-upper` and `.elfarm-table-fern-lower` inside `#elfarm-table-back-botanicals` (`z-index: 1` behind `#elfarm-palazzo-wheel` `z-index: 3`) with gentle ambient wind keyframes positioned cleanly beside the left/upper-left table curve without overlapping desktop or mobile typography.
- **Mobile Hero Hydration Fallback (`<= 809px`)**: Added `.elfarm-mobile-hero-content` + `#elfarm-mobile-table-host` fallback inside Hero when Framer React unmounts `.hidden-1k7gghl` desktop SSR blocks on narrow viewports, keeping Hero typography, CTA, Aomi video, calm left-rim fern, and the Revolving Walnut Table visible on mobile.
- **Pure-AI Overhead Studio Plates, Studio Menu Shots & Orphaned File Cleanup**:
  - Generated **12 true 90° overhead studio ceramic plate photos** (`assets/menu/plates/plated-<id>.jpg`, displayed on the Revolving Walnut Table via `AI_VERIFIED_PLATED_IDS`): `tapsilog`, `sisig-silog`, `hotsilog`, `tiyula-itum`, `crispy-pata`, `sizzling-sisig`, `crispy-fried-hito`, `samyang-wrap`, `kambing-papaitan`, `barkadahan-special`, `saging-con-ginamus`, `all-time-favorites-combo`.
  - Upgraded **29 of 49 menu items** in `ACCURATE_MENU_ITEMS` (`cleanImage`), plus SSR dish copies and blog references, to `./assets/menu/studio-*.jpg` HD studio shots, and deleted **27 orphaned old `board-*` / replaced `crop-*` / `dish-*` menu files** (`54` files total across `assets/menu/` & `public/assets/menu/`).
  - **Image Quota Note**: `gemini-3.1-flash-image` reached a `429 RESOURCE_EXHAUSTED` quota ceiling (~4h 37m reset window from `2026-11-15T10:19Z`). Once quota resets, run bespoke AI regeneration for the remaining **18 revolving table plates** and **20 older `crop-*`/`dish-*` menu items** (5 drinks + 15 foods).
- **New Nature-Branded Meta Share Banner (`og:image` / `twitter:image`)**: Generated `assets/images/og-cover-elfarm.jpg` (16:9 studio scene of an abundant El Farm dining table in front of the glowing wooden-slat `"EL FARM CAFE & RESTO — Escape the Ordinary"` wall framed by sunlit green botanical leaves).
- **Menu Hydration Flicker Guard**: Added `.framer-scnc0m:not(.elfarm-pwb-grid)` opacity suppression + `16ms` MutationObserver debounce so `/menu.html` never flashes template placeholder text (`Beef Skewers`) before `.elfarm-pwb-grid` mounts.

### Phase 9: Clean Palazzo 1:1 Desktop & Mobile Table Alignment, Leaf Removal & Zero-Error Optimization (`elfarm-enhance.js?v=15`) — Updated November 15, 2026
- **Complete Removal of All Hero Leaves**:
  - Removed behind-table fern fronds (`.elfarm-table-back-botanicals`, `.elfarm-table-fern-upper`, `.elfarm-table-fern-lower`) and deleted unused leaf assets (`leaf-fern-tall.png`, `leaf-bamboo-branch.png`, `leaf-tropical-spray.png`).
  - Removed the 3D falling leaves WebGL layer (`src/three-hero-nature.js` and `assets/js/elfarm-three-nature.js`) and stripped its `<script>` tag from all 5 HTML pages for instant, zero-overhead page loads.
- **1:1 Palazzo Revolving Walnut Table Alignment (`https://palazzo.framer.website`) + Entrance Animation**:
  - **Desktop (`>= 810px`)**: Sized `#elfarm-palazzo-table-root` to `970px × 970px` with `transform: translate(-27%, -51%)` so the left table rim sits at `~58%` of viewport width, the `1.26x` focal plate (`180°` / 9-o'clock) is vertically centered at `y ~ 52%`, the top-left (`225°`) plate tucks cleanly behind the transparent top header bar, and the HUD badge + `"Drag the table to turn it"` button sit cleanly in the lower-left hero gap (`left: -145px`, `translate(-50%, 195px)`).
  - **Mobile (`<= 809px`)**: Styled `[data-framer-name="Phone Hero Image Block"]` as a full-bleed bottom-clipped stage (`100vw × 395px`, `overflow: hidden`) and centered `#elfarm-palazzo-table-root` (`clamp(500px, 138vw, 600px)`, `left: 50%`, `translateX(-50%)`) with a responsive `+90°` visual angle offset (`mobileAngleOffset = 90`). On mobile, the **`1.26x` focal plate and rising steam canvas sit dead-center at `12-o'clock` (`270°`)**, flanked symmetrically on the left (`225°`) and right (`315°`) by the neighbor plates, with the Dish HUD pill and `"Drag the table to turn it"` button centered near the bottom over the walnut table hub.
  - **Page Load / Refresh Entrance Animation**: Initialized `theta = 36` (`mode = 'snapping'`, `snapTarget = 0`) paired with `@keyframes elfarmPalazzoTableEntranceDesktop` / `Mobile` (`0.9s cubic-bezier(0.22, 1, 0.36, 1)`) so the table smoothly glides and rotates into place on every page load or refresh.
- **Zero Console Errors & DevTools Issues Fixed**:
  - Silenced Framer's benign SSR text-override hydration warning (`Minified React error #418` / `#422`) in `script_main.E4M4ZNH6-73d3f308.js` (`onRecoverableError`).
  - Added semantic `autocomplete` attributes (`given-name`, `family-name`, `email`, `tel`, `off`) to every static and dynamic `<input>`, `<select>`, and `<textarea>` across all 5 HTML pages (`0` DevTools Console errors, `0` warnings, `0` form autocomplete issues).
- **Repository & Build Preparation (November 15, 2026)**:
  - Created comprehensive [README.md](file:///c:/Users/ZETICUZ/Music/El%20Farm%20Cafe%20and%20Restaurant/README.md) documenting all features and dated **November 15, 2026**, synced `public/` build artifacts, and staged the clean repository for GitHub push.

### Phase 10: True `palazzo.framer.website` Responsive Hero Fit, Entrance Choreography, Interactive Controls & Gold `EL` Favicon (`elfarm-enhance.js?v=16`) — Verified November 16, 2026
- **Exact Palazzo Viewport-Proportional Formulas (`Gt` & `Ut`)**:
  - Desktop (`>= 810px`): Hero constrained to `width: 100vw; max-width: none; height: 100vh / 100dvh; overflow: hidden;` with fluid `clamp()` H1 (`42px–80px`) and subtitle so all Hero text, `BOOK YOUR TABLE` CTA, `4.8/5` rating, and bottom-left `.elfarm-palazzo-hud` (`DISH XX / 12` + `"Drag or scroll the table to turn it"`) fit cleanly above the fold at `1280×800`, `1366×660`, `1536×740`, and `1920×920+` with zero clipping and Section 2 starting at `y = 100vh`. Fixed `.framer-c688wi` `max-width: 679px` Framer SSR rule (`max-width: none; min-width: 100%; overflow: visible;`) and React hydration remounting for `root`, `smokeOverlay`, and `hudEl`.
  - Mobile (`<= 809px`): `.framer-1myb8ii` & `.framer-yak54d` use `justify-content: flex-start` so Hero copy sits cleanly in the upper half (`y = 91..362`) above the `12-o'clock` focal plate (`y = 511..721`) and bottom HUD (`y = 761..827`).
- **Palazzo Entrance Choreography & Overhead Studio Vignette**: Restored `2.4s cubic-bezier(0.22, 1, 0.36, 1)` table sweep-in, `1.1s` staggered per-plate entrance (`0.5s + idx * 0.11s`), `45° -> 0°` spring spin, and `.elfarm-palazzo-table-sheen` radial lighting.
- **Full Mouse Click, Drag, Wheel Scroll & Keyboard Controls**: Fixed `.framer-yak54d` pointer interception (`pointer-events: none` container, `auto` on text/buttons) so clicking outer plates spins them directly to the `1.26x` spotlight, clicking focal/table advances a course, dragging coasts with spring snap, mouse wheel over the walnut disc spins courses without blocking page scroll outside the disc, and `ArrowLeft`/`ArrowRight` step courses.
- **Enhanced Focal Steam & Crisp Gold `EL` Favicon**: Upgraded focal steam canvas (`420×420`, `screen` blend, `MAX_SMOKE_WISPS = 22`) and generated crisp cropped ICO/PNG favicons (`favicon.ico?v=2`, `32×32`, `180×180`, `192×192`), stripping attribute-unordered legacy Framer `<link rel="icon">` tags.
### Phase 11: 100% 49/49 Studio Menu Images, Swapped HUD Order, Empty Phone Field & Sora Animated Map (`elfarm-enhance.js?v=17`) — Verified November 16, 2026
- **49/49 Unified Studio Menu Visuals & 21 Overhead Table Dishes**: Replaced the remaining `20` legacy `crop-*` / `dish-*` menu items (`Dirty Coffee`, `Coconut Matcha Cloud`, `S'mores Smoothie`, `Dubai Chewy Cookie Smoothie`, `EL Farm Popcorn Latte`, `Putok Batok Bone Marrow Goto`, `Goto Overload`, `Festive Chicken Kaliya`, `Native Chicken Tinola`, `Crispy Kare-Kareng Hito`, `Adobing`, `Sizzling Chicken Sisig`, `Sizzling Bangus Sisig`, `Special Pork Dinuguan`, `Fudgy Brownie Cupcakes`, and 5 Bilao feasts) across `ACCURATE_MENU_ITEMS`, `src/data/restoData.json`, `ssrDishCopies`, Homepage 5-Circle Coverflow, `/menu.html`, and expanded `AI_VERIFIED_PLATED_IDS` (`12 -> 21` studio overhead dishes). Deleted all `40` superseded files from `assets/menu/` & `public/assets/menu/`.
- **Hero HUD Control Swap**: Reordered `#elfarm-palazzo-hud` so `"Drag or scroll the table to turn it"` renders on the LEFT and `DISH XX / 21 | ... | ₱...` renders on the RIGHT (`flex-wrap: nowrap`, `max-width: min(720px, 58vw)` on desktop; `column-reverse` on mobile).
- **Book a Table Clean Phone Input**: Removed `"0917 123 4567"` placeholder text from all `Phone*` fields (`placeholder=""`).
- **Sora-Style Animated Dark Vector Map (`injectMiniMapSection`)**: Replaced the Google Maps `<iframe>` with a minimalist dark vector canvas (`#050708`), road grid, green farm sanctuary plot, curved bottom-right `Maloong Canal` water bay, vignette fades into `#0b1315`, animated `#f4161c` pulsing radar rings & teardrop pin (`6.6582° N, 122.1457° E`), and floating obsidian card (`EL Farm Café & Resto — Sitio Nipa, Maloong Canal, Lamitan`) linking directly to Google Maps.
- **Calamares Studio Upgrade & Queued AI Regeneration List (November 16, 2026)**:
  - **Completed & Verified (`?v=2` + `elfarm-enhance.js?v=18`)**: Regenerated `Crispy Golden Calamares` (`studio-calamares.jpg?v=2` & `plates/plated-crispy-calamares.jpg`, `1024×1024`), added `'crispy-calamares'` to `AI_VERIFIED_PLATED_IDS` (`22` Hero table dishes), and verified live in Playwright on `http://localhost:5173/menu.html` with `0` console errors/warnings.
  - **Pending `gemini-3.1-flash-image` Quota Reset (~`2026-11-15T22:10:28Z` / 6:10 AM PHT — 429 `RESOURCE_EXHAUSTED`)**:
    1. `Butter Caramel Popcorn Latte` (`studio-popcorn-latte.jpg`) — replace low-res crop with sharp `EL FARM CAFÉ & RESTO` studio cup.
    2. `Coconut Matcha Cloud` (`studio-coconut-matcha-cloud.jpg`) — recreate clean studio photo inside a real carved young buko shell matching user's 2nd reference photo (no poster text overlays).
    3. `Saging Con Ginamus` (`studio-saging-con-ginamus.jpg` & `plates/plated-saging-con-ginamus.jpg`) — replace white gingham crop with dark walnut stoneware studio plate.
    4. `Seafood Feast Bilao` (`studio-seafood-bilao.jpg` & `plates/plated-seafood-feast-bilao.jpg`) — full circular overhead bilao on dark walnut wood.
    5. `Chicken & Pancit Miki Combo` (`studio-chicken-miki-combo.jpg` & `plates/plated-chicken-pancit-miki-combo.jpg`) — full circular overhead bilao matching `All-Time Favorites Combo Feast`.
    6. `Pinoy Favorites Bilao` (`studio-pinoy-bilao.jpg` & `plates/plated-pinoy-favorites-bilao.jpg`) — full circular overhead bilao on dark walnut wood.
    7. `Golden Chicken Bilao` (`studio-chicken-bilao.jpg` & `plates/plated-chicken-bilao.jpg`) — full circular overhead bilao + kropek + gravy/chili dip.
    8. *(Visual Audit Findings — Mismatched Legacy Assets)*: `Strawberry Yoghurt Refresher` (`studio-strawberry-yoghurt.jpg`, currently shows dark berries), `Crispy Chix N' Fries Basket` (`studio-chix-n-fries.jpg`, missing fries), `Barkadahan Special Platter` (`studio-barkadahan-special.jpg`, currently shows dumplings/gyoza), and optional polish for `Kamanting Con Haleya` (`studio-kamanting-con-haleya.jpg`).
- **Git Push Policy**: Staged locally only (`git add -A`) — **HOLDING `git push`** pending user confirmation because remaining AI menu image regenerations (`Butter Caramel Popcorn Latte`, `Coconut Matcha Cloud` in buko shell, `Saging Con Ginamus`, 4 Bilao feasts, and 3-4 mismatched items) remain blocked by both Google AI Studio Free Tier (`projects/369924699716`, `generate_content_free_tier_requests, limit: 0` without GCP Billing) and Antigravity `image-generator` quota reset (`~6:10 AM PHT`).

### Phase 12: Download App Page (`/download`), Android APK, Offline QR Codes, Edge-to-Edge PWA & Smart Mobile Zoom Lock (`elfarm-enhance.js?v=20`) — Verified November 16, 2026
- **`Download App` Header/Footer Nav & `/download.html` Hub**:
  - Injected `Download App` (`./download.html`) cleanly between `Blog` and `Contact us` across desktop/mobile nav (`ensureDownloadNavLink`) and footer navigation (`Home | About | Blog | Download App | Contact us`).
  - Mounted `#elfarm-download-hub` directly below the header banner on `download.html`, complete with 3 offline-encoded `<canvas>` QR codes (`assets/js/qrcode.min.js` `window.ElFarmQR`) paired side-by-side with mint-white pill `Download` buttons: **Smart Universal QR** (`?auto=1`), **Android APK** (`?platform=android&auto=1`), and **iOS & Web App** (`?platform=ios&auto=1`).
- **Official Android APK Packaging**: Imported `C:\Users\ZETICUZ\Downloads\el_farm_cafe.apk` (`10,449,906` bytes) into `assets/downloads/el-farm-cafe.apk` and `public/assets/downloads/el-farm-cafe.apk`; configured `.apk` MIME (`application/vnd.android.package-archive`) and `Content-Disposition: attachment; filename="El-Farm-Cafe-and-Resto.apk"` in [serve_framer.cjs](file:///c:/Users/ZETICUZ/Music/El%20Farm%20Cafe%20and%20Restaurant/scripts/serve_framer.cjs) and [vercel.json](file:///c:/Users/ZETICUZ/Music/El%20Farm%20Cafe%20and%20Restaurant/vercel.json), plus `/download` -> `/download.html` routing rewrites.
- **Latest Edge-to-Edge Cross-Browser PWA (`manifest.webmanifest?v=3` + `sw.js` v4)**:
  - Generated `512×512` standard (`favicon-512x512.png`) and maskable (`maskable-icon-512x512.png`) icons; configured full iOS/Android standalone meta tags (`apple-mobile-web-app-capable="yes"`, `black-translucent`, `viewport-fit=cover`, safe-area CSS insets) and Service Worker `v4` (`elfarm-pwa-v4` using Network-First for HTML + `elfarm-enhance.js`, and skipping `.apk`/`.mp4`/`/api/`).
  - Supports native `beforeinstallprompt` button upgrading (`"Install App Now"` on Chromium/Android/Desktop) + a bespoke 3-step Safari Share -> Add to Home Screen modal (`#elfarm-pwa-modal`).
- **Smart Mobile Zoom Lock vs `"View Desktop Site"` Unlock (`initSmartViewportZoomControl`)**:
  - Locks pinch-zoom, multi-touch gesture zooming, and double-tap zoom on normal mobile/tablet views (`user-scalable=no, maximum-scale=1.0, minimum-scale=1.0`, `.elfarm-zoom-locked`), while automatically enabling zoom in/out (`width=1200, maximum-scale=5.0, user-scalable=yes`, `.elfarm-desktop-site-zoom`) when `"View Desktop Site"` / `"Request Desktop Website"` is turned on (and re-locking when turned back off), without mis-zooming desktop touch laptops.
  - Verified live in Playwright (`1366×768` desktop + `390×844` mobile + `?platform=ios&auto=1` modal + desktop-site zoom state toggling) with `0` console errors and `0` warnings.

---

## 3. Developer Attribution Standard
- Centered at the bottom of the footer on all pages:
  `SITE DEVELOPED BY: [zeticuz-logo.svg]` opening `https://www.zeticuz.xyz/` in a new tab.

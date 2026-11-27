# El Farm Cafe and Restaurant (`EL FARM CAFÉ & RESTO`) · Official Website & Cloud POS

> **Full-Stack Restaurant Sanctuary Website + Embedded Cloud Supabase Point of Sale (`/pos/*`), Live Kitchen Display System (KDS), Smart TV Queue Board, Employee Attendance & BARMM-05 Payroll, and Clean Native Android Tablet & Phone APK.**  
> Built for **El Farm Cafe and Restaurant** — *Sitio Nipa, Brgy. Maloong Canal, Lamitan City, Basilan, Philippines* · Open Daily `9:00 AM – 9:00 PM`.

---

## 🌟 What Is Included (Website + Cloud POS Unified)

### Part 1 — Public Restaurant & Cafe Experience
- **Interactive 3D Revolving Walnut Table Hero (`index.html`)**: 100vh responsive tabletop showcase featuring overhead studio plates with rising thermal steam wisps, inertial pointer drag, wheel scrolling, keyboard navigation, and a randomized 5-circle Coverflow menu strip.
- **Complete 49-Item Studio Menu (`/menu`)**: 7 categories (`Signature Coffee`, `Matcha & Smoothies`, `Silogs & Goto`, `Non-Pork Specials`, `Pork Favorites`, `Snacks & Delicacies`, `Salu-Salo Feasts`) with category filtering, instant mobile/tablet search, 3D tilt hover cards, and full-screen inspection lightbox.
- **Three.js Infinite Curved Blog Carousel (`/blog` & Homepage)**: Full edge-to-edge WebGL GLSL curved card carousel (`ol-ivier` CodePen `01a209cc` with `0.004` smooth glide, sine-step z-curve shading, transparent background, clean main caption inside each image, active story summary synced cleanly below, and click-to-read full-story lightbox).
- **Reflective S-Curve WebGL2 Customer Moments Slider**: Smooth pointer-draggable & swipeable 3D reflective gallery showcasing the 20 latest customer dining moments (newest posts first) with frosted **Facebook Moment** hover captions, dates, and engagement stats.
- **Guest Feedback, Table Reservations & Animated Sanctuary Map (`/contact`)**: Verified guest reviews (including Facebook guest feedback), hardened serverless booking API (`POST /api/bookings` via `api/bookings.js`), and dark vector location map for Sitio Nipa, Lamitan City.
- **Header & Auto-Updating Footer**: Simultaneous SSR `VIEW MENU` and `POS LOGIN` buttons (`42px` matched height), opaque dark-frosted backdrop transition on scroll, mobile drawer `POS Login`, and automatic year updating (`new Date().getFullYear()` -> `SITE DEVELOPED BY: [ZETICUZ] © 2026`).
- **Download App Hub (`/download`) & Clean Android APK**: Offline-ready QR codes (`Smart Universal QR`, `Android APK QR`, `iOS & Web App PWA QR`), edge-to-edge PWA installer, and a custom **145 KB zero-adware signed native Android APK** built for tablets & phones.

### Part 2 — Embedded Cloud Supabase POS (`/pos/*` — Single Unified Deployment)
- **Single-Deployment Architecture (How POS Is Integrated Into the Main Website)**:
  - Rather than hosting two disconnected apps, the POS React + TypeScript application lives inside `pos-src/` right inside the main website repository alongside the public pages (`index.html`, `menu.html`, `blog.html`, etc.).
  - `vite.widget.config.ts` compiles `pos-src/widget.ts` into `/pos/pos-widget.js` (loaded on every public page for instant header/drawer sign-in + floating login modal).
  - `vite.pos.config.ts` compiles `pos-src/` (`BrowserRouter basename="/pos"`, `sourcemap: false`) into `/pos/` inside the repository root (`pos/index.html` + `pos/assets/*`).
  - [`vercel.json`](vercel.json) rewrites `/pos/:path*` to `/pos` and ships both the public restaurant site and Cloud POS together on the **same domain, same Vercel deployment, and same Supabase Cloud project** (`VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`). *(A mirrored standalone POS copy also builds cleanly from the companion `pos resto` repo using the identical Supabase schema.)*
- **Strict Session Security & Access Control**:
  - Clicking **`POS LOGIN`** in the header (or mobile sidebar drawer) opens a floating dark-glass login modal right over the website.
  - Supports **Username or Email** login via Supabase `resolve_login_profile` RPC + `signInWithPassword`.
  - Sessions use per-tab `sessionStorage` (purged on return to public pages or Sign Out), never include one-click auto-login bypasses, guard every route (`/pos/cashier`, `/pos/crew`, `/pos/display`, `/pos/admin`) via `<ProtectedRoute>`, and lock checkout/order/cancel RPCs and storage uploads behind Supabase RLS (`auth.uid()` & `is_admin()`).
- **Tablet-Optimized Cashier POS Terminal (`/pos/cashier`) & Official Add-Ons (`+Extras`)**:
  - Automatic Cashier **Time-In** stamp in `attendance_logs` on login and **Time-Out** stamp on **`Log Out / End Shift`**.
  - Fits all **8 compact category pills** cleanly on Tablet Landscape (`1024×768+`) without horizontal scroll clipping.
  - **Official Facebook Add-Ons (`+Extras`)**: Tap **`+Extras`** on Silogs & Goto (**Extra Rice `+₱20`**, **Add Egg `+₱15`**, **Iced Tea `+₱25`**) or Signature Coffee / Matcha (**Oat Milk Add-on `+₱30`**, excluding Yoghurt drinks) to open the floating **Customize** modal, or tap **`+`** to add immediately.
  - Regular **12% VAT-inclusive** & **Senior Citizen / PWD (RA 9994)** VAT-exempt + 20% discount math, Cash/GCash/Maya/Card checkout (`process_checkout` RPC), and Today's Orders edit/void/reprint drawer.
- **80mm Thermal Roll `<PrintPortal>` Printing**:
  - Official Receipts, Daily Z-Readings, and BARMM-05 Payslips render via React `createPortal` directly into `document.body > #pos-print-root` with `@page { size: 80mm auto; margin: 0mm; }` and `76mm` full-width layout so hardware 80mm thermal receipt printers print edge-to-edge cleanly with item extras and totals intact.
- **Kitchen KDS (`/pos/crew`) & Queue Display (`/pos/display`)**:
  - Real-time Supabase Realtime sync between Cashier -> Kitchen Crew (highlighting `(+ extras)` lines on Tablet KDS cards, `Mark Ready` -> `Complete`) -> Smart TV Queue Monitor with two-tone audio chime & screen WakeLock.
- **Admin Backoffice (`/pos/admin`)**:
  - **Sales Calendar & Order Ledger**: Daily revenue totals, hourly breakdown, Z-Reading thermal print, CSV export, and order editing/cancellation/deletion.
  - **Cloud Menu, Add-Ons & Stock Manager**: Full `public.products` CRUD for both the **49 base dishes/drinks** and custom **Menu Add-Ons & Extras** (`ADDON::` metadata + per-item Add-On toggle checkboxes + direct upload/cleanup in Supabase Storage `menu-images`).
  - **Employees & Attendance Calendar**: Provision Cashier accounts without logging Admin out (`persistSession: false` secondary client), active toggles, monthly attendance calendars with automatic `ABSENT` highlights, and **Christmas Bonus Leaderboard**.
  - **Lamitan BARMM-05 Payroll & 80mm Payslip Printer**: Semi-monthly cutoff (`1st–15th` / `16th–End`) calculator (`₱54.50/hr` / Dec 1, 2026 `₱57.63/hr`, `1.25x` OT) with exact-date Overtime logging.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Website Frontend** | Static HTML5 + Framer Runtime Chunks, Three.js, WebGL2 GLSL Shaders, GSAP, Swiper, `qrcode.min.js`, Service Worker PWA (`sw.js`) |
| **Embedded POS SPA** | React 18, TypeScript 5.6, Vite 5 (multi-config: `vite.pos.config.ts` & `vite.widget.config.ts`), Tailwind CSS 3.4, React Router DOM v6 |
| **Cloud Backend** | Supabase (`@supabase/supabase-js`) — PostgreSQL, Auth, Row Level Security (RLS), Public Storage (`menu-images`), Realtime |
| **Android Native App** | Pure Java (`com.elfarmcafe.official`, SDK 34), `fullSensor` Tablet/Phone Orientation, `FLAG_KEEP_SCREEN_ON`, Native `PrintManager` 80mm Bridge |
| **Server & Hosting** | Local Node server (`scripts/serve_framer.cjs` with path traversal & secret-file deny guards), Vercel Static + RE2 SPA Rewrites (`vercel.json`) |

---

## 🗄️ Step-by-Step Cloud POS & Supabase Setup Guide

### Step 1: Clone & Install Dependencies
```bash
git clone https://github.com/ZETIC7Z/el-farm-cafe-and-restaurant.git
cd "El Farm Cafe and Restaurant"
npm install
```

### Step 2: Create a Supabase Project & Storage Bucket
1. Sign in to the [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2. Go to **Storage → New bucket**:
   - Name: `menu-images`
   - **Public bucket**: **ON**
   - Save.

### Step 3: Run the Database Schema, RLS Policies & RPCs
In **Supabase Dashboard → SQL Editor → New Query**, run the POS schema script (from the companion `RESTO-POS` `supabase/schema.sql`) to provision:
- **Tables**: `profiles`, `attendance_logs`, `products`, `customers`, `orders`, `order_items`, `store_settings`
- **Row Level Security (RLS)** & **Storage (`menu-images`) policies**: locks `profiles`, `attendance_logs`, and `customers` from anonymous `anon` access while allowing authenticated cashiers/admins role-scoped access
- **Realtime**: add `profiles`, `attendance_logs`, `products`, and `orders` to `supabase_realtime` publication
- **RPC Functions**: `is_admin()`, `resolve_login_profile(p_identifier)`, `process_checkout(...)`, `update_submitted_order(...)`, `cancel_order(...)`, `admin_upsert_cashier_profile(...)`, `admin_create_cashier_account(...)`

### Step 4: Manually Create Your First Admin Account in Supabase
1. In **Supabase Dashboard → Authentication → Users**, click **Add user → Create new user**:
   - **Email**: `your-admin-email@example.com`
   - **Password**: choose a strong password
   - Check **Auto Confirm User** (`ON`) and click **Create user**.
2. Copy the generated **User UID** (`uuid`), then run in **SQL Editor → New Query**:
   ```sql
   INSERT INTO public.profiles (id, email, username, full_name, role, hourly_rate, is_active)
   VALUES (
     'PASTE-YOUR-USER-UUID-HERE',
     'your-admin-email@example.com',
     'administrator',
     'Store Administrator',
     'admin',
     54.50,
     true
   );
   ```
3. You can now sign in via the website **`POS LOGIN`** modal using your admin username or email (`Admin` role card), and create or manage Cashier accounts directly inside `/pos/admin` (**Employees** tab).

### Step 5: Configure Local Environment Variables (`.env.local`)
Create `.env.local` in the project root (gitignored by `.gitignore` and excluded by `.vercelignore`):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

> **Security Notice:** Never commit `.env`, `.env.local`, `service_role` keys, API tokens, or customer booking files (`assets/data/bookings.json` / `.csv`) to Git or publish them in client bundles. Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (protected by Supabase RLS) belong in `.env.local` and Vercel environment variables.

---

## 💻 Running Locally & Deploying

### Build Embedded Cloud POS & Run Local Full-Stack Server
```bash
# Build /pos/* SPA + /pos/pos-widget.js with your .env.local Supabase config
npm run build:pos

# Start local HTTP + Bookings/Facebook API server (with path-traversal & secret-file protection)
npm run dev
```
Open **`http://localhost:5173`** in your browser. Click **`POS LOGIN`** in the header to test `/pos/cashier`, `/pos/crew`, `/pos/display`, and `/pos/admin`.

### Deploy to Vercel Production
1. In **Vercel Dashboard → Project Settings → Environment Variables** (Production, Preview, and Development), add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Ensure [`vercel.json`](vercel.json) is present (`cleanUrls: true`, SPA rewrites `"/pos/:path*" -> "/pos"`, and security headers including `Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`).
3. Deploy:
   ```bash
   npx vercel deploy --prod
   ```

---

## 📱 Android Tablet & Phone APK Guide (Cashier, Kitchen KDS & 80mm Printer)

1. Open `/download` on your Android tablet or phone and tap **Download** under **Android App** (`El-Farm-Cafe-and-Resto.apk`, `145 KB`, Android 7.0+).
2. Enable **"Allow from this source"** once when prompted and tap **Install**.
3. **Tablet Features Included**:
   - **Auto-Rotation (`fullSensor`)** & resizeable layout for landscape Cashier/Kitchen tablets and portrait phones.
   - **Keep Screen Awake (`FLAG_KEEP_SCREEN_ON`)**: Prevents Kitchen KDS / TV Monitor tablets from sleeping during service.
   - **Station Dock (`POS` edge tab)**: Tap the subtle left-edge **`POS`** tab anytime to switch quickly between Main Website, POS Login, Cashier Terminal (`/pos/cashier`), Kitchen KDS (`/pos/crew`), TV Queue Monitor (`/pos/display`), Print Receipt, or Fullscreen toggle.
   - **Native 80mm Thermal Printer Bridge**: Any **Print Receipt**, **Z-Reading**, or **Payslip** call invokes Android's native `PrintManager` spooler cleanly so paired Bluetooth, USB, or Wi-Fi 80mm ESC/POS printer apps can print receipts directly.

---

## 📁 Project Structure

```text
El Farm Cafe and Restaurant/
├── index.html, about.html, menu.html, blog.html, download.html, contact.html
├── pos/                                # Compiled Cloud POS SPA + pos-widget.js bundle
├── pos-src/                            # React + TypeScript Cloud POS & header login modal source
│   ├── components/                     # ReceiptModal (80mm PrintPortal), PayrollView, MenuManagerView, etc.
│   ├── lib/                            # AuthContext, Supabase sessionStorage client, VAT/RA 9994 pricing
│   ├── pages/                          # CashierPage, CrewKitchenPage, QueueDisplayPage, AdminDashboardPage
│   ├── App.tsx                         # Protected /pos/* router guards
│   └── widget.ts                       # Floating POS LOGIN button & locked authentication modal
├── assets/
│   ├── css/, fonts/, js/, menu/, video/
│   ├── data/facebook-posts.json        # Synchronized Facebook Moments & blog imagery
│   ├── downloads/el-farm-cafe.apk      # Clean native signed Android Tablet & Phone APK (145 KB)
│   └── images/                         # Customer HD moments (1..20), Meet CAS blog cover, favicons, brand marks
├── scripts/
│   ├── serve_framer.cjs                # Hardened local HTTP + Bookings/FB API server
│   └── transform_monkscrave_content.cjs# Runtime bundle compiler & asset synchronizer
├── manifest.webmanifest                # Edge-to-edge PWA manifest
├── sw.js                               # Offline-resilient Service Worker (bypasses /pos/*, /api/*, .apk)
├── vercel.json                         # Security headers, cleanUrls & /pos/* SPA rewrites
├── vite.pos.config.ts                  # Vite config for /pos/* React SPA
└── vite.widget.config.ts               # Vite IIFE build for /pos/pos-widget.js
```

---

## 👨‍💻 Developer & Attribution

```text
SITE DEVELOPED BY: Sam Pangilinan · © 2026
```

- **Portfolio**: [https://www.zeticuz.xyz/](https://www.zeticuz.xyz/)
- **GitHub**: [@ZETIC7Z](https://github.com/ZETIC7Z)

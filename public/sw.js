/* El Farm Cafe & Restaurant — Edge-to-Edge Cross-Browser Service Worker (v4) */
const CACHE_NAME = 'elfarm-pwa-v4';
const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/menu.html',
  '/about.html',
  '/blog.html',
  '/download.html',
  '/contact.html',
  '/manifest.webmanifest',
  '/favicon.ico?v=2',
  '/assets/images/apple-touch-icon.png?v=2',
  '/assets/images/favicon-192x192.png?v=2',
  '/assets/images/favicon-512x512.png?v=3',
  '/assets/css/swiper-bundle.min.css',
  '/assets/js/gsap.min.js',
  '/assets/js/swiper-bundle.min.js',
  '/assets/js/qrcode.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Never cache API calls, range video streams, or APK installer downloads
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.endsWith('.apk') ||
    url.pathname.endsWith('.mp4') ||
    req.headers.get('range')
  ) {
    return;
  }

  // Network-first for HTML navigations & active runtime bundle with offline fallback
  if (req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.includes('elfarm-enhance.js')) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          return cached || caches.match('/index.html');
        })
    );
    return;
  }

  // Stale-while-revalidate for static styles, scripts, fonts, and menu photography
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});

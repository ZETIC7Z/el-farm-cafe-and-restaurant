const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const PORT = Number(process.env.PORT || 5173);

// Load .env.local if present
const envPath = path.join(ROOT, '.env.local');
const ENV = {};
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq > 0) {
      const k = trimmed.slice(0, eq).trim();
      const v = trimmed.slice(eq + 1).trim();
      ENV[k] = v;
    }
  }
}

const GOOGLE_SHEET_ID = ENV.GOOGLE_SHEET_ID || '1f3y_CcS-GbZgict6YDWq2F5rfFUoz1SMJ71kBa2CNTA';
const GOOGLE_SHEET_URL = ENV.GOOGLE_SHEET_URL || `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;
const BOOKING_NOTIFICATION_EMAIL = ENV.BOOKING_NOTIFICATION_EMAIL || 'stycanine77@gmail.com';
const FACEBOOK_PAGE_ID = ENV.FACEBOOK_PAGE_ID || '61592749568852';
const FACEBOOK_PAGE_ACCESS_TOKEN = ENV.FACEBOOK_PAGE_ACCESS_TOKEN || '';

const DATA_DIR = path.join(ROOT, 'assets/data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const BOOKINGS_JSON_PATH = path.join(DATA_DIR, 'bookings.json');
const BOOKINGS_CSV_PATH = path.join(DATA_DIR, 'bookings.csv');
const EMAIL_LOG_PATH = path.join(DATA_DIR, 'email-notifications.log');
const FB_POSTS_PATH = path.join(DATA_DIR, 'facebook-posts.json');

const CSV_HEADERS = ['Timestamp', 'Name', 'Email', 'Phone', 'Date', 'Time', 'Guests', 'Order / Notes'];

function escapeCsvCell(val) {
  const s = String(val == null ? '' : val).replace(/\r?\n/g, ' ').trim();
  if (s.includes(',') || s.includes('"')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function loadBookings() {
  if (!fs.existsSync(BOOKINGS_JSON_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(BOOKINGS_JSON_PATH, 'utf8'));
  } catch (e) {
    return [];
  }
}

function saveBookingsAndBuildCsv(bookings) {
  fs.writeFileSync(BOOKINGS_JSON_PATH, JSON.stringify(bookings, null, 2), 'utf8');
  const lines = [CSV_HEADERS.join(',')];
  for (const b of bookings) {
    lines.push([
      escapeCsvCell(b.timestamp),
      escapeCsvCell(b.name),
      escapeCsvCell(b.email),
      escapeCsvCell(b.phone),
      escapeCsvCell(b.date),
      escapeCsvCell(b.time),
      escapeCsvCell(b.guests),
      escapeCsvCell(b.notes)
    ].join(','));
  }
  const csvContent = lines.join('\n') + '\n';
  fs.writeFileSync(BOOKINGS_CSV_PATH, csvContent, 'utf8');
  return csvContent;
}

async function syncBookingsToGoogleSheetAndNotify(booking, csvContent) {
  const token = process.env.GCLI_ACCESS_TOKEN || ENV.GCLI_ACCESS_TOKEN || '';
  const result = {
    sheetSynced: false,
    sheetId: GOOGLE_SHEET_ID,
    sheetUrl: GOOGLE_SHEET_URL,
    notificationRecipient: BOOKING_NOTIFICATION_EMAIL,
    emailDispatched: false
  };

  // Format email notification payload
  const emailSubject = `[EL Farm Café & Resto] New Table Reservation — ${booking.name} (${booking.date} @ ${booking.time})`;
  const emailBody = [
    `NEW TABLE RESERVATION — EL FARM CAFÉ & RESTO`,
    `==================================================`,
    `To: ${BOOKING_NOTIFICATION_EMAIL}`,
    `Subject: ${emailSubject}`,
    `Timestamp: ${booking.timestamp}`,
    `Customer Name: ${booking.name}`,
    `Email Address: ${booking.email}`,
    `Phone Number: ${booking.phone}`,
    `Reservation Date: ${booking.date}`,
    `Preferred Time: ${booking.time}`,
    `Number of Guests: ${booking.guests}`,
    `Order / Special Notes: ${booking.notes || 'None'}`,
    `Google Sheet Live Link: ${GOOGLE_SHEET_URL}`,
    `==================================================\n`
  ].join('\n');

  fs.appendFileSync(EMAIL_LOG_PATH, emailBody + '\n', 'utf8');

  if (!token) {
    return result;
  }

  try {
    // 1. Update live Google Sheet CSV data via Google Drive Upload API
    const uploadRes = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${GOOGLE_SHEET_ID}?uploadType=media`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/csv; charset=utf-8'
        },
        body: csvContent
      }
    );
    if (uploadRes.ok) {
      result.sheetSynced = true;
    }

    // 2. Trigger Google Drive email notification / comment alert on the EL Farm Bookings sheet for stycanine77@gmail.com
    const commentRes = await fetch(
      `https://www.googleapis.com/drive/v3/files/${GOOGLE_SHEET_ID}/comments?fields=id,content,createdTime`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `🔔 New Reservation Alert for ${BOOKING_NOTIFICATION_EMAIL}:\n` +
            `• Guest: ${booking.name} (${booking.email} | ${booking.phone})\n` +
            `• Schedule: ${booking.date} at ${booking.time} (${booking.guests} guests)\n` +
            `• Order / Notes: ${booking.notes || 'Standard Table Reservation'}`
        })
      }
    );
    if (commentRes.ok) {
      result.emailDispatched = true;
    }
  } catch (err) {
    console.error('Google Sheet sync warning:', err.message);
  }

  return result;
}

async function syncFacebookPosts() {
  let feedData = {
    pageName: 'El Farm Cafe and Restaurant',
    pageId: FACEBOOK_PAGE_ID,
    pageUrl: 'https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/',
    autoSyncEnabled: true,
    lastSyncedAt: new Date().toISOString(),
    posts: []
  };

  if (fs.existsSync(FB_POSTS_PATH)) {
    try {
      feedData = JSON.parse(fs.readFileSync(FB_POSTS_PATH, 'utf8'));
    } catch (e) {}
  }

  // If Facebook Graph API token is configured in .env.local, poll live page feed
  if (FACEBOOK_PAGE_ACCESS_TOKEN) {
    try {
      const graphUrl = `https://graph.facebook.com/v19.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time,full_picture,permalink_url,likes.summary(true),comments.summary(true),shares&limit=16&access_token=${encodeURIComponent(FACEBOOK_PAGE_ACCESS_TOKEN)}`;
      const res = await fetch(graphUrl);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.data) && data.data.length > 0) {
          data.data.forEach((post, idx) => {
            if (idx < feedData.posts.length) {
              feedData.posts[idx] = {
                ...feedData.posts[idx],
                id: post.id || feedData.posts[idx].id,
                caption: post.message || feedData.posts[idx].caption,
                date: post.created_time
                  ? new Date(post.created_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                  : feedData.posts[idx].date,
                likes: post.likes?.summary?.total_count ?? feedData.posts[idx].likes,
                comments: post.comments?.summary?.total_count ?? feedData.posts[idx].comments,
                shares: post.shares?.count ?? feedData.posts[idx].shares,
                permalink: post.permalink_url || feedData.posts[idx].permalink
              };
            }
          });
          feedData.lastSyncedAt = new Date().toISOString();
          fs.writeFileSync(FB_POSTS_PATH, JSON.stringify(feedData, null, 2), 'utf8');
        }
      }
    } catch (e) {
      console.error('Facebook Graph sync warning:', e.message);
    }
  }

  return feedData;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.framercms': 'application/octet-stream',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.apk': 'application/vnd.android.package-archive',
};

const imgDir = path.join(ROOT, 'assets/images');
const prefixFileMap = {};
if (fs.existsSync(imgDir)) {
  for (const f of fs.readdirSync(imgDir)) {
    const m = f.match(/^([A-Za-z0-9_-]+)-[0-9a-f]{8}\.[a-zA-Z0-9]+$/);
    if (m) prefixFileMap[m[1]] = path.join(imgDir, f);
  }
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString('utf8');
      if (body.length > 1e6) req.destroy();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (req.method === 'OPTIONS') {
      res.writeHead(204, corsHeaders);
      res.end();
      return;
    }

    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]).replace(/\\/g, '/');

    // Security Gate: Block directory traversal and any non-public internal/PII files from DevTools or HTTP access
    const lowerPath = urlPath.toLowerCase();
    const blockedPrefixes = [
      '/.env',
      '/.git',
      '/.vercel',
      '/scripts/',
      '/pos-src/',
      '/pos-public/',
      '/src/',
      '/node_modules/',
      '/assets/data/bookings',
      '/assets/data/email-notifications',
    ];
    const blockedExact = new Set([
      '/package.json',
      '/package-lock.json',
      '/tsconfig.json',
      '/tailwind.config.js',
      '/postcss.config.js',
      '/vite.config.ts',
      '/vite.pos.config.ts',
      '/vite.widget.config.ts',
      '/agent.md',
      '/readme.md',
    ]);
    if (
      urlPath.includes('..') ||
      blockedPrefixes.some((p) => lowerPath.startsWith(p)) ||
      blockedExact.has(lowerPath) ||
      lowerPath.endsWith('.log') ||
      lowerPath.endsWith('.bak.html')
    ) {
      res.writeHead(403, {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      });
      res.end('403 Forbidden');
      return;
    }

    // API Route 1: Book a Table Submission (GET returns non-PII count only)
    if (urlPath === '/api/bookings') {
      if (req.method === 'GET') {
        const bookings = loadBookings();
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-store',
        });
        res.end(JSON.stringify({
          ok: true,
          count: bookings.length,
        }));
        return;
      }

      if (req.method === 'POST') {
        const payload = await readJsonBody(req);
        const timestamp = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' });
        const fullName = String(payload.name || `${payload.firstName || ''} ${payload.lastName || ''}`).trim().slice(0, 120);
        const booking = {
          timestamp,
          name: fullName || 'Guest',
          email: String(payload.email || '').trim().slice(0, 160),
          phone: String(payload.phone || '').trim().slice(0, 40),
          date: String(payload.date || '').trim().slice(0, 40),
          time: String(payload.time || '').trim().slice(0, 40),
          guests: String(payload.guests || payload.person || '2').trim().slice(0, 16),
          notes: String(payload.notes || payload.orderNotes || '').trim().slice(0, 500)
        };

        const bookings = loadBookings();
        bookings.push(booking);
        const csvContent = saveBookingsAndBuildCsv(bookings);
        const syncResult = await syncBookingsToGoogleSheetAndNotify(booking, csvContent);

        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-store',
        });
        res.end(JSON.stringify({
          ok: true,
          message: `Reservation confirmed for ${booking.name}! Logged to EL Farm Bookings and queued for staff confirmation.`,
          sheetSynced: syncResult.sheetSynced,
          emailDispatched: syncResult.emailDispatched,
        }));
        return;
      }
    }

    // API Route 2: Customer Facebook Slider Feed & Live Auto-Sync
    if (urlPath === '/api/facebook-feed' || urlPath === '/api/facebook-sync') {
      const feedData = await syncFacebookPosts();
      res.writeHead(200, { ...corsHeaders, 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(feedData));
      return;
    }

    // Embedded Cloud POS SPA (/pos and /pos/*)
    if (urlPath === '/pos' || urlPath.startsWith('/pos/')) {
      const exactPosFile = path.join(ROOT, urlPath);
      if (fs.existsSync(exactPosFile) && fs.statSync(exactPosFile).isFile()) {
        urlPath = urlPath;
      } else {
        urlPath = '/pos/index.html';
      }
    } else if (urlPath === '/' || urlPath === '/index') {
      urlPath = '/index.html';
    } else if (urlPath === '/about') {
      urlPath = '/about.html';
    } else if (urlPath === '/menu' || urlPath.startsWith('/menu-categories/')) {
      urlPath = '/menu.html';
    } else if (urlPath === '/blog' || urlPath.startsWith('/blog/')) {
      urlPath = '/blog.html';
    } else if (urlPath === '/download' || urlPath === '/download-app') {
      urlPath = '/download.html';
    } else if (urlPath === '/contact') {
      urlPath = '/contact.html';
    }

    let filePath = path.join(ROOT, urlPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const pubPath = path.join(ROOT, 'public', urlPath);
      if (fs.existsSync(pubPath) && fs.statSync(pubPath).isFile()) {
        filePath = pubPath;
      } else if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (urlPath.startsWith('/assets/images/')) {
        const baseId = path.basename(urlPath).split('.')[0].split('-')[0];
        if (prefixFileMap[baseId] && fs.existsSync(prefixFileMap[baseId])) {
          filePath = prefixFileMap[baseId];
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found: ' + urlPath);
          return;
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found: ' + urlPath);
        return;
      }
    }

    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    const commonHeaders = {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Accept-Ranges': 'bytes',
      'Cache-Control': (ext === '.html' || ext === '.js' || ext === '.json' || urlPath === '/sw.js') ? 'no-cache' : 'public, max-age=3600',
    };
    if (ext === '.apk') {
      commonHeaders['Content-Disposition'] = 'attachment; filename="El-Farm-Cafe-and-Resto.apk"';
    }
    if (urlPath === '/sw.js') {
      commonHeaders['Service-Worker-Allowed'] = '/';
    }

    const pipeFile = (stream) => {
      stream.on('error', () => {
        if (!res.headersSent) res.writeHead(500);
        res.end();
      });
      res.on('close', () => {
        if (!stream.destroyed) stream.destroy();
      });
      stream.pipe(res);
    };

    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = Math.max(0, parseInt(parts[0], 10) || 0);
      const end = parts[1] ? Math.min(stat.size - 1, parseInt(parts[1], 10)) : stat.size - 1;
      const chunksize = Math.max(0, end - start + 1);
      res.writeHead(206, {
        ...commonHeaders,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Content-Length': chunksize,
      });
      pipeFile(fs.createReadStream(filePath, { start, end }));
      return;
    }

    res.writeHead(200, {
      ...commonHeaders,
      'Content-Length': stat.size,
    });
    pipeFile(fs.createReadStream(filePath));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(err));
  }
});

server.listen(PORT, () => {
  console.log(`El Farm Full-Stack Production Server running at http://localhost:${PORT}/`);
  console.log(`Connected Google Sheet: ${GOOGLE_SHEET_URL}`);
  console.log(`Notification Recipient: ${BOOKING_NOTIFICATION_EMAIL}`);
});

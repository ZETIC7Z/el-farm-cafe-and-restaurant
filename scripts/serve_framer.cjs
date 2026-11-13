const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const PORT = Number(process.env.PORT || 5173);

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
};

const imgDir = path.join(ROOT, 'assets/images');
const prefixFileMap = {};
if (fs.existsSync(imgDir)) {
  for (const f of fs.readdirSync(imgDir)) {
    const m = f.match(/^([A-Za-z0-9_-]+)-[0-9a-f]{8}\.[a-zA-Z0-9]+$/);
    if (m) prefixFileMap[m[1]] = path.join(imgDir, f);
  }
}

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
    if (urlPath === '/' || urlPath === '/index') {
      urlPath = '/index.html';
    } else if (urlPath === '/about') {
      urlPath = '/about.html';
    } else if (urlPath === '/menu' || urlPath.startsWith('/menu-categories/')) {
      urlPath = '/menu.html';
    } else if (urlPath === '/blog') {
      urlPath = '/blog.html';
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
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600',
    };

    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = end - start + 1;
      res.writeHead(206, {
        ...commonHeaders,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Content-Length': chunksize,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
      return;
    }

    res.writeHead(200, {
      ...commonHeaders,
      'Content-Length': stat.size,
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(String(err));
  }
});

server.listen(PORT, () => {
  console.log(`El Farm Framer UI server running at http://localhost:${PORT}/`);
});

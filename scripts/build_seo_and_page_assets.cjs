const sharp = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/sharp');
const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const IMG_DIR = path.join(ROOT, 'assets/images');

// Helper to wrap a PNG buffer in a standard ICO header (1 image, 64x64, 32bpp)
function createIcoFromPng(pngBuf, width = 64, height = 64) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 = ICO
  header.writeUInt16LE(1, 4); // Count: 1 image

  const dir = Buffer.alloc(16);
  dir.writeUInt8(width >= 256 ? 0 : width, 0);
  dir.writeUInt8(height >= 256 ? 0 : height, 1);
  dir.writeUInt8(0, 2); // Color palette
  dir.writeUInt8(0, 3); // Reserved
  dir.writeUInt16LE(1, 4); // Color planes
  dir.writeUInt16LE(32, 6); // Bits per pixel
  dir.writeUInt32LE(pngBuf.length, 8); // Size of image data
  dir.writeUInt32LE(22, 12); // Offset of image data (6 + 16)

  return Buffer.concat([header, dir, pngBuf]);
}

(async () => {
  const logoSrc = path.join(ROOT, 'public/assets/logo/logo.jpg');

  // 1. Create clean circular El Farm emblem with gold ring for Favicon & Apple Touch Icon
  const rawLogo64 = await sharp(logoSrc)
    .resize(64, 64, { fit: 'cover' })
    .png()
    .toBuffer();

  const circleMask64 = Buffer.from(
    `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#fff"/>
    </svg>`
  );
  const ringOverlay64 = Buffer.from(
    `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30.5" fill="none" stroke="#EFC9A4" stroke-width="2.2"/>
    </svg>`
  );

  const favicon64Png = await sharp(rawLogo64)
    .composite([
      { input: circleMask64, blend: 'dest-in' },
      { input: ringOverlay64, blend: 'over' },
    ])
    .png()
    .toBuffer();

  const icoBuf = createIcoFromPng(favicon64Png, 64, 64);
  fs.writeFileSync(path.join(ROOT, 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(ROOT, 'public/favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(IMG_DIR, 'favicon.ico'), icoBuf);

  const favicon32Png = await sharp(favicon64Png).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(IMG_DIR, 'favicon-32x32.png'), favicon32Png);
  fs.writeFileSync(path.join(ROOT, 'favicon-32x32.png'), favicon32Png);

  // 192x192 & 180x180 icons
  const rawLogo192 = await sharp(logoSrc).resize(192, 192, { fit: 'cover' }).png().toBuffer();
  const circleMask192 = Buffer.from(
    `<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
      <circle cx="96" cy="96" r="92" fill="#fff"/>
    </svg>`
  );
  const ringOverlay192 = Buffer.from(
    `<svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
      <circle cx="96" cy="96" r="93" fill="none" stroke="#EFC9A4" stroke-width="4"/>
    </svg>`
  );
  const favicon192Png = await sharp(rawLogo192)
    .composite([
      { input: circleMask192, blend: 'dest-in' },
      { input: ringOverlay192, blend: 'over' },
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(IMG_DIR, 'favicon-192x192.png'), favicon192Png);
  const apple180Png = await sharp(favicon192Png).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(IMG_DIR, 'apple-touch-icon.png'), apple180Png);
  fs.writeFileSync(path.join(ROOT, 'apple-touch-icon.png'), apple180Png);

  // Also overwrite legacy Framer favicon filenames in assets/images/
  const b64Favicon = favicon64Png.toString('base64');
  const faviconSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64"><image href="data:image/png;base64,${b64Favicon}" x="0" y="0" width="64" height="64"/></svg>`;
  for (const f of fs.readdirSync(IMG_DIR)) {
    if (f.startsWith('b2c2278587c942f9217d9a7b5fb2ac2297fb66c0')) {
      fs.writeFileSync(path.join(IMG_DIR, f), faviconSvgContent, 'utf8');
    } else if (f.startsWith('1092045b9d1ac8fd9f282a6bd6fb8fa9bf5fa0ad') || f.startsWith('4961a991c7d14d2fd6ef22fbbeaccdab3fb1ca71')) {
      fs.writeFileSync(path.join(IMG_DIR, f), favicon192Png);
    }
  }
  console.log('Generated favicon.ico, favicon-32x32.png, favicon-192x192.png, and apple-touch-icon.png!');

  // 2. Generate 1200x630 OpenGraph Social Share Image (og-cover-elfarm.jpg)
  const bgArchway = await sharp(path.join(ROOT, 'public/assets/resto-views/resto-1.jpg'))
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.72, saturation: 1.12 })
    .toBuffer();

  const b64Logo192 = favicon192Png.toString('base64');
  const ogOverlaySvg = Buffer.from(
    `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0B1315" stop-opacity="0.88"/>
          <stop offset="55%" stop-color="#0B1315" stop-opacity="0.65"/>
          <stop offset="100%" stop-color="#0F1D22" stop-opacity="0.88"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bgGrad)"/>
      <rect x="28" y="28" width="1144" height="574" fill="none" stroke="#EFC9A4" stroke-opacity="0.38" stroke-width="2"/>
      <image href="data:image/png;base64,${b64Logo192}" x="520" y="72" width="160" height="160"/>
      <text x="600" y="295" text-anchor="middle" fill="#EFC9A4" font-family="Georgia, 'Times New Roman', serif" font-size="54" font-weight="bold" letter-spacing="2">EL FARM CAFE &amp; RESTAURANT</text>
      <text x="600" y="348" text-anchor="middle" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="22" letter-spacing="6">ESCAPE THE ORDINARY · LAMITAN CITY, BASILAN</text>
      <line x1="420" y1="382" x2="780" y2="382" stroke="#EFC9A4" stroke-opacity="0.5" stroke-width="1.5"/>
      <text x="600" y="430" text-anchor="middle" fill="#E5E7EB" font-family="Georgia, serif" font-size="24" font-style="italic">Specialty Coffee · Ceremonial Matcha · Heirloom Basilan Cuisine · Night Pickleball</text>
      <rect x="280" y="472" width="640" height="54" fill="#0F1D22" stroke="#EFC9A4" stroke-width="1.8"/>
      <text x="600" y="506" text-anchor="middle" fill="#EFC9A4" font-family="Arial, sans-serif" font-size="17" font-weight="bold" letter-spacing="3">OPEN DAILY 9:00 AM – 9:00 PM · 0917 182 9876</text>
    </svg>`
  );

  await sharp(bgArchway)
    .composite([{ input: ogOverlaySvg, blend: 'over' }])
    .jpeg({ quality: 94, chromaSubsampling: '4:4:4' })
    .toFile(path.join(IMG_DIR, 'og-cover-elfarm.jpg'));
  fs.copyFileSync(path.join(IMG_DIR, 'og-cover-elfarm.jpg'), path.join(ROOT, 'public/assets/logo/og-cover-elfarm.jpg'));
  console.log('Generated 1200x630 OpenGraph preview card: assets/images/og-cover-elfarm.jpg');

  // 3. Replace all /about, /blog, and /contact Framer stock images with Ultra-HD El Farm images
  const pageImageMappings = [
    // About page Banner & Journey & Chef images
    { prefix: '2xh8WnqDGhMUrwHlrwSqLrvKI7A', src: 'public/assets/resto-views/resto-1.jpg', w: 1600, h: 1000 },
    { prefix: '1koQJbZb7xfDc5aFxDqcFJbpaQQ', src: 'public/assets/menu/crop-seafood-bilao-round.jpg', w: 900, h: 900 },
    { prefix: 'wXTaZJVHaEnKDLdFV6x01YY6z6E', src: 'public/assets/resto-views/resto-2.jpg', w: 1200, h: 900 },
    { prefix: 'OuGE1AOr5ExxFgl7DC0CJoqVHQ', src: 'public/assets/resto-views/resto-5.jpg', w: 1200, h: 900 },
    { prefix: '3pz9AoUUN7lH2MexyxoigMikeY', src: 'public/assets/customers/customer-1.jpg', w: 400, h: 400 },
    { prefix: 'Og6wm9bF7WFlcPqTwc9DhZBr18', src: 'public/assets/customers/customer-3.jpg', w: 400, h: 400 },
    { prefix: 'hCKJZm7IXK9FBWGZYr01VyVm8s', src: 'public/assets/customers/customer-7.jpg', w: 400, h: 400 },
    { prefix: 'CPNDlK7soukGFOKHhg7ft7UfZg', src: 'public/assets/resto-views/resto-6.jpg', w: 900, h: 1100 },
    { prefix: 'mbWmer1JTp02g6LbsnpEzWidY0M', src: 'public/assets/resto-views/resto-3.jpg', w: 900, h: 1100 },
    // Blog page additional cards (cards 4, 5, 6)
    { prefix: 'VW9jfrMKGnJvAPcIFeHDQUA44', src: 'public/assets/resto-views/resto-1.jpg', w: 1200, h: 900 },
    { prefix: '1brzvnX6w5uxGnawGF8WYYY70I', src: 'public/assets/resto-views/resto-4.jpg', w: 1200, h: 900 },
    { prefix: 'XiDCr6H0L2pzCdbVT0MuAVtBLM', src: 'public/assets/resto-views/resto-5.jpg', w: 1200, h: 900 },
    // Customer ticker fallback filenames on /about and /contact
    { prefix: 'QfXBkxDk87rEbKy5cw2o64UQLAQ', src: 'public/assets/customers/customer-1.jpg', w: 1200, h: 1600 },
    { prefix: 'hiNeoaKMSYN3o61ubbqvZiVMDV4', src: 'public/assets/customers/customer-2.jpg', w: 1200, h: 1600 },
    { prefix: '3qT3tiVsykluAVRvQgfGJShrOIo', src: 'public/assets/customers/customer-3.jpg', w: 1200, h: 1600 },
    { prefix: 'N3CmRCOHbi2U5i8ZdyKwT1hnb8', src: 'public/assets/customers/customer-4.jpg', w: 1200, h: 1600 },
    { prefix: 'N4BnuUFWRK7SMEytgtSpvpU8AZ0', src: 'public/assets/customers/customer-5.jpg', w: 1200, h: 1600 },
  ];

  const allImgFiles = fs.readdirSync(IMG_DIR);
  for (const item of pageImageMappings) {
    const srcFull = path.join(ROOT, item.src);
    if (!fs.existsSync(srcFull)) continue;

    // Find any hashed files matching prefix in assets/images
    const matches = allImgFiles.filter(f => f.startsWith(item.prefix));
    for (const mFile of matches) {
      const destPath = path.join(IMG_DIR, mFile);
      const ext = path.extname(mFile).toLowerCase();
      let pipeline = sharp(srcFull)
        .resize(item.w, item.h, { fit: 'cover', position: 'center', kernel: sharp.kernel.lanczos3 })
        .sharpen({ sigma: 0.9 });
      if (ext === '.avif') {
        await pipeline.avif({ quality: 90 }).toFile(destPath);
      } else if (ext === '.webp') {
        await pipeline.webp({ quality: 94 }).toFile(destPath);
      } else if (ext === '.png') {
        await pipeline.png({ compressionLevel: 8 }).toFile(destPath);
      } else {
        await pipeline.jpeg({ quality: 94 }).toFile(destPath);
      }
    }
    // Also save unhashed .png / .jpg fallback in assets/images
    await sharp(srcFull)
      .resize(item.w, item.h, { fit: 'cover', position: 'center', kernel: sharp.kernel.lanczos3 })
      .sharpen({ sigma: 0.9 })
      .jpeg({ quality: 94 })
      .toFile(path.join(IMG_DIR, `${item.prefix}.png`));
  }

  console.log('Replaced all /about, /blog, and /contact stock images with Ultra-HD El Farm photography!');
})();

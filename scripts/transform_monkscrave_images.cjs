const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/sharp');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const MENU_DIR = path.join(ROOT, 'public/assets/menu');
const CUST_DIR = path.join(ROOT, 'public/assets/customers');
const RESTO_DIR = path.join(ROOT, 'public/assets/resto-views');
const LOGO_DIR = path.join(ROOT, 'public/assets/logo');
const OUT_IMAGES = path.join(ROOT, 'assets/images');

// 1. Create circular alpha-masked bowl image with subtle warm gold rim
async function createCircularBowl(srcFile, width, height, outPaths) {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.465;

  // Mask: white circle with slight 3px feather
  const maskSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="white" stop-opacity="1"/>
          <stop offset="91%" stop-color="white" stop-opacity="1"/>
          <stop offset="93.5%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>`
  );

  // Subtle dark-gold rim & drop shadow ring
  const rimSvg = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${cx}" cy="${cy}" r="${r - 2}" fill="none" stroke="#EFC9A4" stroke-width="${Math.max(4, Math.round(width * 0.006))}" stroke-opacity="0.55"/>
      <circle cx="${cx}" cy="${cy}" r="${r - Math.round(width * 0.015)}" fill="none" stroke="#0B1315" stroke-width="${Math.max(2, Math.round(width * 0.003))}" stroke-opacity="0.35"/>
    </svg>`
  );

  const baseBuf = await sharp(srcFile)
    .resize(width, height, {
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
    })
    .modulate({ brightness: 1.03, saturation: 1.08 })
    .sharpen({ sigma: 0.95, m1: 0.8, m2: 1.6 })
    .ensureAlpha()
    .composite([
      { input: rimSvg, blend: 'over' },
      { input: maskSvg, blend: 'dest-in' },
    ])
    .png()
    .toBuffer();

  for (const outFile of outPaths) {
    const ext = path.extname(outFile).toLowerCase();
    const fullOut = path.join(OUT_IMAGES, outFile);
    if (ext === '.avif') {
      await sharp(baseBuf).avif({ quality: 90, effort: 4 }).toFile(fullOut);
    } else if (ext === '.webp') {
      await sharp(baseBuf).webp({ quality: 95, alphaQuality: 100 }).toFile(fullOut);
    } else {
      await sharp(baseBuf).png({ compressionLevel: 6 }).toFile(fullOut);
    }
    console.log('  [Hero Bowl]', outFile, `${width}x${height}`);
  }
}

// 2. Create Ultra-HD rectangular/square image in multiple target formats
async function writeUhdImage(srcFile, width, height, outFiles, pos = 'centre') {
  const pipeline = sharp(srcFile)
    .resize(width, height, {
      fit: 'cover',
      position: pos,
      kernel: sharp.kernel.lanczos3,
    })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 0.85, m1: 0.8, m2: 1.5 });

  const rawBuf = await pipeline.png().toBuffer();

  for (const outFile of outFiles) {
    const ext = path.extname(outFile).toLowerCase();
    const fullOut = path.join(OUT_IMAGES, outFile);
    if (ext === '.avif') {
      await sharp(rawBuf).avif({ quality: 90, effort: 4 }).toFile(fullOut);
    } else if (ext === '.webp') {
      await sharp(rawBuf).webp({ quality: 95 }).toFile(fullOut);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(rawBuf).jpeg({ quality: 95, chromaSubsampling: '4:4:4', mozjpeg: true }).toFile(fullOut);
    } else {
      await sharp(rawBuf).png({ compressionLevel: 6 }).toFile(fullOut);
    }
    console.log('  [UHD Image]', outFile, `${width}x${height}`);
  }
}

// 3. Generate Brand Logo SVGs & Favicons from official logo.jpg (converting black bg to transparent gold emblem)
async function generateBrandLogos() {
  const logoPath = path.join(LOGO_DIR, 'logo.jpg');
  const { data, info } = await sharp(logoPath)
    .resize(512, 512, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Convert black background to transparent while keeping gold emblem crisp & bright (#EFC9A4 / #E5A93C)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = Math.max(r, g, b);
    if (lum < 22) {
      data[i + 3] = 0;
    } else {
      const alpha = Math.min(255, Math.round((lum - 18) * 1.45));
      // Warm gold-peach tint matching Framer's #EFC9A4
      data[i] = Math.min(255, Math.round(r * 1.08));
      data[i + 1] = Math.min(255, Math.round(g * 1.06));
      data[i + 2] = Math.min(255, Math.round(b * 1.05));
      data[i + 3] = alpha;
    }
  }

  const transparentLogoPng = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .sharpen({ sigma: 0.8 })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(OUT_IMAGES, 'elfarm-logo-transparent.png'), transparentLogoPng);
  const b64 = transparentLogoPng.toString('base64');

  // Navbar SVG (width="88" height="64") — make circular emblem large & ultra crisp
  const navSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="64" viewBox="0 0 88 64" fill="none">
  <circle cx="44" cy="32" r="30" fill="#0B1315" fill-opacity="0.85" stroke="#EFC9A4" stroke-width="1.2" stroke-opacity="0.5"/>
  <image href="data:image/png;base64,${b64}" x="12" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

  for (const f of ['9EbxgnnItr5IyHLUac9iSjrocis-64b569cd.svg', '9EbxgnnItr5IyHLUac9iSjrocis.svg']) {
    fs.writeFileSync(path.join(OUT_IMAGES, f), navSvg, 'utf8');
    console.log('  [Navbar Logo SVG]', f);
  }

  // Footer SVG (width="150" height="112")
  const footerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="112" viewBox="0 0 150 112" fill="none">
  <circle cx="75" cy="56" r="53" fill="#0B1315" fill-opacity="0.9" stroke="#EFC9A4" stroke-width="1.5" stroke-opacity="0.55"/>
  <image href="data:image/png;base64,${b64}" x="19" y="0" width="112" height="112" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

  for (const f of ['BclDGK0X1lf3PSEPNLrO280vsA-8e0fe687.svg', 'BclDGK0X1lf3PSEPNLrO280vsA.svg']) {
    fs.writeFileSync(path.join(OUT_IMAGES, f), footerSvg, 'utf8');
    console.log('  [Footer Logo SVG]', f);
  }

  // Favicons (64x64)
  const favBuf = await sharp(logoPath)
    .resize(64, 64, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  for (const f of ['W9kkqhMkOQdLjPhImluP8KmaLE-dedca56a.png', 'W9kkqhMkOQdLjPhImluP8KmaLE.png']) {
    fs.writeFileSync(path.join(OUT_IMAGES, f), favBuf);
  }
}

async function generateTestimonialAvatarSvg(srcFile, outSvgFiles) {
  const buf = await sharp(srcFile)
    .resize(256, 256, { fit: 'cover', position: 'attention', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 94 })
    .toBuffer();
  const b64 = buf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
  <defs>
    <clipPath id="c"><circle cx="40" cy="40" r="39"/></clipPath>
  </defs>
  <g clip-path="url(#c)">
    <image href="data:image/jpeg;base64,${b64}" x="0" y="0" width="80" height="80" preserveAspectRatio="xMidYMid slice"/>
  </g>
  <circle cx="40" cy="40" r="39" stroke="#EFC9A4" stroke-width="1.5" stroke-opacity="0.4"/>
</svg>`;
  for (const f of outSvgFiles) {
    fs.writeFileSync(path.join(OUT_IMAGES, f), svg, 'utf8');
    console.log('  [Avatar SVG]', f);
  }
}

async function run() {
  console.log('=== STEP 2: Replacing All Framer Clone Images at Ultra-HD ===');

  // 1. Brand Logos & Favicons
  await generateBrandLogos();

  // 2. Hero Circular Cutout Bowls (with alpha mask)
  await createCircularBowl(
    path.join(MENU_DIR, 'crop-tinola-clean.jpg'),
    1845,
    1825,
    ['r1buuQ3PjFpdDV70OBtJahkGk-3d0f5863.avif', 'r1buuQ3PjFpdDV70OBtJahkGk.webp']
  );
  await createCircularBowl(
    path.join(MENU_DIR, 'crop-pinoy-bilao.jpg'),
    1340,
    1317,
    ['89U3OUUG1H7iWBCxQnqp77Ullc-520d2c95.avif', '89U3OUUG1H7iWBCxQnqp77Ullc.png']
  );
  await createCircularBowl(
    path.join(MENU_DIR, 'crop-sizzling-sisig.jpg'),
    1056,
    1057,
    ['CpTRnnQgJsG1yUk8t8GcoKvmI-4dbeae2c.avif', 'CpTRnnQgJsG1yUk8t8GcoKvmI.png']
  );

  // 3. Original Menu Card Images (upgraded to 900x900 Ultra-HD)
  await writeUhdImage(
    path.join(MENU_DIR, 'crop-crispy-pata.jpg'),
    900,
    900,
    ['AvBMxfABr1rynfnaeNp3UnXUFI4-62f7b04c.avif', 'AvBMxfABr1rynfnaeNp3UnXUFI4.png']
  );
  await writeUhdImage(
    path.join(MENU_DIR, 'crop-seafood-bilao-round.jpg'),
    900,
    900,
    ['CBgNiEhjs18VYIIUJ4cpwLikXc-c391ad6d.avif', 'CBgNiEhjs18VYIIUJ4cpwLikXc.png']
  );
  await writeUhdImage(
    path.join(MENU_DIR, 'crop-coconut-matcha-clean.jpg'),
    900,
    900,
    ['lfILwFRnauLujF02Phxk22TB8MY-6b07943e.avif', 'lfILwFRnauLujF02Phxk22TB8MY.png']
  );
  await writeUhdImage(
    path.join(MENU_DIR, 'crop-tiyula-itum.jpg'),
    900,
    900,
    ['Jzc1vfDXBXBHNYHAbZCWpYK6fk-03bea820.avif', 'Jzc1vfDXBXBHNYHAbZCWpYK6fk.png']
  );
  await writeUhdImage(
    path.join(MENU_DIR, 'crop-bone-marrow-clean.jpg'),
    900,
    900,
    ['eP7teFsVW9rNtPP5aGnEtOrA7Qs-14c17a78.avif', 'eP7teFsVW9rNtPP5aGnEtOrA7Qs.png']
  );
  await writeUhdImage(
    path.join(MENU_DIR, 'crop-popcorn-latte.jpg'),
    900,
    900,
    ['D7nXQN03yxNmwK2rS610UZJ0ClA-88fbeb93.avif', 'D7nXQN03yxNmwK2rS610UZJ0ClA.png']
  );

  // 4. Content Section ("Refined Taste, Exceptional Feel") -> El Farm Twilight Archway at 2x Retina (1368x2048)
  await writeUhdImage(
    path.join(RESTO_DIR, 'resto-1.jpg'),
    1368,
    2048,
    ['UDBAh9VKVLzkggfpg8wc0kII00c-27879a26.avif', 'UDBAh9VKVLzkggfpg8wc0kII00c.jpg']
  );

  // 5. Video / Ambiance Section Poster (3024x1296) -> Starlight Lawn & Canopies (resto-4.jpg)
  await writeUhdImage(
    path.join(RESTO_DIR, 'resto-4.jpg'),
    3024,
    1296,
    ['4PjilTDUcFB5ATr4mRqz9EVok-9b21a399.avif', '4PjilTDUcFB5ATr4mRqz9EVok.png']
  );

  // 6. Testimonial Avatars
  await generateTestimonialAvatarSvg(
    path.join(CUST_DIR, 'customer-12.jpg'),
    ['plpy62rbpDgvpW2bS3s0S06nFs-ab6072dd.svg', 'plpy62rbpDgvpW2bS3s0S06nFs.svg']
  );
  await writeUhdImage(
    path.join(CUST_DIR, 'customer-6.jpg'),
    512,
    512,
    ['3mFckv99KkdCNazIHtCn1DjaSsM-c765ab41.avif', '3mFckv99KkdCNazIHtCn1DjaSsM.webp'],
    'attention'
  );
  await writeUhdImage(
    path.join(CUST_DIR, 'customer-11.jpg'),
    512,
    512,
    ['rCIwinNRdwz0pYsm0e9Sjg1iam8-ffd381db.avif', 'rCIwinNRdwz0pYsm0e9Sjg1iam8.webp'],
    'attention'
  );

  // 7. ALL 16 Customer Photos at Ultra-HD 1200x1600 (3:4 aspect ratio, Lanczos3 + sharpening) for the Sliding Strip
  console.log('=== Processing all 16 Customer Photos at Ultra-HD 1200x1600 ===');
  for (let i = 1; i <= 16; i++) {
    const srcCust = path.join(CUST_DIR, `customer-${i}.jpg`);
    await writeUhdImage(
      srcCust,
      1200,
      1600,
      [`customer-hd-${i}.webp`, `customer-hd-${i}.jpg`],
      'attention'
    );
  }

  // Also overwrite the 5 original sliding strip image files at 1200x1600 Ultra-HD
  await writeUhdImage(
    path.join(CUST_DIR, 'customer-1.jpg'),
    1200,
    1600,
    ['QfXBkxDk87rEbKy5cw2o64UQLAQ-a22ba4a7.avif', 'QfXBkxDk87rEbKy5cw2o64UQLAQ.png'],
    'attention'
  );
  await writeUhdImage(
    path.join(CUST_DIR, 'customer-2.jpg'),
    1200,
    1600,
    ['hiNeoaKMSYN3o61ubbqvZiVMDV4-b474e2ce.avif', 'hiNeoaKMSYN3o61ubbqvZiVMDV4.png'],
    'attention'
  );
  await writeUhdImage(
    path.join(CUST_DIR, 'customer-4.jpg'),
    1200,
    1600,
    ['3qT3tiVsykluAVRvQgfGJShrOIo-ba949590.avif', '3qT3tiVsykluAVRvQgfGJShrOIo.png'],
    'attention'
  );
  await writeUhdImage(
    path.join(CUST_DIR, 'customer-6.jpg'),
    1200,
    1600,
    ['N3CmRCOHbi2U5i8ZdyKwT1hnb8-81fbf561.avif', 'N3CmRCOHbi2U5i8ZdyKwT1hnb8.png'],
    'attention'
  );
  await writeUhdImage(
    path.join(CUST_DIR, 'customer-12.jpg'),
    1200,
    1600,
    ['N4BnuUFWRK7SMEytgtSpvpU8AZ0-fa3b3192.avif', 'N4BnuUFWRK7SMEytgtSpvpU8AZ0.png'],
    'attention'
  );

  // 8. 3 Blog / Resto Showcase Cards (1200x1600 Ultra-HD) + All 8 Resto Views at Ultra-HD
  await writeUhdImage(
    path.join(RESTO_DIR, 'resto-3.jpg'),
    1200,
    1600,
    ['RMRNTfOzx5SKsElm7QqEhd4LSOk-380b3b26.avif', 'RMRNTfOzx5SKsElm7QqEhd4LSOk.png']
  );
  await writeUhdImage(
    path.join(RESTO_DIR, 'resto-4.jpg'),
    1200,
    1600,
    ['tOaLCvpOcZyAWdDImLbzOTOhI-3c606027.avif', 'tOaLCvpOcZyAWdDImLbzOTOhI.png']
  );
  await writeUhdImage(
    path.join(RESTO_DIR, 'resto-5.jpg'),
    1200,
    1600,
    ['Y1yOAhXr4jJN5uIPLyBGGR7JMA-5b08f87d.avif', 'Y1yOAhXr4jJN5uIPLyBGGR7JMA.png']
  );

  for (let i = 1; i <= 8; i++) {
    const srcResto = path.join(RESTO_DIR, `resto-${i}.jpg`);
    await writeUhdImage(srcResto, 1400, 1050, [`resto-hd-${i}.webp`]);
  }

  // 9. Weekly Newsletter / Footer Banner (2048x446) -> Main Café Pavilion at Dusk (resto-2.jpg)
  await writeUhdImage(
    path.join(RESTO_DIR, 'resto-2.jpg'),
    2048,
    446,
    ['ejUa9RcHAoqxoyIcExDwLQhOyfg-6227d616.avif', 'ejUa9RcHAoqxoyIcExDwLQhOyfg.png']
  );

  console.log('=== ALL FRAMER CLONE IMAGES REPLACED AT ULTRA-HD! ===');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

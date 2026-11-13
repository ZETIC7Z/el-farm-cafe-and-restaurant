const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/sharp');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const MENU_DIR = path.join(ROOT, 'public/assets/menu');
const CUST_DIR = path.join(ROOT, 'public/assets/customers');
const RESTO_DIR = path.join(ROOT, 'public/assets/resto-views');
const LOGO_DIR = path.join(ROOT, 'public/assets/logo');
const OUT_IMAGES = path.join(ROOT, 'assets/images');
const OUT_MENU = path.join(ROOT, 'assets/menu');

fs.mkdirSync(OUT_IMAGES, { recursive: true });
fs.mkdirSync(OUT_MENU, { recursive: true });

// Helper to crop by normalized [left, top, width, height] (0..1) and output Ultra-HD square or target dimensions
async function cropNormalized(srcFile, normBox, outPath, targetW = 900, targetH = 900, fitMode = 'cover', bgHex = '#0F1D22') {
  const meta = await sharp(srcFile).metadata();
  const left = Math.max(0, Math.round(meta.width * normBox[0]));
  const top = Math.max(0, Math.round(meta.height * normBox[1]));
  const width = Math.min(meta.width - left, Math.round(meta.width * normBox[2]));
  const height = Math.min(meta.height - top, Math.round(meta.height * normBox[3]));

  await sharp(srcFile)
    .extract({ left, top, width, height })
    .resize(targetW, targetH, {
      fit: fitMode,
      position: 'centre',
      background: bgHex,
      kernel: sharp.kernel.lanczos3,
    })
    .modulate({ brightness: 1.02, saturation: 1.06 })
    .sharpen({ sigma: 0.9, m1: 0.8, m2: 1.6 })
    .jpeg({ quality: 95, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(outPath);

  if (outPath.startsWith(path.normalize(MENU_DIR))) {
    const base = path.basename(outPath);
    fs.copyFileSync(outPath, path.join(OUT_MENU, base));
  }
}

async function writeCustomerTickerFile(srcFile, width, height, outFiles) {
  const buf = await sharp(srcFile)
    .resize(width, height, {
      fit: 'cover',
      position: 'attention',
      kernel: sharp.kernel.lanczos3,
    })
    .modulate({ brightness: 1.02, saturation: 1.05 })
    .sharpen({ sigma: 0.85, m1: 0.8, m2: 1.5 })
    .png()
    .toBuffer();

  for (const f of outFiles) {
    const full = path.join(OUT_IMAGES, f);
    const ext = path.extname(f).toLowerCase();
    if (ext === '.avif') {
      await sharp(buf).avif({ quality: 90, effort: 4 }).toFile(full);
    } else if (ext === '.webp') {
      await sharp(buf).webp({ quality: 95 }).toFile(full);
    } else {
      await sharp(buf).png({ compressionLevel: 6 }).toFile(full);
    }
  }
}

async function generateCleanBrandLogos() {
  console.log('=== Generating Clean Brand Logo SVGs (88x64 and 150x112) ===');
  const logoPath = path.join(LOGO_DIR, 'logo.jpg');

  // Resize full square logo.jpg to 800x800 first so we can radially mask out the outer double circle (r > 325)
  const { data: fullData, info: fullInfo } = await sharp(logoPath)
    .resize(800, 800, { fit: 'cover', kernel: sharp.kernel.lanczos3 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cx = 400;
  const cy = 400;
  const maxR = 322; // strictly inside the outer double ring (which is at r=350..385)
  for (let y = 0; y < fullInfo.height; y++) {
    for (let x = 0; x < fullInfo.width; x++) {
      const idx = (y * fullInfo.width + x) * 4;
      const dist = Math.hypot(x - cx, y - cy);
      const r = fullData[idx];
      const g = fullData[idx + 1];
      const b = fullData[idx + 2];
      const lum = Math.max(r, g, b);
      if (dist > maxR || lum < 28) {
        fullData[idx + 3] = 0;
      } else {
        const alpha = Math.min(255, Math.round((lum - 24) * 1.65));
        fullData[idx] = Math.min(255, Math.round(r * 1.12));
        fullData[idx + 1] = Math.min(255, Math.round(g * 1.08));
        fullData[idx + 2] = Math.min(255, Math.round(b * 1.06));
        fullData[idx + 3] = alpha;
      }
    }
  }

  // Now extract just the EL + Botanical Leaf Branch (x: 165..675, y: 95..465) with zero outer ring fragments
  const emblemPng = await sharp(fullData, {
    raw: { width: fullInfo.width, height: fullInfo.height, channels: 4 },
  })
    .extract({ left: 165, top: 95, width: 510, height: 370 })
    .resize(440, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.85 })
    .png()
    .toBuffer();

  const b64 = emblemPng.toString('base64');

  // 1. Navbar Logo (88 x 64)
  const navSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="64" viewBox="0 0 88 64" fill="none">
  <image href="data:image/png;base64,${b64}" x="11" y="0" width="66" height="45" preserveAspectRatio="xMidYMid meet"/>
  <text x="44" y="54.5" text-anchor="middle" fill="#EFC9A4" font-family="'Cormorant Garamond', 'Playfair Display', Georgia, serif" font-size="13.5" font-weight="700" letter-spacing="2.4">EL FARM</text>
  <text x="44" y="62.5" text-anchor="middle" fill="#E5A666" font-family="'Jost', 'Plus Jakarta Sans', sans-serif" font-size="5.6" font-weight="600" letter-spacing="1.7">CAFÉ &amp; RESTO</text>
</svg>`;

  for (const name of ['9EbxgnnItr5IyHLUac9iSjrocis-64b569cd.svg', '9EbxgnnItr5IyHLUac9iSjrocis.svg']) {
    fs.writeFileSync(path.join(OUT_IMAGES, name), navSvg, 'utf8');
  }

  // 2. Footer Logo (150 x 112)
  const footerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="112" viewBox="0 0 150 112" fill="none">
  <image href="data:image/png;base64,${b64}" x="18" y="0" width="114" height="76" preserveAspectRatio="xMidYMid meet"/>
  <text x="75" y="93" text-anchor="middle" fill="#EFC9A4" font-family="'Cormorant Garamond', 'Playfair Display', Georgia, serif" font-size="22" font-weight="700" letter-spacing="4.2">EL FARM</text>
  <line x1="28" y1="98" x2="122" y2="98" stroke="#EFC9A4" stroke-opacity="0.35" stroke-width="0.8"/>
  <text x="75" y="108.5" text-anchor="middle" fill="#E5A666" font-family="'Jost', 'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="600" letter-spacing="3.2">CAFÉ &amp; RESTO</text>
</svg>`;

  for (const name of ['BclDGK0X1lf3PSEPNLrO280vsA-8e0fe687.svg', 'BclDGK0X1lf3PSEPNLrO280vsA.svg']) {
    fs.writeFileSync(path.join(OUT_IMAGES, name), footerSvg, 'utf8');
  }

  console.log('Clean Brand Logo SVGs generated!');
}

async function run() {
  await generateCleanBrandLogos();

  console.log('=== Generating Precision Ultra-HD Dish Crops (Zero Text Overlap) ===');

  const bPork = path.join(MENU_DIR, 'board-pork.jpg');
  await cropNormalized(bPork, [0.032, 0.306, 0.510, 0.214], path.join(MENU_DIR, 'crop-sizzling-sisig.jpg'));
  await cropNormalized(bPork, [0.032, 0.529, 0.510, 0.222], path.join(MENU_DIR, 'crop-crispy-pata.jpg'));
  await cropNormalized(bPork, [0.032, 0.761, 0.510, 0.214], path.join(MENU_DIR, 'crop-dinuguan.jpg'));

  const bNonPork = path.join(MENU_DIR, 'board-nonpork.jpg');
  await cropNormalized(bNonPork, [0.030, 0.223, 0.304, 0.149], path.join(MENU_DIR, 'crop-papaitan.jpg'));
  await cropNormalized(bNonPork, [0.346, 0.223, 0.306, 0.149], path.join(MENU_DIR, 'crop-crispy-hito.jpg'));
  await cropNormalized(bNonPork, [0.664, 0.223, 0.304, 0.149], path.join(MENU_DIR, 'crop-karekare-hito.jpg'));

  await cropNormalized(bNonPork, [0.030, 0.480, 0.304, 0.149], path.join(MENU_DIR, 'crop-chicken-kaliya.jpg'));
  await cropNormalized(bNonPork, [0.346, 0.480, 0.306, 0.149], path.join(MENU_DIR, 'crop-tinola-pot.jpg'));
  await cropNormalized(bNonPork, [0.664, 0.480, 0.304, 0.149], path.join(MENU_DIR, 'crop-tiyula-itum.jpg'));

  await cropNormalized(bNonPork, [0.030, 0.724, 0.304, 0.132], path.join(MENU_DIR, 'crop-adobing.jpg'));
  await cropNormalized(bNonPork, [0.346, 0.724, 0.306, 0.132], path.join(MENU_DIR, 'crop-chicken-sisig.jpg'));
  await cropNormalized(bNonPork, [0.664, 0.724, 0.304, 0.132], path.join(MENU_DIR, 'crop-bangus-sisig.jpg'));

  const bEveryday = path.join(MENU_DIR, 'board-everyday.jpg');
  await cropNormalized(bEveryday, [0.042, 0.209, 0.449, 0.172], path.join(MENU_DIR, 'crop-hotsilog.jpg'));
  await cropNormalized(bEveryday, [0.511, 0.209, 0.447, 0.172], path.join(MENU_DIR, 'crop-tapsilog.jpg'));
  await cropNormalized(bEveryday, [0.042, 0.464, 0.449, 0.151], path.join(MENU_DIR, 'crop-sisigsilog.jpg'));
  await cropNormalized(bEveryday, [0.511, 0.464, 0.447, 0.151], path.join(MENU_DIR, 'crop-samyang-wrap.jpg'));
  await cropNormalized(bEveryday, [0.036, 0.698, 0.535, 0.206], path.join(MENU_DIR, 'crop-goto-overload.jpg'));

  const bFeasts = path.join(MENU_DIR, 'board-feasts.jpg');
  await cropNormalized(bFeasts, [0.038, 0.176, 0.474, 0.187], path.join(MENU_DIR, 'crop-pinoy-bilao.jpg'));
  await cropNormalized(bFeasts, [0.038, 0.375, 0.474, 0.164], path.join(MENU_DIR, 'crop-seafood-bilao-round.jpg'));
  await cropNormalized(bFeasts, [0.025, 0.554, 0.237, 0.125], path.join(MENU_DIR, 'crop-chicken-bilao.jpg'));
  await cropNormalized(bFeasts, [0.539, 0.554, 0.228, 0.125], path.join(MENU_DIR, 'crop-pancit-miki-bowl.jpg'));
  await cropNormalized(bFeasts, [0.020, 0.731, 0.244, 0.155], path.join(MENU_DIR, 'crop-chicken-miki-combo.jpg'));
  await cropNormalized(bFeasts, [0.509, 0.731, 0.244, 0.155], path.join(MENU_DIR, 'crop-combo-feast.jpg'));

  // Drinks Board: tighter crops on the 3 cups so the green "NEW" corner tag is completely excluded
  const bDrinks = path.join(MENU_DIR, 'board-drinks.jpg');
  await cropNormalized(bDrinks, [0.494, 0.202, 0.235, 0.214], path.join(MENU_DIR, 'crop-popcorn-latte.jpg'));
  await cropNormalized(bDrinks, [0.494, 0.448, 0.235, 0.200], path.join(MENU_DIR, 'crop-smores-smoothie.jpg'));
  await cropNormalized(bDrinks, [0.494, 0.678, 0.235, 0.216], path.join(MENU_DIR, 'crop-dubai-cookie-smoothie.jpg'));

  // Official Menu Board Section Crops for the text-listed Drink & Snack categories (100% readable & accurate)
  await cropNormalized(bDrinks, [0.030, 0.175, 0.435, 0.325], path.join(MENU_DIR, 'crop-menu-coffee-list.jpg'), 900, 900, 'contain', '#F4F1EA');
  await cropNormalized(bDrinks, [0.030, 0.518, 0.435, 0.202], path.join(MENU_DIR, 'crop-menu-matcha-list.jpg'), 900, 900, 'contain', '#F4F1EA');
  await cropNormalized(bDrinks, [0.030, 0.728, 0.435, 0.160], path.join(MENU_DIR, 'crop-menu-yoghurt-list.jpg'), 900, 900, 'contain', '#F4F1EA');

  const bSnacks = path.join(MENU_DIR, 'board-snacks.jpg');
  await cropNormalized(bSnacks, [0.120, 0.205, 0.760, 0.355], path.join(MENU_DIR, 'crop-menu-snacks-list.jpg'), 900, 900, 'contain', '#EDE6D6');
  await cropNormalized(bSnacks, [0.120, 0.560, 0.760, 0.265], path.join(MENU_DIR, 'crop-menu-local-favs-list.jpg'), 900, 900, 'contain', '#EDE6D6');

  // Clean text-free crops of standalone posters (Dirty Coffee shifted right to 0.41 so zero letters appear on left)
  await cropNormalized(path.join(MENU_DIR, 'dish-dirty-coffee.jpg'), [0.41, 0.12, 0.55, 0.78], path.join(MENU_DIR, 'crop-dirty-coffee-clean.jpg'));
  await cropNormalized(path.join(MENU_DIR, 'dish-coconut-matcha.jpg'), [0.35, 0.25, 0.62, 0.70], path.join(MENU_DIR, 'crop-coconut-matcha-clean.jpg'));
  await cropNormalized(path.join(MENU_DIR, 'dish-bone-marrow-goto.jpg'), [0.06, 0.34, 0.67, 0.65], path.join(MENU_DIR, 'crop-bone-marrow-clean.jpg'));
  await cropNormalized(path.join(MENU_DIR, 'dish-native-tinola.jpg'), [0.09, 0.08, 0.86, 0.66], path.join(MENU_DIR, 'crop-tinola-clean.jpg'));
  await cropNormalized(path.join(MENU_DIR, 'dish-seafood-bilao.jpg'), [0.21, 0.48, 0.64, 0.47], path.join(MENU_DIR, 'crop-seafood-tray-clean.jpg'));
  await cropNormalized(path.join(MENU_DIR, 'dish-pancit-miki.jpg'), [0.01, 0.39, 0.57, 0.48], path.join(MENU_DIR, 'crop-pancit-miki-clean.jpg'));

  console.log('=== Generating Native Social Ticker Images in assets/images ===');
  await writeCustomerTickerFile(path.join(CUST_DIR, 'customer-1.jpg'), 1200, 1600, [
    'QfXBkxDk87rEbKy5cw2o64UQLAQ-a22ba4a7.avif',
    'QfXBkxDk87rEbKy5cw2o64UQLAQ.png',
    '29rFfqoSlPOL4PMmM5Suv6PyoM4.png',
  ]);
  await writeCustomerTickerFile(path.join(CUST_DIR, 'customer-2.jpg'), 1200, 1600, [
    'hiNeoaKMSYN3o61ubbqvZiVMDV4-b474e2ce.avif',
    'hiNeoaKMSYN3o61ubbqvZiVMDV4.png',
  ]);
  await writeCustomerTickerFile(path.join(CUST_DIR, 'customer-3.jpg'), 1200, 1600, [
    '3qT3tiVsykluAVRvQgfGJShrOIo-ba949590.avif',
    '3qT3tiVsykluAVRvQgfGJShrOIo.png',
  ]);
  await writeCustomerTickerFile(path.join(CUST_DIR, 'customer-4.jpg'), 1200, 1600, [
    'N3CmRCOHbi2U5i8ZdyKwT1hnb8-81fbf561.avif',
    'N3CmRCOHbi2U5i8ZdyKwT1hnb8.png',
  ]);
  await writeCustomerTickerFile(path.join(CUST_DIR, 'customer-5.jpg'), 1200, 1600, [
    'N4BnuUFWRK7SMEytgtSpvpU8AZ0-fa3b3192.avif',
    'N4BnuUFWRK7SMEytgtSpvpU8AZ0.png',
  ]);

  console.log('All Ultra-HD assets and logos generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

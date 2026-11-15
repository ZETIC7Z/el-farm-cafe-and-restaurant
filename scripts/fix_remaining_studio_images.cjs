const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/sharp');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const BRAIN = 'C:/Users/ZETICUZ/.gemini/antigravity/brain/f57633c0-7f74-4399-b492-c589414a2304';
const MENU_DIR = path.join(ROOT, 'assets/menu');
const PUB_MENU_DIR = path.join(ROOT, 'public/assets/menu');

function saveBoth(filename, buffer) {
  fs.writeFileSync(path.join(MENU_DIR, filename), buffer);
  fs.writeFileSync(path.join(PUB_MENU_DIR, filename), buffer);
  console.log('Saved studio image:', filename, buffer.length, 'bytes');
}

(async () => {
  // 1. Fix Strawberry Yoghurt Drink from Blueberry Yoghurt Drink:
  // In Blueberry Yoghurt Drink, ONLY the purple/blue berry compote and blueberries have b >= g - 4 (whereas warm wood has r >> g >> b).
  const blueSrc = path.join(BRAIN, 'blueberry_yoghurt_drink_1794722404811.jpg');
  const { data, info } = await sharp(blueSrc)
    .resize(900, 900, { fit: 'cover' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      // Only inside the cup & top berry garnish region
      if (x < 210 || x > 700 || y < 80 || y > 870) continue;
      const idx = (y * info.width + x) * 3;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const sat = maxC - minC;

      // Skip neutral white/grey/black (yoghurt, ice, cup rim, black EL FARM logo)
      if (sat < 16) continue;
      // Skip green mint leaf
      if (g > r + 10 && g > b) continue;
      // Skip warm wood/amber tones (where r > g > b and g - b > 18)
      if (r > g && g > b + 18) continue;

      // Target purple/violet/indigo/magenta berry compote & berries (where blue is prominent relative to green)
      if (b >= g - 12) {
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        // Map into rich ruby-strawberry red while preserving natural shading/highlights
        const newR = Math.min(255, Math.round(Math.max(r, b) * 1.35 + 38));
        const newG = Math.min(255, Math.round(lum * 0.38));
        const newB = Math.min(255, Math.round(lum * 0.46));
        data[idx] = newR;
        data[idx + 1] = newG;
        data[idx + 2] = newB;
      }
    }
  }

  const strawBuf = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .sharpen()
    .jpeg({ quality: 92 })
    .toBuffer();
  saveBoth('studio-strawberry-yoghurt.jpg', strawBuf);

  // 2. Crop & studio-enhance actual El Farm Crispy Calamares & dipping sauce from crop-seafood-tray-clean.jpg
  const trayPath = path.join(MENU_DIR, 'crop-seafood-tray-clean.jpg');
  const trayMeta = await sharp(trayPath).metadata();
  const w = trayMeta.width || 900;
  const h = trayMeta.height || 900;
  const calamaresBuf = await sharp(trayPath)
    .extract({
      left: Math.round(w * 0.44),
      top: Math.round(h * 0.27),
      width: Math.round(w * 0.52),
      height: Math.round(h * 0.48),
    })
    .resize(900, 900, { fit: 'cover' })
    .modulate({ brightness: 1.03, saturation: 1.08 })
    .sharpen({ sigma: 1.2 })
    .jpeg({ quality: 92 })
    .toBuffer();
  saveBoth('studio-calamares.jpg', calamaresBuf);

  // 3. Search Wikimedia Commons API for authentic plated photos of fried plantains/saba, cassava dessert, and street food platter
  async function fetchWikiImage(query, fallbackUnsplash) {
    try {
      const api = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent('filetype:bitmap ' + query)}&gsrlimit=5&prop=imageinfo&iiprop=url&iiurlwidth=1000&format=json`;
      const res = await fetch(api, { headers: { 'User-Agent': 'ElFarmResto/1.0' } });
      const json = await res.json();
      const pages = Object.values(json?.query?.pages || {});
      for (const p of pages) {
        const imgUrl = p?.imageinfo?.[0]?.thumburl || p?.imageinfo?.[0]?.url;
        if (imgUrl && /\.(jpg|jpeg|png)$/i.test(imgUrl)) {
          const imgRes = await fetch(imgUrl, { headers: { 'User-Agent': 'ElFarmResto/1.0' } });
          if (imgRes.ok) return Buffer.from(await imgRes.arrayBuffer());
        }
      }
    } catch (e) {}
    const fbRes = await fetch(fallbackUnsplash);
    return Buffer.from(await fbRes.arrayBuffer());
  }

  const barkadahanRaw = await fetchWikiImage(
    'Filipino street food platter kikiam fishball siomai',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=85'
  );
  saveBoth(
    'studio-barkadahan-special.jpg',
    await sharp(barkadahanRaw).resize(900, 900, { fit: 'cover' }).modulate({ brightness: 1.02, saturation: 1.1 }).sharpen().jpeg({ quality: 92 }).toBuffer()
  );

  const sagingRaw = await fetchWikiImage(
    'saba banana plated Filipino merienda dish',
    'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1000&q=85'
  );
  saveBoth(
    'studio-saging-con-ginamus.jpg',
    await sharp(sagingRaw).resize(900, 900, { fit: 'cover' }).modulate({ brightness: 1.02, saturation: 1.1 }).sharpen().jpeg({ quality: 92 }).toBuffer()
  );

  const kamantingRaw = await fetchWikiImage(
    'cassava coconut caramel dessert plated',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1000&q=85'
  );
  saveBoth(
    'studio-kamanting-con-haleya.jpg',
    await sharp(kamantingRaw).resize(900, 900, { fit: 'cover' }).modulate({ brightness: 1.03, saturation: 1.1 }).sharpen().jpeg({ quality: 92 }).toBuffer()
  );
})();

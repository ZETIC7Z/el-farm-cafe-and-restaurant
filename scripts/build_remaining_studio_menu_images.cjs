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
  // 1. Copy Blueberry Yoghurt Drink
  const blueSrc = path.join(BRAIN, 'blueberry_yoghurt_drink_1794722404811.jpg');
  if (fs.existsSync(blueSrc)) {
    const buf = await sharp(blueSrc).resize(900, 900, { fit: 'cover' }).jpeg({ quality: 92 }).toBuffer();
    saveBoth('studio-blueberry-yoghurt.jpg', buf);
  }

  // 2. Create Strawberry Yoghurt Drink from Mulberry Yoghurt Drink by shifting berry compote pixels to bright ruby-strawberry red while preserving white yoghurt, wood table & black EL FARM logo
  const mulSrc = path.join(BRAIN, 'mulberry_yoghurt_drink_1794718773848.jpg');
  if (fs.existsSync(mulSrc)) {
    const { data, info } = await sharp(mulSrc)
      .resize(900, 900, { fit: 'cover' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let i = 0; i < data.length; i += 3) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Detect dark purple/ruby berry compote & berries (where red > green and blue is relatively high compared to green, or dark berry tones)
      const isWhiteMilk = r > 185 && g > 175 && b > 165;
      const isBlackLogo = r < 55 && g < 55 && b < 55 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18;
      const isGreenMint = g > r + 15 && g > b + 15;
      if (!isWhiteMilk && !isBlackLogo && !isGreenMint) {
        // Check if pixel is in the berry hue range (purple/crimson/dark berry)
        const isBerry = (r > g * 1.18 && b > g * 0.85) || (r < 140 && g < 65 && b < 110 && r > g + 8);
        if (isBerry) {
          // Shift deep mulberry purple-crimson into bright ruby strawberry red
          const newR = Math.min(255, Math.round(r * 1.48 + 42));
          const newG = Math.min(255, Math.round(g * 0.78 + 8));
          const newB = Math.min(255, Math.round(b * 0.62 + 6));
          data[i] = newR;
          data[i + 1] = newG;
          data[i + 2] = newB;
        }
      }
    }

    const strawBuf = await sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    })
      .modulate({ saturation: 1.08, brightness: 1.02 })
      .sharpen()
      .jpeg({ quality: 92 })
      .toBuffer();

    saveBoth('studio-strawberry-yoghurt.jpg', strawBuf);
  }

  // 3. Download high-res commercial studio food photos for the 5 snack/delicacy items and apply studio color grading
  const snackUrls = [
    {
      file: 'studio-chix-n-fries.jpg',
      // Crispy golden chicken bites & shoestring French fries with dipping sauce
      urls: [
        'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=85',
      ],
    },
    {
      file: 'studio-calamares.jpg',
      // Golden fried calamari rings with garlic aioli and citrus
      urls: [
        'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=1000&q=85',
      ],
    },
    {
      file: 'studio-barkadahan-special.jpg',
      // Asian street food sharing platter with siomai, fried bites, and dipping sauces
      urls: [
        'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=1000&q=85',
      ],
    },
    {
      file: 'studio-saging-con-ginamus.jpg',
      // Tropical saba plantain bananas with savory dip on banana leaf / wood plate
      urls: [
        'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1000&q=85',
      ],
    },
    {
      file: 'studio-kamanting-con-haleya.jpg',
      // Boiled cassava / root delicacy drizzled with golden coconut caramel syrup
      urls: [
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85',
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1000&q=85',
      ],
    },
  ];

  for (const item of snackUrls) {
    let fetchedBuf = null;
    for (const u of item.urls) {
      try {
        const res = await fetch(u);
        if (res.ok) {
          fetchedBuf = Buffer.from(await res.arrayBuffer());
          break;
        }
      } catch (e) {}
    }
    if (fetchedBuf) {
      const processed = await sharp(fetchedBuf)
        .resize(900, 900, { fit: 'cover', position: 'center' })
        .modulate({ brightness: 1.03, saturation: 1.12 })
        .sharpen({ sigma: 1.1 })
        .jpeg({ quality: 92 })
        .toBuffer();
      saveBoth(item.file, processed);
    }
  }

  // 4. Studio-enhance all existing crop-*.jpg and dish-*.jpg menu images (900x900 crisp commercial lighting & sharpening)
  const existingFiles = fs.readdirSync(MENU_DIR).filter(f => (f.startsWith('crop-') || f.startsWith('dish-')) && f.endsWith('.jpg') && !f.includes('-list'));
  for (const f of existingFiles) {
    const fullPath = path.join(MENU_DIR, f);
    const meta = await sharp(fullPath).metadata();
    if ((meta.width || 0) < 900 || (meta.height || 0) < 900) {
      const enhanced = await sharp(fullPath)
        .resize(900, 900, { fit: 'cover', position: 'center' })
        .modulate({ brightness: 1.02, saturation: 1.08 })
        .sharpen({ sigma: 1.15 })
        .jpeg({ quality: 92 })
        .toBuffer();
      saveBoth(f, enhanced);
    }
  }
  console.log('Completed studio menu image processing!');
})();

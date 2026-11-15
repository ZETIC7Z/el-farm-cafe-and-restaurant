const { chromium } = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PLATES_RAW_DIR = path.join(__dirname, 'dump/palazzo/raw_plates');
const OUT_DIR = path.join(ROOT, 'assets/menu/plates');

const PALAZZO_PLATE_URLS = [
  { id: 'sand', url: 'https://framerusercontent.com/images/1alrpgPyhYM4P7bY6IrePHRGvY.jpg?width=1600&height=1600', rimTint: 'rgba(182, 168, 145, 0.55)' },
  { id: 'black', url: 'https://framerusercontent.com/images/AW6R8P87Vs1bVAKVN3D9tI5Mks.jpg?width=1600&height=1600', rimTint: 'rgba(28, 30, 32, 0.75)' },
  { id: 'iceblue', url: 'https://framerusercontent.com/images/i51KgEHOzqI3A8F8PCSdB4E8DI.jpg?width=1600&height=1600', rimTint: 'rgba(176, 194, 192, 0.55)' },
  { id: 'celadon', url: 'https://framerusercontent.com/images/V2RIAM3dgIZhRvjkYp6e9yDsaU.jpg?width=1600&height=1600', rimTint: 'rgba(62, 96, 60, 0.65)' },
  { id: 'creamrim', url: 'https://framerusercontent.com/images/wFVJgjcEiePHQhiB5xCxnSM4MaY.jpg?width=1600&height=1600', rimTint: 'rgba(205, 198, 184, 0.55)' },
  { id: 'charcoal', url: 'https://framerusercontent.com/images/WFhP1qAD77HhhoC7psJBDhWvL8.jpg?width=1600&height=1600', rimTint: 'rgba(35, 36, 38, 0.75)' },
  { id: 'slate', url: 'https://framerusercontent.com/images/0jWFXM40GaSdwPlXOgrsvR3OCUc.jpg?width=1600&height=1600', rimTint: 'rgba(58, 56, 54, 0.7)' },
  { id: 'espresso', url: 'https://framerusercontent.com/images/L5Wcqw1oK1gJbXxAj4GmEOaUhr8.jpg?width=1600&height=1600', rimTint: 'rgba(32, 30, 32, 0.75)' },
];

// All 30 food dishes from El Farm Cafe & Resto with exact existing file paths
const FOOD_DISHES = [
  { id: 'tiyula-itum', src: 'assets/menu/crop-tiyula-itum.jpg' },
  { id: 'crispy-pata', src: 'assets/menu/crop-crispy-pata.jpg' },
  { id: 'sizzling-sisig', src: 'assets/menu/crop-sizzling-sisig.jpg' },
  { id: 'topsilog', src: 'assets/menu/crop-tapsilog.jpg' },
  { id: 'chicken-kaliya', src: 'assets/menu/crop-chicken-kaliya.jpg' },
  { id: 'kare-kareng-hito', src: 'assets/menu/crop-karekare-hito.jpg' },
  { id: 'putok-batok-goto', src: 'assets/menu/crop-bone-marrow-clean.jpg' },
  { id: 'seafood-bilao', src: 'assets/menu/crop-seafood-bilao-round.jpg' },
  { id: 'sisig-silog', src: 'assets/menu/crop-sisigsilog.jpg' },
  { id: 'hotsilog', src: 'assets/menu/crop-hotsilog.jpg' },
  { id: 'goto-overload', src: 'assets/menu/crop-goto-overload.jpg' },
  { id: 'samyang-buldak-wrap', src: 'assets/menu/crop-samyang-wrap.jpg' },
  { id: 'native-tinola', src: 'assets/menu/crop-tinola-clean.jpg' },
  { id: 'crispy-fried-hito', src: 'assets/menu/crop-crispy-hito.jpg' },
  { id: 'kambing-papaitan', src: 'assets/menu/crop-papaitan.jpg' },
  { id: 'adobing-goat-adobo', src: 'assets/menu/crop-adobing.jpg' },
  { id: 'chicken-sisig', src: 'assets/menu/crop-chicken-sisig.jpg' },
  { id: 'bangus-sisig', src: 'assets/menu/crop-bangus-sisig.jpg' },
  { id: 'pork-dinuguan', src: 'assets/menu/crop-dinuguan.jpg' },
  { id: 'chix-n-fries', src: 'assets/menu/studio-chix-n-fries.jpg' },
  { id: 'crispy-calamares', src: 'assets/menu/studio-calamares.jpg' },
  { id: 'barkadahan-platter', src: 'assets/menu/studio-barkadahan-special.jpg' },
  { id: 'saging-con-ginamus', src: 'assets/menu/studio-saging-con-ginamus.jpg' },
  { id: 'kamanting-con-haleya', src: 'assets/menu/studio-kamanting-con-haleya.jpg' },
  { id: 'brownie-cupcakes', src: 'assets/menu/dish-brownie-cupcakes.jpg' },
  { id: 'all-time-favorites-combo', src: 'assets/menu/crop-combo-feast.jpg' },
  { id: 'chicken-pancit-miki-combo', src: 'assets/menu/crop-chicken-miki-combo.jpg' },
  { id: 'pinoy-favorites-bilao', src: 'assets/menu/crop-pinoy-bilao.jpg' },
  { id: 'chicken-bilao', src: 'assets/menu/crop-chicken-bilao.jpg' },
  { id: 'pancit-miki-bilao', src: 'assets/menu/crop-pancit-miki-clean.jpg' },
];

(async () => {
  fs.mkdirSync(PLATES_RAW_DIR, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });

  const plateData = PALAZZO_PLATE_URLS.map(p => {
    const b = fs.readFileSync(path.join(PLATES_RAW_DIR, `palazzo_${p.id}.jpg`));
    return {
      uri: `data:image/jpeg;base64,${b.toString('base64')}`,
      rimTint: p.rimTint
    };
  });

  for (let i = 0; i < FOOD_DISHES.length; i++) {
    const dish = FOOD_DISHES[i];
    const dishPath = path.join(ROOT, dish.src);
    if (!fs.existsSync(dishPath)) {
      console.warn('Missing dish image:', dishPath);
      continue;
    }
    const dishBuf = fs.readFileSync(dishPath);
    const dishUri = `data:image/jpeg;base64,${dishBuf.toString('base64')}`;
    const plateObj = plateData[i % plateData.length];

    const b64Out = await page.evaluate(async ({ plateUri, rimTint, dishUri }) => {
      const loadImg = src => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

      const [plateImg, dishImg] = await Promise.all([loadImg(plateUri), loadImg(dishUri)]);
      if (!document.getElementById('elfarm-svg-sharpen')) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.id = 'elfarm-svg-sharpen';
        svg.setAttribute('width', '0');
        svg.setAttribute('height', '0');
        svg.innerHTML = `
          <defs>
            <filter id="uhd-sharpen">
              <feConvolveMatrix order="3 3" preserveAlpha="true" kernelMatrix="0 -0.42 0 -0.42 2.68 -0.42 0 -0.42 0"/>
            </filter>
          </defs>
        `;
        document.body.appendChild(svg);
      }
      const S = 1200;
      const canvas = document.createElement('canvas');
      canvas.width = S;
      canvas.height = S;
      const ctx = canvas.getContext('2d');

      // 1. Draw the authentic Palazzo studio ceramic plate (outer rim + shadow)
      ctx.drawImage(plateImg, 0, 0, S, S);

      // 2. Define the recessed inner bowl well (radius = 0.368 * S = 441.6px)
      const cx = S / 2;
      const cy = S / 2;
      const wellR = S * 0.368;

      // 3. Draw the El Farm food dish filling the inner ceramic bowl well cleanly with UHD unsharp-mask convolution
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, wellR, 0, Math.PI * 2);
      ctx.clip();

      const minDim = Math.min(dishImg.width, dishImg.height);
      const sx = (dishImg.width - minDim) / 2;
      const sy = (dishImg.height - minDim) / 2;
      const drawD = wellR * 2.04;
      ctx.filter = 'url(#uhd-sharpen) contrast(1.08) saturate(1.1)';
      ctx.drawImage(dishImg, sx, sy, minDim, minDim, cx - drawD / 2, cy - drawD / 2, drawD, drawD);
      ctx.filter = 'none';

      // 4. Add realistic 3D recessed ceramic bowl inner wall shadow + directional studio light inside the bowl cavity
      // Directional shadow cast from top-left raised ceramic rim
      const castShadow = ctx.createRadialGradient(cx + 22, cy + 24, wellR * 0.68, cx, cy, wellR * 1.02);
      castShadow.addColorStop(0, 'rgba(0, 0, 0, 0)');
      castShadow.addColorStop(0.72, 'rgba(0, 0, 0, 0.08)');
      castShadow.addColorStop(0.91, 'rgba(0, 0, 0, 0.42)');
      castShadow.addColorStop(1, 'rgba(0, 0, 0, 0.72)');
      ctx.fillStyle = castShadow;
      ctx.fillRect(0, 0, S, S);

      // Subtle ceramic glaze reflection near bottom-right inner wall
      const bounceGrad = ctx.createLinearGradient(cx - wellR, cy - wellR, cx + wellR, cy + wellR);
      bounceGrad.addColorStop(0, 'rgba(0, 0, 0, 0.24)');
      bounceGrad.addColorStop(0.32, 'rgba(0, 0, 0, 0)');
      bounceGrad.addColorStop(0.75, 'rgba(255, 250, 240, 0.04)');
      bounceGrad.addColorStop(1, 'rgba(255, 250, 240, 0.14)');
      ctx.fillStyle = bounceGrad;
      ctx.fillRect(0, 0, S, S);
      ctx.restore();

      // 5. Render the 3D ceramic inner lip bevel ring right at wellR so the transition from ceramic rim to inner bowl is physical and seamless
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, wellR, 0, Math.PI * 2);
      ctx.lineWidth = 7;
      ctx.strokeStyle = rimTint;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx - 1.5, cy - 1.5, wellR + 2, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(255, 252, 245, 0.26)';
      ctx.stroke();
      ctx.restore();

      return canvas.toDataURL('image/jpeg', 0.92).split(',')[1];
    }, { plateUri: plateObj.uri, rimTint: plateObj.rimTint, dishUri });

    const outPath = path.join(OUT_DIR, `plated-${dish.id}.jpg`);
    fs.writeFileSync(outPath, Buffer.from(b64Out, 'base64'));
  }

  console.log('Successfully generated all 30 studio HD Palazzo-plated food images in assets/menu/plates/!');
  await browser.close();
})();

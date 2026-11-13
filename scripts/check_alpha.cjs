const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/sharp');

const imgDir = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave/assets/images';
const outDir = 'C:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant/scripts/dump/monkscrave_previews';
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  'CpTRnnQgJsG1yUk8t8GcoKvmI-4dbeae2c.avif',
  '89U3OUUG1H7iWBCxQnqp77Ullc-520d2c95.avif',
  'r1buuQ3PjFpdDV70OBtJahkGk-3d0f5863.avif',
  'ceGmzEdah9wRnKcuQlWj1Iyys3M-3780c526.avif',
  'OEIKwRbQYPhFWnn0W0aZuXC8M-e3b02933.avif',
  'SfaX4dDG1EWiu1GRGlWeW7FZ8-f8145543.avif',
  'YzU2mq14BNUOkSAHwW1X1qSujrg-0a2cb47f.avif',
  'UDBAh9VKVLzkggfpg8wc0kII00c-27879a26.avif',
  '4ImXF95MpSrQxpsPf0Z2qExCovE-30fb3e17.avif',
  'ejUa9RcHAoqxoyIcExDwLQhOyfg-6227d616.avif'
];

(async () => {
  for (const t of targets) {
    const p = path.join(imgDir, t);
    if (!fs.existsSync(p)) continue;
    const meta = await sharp(p).metadata();
    console.log(t, `${meta.width}x${meta.height}`, 'hasAlpha=', meta.hasAlpha, 'channels=', meta.channels);
    const outPng = path.join(outDir, t.replace(/\.[^.]+$/, '.png'));
    await sharp(p).resize(600, null, { withoutEnlargement: true }).png().toFile(outPng);
  }
})();

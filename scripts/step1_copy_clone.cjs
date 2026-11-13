const fs = require('fs');
const path = require('path');

const ROOT = 'c:/Users/ZETICUZ/Music/El Farm Cafe and Restaurant';
const SRC_HOME = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave';
const SRC_MENU = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave_menu';

function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Backup old index.html if it exists and is tiny (Vite entry)
const rootIndex = path.join(ROOT, 'index.html');
if (fs.existsSync(rootIndex) && fs.statSync(rootIndex).size < 10000) {
  fs.copyFileSync(rootIndex, path.join(ROOT, 'index.vite.bak.html'));
}

// 2. Copy output_monkscrave_menu assets first, then output_monkscrave assets (so home + menu assets are merged)
copyDirSync(path.join(SRC_MENU, 'assets'), path.join(ROOT, 'assets'));
copyDirSync(path.join(SRC_HOME, 'assets'), path.join(ROOT, 'assets'));

// 3. Copy index.html and menu.html to ROOT (and also keep raw originals in scripts/dump/raw_index.html & raw_menu.html for idempotent re-runs!)
fs.mkdirSync(path.join(ROOT, 'scripts/dump'), { recursive: true });
fs.copyFileSync(path.join(SRC_HOME, 'index.html'), path.join(ROOT, 'scripts/dump/raw_index.html'));
fs.copyFileSync(path.join(SRC_MENU, 'menu.html'), path.join(ROOT, 'scripts/dump/raw_menu.html'));

fs.copyFileSync(path.join(SRC_HOME, 'index.html'), path.join(ROOT, 'index.html'));
fs.copyFileSync(path.join(SRC_MENU, 'menu.html'), path.join(ROOT, 'menu.html'));

// 4. Also copy public/assets/* (logo, menu, resto-views, customers) into ROOT/assets/ so both /assets/... and ./assets/... work seamlessly
for (const sub of ['logo', 'menu', 'resto-views', 'customers']) {
  const pubSub = path.join(ROOT, 'public/assets', sub);
  if (fs.existsSync(pubSub)) {
    copyDirSync(pubSub, path.join(ROOT, 'assets', sub));
  }
}

console.log('Successfully merged output_monkscrave and output_monkscrave_menu into workspace root!');
console.log('Total files in assets/images:', fs.readdirSync(path.join(ROOT, 'assets/images')).length);
console.log('Total files in assets/js:', fs.readdirSync(path.join(ROOT, 'assets/js')).length);

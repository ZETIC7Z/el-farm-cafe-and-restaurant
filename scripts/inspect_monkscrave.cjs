const fs = require('fs');
const path = require('path');
const cheerio = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/cheerio');

const UNCAGE_DIR = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave';
const html = fs.readFileSync(path.join(UNCAGE_DIR, 'index.html'), 'utf8');
const dims = JSON.parse(fs.readFileSync(path.join(UNCAGE_DIR, 'image-dimensions.json'), 'utf8'));

const $ = cheerio.load(html);

console.log('=== SCRIPTS IN INDEX.HTML ===');
$('script').each((i, el) => {
  const src = $(el).attr('src') || '(inline)';
  const type = $(el).attr('type') || 'text/javascript';
  const len = ($(el).html() || '').length;
  console.log(`Script[${i}]: src=${src} type=${type} len=${len}`);
});

console.log('\n=== ALL IMAGES IN INDEX.HTML (IN DOM ORDER) ===');
const seen = new Set();
$('img').each((i, el) => {
  const src = $(el).attr('src') || '';
  const srcset = $(el).attr('srcset') || '';
  const alt = $(el).attr('alt') || '';
  const fname = path.basename(src.split('?')[0]);
  if (seen.has(fname)) return;
  seen.add(fname);

  let context = '';
  let p = $(el).parent();
  for (let d = 0; d < 6; d++) {
    if (!p || !p.length) break;
    const t = p.text().replace(/\s+/g, ' ').trim();
    if (t.length > 0) {
      context = t.slice(0, 140);
      break;
    }
    p = p.parent();
  }
  const info = dims[fname] || {};
  console.log(`- ${fname} | ${info.width}x${info.height} (${info.format}, ${info.sizeKB}KB) | srcset=${srcset ? 'YES' : 'NO'} | Context: ${context}`);
});

console.log('\n=== ALLIMAGES IN ASSETS/IMAGES NOT IN <IMG SRC> ===');
for (const [fname, info] of Object.entries(dims)) {
  if (!seen.has(fname)) {
    const inHtml = html.includes(fname);
    console.log(`* ${fname} | ${info.width}x${info.height} (${info.format}, ${info.sizeKB}KB) | inHtml=${inHtml}`);
  }
}

console.log('\n=== ALL UNIQUE TEXT NODES IN INDEX.HTML ===');
const seenText = new Set();
$('*').each((i, el) => {
  const children = $(el).children();
  if (children.length === 0 && !['script', 'style', 'title', 'meta', 'link', 'svg', 'path'].includes(el.tagName)) {
    const t = $(el).text().replace(/\s+/g, ' ').trim();
    if (t && !seenText.has(t)) {
      seenText.add(t);
      console.log(`  [${el.tagName}] ${t}`);
    }
  }
});

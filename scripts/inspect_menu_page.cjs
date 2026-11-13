const fs = require('fs');
const cheerio = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/cheerio');
const html = fs.readFileSync('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave_menu/menu.html', 'utf8');
const $ = cheerio.load(html);

console.log('=== IMAGES IN MENU.HTML ===');
$('img').each((i, el) => {
  let tree = '';
  $(el).parents('[data-framer-name]').each((_, p) => {
    const n = $(p).attr('data-framer-name');
    if (n) tree += '/' + n;
  });
  console.log(`[${i}] src=${$(el).attr('src')} | tree=${tree}`);
});

console.log('\n=== TEXT NODES IN MENU.HTML ===');
const seen = new Set();
$('*').each((i, el) => {
  if ($(el).children().length === 0 && !['script', 'style', 'title', 'meta', 'link', 'svg', 'path'].includes(el.tagName)) {
    const t = $(el).text().replace(/\s+/g, ' ').trim();
    if (t && !seen.has(t)) {
      seen.add(t);
      console.log(`  [${el.tagName}] ${t}`);
    }
  }
});

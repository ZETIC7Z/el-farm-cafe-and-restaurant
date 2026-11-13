const fs = require('fs');
const path = require('path');
const cheerio = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/cheerio');

const UNCAGE_DIR = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave';
const html = fs.readFileSync(path.join(UNCAGE_DIR, 'index.html'), 'utf8');
const $ = cheerio.load(html);

console.log('=== CHECKING ALL <IMG> TAGS WITH DETAILS ===');
$('img').each((i, el) => {
  const src = $(el).attr('src') || '';
  const srcset = $(el).attr('srcset') || '';
  const sizes = $(el).attr('sizes') || '';
  const parentName = $(el).closest('[data-framer-name]').attr('data-framer-name') || '';
  let sectionName = '';
  $(el).parents('[data-framer-name]').each((_, p) => {
    const n = $(p).attr('data-framer-name');
    if (n) sectionName += '/' + n;
  });
  console.log(`[${i}] src=${src} | srcset=${srcset ? 'YES' : 'NO'} | tree=${sectionName}`);
});

const fs = require('fs');
const cheerio = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/cheerio');
const html = fs.readFileSync('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave/index.html', 'utf8');
const $ = cheerio.load(html);

let out = '';

out += '=== 1. MENU SECTION STRUCTURE ===\n';
const menuSec = $('[data-framer-name="Menu Section"]');
out += `Menu Section count: ${menuSec.length}\n`;
menuSec.children().each((i, el) => {
  out += `  Child[${i}]: tag=${el.tagName} class="${$(el).attr('class')}" data-framer-name="${$(el).attr('data-framer-name')}"\n`;
});

const firstMenuCard = menuSec.find('a').filter((i, el) => $(el).text().includes('Beef Skewers')).first();
out += '\n--- First Menu Card outerHTML ---\n';
out += $.html(firstMenuCard.parent()) + '\n';

out += '\n=== 2. INSTAGRAM / SLIDING STRIP SECTION STRUCTURE ===\n';
const instaSec = $('[data-framer-name="Instagram Section"]');
out += `Instagram Section count: ${instaSec.length}\n`;
const ul = instaSec.find('ul');
out += `UL count: ${ul.length}, LI count: ${ul.find('li').length}\n`;
out += '\n--- First LI in Instagram Section ---\n';
out += $.html(ul.find('li').first()) + '\n';

out += '\n=== 3. FOOTER BOTTOM BLOCK ===\n';
const footerBottom = $('[data-framer-name="Footer Bottom Block"]');
out += $.html(footerBottom) + '\n';

fs.writeFileSync('scripts/dump/cards_structure.txt', out, 'utf8');
console.log('Saved scripts/dump/cards_structure.txt');

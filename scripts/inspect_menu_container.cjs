const fs = require('fs');
const cheerio = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/cheerio');
const html = fs.readFileSync('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave/index.html', 'utf8');
const $ = cheerio.load(html);

const container = $('[data-framer-name="Menu Section"] > [data-framer-name="Container"]');
console.log('Menu Section > Container class:', container.attr('class'));
container.children().each((i, el) => {
  console.log(`  Child[${i}]: tag=${el.tagName} class="${$(el).attr('class')}" data-framer-name="${$(el).attr('data-framer-name')}"`);
  $(el).children().each((j, c) => {
    console.log(`    SubChild[${j}]: tag=${c.tagName} class="${$(c).attr('class')}" data-framer-name="${$(c).attr('data-framer-name')}"`);
  });
});

const menuHtml = fs.readFileSync('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave_menu/menu.html', 'utf8');
const $m = cheerio.load(menuHtml);
const tabBlock = $m('[data-framer-name="Menu Tab Block"]');
console.log('\nMenu.html Menu Tab Block class:', tabBlock.attr('class'));
tabBlock.children().each((i, el) => {
  console.log(`  TabBlock Child[${i}]: tag=${el.tagName} class="${$m(el).attr('class')}" data-framer-name="${$m(el).attr('data-framer-name')}"`);
  $m(el).children().each((j, c) => {
    console.log(`    SubChild[${j}]: tag=${c.tagName} class="${$m(c).attr('class')}" data-framer-name="${$m(c).attr('data-framer-name')}" text="${$m(c).text().slice(0,80)}"`);
  });
});

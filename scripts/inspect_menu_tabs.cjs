const fs = require('fs');
const cheerio = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/cheerio');
const mHtml = fs.readFileSync('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave_menu/menu.html', 'utf8');
const $ = cheerio.load(mHtml);
const tabBlock = $('[data-framer-name="Menu Tab Block"]').first();
console.log('Menu Tab Block class:', tabBlock.attr('class'));
tabBlock.children().each((i, el) => {
  console.log('Child', i, 'tag:', el.tagName, 'class:', $(el).attr('class'), 'name:', $(el).attr('data-framer-name'));
  $(el).children().each((j, c) => {
    console.log('  Grandchild', j, 'tag:', c.tagName, 'class:', $(c).attr('class'), 'name:', $(c).attr('data-framer-name'), 'text:', $(c).text().trim().slice(0, 60));
  });
});

// Also check index.html Menu Section Container children
const iHtml = fs.readFileSync('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave/index.html', 'utf8');
const $i = cheerio.load(iHtml);
const menuSec = $i('[data-framer-name="Menu Section"]').first();
const container = menuSec.find('[data-framer-name="Container"]').first();
console.log('\nIndex Menu Section Container class:', container.attr('class'));
container.children().each((i, el) => {
  console.log('Index Child', i, 'tag:', el.tagName, 'class:', $i(el).attr('class'), 'name:', $i(el).attr('data-framer-name'));
});

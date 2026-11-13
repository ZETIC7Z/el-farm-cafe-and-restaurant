const fs = require('fs');
const cheerio = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/cheerio');
const html = fs.readFileSync('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave/index.html', 'utf8');
const $ = cheerio.load(html);
$('a').each((i, el) => {
  console.log(`[${i}] text="${$(el).text().replace(/\s+/g, ' ').trim()}" href="${$(el).attr('href')}"`);
});

const fs = require('fs');
const path = require('path');

const jsDir = 'C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/output/output_monkscrave/assets/js';
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js') || f.endsWith('.mjs') || f.endsWith('.framercms'));

const searchTerms = [
  'Cravings',
  'Beef Skewers',
  'Sushi California Rolls',
  'Sea Fish Steak',
  'Savory Veggie Wraps',
  'Grilled Chicken Salad',
  'Classic Pancakes',
  'We Provide Elegant Service',
  'Refined Taste, Exceptional Feel',
  'Our Diners Are Saying',
  'Jessier Robak',
  'Alonso D. Dowson',
  'Kristin Watson',
  'Make a Reservation',
  'Culinary Insights',
  'Revolutionizing Taste',
  'Weekly Newsletter',
  'hello@designmonks.co',
  '+12 960 849493',
  'Armstrong,North Nanook',
  'Design Monks',
  'Free 3 Month'
];

for (const f of files) {
  const content = fs.readFileSync(path.join(jsDir, f), 'utf8');
  const found = searchTerms.filter(t => content.includes(t));
  if (found.length > 0) {
    console.log(`\nFile: ${f} (${content.length} bytes)`);
    console.log('  Matches:', found.join(' | '));
  }
}

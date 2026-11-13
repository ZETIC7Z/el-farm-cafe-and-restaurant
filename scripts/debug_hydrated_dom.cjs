const { chromium } = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/playwright');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe', headless: true });
  const p = await b.newPage();
  p.on('console', m => {
    if (!m.text().includes('418') && !m.text().includes('422')) {
      console.log('CONSOLE:', m.type(), m.text().slice(0, 250));
    }
  });
  p.on('pageerror', e => console.log('PAGEERROR:', e.message));
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(2500);
  const check = await p.evaluate(() => {
    const ms = document.querySelector('[data-framer-name="Menu Section"]');
    const w9 = ms ? ms.querySelector('.framer-w91vbs') : null;
    const fc = document.querySelector('[data-framer-name="Footer Content Block"]');
    return {
      msTag: ms ? ms.tagName : null,
      w9Parent: w9 && w9.parentNode ? w9.parentNode.className : null,
      fcHtmlLen: fc ? fc.innerHTML.length : -1,
      zeticuzId: !!document.getElementById('zeticuz-attribution-bar'),
    };
  });
  console.log('CHECK:', check);
  await b.close();
})();

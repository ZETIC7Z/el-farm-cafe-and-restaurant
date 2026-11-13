const { chromium } = require('C:/Users/ZETICUZ/.gemini/antigravity/scratch/ZE-Uncage/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/ZETICUZ/.gemini/antigravity/brain/f57633c0-7f74-4399-b492-c589414a2304';
const BASE_URL = (process.env.VERIFY_BASE_URL || 'http://localhost:5173').replace(/\/$/, '');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
  });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push({ url: page.url(), text: msg.text() });
    }
  });
  page.on('response', (res) => {
    const status = res.status();
    const url = res.url();
    if (status >= 400 && !url.includes('google.com/maps')) {
      failedRequests.push({ page: page.url(), url, status });
    }
  });

  console.log(`1. Navigating to Home page ${BASE_URL}/ (Testing Intro Video Overlay)...`);
  await page.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 45000 });

  // Wait for video metadata/data to load and seek to 4.5s so we capture a bright mid-animation frame
  await page.evaluate(async () => {
    const video = document.getElementById('elfarm-intro-video');
    if (!video) return;
    if (video.readyState < 2) {
      await new Promise(r => {
        video.addEventListener('loadeddata', r, { once: true });
        setTimeout(r, 3000);
      });
    }
    video.currentTime = Math.min(3.5, Math.max(1.0, (video.duration || 5) * 0.5));
    await new Promise(r => {
      video.addEventListener('seeked', r, { once: true });
      setTimeout(r, 1500);
    });
  });
  await page.waitForTimeout(300);

  // Audit Intro Video Overlay while active
  const introAudit = await page.evaluate(() => {
    const overlay = document.getElementById('elfarm-intro-overlay');
    const video = document.getElementById('elfarm-intro-video');
    const htmlOverflow = window.getComputedStyle(document.documentElement).overflow;
    const bodyOverflow = window.getComputedStyle(document.body).overflow;
    const hasIntroLock = document.documentElement.classList.contains('elfarm-intro-lock');
    const rect = video ? video.getBoundingClientRect() : null;
    const mainEl = document.getElementById('main');
    const mainOpacityBefore = mainEl ? window.getComputedStyle(mainEl).opacity : null;
    return {
      overlayPresent: !!overlay,
      videoPresent: !!video,
      hasIntroLock,
      htmlOverflow,
      bodyOverflow,
      hasHorizontalScrollbar: document.documentElement.scrollWidth > window.innerWidth,
      videoRect: rect ? { width: rect.width, height: rect.height, top: rect.top, left: rect.left } : null,
      videoReadyState: video ? video.readyState : 0,
      videoPaused: video ? video.paused : true,
      videoCurrentTime: video ? video.currentTime : 0,
      videoDuration: video ? video.duration : 0,
      mainOpacityBefore,
    };
  });
  console.log('=== INTRO VIDEO OVERLAY AUDIT (ACTIVE) ===\n', JSON.stringify(introAudit, null, 2));

  // Capture Screenshot of Full-Screen Intro Video Playing (No Scrollbar)
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'framer_00_intro_video.png'), fullPage: false });

  // Fast-forward / trigger ended event on intro video to verify dark-to-light fade-in transition
  console.log('2. Completing Intro Video and verifying smooth dark-to-light fade-in of main site...');
  await page.evaluate(() => {
    const video = document.getElementById('elfarm-intro-video');
    if (video) {
      video.dispatchEvent(new Event('ended'));
    }
  });
  await page.waitForTimeout(2100);

  const postIntroAudit = await page.evaluate(() => {
    const overlay = document.getElementById('elfarm-intro-overlay');
    const hasIntroLock = document.documentElement.classList.contains('elfarm-intro-lock');
    const hasIntroReveal = document.documentElement.classList.contains('elfarm-intro-reveal');
    const mainEl = document.getElementById('main');
    const mainOpacityAfter = mainEl ? window.getComputedStyle(mainEl).opacity : null;
    const mainFilterAfter = mainEl ? window.getComputedStyle(mainEl).filter : null;
    const plateOpacities = ['.framer-1j6fcxm', '.framer-71xvpi', '.framer-1qgz169'].map(sel => {
      const el = document.querySelector(sel);
      return { sel, opacity: el ? window.getComputedStyle(el).opacity : null };
    });
    return {
      overlayRemovedOrFaded: !overlay || overlay.classList.contains('elfarm-intro-fadeout'),
      hasIntroLock,
      hasIntroReveal,
      heroAnimatedFlag: !!window.__elfarmHeroAnimated,
      mainOpacityAfter,
      mainFilterAfter,
      plateOpacities,
    };
  });
  console.log('=== POST-INTRO FADE-IN & HERO PLATES AUDIT ===\n', JSON.stringify(postIntroAudit, null, 2));

  // Capture Hero + Navbar after fade-in
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'framer_01_hero.png'), fullPage: false });

  // Test Top Navbar Pointer Hover Animation
  const aboutNav = page.locator('header nav a', { hasText: 'About' }).first();
  if (await aboutNav.count() > 0) {
    await aboutNav.hover();
    await page.waitForTimeout(600);
    const navHoverStyle = await aboutNav.evaluate((el) => {
      const p = el.querySelector('p');
      return {
        transform: window.getComputedStyle(el).transform,
        bgColor: window.getComputedStyle(el).backgroundColor,
        pColor: p ? window.getComputedStyle(p).color : null,
      };
    });
    console.log('=== NAVBAR HOVER ANIMATION AUDIT ===\n', JSON.stringify(navHoverStyle, null, 2));
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'framer_11_nav_hover.png'), fullPage: false });
  }

  // Test Same-Tab Refresh: Intro must NOT show again on reload in the same tab
  console.log('2b. Testing Same-Tab Page Refresh (Intro must NOT replay)...');
  await page.reload({ waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(400);
  const reloadAudit = await page.evaluate(() => {
    const overlay = document.getElementById('elfarm-intro-overlay');
    const overlayDisplay = overlay ? window.getComputedStyle(overlay).display : 'removed';
    return {
      hasIntroLock: document.documentElement.classList.contains('elfarm-intro-lock'),
      sessionPlayedFlag: sessionStorage.getItem('elfarm_intro_played'),
      overlayDisplay,
    };
  });
  console.log('=== SAME-TAB RELOAD AUDIT ===\n', JSON.stringify(reloadAudit, null, 2));

  // Test Opening Site in a Brand New Browser Tab: Intro MUST play again!
  console.log('2c. Testing New Browser Tab (Intro MUST play once in new tab)...');
  const tab2 = await context.newPage();
  await tab2.goto(`${BASE_URL}/`, { waitUntil: 'load', timeout: 45000 });
  await tab2.waitForTimeout(400);
  const tab2Audit = await tab2.evaluate(() => {
    const overlay = document.getElementById('elfarm-intro-overlay');
    return {
      hasIntroLock: document.documentElement.classList.contains('elfarm-intro-lock'),
      overlayVisible: !!overlay && window.getComputedStyle(overlay).display !== 'none',
    };
  });
  console.log('=== NEW TAB INTRO AUDIT ===\n', JSON.stringify(tab2Audit, null, 2));
  await tab2.close();

  // Scroll through Home page to trigger appear animations
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= totalHeight; y += 700) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(800);

  // Audit Home Page DOM, SEO, Mini-Map & Images
  const homeAudit = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src);
    const externalStock = imgs.filter(i => (i.currentSrc || i.src || '').includes('framerusercontent.com')).map(i => i.currentSrc || i.src);
    const homeMenuCards = Array.from(document.querySelectorAll('[data-framer-name="Menu Section"] .elfarm-menu-card-wrap')).map(c => c.innerText.split('\n')[0]);
    const homeHasTabs = !!document.querySelector('[data-framer-name="Menu Section"] .framer-1bh56fl') || !!document.querySelector('.elfarm-menu-controls');
    const slidingItems = document.querySelectorAll('[data-framer-name="Instagram Section"] ul > li').length;
    const instaRect = document.querySelector('[data-framer-name="Instagram Section"] ul')?.getBoundingClientRect();
    const hasFree3Month = !!document.querySelector('.framer-1r0dvt3-container') &&
      window.getComputedStyle(document.querySelector('.framer-1r0dvt3-container')).display !== 'none';
    const minimapPresent = !!document.getElementById('elfarm-minimap-section');
    const minimapIframe = document.querySelector('#elfarm-minimap-section iframe')?.getAttribute('src') || null;
    const zeticuzBtn = document.querySelector('#zeticuz-portfolio-btn')?.innerText?.trim() || null;
    const seoTitle = document.title;
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
    const faviconIco = document.querySelector('link[rel="icon"][href*="favicon.ico"]')?.getAttribute('href') || null;
    const jsonLdPresent = !!document.querySelector('script[type="application/ld+json"]');
    return {
      totalImages: imgs.length,
      brokenImages: broken,
      externalStockImages: externalStock,
      homeMenuCardCount: homeMenuCards.length,
      homeMenuCards,
      homeHasTabs,
      slidingItems,
      instaLeft: instaRect ? instaRect.left : null,
      instaWidth: instaRect ? instaRect.width : null,
      hasFree3Month,
      minimapPresent,
      minimapIframe,
      zeticuzBtn,
      seoTitle,
      ogImage,
      faviconIco,
      jsonLdPresent,
    };
  });
  console.log('=== HOME PAGE FULL AUDIT ===\n', JSON.stringify(homeAudit, null, 2));

  // Capture Interactive Location Mini-Map on Home Page Contact Section
  await page.evaluate(() => {
    const el = document.getElementById('elfarm-minimap-section');
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 220);
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'framer_09_contact_minimap.png'), fullPage: false });

  // 3. Test All Navbar Pages: About (/about), Menu (/menu), Blog (/blog), Contact (/contact)
  const navPages = [
    { name: 'About', url: `${BASE_URL}/about`, screenshot: 'framer_07_about_page.png' },
    { name: 'Menu', url: `${BASE_URL}/menu`, screenshot: 'framer_02b_menu_top_selection.png' },
    { name: 'Blog', url: `${BASE_URL}/blog`, screenshot: 'framer_08_blog_page.png' },
    { name: 'Contact', url: `${BASE_URL}/contact`, screenshot: 'framer_10_contact_page.png' },
  ];

  const multiPageResults = [];

  for (const navPage of navPages) {
    console.log(`Navigating to ${navPage.name} page (${navPage.url})...`);
    const t0 = Date.now();
    await page.goto(navPage.url, { waitUntil: 'networkidle', timeout: 45000 });
    const loadTimeMs = Date.now() - t0;
    await page.waitForTimeout(900);

    // Capture top of page with sticky header visible
    await page.screenshot({ path: path.join(ARTIFACT_DIR, navPage.screenshot), fullPage: false });

    // Scroll through page to trigger lazy images & Framer appear animations
    const pageH = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= pageH; y += 700) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(50);
    }
    await page.waitForTimeout(400);

    const pageAudit = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      const broken = imgs.filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src);
      const externalStock = imgs.filter(i => (i.currentSrc || i.src || '').includes('framerusercontent.com')).map(i => i.currentSrc || i.src);
      const hasMonksCraveText = document.body.innerText.toLowerCase().includes('monkscrave') || document.body.innerText.toLowerCase().includes("monk's crave");
      const hasZeticuzFooter = !!document.querySelector('#zeticuz-portfolio-btn');
      const hasMinimap = !!document.getElementById('elfarm-minimap-section');
      const h1Text = document.querySelector('h1')?.innerText?.replace(/\s+/g, ' ').trim() || null;
      return {
        title: document.title,
        h1Text,
        totalImages: imgs.length,
        brokenImages: broken,
        externalStockImages: externalStock,
        hasMonksCraveText,
        hasZeticuzFooter,
        hasMinimap,
      };
    });

    multiPageResults.push({
      page: navPage.name,
      url: navPage.url,
      loadTimeMs,
      ...pageAudit,
    });
  }

  console.log('=== ALL 5 NAVBAR PAGES AUDIT ===\n', JSON.stringify(multiPageResults, null, 2));
  console.log('=== CONSOLE ERRORS ===\n', JSON.stringify(consoleErrors, null, 2));
  console.log('=== FAILED NETWORK REQUESTS (>=400) ===\n', JSON.stringify(failedRequests, null, 2));

  await browser.close();
})();

from playwright.sync_api import sync_playwright
import time
import json

brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=brave_path,
        headless=True,
        args=["--disable-notifications", "--disable-popup-blocking", "--window-size=1920,1080"]
    )
    context = browser.new_context(
        viewport={"width": 1920, "height": 1080},
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    )
    page = context.new_page()
    url = "https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/"
    print(f"Loading {url}...")
    page.goto(url, wait_until="networkidle", timeout=30000)
    time.sleep(3)

    # Dismiss any login popups / banners
    page.evaluate("""() => {
        const dialogs = document.querySelectorAll('div[role="dialog"]');
        dialogs.forEach(d => {
            const close = d.querySelector('[aria-label="Close"], [aria-label="Dismiss"]');
            if (close) close.click();
            else d.remove();
        });
        // Remove bottom login bar
        const bottomBar = document.querySelector('div[data-nosnippet="true"]');
        if (bottomBar) bottomBar.remove();
        document.body.style.overflow = 'auto';
    }""")
    time.sleep(1)

    # Let's find all links/tabs
    tabs = page.evaluate("""() => {
        const links = Array.from(document.querySelectorAll('a, div[role="tab"]'));
        return links.map(l => ({
            text: (l.innerText || '').trim(),
            role: l.getAttribute('role'),
            href: l.getAttribute('href'),
            ariaSelected: l.getAttribute('aria-selected')
        })).filter(l => l.text);
    }""")
    print("Found tabs/links:", [t['text'] for t in tabs if t['text'] in ['Posts', 'About', 'Photos', 'Reels', 'More']])

    # Click on "About"
    about_tab = page.query_selector('a:has-text("About"), div[role="tab"]:has-text("About")')
    if about_tab:
        print("Clicking About tab...")
        about_tab.click()
        time.sleep(3)
        page.screenshot(path="scripts/fb_clicked_about.png")
        about_content = page.evaluate("() => document.body.innerText")
        with open("scripts/fb_clicked_about_text.txt", "w", encoding="utf-8") as f:
            f.write(about_content)
        print("About content saved. Length:", len(about_content))

    # Click on "Photos"
    photos_tab = page.query_selector('a:has-text("Photos"), div[role="tab"]:has-text("Photos")')
    if photos_tab:
        print("Clicking Photos tab...")
        photos_tab.click()
        time.sleep(3)
        page.screenshot(path="scripts/fb_clicked_photos.png")
        
        # Scroll several times to load photos
        for s in range(5):
            page.evaluate("window.scrollBy(0, 800)")
            time.sleep(1)

        imgs = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('img')).map(i => ({
                src: i.src,
                alt: i.alt,
                w: i.naturalWidth,
                h: i.naturalHeight
            })).filter(i => i.src && !i.src.includes('emoji.php') && !i.src.includes('rsrc.php'));
        }""")
        with open("scripts/fb_clicked_photos.json", "w", encoding="utf-8") as f:
            json.dump(imgs, f, indent=2)
        print(f"Photos tab images: {len(imgs)}")

    browser.close()

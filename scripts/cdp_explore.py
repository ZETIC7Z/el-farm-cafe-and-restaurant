import json
import time
import os
from playwright.sync_api import sync_playwright

os.makedirs("scripts/dump", exist_ok=True)
brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
user_data_dir = os.path.expandvars(r"%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data")

with sync_playwright() as p:
    print("Launching actual Brave Browser with existing User Data profile...")
    context = p.chromium.launch_persistent_context(
        user_data_dir=user_data_dir,
        executable_path=brave_path,
        headless=False,
        viewport={"width": 1600, "height": 1000},
        args=[
            "--restore-last-session",
            "--no-first-run",
            "--no-default-browser-check",
            "--disable-blink-features=AutomationControlled"
        ]
    )
    print("Connected to Brave persistent context!")
    
    target_page = context.new_page()
    url = "https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/"
    print(f"Navigating to {url}...")
    target_page.goto(url, wait_until="domcontentloaded", timeout=45000)
    time.sleep(5)
    
    print("Page loaded:", target_page.title(), target_page.url)
    target_page.screenshot(path="scripts/dump/auth_main.png")

    # Scroll & click "See more" on posts to expand full menu & descriptions
    for step in range(10):
        print(f"Scrolling feed step {step+1}/10...")
        target_page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('div[role="button"]'));
            buttons.forEach(b => {
                if (b.innerText && b.innerText.trim() === 'See more') {
                    try { b.click(); } catch(e) {}
                }
            });
        }""")
        target_page.evaluate("window.scrollBy(0, 1200)")
        time.sleep(2)

    feed_text = target_page.evaluate("() => document.body.innerText")
    with open("scripts/dump/auth_feed_text.txt", "w", encoding="utf-8") as f:
        f.write(feed_text)
    print("Saved auth_feed_text.txt, length:", len(feed_text))

    feed_imgs = target_page.evaluate("""() => {
        return Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.src,
            alt: img.alt || '',
            w: img.naturalWidth || img.width,
            h: img.naturalHeight || img.height,
            parentHref: img.closest('a') ? img.closest('a').href : ''
        })).filter(i => i.src && i.src.includes('fbcdn.net') && i.w > 60);
    }""")
    with open("scripts/dump/auth_feed_imgs.json", "w", encoding="utf-8") as f:
        json.dump(feed_imgs, f, indent=2)
    print(f"Found {len(feed_imgs)} images on feed.")

    # Scroll back to top
    target_page.evaluate("window.scrollTo(0, 0)")
    time.sleep(2)

    # Click About tab
    about_tab = target_page.query_selector('a[role="tab"]:has-text("About"), div[role="tab"]:has-text("About"), a:has-text("About")')
    if about_tab:
        print("Clicking About tab...")
        about_tab.click()
        time.sleep(3)
        target_page.screenshot(path="scripts/dump/auth_about.png")
        about_text = target_page.evaluate("() => document.body.innerText")
        with open("scripts/dump/auth_about_text.txt", "w", encoding="utf-8") as f:
            f.write(about_text)
        print("Saved auth_about_text.txt, length:", len(about_text))

        # Check About sub-tabs
        sub_links = target_page.query_selector_all('a[href*="about_"]')
        for idx, link in enumerate(sub_links):
            try:
                link.click()
                time.sleep(2)
                sub_text = target_page.evaluate("() => document.body.innerText")
                with open(f"scripts/dump/auth_about_sub_{idx}.txt", "w", encoding="utf-8") as f:
                    f.write(sub_text)
            except Exception as e:
                pass

    # Click Photos tab
    photos_tab = target_page.query_selector('a[role="tab"]:has-text("Photos"), div[role="tab"]:has-text("Photos"), a:has-text("Photos")')
    if photos_tab:
        print("Clicking Photos tab...")
        photos_tab.click()
        time.sleep(3)
        for s in range(8):
            target_page.evaluate("window.scrollBy(0, 1200)")
            time.sleep(1.5)
        target_page.screenshot(path="scripts/dump/auth_photos.png")
        photos_imgs = target_page.evaluate("""() => {
            return Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src,
                alt: img.alt || '',
                w: img.naturalWidth || img.width,
                h: img.naturalHeight || img.height,
                parentHref: img.closest('a') ? img.closest('a').href : ''
            })).filter(i => i.src && i.src.includes('fbcdn.net') && i.w > 60);
        }""")
        with open("scripts/dump/auth_photos_imgs.json", "w", encoding="utf-8") as f:
            json.dump(photos_imgs, f, indent=2)
        print(f"Found {len(photos_imgs)} images on Photos tab.")

    context.close()
    print("Extraction complete!")

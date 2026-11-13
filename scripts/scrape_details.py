from playwright.sync_api import sync_playwright
import json
import time

brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

def unlock_fb(page):
    # Remove login banners, overlays, backdrop dialogs, and restore scroll
    page.evaluate("""() => {
        // Remove login overlays / dialogs / banners
        const elementsToRemove = document.querySelectorAll(
            'div[role="dialog"], [data-nosnippet="true"], #scrollview, div[class*="banner"]'
        );
        elementsToRemove.forEach(el => {
            if (el.innerText && (el.innerText.includes('Log In') || el.innerText.includes('Create new account'))) {
                el.remove();
            }
        });
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }""")

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

    # 1. ABOUT PAGE
    about_url = "https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/about"
    print(f"Navigating to {about_url}...")
    page.goto(about_url, wait_until="networkidle", timeout=30000)
    time.sleep(2)
    unlock_fb(page)
    page.screenshot(path="scripts/fb_about_page.png")
    about_text = page.evaluate("() => document.body.innerText")
    with open("scripts/fb_about_text.txt", "w", encoding="utf-8") as f:
        f.write(about_text)
    print("About text extracted, length:", len(about_text))

    # 2. PHOTOS PAGE
    photos_url = "https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/photos"
    print(f"Navigating to {photos_url}...")
    page.goto(photos_url, wait_until="networkidle", timeout=30000)
    time.sleep(2)
    unlock_fb(page)
    
    # Scroll down multiple times to lazy load images
    for i in range(5):
        page.evaluate("window.scrollBy(0, 1000)")
        time.sleep(1.5)
        unlock_fb(page)

    page.screenshot(path="scripts/fb_photos_page.png")
    
    # Extract all img elements
    images = page.evaluate("""() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
            src: img.src,
            alt: img.alt,
            width: img.naturalWidth || img.width,
            height: img.naturalHeight || img.height
        })).filter(img => img.src && !img.src.includes('emoji.php') && !img.src.includes('data:image/svg'));
    }""")
    
    with open("scripts/fb_photos.json", "w", encoding="utf-8") as f:
        json.dump(images, f, indent=2)
    print(f"Photos extracted: {len(images)} images found.")

    browser.close()

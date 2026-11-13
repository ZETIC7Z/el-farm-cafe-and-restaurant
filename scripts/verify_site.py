import os
from playwright.sync_api import sync_playwright

OUT_DIR = r"c:\Users\ZETICUZ\Music\El Farm Cafe and Restaurant\scripts\dump"
os.makedirs(OUT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe",
        headless=True,
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errors = []
    page.on("pageerror", lambda err: errors.append(str(err)))

    print("Navigating to http://localhost:5173 ...")
    page.goto("http://localhost:5173", wait_until="networkidle", timeout=30000)
    page.wait_for_timeout(2000)

    # 1. Screenshot Hero 3D
    page.screenshot(path=os.path.join(OUT_DIR, "verify_1_hero.png"))
    print("Captured Hero 3D screenshot")

    # 2. Scroll to Resto View Showcase
    page.locator("#resto-view").scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.screenshot(path=os.path.join(OUT_DIR, "verify_2_restoview.png"))
    print("Captured Resto View screenshot")

    # 3. Scroll to Menu Section & test category pill click
    page.locator("#menu").scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.screenshot(path=os.path.join(OUT_DIR, "verify_3_menu.png"))
    print("Captured Menu screenshot")

    # 4. Scroll to 3D Customer Carousel Stage & click Shuffle
    page.locator("#guests-stage").scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.screenshot(path=os.path.join(OUT_DIR, "verify_4_customers3d.png"))
    print("Captured 3D Customer Carousel screenshot")

    # 5. Scroll to Footer & verify ZETICUZ attribution
    page.locator("#visit").scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(OUT_DIR, "verify_5_footer.png"))
    print("Captured Footer & ZETICUZ attribution screenshot")

    # 6. Check broken images after full page scroll
    broken_images = page.evaluate("""() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
    }""")
    print("Broken images count:", len(broken_images), broken_images)

    zeticuz_text = page.get_by_text("SITE DEVELOPED BY:").is_visible()
    print("ZETICUZ Footer Attribution visible:", zeticuz_text)
    print("Page runtime errors:", errors)

    browser.close()

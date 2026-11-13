from playwright.sync_api import sync_playwright
import time

brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path=brave_path,
        headless=True,
        args=[
            "--disable-notifications",
            "--disable-popup-blocking",
            "--window-size=1920,1080"
        ]
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
    
    # Check if there is a close button on login dialog or popup
    try:
        # Common FB popups / close buttons
        close_btn = page.query_selector('div[aria-label="Close"]') or page.query_selector('[aria-label="Decline optional cookies"]')
        if close_btn:
            print("Found popup close button, clicking...")
            close_btn.click()
            time.sleep(1)
    except Exception as e:
        print("Popup check error:", e)

    page.screenshot(path="scripts/fb_main_page.png", full_page=False)
    print("Screenshot saved to scripts/fb_main_page.png")
    
    # Extract visible texts
    text_content = page.evaluate("() => document.body.innerText")
    with open("scripts/fb_main_text.txt", "w", encoding="utf-8") as f:
        f.write(text_content)
    print("Main text saved (length:", len(text_content), ")")
    print("\n--- FIRST 1500 CHARACTERS ---")
    print(text_content[:1500])
    print("-------------------------------\n")
    
    browser.close()

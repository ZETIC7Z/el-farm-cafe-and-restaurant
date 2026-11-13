import json
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
    )
    url = "https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/"
    print(f"Navigating to {url}...")
    page.goto(url, wait_until="networkidle", timeout=30000)
    print("Page Title:", page.title())
    print("Page URL:", page.url)
    
    # Save content and screenshot
    content = page.content()
    with open("scripts/fb_public_dump.html", "w", encoding="utf-8") as f:
        f.write(content)
    page.screenshot(path="scripts/fb_public_screenshot.png")
    print("Screenshot saved to scripts/fb_public_screenshot.png")
    browser.close()

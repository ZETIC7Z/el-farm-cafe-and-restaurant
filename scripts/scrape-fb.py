import json
import time
import os
import re
import urllib.request
from playwright.sync_api import sync_playwright

os.makedirs("scripts/dump/highres", exist_ok=True)
os.makedirs("public/assets/logo", exist_ok=True)
os.makedirs("public/assets/resto-views", exist_ok=True)
os.makedirs("public/assets/customers", exist_ok=True)
os.makedirs("public/assets/menu", exist_ok=True)

brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
user_data_dir = os.path.expandvars(r"%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data")

def download_img(url, dest_path):
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            with open(dest_path, "wb") as f:
                f.write(resp.read())
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

with sync_playwright() as p:
    print("Launching Brave Browser with authenticated User Data profile...")
    context = p.chromium.launch_persistent_context(
        user_data_dir=user_data_dir,
        executable_path=brave_path,
        headless=False,
        viewport={"width": 1600, "height": 1000},
        args=[
            "--no-first-run",
            "--no-default-browser-check",
            "--disable-blink-features=AutomationControlled"
        ]
    )
    page = context.new_page()

    # 1. Visit main page and scroll deeply to load all posts & full-size post images
    main_url = "https://www.facebook.com/p/El-Farm-Cafe-and-Restaurant-61592749568852/"
    print(f"Visiting {main_url}...")
    page.goto(main_url, wait_until="domcontentloaded", timeout=45000)
    time.sleep(4)

    all_feed_images = {}
    
    def collect_page_images():
        imgs = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('img')).map(img => ({
                src: img.src,
                alt: img.alt || '',
                w: img.naturalWidth || img.width,
                h: img.naturalHeight || img.height,
                parentHref: img.closest('a') ? img.closest('a').href : ''
            })).filter(i => i.src && i.src.includes('fbcdn.net') && (i.w >= 300 || i.h >= 300));
        }""")
        for im in imgs:
            # Extract fbid or unique filename
            m = re.search(r'/(\d+_\d+_\d+_[no])\.jpg', im['src'])
            key = m.group(1) if m else im['src'][:100]
            # Keep highest resolution version of each image
            if key not in all_feed_images or (im['w'] * im['h'] > all_feed_images[key]['w'] * all_feed_images[key]['h']):
                all_feed_images[key] = im

    for step in range(22):
        print(f"Deep scrolling feed {step+1}/22... (collected {len(all_feed_images)} unique high-res images)")
        page.evaluate("""() => {
            const buttons = Array.from(document.querySelectorAll('div[role="button"]'));
            buttons.forEach(b => {
                if (b.innerText && b.innerText.trim() === 'See more') {
                    try { b.click(); } catch(e) {}
                }
            });
        }""")
        collect_page_images()
        page.evaluate("window.scrollBy(0, 1300)")
        time.sleep(1.8)

    collect_page_images()
    full_feed_text = page.evaluate("() => document.body.innerText")
    with open("scripts/dump/full_feed_text.txt", "w", encoding="utf-8") as f:
        f.write(full_feed_text)
    print(f"Saved full_feed_text.txt ({len(full_feed_text)} chars)")

    # 2. Visit specific high-res photo pages for Logo, Cover, and Menu Boards + key photos
    # Collect all photo.php / photo/?fbid links we saw
    photo_fbids = [
        "122123760585424985", # Logo profile photo
        "122125148679424985", # Cover photo
        # Menu update post photos (all 7 boards!)
        "122129818767424985",
        "122129818725424985",
        "122129818683424985",
        "122129818641424985",
        "122129818599424985",
        "122129818551424985",
        "122129818509424985",
        # Other recent food & resto photos from Photos tab
        "122129857221424985",
        "122129826165424985",
        "122129810313424985",
        "122129233131424985",
        "122129232219424985",
        "122129156559424985",
        "122129076909424985",
        "122128998543424985",
        "122128998465424985",
        "122128920195424985",
        "122128920093424985",
        "122128920015424985",
        "122127869355424985",
        "122127861087424985",
        "122127568257424985",
        "122127107931424985",
        "122126225205424985",
        "122125349337424985",
        "122125152921424985",
    ]

    for idx, fbid in enumerate(photo_fbids):
        purl = f"https://www.facebook.com/photo.php?fbid={fbid}"
        print(f"[{idx+1}/{len(photo_fbids)}] Fetching high-res photo fbid={fbid}...")
        try:
            page.goto(purl, wait_until="domcontentloaded", timeout=20000)
            time.sleep(1.8)
            # Find the largest image in the photo viewer
            best_img = page.evaluate("""() => {
                const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
                    src: img.src,
                    alt: img.alt || '',
                    w: img.naturalWidth || img.width,
                    h: img.naturalHeight || img.height
                })).filter(i => i.src && i.src.includes('fbcdn.net') && (i.w >= 400 || i.h >= 400));
                imgs.sort((a, b) => (b.w * b.h) - (a.w * a.h));
                return imgs.length > 0 ? imgs[0] : null;
            }""")
            if best_img:
                best_img["fbid"] = fbid
                all_feed_images[f"fbid_{fbid}"] = best_img
                print(f"  -> Got {best_img['w']}x{best_img['h']} ({best_img['alt']})")
        except Exception as e:
            print(f"  -> Error on {fbid}: {e}")

    # Save catalog of all high-res images
    with open("scripts/dump/all_highres_images.json", "w", encoding="utf-8") as f:
        json.dump(all_feed_images, f, indent=2)

    # Download all collected high-res images into scripts/dump/highres/
    downloaded_manifest = []
    for idx, (key, info) in enumerate(all_feed_images.items()):
        safe_key = re.sub(r'[^a-zA-Z0-9_-]', '_', key)
        fname = f"{idx:03d}_{safe_key}.jpg"
        fpath = os.path.join("scripts/dump/highres", fname)
        if download_img(info["src"], fpath):
            info["local_file"] = fpath
            downloaded_manifest.append(info)
            print(f"Downloaded [{idx+1}/{len(all_feed_images)}]: {fname} ({info['w']}x{info['h']})")

    with open("scripts/dump/downloaded_manifest.json", "w", encoding="utf-8") as f:
        json.dump(downloaded_manifest, f, indent=2)

    context.close()
    print(f"Successfully downloaded {len(downloaded_manifest)} high-res images!")

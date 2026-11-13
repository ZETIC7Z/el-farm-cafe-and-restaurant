import os
import json
from bs4 import BeautifulSoup

UNCAGE_DIR = r"C:\Users\ZETICUZ\.gemini\antigravity\scratch\ZE-Uncage\output\output_monkscrave"
HTML_PATH = os.path.join(UNCAGE_DIR, "index.html")
DIM_PATH = os.path.join(UNCAGE_DIR, "image-dimensions.json")

with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

with open(DIM_PATH, "r", encoding="utf-8") as f:
    dims = json.load(f)

soup = BeautifulSoup(html, "html.parser")

print("=== SCRIPTS IN INDEX.HTML ===")
for s in soup.find_all("script"):
    print("Script src:", s.get("src"), "type:", s.get("type"), "len:", len(s.string or ""))

print("\n=== ALL IMAGES IN INDEX.HTML (DEDUPED IN ORDER) ===")
seen_imgs = []
for img in soup.find_all("img"):
    src = img.get("src", "")
    srcset = img.get("srcset", "")
    alt = img.get("alt", "")
    # find nearby text
    parent_text = ""
    p = img.parent
    for _ in range(5):
        if p:
            txt = " ".join(p.stripped_strings)
            if txt:
                parent_text = txt[:120]
                break
            p = p.parent
    fname = os.path.basename(src.split("?")[0])
    dim_info = dims.get(fname, {})
    entry = (fname, src, srcset, dim_info, parent_text)
    if fname not in [x[0] for x in seen_imgs]:
        seen_imgs.append(entry)
        print(f"- {fname} | {dim_info.get('width')}x{dim_info.get('height')} ({dim_info.get('format')}, {dim_info.get('sizeKB')}KB) | Context: {parent_text}")

print("\n=== ALL UNIQUE TEXT STRINGS IN INDEX.HTML ===")
seen_texts = []
for el in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "a", "button", "label"]):
    # Only leaf text or direct text
    if not el.find(["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "a"]):
        t = " ".join(el.stripped_strings)
        if t and t not in seen_texts:
            seen_texts.append(t)
            print(f"  [{el.name}] {t}")

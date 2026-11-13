import os
import sys
import shutil
from pathlib import Path
from playwright.sync_api import sync_playwright

brave_path = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
user_data_dir = os.path.expandvars(r"%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data")

print(f"Brave Path: {brave_path}, exists: {os.path.exists(brave_path)}")
print(f"User Data Dir: {user_data_dir}, exists: {os.path.exists(user_data_dir)}")

# Check if lockfile exists
lockfile = os.path.join(user_data_dir, "lockfile")
print(f"Lockfile exists: {os.path.exists(lockfile)}")

with sync_playwright() as p:
    try:
        print("Attempting launchPersistentContext with original user data dir...")
        context = p.chromium.launch_persistent_context(
            user_data_dir=user_data_dir,
            executable_path=brave_path,
            headless=False,
            timeout=10000,
            args=[
                "--no-first-run",
                "--no-default-browser-check"
            ]
        )
        print("Connected directly to original User Data dir!")
        page = context.new_page()
        page.goto("https://www.facebook.com", timeout=15000)
        print(f"Current URL: {page.url}")
        print(f"Title: {page.title()}")
        context.close()
    except Exception as e:
        print(f"Direct launch failed: {e}")

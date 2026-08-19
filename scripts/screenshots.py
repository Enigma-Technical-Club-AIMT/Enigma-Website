from playwright.sync_api import sync_playwright
import os, time

OUT = "/home/ubuntu/Enigma-Website/screenshots"
os.makedirs(OUT, exist_ok=True)
pages = [
    ("/", "home"),
    ("/explore", "explore"),
    ("/alumni", "alumni"),
    ("/blog", "blog"),
    ("/join", "join"),
    ("/leaderboard", "leaderboard"),
    ("/new-members", "new-members"),
    ("/resources", "resources"),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
    page = ctx.new_page()
    for path, name in pages:
        try:
            page.goto(f"http://localhost:3000{path}", wait_until="networkidle", timeout=60000)
            time.sleep(2)
            page.screenshot(path=f"{OUT}/{name}.png", full_page=True)
            print(f"OK {name}")
        except Exception as e:
            print(f"ERR {name}: {e}")
    browser.close()
